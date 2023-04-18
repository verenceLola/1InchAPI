import { ICoin } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";
import superagent from "superagent";

interface IToken extends ICoin {
  logoURI: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICoin[]>
) {
  superagent.get("https://api.1inch.io/v5.0/1/tokens", (err, response) => {
    if (!err) {
      const data = response.body as unknown as {
        tokens: Record<string, IToken>;
      };

      const coins: ICoin[] = Object.values(data.tokens).map(
        ({ address, name, symbol, logoURI }) => ({
          address,
          name,
          symbol,
          logoUrl: logoURI,
        })
      );

      res.status(response.status).send(coins);
    }
  });
}
