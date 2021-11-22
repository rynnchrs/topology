from django.db.models import fields
from .models import Image
from rest_framework import serializers


class ImageInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id','image','mode','image_name']
        extra_kwargs = {
            'mode': {'write_only': True},
            'image_name': {'write_only': True}
        }


class ReportImageSerializer(serializers.ModelSerializer):
    images = ImageInfoSerializer(many=True, required=False)

    class Meta:
        model = Image
        fields = ['images']

    def create(self, validated_data):
        try:
            image_data = validated_data.pop('images')
            count = Image.objects.filter(image_name=image_data[0]['image_name'], mode=image_data[0]['mode']).count()
            for image in image_data:
                count += 1
                Image.objects.create(image_id=count, **image)
        except:
            pass
        return ()
            
    # def to_representation(self, instance):
    #     self.fields['images'] = ImageInfoSerializer(read_only=True)
    #     return super(ReportImageSerializer, self).to_representation(instance)