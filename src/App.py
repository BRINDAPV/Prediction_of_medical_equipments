# app.py
from flask import Flask, jsonify
from flask_cors import CORS
import snowflake.connector
import os

# -------------------------------
# Base Setup
# -------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__)
CORS(app)  # allow all origins for development

# Snowflake credentials
conn_params = {
    "user": "Logesh0904",
    "password": "Logi@123456789",
    "account": "pawcpyq-it31682",
    "warehouse": "COMPUTE_WH",
    "role": "ACCOUNTADMIN",
    "database": "MEDPREDICT",
    "schema": "PUBLIC"
}

# -------------------------------
# Helper function
# -------------------------------
def fetch_snowflake_data(query, params=None):
    try:
        conn = snowflake.connector.connect(**conn_params)
        cs = conn.cursor()
        try:
            if params:
                cs.execute(query, params)
            else:
                cs.execute(query)
            columns = [desc[0] for desc in cs.description]
            rows = cs.fetchall()
            return [dict(zip(columns, row)) for row in rows]
        finally:
            cs.close()
            conn.close()
    except Exception as e:
        print("❌ Snowflake Error:", e)
        return []

# -------------------------------
# Health check
# -------------------------------
@app.route("/api/health", methods=["GET"])
def health():
    try:
        fetch_snowflake_data("SELECT 1")
        return jsonify({"status": "healthy"})
    except:
        return jsonify({"status": "unhealthy"}), 500

# -------------------------------
# Dashboard API
# -------------------------------
@app.route("/api/dashboard", methods=["GET"])
def get_dashboard():
    try:
        # 1️⃣ Stats
        stats_query = """
        SELECT 
            COUNT(DISTINCT m.ID) AS total_manufacturers,
            COUNT(DISTINCT d.ID) AS total_devices,
            COUNT(e.ID) AS total_failures,
            COUNT(DISTINCT m.PARENT_COMPANY) AS total_parent_companies,
            COUNT(DISTINCT m.REPRESENTATIVE) AS total_representatives
        FROM MANUFACTURER_CLEANED m
        LEFT JOIN DEVICE_CLEANED d ON m.ID = d.MANUFACTURER_ID
        LEFT JOIN EVENTS_CLEANED e ON d.ID = e.DEVICE_ID
        """
        stats = fetch_snowflake_data(stats_query)[0]

        # 2️⃣ Top Parent Companies
        parent_query = """
        SELECT PARENT_COMPANY AS name, COUNT(ID) AS count
        FROM MANUFACTURER_CLEANED
        GROUP BY PARENT_COMPANY
        ORDER BY count DESC
        LIMIT 5
        """
        parentCompanies = fetch_snowflake_data(parent_query)

        # 3️⃣ Top Representatives
        rep_query = """
        SELECT REPRESENTATIVE AS name, COUNT(ID) AS count
        FROM MANUFACTURER_CLEANED
        GROUP BY REPRESENTATIVE
        ORDER BY count DESC
        LIMIT 5
        """
        representatives = fetch_snowflake_data(rep_query)

        # 4️⃣ Data Freshness (latest 10 days)
        freshness_query = """
        SELECT DATE_UPDATED AS date, COUNT(ID) AS records
        FROM EVENTS_CLEANED
        GROUP BY DATE_UPDATED
        ORDER BY date DESC
        LIMIT 10
        """
        freshness = fetch_snowflake_data(freshness_query)

        # 5️⃣ Major Failures (top 10 devices)
        failures_query = """
        SELECT d.NAME AS device, COUNT(e.ID) AS failures
        FROM DEVICE_CLEANED d
        JOIN EVENTS_CLEANED e ON d.ID = e.DEVICE_ID
        WHERE e.FAILURE_TYPE = 'MAJOR'
        GROUP BY d.NAME
        ORDER BY failures DESC
        LIMIT 10
        """
        failures = fetch_snowflake_data(failures_query)

        # 6️⃣ Manufacturers table (limit 50)
        manufacturers_query = """
        SELECT * FROM MANUFACTURER_CLEANED
        ORDER BY ID
        LIMIT 50
        """
        manufacturers = fetch_snowflake_data(manufacturers_query)

        return jsonify({
            "stats": stats,
            "parentCompanies": parentCompanies,
            "representatives": representatives,
            "freshness": freshness,
            "failures": failures,
            "manufacturers": manufacturers
        })

    except Exception as e:
        print("❌ Dashboard Error:", e)
        return jsonify({"error": str(e)}), 500

# -------------------------------
# Run Flask
# -------------------------------
if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
