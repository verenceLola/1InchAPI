import useSwr from "swr";
import axios, { AxiosResponse } from "axios";

interface Payload {
  fromTokenAddress: string;
  toTokenAddress: string;
  amount: string;
}

interface QuoteResponse {
  fromToken?: string;
  toToken?: string;
  fromTokenAmount?: string;
  toTokenAmount?: string;
  estimatedGas?: string;
}

const shouldFetch = ({ amount, fromTokenAddress, toTokenAddress }: Payload) =>
  amount && fromTokenAddress && toTokenAddress;

const fetcher = ([url, params]: Array<unknown>) =>
  axios
    .get<any, AxiosResponse<QuoteResponse>>(url as string, { params })
    .then((res) => res.data);

export const useQuote = (payload: Payload) => {
  const { data, error, isLoading } = useSwr(
    () => (shouldFetch(payload) ? ["/api/quote", payload] : null),
    fetcher,
    {
      suspense: true,
      fallbackData: {},
    }
  );

  return { data, error, isLoading };
};
