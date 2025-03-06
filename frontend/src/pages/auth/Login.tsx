import { LoginForm } from "@/components/login-form";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import AuthLayout from "./AuthLayout";

const loginSchema = z.object({
  email: z
    .string({ required_error: "Enter email address" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Enter password" })
    .min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      console.log("sending data");
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("data sent", response);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit data");
      }
      const resp = await response.json();
      if (resp.token) {
        localStorage.setItem("auth_token", resp.token);
        console.log("Token stored successfully");
      }
      toast({
        title: "Data Submitted Successfully",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthLayout>
      <LoginForm onSubmit={onSubmit} />
    </AuthLayout>
  );
}
