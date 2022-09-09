from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
import json
from BackgroundWorker import BackgroundWorker
from DiabloWorker import DiabloWorker
import signal
import sys
from logger import log
import ctypes
import socket
class LocalServer(WebSocket):

    def handleMessage(self):
        global  server
        # echo message back to client
        # self.sendMessage(self.data)
        msg = json.loads(self.data)
        log.info(msg)
        if msg["cmd"]=='quit':
            server.close()
        if msg['cmd']=='background_mode':
            try :
                server.worker = DiabloWorker()
                server.worker.daemon=True
                server.worker.start()
                self.sendJson({"msg":"Done"})
            except RuntimeError as e :
                self.sendJson({"msg":"Error",'err':str(e)})
            except Exception as e2:
                log.error(e2)    

    def sendJson(self,_json):
        self.sendMessage(json.dumps(_json))
    def handleConnected(self):
        print(self.address, 'connected')

    def handleClose(self):
        print(self.address, 'closed')

def closeSigHandler(signal, frame):
    if server.worker:
        server.worker.stop()
    server.close()
    sys.exit()


lock=socket.socket()
def singletonLock():
    try:
        lock.bind(('localhost',4243))
        lock.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1)
        return True
    except Exception as e:
        print(e)
        return False
def releaseSingletonLock():
    try:
        lock.close()
    except Exception as e:
        print(e)

def isAdmin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin()
    except:
        return False

if singletonLock():
    if isAdmin():
        signal.signal(signal.SIGINT, closeSigHandler)
        log.info("start")
        server = SimpleWebSocketServer('localhost', 4242, LocalServer)
        server.serveforever()
    else:
        releaseSingletonLock()
        ctypes.windll.shell32.ShellExecuteW(None, "runas", sys.executable, __file__, None, 1)