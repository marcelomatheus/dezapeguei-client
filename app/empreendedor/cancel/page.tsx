import Link from "next/link";

export default function EntrepreneurCancelPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10 text-center">
      <h1 className="text-2xl font-bold text-zinc-900">Checkout não concluído</h1>
      <p className="mt-2 text-zinc-600">A simulação de pagamento foi cancelada ou falhou. Seu selo não foi ativado.</p>
      <Link href="/empreendedor/validar" className="mt-5 inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
        Tentar novamente
      </Link>
    </main>
  );
}
