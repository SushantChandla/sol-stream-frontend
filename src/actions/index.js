import {
	SystemProgram,
	Transaction,
	PublicKey,
	TransactionInstruction,
	Connection
} from "@solana/web3.js";

import axios from "../config";
import { serialize, } from 'borsh';

const programAccount = new PublicKey(
	"GoKSo1QVBx1jqeA15xSx6vJm3tYBM1586qp58VxXJayZ"
);

const adminAddress = new PublicKey("DGqXoguiJnAy8ExJe9NuZpWrnQMCV14SdEdiMEdCfpmB");

const cluster = "https://api.devnet.solana.com";
const connection = new Connection(cluster, "confirmed");



class WithdrawInput {
	constructor(properties) {
		Object.keys(properties).forEach((key) => {
			this[key] = properties[key];
		});
	}
	static schema = new Map([[WithdrawInput,
		{
			kind: 'struct',
			fields: [
				['amount', 'u64'],
			]
		}]]);
}


export const withdraw = (streamId, amountToWithdraw, wallet) => {
	return async (dispatch, getState) => {
		try {
			let create_stream_input = new WithdrawInput({
				amount: amountToWithdraw
			});
			let data = serialize(WithdrawInput.schema, create_stream_input);
			let data_to_send = new Uint8Array([2, ...data]);

			const instructionTOOurProgram = new TransactionInstruction({
				keys: [
					{ pubkey: streamId, isSigner: false, isWritable: true },
					{ pubkey: wallet.publicKey, isSigner: true, },
				],
				programId: programAccount,
				data: data_to_send
			});

			const trans = await setPayerAndBlockhashTransaction(
				[instructionTOOurProgram], wallet
			);

			let signature = await wallet.sendTransaction(trans, connection);
			const result = await connection.confirmTransaction(signature);
			console.log("end sendMessage", result);

		} catch (e) {
			alert(e);
		}
	};
};

export const cancelStream = (streamId, receiverAddress, wallet) => {
	return async (dispatch, getState) => {
		try {
			const instructionTOOurProgram = new TransactionInstruction({
				keys: [
					{ pubkey: streamId, isSigner: false, isWritable: true },
					{ pubkey: wallet.publicKey, isSigner: true, },
					{ pubkey: receiverAddress, isSigner: false }
				],
				programId: programAccount,
				data: Uint8Array([3])
			});

			const trans = await setPayerAndBlockhashTransaction(
				[instructionTOOurProgram], wallet
			);

			let signature = await wallet.sendTransaction(trans, connection);
			const result = await connection.confirmTransaction(signature);
			console.log("end sendMessage", result);
		} catch (e) {
			alert(e);
		}
	};
};



class CreateStreamInput {
	constructor(properties) {
		Object.keys(properties).forEach((key) => {
			this[key] = properties[key];
		});
	}
	static schema = new Map([[CreateStreamInput,
		{
			kind: 'struct',
			fields: [
				['start_time', 'i64'],
				['end_time', 'i64'],
				['receiver', [32]],
				['lamports_withdrawn', 'u64'],
				['amount_second', 'u64']]
		}]]);
}

export const createStream = ({
	receiverAddress,
	startTime,
	endTime,
	amountSpeed,
	wallet
}) => {
	return async (dispatch, getState) => {
		// try {
		const SEED = "abcdef" + Math.random().toString();
		let newAccount = await PublicKey.createWithSeed(
			wallet.publicKey,
			SEED,
			programAccount
		);

		let create_stream_input = new CreateStreamInput({
			start_time: startTime,
			end_time: endTime,
			receiver: new PublicKey(receiverAddress).toBuffer(),
			lamports_withdrawn: 0,
			amountSpeed: amountSpeed,
		});

		let data = serialize(CreateStreamInput.schema, create_stream_input);

		let data_to_send = new Uint8Array([1, ...data]);

		let rent = await connection.getMinimumBalanceForRentExemption(96);

		const createProgramAccount = SystemProgram.createAccountWithSeed({
			fromPubkey: wallet.publicKey,
			basePubkey: wallet.publicKey,
			seed: SEED,
			newAccountPubkey: newAccount,
			lamports: (endTime - startTime * amountSpeed) + 300000000 + rent,
			space: data.length,
			programId: programAccount,
		});

		const instructionTOOurProgram = new TransactionInstruction({
			keys: [
				{ pubkey: newAccount, isSigner: false, isWritable: true },
				{ pubkey: wallet.publicKey, isSigner: true, },
				{ pubkey: receiverAddress, isSigner: false, },
				{ pubkey: adminAddress, isSigner: false, }
			],
			programId: programAccount,
			data: data_to_send
		});
		const trans = await setPayerAndBlockhashTransaction(
			[createProgramAccount, instructionTOOurProgram], wallet
		);

		let signature = await wallet.sendTransaction(trans, connection);
		const result = await connection.confirmTransaction(signature);
		console.log("end sendMessage", result);
		// } catch (e) {
		// 	alert(e);
		// }
	};
};

async function setPayerAndBlockhashTransaction(instructions, wallet) {
	const transaction = new Transaction();
	instructions.forEach(element => {
		transaction.add(element);
	});
	transaction.feePayer = wallet.publicKey;
	let hash = await connection.getRecentBlockhash();
	transaction.recentBlockhash = hash.blockhash;
	return transaction;
}



export const getAllStreams = (pubkey) => {
	return async (dispatch, getState) => {
		try {
			let response = await axios.get(
				`/${pubkey}}`
			);
			if (response.status !== 200)
				throw new Error("Something went wrong");
			dispatch({
				type: "DATA_RECEIVED",
				result: response.data,
			});
		} catch (e) {
			console.log(e);
			dispatch({
				type: "DATA_NOT_RECEIVED",
				result: { data: null },
			})
		}
	};
};
