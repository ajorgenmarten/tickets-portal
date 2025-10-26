import { httpClient } from "@/configs/axios";
import { useAuthContext } from "@/contexts/auth.context";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type FilterPayload = {
  search: string;
  status: string;
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  page?: number;
};

export type TicketType = {
  id: string;
  queryType: string;
  consultationReason: string;
  description: string;
  status: string;
  ssn?: string | null;
  fiscalId1?: string | null;
  fiscalId2?: string | null;
  ticketNumber?: string | null;
  email: string;
  createdAt: Date;
};

export function useTickets() {
  const { token } = useAuthContext();
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [info, setInfo] = useState({
    page: 0,
    totalPages: 0,
  });
  const [filterPayload, setFilterPayload] = useState<FilterPayload>({
    search: "",
    status: "",
    dateRange: {
      start: null,
      end: null,
    },
    page: 0,
  });

  useEffect(() => {
    onSubmint({
      search: "",
      status: "",
      dateRange: { start: null, end: null },
    });
  }, []);

  const buildQuery = (filters: FilterPayload): Record<string, any> => {
    const params: Record<string, any> = {};

    if (filters.search) {
      params.search = filters.search;
    }

    if (filters.status) {
      params.status = filters.status;
    }

    if (filters.page) {
      params.page = filters.page;
    }

    // Manejar dateRange
    if (filters.dateRange) {
      if (filters.dateRange.start) {
        params["dateRange[start]"] = filters.dateRange.start.toISOString();
      }
      if (filters.dateRange.end) {
        params["dateRange[end]"] = filters.dateRange.end.toISOString();
      }
    }

    return params;
  };

  const onSubmint = async (filter: FilterPayload) => {
    const params = buildQuery(filter);

    const { data } = await httpClient.get("/tickets/filter", {
      params: params,
      paramsSerializer: {
        indexes: null,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.success === false) {
      toast.error(data.message);
    } else if (data.success === true) {
      setTickets(data.data.results);
      setInfo({ page: data.data.page + 1, totalPages: data.data.totalPages });
    }
  };

  const handleChange = (field: string, value: any) => {
    if (field === "search") {
      setFilterPayload({ ...filterPayload, search: value });
    }
    if (field === "status") {
      setFilterPayload({ ...filterPayload, status: value });
    }
    if (field === "page") {
      setFilterPayload({ ...filterPayload, page: value });
    }
    if (field === "startDate") {
      filterPayload.dateRange.start = value;
      setFilterPayload({ ...filterPayload });
    }
    if (field === "endDate") {
      filterPayload.dateRange.end = value;
      setFilterPayload({ ...filterPayload });
    }
  };

  return { tickets, onSubmint, info, handleChange };
}
