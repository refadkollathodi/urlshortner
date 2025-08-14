import random
import string
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ShortUrl
from .serializers import ShortURLSerializer
from django.utils.encoding import iri_to_uri
from django.http import HttpResponseRedirect

ALPHABET = string.ascii_letters + string.digits

def generate_code(length=6):
    while True:
        code = ''.join(random.choices(ALPHABET, k=length))
        if not ShortUrl.objects.filter(shorturl=code).exists():
            return code

class ShortURLCreateView(APIView):
    def post(self, request):
        url = request.data.get('original_url')
        if not url:
            return Response({'error': 'original_url is required'}, status=status.HTTP_400_BAD_REQUEST)
        code = generate_code()
        obj = ShortUrl.objects.create(shorturl=code, original_url=url)
        return Response(ShortURLSerializer(obj).data, status=status.HTTP_201_CREATED)

def redirect_view(request, code):
    obj = get_object_or_404(ShortUrl, shorturl=code)
    target = obj.original_url
    if not target.startswith(('http://', 'https://')):
        target = 'http://' + target
    return HttpResponseRedirect(iri_to_uri(target))
