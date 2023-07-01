import base64, requests, cv2, numpy as np

def edit(url):
    req = requests.get(base64.b64decode(url.encode()).decode()).content
    img = cv2.imdecode(np.array(bytearray(req), dtype=np.uint8), -1)
    cv2.imwrite('save.jpg', img)