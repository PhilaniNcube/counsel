import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
	return (
		<div className="grid container lg:px-0 px-4 md:grid-cols-2">
			<div className="w-full flex flex-col justify-center space-y-3">
				<h1 className="text-4xl font-bold">Welcome to Counsel</h1>
				<p className="text-lg mt-4">
					Manage your firms cases, notes and costs all in one place. Consolidate
					the knowledge of your team and keep everyone on the same page
				</p>
        <div>

          <div className="flex flex-row flex-wrap max-w-md">
            <Badge className="mr-2 mt-2 bg-slate-800">Contacts/Clients</Badge>
            <Badge className="mr-2 mt-2 bg-sky-800">Teams/Team Members</Badge>
            <Badge className="mr-2 mt-2 bg-zinc-900">Cases</Badge>
            <Badge className="mr-2 mt-2">Case Notes/Costs</Badge>
            <Badge className="mr-2 mt-2 bg-yellow-900">Documents</Badge>
          </div>
        </div>
				<Button className="mt-4 rounded-full text-white px-4 py-2 max-w-[150px]">
					<Link href="/sign-up">Get Started
          <ArrowRight className="inline ml-2" />
          </Link>
				</Button>
			</div>
      <div>
        <Image src="/images/lawyers.jpg" width={604} height={959} className="w-full object-cover max-h-[550px]" alt="hero" />
      </div>
		</div>
	);
};
export default Hero;
