import { SignUpForm, signUpSchema } from "@/components/signup-form";
import AuthLayout from "./AuthLayout";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

export const SignUp = () => {
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      console.log("sending data");
      const response = await fetch("http://localhost:3000/auth/signup", {
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
    <>
      <AuthLayout>
        <SignUpForm onSubmit={onSubmit} />
      </AuthLayout>
    </>
  );
};
