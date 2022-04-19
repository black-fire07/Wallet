import "./App.css";
import { useState, useEffect } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

let web3Modal;
let provider;
let web3;
async function init() {
  console.log("initalzing");
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        },
        network: "Ethereum",
      },
    },
  };

  web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions,
  });
}

function App() {
  const [chainid, setchainId] = useState(0);

  useEffect(() => {
    async function fet() {
      await init();
      await loadBlockdata();
    }
    fet();
  }, []);

  const loadBlockdata = async () => {
    try {
      provider = await web3Modal.connect();
    } catch (e) {
      console.log("Could not get a wallet connection", e);
      return;
    }
    web3 = new Web3(provider);

    let chain;
    await web3.eth.getChainId().then((values) => {
      setchainId(values);
      chain = values;
    });
    if (chain == 1) {
      alert("you are connected to Eth");
    } else {
      alert("connect to eth and refresh");
    }
  };

  return <div className="App"></div>;
}

export default App;
