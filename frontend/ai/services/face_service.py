import os
import shutil

DATASET="dataset"

async def save_student_images(
student_id,
files
):

folder=os.path.join(

DATASET,

student_id

)

os.makedirs(

folder,

exist_ok=True

)

saved=0

existing=len(os.listdir(folder))

for file in files:

filename=os.path.join(

folder,

f"{existing}.jpg"

)

existing+=1

with open(

filename,

"wb"

) as buffer:

shutil.copyfileobj(

file.file,

buffer

)

saved+=1

return saved