import { infiniteQueryOptions } from "@tanstack/react-query";
import { baseURL, qqlykm } from "./qqlykm";

type Res = {
  code: 200;
  msg: "请求成功";
  data: "功名万里外，心事一杯中。";
  debug: "";
  exec_time: 0.036495;
  user_ip: "182.34.137.4";
};

const RANDTEXT_PATH = "/randtext/get";

export const fetchRandtext = () =>
  infiniteQueryOptions({
    queryKey: [baseURL, RANDTEXT_PATH, "GET"],
    queryFn({ signal }) {
      return qqlykm<Res>({ signal, url: RANDTEXT_PATH });
    },

    initialPageParam: {
      idx: 0,
    },
    getNextPageParam(lastData, AllData, lastParams, AllParams) {
      void { lastData, AllData, AllParams };
      return { idx: lastParams.idx + 1 };
    },
  });
