import type { NextApiRequest, NextApiResponse } from "next";
import { IScanResponse } from "@/interfaces/index";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IScanResponse>
) {
  let addressHasPoap = false;

  if (req.query.address && req.query.eventId) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key": `${process.env.POAP_API_KEY}`,
      },
    };

    const scanFetchResponse = await fetch(
      `https://api.poap.tech/actions/scan/${req.query.address}/${req.query.eventId}`,
      options
    );

    const scanFetchResult = await scanFetchResponse.json();

    if (!scanFetchResult.event) {
      addressHasPoap = false;
    } else {
      addressHasPoap = true;
    }

    res.status(200).json({
      message: "Wallet address scanned successfully",
      scan: addressHasPoap,
    });
  } else {
    res.status(200).json({ message: "No params needed provided", scan: false });
  }
}