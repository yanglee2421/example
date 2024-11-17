import { infiniteQueryOptions } from "@tanstack/react-query";
import { baseURL, qqlykm } from "./qqlykm";

type Res = {
  "success": true;
  "data": "你和他接吻的时候可以涂我送给你的口红吗？";
};

const DIARY_PATH = "/diary/index";

export const fetchDiary = () =>
  infiniteQueryOptions({
    queryKey: [baseURL, DIARY_PATH, "GET"],
    queryFn({ signal }) {
      return qqlykm<Res>({ signal, url: DIARY_PATH });
    },

    initialPageParam: {
      idx: 0,
    },
    getNextPageParam(lastData, AllData, lastParams, AllParams) {
      void { lastData, AllData, AllParams };
      return { idx: lastParams.idx + 1 };
    },
  });
