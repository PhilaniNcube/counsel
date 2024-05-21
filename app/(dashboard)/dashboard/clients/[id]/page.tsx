import CaseSummary from "@/app/(dashboard)/_components/cases/case-summary";
import NewCase from "@/app/(dashboard)/_components/cases/new-case";
import ContactSummary from "@/app/(dashboard)/_components/contacts/contact-summary";
import { Separator } from "@/components/ui/separator";
import { getClientCases } from "@/utils/queries/cases";
import { getTasksByCaseId } from "@/utils/queries/tasks";

const page = async ({ params: { id } }: { params: { id: number } }) => {



  const {data, error} = await getClientCases(Number(id));




	return (
		<div>
			<div className="flex flex-row items-start justify-between">
				<ContactSummary id={id} />
				<NewCase client_id={id} />
			</div>
			<Separator className="my-2 bg-slate-300" />
			<div className="">
				{error || data === null
					? null
					: data.map((c) => <CaseSummary case={c} key={c.id} />)}
			</div>
		</div>
	);
};
export default page;
