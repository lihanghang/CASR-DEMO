#! /usr/bin/env python
# -*-coding:utf-8-*-
from flask import Flask, render_template, request
import time

"""
启动web程序
Author: Hang Hang Li
date: 2019/5/29
"""

app = Flask(__name__)

# 首页面
@app.route("/")
def index():
	return render_template("index.html")

if __name__ == '__main__':
	# 启动多线程参数，加快资源请求，快速响应用户
	app.run(debug = True, host='0.0.0.0', port=8600, threaded = True)
