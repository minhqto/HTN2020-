import axios from "axios";
import moment from "moment";

const config = {
	headers: {
		Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
		"Access-Control-Allow-Origin": "*",
	},
};

export const schedulePost = async (content, time) => {
	console.log(process.env.REACT_APP_BEARER_TOKEN);
	const enpoint = "https://platform.hootsuite.com/v1/messages";
	const bodyParameters = {
		text: content, // content
		scheduledSendTime: time
			? time
			: moment(new Date()).add(10, "m").toDate(), //utc time
		socialProfileIds: [133950654], // social profile, twitter, etc
	};

	try {
		const response = await axios.post(enpoint, bodyParameters, config);
		return response;
	} catch (error) {
		throw error;
	}
};
