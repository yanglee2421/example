import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import axios from "axios";

const baseURL = "https://qqlykm.cn/api";

export const qqlykm = axios.create({
  baseURL,
  timeout: 1000 * 30,
});

qqlykm.interceptors.response.use((res) => {
  if (res.data.success) {
    return res;
  }

  if (res.data.code === 200) {
    return res;
  }

  console.error(res);
  throw new Error(res.data.msg);
});

type DiaryRes = {
  success: boolean;
  data: string;
};

const DIARY_PATH = "/diary/index";

export const fetchDiary = () =>
  infiniteQueryOptions({
    queryKey: [baseURL, DIARY_PATH, "GET"],
    queryFn({ signal }) {
      return qqlykm<DiaryRes>({ signal, url: DIARY_PATH });
    },

    initialPageParam: {
      idx: 0,
    },
    getNextPageParam(lastData, AllData, lastParams, AllParams) {
      void { lastData, AllData, AllParams };
      return { idx: lastParams.idx + 1 };
    },
  });

type FengjingRes = {
  success: true;
  data: {
    cover: string;
    tag: string;
  };
  text: {
    msg: string;
    copyright: string;
    time: string;
  };
};

const FENGJING_PATH = "/fengjing/index";

export const fetchFengjing = () =>
  infiniteQueryOptions({
    queryKey: [baseURL, FENGJING_PATH, "GET"],
    queryFn({ signal }) {
      return qqlykm<FengjingRes>({
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

type HistoryGetRes = {
  success: true;
  date: string;
  data: [
    {
      year: string;
      title: string;
      url: string;
    }
  ];
};

const HISTORY_GET_PATH = "/history/get";

export const fetchHistoryGet = () =>
  queryOptions({
    queryKey: [baseURL, HISTORY_GET_PATH, "GET"],
    queryFn({ signal }) {
      return qqlykm<HistoryGetRes>({ signal, url: HISTORY_GET_PATH });
    },
  });

type JijiangshangyingRes = {
  success: boolean;
  data: Array<{
    title: string;
    picUrl: string;
    type: string;
    director: string;
    actors: string;
    releaseDateStr: string;
  }>;
};

const JIJIANGSHANGYING_PATH = "/jijiangshangying/get";

export const fetchJijiangshangying = () =>
  queryOptions({
    queryKey: [baseURL, JIJIANGSHANGYING_PATH, "GET"],
    queryFn({ signal }) {
      return qqlykm<JijiangshangyingRes>({
        signal,
        url: JIJIANGSHANGYING_PATH,
      });
    },
  });

type JokeRes = {
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
      return qqlykm<JokeRes>({
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

type NewsRes = {
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

const NEWS_PATH = "/60s/index";

export const fetchNews = () =>
  queryOptions({
    queryKey: [baseURL, NEWS_PATH, "GET"],
    queryFn({ signal }) {
      return qqlykm<NewsRes>({ signal, url: NEWS_PATH });
    },
  });

type RandtextRes = {
  code: number;
  msg: string;
  data: string;
  debug: string;
  exec_time: number;
  user_ip: string;
};

const RANDTEXT_PATH = "/randtext/get";

export const fetchRandtext = () =>
  infiniteQueryOptions({
    queryKey: [baseURL, RANDTEXT_PATH, "GET"],
    queryFn({ signal }) {
      return qqlykm<RandtextRes>({ signal, url: RANDTEXT_PATH });
    },

    initialPageParam: {
      idx: 0,
    },
    getNextPageParam(lastData, AllData, lastParams, AllParams) {
      void { lastData, AllData, AllParams };
      return { idx: lastParams.idx + 1 };
    },
  });
