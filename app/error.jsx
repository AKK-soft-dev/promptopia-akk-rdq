"use client";

const Error = ({ error, reset }) => {
  return (
    <div>
      <h1>Something Wrong!</h1>
      <p>{error.message}</p>
    </div>
  );
};

export default Error;
