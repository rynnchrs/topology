
def upload_path(instance, filename):
    if instance.mode == 'cu':
        ext = filename.split('.')[-1]
        filename = '{}.{}'.format(instance.image_name, ext)
        return '/'.join(['Careta-Users/',filename])
    elif instance.mode == 'ci':
        ext = filename.split('.')[-1]
        path = str(instance.image_name)
        filename = '{}.{}'.format(instance.image_id, ext)
        return '/'.join(['Car-Inventory/',path,filename])
    elif instance.mode == 'dr':
        ext = filename.split('.')[-1]
        path = str(instance.image_name)
        filename = '{}.{}'.format(instance.image_id, ext)
        return '/'.join(['Driver-Reports/',path,filename])
    elif instance.mode == 'cr':
        ext = filename.split('.')[-1]
        path = str(instance.image_name)
        filename = '{}.{}'.format(instance.image_id, ext)
        return '/'.join(['Careta-Reports/',path,filename])
