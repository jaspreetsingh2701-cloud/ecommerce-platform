import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost/api/products", () => {
    return HttpResponse.json([
      {
        id: 1,
        name: "iPhone",
        price: 79999,
      },
      {
        id: 2,
        name: "MacBook",
        price: 129999,
      },
    ]);
  }),
];