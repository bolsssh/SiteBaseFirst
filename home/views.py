from django.shortcuts import render


def GetPerson(request):
    return render(request, 'person.html')


def GetHome(request):
    return render(request, 'refs.html')


def GetMassageBox(request):
    return render(request, 'message.html')


def GetVideo(request):
    return render(request, 'video.html')


def GetHistory(request):
    return render(request, 'personHistory.html')
