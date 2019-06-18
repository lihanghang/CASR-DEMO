# -*-coding:utf-8 -*-
import wave
from pyaudio import PyAudio, paInt16
import json
from datetime import datetime
import time
import threading
import os
'''
File: ./speechRecorder
Author: HangHang Li
Date: 2019/04/28
Description: 基于pyaudio实现实时录音函数,利用线程可实现随时停止
Abouts: Linux for install pyaudio:
	1、sudo apt-get install portaudio19-dev　　
    2、sudo apt-get install python-pyaudio
'''

signal = 'y'   # 创建标志位
 
def record():
    # global signal
    CHUNK = 1024
    FORMAT = paInt16
    CHANNELS = 1
    RATE = 16000
    RECORD_SECONDS = 10
	# 理论上可以设置任意数值，一定要足够大于你实际工作中需要录音的最大时长
    if os.path.exists("latestSpeech/") == False:
        os.mkdir("latestSpeech/")
    WAVE_OUTPUT_FILENAME = "latestSpeech/output.wav"
    p = PyAudio()
 
    stream = p.open(format=FORMAT,
                    channels=CHANNELS,
                    rate=RATE,
                    input=True,
                    frames_per_buffer=CHUNK)
 
    frames = []
    
    begin = time.time()
 
    for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
        if signal == 'n':     # 通过判断标志位的状态来决定何时结束录音
            break
        data = stream.read(CHUNK)
        frames.append(data)
    end = time.time()
    print('录音结束，时长为: %s 秒' % round((end - begin), 2))
    stream.stop_stream()
    stream.close()
    p.terminate()
 
    wf = wave.open(WAVE_OUTPUT_FILENAME, 'wb')
    wf.setnchannels(CHANNELS)
    wf.setsampwidth(p.get_sample_size(FORMAT))
    wf.setframerate(RATE)
    wf.writeframes(b''.join(frames))
    wf.close()

def run():

    global signal
    t = threading.Thread(target=record, )   # 创建一个录音的线程
    t.start()
    signal = 'y'        # 录音结束之后恢复标志位

def stop():

    global signal
    signal = 'n'       # 改变标志位来随时结束录音

if __name__ == '__main__':
    signal = input("输入Y开始录音:")
    print("请开始通过耳麦输入语音(不超过10秒)…………")
    if signal == 'Y':
        run()
        stopSignal = input("输入N停止录音：")
        stop()
