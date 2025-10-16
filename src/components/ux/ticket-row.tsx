import type { TicketType } from "@/hooks/use-tickets";
import { TableCell, TableRow } from "../ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";

export function TicketRow({ ticket }: { ticket: TicketType }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completado":
        return "bg-green-500/10 text-green-700 dark:text-green-400"
      case "Procesando":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400"
      case "Pendiente":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
      default:
        return ""
    }
  }
  return <TableRow >
                    <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
                    <TableCell>{ticket.queryType}</TableCell>
                    <TableCell>{ticket.consultationReason}</TableCell>
                    <TableCell>{ticket.email}</TableCell>
                    <TableCell>
                      <Select
                        value={ticket.status}
                        //onValueChange={(value) => handleStatusChangeRequest(ticket.id, value as TicketStatus)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue>
                            <Badge variant="outline" className={getStatusColor(ticket.status)}>
                              {ticket.status}
                            </Badge>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pendiente">Pendiente</SelectItem>
                          <SelectItem value="Procesando">Procesando</SelectItem>
                          <SelectItem value="Completado">Completado</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {ticket.createdAt.toString()}
                    </TableCell>
                  </TableRow>
}
