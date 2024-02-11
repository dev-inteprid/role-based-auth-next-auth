import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const token = req.nextauth.token;

    if (token) {
      const pathname = req.nextUrl.pathname;

      // Find a matching path with dynamic path handling
      const path = paths.find((p) => {
        if (p.path.includes("[id]")) {
          // Replace '[id]' with a regex pattern and test the pathname
          const regex = new RegExp(`^${p.path.replace("[id]", "\\w+")}$`);
          return regex.test(pathname);
        }
        return p.path === pathname;
      });

      if (!path) {
        return NextResponse.redirect(new URL("/", req.url));
      }

      const userPermissions = token.role.permissions || [];

      const hasPermission = path.permission.some((p) =>
        userPermissions.includes(p)
      );

      if (!hasPermission) {
        return NextResponse.redirect(new URL("/access-denied", req.url));
      }

      return NextResponse.next();
    }
  }
);

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|auth/|access-denied).*)",
  ],
};

const paths = [
  {
    path: "/",
    permission: ["dashboard.access"],
  },
  {
    path: "/products",
    permission: ["products.list", "products.all"],
  },
  {
    path: "/products/create",
    permission: ["products.create", "products.all"],
  },
  {
    path: "/products/[id]",
    permission: [
      "products.edit",
      "products.view",
      "products.delete",
      "products.all",
    ],
  },
  {
    path: "/categories",
    permission: ["categories.list", "categories.all"],
  },
  {
    path: "/categories/create",
    permission: ["categories.create", "categories.all"],
  },
  {
    path: "/categories/[id]",
    permission: [
      "categories.edit",
      "categories.view",
      "categories.delete",
      "categories.all",
    ],
  },
  {
    path: "/orders",
    permission: ["orders.list", "orders.all"],
  },
  {
    path: "/orders/create",
    permission: ["orders.create", "orders.all"],
  },
];
