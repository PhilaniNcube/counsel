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
import { Button } from "@/components/ui/button";
import { SubmitButton } from "../submit-button";

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
					<form className="grid gap-4">
						<div>
							<Label className="mb-2" htmlFor="email">
								Email
							</Label>
							<Input
								id="email"
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
