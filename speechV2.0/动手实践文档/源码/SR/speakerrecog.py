import pyaudio
import wave
import os
import pickle as cPickle
import numpy as np
from scipy.io.wavfile import read
from mfcc_coeff import extract_features
import warnings
warnings.filterwarnings("ignore")
import time
def speakerRecog():
    #Recording Phase 
    CHUNK = 1024
    FORMAT = pyaudio.paInt16
    CHANNELS = 2
    RATE = 44100
    RECORD_SECONDS = 5
    WAVE_OUTPUT_FILENAME = "./samples/test.wav"

    p = pyaudio.PyAudio()

    stream = p.open(format=FORMAT,
                    channels=CHANNELS,
                    rate=RATE,
                    input=True,
                    frames_per_buffer=CHUNK)

    print("* recording")

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

    #Now the recording is stored in test.wav 
    #We will now test the recording with the gmm models

    source   = "./samples/"   
    modelpath = "./gmm_models/"
    test_file = "./testing_sample_list.txt"        
    file_paths = open(test_file,'r')

    gmm_files = [os.path.join(modelpath,fname) for fname in os.listdir(modelpath) if fname.endswith(".gmm")]
    # print (gmm_files)

    #Load the Gaussian gender Models
    models = [cPickle.load(open(fname,'rb')) for fname in gmm_files]
    speakers = [fname.split("/")[-1].split(".gmm")[0] for fname in gmm_files]

    # Read the test directory and get the list of test audio files 
    for path in file_paths:   
        
        path = path.strip()   
        # print (path)
        sr,audio = read(source + path)
        vector   = extract_features(audio,sr)
        
        log_likelihood = np.zeros(len(models)) 
        
    for i in range(len(models)):
        gmm    = models[i]  #checking with each model one by one
        scores = np.array(gmm.score(vector))
        log_likelihood[i] = scores.sum()
    
    winner = np.argmax(log_likelihood)
    # print ("\tdetected as - ", speakers[winner])
    return speakers[winner]
    time.sleep(1.0)