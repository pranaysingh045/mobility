from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import ComponentRegistartion, Vechical  # Adjust based on your app structure
import datetime

class ComponentRegistrationTest(APITestCase):
    def setUp(self):
        self.valid_payload = {
            "componentName": "Brakes",
            "description": "Vehicle braking system",
            "price":128,
            "repair_cost":32,
            "component_add_date":"2024-12-19"
        }
        self.invalid_payload = {
            "componentName": "",  
            "description": "Incomplete details",
            "price":134,
            "repair_cost":32,
            "component_add_date":''
        }
        self.vehicle = ComponentRegistartion.objects.create(componentName='Test Vehicle', price=12.6,repair_cost=1,component_add_date=datetime.date.today())

    def test_component_list(self):
        response = self.client.get(reverse('component-registration'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
    def test_component_item_details(self):
        response=self.client.get(reverse('component-registration'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['componentName'], 'Test Vehicle')
    def test_component_item_create_valid(self):
        response=self.client.post(reverse('component-registration'),self.valid_payload,format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["componentName"], self.valid_payload["componentName"])
    def test_component_item_create_Invalid(self):
        response=self.client.post(reverse('component-registration'),self.invalid_payload,format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("componentName", response.data) 


class VechicalRegistrationsTestCase(APITestCase):
    def setUp(self):
        self.valid_payload={"vehicle_name":"Audi","vehicle_owner":"Rohan","issue_details":"speed","repair_estimated_time":"2025-20-02"}
        self.invalid_payload={"vehicle_name":"","vehicle_owner":"","issue_details":"speed","repair_estimated_time":"2025-20-02"}
        self.vichel=Vechical.objects.create(vehicle_name='Royl-Enfield',vehicle_owner='aman',issue_details='oil leak',repair_estimated_time='2025-10-02')

    def test_vechile_details(self):
        response=self.client.get(reverse('vechical-registration'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['vehicle_name'], 'Royl-Enfield')
    def test_vichele_list(self):
        response=self.client.get(reverse('vechical-registration'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['vehicle_name'],'Royl-Enfield')
    def test_vichele_create(self):
        response=self.client.post(reverse('vechical-registration'),self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["vehicle_name"], self.valid_payload["vehicle_name"])

    def test_vichele_invalid(self):
        response=self.client.post(reverse('vechical-registration'))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("vehicle_name", response.data) 


