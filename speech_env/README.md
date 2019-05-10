# CASR-DEMO(中文自动语音识别演示系统）
## Introdction
- Note: 本系统仅是尝试使用已训练完成的语音模型，不涉及模型训练部分。对模型训练感兴趣的小伙伴,详细可参考:来自－AI柠檬 的[ASRT_SpeechRecognition](https://github.com/nl8590687/ASRT_SpeechRecognition)（A Deep-Learning-Based Chinese Speech Recognition System 基于深度学习的中文语音识别系统）。　　
- 本系统使用Flask框架建立Web系统，主要由语音录制和语音识别两部分组成，其中:  
1. 语音录制。基于PyAudio是Python下的一个音频处理模块，用于将音频流输送到计算机声卡上。保存录音到本地。  
2. 语音识别。集成已训练模型实现，读取保存的录音并输出。  
- <strong>目前为更好体验语音识别技术，系统已支持调用百度语音识别[API](https://ai.baidu.com/docs#/ASR-Online-Python-SDK/top)实现。录音时长不超过60秒！</strong>

## Usage  
- 根据实际情况，在CASR_model.py中修改相关文件路径。  
- 进入speech_env目录下，使用source venv/bin/activate命令进入虚拟环境  
- 可直接使用命令：python manage.py 启动Falsk服务器，根据提示地址在浏览器访问即可。（这里肯定会出现某些包不存在的情况，不用慌，我们坚持”少什么，装什么“的原则，耐心装上即可，大概需要装4-6个左右的包。）  


## Ohters
- 因仅为体验所用，所以在用户体验上没有耗费过多时间。小伙伴可根据个人喜好发挥想象任意DIY.  
- 实现人为控制停止录音。
---
wechat:LHH754086474  
[CSDN](https://blog.csdn.net/lihangll)
Updated on May 9,2019.

