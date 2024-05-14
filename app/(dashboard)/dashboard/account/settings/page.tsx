import NewOrganization from "@/app/(dashboard)/_components/organization/new";

const page = () => {
  return (
			<div>
				<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
					<NewOrganization />
				</div>
			</div>
		);
};
export default page;
