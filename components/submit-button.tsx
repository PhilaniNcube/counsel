"use client";

import { useFormStatus } from "react-dom";
import type {  ComponentProps } from "react";
import { Button } from "./ui/button";
import { CircleDashed } from "lucide-react";

type Props = ComponentProps<"button"> & {
  pendingText?: string;
};

export function SubmitButton({ children, pendingText, ...props }: Props) {
  const { pending } = useFormStatus();



  return (
			<Button type="submit" className="w-full" aria-disabled={pending}>
				{pending ? <CircleDashed className="animate-spin" /> : children}
			</Button>
		);
}
