import React from "react";

export default function Container({ children }) {
  return (
    <div className="w-full h-full max-w-7xl px-4 mx-auto ">{children}</div>
  );
}
