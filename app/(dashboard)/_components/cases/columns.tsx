"use client";

import { Badge } from "@/components/ui/badge";
import { useHelpers } from "@/hooks/useHelpers";
import type { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import type { ExtendedMember } from "@/types";
import type { Database } from "@/schema";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotSquareIcon, EllipsisIcon } from "lucide-react";
import Link from "next/link";

type DefColumns = Database["public"]["Tables"]["cases"]["Row"]

type ClientColumns = {
  client: {
    first_name: string;
    last_name: string;
  }
}

// combine the two types
type CaseColumns = DefColumns & ClientColumns


export const casesColumns: ColumnDef<DefColumns>[] = [
	{
		accessorKey: "case_number",
		header: "Case Number",
		cell: ({ row }) => {
			const case_number: string = row.getValue("case_number") || "";
			return (
				<div className="flex items-center gap-2">
					<div className="flex flex-col">
						<h2 className="font-medium">Case: {case_number}</h2>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "start_date",
		header: "Start Date",
		cell: ({ row }) => {
			const start_date: string = row.getValue("start_date") || "";
			return (
				<div className="flex items-center gap-2">
					<div className="flex flex-col">
						<h2 className="font-medium">{start_date}</h2>
					</div>
				</div>
			);
		},
	},

	{
		accessorKey: "completed",
		header: "Status",
		cell: ({ row }) => {
			const status: boolean = row.getValue("completed") || false;
			return (
				<div className="flex items-center gap-2">
					<div className="flex flex-col">
						<h2 className="font-medium capitalize">
							{status ? "Completed" : "In Progress"}
						</h2>
					</div>
				</div>
			);
		},
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {
			const { open, setOpen } = useHelpers();
			const id = row.original.id;
			return (
				<DropdownMenu open={open} onOpenChange={setOpen}>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost">
							<EllipsisIcon />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuGroup>
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem>
								<Link href={`/dashboard/cases/${id}`}>View</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
