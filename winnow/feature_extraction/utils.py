import cv2
import numpy as np


def load_video(video, desired_size, frame_sampling):
    """
          Function that loads a video and converts it to the desired size.

          Args:
            video: path to video
            desired_size: desired shape of each frame

          Returns:
            video_tensor: the tensor of the given video
    cfg['pretrained_model_local_path']
          Raise:
            Exception: if provided video can not be load
    """
    try:
        cap = cv2.VideoCapture(video)
        frames = []
        count = 0
        fps = cap.get(cv2.CAP_PROP_FPS)

        if not fps or fps != fps or fps == np.inf:
            fps = 25
        while cap.isOpened():
            ret, frame = cap.read()
            if isinstance(frame, np.ndarray):
                try:
                    """
                    When frame_sampling = 1 -> We sample one 1
                    frame per second
                    When frame_sampling = 2 -> We sample one
                    frame every 2 * frame_per_second -> 1 frame
                    every 2 seconds
                    """
                    if int(count % round(fps * frame_sampling)) == 0:
                        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                        if desired_size != 0:
                            frame = pad_and_resize(frame, desired_size)
                        frames.append(frame)
                except Exception:
                    pass
            else:
                break
            count += 1
        cap.release()
        video_tensor = np.array(frames)

        return video_tensor
    except Exception as e:
        raise Exception("Can't load video {}\n{}".format(video, e))


def load_image(image, desired_size):
    """
          Function that loads an image and converts it to the desired size.

          Args:
            image: path to image
            desired_size: desired shape of the image

          Returns:
            image_tensor: the tensor of the given image
    cfg['pretrained_model_local_path']
          Raise:
            Exception: if provided image can not be load
    """
    try:
        image_tensor = cv2.imread(image)
        image_tensor = cv2.cvtColor(image_tensor, cv2.COLOR_BGR2RGB)
        if desired_size != 0:
            img = pad_and_resize(image_tensor, desired_size)
        return img
    except Exception as e:
        raise Exception("Can't load image {}\n{}".format(image, e))


def pad_and_resize(image, desired_size):
    """
    Function that converts an image to the desired size.

    Args:
      image: image tensor
      desired_size: desired shape of the image

    Returns:
      image_processed: the processed tensor of the given image
    """
    # reshape based on aspect ratio
    old_size = image.shape[:2]
    ratio = float(desired_size) / max(old_size)
    image_processed = cv2.resize(image, dsize=(0, 0), fx=ratio, fy=ratio, interpolation=cv2.INTER_CUBIC)

    # zero padding to meet the desired dimensions
    new_size = image_processed.shape[:2]
    delta_h = desired_size - new_size[0]
    delta_w = desired_size - new_size[1]
    top, bottom = delta_h // 2, delta_h - (delta_h // 2)
    left, right = delta_w // 2, delta_w - (delta_w // 2)

    image_processed = cv2.copyMakeBorder(
        image_processed, top, bottom, left, right, cv2.BORDER_CONSTANT, value=[0, 0, 0]
    )

    return image_processed
