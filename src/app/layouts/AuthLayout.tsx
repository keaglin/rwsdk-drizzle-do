import { type PropsWithChildren } from "react";

export function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-sm">
        <div className="mb-6 flex justify-center">
          <h1 className="text-2xl font-bold">Tenshu</h1>
        </div>
        {children}
      </div>
    </div>
  );
}
