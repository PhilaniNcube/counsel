"use server";

import { z } from "zod";
import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const orgSchema = z.object({
  name: z.string(),
  website: z.string(),
  phone: z.string(),
})

export async function createOrganization(formData:FormData) {

  const supabase = createClient();

  const values = Object.fromEntries(formData.entries());

  const validatedFields = orgSchema.safeParse({
    name: values.name,
    website: values.website,
    phone: values.phone,
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten());
    return {
      errors: validatedFields.error.flatten(),
      data: null
    }
  }

  const {data:{user}, error} = await supabase.auth.getUser();

  if (error || !user) {
    return {
      errors: ["An error occurred"],
      data: null
    }
  }

  try {

    const {data, error} = await supabase.from("organization").insert([{
      name: validatedFields.data.name,
      website: validatedFields.data.website,
      phone: validatedFields.data.phone,
      admin_id: user.id
    }]).select("*").single();

    console.log({data, error});

    if (error || !data) {
      return {
        errors: ["An error occurred"],
        data: null
      }
    }

    const {data: member, error: memberError} = await supabase.from('members').insert([
      {
        profile_id: user.id,
        org_id: data.id,
        role: "admin"
      }
    ])

    if (memberError || !member) {
      return {
        errors: ["An error occurred"],
        data: null
      }
    }

    return {
      errors: null,
      data: data
    }



  } catch (error) {

    return {
      errors: ["An error occurred"],
      data: null
    }

  } finally {
    revalidatePath("/dashboard/team");
    redirect("/dashboard/team");
  }

}
