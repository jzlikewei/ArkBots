from KeySender import KeySender
from utils import number, sleep
import threading
from logger import log


class BackgroundWorker(threading.Thread):

    def __init__(self, stage_key, start_key,empty_key, mission_time, on_accomplish=None):
        threading.Thread.__init__(self)
        self.stage_key = stage_key
        self.start_key = start_key
        self.mission_time = mission_time
        self._stop_event = threading.Event()
        self.keys = KeySender()
        self.callback = on_accomplish
        self.emtpy_key = empty_key

    def run(self):
        self.keys.press(self.stage_key)
        while not self.stopped():
            log.info('start fight')
            self.sleep(number(2, False))
            self.press(self.start_key)  # 点击开始行动
            self.sleep(number(2, False))
            self.press(self.start_key)  # 点击 队伍列表页面 的开始行动
            self.sleep(self.mission_time)
            if self.callback:
                self.callback()
            self.press(self.emtpy_key)  # 点击 空白处 用来跳过结算画面
            self.sleep(number(2, False))
            self.press(self.emtpy_key) # 点击 2 次，跳过可能出现的升级画面
            self.sleep(number(3, False))
            log.info('end fight')

    def sleep(self, total):
        '''
            Sleep with stopped detection.
            Detect is the thread stopped every 2 seconds.

            Args:
                total： total steep time

        '''
        while total > 0:
            if self.stopped():
                return
            times = min(2, total)
            total -= times
            sleep(times)
    
    def press(self,key):
        '''
            press a key with stopped detection.
        '''
        if self.stopped():
            return
        self.keys.press(key)

    def stop(self):
        self._stop_event.set()

    def stopped(self):
        return self._stop_event.is_set()

