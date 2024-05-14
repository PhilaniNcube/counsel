"use client";

import { cn } from "@/lib/utils";
import { HandIcon, Home, LineChart, Package, Users, Users2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideNavDesktop = () => {

  const pathname = usePathname();

  return (
			<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
				<Link
					href="/dashboard"
					className={cn(
						"flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary",
						pathname === "/dashboard" ? "bg-slate-200" : "",
					)}
				>
					<Home className="w-4 h-4" />
					Dashboard
				</Link>
				<Link
					href="/dashboard/team"
					className={cn(
						"flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary",
						pathname === "/dashboard/team" ? "bg-slate-200" : "",
					)}
				>
					<HandIcon className="w-4 h-4" />
					Team
					{/* <Badge className="flex items-center justify-center w-6 h-6 ml-auto rounded-full shrink-0">
									6
								</Badge> */}
				</Link>
				<Link
					href="/dashboard/cases"
					className={cn(
						"flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary",
						pathname === "/dashboard/cases" ? "bg-slate-200" : "",
					)}
				>
					<Package className="w-4 h-4" />
					Cases{" "}
				</Link>
				<Link
					href="/dashboard/clients"
					className={cn(
						"flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary",
						pathname.startsWith("/dashboard/clients") === true ? "bg-slate-200"
							: "",
					)}
				>
					<Users className="w-4 h-4" />
					Clients
				</Link>
				<Link
					href="/dashboard/analytics"
					className={cn(
						"flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary",
						pathname === "/dashboard/analytics" ? "bg-slate-200" : "",
					)}
				>
					<LineChart className="w-4 h-4" />
					Analytics
				</Link>
			</nav>
		);
};
export default SideNavDesktop;
