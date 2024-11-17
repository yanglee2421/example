import { queryOptions } from "@tanstack/react-query";
import { baseURL, qqlykm } from "./qqlykm";

const NEWS_PATH = "/60s/index";

type Res = {
  success: true;
  data: {
    date: string;
    news: string[];
    weiyu: string;
  };
  text: {
    copyright: string;
  };
};

export const fetchNews = () =>
  queryOptions({
    queryKey: [baseURL, NEWS_PATH, "GET"],
    queryFn({ signal }) {
      return qqlykm<Res>({ signal, url: NEWS_PATH });
    },
  });
