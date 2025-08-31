import shutil
import os

def copy_data_files():
    """Copy generated JSON files to public folder for React app access"""
    
    try:
        # Create public folder if it doesn't exist
        if not os.path.exists('public'):
            os.makedirs('public')
        
        # Copy manufacturer rankings
        if os.path.exists('src/manufacturer_rankings.json'):
            shutil.copy('src/manufacturer_rankings.json', 'public/manufacturer_rankings.json')
            print("✓ Copied manufacturer_rankings.json to public folder")
        else:
            print("✗ manufacturer_rankings.json not found")
        
        # Copy dashboard data
        if os.path.exists('src/dashboard_data.json'):
            shutil.copy('src/dashboard_data.json', 'public/dashboard_data.json')
            print("✓ Copied dashboard_data.json to public folder")
        else:
            print("✗ dashboard_data.json not found")
            
        print("\nData files are now accessible at:")
        print("- /manufacturer_rankings.json")
        print("- /dashboard_data.json")
        
    except Exception as e:
        print(f"Error copying files: {str(e)}")

if __name__ == "__main__":
    copy_data_files()
