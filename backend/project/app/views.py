from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
import logging
import cv2
import numpy as np
from deepgram import Deepgram

# Initialize Deepgram client
deepgram = Deepgram("5f6dbda3534bd5262e1e5d68ce002edde32e2251")

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Local test mode
LOCAL_TEST_MODE = True

def local_analyze_voice():
    test_audio_path = "test_audio/sample.wav"  # Example local audio file
    with open(test_audio_path, "rb") as audio_file:
        audio_data = audio_file.read()
    
    response = deepgram.transcription.sync_prerecorded({
        "buffer": audio_data, 
        "mimetype": "audio/wav"
    })
    
    transcript = response["results"]["channels"][0]["alternatives"][0].get("transcript", "")
    sentiment = response["results"]["channels"][0]["alternatives"][0].get("sentiment", {})
    
    mood_scores = {"happy": sentiment.get("positive", 0), "angry": sentiment.get("negative", 0)}
    dominant_mood = max(mood_scores, key=mood_scores.get) if max(mood_scores.values()) > 0.5 else "neutral"
    
    return {"emotion": dominant_mood, "transcript": transcript, "confidence": mood_scores}

@csrf_exempt
def analyze_voice(request):
    if LOCAL_TEST_MODE:
        return JsonResponse(local_analyze_voice())
    
    if request.method == "POST":
        audio = request.FILES.get("audio")
        if not audio:
            return JsonResponse({"error": "No audio uploaded"}, status=400)
        
        try:
            audio_data = audio.read()
            response = deepgram.transcription.sync_prerecorded({
                "buffer": audio_data, 
                "mimetype": "audio/wav"
            })
            
            transcript = response["results"]["channels"][0]["alternatives"][0].get("transcript", "")
            sentiment = response["results"]["channels"][0]["alternatives"][0].get("sentiment", {})
            
            mood_scores = {"happy": sentiment.get("positive", 0), "angry": sentiment.get("negative", 0)}
            dominant_mood = max(mood_scores, key=mood_scores.get) if max(mood_scores.values()) > 0.5 else "neutral"
            
            return JsonResponse({"emotion": dominant_mood, "transcript": transcript, "confidence": mood_scores})
        
        except Exception as e:
            logger.error(f"Error processing audio: {e}")
            return JsonResponse({"error": "Internal Server Error"}, status=500)
    
    return JsonResponse({"error": "GET method not allowed"}, status=405)

def analyze_emotion_from_camera():
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        return {"error": "Camera not accessible"}
    
    ret, frame = cap.read()
    cap.release()
    
    if not ret:
        return {"error": "Failed to capture image"}
    
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    mood_scores = {"happy": 0, "sad": 0, "angry": 0, "neutral": 1}  # Placeholder logic
    dominant_mood = max(mood_scores, key=mood_scores.get)
    
    return {"emotion": dominant_mood, "message": "Emotion detected from camera"}

@csrf_exempt
def analyze_emotion(request):
    if request.method == "GET":
        return JsonResponse(analyze_emotion_from_camera())
    
    return JsonResponse({"error": "Only GET method allowed for camera emotion analysis"}, status=405)
