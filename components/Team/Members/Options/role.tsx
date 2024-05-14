"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectValue,
} from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";

const Role = ({
	selected = "member",
	setSelected,
}: {
	selected: string;
	setSelected: (v: string) => void;
}) => {
	const roles = ["admin", "manager", "member"];

	return (
		<Select defaultValue={selected} onValueChange={setSelected}>
			<SelectTrigger>
				<SelectValue className="capitalize" placeholder="Select a role" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Roles</SelectLabel>
					{roles.map((role) => (
						<SelectItem key={role} value={role} className="capitalize">
							{role}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};
export default Role;
