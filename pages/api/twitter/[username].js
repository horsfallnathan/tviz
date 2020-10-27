// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Axios from "axios";
const token = process.env.TW_API_TOKEN;

const twitterApi = `https://api.twitter.com/2/`;
const twAxiosService = Axios.create({
  baseURL: twitterApi,
  timeout: 1000,
  headers: {
    authorization: `Bearer ${token}`,
  },
});

export default ({ query: { username } }, res) => {
  const cleanUsername = username.replace(/^@/g, "");
  return twAxiosService
    .get(`users/by/username/${cleanUsername}`)
    .then(({ isAxiosError, data }) => {
      if (isAxiosError) {
        return res.status(504).send("user not found");
      } else {
        return res.status(200).send(data);
      }
    });
};
