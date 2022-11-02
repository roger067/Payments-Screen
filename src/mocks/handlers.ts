import { rest } from "msw";

interface PaymentBody {
  name: string;
  number: string;
  cvc: string;
  expiry: string;
  portion: string;
}

export const handlers = [
  rest.post<PaymentBody, {}>("/pagar", async (_, res, ctx) => {
    return res(ctx.status(200));
  }),
];
