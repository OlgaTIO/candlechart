"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getForexBar } from "../app/data/getForexBar";
import ApexChart from "../app/components/ApexChart";

export default function Home() {
  const [forexData, setForexData] = useState([]);
  const [selectedRange, setSelectedRange] = useState(2);

  const fetchForexData = async (range) => {
    const data = await getForexBar(range);
    setForexData(data);
  };

  useEffect(() => {
    fetchForexData(selectedRange);
  }, [selectedRange]);

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };

  return (
    <main className={styles.main}>
      <h1>Forex</h1>
      <div className={styles.center}>
        <h2>CandleStick Chart</h2>
        <ApexChart data={forexData} />
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
