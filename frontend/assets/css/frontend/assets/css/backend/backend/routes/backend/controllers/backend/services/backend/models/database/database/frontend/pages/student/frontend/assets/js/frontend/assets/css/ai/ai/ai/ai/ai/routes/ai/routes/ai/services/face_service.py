import cv2
import face_recognition

def initialize():
    return {
        "opencv": cv2.__version__,
        "face_recognition": "loaded"
    }
    