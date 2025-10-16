import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthContext } from "@/contexts/auth.context";
import { LogOut } from "lucide-react";
import { TicketsPage } from "./tickets.page";

export function HomeLayout() {
  const { logOut } = useAuthContext()
  return <main className="container mx-auto py-8">
    <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-4xl text-balance">Sistema de Gestión</h1>
            <p className="mt-2 text-muted-foreground">Administra usuarios, aplicaciones y tickets</p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Estás seguro que deseas cerrar sesión</AlertDialogTitle>
                <AlertDialogDescription>Cerrará su sesión actual en el sistema, tendrá que volver a iniciarla luego.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={logOut}>Si, estoy seguro</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          </div>

    <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="applications">Aplicaciones</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
          </TabsList>
          <TabsContent value="users" className="mt-6">
            En desarrollo...
          </TabsContent>
          <TabsContent value="applications" className="mt-6">
            En desarrollo...
          </TabsContent>
          <TabsContent value="tickets" className="mt-6">
            <TicketsPage />
          </TabsContent>
        </Tabs>
  </main>
}
