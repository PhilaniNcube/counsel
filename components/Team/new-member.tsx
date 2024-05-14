"use client";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import AddTeamMember from "@/app/(dashboard)/_components/team/add-team-member";

const NewMember = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<PlusIcon /> Add new member
				</Button>
			</DialogTrigger>
			<DialogContent className="py-10">
				<AddTeamMember />
			</DialogContent>
		</Dialog>
	);
};
export default NewMember;
