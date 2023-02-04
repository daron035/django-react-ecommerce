from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APITestCase, RequestsClient
from rest_framework import status
from rest_framework.authtoken.models import Token


class RegistrationTestCase(TestCase):
    def test_registration(self):
        content_type = "application/json"
        data = {
            "username": "root",
            "email": "root@mail.ru",
            "password": "skaldjfalksdjfaksldfjaksldj3232",
            "re_password": "skaldjfalksdjfaksldfjaksldj3232",
        }
        response = self.client.post("/api/auth/users/", data, content_type=content_type)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)