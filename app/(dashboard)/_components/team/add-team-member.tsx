"use client";
import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { addTeamMember } from "@/utils/actions/team";
import { SubmitButton } from "@/components/submit-button";
import { toast } from "sonner";
import { startTransition } from "react";
import { useRouter } from "next/navigation";


const teamMemberSchema = z.object({
  full_name: z.string(),
  email: z.string().email(),
})

type AddTeamMemberProps = {
  setOpen: (open:boolean) => void
}



const AddTeamMember = ({setOpen}:AddTeamMemberProps) => {

  const router = useRouter();

  const form = useForm<z.infer<typeof teamMemberSchema>>({
    resolver: zodResolver(teamMemberSchema),
  });

  const {register, handleSubmit} = form;

  async function onSubmit(values: z.infer<typeof teamMemberSchema>) {
    console.log(values);

    const formData = new FormData();

    formData.append("full_name", values.full_name);
    formData.append("email", values.email);


    startTransition(() => {
       addTeamMember(formData)
      toast('Please wait while we add the team member')
      setOpen(false);
      router.refresh();
    })

  }

  return (
			<Card className="max-w-4xl min-w-3xl">
				<CardHeader>
					<CardTitle>Add New Team Member</CardTitle>
				</CardHeader>
				<Form {...form}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<CardContent>
							<div className="grid w-full gap-3">
								<FormField
									control={form.control}
									name="full_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Full Name</FormLabel>
											<FormControl>
												<Input placeholder="" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input type="email" placeholder="" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</CardContent>
            <CardFooter>
              <SubmitButton type="submit"> <PlusIcon /> Add Team Member</SubmitButton>
            </CardFooter>
					</form>
				</Form>
			</Card>
		);
};
export default AddTeamMember;
