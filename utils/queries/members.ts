import  type{ ExtendedMember } from "@/types";
import { createClient } from "../supabase/server";

export async function getMemebers(org_id: number) {

  const supabase = createClient()

  const { data, error } = await supabase
			.from("members")
			.select("*,profile:profile_id(*)")
			.eq("org_id", org_id)
			.returns<ExtendedMember[]>();

  if (error || !data) {
    return {
      errors: ["An error occurred"],
      data: null
    }
  }

  return {
    errors: null,
    data: data
  }


}


// get the member id of the current user
export async function getMemberId() {

  // get the current user
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // if there is an error or no user, return null
  if (error || !user) {
    return null;
  }

  // get the member id from the members table
  const { data: members, error: membersError } = await supabase
    .from("members")
    .select("id")
    .eq("user_id", user.id)
    .single();

  // if there is an error, return null
  if (membersError || members === null) {
    return null;
  }

  return members.id;

}
