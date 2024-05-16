import NewCase from "@/app/(dashboard)/_components/cases/new-case";

const page = ({ params: { id } }: { params: { id: number } }) => {
	return (
		<div>
			<NewCase client_id={id} />
		</div>
	);
};
export default page;
