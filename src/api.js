import axios from "axios";

const config = {
	headers: {
		Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json",
	},
};

export const schedulePost = async (content) => {
	console.log(process.env.REACT_APP_BEARER_TOKEN);
	const enpoint = "https://platform.hootsuite.com/v1/messages/";
	const bodyParameters = {
		text: content, // content
		scheduledSendTime: "2021-01-17T11:33:00Z", //utc time
		socialProfileIds: [133950654], // social profile, twitter, etc
	};

	try {
		const response = await axios.post(enpoint, bodyParameters, config);
		return response;
	} catch (error) {
		return error;
	}
};
