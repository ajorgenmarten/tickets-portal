import { httpClient } from "@/configs/axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";

export type Credentials = {
  pathPhoto: string;
  name: string;
  sso: string;
  active: boolean;
};

export function useCredentials() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [credentials, setCredentials] = useState<Credentials | null>(null);

  const token = searchParams.get("token");

  const handlerGetCredentials = async () => {
    const response = await httpClient.get(
      "/credentials/details?token=" + token,
    );

    setLoading(false);

    if (response.status !== 200) {
      toast.error(response.data.message || "Error al obtener credenciales");
      return;
    }

    setCredentials(response.data);
  };

  useEffect(() => {
    if (token) {
      handlerGetCredentials();
    }
  }, [token]);

  return { loading, credentials, token };
}
