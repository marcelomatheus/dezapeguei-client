import Link from "next/link";

export default function EntrepreneurSuccessPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10 text-center">
      <h1 className="text-2xl font-bold text-zinc-900">Plano Empreendedor ativado</h1>
      <p className="mt-2 text-zinc-600">Seu pagamento simulado foi confirmado e o selo já pode aparecer nas suas ofertas.</p>
      <Link href="/empreendedor/dashboard" className="mt-5 inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
        Ir para dashboard
      </Link>
    </main>
  );
}
