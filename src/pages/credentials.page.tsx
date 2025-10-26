import { Spinner } from "@/components/ui/spinner";
import { CredentialCard } from "@/components/ux/credential-card";
import { useCredentials } from "@/hooks/use-credentials";

export function CredentialsPage() {
  const { loading, credentials, token } = useCredentials();

  if (!token) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <span>Por favor coloque la url correcta</span>
      </div>
    );
  }

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <span>
          <Spinner /> Cargando
        </span>
      </div>
    );

  if (credentials !== null) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <CredentialCard credentials={credentials} />
        </div>
      </main>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <span>
        No se pueden recuperar las credenciales, por favor contacte con el
        administrador
      </span>
    </div>
  );
}
