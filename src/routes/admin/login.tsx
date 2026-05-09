import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { authApi } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

import logo from "@/assets/Gracelogo.webp";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authApi.login({ email, password });
      toast.success("Welcome back, Admin!");
      navigate({ to: "/admin" });
    } catch (error) {
      // toast.error is handled by axios interceptor
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl border border-border shadow-xl p-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="h-20 w-20 flex items-center justify-center mx-auto mb-4 overflow-hidden">
              <img src={logo} alt="Grace Aesthetics" className="h-full w-full object-contain" />
            </div>
            <h1 className="text-2xl font-display font-bold">Admin Portal</h1>
            <p className="text-muted-foreground">Please sign in to manage your clinic.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <Input 
                type="email" 
                placeholder="admin@graceaestheticsclinic.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <Button type="submit" className="w-full h-12 rounded-xl text-base" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground italic">
              "Beauty is confidence, applied with precision."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
