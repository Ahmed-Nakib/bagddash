// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {},
  {
    callbacks: {
      authorized: ({ token }) => {
        // No login = block
        if (!token) return false;

        // Only admin allowed
        return token.role === "admin";
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
