"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Coins, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useHelpers } from "@/hooks/useHelpers";
import { startTransition, useOptimistic } from "react";
import { SubmitButton } from "@/components/submit-button";
import { newCaseCosts } from "@/utils/actions/case-costs";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	title: z.string(),
	description: z.string(),
	cost: z.coerce.number(),
});

const NewCaseCosts = ({ case_id }: { case_id: number }) => {

  const {open, setOpen} = useHelpers();

  const router = useRouter();

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild className="">
				<Button className="mb-3">
					<Plus className="mr-2" /> New Case Costs
				</Button>
			</DialogTrigger>
			<DialogContent>
				<h2 className="text-2xl font-bold mb-4">New Case Costs</h2>
				<form
					className="flex flex-col gap-y-5"
					action={(data: FormData) => {
						const values = Object.fromEntries(data.entries());

						console.log({ values });

						const formData = new FormData();

						for (const key in values) {
							formData.append(key, values[key]);
						}

						startTransition(() => {
              newCaseCosts(formData);
              router.refresh();
              setOpen(false);
						});
					}}
				>
					<div className="flex flex-col gap-y-2">
						<Label htmlFor="title">Title</Label>
						<Input name="title" id="title" type="text" required />
					</div>
					<div className="flex flex-col gap-y-2">
						<Label htmlFor="title">Description</Label>
						<Textarea rows={3} name="description" id="description" required />
					</div>
					<div className="flex flex-col gap-y-2">
						<Label htmlFor="cost">Cost</Label>
						<Input name="cost" id="cost" type="number" required />
					</div>
					<Input name="case_id" id="case_id" value={case_id} type="hidden"  />
					<SubmitButton type="submit" className="self-end">
						<Coins className="mr-2" /> Add Cost
					</SubmitButton>
				</form>
			</DialogContent>
		</Dialog>
	);
};
export default NewCaseCosts;
