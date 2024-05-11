import { useEffect, useState } from "react";
import "../styles/app.css";
import "../styles/styles.css";
import * as styles from "../styles/btn.module.css";
import jsImg from "../assets/js.png";
// import docker from "../assets/docker.svg";

function App() {
  const [btnLabel, setBtnLabel] = useState("click");
  useEffect(() => {
    setTimeout(() => {
      setBtnLabel("click again !!");
    }, 1000);
  }, []);
  return (
    <div>
       <img src={jsImg} alt="js" />
       <img src={jsImg} alt="docker" />

      <button type="button" className={styles.btn}>
        {btnLabel}
      </button>
    </div>
  );
}
export default App;
