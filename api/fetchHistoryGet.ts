import { queryOptions } from "@tanstack/react-query";
import { baseURL, qqlykm } from "./qqlykm";

type Res = {
  success: true;
  date: string;
  data: [
    {
      year: string;
      title: string;
      url: string;
    },
  ];
};

const HISTORY_GET_PATH = "/history/get";

export const fetchHistoryGet = () =>
  queryOptions({
    queryKey: [baseURL, HISTORY_GET_PATH, "GET"],
    queryFn({ signal }) {
      return qqlykm<Res>({ signal, url: HISTORY_GET_PATH });
    },
  });
