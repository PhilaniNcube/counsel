import { SubmitButton } from "@/components/submit-button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createOrganization } from "@/utils/actions/organization";

const NewOrganization = () => {
  return (
			<form action={createOrganization}>
				<Card>
					<CardHeader>
						<CardTitle>Create a new organization</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-3">
						<div className="grid gap-2">
							<Label htmlFor="name">Name</Label>
							<Input id="name" name="name" type="text" required />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="website">Website</Label>
							<Input id="website" name="website" type="text" required />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="phone">Phone</Label>
							<Input id="phone" name="phone" type="text" required />
						</div>
					</CardContent>
					<CardFooter>
						<SubmitButton pendingText="Please wait...">
							Create Organization
						</SubmitButton>
					</CardFooter>
				</Card>
			</form>
		);
};
export default NewOrganization;
