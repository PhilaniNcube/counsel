"use server";

import { createClient } from "../supabase/server";

export async function getTasksByCaseId(case_id: number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("case_id", case_id);

    // if error or no data, return
    if(error || !data) {
      return { data: null, error: error.message || "An error occurred" };
    }

  return { data, error: null };
}
