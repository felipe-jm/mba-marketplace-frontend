import { PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo-only.svg";
import { Avatar } from "./avatar";
import { Button } from "./button";
import { NavBar } from "./nav-bar";

export function Header() {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1920px] w-full p-5 mx-auto h-20 bg-shape-background border-b border-b-shape-shape">
      <div className="grid grid-cols-3 items-center">
        <button onClick={() => navigate("/")}>
          <img src={logo} alt="logo" className="place-items-start" />
        </button>

        <div className="flex justify-center items-center">
          <NavBar />
        </div>

        <div className="flex items-center justify-end gap-4">
          <Button onClick={() => navigate("/products/new")}>
            <PlusIcon /> Novo produto
          </Button>
          <Avatar />
        </div>
      </div>
    </div>
  );
}
