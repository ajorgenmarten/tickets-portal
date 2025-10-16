import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useLogin } from "@/hooks/use-login";
import { Spinner } from "@/components/ui/spinner";

export function LoginPage() {
  const { onSubmit, register, formState } = useLogin()

  return <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center font-bold text-3xl">Sistema de Gestión</CardTitle>
          <CardDescription className="text-center">Ingresa tus credenciales para acceder al sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input {...register('username')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input {...register("password")} type='password' />
            </div>
            <Button type="submit" className="w-full" disabled={formState.isSubmitting || !formState.isValid}>
              { formState.isSubmitting && <Spinner /> }
              Iniciar Sesión
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
}
