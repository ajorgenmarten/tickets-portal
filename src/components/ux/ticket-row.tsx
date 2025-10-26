import type { TicketType } from "@/hooks/use-tickets";
import { TableCell, TableRow } from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useState } from "react";
import { httpClient } from "@/configs/axios";
import { useAuthContext } from "@/contexts/auth.context";
import { toast } from "react-toastify";
import { Input } from "../ui/input";

export function TicketRow({ ticket }: { ticket: TicketType }) {
  const { token } = useAuthContext();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [isEditting, setIsEdditing] = useState(false);
  const [status, setStatus] = useState(ticket.status);
  const [number, setNumber] = useState(ticket.ticketNumber);

  const handleStatusChangeRequest = (status: string) => {
    setDialogIsOpen(true);
    setStatus(status);
  };

  const handleConfirm = async () => {
    const response = await httpClient.put(
      "/tickets/update/ticket/status",
      {
        ticketId: ticket.id,
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setDialogIsOpen(false);

    if (response.status !== 200) {
      toast.error("Error al actualizar el estado del ticket");
      setStatus(ticket.status);
      return;
    }
  };

  const handleActiveEdit = () => {
    setIsEdditing(true);
  };

  const handlePresEnter = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      setIsEdditing(false);
      const response = await httpClient.post(
        "/tickets/update-number",
        {
          ticketId: ticket.id,
          number: number,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status < 200 || response.status > 299) {
        toast.error("Error al actualizar el número del ticket");
        setNumber(ticket.ticketNumber);
        return;
      }
    }
  };

  const handleBlur = () => {
    setIsEdditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completado":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "Procesando":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
      case "Pendiente":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      default:
        return "";
    }
  };
  return (
    <TableRow>
      <TableCell className="font-mono text-sm">{ticket.id}</TableCell>
      <TableCell>{ticket.queryType}</TableCell>
      <TableCell>{ticket.consultationReason}</TableCell>
      <TableCell>{ticket.email}</TableCell>
      <TableCell onDoubleClick={handleActiveEdit}>
        {isEditting && (
          <Input
            autoFocus
            className="w-28"
            onKeyDown={handlePresEnter}
            onBlur={handleBlur}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Establece un número de ticket"
            value={number || ""}
          />
        )}
        {!isEditting && (number || "No está definido")}
      </TableCell>
      <TableCell>{ticket.ssn}</TableCell>
      <TableCell>{ticket.fiscalId1 || "No está definido"}</TableCell>
      <TableCell>{ticket.fiscalId2 || "No está definido"}</TableCell>
      <TableCell>
        <AlertDialog open={dialogIsOpen}>
          <AlertDialogContent>
            <AlertDialogTitle>
              ¿Estás seguro que deseas cambier el estado del ticket?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción se puede deshacer, pero ten en cuenta de que algunos
              cambios de estados se le notifican al usuario.
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDialogIsOpen(false)}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirm}>
                Confirmar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Select
          value={ticket.status}
          onValueChange={(value) => handleStatusChangeRequest(value)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue>
              <Badge
                variant="outline"
                className={getStatusColor(ticket.status)}
              >
                {status}
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
  );
}
