import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContact } from "@/utils/queries/contacts";
import { Building2, Mail, Phone, PinIcon } from "lucide-react";

const ContactSummary = async ({ id }: { id: number }) => {
	const { data: contact, errors } = await getContact(id);

	if (errors || !contact) {
		return <div>{errors}</div>;
	}

	return (
		<div className="grid grid-cols-1 border rounded-md md:grid-cols-3 border-spacing-1">
     <div className="col-span-1 p-8 bg-slate-100">
       <div className="flex flex-col items-center justify-center">
         <h1 className="text-2xl font-bold text-slate-700">{contact.first_name} {contact.last_name}</h1>
          <p className="text-lg text-slate-700">{contact.email}</p>
       </div>
     </div>
     <div className="flex flex-row items-start justify-between col-span-1 p-8 md:col-span-2">
        <div className="flex flex-col gap-y-2">
          <p className="text-lg text-slate-700">Contact Information</p>
          <div className="flex flex-row items-center gap-x-2">
            <PinIcon size={24} />
            <p className="text-sm text-slate-700">{contact.address}</p>
          </div>
          <div className="flex flex-row items-center gap-x-2">
            <Building2 size={24} />
            <p className="text-sm text-slate-700">{contact.company}</p>
          </div>
        </div>
        <Badge className="capitalize">{contact.contact_type}</Badge>
     </div>
    </div>
	);
};
export default ContactSummary;
