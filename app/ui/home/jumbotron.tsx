import Image from "next/image";
import styles from "./jumbotron.module.css";
export default function Jumbotron() {
  return (
    <>
      <div className={styles.jumbotron}>
        <div className={styles.text}>
          <h1>Gerbang Suara</h1>
          <h2>Welcome to Decentralized Voting Application👋</h2>
          <h3>Demokrasi Tanpa Keraguan</h3>
          <p>
            Gerbang Suara adalah aplikasi e-voting berbasis Blockchain dengan
            mengutamakan kerahasiaan dan keamanan
          </p>
          <button>Login MetaMask</button>
        </div>
        <div className={styles.imageprof}>
          <Image
            src="/gerbangsuara.png"
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
      </div>
    </>
  );
}
