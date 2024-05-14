import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import Team from "@/components/Team";

export default async function Index() {

  return (
    <div className="flex flex-col items-center flex-1 w-full gap-20 py-3">
      <Team />
    </div>
  );
}
