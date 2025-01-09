from rest_framework import serializers
from .models import ComponentRegistartion, Vechical, Issues,Payment

class ComponentRegistrationSerializer(serializers.ModelSerializer):
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    repair_cost = serializers.DecimalField(max_digits=6, decimal_places=3)

    class Meta:
        model=ComponentRegistartion
        fields ='__all__'
    def validate_repair_cost(self, value):
        if value is None or value < 0:
            raise serializers.ValidationError("Repair cost must be a valid positive decimal.")
        return value

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vechical
        fields = '__all__'

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issues
        fields = '__all__'

class IssueGetSerializer(serializers.ModelSerializer):
    vechical_name=serializers.CharField(source='vechical.vehicle_name',read_only=True)
    component_name=serializers.CharField(source='component_registration.componentName',read_only=True)
    class Meta:
        model = Issues
        fields = ['component_name','id','labour_cost','created_on','description','labour_name','component_registration','vechical','vechical_name']
        

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'