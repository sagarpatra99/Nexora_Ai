import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-linear-to-br from-gray-50 to-gray-100">
      
      {/* 404 Heading */}
      <h1 className="text-8xl font-extrabold bg-linear-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
        404
      </h1>

      {/* Title */}
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Oops! Page not found
      </h2>

      {/* Description */}
      <p className="mt-2 text-gray-500 max-w-md">
        The page you’re looking for doesn’t exist or has been moved.  
        Let’s get you back on track.
      </p>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4 flex-wrap justify-center">
        <Link to="/">
          <Button className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Go Home
          </Button>
        </Link>

        <Button
          variant="outline"
          onClick={() => window.history.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
      </div>

      {/* Extra Hint Section */}
      <div className="mt-10 text-sm text-gray-400 flex items-center gap-2">
        <Search className="h-4 w-4" />
        Try searching for products or navigating from the homepage
      </div>

      {/* Decorative Glow */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-linear-to-r from-indigo-200 via-purple-200 to-pink-200"></div>
    </div>
  );
};