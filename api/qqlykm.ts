import axios, {} from "axios";

export const baseURL = "https://qqlykm.cn/api";

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
