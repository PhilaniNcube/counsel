"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { z } from "zod";

const formSchema = z.object({
	title: z.string(),
	description: z.string(),
	cost: z.coerce.number(),
  case_id: z.coerce.number()
});


export async function newCaseCosts(formData:FormData) {

  const supabase = createClient()

  // get the current user
  const {data:{user}, error} = await supabase.auth.getUser();

  if(error || user === null) {
    return {
      status: "error",
      messages: [{
        message: "You are not logged in",
        type: "error"
      }],
      timestamp: new Date().toISOString(),
      data: null
    }
  }


  // get the users organization from the members table
  const {data:member, error:memberError} = await supabase.from("members").select("org_id").eq("profile_id", user.id).single();


  if(memberError || !member) {
    return {
      status: "error",
      messages: [{
        message: memberError?.message || "An error occurred, could not fetch the organization",
        type: "error"
      }],
      timestamp: new Date().toISOString(),
      data: null
    }
  }

  const values = Object.fromEntries(formData.entries());

  const validatedFields = formSchema.safeParse(values);



  if(!validatedFields.success) {
    return {
      status: "error",
      messages: validatedFields.error.errors.map((error) => ({
        message: error.message,
        type: "error",
        key: error.path
      })),
      timestamp: new Date().toISOString(),
      data: null
    }
  }


  // insert the new case costs
  const {data, error:caseCostError} = await supabase.from("case_costs").insert([{
    ...validatedFields.data,
    org_id: member.org_id
  }]);

  if(caseCostError || !data) {
    return {
      status: "error",
      messages: [{
        message: caseCostError?.message || "An error occurred, could not insert the case costs",
        type: "error"
      }],
      timestamp: new Date().toISOString(),
      data: null
    }
  }

  revalidatePath(`/dashboard/cases/${validatedFields.data.case_id}`)

  return {
    status: "success",
    messages: [{
      message: "Case costs inserted successfully",
      type: "success"
    }],
    timestamp: new Date().toISOString(),
    data: data
  }

}
