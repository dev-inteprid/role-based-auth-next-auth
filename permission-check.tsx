import useHasAccess from "@/hooks/useHasAccess";

const PermissionCheck = ({
  permission,
  children,
}: {
  permission: string;
  children: React.ReactNode;
}) => {
  const hasAccess = useHasAccess(permission);

  if (!hasAccess) {
    return null;
  }

  return <>{children}</>;
};

export default PermissionCheck;
