const { API } = require("./Api");

export const LoginUser = () => {
  return fetch(`${API}/authorise`, {
    method: "POST",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("SERVER ERROR", error);
    });
};

export const AuthoriseUser = (myCode) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myCode),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("SERVER ERROR", error);
    });
};

export const listEvent = () => {
  return fetch(`${API}/list`, {
    method: "POST",
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("SERVER ERROR", error);
    });
};

export const AddEvent = (myEvent) => {
  return fetch(`${API}/event/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myEvent),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("SERVER ERROR", error);
    });
};
