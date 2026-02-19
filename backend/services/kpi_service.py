import pandas as pd
import os

def load_data():
    base_dir = os.path.dirname(os.path.dirname(__file__))  # backend folder
    file_path = os.path.join(base_dir, "data", "Sample - Superstore.csv")
    df = pd.read_csv(file_path, encoding="latin1")
    return df

def calculate_kpis():
    df = load_data()

    total_sales = df["Sales"].sum()
    total_orders = df.shape[0]
    avg_order_value = total_sales / total_orders

    return {
        "total_sales": round(total_sales, 2),
        "total_orders": int(total_orders),
        "avg_order_value": round(avg_order_value, 2)
    }


def category_analysis():
    df = load_data()

    category_sales = (
        df.groupby("Category")["Sales"]
        .sum()
        .sort_values(ascending=False)
    )

    return category_sales.to_dict()

def region_analysis():
    df = load_data()

    region_data = (
        df.groupby("Region")
        .agg(
            total_sales=("Sales", "sum"),
            total_profit=("Profit", "sum")
        )
        .reset_index()
    )

    region_data["profit_margin_percent"] = (
        region_data["total_profit"] / region_data["total_sales"]
    ) * 100

    return region_data.to_dict(orient="records")

def top_products(limit=5):
    df = load_data()

    product_data = (
        df.groupby("Product Name")
        .agg(
            total_sales=("Sales", "sum"),
            total_profit=("Profit", "sum")
        )
        .reset_index()
        .sort_values(by="total_sales", ascending=False)
        .head(limit)
    )

    return product_data.to_dict(orient="records")

def discount_analysis():
    df = load_data()

    discount_data = (
        df.groupby("Discount")
        .agg(
            total_sales=("Sales", "sum"),
            total_profit=("Profit", "sum")
        )
        .reset_index()
        .sort_values(by="Discount")
    )

    discount_data["profit_margin_percent"] = (
        discount_data["total_profit"] / discount_data["total_sales"]
    ) * 100

    return discount_data.to_dict(orient="records")