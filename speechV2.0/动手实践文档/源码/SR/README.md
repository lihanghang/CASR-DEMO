# Speaker-Recognition

A simple Speaker Recognition application in python using Mel-Frequency Cepstrum Coefficients and Gaussian Mixture Model. The mel-frequency cepstrum coefficients of each sample is extracted and fitted into a Gaussian Mixture Model. We have taken 4 samples of 9 people of length 2 seconds each. The samples are taken in normal surroundings, hence some noise is accompanied in all samples. The first three samples are used for training and the fourth one is then tested. Gmm models of these 9 people are already created and are present in the /gmm_models directory. You can find their corresponding samples in /samples directory.
 The accuracy of our implementation is very high (95%-96%) as tested upon the given samples. The accuracy still depends on the quality of the samples provided and amount of training set.

Running instructions :

This application runs on python 3.4 (windows 10). Python modules used are python_speech_features, Pyaudio, sklearn, Scipy and numpy.
   
Step 1 : Command Prompt start
Open up command prompt and go to the project's directory

Step 2 : Registration
First you need to register a user, providing the samples of the user's voice. Type : 
python register.py

This will run the register.py file. It will ask for entering the username. Once entered, the script will start recording the voice. It will ask for 3 samples of the user of length 2 seconds each time.  For convenience, we have asked user to say the words 'up' for first time, then 'down and then 'left'(although you can say anything, our application is speech independent. So just sing along for 6 seconds xD). Once the 3 samples are taken, the script trains these samples and then creates and dumps the gaussian mixture model in the gmm_models directory.

Step 3 : Testing
Once the .gmm extension file is create, you can now succesfully test your voice. Type:
python speakerrecog.py

This script records the voice of the user for 2 seconds. Say something for 2 seconds. Then the script outputs the result as :
detected as - "username"
