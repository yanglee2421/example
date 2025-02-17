import { infiniteQueryOptions } from "@tanstack/react-query";
import { baseURL, qqlykm } from "./qqlykm";

type Res = {
  success: true;
  data: {
    joke: string;
  };
  text: {
    msg: string;
    copyright: string;
    time: string;
  };
};

const JOKE_INDEX_PATH = "/joke/index";

export const fetchJoke = () =>
  infiniteQueryOptions({
    queryKey: [baseURL, JOKE_INDEX_PATH, "GET"],
    queryFn({ signal }) {
      return qqlykm<Res>({
        url: JOKE_INDEX_PATH,
        signal,
      });
    },

    initialPageParam: {
      idx: 0,
    },
    getNextPageParam(lastData, AllData, lastParams, AllParams) {
      void { lastData, AllData, AllParams };
      return { idx: lastParams.idx + 1 };
    },
  });
