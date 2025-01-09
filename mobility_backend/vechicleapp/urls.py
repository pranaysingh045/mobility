from django.urls import path
from . import views

urlpatterns = [
    path('components', views.ComponentView.as_view()),
    path('vechical', views.VechicalView.as_view()),
    path('issues', views.IssuesView.as_view()),
    path('payment', views.PaymentView.as_view()),
    path('dashoard',views.GraphData.as_view()),
]