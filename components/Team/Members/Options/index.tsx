import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Options = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button>Options</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>Option 1</DropdownMenuItem>
				<DropdownMenuItem>Option 2</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
export default Options;
