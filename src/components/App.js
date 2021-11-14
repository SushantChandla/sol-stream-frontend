import React, { useEffect, useState } from "react";
import { Layout, notification, Button } from "antd";
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

const { Content } = Layout;

function getKey(path) {
	if (path.includes("/sending")) return "2";
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
  const [collapsed, setCollapsed] = useState((isMobile)?true:false);
  const location = useLocation()
	const [key, setKey] = useState(getKey(location.pathname));
  

  return (
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
              <Route path="/">
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
  );
};

export default App;
