import axios from "axios";
import moment from "moment";

const config = {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
};

export const authorize = () => {
  return new Promise((resolve, reject) => {
    const authEndpoint = "https://platform.hootsuite.com/oauth2/auth";
    const bodyParameters = {
      response_type: "code",
      client_id: process.env.REACT_APP_CLIENT_ID,
      scope: "offline",
      redirect_uri: "http://localhost:3000",
    };

    axios
      .get(authEndpoint, bodyParameters)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getToken = (authCode) => {
  return new Promise((resolve, reject) => {
    const endpoint = "https://platform.hootsuite.com/oauth2/token";
    const bodyParameters = {
      grant_type: "authorization_code",
    };
    const headerParams = {
      Authorization: `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`,
    };
    axios
      .post(endpoint, bodyParameters, headerParams)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const schedulePost = async (content) => {
  const enpoint = "https://platform.hootsuite.com/v1/messages/";
  const bodyParameters = {
    text: content, // content
    scheduledSendTime: "2021-01-17T11:33:00Z", //utc time
    socialProfileIds: [133950654], // social profile, twitter, etc
  };

  try {
    const response = await axios.post(enpoint, bodyParameters, config);
    console.log(response);
    return response;
  } catch (error) {
    return error;
  }
};
