"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect } from "react";
import { getForexBar } from "@/getForexBar";

export default function Home() {
  useEffect(() => {
    getForexBar().then((res) => {
      console.log(res);
    });
  }, []);
  return (
    <main className={styles.main}>
      <h1>Forex</h1>
      <div className={styles.center}>
        <h1>CandleStick Chart</h1>
      </div>
      {/* 
      <div className={styles.grid}>
        <h1>Hello</h1>
      </div> */}
    </main>
  );
}
