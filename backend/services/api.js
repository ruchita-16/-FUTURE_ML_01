import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const fetchKPIs = () => API.get("/kpis");
export const fetchForecast = () => API.get("/forecast");
export const fetchRegions = () => API.get("/regions");
export const fetchCategories = () => API.get("/categories");
export const fetchTopProducts = () => API.get("/top-products");
export const fetchDiscountImpact = () => API.get("/discount-impact");
