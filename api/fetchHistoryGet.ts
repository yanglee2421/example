import { queryOptions } from "@tanstack/react-query";
import { baseURL, qqlykm } from "./qqlykm";

type Res = {
  "success": true;
  "date": "20230507";
  "data": [
    {
      "year": "1530";
      "title": "法国政治家路易一世·德·波旁出生";
      "url":
        "https://baike.baidu.com/item/%E8%B7%AF%E6%98%93%E4%B8%80%E4%B8%96%C2%B7%E5%BE%B7%C2%B7%E6%B3%A2%E6%97%81";
    },
    {
      "year": "1602";
      "title": "中国明代作家李贽逝世";
      "url": "https://baike.baidu.com/item/%E6%9D%8E%E8%B4%BD";
    },
    {
      "year": "1805";
      "title": "英国首相威廉·佩蒂逝世";
      "url":
        "https://baike.baidu.com/item/%E5%A8%81%E5%BB%89%C2%B7%E4%BD%A9%E8%92%82";
    },
    {
      "year": "1812";
      "title": "英国诗人和编剧罗勃特·勃朗宁出生";
      "url":
        "https://baike.baidu.com/item/%E7%BD%97%E4%BC%AF%E7%89%B9%C2%B7%E5%8B%83%E6%9C%97%E5%AE%81";
    },
    {
      "year": "1840";
      "title": "俄罗斯作曲家柴科夫斯基出生";
      "url":
        "https://baike.baidu.com/item/%E5%BD%BC%E5%BE%97%C2%B7%E4%BC%8A%E9%87%8C%E5%A5%87%C2%B7%E6%9F%B4%E5%8F%AF%E5%A4%AB%E6%96%AF%E5%9F%BA";
    },
    {
      "year": "1861";
      "title": "印度诗人拉宾德拉纳特·泰戈尔出生";
      "url":
        "https://baike.baidu.com/item/%E6%8B%89%E5%AE%BE%E5%BE%B7%E6%8B%89%E7%BA%B3%E7%89%B9%C2%B7%E6%B3%B0%E6%88%88%E5%B0%94";
    },
    {
      "year": "1915";
      "title": "英国卢西塔尼亚号邮轮被击沉";
      "url":
        "https://baike.baidu.com/item/%E5%8D%A2%E8%A5%BF%E5%A1%94%E5%B0%BC%E4%BA%9A%E5%8F%B7";
    },
    {
      "year": "1945";
      "title": "纳粹德国宣布无条件投降";
      "url":
        "https://baike.baidu.com/item/%E7%BA%B3%E7%B2%B9%E5%BE%B7%E5%9B%BD";
    },
    {
      "year": "1949";
      "title": "中国共产党革命烈士李白逝世";
      "url": "https://baike.baidu.com/item/%E6%9D%8E%E7%99%BD/2456540";
    },
    {
      "year": "1952";
      "title": "杰弗里·达默首先发表集成电路概念";
      "url":
        "https://baike.baidu.com/item/%E9%9B%86%E6%88%90%E7%94%B5%E8%B7%AF";
    },
    {
      "year": "1967";
      "title": "香港发生六七暴动";
      "url":
        "https://baike.baidu.com/item/%E5%85%AD%E4%B8%83%E6%9A%B4%E5%8A%A8";
    },
    {
      "year": "1981";
      "title": "国民革命军陆军中将、著名抗日将领杜聿明逝世";
      "url": "https://baike.baidu.com/item/%E6%9D%9C%E8%81%BF%E6%98%8E/494115";
    },
    {
      "year": "1998";
      "title": "动画片《花木兰》风靡美国";
      "url": "https://baike.baidu.com/item/%E8%8A%B1%E6%9C%A8%E5%85%B0/9159572";
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
