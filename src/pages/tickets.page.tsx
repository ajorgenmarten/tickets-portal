import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TicketRow } from "@/components/ux/ticket-row";
import { useTickets } from "@/hooks/use-tickets";
import { Download } from "lucide-react";

export function TicketsPage() {
  const { tickets } = useTickets();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-2xl">Tickets</h2>
        <Button onClick={() => alert("En desarrollo")} variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar a Excel
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tipo de Consulta</TableHead>
              <TableHead>Razón</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Nro ticket</TableHead>
              <TableHead>Número de seguridad social</TableHead>
              <TableHead>Id fiscal 1</TableHead>
              <TableHead>Id fiscal 2</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((t) => (
              <TicketRow key={t.id} ticket={t} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
