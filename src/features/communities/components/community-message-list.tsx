import Link from "next/link";
import { CommunityMessage } from "@/src/shared/schemas/community.schema";
import { EntrepreneurBadge } from "@/src/features/entrepreneur/components/entrepreneur-badge";

type CommunityMessageListProps = {
  messages: CommunityMessage[];
};

export function CommunityMessageList({ messages }: CommunityMessageListProps) {
  return (
    <div className="space-y-3">
      {messages.map((message) => {
        const businessName = message.user?.entrepreneurProfile?.businessName;
        const isVerified = Boolean(
          message.user?.entrepreneurVerifiedAt &&
            message.user?.entrepreneurProfile?.status === "APPROVED" &&
            (message.user?.entrepreneurSubscriptions?.length ?? 0) > 0,
        );

        return (
          <article key={message.id} className="rounded-lg border border-zinc-200 bg-white p-4">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium text-zinc-900">{businessName ?? message.user?.name ?? "Empreendedor"}</p>
              <EntrepreneurBadge active={isVerified} compact />
              {message.type === "OFFER" ? <span className="rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-orange-800">Oferta</span> : null}
            </div>
            <p className="mt-2 text-sm text-zinc-700">{message.content}</p>
            {message.offerId ? (
              <Link href={`/offers/${message.offerId}`} className="mt-3 inline-flex text-sm font-medium text-orange-700 hover:text-orange-800">
                Ver oferta compartilhada
              </Link>
            ) : null}
          </article>
        );
      })}
      {messages.length === 0 ? <p className="text-sm text-zinc-600">Ainda não há mensagens nesta comunidade.</p> : null}
    </div>
  );
}
