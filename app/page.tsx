"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./page.module.css";

export default function Home() {
  const [missions, setMissions] = useState<{ title: string; items: string[] }>({
    title: "",
    items: [],
  });

  const handleCountryClick = async (country: string) => {
    try {
      const response = await fetch(`/api/missions?country=${country}`);
      const data = await response.json();
      setMissions(data);
      toast.success(`🚀 ${country} 미션 추천 완료!`);
    } catch (error) {
      console.error(error);
      toast.error(`❌ ${country} 미션 추천 실패!`);
    }
  };
  console.log(missions, "미션스");
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <div
          className={styles.thirteen}
          style={{ cursor: "pointer" }}
          onClick={() => handleCountryClick("서울")}
        >
          서울
        </div>
        <div
          className={styles.thirteen}
          style={{ cursor: "pointer" }}
          onClick={() => handleCountryClick("방콕")}
        >
          방콕
        </div>
        <div
          className={styles.thirteen}
          style={{ cursor: "pointer" }}
          onClick={() => handleCountryClick("영국")}
        >
          영국
        </div>
        <div
          className={styles.thirteen}
          style={{ cursor: "pointer" }}
          onClick={() => handleCountryClick("괌")}
        >
          괌
        </div>
        <div
          className={styles.thirteen}
          style={{ cursor: "pointer" }}
          onClick={() => handleCountryClick("일본")}
        >
          일본
        </div>
      </div>
      <ToastContainer />
      {missions.title && (
        <div className={styles.missions}>
          <h2>{missions.title}</h2>
          <ul>
            {missions.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
