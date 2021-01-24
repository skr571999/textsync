const prod = {
  BASE_URL: "https://textsync.herokuapp.com/api/",
};

const dev = {
  BASE_URL: "http://localhost:8000/api/",
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
