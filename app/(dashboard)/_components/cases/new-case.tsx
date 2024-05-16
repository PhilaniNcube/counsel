"use client";

import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useHelpers } from "@/hooks/useHelpers";
import { createCase } from "@/utils/actions/cases";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import { startTransition, useState } from "react";


const NewCase = ({client_id}:{client_id:number}) => {

const {open, setOpen} = useHelpers();


  return (
			<Dialog onOpenChange={setOpen} open={open}>
				<DialogTrigger asChild>
					<Button>
						<PlusIcon /> Add new case
					</Button>
				</DialogTrigger>
				<DialogContent className="@container min-w-[600px]">
					<DialogTitle>Add New Case</DialogTitle>
					<Separator className="my-3" />
					<form
						action={(formData:FormData) => {
              startTransition(() => {
                createCase(formData);
                setOpen(false);
              });
            }}
						className="my-2 @md:min-w-[500px] flex flex-col gap-y-5"
					>
						<div className="flex flex-col gap-y-3">
							<Label htmlFor="case_number">Case Number</Label>
							<Input type="text" id="case_number" name="case_number" required/>
						</div>
						<div className="flex flex-col gap-y-3">
							<Label htmlFor="description">Description</Label>
							<Input type="text" id="description" name="description" required />
						</div>
						<Input
							type="hidden"
							id="client_id"
							name="client_id"
							value={client_id}
						/>
						<div className="flex flex-col gap-y-3">
							<Label htmlFor="start_date">Start Date</Label>
							<Input type="date" id="start_date" name="start_date" required />
						</div>
						<Separator className="" />
						<DialogFooter>
							<SubmitButton type="submit">Add Case</SubmitButton>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		);
};
export default NewCase;
