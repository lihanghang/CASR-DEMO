# -*-coding:utf-8 -*-

from aip import AipSpeech

'''
调用百度语音识别API实现
Author: Hang Hang Li
date: 2019/5/6
'''

def baiduAPI():
	""" 你的 APPID AK SK """
	APP_ID = '10372170'
	API_KEY = ''
	SECRET_KEY = ''

	client = AipSpeech(APP_ID, API_KEY, SECRET_KEY)

	# 读取文件
	wav_file = "latestSpeech/output.wav"
	# pcm_file = "latestSpeech/output_1.pcm"
    # # 就是此前我们在cmd窗口中输入命令,这里面就是在让Python帮我们在cmd中执行命令
	# os.system("ffmpeg -y  -i %s  -acodec pcm_s16le -f s16le -ac 1 -ar 16000 %s"%(wav_file,pcm_file))
	def get_file_content(filePath):
		with open(filePath, 'rb') as fp:
			return fp.read()
	# 识别本地文件  dev_pid: 1537-普通话(纯中文识别)\	1536-普通话(支持简单的英文识别)\  1936-普通话远场
	result_str = client.asr(get_file_content(wav_file), 'wav', 16000, {
	    'dev_pid': 1537,
	})
	code = result_str["err_no"]
	if code == 3301:
		return "音频质量过差,请重新录制清晰的音频！"
	elif code == 3308:
	    return "音频过长,音频时长不超过60s!"
	elif code == 0:
		text = result_str["result"][0]
		print("您刚说的是：\n" + text)
		return text
	else:
		return "无法识别，请重新录音！"

if __name__ == "__main__":
    singl = input("输入R后开始识别：")
    baiduAPI()