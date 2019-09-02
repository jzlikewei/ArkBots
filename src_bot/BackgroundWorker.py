from  KeySender import KeySender
from utils import sleep,number
import threading
from logger import log
class BackgroundWorker(threading.Thread):

    def __init__(self,stage_key,start_key,mission_time,on_accomplish=None):
        threading.Thread.__init__(self)
        self.stage_key=stage_key
        self.start_key=start_key
        self.mission_time = mission_time
        self._stop_event = threading.Event()
        self.keys = KeySender()
        self.callback = on_accomplish
        

    def run(self):
        self.keys.press(self.stage_key)
        while not self.stopped():
            log.info('start fight')
            sleep(number(2,False))
            self.keys.press(self.start_key) # 点击开始行动
            sleep(number(2,False))
            self.keys.press(self.start_key) # 点击 队伍列表页面 的开始行动
            sleep(self.mission_time)
            if self.callback:
                self.callback()
            self.keys.press(self.start_key) # 点击开始行动
            sleep(number(3,False))
            log.info('end fight')    


    def stop(self):
        self._stop_event.set()
    def stopped(self):
        return self._stop_event.is_set()
