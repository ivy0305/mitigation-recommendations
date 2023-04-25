import json
import os

with open("export.json", "r") as f:
    export = json.load(f)

with open("mitigations/mappings.json", "r") as f:
    mappings = json.load(f)

for f in os.listdir("mitigations/json"):
    print("Processing", f)
    with open("mitigations/json/"+f, "r") as f:
        mitigation_json = json.load(f)
        data =mitigation_json .get("data")
        hash = mitigation_json.get("md5")

        if not data:
            for apk in export:
                if apk.get("md5") == hash:
                    apk["mitigations"] = []
            continue

        tactics = data.get("Zenbox android").get("tactics")
        techniques = []
        for tactic in tactics:
            techniques +=tactic.get("techniques")
        
        TIds = [t.get("id") for t in techniques]
        
        mitigations = []
    
        for k,v in mappings.items():
            if any(i in v for i in TIds):
                mitigations.append(k)
        
        for apk in export:
            if apk.get("md5") == hash:
                apk["mitigations"] = mitigations
    
json.dump(export, open("export_mitigation.json", "w"), indent=2)