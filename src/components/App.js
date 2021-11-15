import React, { useState } from "react";
import { Layout, notification } from "antd";
import { Switch, Route, useLocation } from "react-router-dom";
import { isMobile } from "react-device-detect";

import Sider from "./sections/Sider";
import Header from "./sections/Header";
import "./css/main-layout.css";
import "./css/create-stream.css";
import MyStreams from "./layouts/MyStreams";
import Stream from "./layouts/Stream";
import CreateStream from "./layouts/CreateStream";
import useDarkMode from "use-dark-mode";
import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getLedgerWallet,
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletExtensionWallet,
  getSolletWallet,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-ant-design";
import { clusterApiUrl } from "@solana/web3.js";

const { Content } = Layout;

function getKey(path) {
  if (path.includes("/")) return "2";
  if (path.includes("/receiving")) return "3";
  if (path.includes("/createstream")) return "4";
  return "1";
}

const openNotificationFail = () => {
  notification["warning"]({
    message: "The DApp is not Optimised for Mobile",
    description:
      "The DApp is still under construction! We recommend using it on desktop.",
  });
};


const App = () => {
  const dark = useDarkMode(false);
  const [collapsed, setCollapsed] = useState((isMobile) ? true : false);
  const location = useLocation()
  const [key, setKey] = useState(getKey(location.pathname));


  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSlopeWallet(),
      getSolflareWallet(),
      getLedgerWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    [network]
  );


  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>
          <Layout>
            <Header collapsed={collapsed} setCollapsed={setCollapsed} />
            <Layout>
              <Sider dark={dark} setKey={setKey} getKey={getKey} keyName={key} collapsed={collapsed} />
              <Layout
                className="site-layout"
                style={{ marginLeft: `${collapsed ? "80px" : "200px"}` }}
              >
                <Content
                  className="site-layout-background"
                  style={{
                    marginTop: 64,
                    height: "89vh",
                    overflow: "initial",
                  }}
                >
                  <Switch>
                    <Route exact path="/">
                      <MyStreams />
                    </Route>
                    <Route path="/receiving">
                      <Stream />
                    </Route>
                    <Route path="/createstream">
                      <CreateStream setKey={setKey} />
                    </Route>
                  </Switch>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;
