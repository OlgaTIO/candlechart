"use client";

import styles from "./page.module.css";
import { useState } from "react";
import ApexChart from "../app/components/ApexChart";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { getForexBar } from "./data/getForexBar";
import CandlestickChart from "./components/CandlestickChart";

function Home() {
  const [selectedRange, setSelectedRange] = useState(1);
  const { data, status } = useQuery({
    queryKey: ["forexData", selectedRange],
    queryFn: async () => getForexBar(selectedRange),
  });

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };

  if (status === "pending") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "error" || !data) {
    return <div>Error fetching data</div>;
  }

  return (
    <main className={styles.main}>
      <h1>Forex</h1>
      <div className={styles.center}>
        <h2>CandleStick Chart</h2>
        {/* <ApexChart data={data} /> */}
        <CandlestickChart data={data} />
      </div>
      <div className={styles.controls}>
        <label htmlFor="range">Select Range:</label>
        <select id="range" value={selectedRange} onChange={handleRangeChange}>
          <option value="1">1 Minutes</option>
          <option value="2">2 Minutes</option>
          <option value="3">3 Minutes</option>
          <option value="4">4 Minutes</option>
          <option value="5">5 Minutes</option>
        </select>
      </div>
    </main>
  );
}

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}
