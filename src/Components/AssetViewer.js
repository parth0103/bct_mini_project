import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Button, Container, CircularProgress } from "@material-ui/core";
import Land from "../abis/LandRegistry.json";
import ipfs from "../ipfs";
import Table from "../Containers/Owner_Table";
import AvailableTable from "../Containers/Buyer_Table";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import axios from "axios";
import { Viewer, Worker } from "@react-pdf-viewer/core";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";

const styles = (theme) => ({
	container: {
		"& .MuiContainer-maxWidthLg": {
			maxWidth: "100%",
		},
	},
	root: {
		backgroundColor: "#fff",
		// width: 500,
		borderRadius: "5px",
		minHeight: "80vh",
	},
});
class AssetViewer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			assetList: [],
			assetList1: [],
			isLoading: true,
			value: 0,
		};
	}
	componentDidMount = async () => {
		const web3 = window.web3;
		// const accounts = await web3.eth.getAccounts();
		// // await window.localStorage.setItem("web3account", accounts[0]);
		// var web3Account;
		// try {
		// 	web3Account = GetCookie();
		// } catch (err) {
		// 	console.log(err);
		// }
		// console.log("cookie,", web3Account);
		// this.setState({ account: web3Account });
		// const networkId = await web3.eth.net.getId();
		// const LandData = Land.networks[networkId];
		// if (LandData) {
		// 	const landList = new web3.eth.Contract(Land.abi, LandData.address);
		// 	this.setState({ landList });
		// } else {
		// 	window.alert("Token contract not deployed to detected network.");
		// }

		// if (
		// 	!window.localStorage.getItem("authenticated") ||
		// 	window.localStorage.getItem("authenticated") === "false"
		// )
		// 	this.props.history.push("/login");
		// // const category=window.localStorage.getItem('category');
		// this.setState({ isLoading: false });
		// this.getDetails();
		// this.getDetails1();
		this.setState({ isLoading: false });
	};
	render() {
		const { classes } = this.props;
		return this.state.isLoading ? (
			<div style={{ position: "absolute", top: "50%", left: "50%" }}>
				<CircularProgress />
			</div>
		) : (
			<div className="profile-bg">
				<div className={classes.container}>
					<div
						className=""
						style={{
							marginTop: "40px",
							paddingLeft: "40px",
							fontSize: "1.25rem",
							lineHeight: "2rem",
							fontWeight: "600",
						}}
					>
						Assets
					</div>
					<div
						style={{
							paddingLeft: "40px",
							width: "90%",
							display: "flex",
							justifyItems: "center",
							justifyContent: "center",
						}}
					>
						<div
							className=""
							style={{
								width: "58%",
							}}
						>
							<Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
								<Viewer
									fileUrl={
										"https://bafybeib6ukhdkv7hnifdgv52xsgupkhomrmslwf2ykvczgbjryem3bddri.ipfs.w3s.link/land_registry.pdf"
									}
								/>
							</Worker>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default withStyles(styles)(AssetViewer);
