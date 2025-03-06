// components/AuthLayout.tsx

import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-white80">
      <div className="relative bg-transparent flex items-center justify-center">
        <div className="z-10">
          <div className="text-heading-1 font-medium text-second30 leading-tight">
            Master Your Money, <br /> One Step at a Time.
          </div>
          <div className="flex justify-center font-medium text-prim10 mt-2">
            Start budgeting with Kakebo
          </div>
        </div>
        <img
          src="/login/bonsai.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover opacity-10 left-14 top-10"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10 bg-white100 z-20">
        <div className="flex flex-1 items-center justify-center my-auto">
          <div className="w-full max-w-lg">{children}</div>
        </div>
      </div>
    </div>
  );
}
