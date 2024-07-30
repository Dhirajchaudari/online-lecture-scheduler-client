import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="w-full mx-auto px-4">
      <h1 className="text-2xl font-light mb-4 text-black">Hello there 😉</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5"></div>
    </div>
  );
};

export default Dashboard;
