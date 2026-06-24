"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useRegisterForm } from "@/src/features/auth/hooks/use-register-form";
import { useAuthSession } from "@/src/features/auth/hooks/use-auth-session";

function RegisterPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isHydrating } = useAuthSession();
  const { form, onSubmit, isPending, isSuccess, confirmationEmail, confirmationMessage } =
    useRegisterForm();

  useEffect(() => {
    if (!isHydrating && isAuthenticated) {
      const redirectParam = searchParams.get("redirect");
      const isSafeInternalRedirect =
        Boolean(redirectParam) &&
        redirectParam?.startsWith("/") &&
        !redirectParam?.startsWith("//") &&
        !redirectParam?.startsWith("/login") &&
        !redirectParam?.startsWith("/register");

      router.replace(isSafeInternalRedirect ? (redirectParam as string) : "/offers");
    }
  }, [isAuthenticated, isHydrating, router, searchParams]);

  return (
    <main className="mx-auto flex min-h-[80vh] w-full max-w-md items-center px-4 py-8 sm:px-6 sm:py-10">
      <form onSubmit={onSubmit} className="w-full rounded-xl border border-zinc-200 p-5 shadow-sm sm:p-6">
        <h1 className="mb-5 text-xl font-bold text-zinc-900 sm:text-2xl">Criar conta</h1>

        {isSuccess ? (
          <div className="mb-5 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-900">
            <p className="font-semibold">Confirme sua conta para entrar.</p>
            <p className="mt-1">
              {confirmationMessage ??
                "Enviamos um e-mail de confirmação para ativar sua conta."}
            </p>
            {confirmationEmail ? (
              <p className="mt-1 font-medium">{confirmationEmail}</p>
            ) : null}
          </div>
        ) : null}

        <label className="mb-2 block text-sm font-medium">Nome</label>
        <input
          type="text"
          {...form.register("name")}
          className="mb-2 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
        <p className="mb-3 text-xs text-red-600">{form.formState.errors.name?.message}</p>

        <label className="mb-2 block text-sm font-medium">E-mail</label>
        <input
          type="email"
          {...form.register("email")}
          className="mb-2 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
        <p className="mb-3 text-xs text-red-600">{form.formState.errors.email?.message}</p>

        <label className="mb-2 block text-sm font-medium">Senha</label>
        <input
          type="password"
          {...form.register("password")}
          className="mb-2 w-full rounded-lg border border-zinc-300 px-3 py-2"
        />
        <p className="mb-4 text-xs text-red-600">{form.formState.errors.password?.message}</p>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          {isPending ? "Criando conta..." : "Criar conta"}
        </button>

        <p className="mt-4 text-sm text-zinc-700">
          {isSuccess ? "Já confirmou o e-mail? " : "Já tem conta? "}
          <Link href="/login" className="font-semibold text-blue-600">
            Entrar
          </Link>
        </p>
      </form>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterPageContent />
    </Suspense>
  );
}
