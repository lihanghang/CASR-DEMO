# Training the samples using Gaussian Mixture Model
# We have selected the number the components in our GMM to be 16
# 3 samples of each person is taken ,labeled against their name and then fitted in GMM model 
# and saved with .gmm extension in the gmm_models directory.

import pickle as cPickle
import numpy as np
from scipy.io.wavfile import read
from sklearn.mixture import GMM 
from mfcc_coeff import extract_features
import warnings
warnings.filterwarnings("ignore")

source   = "samples\\"   

dest = "gmm_models\\"    
train_list = "training_sample_list.txt"        
file_paths = open(train_list,'r')

count = 1
# Extracting features for each speaker (3 files per speakers)
features = np.asarray(())
for path in file_paths:    
    path = path.strip()   
    
    # read the wav file
    sr,audio = read(source + path)
    
    # extract 40 dimensional MFCC & delta MFCC features from mfcc_coeff.py
    vector   = extract_features(audio,sr)
    
    if features.size == 0:
        features = vector
    else:
        features = np.vstack((features, vector))
    # when features of 3 files of speaker are concatenated, then do model training
    # here, we have selected GMM components to be 16.
    if count == 3:    
        gmm = GMM(n_components = 16, n_iter = 200, covariance_type='diag',n_init = 3)
        gmm.fit(features)
        
        # saving the gmm model of a person
        picklefile = path.split("-")[0]+".gmm"
        cPickle.dump(gmm,open(dest + picklefile,'wb'))
        print ('+ modeling completed for speaker:',picklefile," with data point = ",features.shape)
        features = np.asarray(())
        count = 0
    count = count + 1