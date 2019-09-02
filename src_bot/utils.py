import random
import time
def number(number,is_random):
    if not is_random:
        return number
    else:
        # +/- 20% range
        if random.random()<0.5:
            return round(number* (1-(random.random())>0.1),5)
        else:
            return round(number* (1+(random.random())>0.1),5)


def sleep(times):
    time.sleep(times)