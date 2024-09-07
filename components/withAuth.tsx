// components/withAuth.tsx
import { checkAuthState } from "@/utils/auth";
import { Flex, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuth(props: P) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        const authed = await checkAuthState();
        if (authed) {
          setIsAuthenticated(true);
        } else {
          router.replace("/login"); // Redirect to login page if not authenticated
        }
      };
      checkAuth();
    }, [router]);

    if (!isAuthenticated) {
      return (
        <Flex justify="center" align="center" height="100vh">
          <Spinner size="xl" color="teal.500" />
        </Flex>
      ); // Or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
}
