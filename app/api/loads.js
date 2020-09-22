import client from "./client";

const endpoint = "/loads";

const getLoads = () => client.get(endpoint);

const addLoad = (load, onUploadProgress) => {
  const data = new FormData();
  data.append("stationID", load.station);
  data.append("city", load.city);
  data.append("terminalRate", parseInt(load.rate));
  data.append("terminal", load.terminal);
  data.append("order", load.order);
  data.append("uptLink", load.uptLink);
  data.append("splits", load.splits);
  data.append("waitingTime", parseInt(load.waiting));

  if (load.images) {
    load.images.forEach((image, index) => {
      data.append("docs", {
        name: "image" + index + ".jpg",
        type: "image/jpeg",
        uri: image,
      });
    });
  }

  if (load.comments) {
    data.append("comments", load.comments);
  }
  // if (load.waitingTime) {
  //   data.append("waitingTime", parseInt(load.waiting));
  // }

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  getLoads,
  addLoad,
};
