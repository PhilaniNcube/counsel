import { Suspense } from "react";
import ContactsTable from "../../_components/contacts/contacts-table";
import NewContact from "../../_components/contacts/new-contact";

const page = () => {
	return (
		<div>
			<NewContact />
			<Suspense fallback={<div>Loading...</div>}>
				<ContactsTable />
			</Suspense>
		</div>
	);
};
export default page;
