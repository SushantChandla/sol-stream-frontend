import { useWallet } from "@solana/wallet-adapter-react";
import {
	SystemProgram,
	Transaction,
	PublicKey,
	TransactionInstruction,
} from "@solana/web3.js";

import axios from "../config";

const programAccount = new PublicKey(
	"GoKSo1QVBx1jqeA15xSx6vJm3tYBM1586qp58VxXJayZ"
);


export const withdraw = (streamId, amountToWithdraw) => {
	return async (dispatch, getState) => {
	};
};

export const cancelStream = (streamId, receiverAddress) => {
	return async (dispatch, getState) => {
	};
};

export const createStream = ({
	receiverAddress,
	startTime,
	endTime,
	amountSpeed,
}) => {
	return async (dispatch, getState) => {
	};
};


export const getAllStreams = () => {
	return async (dispatch, getState) => {
		dispatch({
			type: "DATA_RECEIVED",
			result: {
				"sending": [
					{ "amount_second": 66, "end_time": 1630889016, "from": "A7j3YAgaHmTdmCHPhLvVrwjzKTHM37GowfUTLsyowfBX", "id": "3PoNu2xRQLLefNpHPTDGkAqigR5caAAPKNs3Kr1wNEdh",  "lamports_withdrawn": 0, "start_time": 1630853012, "to": "7f71EW6o6bjzUQ5kminkZVcLYKA3RznJf6CgcL2yNEom", "total_amount": 2376264,}
				],
				"receiving": [
					{ "amount_second": 66, "end_time": 1630889016, "from": "A7j3YAgaHmTdmCHPhLvVrwjzKTHM37GowfUTLsyowfBX", "id": "3PoNu2xRQLLefNpHPTDGkAqigR5caAAPKNs3Kr1wNEdh", "is_active": true, "lamports_withdrawn": 0, "start_time": 1630853012, "status": "Completed", "statusID": 3, "to": "7f71EW6o6bjzUQ5kminkZVcLYKA3RznJf6CgcL2yNEom", "total_amount": 2376264,  }
				]
			},
		})
	};
};
