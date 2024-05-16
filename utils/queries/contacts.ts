"use server";

import { createClient } from "../supabase/server";

export async function getContacts() {

  const supabase = createClient();

  // get the current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || user === null) {
    return {
      errors: ["You are not signed in"],
      data: null
    }
  }



  // get the organization that the user is a part of from the members table
  const { data: member, error: memberError } = await supabase.from("members").select("org_id").eq("profile_id", user.id).single();

  if (memberError || !member) {
    return {
      errors: ["An error occurred, could not fetch the organization"],
      data: null
    }
  }





  const { data: contacts, error } = await supabase.from("contacts").select("*").eq("org_id", member.org_id);

  if (error) {
    return {
      errors: ["An error occurred, could not fetch the contacts"],
      data: null
    }
  }


  return {
    errors: [],
    data: contacts
  }

}


export async function getContact(id: number) {

  const supabase = createClient();

  const { data: contact, error } = await supabase.from("contacts").select("*").eq("id", id).single();

  if (error) {
    return {
      errors: ["An error occurred, could not fetch the contact"],
      data: null
    }
  }

  return {
    errors: null,
    data: contact
  }

}
