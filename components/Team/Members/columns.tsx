"use client";

import { Badge } from "@/components/ui/badge";
import { useHelpers } from "@/hooks/useHelpers";
import type { ColumnDef } from "@tanstack/react-table";
import Role from "./Options/role";
import { cn } from "@/lib/utils";
import type { ExtendedMember } from "@/types";



export const columns: ColumnDef<ExtendedMember>[] = [
	{
		accessorKey: "full_name",
		header: "Name",
		cell: ({ row }) => {
			const name:string = row.original.profile.full_name || "" ;
			const email = row.original.profile.email || "" ;


			return (
				<div className="flex items-center gap-2">
					<div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
						{name[0] || ""}
					</div>
					<div className="flex flex-col">
						<h2 className="font-medium">{name}</h2>
						<p className="text-sm text-gray-500">{email}</p>
					</div>
				</div>
			);
		},
	},
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const {loading, setLoading, open, setOpen, selected, setSelected} = useHelpers();
      const role:string = row.getValue("role") || "";

      const onRoleChanged = (v:string) => {
        try {
          setLoading(true);
          alert(v);
        } catch (error) {
          throw new Error("Failed to update role");
        } finally {
          setOpen(false);
          setLoading(false);
        }

      }

      return <div onClick={() => setOpen(!open)} onKeyDown={() => setOpen(!open)} className="w-[200px]">
        {!open ? <span className="text-sm capitalize text-neutral-500">{role}</span> : <Role {...{selected:role}} setSelected={(v) => onRoleChanged(v)} />}
      </div>;

      // return <Role {...{selected:role}} setSelected={(v) => onRoleChanged(v)} />;
    },
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => {
  //     const status:string = row.getValue("status") || "";

  //     return <Badge className={cn("capitalize",
  //       status === "active" ? "bg-green-500" : "bg-red-500",
  //       status === "pending" ? "bg-yellow-500" : ""
  //     )}>{status}</Badge>;
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return <div className="flex justify-end">
          Actions
      </div>
    },
  }
];
