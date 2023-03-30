"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./page.module.css";

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

export default function Home() {
  const [mission, setMission] = useState<{ title: string; items: string[] }>({
    title: "",
    items: [],
  });

  const handleCountryClick = async (country: string) => {
    try {
      const prompt = `추천 미션: ${country}에서 할 수 있는 재미있는 일은 무엇일까요?`;
      const response = await fetch(
        "https://api.openai.com/v1/engines/davinci/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            prompt,
            max_tokens: 100,
            temperature: 0.7,
            n: 1,
            stop: ["\n"],
          }),
        }
      );
      const data = await response.json();
      setMission(data.choices[0].text.trim());
      toast.success(`🚀 ${country} 미션 추천 완료!`);
    } catch (error) {
      console.error(error);
      toast.error(`❌ ${country} 미션 추천 실패!`);
    }
  };

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
      {mission.title && (
        <div className={styles.mission}>
          <h2>{mission.title}</h2>
          <ul>
            {mission.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
