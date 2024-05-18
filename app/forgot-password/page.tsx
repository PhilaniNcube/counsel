/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Tl74Ty7FdH3
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
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
import { SubmitButton } from "@/components/submit-button";
import ForgotPasswordForm from "@/components/Auth/forgot-password";

export default function ForgotPassword() {
	return (
		<div>
			<ForgotPasswordForm />
		</div>
	);
}
