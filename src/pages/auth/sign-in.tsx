import { Helmet } from "react-helmet-async";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignIn() {
  return (
    <>
      <Helmet title="Login" />

      <div className="w-full h-full bg-white rounded-lg my-6 py-[4.5rem] px-[5rem] flex flex-col justify-between gap-6">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-2">
            <h1 className="font-dmsans text-2xl font-bold tracking-tight">
              Acesse sua conta
            </h1>
            <span className="text-base text-muted-foreground">
              Informe seu e-mail e senha para entrar
            </span>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-MAIL</Label>
              <Input
                id="email"
                type="email"
                placeholder="Seu e-mail cadastrado"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">SENHA</Label>
              <Input
                id="password"
                type="password"
                placeholder="Sua senha de acesso"
              />
            </div>

            <Button type="submit">Acessar</Button>
          </form>
        </div>

        <div className="space-y-2">
          <span className="text-muted-foreground">
            Ainda não tem uma conta?
          </span>
          <button className="text-primary font-medium block w-full border border-primary rounded-lg px-4 py-2.5 hover:bg-primary/5">
            Cadastrar
          </button>
        </div>
      </div>
    </>
  );
}
