import React from "react";

const Loader = () => {
  return (
    <div className="min-h-screen w-full flex justify-center pt-[20%] dark:bg-dark-primary bg-light-primary">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-[#1d4ed8] animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-[#1d4ed8] animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-[#1d4ed8] animate-bounce [animation-delay:.7s]"></div>
      </div>
    </div>
  );
};

export default Loader;
