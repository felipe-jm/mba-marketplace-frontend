import { api } from "../lib/axios";

export interface GetNumberOfProductsAvailableIn30DaysResponse {
  amount: number;
}

export async function getNumberOfProductsAvailableIn30Days(): Promise<GetNumberOfProductsAvailableIn30DaysResponse> {
  const response = await api.get("/sellers/metrics/products/available");

  return response.data;
}
