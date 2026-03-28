import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, Eye, EyeOff, User, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/common/Logo";

export default function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    const { error } = "";
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created! Please check your email to verify.");
      navigate("/login");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, hsl(230,65%,97%), hsl(262,83%,97%))",
      }}
    >
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="text-center space-y-0">
          <Logo />
          <CardTitle className="text-xl">Create Account</CardTitle>
          <CardDescription className="text-gray-600">
            Join Nexora.ai as a buyer or seller
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="space-y-4">
            {/* Role Selection */}
            <div className="space-y-2">
              <Label>I want to</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("user")}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all cursor-pointer",
                    role === "user"
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-400 hover:border-gray-500",
                  )}
                >
                  <User
                    className={cn(
                      "h-6 w-6",
                      role === "user" ? "text-purple-600" : "text-gray-500",
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm font-medium",
                      role === "user" ? "text-purple-600" : "text-gray-500",
                    )}
                  >
                    Buy Products
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("seller")}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all cursor-pointer",
                    role === "seller"
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-400 hover:border-gray-500",
                  )}
                >
                  <Store
                    className={cn(
                      "h-6 w-6",
                      role === "seller" ? "text-purple-600" : "text-gray-500",
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm font-medium",
                      role === "seller" ? "text-purple-600" : "text-gray-500",
                    )}
                  >
                    Sell Products
                  </span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 border-0">
            <Button
              type="submit"
              className="w-full text-white border-0 bg-[linear-gradient(135deg,hsl(230,65%,25%),hsl(262,83%,58%))]"
              disabled={loading}
            >
              {loading
                ? "Creating account..."
                : `Create ${role === "seller" ? "Seller" : ""} Account`}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-[#7C3BED] hover:underline">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
