import os
import json
from datetime import datetime
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import DateRange, Dimension, Metric, RunReportRequest

# 💡 修正：從環境變數讀取 Property ID，不再寫死
PROPERTY_ID = os.getenv('PROPERTY_ID')

def get_ga4_stats():
    # 確保有讀取到 ID
    if not PROPERTY_ID:
        print("Error: PROPERTY_ID environment variable is not set.")
        return

    client = BetaAnalyticsDataClient()

    request = RunReportRequest(
        property=f"properties/{PROPERTY_ID}",
        dimensions=[Dimension(name="pageTitle")],
        metrics=[Metric(name="activeUsers")],
        date_ranges=[DateRange(start_date="7daysAgo", end_date="today")],
    )

    response = client.run_report(request)
    
    # 📊 修正：動態產生現在的時間 (格式：YYYY-MM-DD HH:MM)
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M')

    stats = {
        "last_updated": current_time,
        "top_pages": []
    }

    # 處理報表數據
    for row in response.rows:
        stats["top_pages"].append({
            "title": row.dimension_values[0].value,
            "users": int(row.metric_values[0].value) # 確保是數字類型
        })

    # 寫入 JSON
    file_path = 'public/stats.json'
    # 確保目錄存在（預防萬一）
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(stats, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Successfully updated stats.json at {current_time}")

if __name__ == "__main__":
    get_ga4_stats()