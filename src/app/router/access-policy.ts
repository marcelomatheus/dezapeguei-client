export const publicRoutes = ["/offers", "/offers/:id", "/login", "/register", "/empreendedores/:id"] as const;

export const protectedRoutes = [
  "/offers/create",
  "/offers/my",
  "/offers/:id/edit",
  "/chats",
  "/chats/:id",
  "/profile",
  "/profile/account",
  "/profile/edit",
  "/wishlists",
  "/users/:id",
  "/notifications",
  "/sales",
  "/empreendedor",
  "/empreendedor/validar",
  "/empreendedor/checkout",
  "/empreendedor/checkout/session/:sessionId",
  "/empreendedor/success",
  "/empreendedor/cancel",
  "/empreendedor/dashboard",
  "/comunidades",
  "/comunidades/:slug",
] as const;

export function isPublicRoute(pathname: string): boolean {
  if (pathname === "/") {
    return false;
  }

  return publicRoutes.some((route) => matchRoute(pathname, route));
}

export function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some((route) => matchRoute(pathname, route));
}

export function matchRoute(pathname: string, pattern: string): boolean {
  const pathnameParts = pathname.split("/").filter(Boolean);
  const patternParts = pattern.split("/").filter(Boolean);

  if (pathnameParts.length !== patternParts.length) {
    return false;
  }

  return patternParts.every((part, index) => {
    if (part.startsWith(":")) {
      return pathnameParts[index].length > 0;
    }

    return pathnameParts[index] === part;
  });
}
