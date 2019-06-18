# code=utf-8
import pyaudio
import wave
import pickle as cPickle
import numpy as np
from scipy.io.wavfile import read
from sklearn.mixture import GMM 
from .mfcc_coeff import extract_features
import warnings
import os
warnings.filterwarnings("ignore")



def recordVoice(word,speakerName):
	CHUNK = 1024
	FORMAT = pyaudio.paInt16
	CHANNELS = 2
	RATE = 44100
	RECORD_SECONDS = 4
	WAVE_OUTPUT_FILENAME = ".\\Speaker_Recognition\\samples\\"+speakerName+"-2018\\"+speakerName+"_"+word+".wav"

	p = pyaudio.PyAudio()

	stream = p.open(format=FORMAT,
					channels=CHANNELS,
					rate=RATE,
					input=True,
					frames_per_buffer=CHUNK)

	print("Recording '"+word+"'")

	frames = []

	for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
		data = stream.read(CHUNK)
		frames.append(data)

	print("* done recording")

	stream.stop_stream()
	stream.close()
	p.terminate()

	wf = wave.open(WAVE_OUTPUT_FILENAME, 'wb')
	wf.setnchannels(CHANNELS)
	wf.setsampwidth(p.get_sample_size(FORMAT))
	wf.setframerate(RATE)
	wf.writeframes(b''.join(frames))
	wf.close()
	#return WAVE_OUTPUT_FILENAME


'''
实现高斯混合模型的训练

'''
def  train_model(speakerName):
	# speakerName = input("Enter the Speaker's Name")
	training_file = open('.\\Speaker_Recognition\\training_sample_list.txt','w')
	os.mkdir(".\\Speaker_Recognition\\samples\\"+speakerName+"-2018")
	print("Start recording-1")
	recordVoice('up',speakerName)
	print("Start recording-2")
	recordVoice('down',speakerName)
	print("Start recording-3")
	recordVoice('left',speakerName)
	training_file.write(speakerName+'-2018\\'+speakerName+'_up.wav\n')
	training_file.write(speakerName+'-2018\\'+speakerName+'_down.wav\n')
	training_file.write(speakerName+'-2018\\'+speakerName+'_left.wav')
	#training_file.write(recordVoice('right',speakerName))
	training_file.close()
	#path to training data
	source   = ".\\Speaker_Recognition\\samples\\"   

	#path where training speakers will be saved
	dest = ".\\Speaker_Recognition\\gmm_models\\"
	train_file = ".\\Speaker_Recognition\\training_sample_list.txt"        
	file_paths = open(train_file,'r')

	count = 1
	# Extracting features for each speaker (5 files per speakers)
	features = np.asarray(())
	for path in file_paths:    
		path = path.strip()   
		print (path)
		
		# read the audio
		sr,audio = read(source + path)
		
		# extract 40 dimensional MFCC & delta MFCC features
		vector   = extract_features(audio,sr)
		
		if features.size == 0:
			features = vector
		else:
			features = np.vstack((features, vector))
		# when features of 5 files of speaker are concatenated, then do model training
		if count == 3:    
			gmm = GMM(n_components = 16, n_iter = 200, covariance_type='diag',n_init = 3)
			gmm.fit(features)
			
			# dumping the trained gaussian model
			picklefile = path.split("-")[0]+".gmm"
			cPickle.dump(gmm,open(dest + picklefile,'wb'))
			print ('+ modeling completed for speaker:',picklefile," with data point = ",features.shape)
			features = np.asarray(())
			count = 0
		count = count + 1