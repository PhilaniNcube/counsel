import { DataTable } from "@/components/data-table";
import { getContacts } from "@/utils/queries/contacts";
import { contactcolumns } from "./columns";
import { Separator } from "@/components/ui/separator";



const ContactsTable = async () => {

  const { data: contacts, errors } = await getContacts();


  if(errors.length !== 0 || contacts === null) {
    return (
      <div>
        <p>Could not fetch contacts</p>
      </div>
    )
  }

  return (
			<div className="">
        <Separator className="my-3" />
				<DataTable columns={contactcolumns} data={contacts} />
			</div>
		);
};
export default ContactsTable;
