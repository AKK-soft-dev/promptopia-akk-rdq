import Image from "next/image";

const LoadingProfile = () => {
  return (
    <div className="w-full flex-col flex-center items-center">
      <Image
        src="/assets/icons/loader.svg"
        width={50}
        height={50}
        alt="Loading indicator"
        className="object-contain"
      />
    </div>
  );
};

export default LoadingProfile;
