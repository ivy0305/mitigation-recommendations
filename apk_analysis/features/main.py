import requests
import json
import os
from dotenv import load_dotenv
load_dotenv()

base_url =  os.environ.get("BASE_URL")
headers = {
    "Authorization": os.environ.get("API_KEY")
}

with open("mappings.json", "r") as f:
    mappings = json.load(f)

class SetEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)
        return json.JSONEncoder.default(self, obj)

def create_dir(file_path):
    directory_path = os.path.dirname(file_path)

    if not os.path.exists(directory_path):
        os.makedirs(directory_path)


def download_artifacts(app_name, hash, files):
    for file, v in files.items():
        payload = {
            "hash": hash,
            "file": file,
            "type": "apk"
        }
        res = requests.post(base_url + "/view_source", headers=headers, data=payload).json()
        file_path = f"artifacts/{app_name}/{file}"
        create_dir(file_path)
        with open(file_path, "w") as f:
            f.write(res.get("data"))

def add_snippet(app_name, files):
    out = []
    for file, v in files.items():
        snippet_pkg = {}
        lines = [int(i) for i in v.split(",")]
        snippet_pkg[file] = {}
        with open(f"artifacts/{app_name}/{file}", "r") as f:
            for i, line in enumerate(f):
                if i+1 in lines:
                    snippet_pkg[file][i+1] = line.rstrip("\n")
        out.append(snippet_pkg)
    return out

def get_hashes():
    res = requests.get(base_url + "/scans", headers=headers).json()
    hashes = [i.get("MD5") for i in res.get("content")]
    return hashes

def main():
    export = []
    for hash in get_hashes():
        apk_pkg = {}
        payload = {
            "hash": hash,
        }

        res = requests.post(base_url + "/report_json", headers=headers, data=payload).json()
        app_name = res.get("app_name")
        api_data = res.get("android_api")
        library_data = res.get("libraries")
        permission_data = res.get("permissions")
        apk_pkg["app_name"] = app_name
        apk_pkg["md5"] = hash
        apk_pkg["features"] = set()

        print(f"Processing {app_name}...")
        with open(f"json/{app_name}.json", "w") as f:
            json.dump(res, f, indent=2)
        
        apk_pkg["apis"] = []
        for k, v in api_data.items():
            api_pkg = {}
            api_pkg["name"] = k
            api_pkg["desc"] = v.get("metadata").get("description")
            download_artifacts(app_name, hash, v.get("files"))
            # api_pkg["snippets"] = add_snippet(app_name, v.get("files"))
            apk_pkg["apis"].append(api_pkg)
            
            for feature, apis in mappings.items():
                if k in apis:
                    apk_pkg["features"].add(feature)
            
        if len(library_data) != 0:
            # apk_pkg["libraries"] = library_data
            apk_pkg["features"].add("Third Party Libraries")
        export.append(apk_pkg)
        
        if len(permission_data) != 0:
            apk_pkg["features"].add("Permissions")
            if "android.permission.CAMERA" in permission_data:
                apk_pkg["features"].add("Camera Access")
            
            if "android.permission.RECORD_AUDIO" in permission_data:
                apk_pkg["features"].add("Audio Capture Permissions")
        
    with open("../export.json", "w") as f:
        json.dump(export, f, indent=2, cls=SetEncoder)

if __name__ == "__main__":
    main()