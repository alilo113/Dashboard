from django.urls import path
from . import views

urlpatterns = [
    path('candlestick-data/', views.candlestick_data, name='candlestick_data'),
    path('linechart-data/', views.linechart_data, name='linechart_data'),
    path('barchart-data/', views.barchart_data, name='barchart_data'),
    path('piechart-data/', views.piechart_data, name='piechart_data'),
]