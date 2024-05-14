"use server";

import { z } from "zod";
import { createService } from "../supabase/service";

const teamMemberSchema = z.object({
  full_name: z.string(),
  email: z.string().email(),
})


export async function addTeamMember(formData:FormData){

  const supabase = createService();

  // get the current user
  const {data:{user}, error} = await supabase.auth.getUser();

  // if there is no user return an error array and a null data property
  if(error || user === null) {
    return {
      errors: ["You are not signed in"],
      data: null
    }
  }

  // validate the form data
  const values = Object.fromEntries(formData.entries());

  const validatedFields = teamMemberSchema.safeParse({
    full_name: values.full_name,
    email: values.email,
  });

  // if the validation fails, return an error array and a null data property
  if(!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten(),
      data: null
    }
  }


  // get the organization that the user is an admin of
  const {data:org, error:orgError} = await supabase.from("organization").select("*").eq("admin_id", user.id).single();

  // if there is an error or no data, return an error array and a null data property
  if(orgError || !org ) {
    return {
      errors: ["An error occurred, could not fetch the organization"],
      data: null
    }
  }

  if(org.admin_id !== user.id) {
    return {
      errors: ["You are not authorized to perform this action"],
      data: null
    }
  }

  // invite a user to the application
		const { data: newUser, error: newUserError } =
			await supabase.auth.admin.inviteUserByEmail(validatedFields.data.email, {
        data: {
          full_name: validatedFields.data.full_name
        },
      }
);

  // if there is an error, return an error array and a null data property
  if(newUserError || !newUser) {
    return {
      errors: ["An error occurred, could not invite the user"],
      data: null
    }
  }

  // add the user to the organization
  const {data: member, error: memberError} = await supabase.from('members').insert([
    {
      profile_id: newUser.user.id,
      org_id: org.id,
      role: "member"
    }
  ])

  console.log({member, memberError})


  // if there is an error, return an error array and a null data property
  if (memberError || !member) {
    return {
      errors: ["An error occurred"],
      data: null
    }
  }

  // return a null error array and the data property
  return {
    errors: null,
    data: member
  }

}
