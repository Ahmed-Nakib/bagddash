import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAuth(requiredRole?: "user" | "admin") {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (!token) {
      router.push("/login");
      return;
    }

    if (requiredRole && storedRole !== requiredRole) {
      // যদি role match না করে → redirect
      router.push("/login");
      return;
    }

    setRole(storedRole);
    setLoading(false);
  }, [router, requiredRole]);

  return { loading, role };
}
