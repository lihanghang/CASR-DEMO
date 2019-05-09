# -*-coding:utf-8 -*-

from aip import AipSpeech

'''
调用百度语音识别API实现
Author: Hang Hang Li
date: 2019/5/6
'''

def baiduAPI():
	""" 你的 APPID AK SK """
	APP_ID = 'XXX'
	API_KEY = 'XXX'
	SECRET_KEY = 'XXX'

	client = AipSpeech(APP_ID, API_KEY, SECRET_KEY)

	# 读取文件
	filePath = "latestSpeech/output.wav"
	def get_file_content(filePath):
		with open(filePath, 'rb') as fp:
			return fp.read()

	# 识别本地文件
	result_str = client.asr(get_file_content(filePath), 'wav', 16000, {
	    'dev_pid': 1536,
	})
	print(result_str)
	code = result_str["err_no"]
	if code == 3301:
           return "音频质量过差,请重新录制清晰的音频！"
	elif code == 0:
	   text = result_str["result"][0]
	   print("文本：" + text)
	   return text
	else:
		return "无法识别，请重新录音！"
