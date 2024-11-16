import { infiniteQueryOptions } from "@tanstack/react-query";
import { baseURL, qqlykm } from "./qqlykm";

type Res = {
  "success": true;
  "data": {
    "joke":
      " 某宰相的孙子，把家私全部败光，以至一日三餐都无着落，常常向人借乞粮食。一天，借到一袋米，半路上背不动了，只好在路边休息。忽然，前面走来一个衣衫破烂的穷汉，就叫住那人，讲定了报酬，请他背米。哪知走了一段路，那人也气喘吁吁地走不动了。他便埋怨道：我是宰相的孙子，手不能提，肩不能挑，乃是常事，你是穷人出身，为啥也这样无用！那人向他白了白眼道：你怎能怪我，我也是尚书的孙子啊。";
  };
  "text": {
    "msg": "获取成功";
    "copyright": "公共API https://qqlykm.cn";
    "time": "当前请求时间为：2023-05-07 18:10:56";
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
