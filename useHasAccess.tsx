"use client";

import { useSession } from "next-auth/react";

const useHasAccess = (permission: string) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return false;
  }

  if (!session) {
    return false;
  }

  if (session.user.role?.permissions?.includes(permission)) {
    return true;
  }

  const entity = permission.split(".")[0];

  if (session.user.role?.permissions?.includes(`${entity}.all`)) {
    return true;
  }

  return false;
};

export default useHasAccess;
