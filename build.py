
import os
from shutil import copyfile,rmtree,move

print("build react app html files")
os.chdir("src_html")
os.system("npm run build")

os.chdir("..")


print("backup src/index.js")
copyfile( 'src/index.js', 'index_bak.js')

print("update static files in  src/")
# delete old file
files = os.listdir("src")
for f in files:
    if f != 'index.js':
        if os.path.isfile('src/'+f):
            os.remove('src/'+f)
        else:
            rmtree('src/'+f)
# move new file
files = os.listdir("src_html/build/")
for f in files:
        move("src_html/build/"+f, "src/")




# move("index_bak.js","src/index.js")

with open("src/AUTO_GENERATE","w") as f:
  f.write("AUTO_GENERATE")
