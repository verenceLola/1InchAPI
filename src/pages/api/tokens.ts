import { ICoin } from "@/models";
import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

interface IToken extends ICoin {
  logoURI: string;
}

interface Response {
  tokens: Record<string, IToken>;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ICoin[]>) => {
  await axios
    .get<any, AxiosResponse<Response>>("https://api.1inch.io/v5.0/1/tokens")
    .then((response) => {
      const data = response.data;

      const coins: ICoin[] = Object.values(data.tokens)
        .slice(0, 49)
        .map(({ address, name, symbol, logoURI }) => ({
          address,
          name,
          symbol,
          logoUrl: logoURI,
        }));

      const sorted = coins.sort((a, b) => a.symbol.localeCompare(b.symbol));

      res.status(response.status).send(sorted);
    })
    .catch((err) => res.status(500).send(err));
};

export default handler;
