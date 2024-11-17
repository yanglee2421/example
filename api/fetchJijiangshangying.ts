import { queryOptions } from "@tanstack/react-query";
import { baseURL, qqlykm } from "./qqlykm";

type Res = {
  success: true;
  data: [
    {
      title: "小马鞭";
      picUrl:
        "http://img5.mtime.cn/mt/2023/04/20/161821.94291183_1280X720X2.jpg";
      type: "剧情";
      director: "董新文";
      actors: "巴合波力·胡阿提别克 / 拉芯·哈米提 / 阿勒哈尔·吐尔逊阿力";
      releaseDateStr: "05月08日  明天";
    },
  ];
};

const JIJIANGSHANGYING_PATH = "/jijiangshangying/get";

export const fetchJijiangshangying = () =>
  queryOptions({
    queryKey: [baseURL, JIJIANGSHANGYING_PATH, "GET"],
    queryFn({ signal }) {
      return qqlykm<Res>({
        signal,
        url: JIJIANGSHANGYING_PATH,
      });
    },
  });
