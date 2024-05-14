import  type{ ExtendedMember } from "@/types";
import { createClient } from "../supabase/server";

export async function getMemebers(org_id: number) {

  const supabase = createClient()

  const { data, error } = await supabase
			.from("members")
			.select("*,profile:profile_id(*)")
			.eq("org_id", org_id)
			.returns<ExtendedMember[]>();

  console.log({ data, error });


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
