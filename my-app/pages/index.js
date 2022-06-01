import styles from "../styles/Home.module.css";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import Upload from "../components/Upload";

export default function Home() {
  const injected = new InjectedConnector();
  const { activate, active, library: provider } = useWeb3React();

  async function connect() {
    try {
      await activate(injected); // tell activate which provider to use
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className={styles.container}>
      { active ? (<><Upload active={active} provider={provider} /></>) : (<>Please Connect to metamasks
      <button onClick={() => connect()}>Connect</button></>)}
    </div>
  );
}
