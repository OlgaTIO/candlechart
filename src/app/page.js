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

const isValidDateFormat = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
};

function Home() {
  const date = new Date(Date.now() - 864e5).toISOString().slice(0, 10);

  const [startTime, setStartTime] = useState(date);
  const [endTime, setEndTime] = useState(date);
  const [startTimeError, setStartTimeError] = useState(null);
  const [endTimeError, setEndTimeError] = useState(null);
  const [selectedRange, setSelectedRange] = useState(1);
  const [selectedInterval, setSelectedInterval] = useState("minute");
  const [newStartTime, setNewStartTime] = useState("");
  const [newEndTime, setNewEndTime] = useState("");
  const { data, status, refetch } = useQuery({
    queryKey: ["forexData", selectedRange, selectedInterval],
    queryFn: async () =>
      getForexBar(
        selectedRange,
        selectedInterval,
        startTime,
        endTime,
        newStartTime,
        newEndTime
      ),
  });

  const handleIntervalChange = (event) => {
    setSelectedInterval(event.target.value);
  };

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };

  if (status === "pending") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "error" || !data) {
    return <div>Error fetching data</div>;
  }

  const handleStartTimeChange = (event) => {
    const value = event.target.value;
    setNewStartTime(value);
    setStartTimeError(!isValidDateFormat(value) ? "Invalid date format" : null);
  };

  const handleEndTimeChange = (event) => {
    const value = event.target.value;
    setNewEndTime(value);
    setEndTimeError(!isValidDateFormat(value) ? "Invalid date format" : null);
  };

  const handleButtonClick = async (event) => {
    event.preventDefault();
    if (isValidDateFormat(newStartTime) && isValidDateFormat(newEndTime)) {
      setNewStartTime(newStartTime);
      setNewEndTime(newEndTime);
      await refetch();
    } else {
      setStartTimeError("Invalid date format");
      setEndTimeError("Invalid date format");
    }
  };

  return (
    <main className={styles.main}>
      <h1>Forex</h1>
      <div className={styles.center}>
        <h2>CandleStick Chart</h2>
        {/* <ApexChart data={data} /> */}
        <CandlestickChart data={data} />
      </div>
      <div className={styles.time_container}>
        <label htmlFor="startTime">Start Date:</label>
        <input
          type="text"
          id="startTime"
          value={newStartTime}
          onChange={handleStartTimeChange}
          placeholder={date}
        />
        {startTimeError && (
          <span
            style={{
              color: "red",
              position: "absolute",
              top: "30px",
              left: "150px",
            }}
          >
            {startTimeError}
          </span>
        )}
        <label htmlFor="endTime">End Date:</label>
        <input
          type="text"
          id="endTime"
          value={newEndTime}
          onChange={handleEndTimeChange}
          placeholder={date}
        />
        {endTimeError && (
          <span
            style={{
              color: "red",
              position: "absolute",
              top: "30px",
              left: "470px",
            }}
          >
            {endTimeError}
          </span>
        )}
        <button onClick={handleButtonClick}>Add Date</button>
      </div>
      <div className={styles.controls}>
        <label htmlFor="interval">Select Interval:</label>
        <select
          id="interval"
          value={selectedInterval}
          onChange={handleIntervalChange}
        >
          <option value="minute">Minute</option>
          <option value="hour">Hour</option>
        </select>

        <label htmlFor="range">Select Range:</label>
        <select id="range" value={selectedRange} onChange={handleRangeChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
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
