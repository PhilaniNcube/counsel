"use server";

import { z } from "zod";
import { createClient } from "../supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const contactSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  company: z.string(),
  contact_type: z.enum(['client', 'potential client', 'opposing counsel']),
  address: z.string(),
})

export async function addContact(formData:FormData){

  const supabase = createClient();

  const values = Object.fromEntries(formData.entries());

  const validatedFields = contactSchema.safeParse({
    first_name: values.first_name,
    last_name: values.last_name,
    email: values.email,
    phone: values.phone,
    company: values.company,
    contact_type: values.contact_type,
    address: values.address,
  });

  if(!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten(),
      data: null
    }
  }

  // get the current user
  const {data:{user}, error:userError} = await supabase.auth.getUser();

  if(userError || user === null) {
    return {
      errors: ["You are not signed in"],
      data: null
    }
  }

  // get the organization that the user is a part of from the members table
  const {data:member, error:memberError} = await supabase.from("members").select("org_id").eq("profile_id", user.id).single();

  if(memberError || !member) {
    return {
      errors: ["An error occurred, could not fetch the organization"],
      data: null
    }
  }

  // insert the new contact into the contacts table
  const {data:contact, error:contactError} = await supabase.from("contacts").insert({
    first_name: validatedFields.data.first_name,
    last_name: validatedFields.data.last_name,
    email: validatedFields.data.email,
    phone: validatedFields.data.phone,
    company: validatedFields.data.company,
    contact_type: validatedFields.data.contact_type,
    address: validatedFields.data.address,
    org_id: member.org_id
  });

  if(contactError || !contact) {
    return {
      errors: ["An error occurred, could not add the contact"],
      data: null
    }
  }

  console.log({contact})

  revalidatePath("/dashboard/clients");
  redirect("/dashboard/clients");


  return {
    errors: [],
    data: contact
  }




}
