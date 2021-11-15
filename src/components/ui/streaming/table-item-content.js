import React, { useState, useEffect } from "react";
import {
	Drawer,
	Steps,
	Button,
	Row,
	Col,
	Card,
	Slider,
	notification,
} from "antd";
import { useDispatch, useSelector } from "react-redux";

import { cancelStream } from "../../../actions";
import { useWallet } from "@solana/wallet-adapter-react";

const { Step } = Steps;
const { Meta } = Card;

const openNotificationSuccess = () => {
	notification["success"]({
		message: "Cancel Success",
		description: "Cancel was successfully processed.",
	});
};

const openNotificationFail = () => {
	notification["warning"]({
		message: "Cancel Unsuccessful",
		description:
			"Some error occurred. However it is possible the amount was processed. Kindly check your wallet.",
	});
};

const TableContent = ({
	startTime,
	endTime,
	withdrawn,
	receiver,
	streamed,
	statusID,
	streamID,
}) => {
	const [drawer, setDrawer] = useState(false);
	const [ratio, setRatio] = useState(50);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const selector = useSelector((state) => state.cancelStatus);

	useEffect(() => {
		if (loading) {
			if (selector) {
				openNotificationSuccess();
			} else {
				openNotificationFail();
			}
		}
		setLoading(false);
		setDrawer(false);
	}, [selector]);

	const wallet=useWallet();

	return (
		<div className="site-drawer-render-in-current-wrapper">
			<div style={{ padding: 30, border: "rgb(0,0,0,0.09) solid 1px" }}>

				<Row justify="space-between" align="middle">
					<Col span={15}>
						<Row gutter={[16, 16]}>
							<Col span={12}>
								<Meta
									className="card-custom-extra item-heading"
									title="Start Time"
									description={startTime}
								></Meta>
							</Col>
							<Col span={12}>
								<Meta
									className="card-custom-extra item-heading"
									title="End Time"
									description={endTime}
								></Meta>
							</Col>
							<Col span={12}>
								<Meta
									className="card-custom-extra item-heading"
									title="Withdrawn"
									description={withdrawn.toString()}
								></Meta>
							</Col>
							<Col span={12}>
								<Meta
									className="card-custom-extra item-heading"
									title="Recipient"
									description={receiver}
								></Meta>
							</Col>
						</Row>
					</Col>

					<Col span={6}>
						<Card
							className="card-custom-extra"
						>
							<Row justify="center">
								<Button
									type="primary"
									shape="round"
									onClick={() => {
										dispatch(cancelStream(streamID, receiver,wallet));
										setLoading(true);
									}}
								>
									Close Stream
								</Button>
							</Row>
						</Card>
					</Col>
				</Row>
				<br />
				<br />
				<Steps current={statusID}>
					<Step
						title="Started Streaming"
						description={`On ${startTime}`}
					/>
					<Step
						title="In Progress"
						description={`Streaming ${streamed.toString()}`}
					/>
					<Step title="Ends" description={`On ${endTime}`} />
				</Steps>
			</div>
		</div>
	);
};

export default TableContent;
