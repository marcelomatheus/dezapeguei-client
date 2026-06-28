# Dezapeguei Client Web

Frontend web da plataforma Dezapeguei, desenvolvido em Next.js (App Router), com TypeScript
strict e arquitetura por features orientada a clean code e padrao bulletproof. Agora com comunidades.

## Contexto do Monorepo

- `dezapeguei-server`: backend NestJS + Prisma + Supabase (fonte de verdade de dominio).
- `dezapeguei-client-web`: implementacao web que consome apenas a API do backend NestJS existente.

## Regras de Arquitetura

- Componentes de UI devem ser declarativos e sem regra de negocio.
- Logica de negocio, side effects e chamadas async devem viver em hooks/servicos.
- Codigo-fonte deve ser escrito em ingles.
- Textos exibidos ao usuario devem estar em portugues com acentuação correta.
- Nao adicionar comentarios em codigo (exceto obrigacao legal/licenca).
- Aplicar responsabilidade unica (SRP), inversao de dependencia (DIP) e tipagem forte.
- Usar apenas TypeScript no frontend.
- Formularios devem usar React Hook Form + Zod.
- Integracoes devem respeitar contratos oficiais REST/Socket do backend.

Consulte a constituicao do projeto em `.specify/memory/constitution.md`.

## Rotas-Alvo da Web

As rotas devem espelhar o mapa funcional atual:

- `/login`
- `/register`
- `/offers`
- `/offers/:id`
- `/offers/create`
- `/offers/:id/edit`
- `/offers/my`
- `/chats`
- `/chats/:id`
- `/profile`
- `/profile/edit`
- `/wishlists`
- `/users/:id`

## Politica de Acesso de Rotas

Rotas publicas:

- `/offers`
- `/offers/:id`
- `/login`
- `/register`

Rotas protegidas (autenticacao obrigatoria):

- `/offers/create`
- `/offers/my`
- `/offers/:id/edit`
- `/chats`
- `/chats/:id`
- `/profile`
- `/profile/edit`
- `/wishlists`
- `/users/:id`
- `/notifications`
- `/sales`

Implementacao atual:

- O guard de acesso esta em `middleware.ts`.
- Tokens de sessao sao hidratados por `src/features/auth/hooks/use-auth-session.tsx`.
- Integracao HTTP usa `src/shared/api/http-client.ts` com refresh-on-401.

## Desenvolvimento

```bash
npm install
npm run dev
```

Aplicacao local: `http://localhost:3000`

## Qualidade

```bash
npm run lint
npm run build
```

