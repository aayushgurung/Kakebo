import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const minLengthErrorMessage = "Password must be at least 8 characters long.";
const maxLengthErrorMessage = "Password must be no more than 20 characters.";
const uppercaseErrorMessage =
  "Password must contain at least one uppercase letter.";
const lowercaseErrorMessage =
  "Password must contain at least one lowercase letter.";
const numberErrorMessage = "Password must contain at least one number.";
const specialCharacterErrorMessage =
  "Password must contain at least one special character (!@#$%^&*).";

const passwordSchema = z
  .string()
  .min(8, { message: minLengthErrorMessage })
  .max(20, { message: maxLengthErrorMessage })
  .refine((password) => /[A-Z]/.test(password), {
    message: uppercaseErrorMessage,
  })
  .refine((password) => /[a-z]/.test(password), {
    message: lowercaseErrorMessage,
  })
  .refine((password) => /[0-9]/.test(password), {
    message: numberErrorMessage,
  });
//   .refine((password) => /[!@#$%^&*]/.test(password), {
//     message: specialCharacterErrorMessage,
//   });

const fullnameErrorMessage = "Full name is required.";
const emailErrorMessage = "Please enter a valid email address.";
const passwordMismatchErrorMessage = "Passwords do not match.";

export const signUpSchema = z
  .object({
    fullname: z.string().min(1, { message: fullnameErrorMessage }),
    email: z
      .string()
      .email({ message: emailErrorMessage })
      .min(1, { message: "Email is required." }),
    password: passwordSchema,
    confirmPassword: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Confirm password is required." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: passwordMismatchErrorMessage,
    path: ["confirmPassword"],
  });

type signUpFormProps = {
  className?: string;
  onSubmit: (data: z.infer<typeof signUpSchema>) => void;
};
export function SignUpForm({ className, onSubmit }: signUpFormProps) {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold ">
            <span className="text-black80">Register an account</span>
          </h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your details below to create your new account.{" "}
          </p>
        </div>
        <Form {...form}>
          <form
            className={cn("flex flex-col gap-4", className)}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-1">
                        <Label className="text-blue700" htmlFor="fullname">
                          Full Name
                        </Label>
                        <FormControl>
                          <Input
                            id="fullname"
                            placeholder="John Doe"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="font-normal" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-1">
                        <Label className="text-blue700" htmlFor="email">
                          Email
                        </Label>
                        <FormControl>
                          <Input
                            id="lastname"
                            placeholder="jhondoe@example.com"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="font-normal" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-1">
                        <Label className="text-blue700" htmlFor="password">
                          Password
                        </Label>
                        <FormControl>
                          <Input
                            id="password"
                            {...field}
                            type="password"
                            placeholder="**********"
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="font-normal" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-1">
                        <Label
                          className="text-blue700"
                          htmlFor="confirmpassword"
                        >
                          Confirm Password
                        </Label>
                        <FormControl>
                          <Input
                            id="confirmpassword"
                            type="password"
                            placeholder="**********"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="font-normal" />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue400 hover:bg-prim10"
              >
                Sign Up
              </Button>
              {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div> */}
              {/* <Button variant="outline" className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                    fill="currentColor"
                  />
                </svg>
                signUp with GitHub
              </Button> */}
            </div>
          </form>
        </Form>
        <div className="text-center text-sm text-black80">
          Don&apos;t have an account?{" "}
          <a href="#" className="underline underline-offset-4">
            Sign up
          </a>
        </div>
      </div>
    </>
  );
}
