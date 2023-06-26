import vt
import os
import hashlib
import json
from dotenv import load_dotenv

load_dotenv()
client = vt.Client(os.environ.get("VT_API_KEY"))

downloaded = [i.rstrip(".json") for i in os.listdir("mitigations/json")]

for f in os.listdir("apks"):
    if f in downloaded:
        continue
    print("Downloading", f)

    fn= "apks/"+f
    
    with open(fn, "rb") as fh:
        hash = hashlib.md5(fh.read()).hexdigest()

        try:
            file = client.get_object(f"/files/{hash}")
            techniques = client.get(f"/files/{hash}/behaviour_mitre_trees").json()
            techniques["md5"] = hash
            meaningful = file.get("meaningful_name")
            if meaningful is None:
                meaningful = f
            
            with open(f"mitigations/json/{meaningful}.json", "w") as f:
                json.dump(techniques, f, indent=2)
                
            os.rename(fn, f"apks/{meaningful}")
        except Exception as e:
            print(e)
            try:
                analysis = client.scan_file(fh)
            except Exception as e:
                print(e)
                continue
            print(analysis.id)

client.close()