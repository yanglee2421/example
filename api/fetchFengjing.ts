import { infiniteQueryOptions } from "@tanstack/react-query";
import { baseURL, qqlykm } from "./qqlykm";

type Res = {
  success: true;
  data: {
    cover:
      "https://cdn-hw-static.shanhutech.cn/bizhi/staticwp/202209/99268cd01655e623d8a04a2cda2b40c0--1592461879.jpg";
    tag: "自然风光,东北,青山,绿水";
  };
  text: {
    msg: "获取成功";
    copyright: "公共API https://qqlykm.cn";
    time: "当前请求时间为：2023-10-19 20:06:05";
  };
};

const FENGJING_PATH = "/fengjing/index";

export const fetchFengjing = () =>
  infiniteQueryOptions({
    queryKey: [baseURL, FENGJING_PATH, "GET"],
    queryFn({ signal }) {
      return qqlykm<Res>({
        url: FENGJING_PATH,
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
