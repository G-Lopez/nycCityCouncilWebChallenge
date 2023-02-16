from rest_framework import viewsets
from .models import UserProfile, Complaint
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.db.models import Count

def getUserDist(username):
  user = User.objects.get(username=username)
  userProfile = UserProfile.objects.get(full_name=user.first_name + " " + user.last_name)
  return "NYCC" + userProfile.district

class ComplaintViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  def list(self, request):
    district = getUserDist(request.user.username)
    
    return Response(ComplaintSerializer(Complaint.objects.filter(council_dist=district), many=True).data)

class OpenCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  def list(self, request):
    district = getUserDist(request.user.username)
    return Response(Complaint.objects.filter(council_dist=district, closedate__isnull=True).count())

class ClosedCasesViewSet(viewsets.ModelViewSet):
  http_method_names = ['get'] 
  def list(self, request):
    district = getUserDist(request.user.username)
    return Response(Complaint.objects.filter(council_dist=district, closedate__isnull=False).count())

class TopComplaintTypeViewSet(viewsets.ModelViewSet):
  http_method_names = ['get']
  def list(self, request):
    district = getUserDist(request.user.username)
    complaintTypeMap = Complaint.objects.filter(council_dist=district).values('complaint_type').annotate(total=Count('complaint_type')).order_by('-total')
    return Response(complaintTypeMap[0]['complaint_type'])
    #NOTE: Only returning top complaint as this is all we're displaying on the front-end. 
    #To return top three, add the next two elements of complaintTypeMap if they exist 