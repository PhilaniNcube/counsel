
import type { ReactNode } from "react";
import Header from "./_components/header";

const PublicLayout = ({children}:{children:ReactNode}) => {
  return <section className="w-full container">
    <Header />
    {children}
  </section>;
};
export default PublicLayout;
