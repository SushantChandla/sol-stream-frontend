import React from "react";
import { Layout, Row, Col, Button } from "antd";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import { isMobile } from "react-device-detect";
import { WalletMultiButton } from "@solana/wallet-adapter-ant-design";

const { Header } = Layout;

const HeaderSection = (props) => {
	const toggle = () => {
		if (!isMobile) {
			props.setCollapsed(!props.collapsed);
		}
	};
	return (
		<Header
			className="site-layout-background-header"
			style={{ padding: 0, position: "fixed", zIndex: 1, width: "100%" }}
		>
			<Row justify="space-between">
				<Row>
					<Col>
						<span className="trigger" onClick={toggle}>
							{props.collapsed ? (
								<MenuFoldOutlined />
							) : (
								<MenuUnfoldOutlined />
							)}
						</span>
					</Col>
					<Col>
						<div className="logo">SOl Stream</div>
					</Col>
				</Row>
				<Col style={{ marginRight: "15px" }}>
					<WalletMultiButton />
				</Col>
			</Row>
		</Header>
	);
};

export default HeaderSection;
