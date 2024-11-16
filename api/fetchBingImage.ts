import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

const CN_BING = "https://cn.bing.com";
const WWW_BING = "https://www.bing.com";
const TIMEOUT = 1000 * 30;
const path = "/HPImageArchive.aspx";

const cnBing = axios.create({
  timeout: TIMEOUT,
  baseURL: CN_BING,
});

const wwwBing = axios.create({
  timeout: TIMEOUT,
  baseURL: WWW_BING,
});

type Params = {
  idx: number;
  n: number;
  format: "js";
};

type Res = {
  "images": [
    {
      "startdate": "20241115";
      "fullstartdate": "202411151600";
      "enddate": "20241116";
      "url":
        "/th?id=OHR.FrieslandNetherlands_ZH-CN5952456898_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp";
      "urlbase": "/th?id=OHR.FrieslandNetherlands_ZH-CN5952456898";
      "copyright":
        "瓦登海沿岸，莫德加特附近，弗里斯兰，荷兰 (© Ron ter Burg/Minden Pictures)";
      "copyrightlink":
        "https://www.bing.com/search?q=%E7%93%A6%E7%99%BB%E6%B5%B7&form=hpcapt&mkt=zh-cn";
      "title": "泥土、大海和天空";
      "quiz":
        "/search?q=Bing+homepage+quiz&filters=WQOskey:%22HPQuiz_20241115_FrieslandNetherlands%22&FORM=HPQUIZ";
      "wp": true;
      "hsh": "e706e5a2edf59445c7458de3a94b5f1f";
      "drk": 1;
      "top": 1;
      "bot": 1;
      "hs": [];
    },
  ];
  "tooltips": {
    "loading": "正在加载...";
    "previous": "上一个图像";
    "next": "下一个图像";
    "walle": "此图片不能下载用作壁纸。";
    "walls": "下载今日美图。仅限用作桌面壁纸。";
  };
};

export const fetchCnBingImage = (params: Params) =>
  queryOptions({
    queryKey: [CN_BING, path, "GET", params],
    queryFn({ signal }) {
      return cnBing<Res>({ url: path, params, signal });
    },
  });

export const fetchBingImage = (params: Params) =>
  queryOptions({
    queryKey: [WWW_BING, path, "GET", params],
    queryFn({ signal }) {
      return wwwBing<Res>({ url: path, params, signal });
    },
  });
