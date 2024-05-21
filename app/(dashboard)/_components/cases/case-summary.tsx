import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Database } from "@/schema";
import Link from "next/link";

type CaseSummaryProps = {
  case: Database['public']['Tables']['cases']['Row']
}

const CaseSummary = ({
	case: caseProp,
}: { case: Database["public"]["Tables"]["cases"]["Row"] }) => {


	return (
		<div className="p-4 rounded-md shadow-lg bg-slate-100">
			<div className="flex items-center justify-between mb-4">
        <Link href={`/dashboard/cases/${caseProp.id}`}>
          <Button className="rounded-full" >
            View Case
          </Button>
        </Link>
				<h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50">
					Case: {caseProp.case_number}
				</h1>
				<div
					className={cn(
						"px-3 py-1 text-sm font-medium  rounded-full ",
						caseProp.completed
							? "bg-green-100 text-green-800"
							: "bg-zinc-100 text-zinc-800",
					)}
				>
					{caseProp.completed ? "Completed" : "In Progress"}
				</div>
			</div>
			<p className="mb-6 text-gray-700 dark:text-gray-400">
				{caseProp.description}
			</p>
			<div className="grid grid-cols-2 gap-4">
				<div>
					<p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
						Start Date
					</p>
					<p className="font-medium text-gray-900 dark:text-gray-50">
						{caseProp.start_date}
					</p>
				</div>
				<div>
					<p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
						End Date
					</p>
					<p className="font-medium text-gray-900 dark:text-gray-50">
						{caseProp.end_date ? caseProp.end_date : "---"}
					</p>
				</div>
			</div>
		</div>
	);
};
export default CaseSummary;
