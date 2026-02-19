import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "data", "Sample - Superstore.csv")


def load_data():
    df = pd.read_csv(DATA_PATH, encoding="latin1")

    # 🔥 Clean column names (VERY IMPORTANT)
    df.columns = df.columns.str.strip()

    return df


def get_monthly_sales():
    df = load_data()

    # Ensure correct datetime conversion
    df["Order Date"] = pd.to_datetime(df["Order Date"], errors="coerce")

    # Drop rows where date parsing failed
    df = df.dropna(subset=["Order Date"])

    df["YearMonth"] = df["Order Date"].dt.to_period("M")

    monthly_sales = (
        df.groupby("YearMonth")["Sales"]
        .sum()
        .reset_index()
        .sort_values("YearMonth")
    )

    monthly_sales["YearMonth"] = monthly_sales["YearMonth"].astype(str)

    return monthly_sales
