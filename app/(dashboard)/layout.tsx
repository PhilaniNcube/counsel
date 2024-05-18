import Link from "next/link";
import {
	Bell,
	CircleUser,
	Group,
	Home,
	LineChart,
	Menu,
	Package,
	Package2,
	Search,
	ShoppingCart,
	Users,
  Users2Icon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideNavDesktop from "./_components/layout/side-nav-desktop";
import SideNavMobile from "./_components/layout/side-nav-mobile";
import UserNav from "./_components/layout/user-nav";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

 const Dashboard = ({children}:{children:React.ReactNode}) => {
	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<div className="hidden border-r bg-muted/40 md:block">
				<div className="flex flex-col h-full max-h-screen gap-2">
					<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
						<Link href="/" className="flex items-center gap-2 font-semibold">
							<Package2 className="w-6 h-6" />
							<span className="">Acme Inc</span>
						</Link>
						<Button variant="outline" size="icon" className="w-8 h-8 ml-auto">
							<Bell className="w-4 h-4" />
							<span className="sr-only">Toggle notifications</span>
						</Button>
					</div>
					<div className="flex-1">
						<SideNavDesktop />
					</div>
					<div className="p-4 mt-auto">
						<Card x-chunk="dashboard-02-chunk-0">
							<CardHeader className="p-2 pt-0 md:p-4">
								<CardTitle>Upgrade to Pro</CardTitle>
								<CardDescription>
									Unlock all features and get unlimited access to our support
									team.
								</CardDescription>
							</CardHeader>
							<CardContent className="p-2 pt-0 md:p-4 md:pt-0">
								<Button size="sm" className="w-full">
									Upgrade
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
				  <SideNavMobile />
					<div className="flex-1 w-full">
						<form>
							<div className="relative">
								<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
								<Input
									type="search"
									placeholder="Search contacts..."
									className="w-full pl-8 shadow-none appearance-none bg-background md:w-2/3 lg:w-1/3"
								/>
							</div>
						</form>
					</div>
					<UserNav />
				</header>
				<main className="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
          <ScrollArea className="h-[85vh] w-full">
					  {children}
            <ScrollBar />
          </ScrollArea>
				</main>
			</div>
		</div>
	);
}


export default Dashboard;
