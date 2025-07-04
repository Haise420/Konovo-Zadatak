from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponseNotFound
from .external_api import get_jwt_token, get_products
import requests
import re

@api_view(["POST"])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    try:
        res = requests.post(
            "https://zadatak.konovo.rs/login",
            json={"username": username, "password": password}
        )

        if res.status_code == 200:
            return Response(res.json())
        else:
            return Response({"detail": "Neuspešna prijava"}, status=401)

    except Exception as e:
        return Response({"error": str(e)}, status=500)

def transform_product(product):
    if product.get("category") == "Monitori":
        product["price"] = round(float(product["price"]) * 1.1, 2)

    if "description" in product and isinstance(product["description"], str):
        pattern = re.compile(r"brzina", re.IGNORECASE)
        product["description"] = pattern.sub("performanse", product["description"])
    
    return product

@api_view(["GET"])
def product_list(request):
    token = request.headers.get("Authorization")
    if not token or not token.startswith("Bearer "):
        return Response({"detail": "Token nije prosleđen."}, status=401)

    token = token.split(" ")[1]

    try:
        products = get_products(token)

        transformed = [transform_product(p) for p in products]
        
        for p in transformed:
            if p.get("categoryName") == "Monitori" and p.get("price"):
                try:
                    p["price"] = round(p["price"] * 1.10, 2)
                except Exception:
                    pass

        category = request.GET.get("category")
        search = request.GET.get("search")

        if category:
            transformed = [
                p for p in transformed
                if p.get("categoryName") and p.get("categoryName").lower() == category.lower()
            ]

        if search:
            search_lower = search.lower()
            transformed = [p for p in transformed if search_lower in p.get("naziv", "").lower()]

        return Response(transformed)

    except Exception as e:
        return Response({"error": str(e)}, status=500)

    
@api_view(["GET"])
def product_detail(request, product_id):
    token = request.headers.get("Authorization")
    if not token or not token.startswith("Bearer "):
        return Response({"detail": "Token nije prosleđen."}, status=401)

    token = token.split(" ")[1]

    try:
        products = get_products(token)
        product = next((p for p in products if str(p.get("sif_product")) == str(product_id)), None)

        if not product:
            return Response({"detail": "Proizvod nije pronađen."}, status=404)

        transformed = transform_product(product)

        if transformed.get("categoryName") == "Monitori" and transformed.get("price"):
            try:
                transformed["price"] = round(transformed["price"] * 1.10, 2)
            except Exception:
                pass  

        return Response(transformed)

    except Exception as e:
        return Response({"error": str(e)}, status=500)
