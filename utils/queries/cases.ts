"use server"

import { createClient } from "../supabase/server";
import type { QueryResult, QueryData } from "@supabase/supabase-js";

export async function getClientCases(client_id:number) {

  const supabase = createClient()

  // get the current user
  const {data:{user}, error} = await supabase.auth.getUser();

  if(error || user === null) {
    return {
      error: "You are not logged in",
      data: null
    }
  }

  // get the users organization from the members table
  const {data:member, error:memberError} = await supabase.from("members").select("org_id").eq("profile_id", user.id).single();

  if(memberError || !member) {
    return {
      error: "An error occurred, could not fetch the organization",
      data: null
    }
  }



  // get the the cases matching the client_id and the org_id
  const {data:cases, error:caseError} = await supabase.from("cases").select("*").eq("client_id", Number(client_id)).eq("org_id", member.org_id);

  if(caseError || !cases) {
    return {
      error: "An error occurred, you do not have access to this client's cases",
      data: null
    }
  }

  return {
    error: null,
    data: cases
  }
}


export async function getOrgCases() {

  const supabase = createClient()

  // get the current user
  const {data:{user}, error} = await supabase.auth.getUser();

  if(error || user === null) {
    return {
      error: "You are not logged in",
      data: null
    }
  }

  // get the users organization from the members table
  const {data:member, error:memberError} = await supabase.from("members").select("org_id").eq("profile_id", user.id).single();

  if(memberError || !member) {
    return {
      error: "An error occurred, could not fetch the organization",
      data: null
    }
  }

  // get the the cases matching the org_id
  const {data:cases, error:caseError} = await supabase.from("cases").select("*, client:client_id(first_name, last_name)").eq("org_id", member.org_id);

  if(caseError || !cases) {
    return {
      error: "An error occurred, you do not have access to this client's cases",
      data: null
    }
  }


  return {
    error: null,
    data: cases
  }

}


export async function getCase(id:number) {

  const supabase = createClient()

  // get the current user
  const {data:{user}, error} = await supabase.auth.getUser();

  if(error || user === null) {
    return {
      error: "You are not logged in",
      data: null
    }
  }

  // get the users organization from the members table
  const {data:member, error:memberError} = await supabase.from("members").select("org_id").eq("profile_id", user.id).single();

  if(memberError || !member) {
    return {
      error: "An error occurred, could not fetch the organization",
      data: null
    }
  }

  // get the the cases matching the org_id
  const caseWithClientQuery =  supabase.from("cases").select("*, contacts(created_at,first_name, last_name, email, phone, company, contact_type )").eq("id", id).eq("org_id", member.org_id).single();

  type CaseWithClient = QueryData<typeof caseWithClientQuery>;

  const {data:cases, error:caseError} = await caseWithClientQuery;

  const caseData = cases as CaseWithClient;

  if(caseError || !cases) {
    return {
      error: "An error occurred, you do not have access to this case",
      data: null
    }
  }

  return {
    error: null,
    data: caseData
  }

}
