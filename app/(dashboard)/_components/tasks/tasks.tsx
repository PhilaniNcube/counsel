"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Database } from "@/schema";
import { startTransition, useOptimistic } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { SubmitButton } from "@/components/submit-button";
import { createTask } from "@/utils/actions/tasks";
import { useRouter } from "next/navigation";

type initialState = {
	errors?: {
		title?: string[] | undefined;
		case_id?: string[] | undefined;
		description?: string[] | undefined;
		status?: string[] | undefined;
		assignee?: string[] | undefined;
		auth?: string[] | undefined;
	} | null;
	timestamp: string;
	status?: "success" | "error" | null;
};

type TaskProps = {
	case_id: number;
	member_id: number;
	tasks: Database["public"]["Tables"]["tasks"]["Row"][];
};

const formSchema = z.object({
	title: z.string(),
	case_id: z.coerce.number(),
	description: z.string(),
	assignee: z.coerce.number(),
	status: z.string(),
});

const Tasks = ({ case_id, tasks, member_id }: TaskProps) => {
	const initialState: initialState = {
		errors: null,
		timestamp: new Date().toISOString(),
		status: null,
	};

  const router = useRouter();

	const [optimisticTasks, setOptimisticTasks] = useOptimistic(
		tasks,
		(state, newTask: Database["public"]["Tables"]["tasks"]["Row"]) => {
			return [...state, newTask];
		},
	);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			case_id: case_id,
			description: "",
			assignee: member_id,
			status: "not started",
		},
	});

	return (
		<section className="w-full">
			<div className="grid gap-4 lg:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>Add a new task</CardTitle>
					</CardHeader>
					<CardContent>
						<Form {...form}>
							<form
								action={async (formData: FormData) => {
									setOptimisticTasks({
										title: formData.get("title") as string,
										description: formData.get("description") as string,
										case_id: Number(case_id),
										assignee: Number(member_id),
										status: "not started",
										id: 1,
										created_at: new Date().toISOString(), // add this line
										org_id: 1, // add this line
									});

                  startTransition(() => {
                    createTask(initialState, formData);
                    router.refresh();
                  });
								}}
								className="flex flex-col space-y-3"
							>
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input placeholder="shadcn" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Input placeholder="shadcn" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="status"
									render={({ field }) => (
										<FormItem hidden>
											<FormLabel>Status</FormLabel>
											<FormControl>
												<Input type="hidden" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="assignee"
									render={({ field }) => (
										<FormItem hidden>
											<FormLabel>Assignee</FormLabel>
											<FormControl>
												<Input type="hidden" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="case_id"
									render={({ field }) => (
										<FormItem hidden>
											<FormLabel>Case Id</FormLabel>
											<FormControl>
												<Input type="hidden" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<SubmitButton>Create Task</SubmitButton>
							</form>
						</Form>
					</CardContent>
				</Card>
				<div className="w-full">
					{optimisticTasks.map((task) => (
						<Card key={task.id}>
							<CardHeader>
								<CardTitle>{task.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p>{task.description}</p>
                <small>{task.created_at} id:{task.id}</small>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};
export default Tasks;
