from django.db import models

# Create your models here.
class ComponentRegistartion(models.Model):
    componentName=models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    repair_cost = models.DecimalField(max_digits=6, decimal_places=3, null=True, blank=True)
    component_add_date=models.DateField()
    component_update_date=models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.componentName
        
    
class Vechical(models.Model):
    vehicle_name=models.CharField(max_length=255)
    vehicle_owner=models.CharField(max_length=255)
    issue_details=models.TextField()
    repair_estimated_time=models.DateField()

    def __str__(self):
        return self.vehicle_name

class Issues(models.Model):
    component_registration=models.ForeignKey(ComponentRegistartion, on_delete=models.CASCADE)
    vechical=models.ForeignKey(Vechical, on_delete=models.CASCADE)
    labour_cost=models.FloatField()
    created_on=models.DateField()
    description=models.TextField()
    labour_name=models.CharField(max_length=255)

    def __str__(self):
        return self.labour_name

class Payment(models.Model):
    vechical=models.ForeignKey(Vechical, on_delete=models.CASCADE)
    payment_method=models.CharField(max_length=255)
    total_cost = models.FloatField()
    payment_issued_date=models.DateField()

    def __str__(self):
        return self.payment_method