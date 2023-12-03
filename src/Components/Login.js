import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { CircularProgress, Container } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";
import { withRouter, Redirect } from "react-router-dom";
import Land from "../abis/LandRegistry.json";
import { withStyles } from "@material-ui/core/styles";
import { GetCookie } from "../util/GetCookie";

const styles = () => ({
	root: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%,-50%)",
		"& .MuiFormLabel-root": {
			color: "#fff",
		},
		"&  .MuiInputBase-root": {
			color: "#fff",
		},
		"&  .MuiInput-underline:before": {
			borderBottomColor: "#fff",
		},
		"&  .MuiInput-underline:after": {
			borderBottomColor: "#fff",
		},
		"&  .MuiInput-underline:hover": {
			borderBottomColor: "#fff",
		},
		"& .MuiButton-containedPrimary": {
			backgroundColor: "#328888",
			fontFamily: "'Roboto Condensed', sans-serif",
		},
	},
});

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: "",
			authenticated: false,
		};
	}
	componentDidMount = async () => {
		const web3 = window.web3;
		const accounts = await web3.eth.getAccounts();
		// console.log(accounts)
		this.setState({ account: GetCookie() });
		const networkId = await web3.eth.net.getId();
		const LandData = Land.networks[networkId];
		if (LandData) {
			const landList = new web3.eth.Contract(Land.abi, LandData.address);
			this.setState({ landList });
		} else {
			window.alert("Token contract not deployed to detected network.");
		}

		console.log("account", this.state.account);
		if (window.localStorage.getItem("authenticated") === "true")
			window.location = "/dashboard";
	};
	handleChange = (name) => (event) => {
		console.log(event.target.value);
		this.setState({ [name]: event.target.value });
	};
	handleSubmit = async () => {
		const web3 = window.web3;
		console.log("address", this.state.address);
		let data = {
			account: web3.eth.accounts.privateKeyToAccount(this.state.address)
				.address,
		};
		if (this.state.address) {
			try {
				const user = await this.state.landList.methods
					.getUser(data.account)
					.call();

				console.log("user", user);
				if (user) {
					this.setState({
						uid: user[0],
						uname: user[1],
						ucontact: user[2],
						uemail: user[3],
						ucode: user[4],
						ucity: user[5],
						exist: user[6],
					});
					if (this.state.exist) {
						window.localStorage.setItem("authenticated", true);
						console.log(1, data.account);
						localStorage.setItem("web3account", data.account);
						document.cookie = "web3account=" + data.account;
						// window.localStorage.setItem('web3account', this.state.uid)
						// window.localStorage.setItem('category', 'user')
						window.location = "/dashboard";
					} else {
						console.log("Login Failed");
						window.localStorage.setItem("authenticated", false);
						this.props.history.push("/login");
					}
				} else {
					console.log("Please try again");
				}
			} catch (error) {
				console.log("error:", error);
			}
		} else {
			alert("All fields are required");
		}
	};
	render() {
		const { classes, assetList } = this.props;
		return (
			<div className="profile-bg">
				<Container
					style={{ marginTop: "40px" }}
					className={classes.root}
				>
					<div className="login-text">User Login</div>
					<div className="input">
						<input
							className="privateText"
							id="standard-full-width"
							type="address"
							label="Private Key"
							placeholder="Enter Your Private Key"
							fullWidth
							value={this.state.address}
							margin="normal"
							InputLabelProps={{
								shrink: true,
							}}
							onChange={this.handleChange("address")}
						/>
					</div>

					<div>
						<div style={{ marginTop: "20px", textAlign: "center" }}>
							<Button
								variant="contained"
								color="primary"
								endIcon={<SendIcon>submit</SendIcon>}
								onClick={this.handleSubmit}
							>
								Login
							</Button>
						</div>
					</div>
					<div
						style={{
							marginTop: "20px",
							textAlign: "center",
							color: "black",
						}}
					>
						Don't have an account?{"   "}{" "}
						<a href="/signup" style={{ color: "#328888" }}>
							Sign Up
						</a>
					</div>
				</Container>
			</div>
		);
	}
}
export default withStyles(styles)(Login);
