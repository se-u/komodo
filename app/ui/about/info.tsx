"use client";
import { fetchCanditates } from "@/app/lib/data";
import styles from "./about.module.css";
import { useCallback } from "react";

export default function Info() {
  const _fetchCandidate = useCallback(async () => {
    const result = await fetchCanditates();
    console.log(result);
  }, []);
  _fetchCandidate();

  return (
    <>
      <div className={styles.jumbotronAbout}>
        <div className={styles.textOneAbout}>
          <h1>About Us</h1>
          <h2>Gebang Suara</h2>
          <h3>Demokrasi Tanpa Keraguan</h3>
        </div>
        <div className={styles.textTwoAbout}>
          <p>
            kami berkomitmen untuk mengubah lanskap demokrasi melalui teknologi
            blockchain. Kami fokus menciptakan sistem pemilihan yang aman,
            transparan, dan tidak dapat dimanipulasi.
          </p>
          <p>
            Bayangkan masa depan di mana setiap suara tercatat pada blockchain
            yang tidak dapat diubah, memastikan integritas proses pemilihan.
            Keahlian kami berada dalam mengembangkan solusi mutakhir yang
            menjamin privasi pemilih sambil menjaga standar keamanan tertinggi.
          </p>
        </div>
      </div>
    </>
  );
}
