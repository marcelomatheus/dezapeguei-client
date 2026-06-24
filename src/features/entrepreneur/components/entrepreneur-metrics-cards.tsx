type EntrepreneurMetricsCardsProps = {
  metrics: {
    offerViews: number;
    contactClicks: number;
    favoritesCount: number;
    messagesReceived: number;
    offerCount: number;
  };
};

export function EntrepreneurMetricsCards({ metrics }: EntrepreneurMetricsCardsProps) {
  const items = [
    ["Ofertas", metrics.offerCount],
    ["Favoritos", metrics.favoritesCount],
    ["Mensagens", metrics.messagesReceived],
    ["Cliques contato", metrics.contactClicks],
    ["Visualizações", metrics.offerViews],
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {items.map(([label, value]) => (
        <div key={label} className="rounded-lg border border-zinc-200 bg-white p-4">
          <p className="text-sm text-zinc-600">{label}</p>
          <p className="mt-1 text-2xl font-bold text-zinc-900">{value}</p>
        </div>
      ))}
    </div>
  );
}
