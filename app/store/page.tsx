"use client";
import Store from "@/components/Store";
import { withAuth } from "@/components/withAuth";
import { useAuth } from "@/contexts/AuthContext";

function StorePage() {
  const { user } = useAuth();
  return (
    <div>
      <Store userId={user!.uid} />
    </div>
  );
}

export default withAuth(StorePage);
