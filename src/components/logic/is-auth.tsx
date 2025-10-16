import { useAuthContext } from "@/contexts/auth.context";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

export function IsAuth(props: PropsWithChildren) {
  const { me } = useAuthContext();

  if (me === null)
    return <Navigate to="/login" />

  return props.children;
}
