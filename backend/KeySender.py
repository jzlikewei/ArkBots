from utils import number
import platform
import random
import time
if platform.system()=='Windows':
    import win32gui
    import win32con
    import win32api
from logger import log
class KeySender():
    def __init__(self,random_delay=True,sleep_func=time.sleep):
        if platform.system()!='Windows':
            raise  RuntimeError("only support Windows")

        self.handle=0
        self.random_delay=random_delay
        self.sleep_func=sleep_func
        hwnd = win32gui.FindWindow('Qt5QWindowIcon','暗黑破坏神')
        self.handle = win32gui.FindWindowEx( hwnd, 0,None,  "NemuPlayer" )
        log.info('handle = {0}'.format(self.handle))
        if self.handle==0:
            raise  RuntimeError("window not found")

    def press(self,key,press_time=0.05,):
        log.info("Press Key :"+key)
        win32api.PostMessage( self.handle,win32con.WM_KEYDOWN, KeyMap[key], 0)
        self.sleep_func(number(press_time,self.random_delay))
        win32api.PostMessage( self.handle,win32con.WM_KEYUP, KeyMap[key], 0)



KeyMap={  #see http://msdn.microsoft.com/en-us/library/windows/desktop/dd375731%28v=vs.85%29.aspx
    '0':0x30,
    '1':0x31,
    '2':0x32,
    '3':0x33,
    '4':0x34,
    '5':0x35,
    '6':0x36,
    '7':0x37,
    '8':0x38,
    '9':0x39,
    'A':0x41,
    'B':0x42,
    'C':0x43,
    'D':0x44,
    'E':0x45,
    'F':0x46,
    'G':0x47,
    'H':0x48,
    'I':0x49,
    'J':0x4A,
    'K':0x4B,
    'L':0x4C,
    'M':0x4D,
    'N':0x4E,
    'O':0x4F,
    'P':0x50,
    'Q':0x51,
    'R':0x52,
    'S':0x53,
    'T':0x54,
    'U':0x55,
    'V':0x56,
    'W':0x57,
    'X':0x58,
    'Y':0x59,
    'Z':0x5A,
}
