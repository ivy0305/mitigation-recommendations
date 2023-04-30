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
    
    with open(fn, "rb") as f:
        hash = hashlib.md5(f.read()).hexdigest()

        try:
            file = client.get_object(f"/files/{hash}")
            techniques = client.get(f"/files/{hash}/behaviour_mitre_trees").json()
            techniques["md5"] = hash
            with open(f"mitigations/json/{file.meaningful_name}.json", "w") as f:
                json.dump(techniques, f, indent=2)
        except:
            analysis = client.scan_file(f)

client.close()