# -*-coding:utf-8 -*-
import wave
from pyaudio import PyAudio, paInt16
import CASR_model
import json

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
	pa = PyAudio()
	stream = pa.open(format = paInt16, channels = 1, 
					 rate = frameRate, input = True,
					 frames_per_buffer = NUM_SAMPLES)
	my_buf = []
	count = 0
	while count < TIME*8: # 限制录音时长
		string_audio_data = stream.read(NUM_SAMPLES)
		my_buf.append(string_audio_data)
		count += 1
		print('.')
	save_wave_file("latestSpeech/my_audio.wav", my_buf)
	stream.close()
	return json.dumps(count, ensure_ascii=False)


'''
使用CASR进行识别
'''
def recognizeSpeech():
	return CASR_model.modelAPI()
	

# 定义数据流块
chunk = 2014
def play():
    wf = wave.open(r"my_audio.wav", 'rb')
    p = PyAudio()
    stream = p.open(format = p.get_format_from_width(wf.getsampwidth()), 
    	            channels = wf.getnchannels(), rate = wf.getframerate(), 
    	            output = True)
    while True:
    	data = wf.readframes(chunk)
    	if data == "":break
    	stream.write(data)
    # stop data stream
    stream.close()
    # close pyaudio
    p.terminate()


# if __name__ == "__main__":
# 	my_recorde()
# 	print("recorder success!")
# 	play()
