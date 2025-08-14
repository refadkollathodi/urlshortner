from django.db import models

class ShortUrl(models.Model):
    shorturl=models.CharField(max_length=12,unique=True)
    original_url=models.URLField()