/**
 * Created by 67345 on 2018/1/25.
 */
var speed = 1;
var my_jPlayer;
var lan = "auto";
var voice = 7
var isVoicePitchActivated = false;
var timer;
$(function () {

    $("#eBusiness").text("AIcloud_Business@corp.youdao.com");
    $("#eService").text("zyservice@corp.youdao.com");
    my_jPlayer = $("#jplayer");
    my_jPlayer.jPlayer({
        ready: function (event) {
            $(this).jPlayer("setMedia", {
                title: "Bubble",
                mp3: ""
            });
        },
        // play: function(e){e.jPlayer.status.paused},
        // error:function(e){console.log(e)},
        swfPath:"js/jquery.jplayer.swf",
        solution:"flash,html",
        supplied:"mp3",
        wmode: "window",
        error:function (event) {
            console.log(event);
            // $("#flashZone").html(n("js/jquery.jplayer.swf"));
        },
        ended: function() {
            if($("#syntheticBtn").val() == 1)
                return;
            $("#syntheticBtn").val(4);
            $("#syntheticBtn").css("background-image","url(../static/image/btn_play_normal.png)");
        }
    });
    // audio.addEventListener('ended', audioEnded, false);

    
    // $("select.voicePitch").change(function(){
    //     let selectVoice = $(this).children("option:selected").val();
    //     voice = selectVoice;
    //     window.clearTimeout(timer);
    //     resetSyntheticBtn();
    // });

    //-------- for language selection -------------
    $("#customSelectBtn").click(function () {
        $("#customSelectOption").css("display","block");
    });

    $(".optionList").click(function () {
        console.log($(this).children("a").attr("val"));
        let selectLan = $(this).children("a").attr("val");
        var selectLanText = $(this).children("a").text();
        $("#customSelectBtnText").text(selectLanText);
        $("#customSelectVal").val(selectLan);
        $("#customSelectOption").css("display","none");

        lan = selectLan;
        window.clearTimeout(timer);
        if(selectLan === "en"){
            $('#voicePitch-other').css('display',"none");
            $('#customSelectBtnPitch').css('display','block');
            isVoicePitchActivated = true;
            console.log('Hello selectLan is English');
        }else {
            $('#voicePitch-other').css('display',"block");
            $('#customSelectBtnPitch').css('display','none');
            isVoicePitchActivated = false;
        };
        resetSyntheticBtn();

    });
    $("#customSelectOption").hover(function () {
    },function () {
        $("#customSelectOption").css("display","none");
    });
    $("#customSelectBtn").click(function(e){
        e.stopPropagation();
    });
    // --------For voice pitch----------------------
    $("#customSelectBtnPitch").click(function () {
        $("#customSelectOptionPitch").css("display","block");
    });

    $(".optionListPitch").click(function () {
        console.log($(this).children("a").attr("val"));
        let selectPitchVal = $(this).children("a").attr("val");
        let selectPitchText = $(this).children("a").text();
        $("#customSelectBtnTextPitch").text(selectPitchText);
        $("#customSelectPitchVal").val(selectPitchVal);
        $("#customSelectOptionPitch").css("display","none");
        voice = selectPitchVal;
        window.clearTimeout(timer);
        resetSyntheticBtn();
    });
    $("#customSelectOptionPitch").hover(function () {
    },function () {
        $("#customSelectOptionPitch").css("display","none");
    });
    $("#customSelectBtnPitch").click(function(e){
        e.stopPropagation();
    });
  //  ------show toast messages ------------
    $('#voicePitch-other').click(function(){
        Toast.toast("请选择英语语种才能选择人声哦");
    });
    // close dropdown menu when outside clicked

    $('.demo-container').click(function(e){
        console.log('Here is the event on demo container',e);
        $("#customSelectOption").css("display","none");
        $("#customSelectOptionPitch").css("display","none");
    })
    $("#syntheticBtn").click(function () {
        //合成加播放
        if ($("#syntheticBtn").val() == 1) {
            var q = $("#inputTexts").val();
            if (q.length > 200) {
                $("#wordCurrent").css("color","#F23A3A");
                Toast.toast("体验合成字数上限200");
                return;
            }
            if (q.length <= 0) {
                q = $("#inputTexts").attr("placeholder");
            }
            $("#syntheticBtn").css("background-image","url(../static/image/btn_synthesize_normal.png)");
            $("#syntheticBtn").attr("disabled", true);
            Toast.loading("正在合成...");
            // resetAudio(audio);
            synthesize(q);
        }else if ($("#syntheticBtn").val() == 2){
            //播放过程中点暂停
            window.clearTimeout(timer);
            my_jPlayer.jPlayer("pause");
            $("#syntheticBtn").val(3);
            // $("#syntheticBtn").html("播放");
            $("#syntheticBtn").css("background-image","url(../static/image/btn_play_normal.png)");
        }else if($("#syntheticBtn").val() == 3){
            //暂停过程中点播放
            window.clearTimeout(timer);
            my_jPlayer.jPlayer("play");
            $("#syntheticBtn").val(2);
            // $("#syntheticBtn").html("暂停");
            $("#syntheticBtn").css("background-image","url(../static/image/btn_pause_normal.png)");
        }else if ($("#syntheticBtn").val() == 4){
            //播放结束后播放变为重新播放
            window.clearTimeout(timer);
            my_jPlayer.jPlayer("play");
            $("#syntheticBtn").val(2);
            // $("#syntheticBtn").html("暂停");
            $("#syntheticBtn").css("background-image","url(../static/image/btn_pause_normal.png)");
        }

    });

    $("#clearInput").hover(function () {
        $(".clearnotice").css("display", "block");
    }, function () {
        $(".clearnotice").css("display", "none");
    })

    $("#clearInput").click(function () {
        $("#inputTexts").val("");
        $("#outputText").html("");
        resetSyntheticBtn();
        countText()
    });


    $("#inputTexts").bind('input propertychange', function () {
        $("#syntheticBtn").val(1);
        // $("#syntheticBtn").html("合成");
        $("#syntheticBtn").css("background-image","url(../static/image/btn_synthesize_normal.png)");
    });
    countText();
    $(document).click(function () {
        $("#errorHolder").css("display", "none");
    });

    $('#ex1').slider({
        formatter: function (value) {
        }
    }).on('slide', function (slideEvt) {
        //当滚动时触发
        window.clearTimeout(timer);
        console.info("current volume is" + slideEvt.value / 20);
        // audio.volume = slideEvt.value / 20;
        my_jPlayer.jPlayer("volume",slideEvt.value / 20);
    }).on('change', function (e) {
        //当值发生改变的时候触发
        //获取旧值和新值
        // audio.volume = e.value.newValue / 20;
        window.clearTimeout(timer);
        my_jPlayer.jPlayer("volume",e.value.newValue / 20);
        // console.info(e.value.oldValue + '--' + e.value.newValue);
    });

    $('#ex2').slider({
        formatter: function (value) {
        }
    }).on('slide', function (slideEvt) {
        //当滚动时触发
        window.clearTimeout(timer);
        speed = slideEvt.value / 10;
        resetAudio(audio);
        $("#syntheticBtn").val(1);
        console.info("current volume is" + slideEvt.value / 10);
        // $("#syntheticBtn").html("合成");
        $("#syntheticBtn").css("background-image","url(../static/image/btn_synthesize_normal.png)");
    }).on('change', function (e) {
        //当值发生改变的时候触发
        //获取旧值和新值
        window.clearTimeout(timer);
        speed = e.value.newValue / 10;
        $("#syntheticBtn").val(1);
        // $("#syntheticBtn").html("合成");
        $("#syntheticBtn").css("background-image","url(../static/image/btn_synthesize_normal.png)");
    });

    
    $('#ex0').slider({
        formatter: function (value) {
        }
    }).on('slide', function (slideEvt) {
        //当滚动时触发
        window.clearTimeout(timer);
        speed = slideEvt.value / 10;
        resetAudio(audio);
        $("#syntheticBtn").val(1);
        console.info("current volume is" + slideEvt.value / 10);
        // $("#syntheticBtn").html("合成");
        $("#syntheticBtn").css("background-image","url(../static/image/btn_synthesize_normal.png)");
    }).on('change', function (e) {
        //当值发生改变的时候触发
        //获取旧值和新值
        window.clearTimeout(timer);
        speed = e.value.newValue / 10;
        $("#syntheticBtn").val(1);
        // $("#syntheticBtn").html("合成");
        $("#syntheticBtn").css("background-image","url(../static/image/btn_synthesize_normal.png)");
    });


});
//发起合成请求
function synthesize(text) {
   var url = "https://aidemo.youdao.com/ttsapi";
   //var url = "https://openapidemo-test.youdao.com/ttsapi";
   let data;
   timer = window.setTimeout(function(){
    resetSyntheticBtn();
   },60000);
   if (isVoicePitchActivated){
        data = {
            text:text,
            speed:speed,
            lan:lan,
            voice:voice
        }
   } else {
        data = {
            text:text,
            speed:speed,
            lan:'auto',
        }
   };
   
   console.log('Here is the data',data);
   console.log($("#syntheticBtn").val())
    $.ajax({
        url : url,
        type : 'POST',
        async: false,
        data:data,
        success:function(res){
            Toast.close();
            var result = eval("("+ res +")");
            $("#downloadAudio").attr("href", result.data)
            console.log(result.data)
            if(result.errorCode ==0){
                // playSound(result.data);
                my_jPlayer.jPlayer("setMedia",{mp3:result.data}).jPlayer("play");
                
                // $("#jplayer").show();
                // $("#jplayer").jPlayer("play");
                $("#syntheticBtn").css("background-image","url(../static/image/btn_pause_normal.png)");
                $("#syntheticBtn").val(2);
            }else{
                if(result.errorCode==411){
                    Toast.toast("您的访问过于频繁，请稍后访问");
                }else if(result.errorCode==413){
                    Toast.toast("您今日的访问已达到上限");
                }else if(result.errorCode==410){
                    Toast.toast("您的访问过于频繁，请稍后访问");
                }else{
                    Toast.toast("语音合成失败")
                }
                $("#syntheticBtn").css("background-image","url(../static/image/btn_synthesize_normal.png)");
                // $("#syntheticBtn").html("合成");
                $("#syntheticBtn").val(1);
            }
            $("#syntheticBtn").attr("disabled", false);
        }
    });

}


function countText() {
    var str = $("#inputTexts").val();
    console.log(str)
    var curText = str.length;
    if (curText > 200) {
        $("#wordCurrent").addClass("beyond");
    } else {
        $("#wordCurrent").removeClass("beyond");
    }
    if (curText == 0) {
        $("#clearInput").css("display", "none");
    } else {
        $("#clearInput").css("display", "block");
    }
    $("#wordCurrent").text(curText);
}

function Alert(msg) {
    $('#alertText').text(msg);
    $('#alertModal').modal();
}

function resetAudio(audio) {
    audio.pause();
    if (!isNaN(audio.duration)) {
        audio.currentTime = 0;
    }
}
function resetSyntheticBtn(){
    //resetAudio(audio);
    $("#syntheticBtn").val(1);
    $("#syntheticBtn").css("background-image","url(../static/image/btn_synthesize_normal.png)");
}


