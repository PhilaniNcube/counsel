
"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { startTransition } from "react";
import { resetPassword } from "@/utils/actions/auth";
import { toast } from "sonner";

export default function ResetPasswordForm() {
	return (
		<section className="flex min-h-screen items-center justify-center ">
			<div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
				<div className="space-y-4">
					<h2 className="text-3xl font-bold">Reset Password</h2>
					<p className="text-gray-500 dark:text-gray-400">
						Enter your email and new password to reset your account.
					</p>
				</div>
				<form action={(formData:FormData) => {


            startTransition(() => {
               resetPassword(formData);
              toast("Your passowrd has been reset!");
             })

        }} className="space-y-4">
					<div>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
              name="email"
							placeholder="your@email.com"
							required
							type="email"
						/>
					</div>
					<div>
						<Label htmlFor="password">New Password</Label>
						<Input name="password" id="password" required type="password" />
					</div>
					<Button className="w-full" type="submit">
						Reset Password
					</Button>
				</form>
			</div>
		</section>
	);
}
