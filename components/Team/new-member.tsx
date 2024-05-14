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
import { useState } from "react";



const NewMember = () => {

  const [open, setOpen] = useState(false);

	return (
		<Dialog onOpenChange={setOpen} open={open}>
			<DialogTrigger asChild>
				<Button>
					<PlusIcon /> Add new member
				</Button>
			</DialogTrigger>
			<DialogContent className="py-10">
				<AddTeamMember setOpen={setOpen} />
			</DialogContent>
		</Dialog>
	);
};
export default NewMember;
