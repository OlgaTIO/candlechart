"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getForexBar } from "../../src/app/data/getForexBar";
import ApexChart from "../../src/app/components/ApexChart";

export default function Home() {
  const [forexData, setForexData] = useState([]);

  useEffect(() => {
    getForexBar().then((res) => {
      console.log(res);
      setForexData(res);
    });
  }, []);

  return (
    <main className={styles.main}>
      <h1>Forex</h1>
      <div className={styles.center}>
        <h1>CandleStick Chart</h1>
        <ApexChart data={forexData} />
      </div>
    </main>
  );
}
