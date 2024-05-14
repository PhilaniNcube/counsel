import { getOrganization } from "@/utils/queries/organizations";
import AddTeamMember from "../../_components/team/add-team-member";
import Team from "@/components/Team";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getMemebers } from "@/utils/queries/members";

const page = async () => {

  const {errors, data} = await getOrganization();

  if(errors) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            Error: Could not fetch organization
          </CardTitle>
        </CardHeader>
      </Card>
    )
  }

  const {data:members, errors:membersErrors} = await getMemebers(data.id);

  console.log({members, membersErrors})



  return (
			<div className="grid gap-2 md:grid-cols-2">

        {members ? <Team members={members} /> : null}

			</div>
		);
};
export default page;
