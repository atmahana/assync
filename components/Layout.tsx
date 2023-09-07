import React, { Suspense } from "react";

import FollowBar from "@/components/layout/FollowBar";
import Sidebar from "@/components/layout/Sidebar";
import Skeleton from "./Skeleton";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen">
      <div className="container h-full mx-auto sm:pt-3 xl:px-30">
        <div className="relative h-full">
          <Sidebar />
          <div className="sm:pl-[266px] lg:pl-80 2xl:pl-[21rem] sm:grid grid-cols-4 gap-10">
            <div className="sm:col-span-4 xl:col-span-3">{children}</div>
            <FollowBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
