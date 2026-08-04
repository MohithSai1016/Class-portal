import cv2
import numpy as np

def blur_score(image):

    gray = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2GRAY
    )

    return cv2.Laplacian(
        gray,
        cv2.CV_64F
    ).var()


def brightness(image):

    hsv = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2HSV
    )

    return np.mean(hsv[:,:,2])


def image_quality(image):

    blur = blur_score(image)

    light = brightness(image)

    return {

        "blur": blur,

        "brightness": light,

        "good_blur": blur > 120,

        "good_light": 70 < light < 220

    }