import axios from "axios";
export const apiCall = (method, path, data, comingBaseUrl) => {
  let ContentType;
  const baseUrl = comingBaseUrl;
  if (path === "signup") {
    ContentType = "multipart/form-data";
  } else {
    ContentType = "application/json";
  }
  if (method !== "get") {
    return new Promise((resolve, reject) => {
      axios({
        method: method,
        // timeout: 2500,
        url: `${baseUrl + path}`,
        headers: {
          "Content-Type": ContentType,
        },
        data: data,
        responseType: "json",
        validateStatus: () => true,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
          if (
            err &&
            err.response &&
            err.response.status &&
            err.response.status === 401
          ) {
            console.log(err, "err");
          }
        });
    });
  } else if (method === "get") {
    return new Promise((resolve, reject) => {
      axios
        .get(`${baseUrl + path}`, {
          params: data,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  return;
};
