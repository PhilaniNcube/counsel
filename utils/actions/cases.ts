"use server"
import { createClient } from "../supabase/server";
import {z} from "zod";

const CaseSchema = z.object({
  case_number: z.string(),
  description: z.string(),
  client_id: z.string(),
  start_date: z.string().date(),
});


export async function createCase(formData:FormData) {


  const values = Object.fromEntries(formData.entries());
  console.log({values})

  const validatedFields = CaseSchema.safeParse(values);

  if(!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {errors: validatedFields.error.flatten().fieldErrors};
  }

  const supabase = createClient();

  // get the current user
  const {data:{user}, error} = await supabase.auth.getUser();

  if(error || !user) {
    return {errors: [{
      message: 'User not found'
    }]};
  }

  // get the org_id from the members table where the user_id is the current user's id
  const {data:members, error:membersError} = await supabase
    .from("members")
    .select("org_id")
    .eq("profile_id", user.id)
    .single();

  if(membersError || !members) {
    return {errors: [{
      message: 'Organization not found'
    }]};
  }

  // create the case in the cases table using the validated fields and the org_id

		const { data:cases, error: caseError } = await supabase.from("cases").insert([
			{
				case_number: validatedFields.data.case_number,
				description: validatedFields.data.description,
				client_id: Number(validatedFields.data.client_id),
				start_date: new Date(validatedFields.data.start_date).toISOString(),
				org_id: members.org_id,
        completed: false,
			},
		]);

    if (caseError || !cases) {
      return { errors: [{ message: caseError?.message || "An error occurred" }] };
    }

    return {
      errors: null,
      data: cases
    };



}
