# APK Analysis

## Set up

1. Clone the repository
2. Create folders `apks`, `features/json` and `mitigations/json`.
3. Run the below commands

```sh
docker pull opensecurity/mobile-security-framework-mobsf:latest
docker run -it --rm -p 8000:8000 opensecurity/mobile-security-framework-mobsf:latest
```

4. Install the requirements

```sh
pip install -r requirements.txt
```

5. Rename the `.env.example` file to `.env` and adjust the values inside it as required. The API key can be obtained from the MobSF web interface. On the Docker version, it is located at [http://localhost:8000](http://localhost:8000).

6. Create an account on [VirusTotal](https://www.virustotal.com/) and obtain the API key. Add the API key to the `.env` file.

## MobSF

### Uploading APKs

1. Move the APKs to be scanned to the `apks` folder.
2. Run `python features/bulk_upload.py` to upload the APKs.

### Generating report

1. Run `python features/main.py` to generate the report. This outputs to `export.json`.

## VirusTotal

### Uploading APKs

1. Move the APKs to be scanned to the `apks` folder.
2. Run `python mitigations/bulk_upload.py` to upload the APKs to VirusTotal. The results will be stored in the `mitigations/json` folder.

### Generating report

1. Run `python mitigations/main.py` to generate the report. This uses the data from `export.json` and outputs to `export_mitigations.json`.
