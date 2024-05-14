"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import NewMember from "./new-member";
import { DataTable } from "../data-table";
import { columns } from "./Members/columns";
import type { ExtendedMember } from "@/types";

type TeamProps = {
  members: {
    id: number;
	created_at: string;
	profile_id: string;
	org_id: number;
	role: "admin" | "member" | "manager";
  profile: {
    id: string;
    email: string;
    full_name: string;
    updated_at: string | null;
  }
 }[]
}

const Team = ({ members }: TeamProps) => {

  const [open, setOpen] = useState(false);

	return (
		<Card className="w-full max-w-5xl mx-auto">
			<CardHeader>
				<div className="flex items-start justify-between">
					<div>
						<CardTitle>Team</CardTitle>
						<p>Invite new team members into your team</p>
					</div>
					<NewMember />
				</div>
			</CardHeader>
			<CardContent>
				<DataTable columns={columns} data={members} />
			</CardContent>
		</Card>
	);
};
export default Team;
