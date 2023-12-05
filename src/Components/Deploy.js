import React, { useEffect } from "react";
import deploy from "../util/Deploy";
import { useState } from "react";

function Deploy() {
	const [addrs, setaddr] = useState("xyz");
	const text = "Hello World";
	useEffect(() => {
		setaddr(deploy());
	}, []);
	return (
		<div>
			<div className="">{text}</div>
		</div>
	);
}

export default Deploy;

// "Hello world" render ho raha hai but state variable nahi ho raha
