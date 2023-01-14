from django.db import models
from django.conf import settings

# Create your models here.
class Data(models.Model):
    class Meta:
        db_table = "data"
    
    data_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    data = models.TextField()
    data_json = models.JSONField(null=True)
    title = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now_add=True)
    overall_status = models.CharField(max_length=255)

class Queue(models.Model):
    class Meta:
        db_table = "queue"

    queue_id = models.AutoField(primary_key=True)
    data = models.ForeignKey(Data, on_delete=models.CASCADE)
    status = models.IntegerField()