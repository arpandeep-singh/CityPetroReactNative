import client from "./client";

const endpoint = "/stations";

const getStations = () => client.get(endpoint);

export default {
  getStations,
};
