import { useState } from "react";

const DOMAINS = {
  // US
  AAPL: "apple.com",
  MSFT: "microsoft.com",
  NVDA: "nvidia.com",
  AMZN: "amazon.com",
  GOOGL: "google.com",
  GOOG: "google.com",
  META: "meta.com",
  TSLA: "tesla.com",
  AMD: "amd.com",
  NFLX: "netflix.com",
  PLTR: "palantir.com",
  AVGO: "broadcom.com",
  ORCL: "oracle.com",
  IBM: "ibm.com",
  JPM: "jpmorganchase.com",
  V: "visa.com",

  // India
  "RELIANCE.NS": "ril.com",
  "TCS.NS": "tcs.com",
  "INFY.NS": "infosys.com",
  "HDFCBANK.NS": "hdfcbank.com",
  "ICICIBANK.NS": "icicibank.com",
  "SBIN.NS": "sbi.co.in",
  "ITC.NS": "itcportal.com",
  "LT.NS": "larsentoubro.com",
  "BHARTIARTL.NS": "bharti.com",
  "HINDUNILVR.NS": "hul.co.in",
};

export default function CompanyLogo({ ticker, size = 48 }) {
  const domain = DOMAINS[ticker];
  const [failed, setFailed] = useState(!domain);

  if (failed) {
    return (
      <div
        className="flex items-center justify-center rounded-full bg-base-raised text-lg font-semibold text-ink-primary"
        style={{ width: size, height: size }}
      >
        {ticker?.[0]}
      </div>
    );
  }

  return (
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt={ticker}
      width={size}
      height={size}
      className="rounded-full bg-white p-1 object-contain"
      onError={() => setFailed(true)}
    />
  );
}