import numpy as np
from sklearn import preprocessing
import python_speech_features as mfcc
from scipy.io import wavfile


#Calculating Delta Frequencies for 20 features in MFCC vector for better classification
def calculate_delta(array):
    rows,cols = array.shape
    deltas = np.zeros((rows,20))
    N = 2
    for i in range(rows):
        index = []
        j = 1
        while j <= N:
            if i-j < 0:
                first = 0
            else:
                first = i-j
            if i+j > rows-1:
                second = rows-1
            else:
                second = i+j 
            index.append((second,first))

            j+=1
        deltas[i] = ( array[index[0][0]]-array[index[0][1]] + (2 * (array[index[1][0]]-array[index[1][1]])) ) / 10
    return deltas

def extract_features(audio,rate):
 
    mfcc_feat = mfcc.mfcc(audio,rate, 0.025, 0.01,20,appendEnergy = True)  
	#Scaling Features to Remove sparsity
    mfcc_feat = preprocessing.scale(mfcc_feat)
    delta = calculate_delta(mfcc_feat)
	#Combining the 20 delta features with the original 20 MFCC features to get Combined 40 feature vector
    combined = np.hstack((mfcc_feat,delta)) 
    #print (combined)
    return combined
