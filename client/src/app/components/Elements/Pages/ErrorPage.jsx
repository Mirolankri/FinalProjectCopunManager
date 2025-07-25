import React from "react";
import { OctagonX } from "lucide-react";

const ErrorPage = ({ error }) => {
  return (
    <div className="flex items-center justify-center h-full text-2xl gap-2">
      {error}
      <OctagonX className="size-7 text-red-400" />
    </div>
  );
};

export default ErrorPage;
