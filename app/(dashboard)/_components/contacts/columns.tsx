"use client";

import { Badge } from "@/components/ui/badge";
import { useHelpers } from "@/hooks/useHelpers";
import type { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import type { ExtendedMember } from "@/types";
import type { Database } from "@/schema";

export const contactcolumns: ColumnDef<
	Database["public"]["Tables"]["contacts"]["Row"]
>[] = [
	{
		accessorKey: "first_name",
		header: "First Name",
		cell: ({ row }) => {
			const first_name: string = row.getValue("first_name") || "";
			const last_name = row.original.last_name || "";
			const email = row.original.email || "";

			return (
				<div className="flex items-center gap-2">
					<div className="flex flex-col">
						<h2 className="font-medium">
							{first_name} {last_name}
						</h2>
						<p className="text-sm text-gray-500">{email}</p>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "phone",
		header: "Phone Number",
		cell: ({ row }) => {
			const phone: string = row.getValue("phone") || "";
			return (
				<div className="flex items-center gap-2">
					<div className="flex flex-col">
						<h2 className="font-medium">
							{phone}
						</h2>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "company",
		header: "Company",
		cell: ({ row }) => {
			const company: string = row.getValue("company") || "";
      const address:string = row.original.address || "";
			return (
				<div className="flex items-center gap-2">
					<div className="flex flex-col">
						<h2 className="font-medium">
							{company}
						</h2>
            <p className="text-sm text-slate-500">{address}</p>
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "contact_type",
		header: "Type",
		cell: ({ row }) => {
			const contact_type: string = row.getValue("contact_type") || "";
			return (
				<div className="flex items-center gap-2">
					<div className="flex flex-col">
						<h2 className="font-medium capitalize">
							{contact_type}
						</h2>
					</div>
				</div>
			);
		},
	},

];
