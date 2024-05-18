"use server";

import { createClient } from "../supabase/server";

export async function getCaseCostsById(case_id:number) {

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

  // get the the case costs matching the case_id and the org_id
  const {data:caseCosts, error:caseCostsError} = await supabase.from("case_costs").select("*").eq("case_id", Number(case_id)).eq("org_id", member.org_id);

  if(caseCostsError || !caseCosts) {
    return {
      error: "An error occurred, you do not have access to this case's costs",
      data: null
    }
  }

  return {
    error: null,
    data: caseCosts
  }

}


export async function getTotalCaseCost(id:number) {

  const supabase = createClient()

  // get the current user
  const {data:{user}, error} = await supabase.auth.getUser();

  if(error || user === null) {
    return {
      error: "You are not logged in",
      data: null
    }
  }

  const {error:totalCostError, data:totalCost} = await supabase.rpc("get_total_cost_by_case_id", {case_id_param: id});

  if(totalCostError || !totalCost) {
    return {
      error: "An error occurred, could not fetch the total cost",
      data: null
    }
  }

  return {
    error: null,
    data: totalCost
  }

}
