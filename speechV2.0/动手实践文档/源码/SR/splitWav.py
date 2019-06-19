import wave
filename = input(">>")
origAudio = wave.open('samples\\'+filename+'.wav','r')
frameRate = origAudio.getframerate()
nChannels = origAudio.getnchannels()
sampWidth = origAudio.getsampwidth()
length = 2
a = 0
start = 1
end = start + length
while a <= 3:
	print (start, end)
	origAudio.setpos(start*frameRate)
	chunkData = origAudio.readframes(int((end-start)*frameRate))
	fname = 'samples\\'+filename+'_cut_' + str(a) + '.wav'
	chunkAudio = wave.open(fname,'w')
	chunkAudio.setnchannels(nChannels)
	chunkAudio.setsampwidth(sampWidth)
	chunkAudio.setframerate(frameRate)
	chunkAudio.writeframes(chunkData)
	start = start + length
	end = end + length
	a = a + 1


chunkAudio.close()