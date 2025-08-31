import pandas as pd
import json
from collections import defaultdict

def process_manufacturer_data():
    """
    Process events and devices CSV files to generate manufacturer rankings
    based on action classification priority (Class I > Class II > Class III)
    """
    
    try:
        # Read the CSV files with different encoding options
        print("Reading events CSV...")
        try:
            events_df = pd.read_csv('src/events_cleaned.csv', encoding='utf-8')
        except UnicodeDecodeError:
            try:
                events_df = pd.read_csv('src/events_cleaned.csv', encoding='latin-1')
            except:
                events_df = pd.read_csv('src/events_cleaned.csv', encoding='cp1252')
        
        print("Reading devices CSV...")
        try:
            devices_df = pd.read_csv('src/device_cleaned.csv', encoding='utf-8')
        except UnicodeDecodeError:
            try:
                devices_df = pd.read_csv('src/device_cleaned.csv', encoding='latin-1')
            except:
                devices_df = pd.read_csv('src/device_cleaned.csv', encoding='cp1252')
        
        print(f"Events data shape: {events_df.shape}")
        print(f"Devices data shape: {devices_df.shape}")
        
        # Clean and prepare the data
        print("Cleaning data...")
        
        # Filter out rows where manufacturer_id is not null
        events_df = events_df.dropna(subset=['manufacturer_id'])
        events_df['manufacturer_id'] = events_df['manufacturer_id'].astype(int)
        
        # Get unique manufacturer IDs from devices (first column)
        device_manufacturers = set()
        for idx, row in devices_df.iterrows():
            try:
                if pd.notna(row.iloc[0]) and str(row.iloc[0]).isdigit():
                    device_manufacturers.add(int(row.iloc[0]))
            except:
                continue
        
        print(f"Found {len(device_manufacturers)} unique manufacturer IDs in devices")
        
        # Count events by manufacturer and classification
        manufacturer_stats = defaultdict(lambda: {
            'Class_I': 0,
            'Class_II': 0, 
            'Class_III': 0,
            'total_events': 0,
            'manufacturer_id': 0
        })
        
        print("Processing events data...")
        for _, row in events_df.iterrows():
            try:
                manufacturer_id = int(row['manufacturer_id'])
                
                if manufacturer_id in device_manufacturers:
                    manufacturer_stats[manufacturer_id]['manufacturer_id'] = manufacturer_id
                    manufacturer_stats[manufacturer_id]['total_events'] += 1
                    
                    # Count by classification
                    if row['action_classification_Class I'] == True:
                        manufacturer_stats[manufacturer_id]['Class_I'] += 1
                    if row['action_classification_Class II'] == True:
                        manufacturer_stats[manufacturer_id]['Class_II'] += 1
                    if row['action_classification_Class III'] == True:
                        manufacturer_stats[manufacturer_id]['Class_III'] += 1
            except Exception as e:
                print(f"Error processing row: {e}")
                continue
        
        # Convert to list and sort
        manufacturers_list = list(manufacturer_stats.values())
        
        print(f"Processed {len(manufacturers_list)} manufacturers")
        
        # Sort by worst manufacturers (Class I > Class II > Class III, descending)
        worst_manufacturers = sorted(
            manufacturers_list,
            key=lambda x: (x['Class_I'], x['Class_II'], x['Class_III']),
            reverse=True
        )
        
        # Sort by best manufacturers (Class III > Class II > Class I, descending)
        best_manufacturers = sorted(
            manufacturers_list,
            key=lambda x: (x['Class_III'], x['Class_II'], x['Class_I']),
            reverse=True
        )
        
        # Create the final JSON structure
        result = {
            "metadata": {
                "description": "Manufacturer rankings based on action classification priority",
                "priority_order": "Class I > Class II > Class III (Class I is most severe)",
                "total_manufacturers": len(manufacturers_list),
                "data_source": "Events and Devices CSV files merged on manufacturer_id"
            },
            "worst_manufacturers": {
                "description": "Manufacturers with highest Class I incidents (most severe)",
                "ranking_criteria": "Sorted by Class I → Class II → Class III (descending)",
                "manufacturers": worst_manufacturers
            },
            "best_manufacturers": {
                "description": "Manufacturers with highest Class III incidents (least severe)",
                "ranking_criteria": "Sorted by Class III → Class II → Class I (descending)",
                "manufacturers": best_manufacturers
            },
            "all_manufacturers": {
                "description": "Complete list of all manufacturers with their incident counts",
                "manufacturers": manufacturers_list
            }
        }
        
        # Save the complete JSON file
        with open('src/manufacturer_rankings.json', 'w') as f:
            json.dump(result, f, indent=2)
        
        print(f"Generated manufacturer_rankings.json with {len(manufacturers_list)} manufacturers")
        
        # Also save a simplified version for the dashboard
        dashboard_data = {
            "worst_manufacturers": worst_manufacturers[:20],  # Top 20 worst
            "best_manufacturers": best_manufacturers[:20],    # Top 20 best
            "summary_stats": {
                "total_manufacturers": len(manufacturers_list),
                "total_events": sum(m['total_events'] for m in manufacturers_list),
                "total_class_i": sum(m['Class_I'] for m in manufacturers_list),
                "total_class_ii": sum(m['Class_II'] for m in manufacturers_list),
                "total_class_iii": sum(m['Class_III'] for m in manufacturers_list)
            }
        }
        
        with open('src/dashboard_data.json', 'w') as f:
            json.dump(dashboard_data, f, indent=2)
        
        print("Generated dashboard_data.json for the React dashboard")
        
        return result
        
    except Exception as e:
        print(f"Error processing data: {str(e)}")
        import traceback
        traceback.print_exc()
        return None

if __name__ == "__main__":
    process_manufacturer_data()
