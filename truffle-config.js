require("babel-register");
require("babel-polyfill");
const HDWalletProvider = require("@truffle/hdwallet-provider");
module.exports = {
	networks: {
		development: {
			host: "ganache",
			port: 8545,
			network_id: "*", // Match any network id
		},
		sepolia: {
			provider: () =>
				new HDWalletProvider(
					"ball captain resource submit lesson claim proud dignity artist grid buyer core",
					"https://sepolia.infura.io/v3/dc9ad9ddd0574fb7837704a5bc7bb546"
				),

			network_id: "11155111",
		},
	},
	contracts_directory: "./src/contracts/",
	contracts_build_directory: "./src/abis/",
	compilers: {
		solc: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
};
