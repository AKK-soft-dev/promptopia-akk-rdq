"use client";

import Image from "next/image";

const LoadingIndicator = ({ showLabel }) => {
  return (
    <div className="w-full flex flex-center items-center">
      <Image
        src="/assets/icons/loader.svg"
        width={50}
        height={50}
        alt="Loading indicator"
        className="object-contain"
      />
      {showLabel && <span className="orange_gradient">Loading prompts</span>}
    </div>
  );
};

export default LoadingIndicator;
