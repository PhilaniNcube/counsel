import Team from "@/components/Team";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getMemebers } from "@/utils/queries/members";
import { getOrganization } from "@/utils/queries/organizations";

const page = async () => {

    const { errors, data } = await getOrganization();

				if (errors) {
					return (
						<Card>
							<CardHeader>
								<CardTitle>Error: Could not fetch organization</CardTitle>
							</CardHeader>
						</Card>
					);
				}

				const { data: members, errors: membersErrors } = await getMemebers(
					data.id,
				);

								if (membersErrors || !members) {
									return (
										<Card>
											<CardHeader>
												<CardTitle>
													Error: Could not fetch organization
												</CardTitle>
											</CardHeader>
										</Card>
									);
								}

				return <div className="grid gap-4">
          <Team members={members} />
        </div>;
};
export default page;
