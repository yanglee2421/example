import axios, { AxiosError } from "axios";

const privateKey =
  "sk_test_51Ndm80IkSBLJkZjEW27ZWDQ2FF9YmCY4N7cqiF5Be2gWWHXk7cQBuMVPP6uCamCMhnCsVlxXnjggafTYTsXzQEoI007ecpoLol";

export const axiosStripe = axios.create({
  baseURL: "https://api.stripe.com/v1",
  auth: {
    username: privateKey,
    password: "",
  },
});

axiosStripe.interceptors.request.use((config) => config);
axiosStripe.interceptors.response.use(
  (res) => {
    const { data } = res;

    return data;
  },
  (error: AxiosError) => {
    const { message } = error;
    throw new Error(message);
  }
);
