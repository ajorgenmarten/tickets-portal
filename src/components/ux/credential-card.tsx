import { Briefcase, CheckCircle2, User, XCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { Credentials } from "@/hooks/use-credentials";
import type { PropsWithChildren } from "react";
import logo from "@/assets/manpower-logo-stacked.svg";
import envs from "@/configs/envs";

type CredentialsProps = { credentials: Credentials } & PropsWithChildren;

export function CredentialCard(props: CredentialsProps) {
  const { pathPhoto, name, sso, active, job } = props.credentials;
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  return (
    <Card className="w-full max-w-md overflow-hidden border-2 shadow-lg">
      {/* Header with gradient and company logo */}
      <div className="h-24 bg-gradient-to-br from-primary to-accent relative">
        <div className="absolute top-4 right-4">
          <div className="bg-card rounded-lg p-2 shadow-md">
            <img
              src={logo}
              alt="Company Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
        </div>
        <div className="absolute -bottom-12 left-6">
          <Avatar className="h-24 w-24 border-4 border-card shadow-xl">
            <AvatarImage
              src={
                envs?.VITE_ORCHESTRATOR_URL + "/" + pathPhoto ||
                "/placeholder.svg"
              }
              alt={name}
            />
            <AvatarFallback className="bg-secondary text-secondary-foreground text-2xl font-semibold">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <CardContent className="pt-16 pb-6 px-6">
        {/* User Info */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-card-foreground text-balance">
                {name}
              </h2>
              <p className="text-sm text-muted-foreground font-mono">
                SSO: {sso}
              </p>
            </div>

            {/* Status Badge */}
            <Badge
              variant={active ? "default" : "secondary"}
              className={`flex items-center gap-1.5 px-3 py-1 ${
                active
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {active ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Activo
                </>
              ) : (
                <>
                  <XCircle className="h-3.5 w-3.5" />
                  Inactivo
                </>
              )}
            </Badge>
          </div>

          {/* Credential Details */}
          <div className="pt-4 border-t border-border space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-secondary">
                <Briefcase className="h-4 w-4 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Puesto de trabajo
                </p>
                <p
                  className={`font-medium ${job !== "null" ? "text-card-foreground" : "text-muted-foreground italic"}`}
                >
                  {job == "null"
                    ? "No se le ha definido un puesto de trabajo"
                    : job}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-secondary">
                <User className="h-4 w-4 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  Estado de cuenta
                </p>
                <p className="font-medium text-card-foreground">
                  {active ? "Cuenta verificada y activa" : "Cuenta inactiva"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
