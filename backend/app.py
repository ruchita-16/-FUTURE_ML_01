from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from services.data_service import load_data
from services.forecast_service import forecast_sales
from services.kpi_service import (
    calculate_kpis,
    category_analysis,
    region_analysis,
    top_products,
    discount_analysis
)

app = FastAPI(title="Sales Forecasting API")

# Allow frontend (Vite) to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Backend is running"}


@app.get("/health")
def health_check():
    return {"status": "OK"}

@app.get("/kpis")
def get_kpis():
    return calculate_kpis()

@app.get("/forecast")
def get_forecast():
    return forecast_sales()

@app.get("/categories")
def get_categories():
    return category_analysis()

@app.get("/regions")
def get_regions():
    return region_analysis()

@app.get("/top-products")
def get_top_products():
    return top_products()

@app.get("/discount-impact")
def get_discount_impact():
    return discount_analysis()
