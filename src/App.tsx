import "./index.css";
import "dayjs/locale/pt-br";

import dayjs from "dayjs";

dayjs.locale("pt-br");

import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import { queryClient } from "./lib/react-query";
import { router } from "./routes";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Toaster richColors />
        <RouterProvider router={router} />
      </HelmetProvider>
    </QueryClientProvider>
  );
}
