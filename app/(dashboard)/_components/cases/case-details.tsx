import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/lib/utils";
import { getCaseCostsById, getTotalCaseCost } from "@/utils/queries/case-costs";
import { getCase } from "@/utils/queries/cases";
import { getTasksByCaseId } from "@/utils/queries/tasks";
import { CheckIcon, Hourglass, XIcon } from "lucide-react";
import { notFound } from "next/navigation";
import Tasks from "../tasks/tasks";
import { getMemberId } from "@/utils/queries/members";

const CaseDetails = async ({ id }: { id: number }) => {
	const caseDataPromise =  getCase(id);

	const caseCostDataPromise =  getCaseCostsById(id);

  const totalCostDataPromise =  getTotalCaseCost(id);

  const [caseData, caseCostData, totalCostData] = await Promise.all([caseDataPromise, caseCostDataPromise, totalCostDataPromise]);

  const { data, error } = caseData;

  const { data:caseCosts, error:caseCostsError } = caseCostData;

  const { data:totalCosts, error:totalCostError  } = totalCostData;

  const memberId = await getMemberId();

  const { data: tasks, error: tasksError } = await getTasksByCaseId(Number(id));

	if (error || !data) {
		notFound();
	}

	return (
		<div className="grid gap-3 py-6 rounded-md shadow-md md:py-8 md:grid-cols-2">
			<div className="relative p-6 mx-auto prose prose-gray dark:prose-invert bg-zinc-100">
				<div className="space-y-2 not-prose ">
					<h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem]">
						{data.description}
					</h1>
					<div className="flex items-center gap-4 text-sm">
						<div>
							<span className="font-bold">Case #:</span>
							{data.case_number}
						</div>
						<div>
							<span className="font-bold">Client ID:</span>
							{id}
						</div>
						<div>
							<span className="font-bold">Start Date:</span>
							{data.start_date}
						</div>
						<div>
							<span className="font-bold">End Date:</span>
							{data.end_date ? data.end_date : "---"}
						</div>
						{data.completed === true ? (
							<div className="absolute inline-flex items-center px-3 py-1 text-green-900 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-100 top-3 right-4">
								<CheckIcon className="w-4 h-4 mr-2" />
								Completed
							</div>
						) : (
							<div className="absolute inline-flex items-center px-3 py-1 text-red-900 bg-red-100 rounded-full top-3 right-4 dark:bg-red-900 dark:text-red-100">
								<Hourglass className="w-4 h-4 mr-2" />
								Pending
							</div>
						)}
					</div>
				</div>
				<div className="mt-8 space-y-4">
					<h2 className="text-2xl font-bold">Contact Details</h2>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div className="space-y-2">
							<div className="text-xl font-semibold">Name</div>
							<div>
								{data.contacts?.first_name} {data.contacts?.last_name}
							</div>
						</div>
						<div className="space-y-2">
							<div className="text-xl font-semibold">Email</div>
							<div>samurai@jackson.com</div>
						</div>
						<div className="space-y-2">
							<div className="text-xl font-semibold">Phone</div>
							<div>031556982</div>
						</div>
						<div className="space-y-2">
							<div className="text-xl font-semibold">Company</div>
							<div>Cartoon Network</div>
						</div>
						<div className="space-y-2">
							<div className="text-xl font-semibold">Contact Type</div>
							<div>opposing counsel</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-8 space-y-4">
				<h2 className="text-2xl font-bold">
					Case Costs{" "}
					{totalCostError || totalCosts === null ? (
						<span>: {formatCurrency(0)}</span>
					) : (
						<span>: {formatCurrency(totalCosts)}</span>
					)}
				</h2>
				<div className="grid grid-cols-1 gap-4">
					{caseCostsError || caseCosts === null || caseCosts.length === 0 ? (
						<div>
							<div className="p-4 bg-white rounded-md shadow-md">
								<h3 className="text-xl font-semibold">No Case Costs</h3>
								<p className="text-gray-500">
									There are no costs associated with this case
								</p>
							</div>
						</div>
					) : (
						caseCosts.map((cost) => (
							<div
								key={cost.id}
								className="p-4 rounded-md shadow-md bg-slate-50"
							>
								<div className="flex items-center justify-between">
									<h3 className="text-xl font-semibold">{cost.title}</h3>
									<div className="text-sm font-semibold">
										{formatCurrency(cost.cost)}
									</div>
								</div>
								<p className="text-gray-500">{cost.description}</p>
							</div>
						))
					)}
				</div>
			</div>
			<div className="col-span-2">
				<Tasks case_id={id} member_id={memberId || 1} tasks={tasks || []} />
			</div>
		</div>
	);
};
export default CaseDetails;
