/**
 * v0 by Vercel.
 * @see https://v0.dev/t/GaIvNKQ1Zk7
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MountainIcon } from "lucide-react";
import Image from "next/image";

export default function Header() {
	return (
		<header className="flex h-20 w-full items-center justify-between px-4 md:px-0 container">
			<Link className="flex items-center gap-2" href="#">
				<Image
					src="/images/scale.webp"
					width={500}
					height={500}
					alt="Counsel"
					className="w-6 h-6"
				/>
				<span className="font-extrabold">Counsel</span>
			</Link>
			<nav className="ml-auto flex gap-4">
				<Button variant="outline">
					<Link href="/login">Sign in</Link>
				</Button>
				<Button>
					<Link href="/sign-up">Sign Up</Link>
				</Button>
			</nav>
		</header>
	);
}

