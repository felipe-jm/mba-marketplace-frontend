import { Outlet } from "react-router-dom";

import background from "@/assets/auth-background.svg";
import logo from "@/assets/logo.svg";

export function AuthLayout() {
  return (
    <div className="bg-shape-background">
      <div className="max-w-screen-[1920px] mx-auto grid min-h-screen grid-cols-2 antialiased">
        <div className="flex h-full flex-col p-10">
          <img src={logo} alt="logo" className="w-[267px]" />
          <img src={background} alt="background" className="mt-14" />
        </div>

        <div className="relative flex flex-col items-center justify-center p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
