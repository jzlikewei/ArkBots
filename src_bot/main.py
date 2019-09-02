from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket
import json
from BackgroundWorker import BackgroundWorker
import signal
import sys
from logger import log
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
                server.worker = BackgroundWorker(msg['stage_key'].upper(),msg['start_key'].upper(),msg['mission_time'])
                server.worker.daemon=True
                server.worker.start()
                self.sendJson({"msg":"Done"})
            except RuntimeError as e :
                self.sendJson({"msg":"Error",'err':str(e)})

    def sendJson(self,_json):
        self.sendMessage(json.dumps(_json))
    def handleConnected(self):
        print(self.address, 'connected')

    def handleClose(self):
        print(self.address, 'closed')

def close_sig_handler(signal, frame):
    server.worker.stop()
    server.close()
    sys.exit()

signal.signal(signal.SIGINT, close_sig_handler)
server = SimpleWebSocketServer('localhost', 4242, LocalServer)
server.serveforever()
