"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../supabase/server";
import { z } from "zod";

const taskSchema = z.object({
  title: z.string(),
  case_id: z.number(),
  description: z.string(),
  // status: z.string(),
  assignee: z.number(),
});


type PrevState = {
	errors?: {
		title?: string[] | undefined;
		case_id?: string[] | undefined;
		description?: string[] | undefined;
		status?: string[] | undefined;
		assignee?: string[] | undefined;
    auth?: string[] | undefined;
	} | null;
	timestamp: string;
	status?: "success" | "error" | null | undefined;
};


export async function createTask(prevState: PrevState, formData:FormData) {

  const supabase = createClient();

  // get the current user
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();


  // if there is an error or no user, modify the state and return it
  if (error || !user) {
    return {

      errors: { auth: ["You are not authorised to perform this action"] },
      timestamp: new Date().toISOString(),
      status: "error",
    };
  }

  // get the organization id from the user in the members table
  const { data: members, error: membersError } = await supabase
    .from("members")
    .select("id, org_id")
    .eq("profile_id", user.id)
    .single();


  // if there is an error, modify the state and return it
  if (membersError || members === null) {
    return {

      errors: { auth: ["You are not part of a valid organisation"] },
      timestamp: new Date().toISOString(),
      status: "error",
    };
  }

  // get the form data
  const values = Object.fromEntries(formData.entries());


  // validate the form data
  const validatedFields = taskSchema.safeParse({
    title: values.title,
    case_id: Number(values.case_id),
    description: values.description,
    status: values.status,
    assignee: Number(values.assignee),
  });



  // if there are errors, modify the state and return it
  if (!validatedFields.success) {
    return {

      errors: validatedFields.error.flatten().fieldErrors,
      timestamp: new Date().toISOString(),
      status: "error",
    };
  }


  // get the case from the database to ensure that the case exists and the user is authorised to create a task for it by checking if the case belongs to the organization
  const { data: cases, error: casesError } = await supabase
    .from("cases")
    .select("id")
    .eq("id", validatedFields.data.case_id)
    .eq("org_id", members.org_id);

    console.log({casesError, cases})

  // if there is an error or the case does not exist, modify the state and return it

  if (casesError || cases === null) {
    return {

      errors: { case_id: ["The case does not exist or you are not authorised to create a task for it"] },
      timestamp: new Date().toISOString(),
      status: "error",
    };
  }

  // insert the task into the database
  const { data, error: taskError } = await supabase
    .from("tasks")
    .insert([
      {
        title: validatedFields.data.title,
        case_id: validatedFields.data.case_id,
        description: validatedFields.data.description,
        org_id: members.org_id,
        assignee: members.id,
        status: "not started",
      },
    ])
    .single();

    console.log({data, taskError})

  // if there is an error, modify the state and return it
  if (taskError) {
    return {
      errors: { auth: [taskError.message] },
      timestamp: new Date().toISOString(),
      status: "error",
    };
  }

  // if there is no data, modify the state and return it
  if (!data) {
    return {
      errors: { auth: ["An error occurred"] },
      timestamp: new Date().toISOString(),
      status: "error",
    };
  }


  revalidatePath(`/dashboard/cases/${validatedFields.data.case_id}`);

  // return the state with no errors
  return {
    errors: null,
    timestamp: new Date().toISOString(),
    status: "success",
  };





}
