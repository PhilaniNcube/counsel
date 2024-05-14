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
import { signIn } from "@/utils/actions/auth";
import { SubmitButton } from "../submit-button";


export function LoginForm() {
	return (
		<Card className="max-w-sm mx-auto">
			<CardHeader>
				<CardTitle className="text-2xl">Login</CardTitle>
				<CardDescription>
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
        <form action={signIn}>
				<div className="grid gap-4">
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
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
							<Link href="#" className="inline-block ml-auto text-sm underline">
								Forgot your password?
							</Link>
						</div>
						<Input id="password" name="password" type="password" required />
					</div>
					<SubmitButton type="submit" className="w-full">
						Login
					</SubmitButton>

				</div>
				<div className="mt-4 text-sm text-center">
					Don&apos;t have an account?{" "}
					<Link href="/sign-up" className="underline">
						Sign up
					</Link>
				</div>
        </form>
			</CardContent>
		</Card>
	);
}
