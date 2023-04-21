import json

# Read export.json
with open("export.json", "r") as file:
    export_data = json.load(file)
print("Loaded export.json")

# Read mappings.json
with open("mappings.json", "r") as file:
    mappings = json.load(file)
print("Loaded mappings.json")

# Process export_data and mappings
app_features = []
for app in export_data:
    app_name = app["app_name"]
    apis = [api["name"] for api in app["apis"]]
    
    # Match keywords to determine the included features
    features = []
    for feature, api_list in mappings.items():
        for api in api_list:
            if api in apis:
                features.append(feature)
                break
    
    # Add app_name and its features
    app_features.append({"app_name": app_name, "features": features})
print("Processed app features:", app_features)

# Save results to a new JSON file
with open("app_features.json", "w") as file:
    json.dump(app_features, file, indent=2)
print("Saved app features to new json")