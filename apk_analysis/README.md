## Set up

1. Clone the repository
2. Create folders `apks`, `json` and `artifacts`.
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


## Uploading APKs
1. Move the APKs to be scanned to the `apks` folder.
2. Run the script to upload the APKs.

```sh
python3 bulk_upload.py
```

## Generating report
1. Run the script to generate the report.

```sh
python3 main.py
```
