// Axios Imports
import { axiosStripe } from "./axios-stripe";
import { AxiosRequestConfig } from "axios";

export function create_payment_intent(req: Req) {
  return axiosStripe<unknown, Res, Data>({
    url: "/payment_intents ",
    method: "POST",
    ...req,
  });
}

export type Req = AxiosRequestConfig<Data>;
export interface Data {
  amount: number;
  currency: string;
}
export interface Res {
  client_secret: string;
}
