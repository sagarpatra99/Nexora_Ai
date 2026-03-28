import { Loader2 } from "lucide-react";

export const PageLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      
      {/* Spinner */}
      <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />

      {/* Text */}
      <p className="mt-4 text-gray-600 text-sm">
        Loading, please wait...
      </p>
    </div>
  );
};