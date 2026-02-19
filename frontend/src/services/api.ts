import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getKPIs = async () => {
  const res = await API.get("/kpis");
  return res.data;
};

export const getForecast = async () => {
  const res = await API.get("/forecast");
  return res.data;
};

export const getRegions = async () => {
  const res = await API.get("/regions");
  return res.data;
};

export const getCategories = async () => {
  const res = await API.get("/categories");
  return res.data;
};

export const getTopProducts = async () => {
  const res = await API.get("/top-products");
  return res.data;
};

export const getDiscountImpact = async () => {
  const res = await API.get("/discount-impact");
  return res.data;
};
