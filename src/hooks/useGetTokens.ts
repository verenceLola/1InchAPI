import { ICoin } from "@/models";
import useSwr from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useGetTokens = () => {
  const { data, error, isLoading } = useSwr<ICoin[]>("/api/tokens", fetcher);

  return { data, error, isLoading };
};
