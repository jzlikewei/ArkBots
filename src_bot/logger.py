import logging
import logging.handlers
import os

logFormatter = logging.Formatter(
    "%(asctime)s [%(threadName)s-%(thread)-12.12s]" +
    " [%(filename)-12.12s:%(lineno)-4d] [%(levelname)-5.5s] %(message)s")
log = logging.getLogger()
log.setLevel(logging.INFO)
# log.setLevel(logging.DEBUG)

MAX_SIZE = 1024 * 1024
fileHandler = logging.handlers.RotatingFileHandler(
   'backgroud.log', maxBytes=MAX_SIZE)

fileHandler.setFormatter(logFormatter)
log.addHandler(fileHandler)

consoleHandler = logging.StreamHandler()
consoleHandler.setFormatter(logFormatter)
log.addHandler(consoleHandler)
