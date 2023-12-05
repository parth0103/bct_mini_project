// const fs = require("fs-extra");
// const path = require("path");
// const we//b3 = require("./web3");
// const we/b3Network = "ganache";
import compiledContract from "../abis/LandRegistry.json";

const deploy = async () => {
	try {
		const web3 = window.web3;
		console.log(web3);
		// set the receipt path
		// biddingTime = parseInt(biddingTime);
		// const receiptPath = path.resolve(
		// 	__dirname,
		// 	"receipt-" + web3Network + ".json"
		// );
		// console.log(`---------- receipt path -------- ${receiptPath}`);

		// deploying the contract with accounts[0]
		const accounts = await web3.eth.getAccounts();
		const owner = accounts[0];
		// console.log(owner);
		console.log(`Attempting to deploy from account , ${accounts[0]}`);

		/**
		 * To deploy a new it requires contract interface and its bytecode
		 * Both we get after compiling the smart contract
		 * The compiled smart contract is saved in build folder in json
		 */
		// console.log(compiledContract.bytecode);
		const result = await new web3.eth.Contract(compiledContract.abi)
			.deploy({
				data: compiledContract.bytecode,
			})
			.send({ gas: 5000000, from: owner, gasPrice: 1000000 });
		console.log(`Contract deployed to ${result.options.address}`);
		// web3.eth.handleRevert=true;
		// CircularJson is converting nested object into string which can be then saved as json

		// save the receipt address in receipt path
		// fs.writeJsonSync(receiptPath, result.options);
		console.log(result);
		console.log("receipt saved successfully");

		return result.options.address;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export default deploy;
