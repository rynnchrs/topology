from notifications.models import Notification
from rest_framework import fields, serializers


class GenericNotificationRelatedField(serializers.RelatedField):

    def to_representation(self, value):
        if isinstance(value, Foo):
            serializer = FooSerializer(value)
        if isinstance(value, Bar):
            serializer = BarSerializer(value)

        return serializer.data


class NotificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
        depth = 0
