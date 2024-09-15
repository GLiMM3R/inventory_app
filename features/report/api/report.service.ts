import axios from "@/libs/request";
import { Response } from "~/types/reponse";
import { SalesReport } from "../model/sales-report";

type Props = {
  pageParam: number;
  startDate: string;
  endDate: string;
};

export const fetchSalesReport = async ({
  pageParam,
  startDate,
  endDate,
}: Props) => {
  const { data } = await axios.get<Response<SalesReport[]>>(`/reports/sales`, {
    params: { start_date: startDate, end_date: endDate, page: pageParam },
  });

  return data.data ?? [];
};
