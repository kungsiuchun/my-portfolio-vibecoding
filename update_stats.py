import os
import json
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import DateRange, Dimension, Metric, RunReportRequest

# 設定 GA4 Property ID (在 GA4 管理介面可以找到)
PROPERTY_ID = '517651671'

def get_ga4_stats():
    # 這裡會讀取我們稍後設定在 GitHub Secrets 的憑證
    client = BetaAnalyticsDataClient()

    request = RunReportRequest(
        property=f"properties/{PROPERTY_ID}",
        dimensions=[Dimension(name="pageTitle")],
        metrics=[Metric(name="activeUsers")],
        date_ranges=[DateRange(start_date="7daysAgo", end_date="today")],
    )

    response = client.run_report(request)
    
    stats = {
        "last_updated": "2023-10-27", # 這裡可以用 datetime 自動產生
        "top_pages": []
    }

    for row in response.rows:
        stats["top_pages"].append({
            "title": row.dimension_values[0].value,
            "users": row.metric_values[0].value
        })

    # 將結果存入 public 資料夾，讓 React 可以讀取
    with open('public/stats.json', 'w', encoding='utf-8') as f:
        json.dump(stats, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    get_ga4_stats()