# -*-coding:utf-8-*-
from flask import Flask, render_template
from main import speechRecorder
from flask import request
import time
from main import baidu_aip

"""
启动web程序
Author: Hang Hang Li
date: 2019/5/5
"""

app = Flask(__name__)

# 首页面
@app.route("/")
def index():
	 return render_template("index.html")

# 开始录音
@app.route("/speech",methods=['GET', 'POST'])
def beginRecorder():
	begin  = time.time()
	speechRecorder.run()
	return "200"

# 结束录音
@app.route("/stopSpeech", methods=["GET", "POST"])
def stopRecorder():
	print("停止录音……")
	speechRecorder.stop()
	end = time.time()
	return "200"

# 开始识别
@app.route("/recognize", methods=['GET', 'POST'])
def recognize():
	#return CASR_model.modelAPI()  # 自训模型
	return baidu_aip.baiduAPI() # baidu语音识别接口


if __name__ == '__main__':
	# 启动多线程参数，加快资源请求，快速响应用户
	app.run(debug = True, host = "0.0.0.0", threaded = True)