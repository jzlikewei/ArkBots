from random import random

from KeySender import KeySender
from utils import number, sleep
import threading
from logger import log


class DiabloWorker(threading.Thread):

    def __init__(self ):
        threading.Thread.__init__(self)
        self.heal_key = 'Q'
        self.fight_key = 'F'

        self._stop_event = threading.Event()
        self.keys = KeySender()

    def press_multi_times(self,key,times,wait):
        for i in range(1, times):
            self.press(key)
            self.sleep(number(wait, True))
    def run(self):
        self.keys.press(self.stage_key)
        while not self.stopped():
            log.info('start fight')

            self.press_multi_times(self.fight_key,30,0.05)
            self.press_multi_times('W', 5, 0.1)
            self.press_multi_times(self.fight_key, 30, 0.05)
            self.press_multi_times('D', 5, 0.1)
            self.press_multi_times(self.fight_key, 30, 0.05)

            skills=random.shuffle(['1','2','3','4','q'])
            for k in skills:
                self.press(k)
                self.sleep(number(0.5, True))
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

