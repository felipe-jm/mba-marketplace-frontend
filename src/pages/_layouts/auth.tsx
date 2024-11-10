import { Outlet } from "react-router-dom";

import background from "@/assets/auth-background.svg";
import logo from "@/assets/logo.svg";

export function AuthLayout() {
  return (
    <div className="min-h-screen grid grid-cols-2 antialiased max-w-[1366px] mx-auto">
      <div className="flex flex-col gap-8 px-8 py-8">
        <div>
          <img src={logo} alt="MBA Marketplace" />
        </div>

        <div className="flex flex-col items-center justify-center relative">
          <img src={background} alt="" className="w-[755px] h-[496px]" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
