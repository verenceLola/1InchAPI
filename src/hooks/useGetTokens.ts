import { ICoin } from "@/models";
import axios from "axios";
import useSwr from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useGetTokens = () => {
  const { data, error, isLoading } = useSwr<ICoin[]>("/api/tokens", fetcher, {
    suspense: true,
    fallbackData: [],
  });

  const coins = data as ICoin[];

  return { data: coins, error, isLoading };
};
