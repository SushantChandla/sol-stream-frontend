import React, { useEffect } from "react";
import { Layout, Menu, Row, Col, Button } from "antd";
import {
	DownloadOutlined,
	SendOutlined,
	FormOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import DarkModeToggle from "react-dark-mode-toggle";

const { Sider } = Layout;

const SiderSection = (props) => {
	const location = useLocation();
	useEffect(() => {
		props.setKey(props.getKey(location.pathname));
	}, [props.keyName]);

	return (
		<Sider
			className="sider-view"
			style={{
				overflow: "auto",
				height: "100vh",
				position: "fixed",
				left: 0,
				marginTop: 64,
				border: "rgb(0,0,0,0.09) solid 1px",
			}}
			trigger={null}
			collapsible
			collapsed={props.collapsed}
		>
			<Menu
				theme="light"
				mode="inline"
				defaultSelectedKeys={[props.keyName]}
			>
				<Menu.Item key="2" icon={<SendOutlined />}>
					<Link to="/"> Sending </Link>
				</Menu.Item>
				<Menu.Item key="3" icon={<DownloadOutlined />}>
					<Link to="/receiving"> Receiving </Link>
				</Menu.Item>
				<Menu.Item key="4" icon={<FormOutlined />}>
					<Link to="/createstream"> Create Stream </Link>
				</Menu.Item>

			</Menu>
			<Row
				style={{ position: "absolute", bottom: 40, width: "100%" }}
				align="middle"
				justify="space-around"
			>
				<Col>
					<DarkModeToggle
						onChange={props.dark.toggle}
						checked={props.dark.value}
						size={50}
					/>
				</Col>
			</Row>
		</Sider>
	);
};

export default SiderSection;
