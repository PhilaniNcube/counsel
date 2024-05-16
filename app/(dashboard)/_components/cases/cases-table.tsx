import { DataTable } from "@/components/data-table";

import { Separator } from "@/components/ui/separator";
import { getOrgCases } from "@/utils/queries/cases";
import { casesColumns } from "./columns";

const CasesTable = async () => {
	const { data: cases, error } = await getOrgCases();

	if (error || cases === null) {
		return (
			<div>
				<p>Could not fetch cases</p>
			</div>
		);
	}

	return (
		<div className="">
			<Separator className="my-3" />
			<DataTable columns={casesColumns} data={cases} />
		</div>
	);
};
export default CasesTable;
