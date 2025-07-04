import requests

EXTERNAL_BASE_URL = "https://zadatak.konovo.rs"
LOGIN_CREDENTIALS = {"username": "zadatak", "password": "zadatak"}

def get_jwt_token():
    response = requests.post(f"{EXTERNAL_BASE_URL}/login", json=LOGIN_CREDENTIALS)
    response.raise_for_status()
    return response.json().get("token")

def get_products(token):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{EXTERNAL_BASE_URL}/products", headers=headers)
    response.raise_for_status()
    return response.json()