"use client";

import {
	CardTitle,
	CardDescription,
	CardHeader,
	CardContent,
	Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "../submit-button";
import { toast } from "sonner";
import { forgotPassword } from "@/utils/actions/auth";
import { startTransition } from "react";

const ForgotPasswordForm = () => {
	return (
		<div className="h-screen flex items-center justify-center">
			<Card className="mx-auto max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
					<CardDescription>
						Enter your email address and we'll send you a link to reset your
						password.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={(formData:FormData) => {

            startTransition(() => {
               forgotPassword(formData);
               toast("Success! Check your email to reset your password");
              })

          }} className="grid gap-4">
						<div>
							<Label className="mb-2" htmlFor="email">
								Email
							</Label>
							<Input
								id="email"
                name="email"
								placeholder="name@example.com"
								required
								type="email"
							/>
						</div>
						<SubmitButton className="w-full" type="submit">
							Send Reset Link
						</SubmitButton>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};
export default ForgotPasswordForm;
