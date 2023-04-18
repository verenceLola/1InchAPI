import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

interface Response {
  fromToken: string;
  toToken: string;
  fromTokenAmount: string;
  toTokenAmount: string;
  estimatedGas: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await axios
    .get<any, AxiosResponse<Response>>("https://api.1inch.io/v5.0/1/quote/", {
      params: req.query,
    })
    .then(({ data, status }) => {
      res.status(status).send(data);
    })
    .catch((err) => res.status(500).send(err));
};

export default handler;
