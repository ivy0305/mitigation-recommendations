import subprocess
import json
import os
from dotenv import load_dotenv
load_dotenv()

base_url =  os.environ.get("BASE_URL")
api_key = os.environ.get("API_KEY")

def scan(file_name, hash, scan_type="apk"):
    print("Scanning " + file_name)
    template = 'curl -X POST --url {url} --data "scan_type={scan_type}&file_name={apk_filename}&hash={hash}" -H "Authorization:{api_key}"'
    curl_scan = template.format(
        url=f'{base_url}/scan',
        scan_type=scan_type,
        apk_filename=file_name,
        hash=hash,
        api_key=api_key,
    )
    subprocess.getoutput(curl_scan)

for f in os.listdir("../apks"):
    print("Uploading " + f)
    fn= "apks/"+f
    if not fn.endswith(".apk"):
        continue
    template = 'curl --silent -F "file=@{apk}" {url} -H "Authorization:{api_key}"'
    curl_scan = template.format(
        url=f'{base_url}/upload',
        apk=fn,
        api_key=api_key,
    )
    output = subprocess.getoutput(curl_scan)
    res = json.loads(output)
    print(res)
    if scan(res.get("file_name"), res.get("hash")):
        print("Error scanning " + f)