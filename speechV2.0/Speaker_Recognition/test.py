import os
import pickle as cPickle
import numpy as np
from scipy.io.wavfile import read
from mfcc_coeff import extract_features
import warnings
warnings.filterwarnings("ignore")
import time

#path to training data
source   = "samples\\"   
modelpath = "gmm_models\\"
test_file = "testing_sample_list.txt"        
file_paths = open(test_file,'r')

gmm_files = [os.path.join(modelpath,fname) for fname in os.listdir(modelpath) if fname.endswith(".gmm")]
print (gmm_files)

#Load the Gaussian gender Models
models = [cPickle.load(open(fname,'rb')) for fname in gmm_files]
speakers = [fname.split("\\")[-1].split(".gmm")[0] for fname in gmm_files]

# Read the test directory and get the list of test audio files 
for path in file_paths:   
    
    path = path.strip()   
    print (path)
    sr,audio = read(source + path)
    vector   = extract_features(audio,sr)
    
    log_likelihood = np.zeros(len(models)) 
    
    for i in range(len(models)):
        gmm    = models[i]  #checking with each model one by one
        scores = np.array(gmm.score(vector))
        log_likelihood[i] = scores.sum()
    
    winner = np.argmax(log_likelihood)
    print ("\tdetected as - ", speakers[winner])
    time.sleep(1.0)