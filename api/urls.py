from django.urls import path
from . import views


urlpatterns = [
    path('login/', views.login_view, name="login"),
    path('products/', views.product_list, name="products"),
    path('products/<int:product_id>/', views.product_detail, name="product_detail"),
]