# -*-coding:utf-8-*-
from flask import Flask, render_template
from main import speechRecorder
from flask import request
import logging

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
@app.route("/speech",methods=['POST'])
def recorder():
	return speechRecorder.my_recorder()


# 开始识别
@app.route("/recognize", methods=['POST'])
def recognize():
	return speechRecorder.recognizeSpeech()


if __name__ == '__main__':
	# 启动多线程参数，加快资源请求，快速响应用户
	app.run(debug = True, host = "0.0.0.0", threaded = True)