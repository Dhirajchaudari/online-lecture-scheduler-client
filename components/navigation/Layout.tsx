import React from "react";
import Sidebar from "./common/Siderbar"
import Dashboard from "../modules/dashboard";
import useGlobalStore from "@/store/global"
import Heading from "../common/heading/Heading";
import { modules } from "./common/accessConfig";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { selectedModule } = useGlobalStore();

  const renderModule = () => {

        const selected = modules.find(
          (mod) =>
            mod.name === selectedModule)
    
    if (selected) {
              const Component = selected.component;
              return <Component />;
    }

      return <Dashboard />;
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-[#F3F3F3] w-full h-screen overflow-x-hidden">
        <Heading title={selectedModule} />
        <div className="flex p-4 bg-[#F3F3F3] h-full">
          {children}
          {renderModule()}
        </div>
      </div>
    </div>
  );
};

export default Layout;
