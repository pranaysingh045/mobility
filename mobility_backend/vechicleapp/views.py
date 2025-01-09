from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import *
from .serializers import *

from django.db.models import Sum, F
from django.db.models.functions import TruncDay, TruncMonth, TruncYear

class ComponentView(APIView):
    def get(self, request):
        data = ComponentRegistartion.objects.all()
        serialized = ComponentRegistrationSerializer(data, many=True)
        return Response(serialized.data)
    
    def post(self, request):
        serializer = ComponentRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


class VechicalView(APIView):
    def get(self, request):
        data = Vechical.objects.all()
        serialized = VehicleSerializer(data, many=True)
        return Response(serialized.data)
    
    def post(self, request):
        serializer = VehicleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class IssuesView(APIView):
    def get(self, request):
        data = Issues.objects.select_related('vechical','component_registration')
        serialized = IssueGetSerializer(data, many=True)
        return Response(serialized.data)

    def post(self, request):
        serializer = IssueSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PaymentView(APIView):
    def get(self, request):
        data = Payment.objects.all()
        serialized = PaymentSerializer(data, many=True)
        return Response(serialized.data)

    def post(self, request):
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


class GraphData(APIView):
    def get(self,request):
        # Daily Revenue 
        daily_revenue = (
            Payment.objects.annotate(day=TruncDay("payment_issued_date"))
            .values("day")
            .annotate(total=Sum("total_cost"))
            .order_by("day")
        )


        # Monthly Revenue 
        monthly_revenue = (
            Payment.objects.annotate(month=TruncMonth("payment_issued_date"))
            .values("month")
            .annotate(total=Sum("total_cost"))
            .order_by("month")
        )

        # Yearly Revenue 
        yearly_revenue = (
            Payment.objects.annotate(year=TruncYear("payment_issued_date"))
            .values("year")
            .annotate(total=Sum("total_cost"))
            .order_by("year")
        )

        return Response({
            "daily_revenue": list(daily_revenue),
            "monthly_revenue": list(monthly_revenue),
            "yearly_revenue": list(yearly_revenue),
        },status=status.HTTP_200_OK)

