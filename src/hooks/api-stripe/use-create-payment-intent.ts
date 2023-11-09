// API Imports
import { create_payment_intent } from "@/api/stripe";
import type { Req, Res } from "@/api/stripe/create_payment_intent";

// Query Imports
import { useMutation } from "@tanstack/react-query";

export function useCreatePaymentIntent() {
  return useMutation<Res, Error, Req>({
    mutationFn(req) {
      return create_payment_intent(req);
    },
  });
}
