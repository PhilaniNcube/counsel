"server only";

import { createClient } from "../supabase/server";

export async function getOrganization(){

  const supabase = createClient()

  const {data:{user}, error} = await supabase.auth.getUser();

  if(error || user === null) {
    return {
      errors: ["An error occurred"],
      data: null
    }
  }

  const {data, error:orgError} = await supabase.from("organization").select("*").eq("admin_id", user.id).single();

  if(error || !data) {
    return {
					errors: ["An error occurred, could not fetch the organization"],
					data: null,
				};
  }

  return {
    errors: null,
    data: data
  }


}

