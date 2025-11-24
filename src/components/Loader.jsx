import React from "react";
import { LoaderPinwheel  } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center my-6">
      <LoaderPinwheel className="animate-spin w-12 h-12 text-white" />
    </div>
  );
}
