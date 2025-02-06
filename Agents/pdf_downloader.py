import requests

pdf_url = "https://files.catbox.moe/pplzea.pdf"
destination_path = r"C:\Users\satyendra singh\Desktop\react files\HackSRM\Agents\constant\generate_assignment.pdf"

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
}

def download_pdf(url, ):
    try:
        response = requests.get(url, headers=headers, stream=True, timeout=10)
        response.raise_for_status()  # Raise error for HTTP errors (e.g., 404, 500)

        with open(destination_path, "wb") as pdf_file:
            for chunk in response.iter_content(1024):
                pdf_file.write(chunk)

        print(f"✅ PDF downloaded successfully to: {destination_path}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Error downloading PDF: {e}")

download_pdf(pdf_url)
