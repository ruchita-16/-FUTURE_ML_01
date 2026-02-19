from statsmodels.tsa.holtwinters import ExponentialSmoothing
from services.data_service import get_monthly_sales
from sklearn.metrics import mean_absolute_error, mean_squared_error
import pandas as pd
import numpy as np


def forecast_sales(periods=6):
    monthly = get_monthly_sales()

    # Convert YearMonth back to datetime for modeling
    monthly["YearMonth"] = pd.to_datetime(monthly["YearMonth"])

    # ---- Train/Test Split ----
    train = monthly.iloc[:-12]
    test = monthly.iloc[-12:]

    model = ExponentialSmoothing(
        train["Sales"],
        trend="add",
        seasonal="add",
        seasonal_periods=12
    ).fit()

    # ---- Predict Test Data ----
    test_forecast = model.forecast(len(test))

    # ---- Error Metrics ----
    mae = mean_absolute_error(test["Sales"], test_forecast)
    rmse = np.sqrt(mean_squared_error(test["Sales"], test_forecast))
    mape = np.mean(np.abs((test["Sales"] - test_forecast) / test["Sales"])) * 100
    accuracy = 100 - mape

    # ---- Future Forecast ----
    future_forecast = model.forecast(periods)

    last_date = monthly["YearMonth"].iloc[-1]

    forecast_dates = pd.date_range(
        start=last_date,
        periods=periods + 1,
        freq="ME"
    )[1:]

    forecast_list = []
    for i in range(len(future_forecast)):
        forecast_list.append({
            "month": forecast_dates[i].strftime("%b %Y"),
            "predicted_sales": round(float(future_forecast.iloc[i]), 2)
        })

    return {
        "historical": monthly.tail(12).to_dict(orient="records"),
        "forecast": forecast_list,
        "metrics": {
            "mae": round(float(mae), 2),
            "rmse": round(float(rmse), 2),
            "mape": round(float(mape), 2),
            "accuracy_percent": round(float(accuracy), 2)
        }
    }
