# from django.test import TestCase

# # Create your tests here.

# from rest_framework.test import APITestCase, APIClient
# from rest_framework import status
# from .models import ComponentRegistartion
# from .serializers import ComponentRegistrationSerializer

# class TestComponentView(APITestCase):
#     def setUp(self):
#         """
#         Set up test data for the test cases.
#         """
#         self.client = APIClient()
#         self.component_data = {
#             "componentName": "Engine",
#             "description": "A crucial vehicle component",
#             "price":123,
#             "repair_cost":321,
#             "component_add_date":2024-12-19
#         }
#         self.component = ComponentRegistartion.objects.create(**self.component_data)
#         self.valid_payload = {
#             "componentName": "Brakes",
#             "description": "Vehicle braking system",
#             "price":123,
#             "repair_cost":321,
#             "component_add_date":"2024-12-19"
#         }
#         self.invalid_payload = {
#             "componentName": "",  # Missing required field
#             "description": "Incomplete data",
#             "price":123,
#             "repair_cost":321,
#             "component_add_date":''
#         }

#     def test_get_components(self):
#         """
#         Test retrieving a list of components.
#         """
#         response = self.client.get("/components/")
#         components = ComponentRegistartion.objects.all()
#         serializer = ComponentRegistrationSerializer(components, many=True)

#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data, serializer.data)

#     def test_create_component_valid(self):
#         """
#         Test creating a component with valid payload.
#         """
#         response = self.client.post("/components/", data=self.valid_payload, format="json")
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(response.data["componentName"], self.valid_payload["componentName"])

#     def test_create_component_invalid(self):
#         """
#         Test creating a component with invalid payload.
#         """
#         response = self.client.post("/components/", data=self.invalid_payload, format="json")
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
#         self.assertIn("componentName", response.data)  # Check error key in response

    

