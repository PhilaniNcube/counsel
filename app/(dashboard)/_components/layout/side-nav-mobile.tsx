"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, LineChart, Menu, Package, Package2, ShoppingCart, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SideNavMobile = () => {
  return (
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="shrink-0 md:hidden">
						<Menu className="w-5 h-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="flex flex-col">
					<nav className="grid gap-2 text-lg font-medium">
						<Link
							href="#"
							className="flex items-center gap-2 text-lg font-semibold"
						>
							<Image
								src="/images/scale.webp"
								width={500}
								height={500}
								alt="Counsel"
								className="w-6 h-6"
							/>
							<span className="font-extrabold">Counsel</span>
						</Link>
						<Link
							href="#"
							className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
						>
							<Home className="w-5 h-5" />
							Dashboard
						</Link>
						<Link
							href="#"
							className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
						>
							<ShoppingCart className="w-5 h-5" />
							Orders
							{/* <Badge className="flex items-center justify-center w-6 h-6 ml-auto rounded-full shrink-0">
								6
							</Badge> */}
						</Link>
						<Link
							href="#"
							className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
						>
							<Package className="w-5 h-5" />
							Products
						</Link>
						<Link
							href="#"
							className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
						>
							<Users className="w-5 h-5" />
							Customers
						</Link>
						<Link
							href="#"
							className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
						>
							<LineChart className="w-5 h-5" />
							Analytics
						</Link>
					</nav>
					<div className="mt-auto">
						<Card>
							<CardHeader>
								<CardTitle>Upgrade to Pro</CardTitle>
								<CardDescription>
									Unlock all features and get unlimited access to our support
									team.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Button size="sm" className="w-full">
									Upgrade
								</Button>
							</CardContent>
						</Card>
					</div>
				</SheetContent>
			</Sheet>
		);
};
export default SideNavMobile;
