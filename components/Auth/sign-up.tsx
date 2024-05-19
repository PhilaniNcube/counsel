"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
import { signUp } from "@/utils/actions/auth";
import { startTransition } from "react";
import { toast } from "sonner";

export function SignUp() {
	return (
		<Card className="max-w-sm mx-auto">
			<CardHeader>
				<CardTitle className="text-xl">Sign Up</CardTitle>
				<CardDescription>
					Enter your information to create an account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form action={(formData:FormData) => {

          startTransition(() => {
            signUp(formData);
            toast("Please check your email to verify your account.", {
              position: "top-center",
              duration: 5000,
            });
          });

        }}>
					<div className="grid gap-4">
						<div className="grid gap-4">
							<div className="grid gap-2">
								<Label htmlFor="full_name">Full Name</Label>
								<Input
									id="full_name"
									name="full_name"
									placeholder=""
									required
								/>
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								name="email"
								placeholder="m@example.com"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input name="password" id="password" type="password" />
						</div>
						<SubmitButton type="submit" className="w-full">
							Create an account
						</SubmitButton>
					</div>
					<div className="mt-4 text-sm text-center">
						Already have an account?{" "}
						<Link href="/login" className="underline">
							Sign in
						</Link>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
