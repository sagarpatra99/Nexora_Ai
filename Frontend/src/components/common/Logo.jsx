import { Package } from "lucide-react";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center justify-center gap-2 shrink-0">
      <div className="rounded-xl p-1.5 bg-[linear-gradient(135deg,hsl(230,65%,25%),hsl(262,83%,58%))]">
        <Package className="h-5 w-5 text-white" />
      </div>
      <span className="text-xl font-bold tracking-tight log">
        Nexora<span className="text-[#6D38DA]">.ai</span>
      </span>
    </Link>
  );
};
