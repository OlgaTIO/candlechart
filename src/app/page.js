"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getForexBar } from "../app/data/getForexBar";
import ApexChart from "../app/components/ApexChart";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const [selectedRange, setSelectedRange] = useState(2);
  const { data, status } = useQuery({
    queryKey: ["forexData"],
    queryFn: () => getForexBar(selectedRange),
  });
  console.log(data);
  const handleRangeChange = (event) => {
    setSelectedRange(parseInt(event.target.value));
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error" || !data) {
    return <div>Error fetching data</div>;
  }

  return (
    <main className={styles.main}>
      <h1>Forex</h1>
      <div className={styles.center}>
        <h2>CandleStick Chart</h2>
        <ApexChart data={data} />
      </div>
      <div className={styles.controls}>
        <label htmlFor="range">Select Range:</label>
        <select id="range" value={selectedRange} onChange={handleRangeChange}>
          <option value="2">2 Minutes</option>
          <option value="3">3 Minutes</option>
          <option value="4">4 Minutes</option>
          <option value="5">5 Minutes</option>
        </select>
      </div>
    </main>
  );
}
