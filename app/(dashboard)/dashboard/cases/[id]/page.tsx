import CaseDetails from "@/app/(dashboard)/_components/cases/case-details";
import NewCaseCosts from "@/app/(dashboard)/_components/cases/new-case-costs";
import { getCase } from "@/utils/queries/cases";

const page =  ({params:{id}}:{params:{id:number}}) => {



	return <div className="relative">
    <NewCaseCosts case_id={id} />
    <CaseDetails id={id} />
  </div>;
};
export default page;
