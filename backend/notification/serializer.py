from notifications.models import Notification
from rest_framework import fields, serializers


class NotificationsSerializer(serializers.ModelSerializer):
    recipient = serializers.ReadOnlyField(source='recipient.user_info.full_name')
    class Meta:
        model = Notification
        fields = ['id','unread','verb','target_object_id','recipient','description','timestamp']
