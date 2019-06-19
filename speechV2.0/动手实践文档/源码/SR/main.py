# -*- coding:utf-8 -*-

from register import train_model
from speakerrecog import speakerRecog


if __name__ == "__main__":
    while 1:
        args = input("输入1-开始注册，2-开始识别，输入0-退出：")
        flag = int(args)
        if  flag == 1:
            print("开始声纹注册，请通过语音设备开始说话\n")
            train_model()
        elif flag == 2:
            print("通过语音输入设备开始讲话后进行识别\n")
            print("识别成功！您应该是：%s 吧" % speakerRecog())
        elif flag == 0:
            break
        else:
            print("指令错误，请重新开始……")
            continue