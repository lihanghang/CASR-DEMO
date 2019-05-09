# -*-coding:utf-8 -*-
import wave
from pyaudio import PyAudio, paInt16
from main import CASR_model
import json
from datetime import datetime
from main import baidu_aip
import  socket

'''
File: ./speechRecorder
Author: HangHang Li
Date: 2019/04/28
Description: 基于pyaudio实现实时录音函数
Abouts: install pyaudio: 1、sudo apt-get install portaudio19-dev　　２、sudo apt-get install python-pyaudio
'''

frameRate = 16000
NUM_SAMPLES = 2000
channels = 1
sampWidth = 2
TIME = 10
def save_wave_file(fileName, data): 
	wf = wave.open(fileName, "wb")
	wf.setnchannels(channels)
	wf.setsampwidth(sampWidth)
	wf.setframerate(frameRate)
	wf.writeframes(b"".join(data))


def my_recorder():
	host_name = socket.gethostname()
	print(" Host name: %s" % host_name)
	print(" IP address: %s" % socket.gethostbyname(host_name))
	pa = PyAudio()
	stream = pa.open(format = paInt16, channels = 1, 
					 rate = frameRate, input = True,
					 frames_per_buffer = NUM_SAMPLES,
					 output=False)
	my_buf = []
	count = 0
	while count < TIME*8: # 限制录音时长
		string_audio_data = stream.read(NUM_SAMPLES)
		my_buf.append(string_audio_data)
		count += 1
		print('.')
        # filename = datetime.now().strftime("%Y-%m-%d_%H_%M_%S")+".wav"
		filename = "output.wav"
	save_wave_file("latestSpeech/" + filename, my_buf)
	stream.close()
	return filename, "save"


'''
使用CASR进行识别
'''
def recognizeSpeech():
	#return CASR_model.modelAPI()  # 利用自训模型
     return baidu_aip.baiduAPI() # baidu语音识别接口
	
