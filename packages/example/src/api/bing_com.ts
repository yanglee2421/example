import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

const CN_BING = "https://cn.bing.com";
const WWW_BING = "https://www.bing.com";
const TIMEOUT = 1000 * 30;
const path = "/HPImageArchive.aspx";

export const cnBing = axios.create({
  timeout: TIMEOUT,
  baseURL: CN_BING,
});

export const wwwBing = axios.create({
  timeout: TIMEOUT,
  baseURL: WWW_BING,
});

type BingImageParams = {
  idx: number;
  n: number;
  format: "js";
};

type BingImageRes = {
  images: [
    {
      startdate: string;
      fullstartdate: string;
      enddate: string;
      url: string;
      urlbase: string;
      copyright: string;
      copyrightlink: string;
      title: string;
      quiz: string;
      wp: boolean;
      hsh: string;
      drk: number;
      top: number;
      bot: number;
      hs: [];
    }
  ];
  tooltips: {
    loading: string;
    previous: string;
    next: string;
    walle: string;
    walls: string;
  };
};

export const fetchCnBingImage = (params: BingImageParams) =>
  queryOptions({
    queryKey: [CN_BING, path, "GET", params],
    queryFn({ signal }) {
      return cnBing<BingImageRes>({ url: path, params, signal });
    },
  });

export const fetchBingImage = (params: BingImageParams) =>
  queryOptions({
    queryKey: [WWW_BING, path, "GET", params],
    queryFn({ signal }) {
      return wwwBing<BingImageRes>({ url: path, params, signal });
    },
  });
