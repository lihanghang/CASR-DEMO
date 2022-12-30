#! /usr/bin/env python
# -*-coding:utf-8-*-
from flask import Flask, render_template
from flask import request
import time

from SR import register, speakerrecog # 声纹识别库

"""
启动web程序
Author: Hang Hang Li
date: 2019/6/17
"""

app = Flask(__name__)

# 首页面
@app.route("/")
def index():
	return render_template("index.html")

# 声纹注册
@app.route("/speech",methods=['GET', 'POST'])
def beginRecorder():
	# printName = request.form["printNames"]
	printName = request.form.get('printNames')
	begin  = time.time()
	register.train_model(printName)
	# speechRecorder.run()
	return "200"

# 结束录音
@app.route("/stopSpeech", methods=["GET", "POST"])
def stopRecorder():
	print("停止录音……")
	speechRecorder.stop()
	end = time.time()
	return "200"

# 说话人识别
@app.route("/recognize", methods=['GET', 'POST'])
def recognize():
	return speakerrecog.speakerRecog()
	#return CASR_model.modelAPI()  # 自训模型
	# return baidu_aip.baiduAPI() # baidu语音识别接口


if __name__ == '__main__':
	# 启动多线程参数，加快资源请求，快速响应用户
	app.run(debug = True, host='192.168.2.108', port=8600, threaded = True)
