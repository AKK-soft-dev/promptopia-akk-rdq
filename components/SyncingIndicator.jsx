import LoadingIndicator from "./LoadingIndicator";

const SyncingIndicator = ({ alignCenter }) => {
  return (
    <div
      className={`absolute ${
        alignCenter
          ? "op-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-10"
          : "top-0 end-0 mt-5"
      }`}
    >
      <LoadingIndicator />
    </div>
  );
};

export default SyncingIndicator;
