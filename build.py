
import os
from shutil import copyfile,rmtree,move

os.chdir('backend')
os.system("pyinstaller --onefile main.py ")

os.chdir('..')
copyfile( 'backend/dist/main.exe', 'front/public/backend.exe')


os.chdir("front")
os.system("npm run react-build")

os.system("npm run elec-package")