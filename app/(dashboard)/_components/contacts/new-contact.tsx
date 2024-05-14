"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { SubmitButton } from "@/components/submit-button";
import { addContact } from "@/utils/actions/contacts";

const NewContact = () => {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<PlusIcon /> Add new contact
				</Button>
			</DialogTrigger>
			<DialogContent className="py-10">
				<div className="min-w-[200px]">
					<DialogTitle>Add New Contact</DialogTitle>
					<form action={addContact} className="@container mt-3">
						<div className="grid @sm:grid-cols-2 gap-x-3 gap-y-5">
							<div className="flex flex-col w-full gap-2">
								<Label htmlFor="first_name">First Name</Label>
								<Input type="text" id="first_name" name="first_name" />
							</div>
							<div className="flex flex-col w-full gap-2">
								<Label htmlFor="last_name">Last Name</Label>
								<Input type="text" id="last_name" name="last_name" />
							</div>
							<div className="flex flex-col w-full gap-2">
								<Label htmlFor="email">Email</Label>
								<Input type="email" id="email" name="email" />
							</div>
							<div className="flex flex-col w-full gap-2">
								<Label htmlFor="phone">Phone Number</Label>
								<Input type="tel" id="phone" name="phone" />
							</div>
							<div className="flex flex-col w-full gap-2">
								<Label htmlFor="company">Company name</Label>
								<Input type="text" id="company" name="company" />
							</div>
							<div className="flex flex-col w-full gap-2">
								<Label htmlFor="contact_type">Contact Type</Label>
								<Select name="contact_type">
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Contact Type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="client">Client</SelectItem>
										<SelectItem value="potential client">
											Potential Client
										</SelectItem>
										<SelectItem value="opposing counsel">
											Opposing Counsel
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="@sm:col-span-2">
								<Label htmlFor="address">Address</Label>
								<Input type="text" id="address" name="address" />
							</div>
						</div>
						<DialogFooter className="mt-4">
							<SubmitButton type="submit">Add Contact</SubmitButton>
						</DialogFooter>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
};
export default NewContact;
