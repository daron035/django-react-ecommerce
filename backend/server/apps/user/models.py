from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField(blank=True, unique=True)
    image = models.ImageField(upload_to="user/", blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.username

    def time_add(self):
        return self.date_joined.strftime("%b-%d-%Y, %H:%M")
