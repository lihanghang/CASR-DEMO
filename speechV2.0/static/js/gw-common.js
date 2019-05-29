var _czc = _czc || [];
_czc.push(["_setAccount", "1261993376"]);
var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");

function submitForm(){
    if (check()) {
        var loginId = $("#loginId").val();
        var password = $("#password").val();
        password = hex_md5(password);
        $.ajax( {
            type : "POST",
            url : "login.s",
            data : {
                "loginId" : encodeURIComponent(loginId),
                "password" : encodeURIComponent(password)
            },
            success : function(data) {
                if(data.code==200){
                    location.href = "index.s";
                }else if(data.code==300){
                    $("#alertTip").text(data.msg);
                }else{
                    $("#alertTip").text("账号或密码不正确");
                }
            },
            dataType : "json"
        });
    }
}

function check() {
    if ($("#loginId").val() == "") {
        $("#alertTip").text("账号不能为空");
        return false;
    }
    if ($("#password").val() == "") {
        $("#alertTip").text("密码不能为空");
        return false;
    }
    if (!$("#agree").is(':checked')) {
        $("#alertTip").text("需要同意并遵守《服务条款》");
        return false;
    }
    return true;
}

function fixDialogInCenter(container) {

    var bWidth = $("body").width();
    var bHeight = $("body").height();
    var cWidth = $(container).width();

    var scrollTop = $("body").scrollTop();

    var left = ($("body").width() - cWidth) / 2;

    var top = ($(document.body).height() - $(container).height()) / 2;

    var scrollY = document.documentElement.scrollTop
        || document.body.scrollTop; //滚动条解决办法
    var top = (window.screen.height / 4) + scrollY - 120; //滚动条解决办法

    $(container).css("left", left);
    $(container).css("top", top+100);

}

// Restricts input for each element in the set of matched elements to the given inputFilter.
(function($) {
    $.fn.inputFilter = function(inputFilter) {
        return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
        });
    };
}(jQuery));


$(function(){
    // close mini program qr code
    $(".delete_icon_style_miniprogram").click(function(){
        $('.miniprogram-container').remove();
    });
    // open 合作表单
    $("#btn-consultation").click(function(){
        $("#overlay-partner-detail").css("display", "flex");
    });
    // 显示另一张图当hover
    $('#btn-consultation').hover(function(){
        $('#btn-consultation').attr('src','images/partner/btn_consult_hover.png');
    },function(){
        $('#btn-consultation').attr('src','images/partner/btn_consult_normal.png');
    })


    // refreshPersonInfo();

    $("body").keyup(function(event){
        if(event.keyCode == 13){
            submitForm();
        }
    });

    $("#indexBtn").click(function(){
        location.href = "index.s";
    });

    /*$("#loginBtn").click( function() {
        $('#loginPanel').modal();
        fixDialogInCenter('#loginPanel');
    });*/
    $("#login").click( function() {
        submitForm();
    });
    $(".p5-block").mouseover(function(){
        var obj = $(this).find(".bg").eq(0);
        var bg = obj.css("background");
        $(this).css("box-shadow","0 4px 16px 0 rgba(82,139,204,0.14)");
        $(this).css("cursor","pointer");
        bg = bg.replace("normal","hover");
        obj.css("background",bg);
    }).mouseout(function(){
        var obj = $(this).find(".bg").eq(0);
        var bg = obj.css("background");
        $(this).css("box-shadow","none");
        bg = bg.replace("hover","normal");
        obj.css("background",bg);
    });
    $(".p5-block").click(function(){
        var obj = $(this).find("a").eq(0);
        window.open(obj.attr("href"));
    });

    $("#eBusiness").text("AIcloud_Business@corp.youdao.com");
    $("#eService").text("zyservice@corp.youdao.com");

    $("#gov-service").mouseover(function(){
        $('.gov-service-block').css('visibility','visible');
    })
        .mouseout(function(){
            $('.gov-service-block').css('visibility','hidden');
        })
    $('.gov-service-block').hover(function(){
        $('.gov-service-block').css('visibility','visible');
    },function(){
        $('.gov-service-block').css('visibility','hidden');
    })



    // 合作伙伴咨询的JQuery

    // 第一个 ----- 服务类型
    // 点击打开下拉菜单
// 	$("#serviceType").click(function (e) {
// 		$("#serviceTypeOption").css("display","block");
// 		//e.stopPropagation();
// });

//当鼠标在下拉菜单的时候，保持下拉菜单打开的状态
// $("#serviceTypeOption").hover(function () {
// },function () {
// 		$("#serviceTypeOption").css("display","none");
// });

// 把下拉菜单的内容填入对话框中去
// $(".optionListServiceType").click(function (e) {
// 		// console.log($(this).children("a").attr("val"));
// 		console.log('Hello world');
// 		console.log($(this));
// 		console.log(e)
// 		let serviceTypeVal = $(this).children("a").attr("val");
// 		let serviceTypeText = $(this).children("a").text();
// 		$("#serviceTypeBtnText").text(serviceTypeText);
// 		$("#serviceTypeVal").val(serviceTypeVal);
// 		// $("#serviceTypeOption").css("display","none");
// });

// 第二个 ----- 所属地区
// 点击打开下拉菜单
// $("#partnerRegion").click(function (e) {
// 	$("#partnerRegionOption").css("display","block");
// 	e.stopPropagation();
// });

//当鼠标在下拉菜单的时候，保持下拉菜单打开的状态
// $("#partnerRegionOption").hover(function () {
// },function () {
// 	$("#partnerRegionOption").css("display","none");
// });

// 把下拉菜单的内容填入对话框中去
// $(".optionListPartnerRegion").click(function (e) {
// 		console.log($(this).children("a").attr("val"));
// 		let partnerRegionVal = $(this).children("a").attr("val");
// 		let partnerRegionText = $(this).children("a").text();
// 		$("#partnerRegionBtnText").text(partnerRegionText);
// 		$("#partnerRegionVal").val(partnerRegionVal);
// 		// $("#serviceTypeOption").css("display","none");
// });

// 第三个 ----- 所属行业
// 点击打开下拉菜单
// $("#partnerIndustry").click(function (e) {
// 	$("#partnerIndustryOption").css("display","block");
// 	e.stopPropagation();
// });

//当鼠标在下拉菜单的时候，保持下拉菜单打开的状态
// $("#partnerIndustryOption").hover(function () {
// },function () {
// 	$("#partnerIndustryOption").css("display","none");
// });

// 把下拉菜单的内容填入对话框中去
// $(".optionListPartnerIndustry").click(function () {
// 	console.log($(this).children("a").attr("val"));
// 	let partnerIndustryVal = $(this).children("a").attr("val");
// 	let partnerIndustryText = $(this).children("a").text();
// 	$("#partnerIndustryBtnText").text(partnerIndustryText);
// 	$("#partnerIndustryVal").val(partnerIndustryVal);
// 	// $("#serviceTypeOption").css("display","none");
// });

// 第四个 ----- 职务
// 点击打开下拉菜单
// $("#partnerJob").click(function (e) {
// 	$("#partnerJobOption").css("display","block");
// 	e.stopPropagation();
// });

//当鼠标在下拉菜单的时候，保持下拉菜单打开的状态
// $("#partnerJobOption").hover(function () {
// },function () {
// 	$("#partnerJobOption").css("display","none");
// });

// 把下拉菜单的内容填入对话框中去
// $(".optionListPartnerJob").click(function () {
// 	console.log($(this).children("a").attr("val"));
// 	let partnerJobVal = $(this).children("a").attr("val");
// 	let partnerJobText = $(this).children("a").text();
// 	$("#partnerJobBtnText").text(partnerJobText);
// 	$("#partnerJobBtnText").css('color', '#2D3138');
// 	$("#partnerJobVal").val(partnerJobVal);
// 	// $("#serviceTypeOption").css("display","none");
// });

// 第五个 ----- 来源渠道
// 点击打开下拉菜单
// $("#partnerChannel").click(function (e) {
// 	$("#partnerChannelOption").css("display","block");
// 	e.stopPropagation();
// });

//当鼠标在下拉菜单的时候，保持下拉菜单打开的状态
// $("#partnerChannelOption").hover(function () {
// },function () {
// 		$("#partnerChannelOption").css("display","none");
// });

// 把下拉菜单的内容填入对话框中去
// $(".optionListPartnerChannel").click(function () {
// 		console.log($(this).children("a").attr("val"));
// 		let partnerChannelVal = $(this).children("a").attr("val");
// 		let partnerChannelText = $(this).children("a").text();
// 		$("#partnerChannelBtnText").text(partnerChannelText);
// 		$("#partnerChannelBtnText").css('color', '#2D3138');
// 		$("#partnerChannelVal").val(partnerChannelVal);
// 		// $("#serviceTypeOption").css("display","none");
// });

// -----------------------------------------------------------


// close button in the partner detail

    $('#popup-feedback-detail').on('click','#partner-info-close-btn',function () {
        $("#popup-feedback-detail").toggle();
        refreshFeedbackInfoForm();
    })
    $('#overlay-partner-detail').on('click','#partner-info-close-btn',function () {
        $("#overlay-partner-detail").toggle();
        refreshPartnerInfoForm();
    })
    $('#overlay-technical-detail').on('click','#partner-info-close-btn',function () {
        $("#overlay-technical-detail").toggle();
        refreshTechnicalInfoForm();
    })

    $('#popup-feedback-detail').on('click','#overlay-cancel',function () {
        $("#popup-feedback-detail").hide();
        refreshFeedbackInfoForm();
    })
    $('#overlay-partner-detail').on('click','#overlay-cancel',function () {
        $("#overlay-partner-detail").hide();
        refreshPartnerInfoForm();
    })
    $('#overlay-technical-detail').on('click','#overlay-cancel',function () {
        $("#overlay-technical-detail").hide();
        refreshTechnicalInfoForm();
    })

//recalculate content when radio is clicked
    $("input[name='channel']").click(function(){
        checkingIsChannel();
    })
// get another page when refresh is hit

    $(".class-item-container").on('click','#verification-refresh', function(){
        getVerificationCodePic();
    })
// 提交表单 发出POST call
    $("#partner-info-form-id").submit(function(e){
        submitPartnerInfoForm();
        e.preventDefault();
        return false
    })

//    需求反馈 提交表单
    $('#feedback-info-form-id').submit(function (e) {
        submitFeedbackForm();
        e.preventDefault();
        return false;
    })

//    技术咨询表单提交
    $('#technical-info-form-id').submit(function (e) {
        submitTechnicalForm();

        e.preventDefault();
        return false;
    })

// 显示表单，当我们点击合作咨询的时候
    $("#partner-info-form").click(function(){
        $("#overlay-partner-detail").css("display", "flex");
    })
// 显示表单，当我们点击私有化立即咨询的时候
    $("#private-page-consultation").click(function(){
        $("#overlay-partner-detail").css("display", "flex");
    })
// 显示表单，当我们点击合作伙伴立即加入的时候
    $("#partner-page-joinus").click(function(){
        $("#overlay-partner-detail").css("display", "flex");
    })
// 如果select 点击就触发 (服务类型)
    $("#serviceTypeOption").change(function(){
        if($("#serviceTypeOption").children("option:selected").val() === ""){
            $("#serviceTypeOption").css('color', '#8E959E')
        } else{
            $("#serviceTypeOption").css('color', '#2D3138')
        }
    })
// 如果select 点击就触发 (所属区域)
    $("#partnerRegionOption").change(function(){
        if($("#partnerRegionOption").children("option:selected").val() === ""){
            $("#partnerRegionOption").css('color', '#8E959E')
        } else{
            $("#partnerRegionOption").css('color', '#2D3138')
        }
    })
// 如果select 点击就触发 (所属行业)
    $("#partnerIndustryOption").change(function(){
        if($("#partnerIndustryOption").children("option:selected").val() === ""){
            $("#partnerIndustryOption").css('color', '#8E959E')
        } else{
            $("#partnerIndustryOption").css('color', '#2D3138')
        }
    })
// 如果select 点击就触发 (职务)
    $("#partnerJobOption").change(function(){
        if($("#partnerJobOption").children("option:selected").val() === ""){
            $("#partnerJobOption").css('color', '#8E959E')
        } else{
            $("#partnerJobOption").css('color', '#2D3138')
        }
    })
// 如果select 点击就触发 (来源渠道)
    $("#partnerChannelOption").change(function(){
        if($("#partnerChannelOption").children("option:selected").val() === ""){
            $("#partnerChannelOption").css('color', '#8E959E')
        } else{
            $("#partnerChannelOption").css('color', '#2D3138')
        }
    })

//电话号码栏仅仅接受数字
// Restrict input to digits by using a regular expression filter.
    $("#partner-cell").inputFilter(function(value) {
        return /^\d*$/.test(value);
    });

//make several call when page is loaded
    $(document).ready(function(){
        // 设置不同的margin-left 对firefox and IE
        // if(navigator.userAgent.indexOf("Trident") > -1 || navigator.userAgent.indexOf("Firefox") > -1) {
        // 	console.log("You are on IE or Firefox!!!!!")
        // 	$(".class-item-container-verification").css("margin-left", "55px");
        // 	$(".class-item-container-qudao").css("margin-left", "24px");
        // }else {
        // 	$(".class-item-container-verification").css("margin-left", "46px");
        // 	$(".class-item-container-qudao").css("margin-left", "17px");
        // }
        //初始化清空所有选项
        refreshPartnerInfoForm();
        // 检查是否是渠道商
        checkingIsChannel();
        // 获取各种列表
        getTypeRegionIndustryForPartnerInfo();
        getVerificationCodePic();

        //联系我们  工单提交

        $('.submit-info').click(function () {
            var sign = $(this).attr('data-sign');
            switch(sign) {
                case 'consultation':
                    $("#overlay-partner-detail").css("display", "flex");
                    break;
                case 'technical':
                    $('#overlay-technical-detail').css("display", "flex");
                    break;
            }
        });
        //        首页产品展示区 hover之后出现不产品下的子产品列表
        $('.ai-content').on('mouseenter','.ai-item',function () {
            var type = $(this).attr('data-type');
            $('.translate-pd').hide();
            $('#' + type + '-type').show();
        })
        //   点击子产品列表中最后一个按钮——“立即体验” 弹出需求表单的效果
        $('.transl-item').on('click','.feedback-btn',function () {
            $('#popup-feedback-detail').css("display", "flex");
        })

        //     顶部栏 click需求反馈
        $('#top-content').on('click','.feedback',function () {
            $('#popup-feedback-detail').css("display", "flex");
        })

        $('.more-list').mouseenter(function () {
            $('.icon_arrow_more').attr('src','http://shared.youdao.com/ead/zhiyun/guanwang/images/ic_arrow_blue_hover.png')
        }).mouseleave(function () {
            $('.icon_arrow_more').attr('src','http://shared.youdao.com/ead/zhiyun/guanwang/images/ic_arrow_gray_normal.png')
        })
        $('.private').mouseenter(function () {
            $('.private-icon').attr('src','http://shared.youdao.com/ead/zhiyun/guanwang/images/ic_arrow_blue_hover.png')
        }).mouseleave(function () {
            $('.private-icon').attr('src','http://shared.youdao.com/ead/zhiyun/guanwang/images/ic_arrow_gray_normal.png')
        })
        $('.pd-other-box .feedback').mouseenter(function () {
            $('.feedback-icon').attr('src','http://shared.youdao.com/ead/zhiyun/guanwang/images/ic_arrow_blue_hover.png')
        }).mouseleave(function () {
            $('.feedback-icon').attr('src','http://shared.youdao.com/ead/zhiyun/guanwang/images/ic_arrow_gray_normal.png')
        })

        $('#slide-right').mouseenter(function () {
            $('#slide-right').attr('src','http://shared.youdao.com/ead/zhiyun/guanwang/images/ic_cases_ArrowRight_hover.png')
        }).mouseleave(function () {
            $('#slide-right').attr('src','http://shared.youdao.com/ead/zhiyun/guanwang/images/ic_cases_ArrowRight_normal.png')
        })
        $('#slide-left').mouseenter(function () {
            $('#slide-left').attr('src','http://shared.youdao.com/ead/zhiyun/guanwang/images/ic_cases_ArrowLeft_hover.png')
        }).mouseleave(function () {
            $('#slide-left').attr('src','http://shared.youdao.com/ead/zhiyun/guanwang/images/ic_cases_ArrowLeft_normal.png')
        })
        $('.visit-more-notice').mouseenter(function () {
            $('.notice_visit_more').attr('src','http://shared.youdao.com/ead/zhiyun/guanwang/images/ic_enter_news_hover.png')
        }).mouseleave(function () {
            $('.notice_visit_more').attr('src','http://shared.youdao.com/ead/zhiyun/guanwang/images/ic_enter_news_normal.png')
        })
    })





});




function checkingIsChannel(){
    var isChannel = $("input[name='channel']:checked").val();
    if( isChannel === "0") {
        $("#partner-situation").css("display", "none");
        $("#partner-quantity").css("display", "none");
        $("#partner-company-scenario").prop("required", false);
    } else {
        $("#partner-situation").css("display", "flex");
        $("#partner-quantity").css("display", "flex");
        $("#partner-company-scenario").prop("required", true);
    }
}
//TODO 登录首页的时候直接调用

function getTypeRegionIndustryForPartnerInfo(){
    // 服务类型列表
    var typeUrl = "/queryCustomerServiceList.s";
    $.ajax({
        url : typeUrl,
        type : 'GET',
        async: false,
        cache: false,
        success:function(res){
            var result = eval("("+ res +")");
            if(result.code === 200){
                var type = result.datas;
                $.each(type, function(index, item){
                    $('#overlay-technical-detail #tech-service').length === 0 ? '' : $('#overlay-technical-detail #tech-service').append('<option  value="' + item.id + '">'+item.name+'</option>');
                    $("#overlay-partner-detail #serviceTypeOption").append('<option  value="' + item.id + '">'+item.name+'</option>')
                })
            }else{
                console.error("行业列表获取失败");
            }
        },
        error: function(){console.error("行业列表获取失败");}
    });
    // var type = [
    // 		{
    // 			"id": "1",
    // 			"name": "自然语言翻译-文本翻译"
    // 		},
    // 		{
    // 			"id": "2",
    // 			"name": "自然语言翻译-图像翻译"
    // 		},
    // 		{
    // 			"id": "3",
    // 			"name": "自然语言翻译-语言翻译"
    // 		}
    // 	]
    // $.each(type, function(index, item){
    // 	$("#serviceTypeOption").prepend('<li class="optionListServiceType"><a class="anchorColor" val="' + item.id + '" href="javascript:void(0)">'+item.name+'</a></li>')
    // })
    // $(".optionListServiceType").click(function (e) {
    // 	console.log($(this).children("a").attr("val"));
    // 	let serviceTypeVal = $(this).children("a").attr("val");
    // 	let serviceTypeText = $(this).children("a").text();
    // 	$("#serviceTypeBtnText").text(serviceTypeText);
    // 	$("#serviceTypeBtnText").css('color', '#2D3138');
    // 	$("#serviceTypeVal").val(serviceTypeVal);
    // 	// $("#serviceTypeOption").css("display","none");
    // });
    // 所属类型列表
    var regionUrl = "/queryAreaList.s";
    $.ajax({
        url : regionUrl,
        type : 'GET',
        async: false,
        cache: false,
        success:function(res){
            var result = eval("("+ res +")");
            if(result.code === 200){
                var region = result.datas;
                $.each(region, function(index, item){
                    $("#partnerRegionOption").append('<option  value="' + item.id + '">'+item.name+'</option>')
                })
            }else{
                console.error("地区列表获取失败");
            }
        },
        error: function(){console.error("地区列表获取失败");}
    });
    // var region = [
    // 	{
    // 		"id": "1",
    // 		"name": "北京市"
    // 	},
    // 	{
    // 		"id": "2",
    // 		"name": "上海市"
    // 	},
    // 	{
    // 		"id": "3",
    // 		"name": "深圳市"
    // 	}
    // ]
    // $.each(region, function(index, item){
    // 	$("#partnerRegionOption").prepend('<li class="optionListPartnerRegion"><a class="anchorColor" val="' + item.id + '" href="javascript:void(0)">'+item.name+'</a></li>')
    // })
    // $(".optionListPartnerRegion").click(function (e) {
    // 	console.log($(this).children("a").attr("val"));
    // 	let partnerRegionVal = $(this).children("a").attr("val");
    // 	let partnerRegionText = $(this).children("a").text();
    // 	$("#partnerRegionBtnText").text(partnerRegionText);
    // 	$("#partnerRegionBtnText").css('color', '#2D3138');
    // 	$("#partnerRegionVal").val(partnerRegionVal);
    // 	// $("#serviceTypeOption").css("display","none");
    // });
    // 所属行业列表
    var industryUrl = "/queryCustomerIndustryList.s";
    $.ajax({
        url : industryUrl,
        type : 'GET',
        async: false,
        cache: false,
        success:function(res){
            var result = eval("("+ res +")");
            if(result.code === 200){
                var industry = result.datas;
                $.each(industry, function(index, item){
                    $("#partnerIndustryOption").append('<option  value="' + item.id + '">'+item.name+'</option>')
                })
            }else{
                console.error("行业列表获取失败");
            }
        },
        error: function(){console.error("行业列表获取失败");}
    });
    // var industry = [
    // 	{
    // 		"id": "1",
    // 		"name": "家电"
    // 	},
    // 	{
    // 		"id": "2",
    // 		"name": "政府"
    // 	},
    // 	{
    // 		"id": "3",
    // 		"name": "IT/软件服务/电子商务"
    // 	}
    // ]
    // $.each(industry, function(index, item){
    // 	$("#partnerIndustryOption").prepend('<li class="optionListPartnerIndustry"><a class="anchorColor" val="' + item.id + '" href="javascript:void(0)">'+item.name+'</a></li>')
    // })
    // $(".optionListPartnerIndustry").click(function () {
    // 	console.log($(this).children("a").attr("val"));
    // 	let partnerIndustryVal = $(this).children("a").attr("val");
    // 	let partnerIndustryText = $(this).children("a").text();
    // 	$("#partnerIndustryBtnText").text(partnerIndustryText);
    // 	$("#partnerIndustryBtnText").css('color', '#2D3138');
    // 	$("#partnerIndustryVal").val(partnerIndustryVal);
    // 	// $("#serviceTypeOption").css("display","none");
    // });


}

function getVerificationCodePic(){
    var codeUrl = "/vertifyCode.s?s=" + Math.random() ;
    $.ajax({
        url : codeUrl,
        type : 'GET',
        async: false,
        cache: false,
        success:function(res){
            $("#overlay-partner-detail #verification-code").attr('src', codeUrl)
            $("#popup-feedback-detail #verification-code").attr('src', codeUrl)
            $("#overlay-technical-detail #verification-code").attr('src', codeUrl)
        },
        error: function(){
            console.error("验证码获取失败")
        }
    });
}

function submitTechnicalForm() {
    let submitTechnicalInfoUrl = "/createTechConsultation.s";
    let serviceResult = "";
    $.each($("#tech-service").children("option:selected"), function(index, option){
        if (index === 0){
            serviceResult += option.value
        } else {
            serviceResult += ",";
            serviceResult += option.value
        }
    });
    let technicalInfoData = {
        service: serviceResult,
        company: $.trim($("#tech-company-name").val()),
        description: $.trim($("#tech-question-detail").val()),
        contact: $.trim($("#tech-name").val()),
        mobile: $("#tech-phone").val(),
        inputCode: $("#tech-verification").val(),
        email: $("#tech-email").val()
    };

    if(checkingtechFiled()){
        $.ajax({
            type : "POST",
            url : submitTechnicalInfoUrl,
            crossDomain: true,
            data : technicalInfoData,
            cache: false,
            success : function(res) {
                var result = eval("("+ res +")");
                if(result.code === "20000") {
                    window.alert("表单提交成功");
                    $("#overlay-technical-detail").css("display", "none");
                    refreshTechnicalInfoForm();
                } else if(result.code === "40001"){
                    window.alert("验证码超时")
                } else if(result.code === "40002"){
                    window.alert("验证码错误")
                } else if(result.code === "40003"){
                    window.alert("参数不全")
                } else if (result.code === "40000") {
                    window.alert("添加表单失败")
                } else{
                    window.alert("其他错误")
                }
            },
            error: function(){
                window.alert("服务端错误，请稍后再试")
            }
        });
    }

}


function checkingtechFiled() {
    // 服务类型
    let serviceString = $.trim($("#tech-service").val())
    if (serviceString === "" && $("#tech-service").length > 0){
        window.alert("服务类型未选择，请选择")
        $("#tech-service").focus()
        return false;
    }
    // 公司名称
    let companyString = $.trim($("#tech-company-name").val())
    if (companyString === "" && $("#tech-company-name").length > 0){
        window.alert("公司名称未填写，请填写")
        $("#tech-company-name").focus()
        return false;
    }
    // 问题详情
    let quetionsString = $.trim($("#tech-question-detail").val())
    if (quetionsString === "" && $("#tech-question-detail").length > 0){
        window.alert("问题详情未填写，请填写")
        $("#tech-question-detail").focus()
        return false;
    }
    // 联系人姓名
    let tNameString = $.trim($("#tech-name").val())
    if (tNameString === "" && $("#tech-name").length > 0){
        window.alert("联系人未填写，请填写")
        $("#tech-name").focus()
        return false;
    }
    // 联系人电话
    let tPhoneString = $.trim($("#tech-phone").val())
    if (tPhoneString === "" && $("#tech-phone").length > 0){
        window.alert("联系电话未填写，请填写")
        $("#tech-phone").focus()
        return false;
    }
    // 联系人邮箱
    let tEmailString = $.trim($("#tech-email").val())
    if (tEmailString === "" && $("#tech-email").length > 0){
        window.alert("联系邮箱未填写，请填写")
        $("#tech-email").focus()
        return false;
    }
    // 验证码
    let tVerficationString = $.trim($("#tech-verification").val())
    if (tVerficationString === "" && $("#tech-verification").length > 0){
        window.alert("验证码未填写，请填写")
        $("#tech-verification").focus()
        return false;
    }
    return true;
}

function submitFeedbackForm() {
    let submitFeedbackInfoUrl = "/createRequirementFeedback.s";
    let feedbackInfoData = {
        usageSituation: $.trim($("#feedback-usage-scenario").val()),
        requirementDetail: $.trim($("#requirement-detail").val()),
        contact: $.trim($("#fb-name").val()),
        mobile: $("#fb-phone").val(),
        inputCode: $("#fb-verification").val(),
        email: $("#fb-email").val()
    };

    if(checkingFeedbackFiled()){
        $.ajax({
            type : "POST",
            url : submitFeedbackInfoUrl,
            crossDomain: true,
            data : feedbackInfoData,
            cache: false,
            success : function(res) {

                var result = eval("("+ res +")");
                if(result.code === "20000") {
                    window.alert("表单提交成功");
                    $("#popup-feedback-detail").css("display", "none");
                    refreshFeedbackInfoForm();
                } else if(result.code === "40001"){
                    window.alert("验证码超时")
                } else if(result.code === "40002"){
                    window.alert("验证码错误")
                } else if(result.code === "40003"){
                    window.alert("参数不全")
                } else if (result.code === "40000") {
                    window.alert("添加表单失败")
                } else{
                    window.alert("其他错误")
                }
            },
            error: function(){
                window.alert("服务端错误，请稍后再试")
            }
        });

    }
}


function checkingFeedbackFiled() {
    // 需求详情
    let requirementString = $.trim($("#requirement-detail").val())
    if (requirementString === "" && $("#requirement-detail").length > 0){
        window.alert("需求详情全为空格，请重新输入")
        $("#requirement-detail").focus()
        return false;
    }

    // 联系人电话
    let concatString = $.trim($("#fb-phone").val())
    if (concatString === "" && $("#fb-phone").length > 0){
        window.alert("联系人电话全为空格，请重新输入")
        $("#fb-phone").focus()
        return false;
    }

    // 姓名
    let nameString = $.trim($("#fb-name").val())
    if (nameString === "" && $("#fb-name").length > 0){
        window.alert("联系人姓名全为空格，请重新输入")
        $("#fb-name").focus()
        return false;
    }
    // 邮箱
    let emailString = $.trim($("#fb-email").val())
    if (emailString === "" && $("#fb-email").length > 0){
        window.alert("联系人邮箱全为空格，请重新输入")
        $("#fb-email").focus()
        return false;
    }

    return true;
}


function submitPartnerInfoForm(){
    let submitPartnerInfoUrl = "/insertConsultation.s"
    let serviceRes = ""
    $.each($("#overlay-partner-detail #serviceTypeOption").children("option:selected"), function(index, option){
        if (index === 0){
            serviceRes += option.value
        } else {
            serviceRes += ","
            serviceRes += option.value
        }
    })
    let partnerInfoData = {
        isChannel: $("input[name='channel']:checked").val(),
        service: serviceRes,
        classification: $.trim($("#overlay-partner-detail #classification-detail").val()),
        area: $("#overlay-partner-detail #partnerRegionOption").children("option:selected").val(),
        industry: $("#overlay-partner-detail #partnerIndustryOption").children("option:selected").val(),
        company: $.trim($("#overlay-partner-detail #partner-company-name").val()),
        introduction: $.trim($("#overlay-partner-detail #partner-company-intro").val()),
        scenario: $.trim($("#overlay-partner-detail #partner-company-scenario").val()),
        magnitude: $.trim($("#overlay-partner-detail #partner-mag").val()),
        contact: $.trim($("#overlay-partner-detail #partner-name").val()),
        mobile: $("#overlay-partner-detail #partner-cell").val(),
        email: $("#overlay-partner-detail #partner-email").val(),
        position: $("#overlay-partner-detail  #partnerJobOption").children("option:selected").val(),
        source: $("#overlay-partner-detail  #partnerChannelOption").children("option:selected").val(),
        vertifyCode: $("#overlay-partner-detail  #partner-verification").val()
    }
    // $.cookie("partner-info", 1, {
    // 	expires : 10,           // Expires in 10 days
    // 	csrdToken: 1,
    // 	path    : '/',          // The value of the path attribute of the cookie
    // 													// (Default: path of page that created the cookie).
    // 	domain  : 'http://aitest.youdao.com', // The value of the domain attribute of the cookie
    // 													// (Default: domain of page that created the cookie).
    //  });
    //  console.log('Partner info !!!!!!!!!coookie',$.cookie("partner-info"))

    if(checkingAllSpaceField()){
        $.ajax({
            type : "POST",
            url : submitPartnerInfoUrl,
            crossDomain: true,
            data : partnerInfoData,
            cache: false,
            success : function(res) {
                let result = eval("("+ res +")");
                if(result.code === "200") {
                    window.alert("表单提交成功");
                    $("#overlay-partner-detail").css("display", "none");
                    refreshPartnerInfoForm();
                } else if(result.code === "401"){
                    window.alert("验证码错误")
                } else if(result.code === "402"){
                    window.alert("参数缺失")
                } else if(result.code === "403"){
                    window.alert("添加失败")
                } else if (result.code === "405") {
                    window.alert("验证码过期，请刷新")
                } else{
                    window.alert("其他错误")
                }
            },
            error: function(){
                window.alert("服务端错误，请稍后再试")
            }
        });

    }
}

function handleRequired() {
    $("#partner-company-scenario").prop("required", false);
    $("#partner-company-name").prop("required", false);
    $("#partner-company-intro").prop("required", false);
    $("#partner-name").prop("required", false);
    $("#partner-cell").prop("required", false);
    $("#partner-email").prop("required", false);
    $("#partnerJobOption").prop("required", false);
    $("#serviceTypeOption").prop("required", false);
    $("#partnerRegionOption").prop("required", false);
    $("#partnerIndustryOption").prop("required", false);
    $("#partnerChannelOption").prop("required", false);
    $("#partner-verification").prop("required", false);
    $("#partner-verification").prop("required", false);
}

function refreshFeedbackInfoForm () {
    $('#requirement-detail').val('');
    $('#feedback-usage-scenario').val('');
    $('#fb-name').val('');
    $('#fb-phone').val('');
    $('#fb-email').val('');
    $('#fb-verification').val('');
    getVerificationCodePic()
}
function refreshTechnicalInfoForm() {
    $('#tech-company-name').val('')
    $("#tech-question-detail").val(" ")
    $('#tech-name').val('')
    $('#tech-phone').val('')
    $('#tech-verification').val('')
    $("#tech-service").selectpicker("val", "")
    getVerificationCodePic()
}

function refreshPartnerInfoForm(){
    console.log("refresh Partner Info Form is called!!!!!!!")

    handleRequired();
    // 清空所有选项

    $("input[name='channel']:nth(0)").prop('checked',true);
    // $("#serviceTypeOption option:eq(0)").prop('selected','selected');
    $("#overlay-partner-detail #classification-detail").val("");
    // $("#partnerRegionOption option:eq(0)").prop('selected','selected');
    // $("#partnerIndustryOption option:eq(0)").prop('selected','selected');
    $("#overlay-partner-detail #partner-company-name").val("");
    $("#overlay-partner-detail #partner-company-intro").val("");
    $("#overlay-partner-detail #partner-company-scenario").val("");
    $("#overlay-partner-detail #partner-mag").val("");
    $("#overlay-partner-detail #partner-name").val("");
    $("#overlay-partner-detail #partner-cell").val("");
    $("#overlay-partner-detail #partner-email").val("");
    // $("#partnerJobOption option:eq(0)").prop('selected','selected');
    // $("#partnerChannelOption option:eq(0)").prop('selected','selected');
    $("#overlay-partner-detail #partner-verification").val("");
    //由于应用了bootstrap-select, 清空select box 也需要调用它自己的方法
    $("#overlay-partner-detail .selectpicker").selectpicker("val", "")
    // 重新请求一张验证码
    getVerificationCodePic()

    // 把量级和使用场景隐藏
    $("#overlay-partner-detail #partner-situation").css("display", "none");
    $("#overlay-partner-detail #partner-quantity").css("display", "none");


}


function refreshPersonInfo(){
    loadPersonInfo(function(data){
        if(data.data){
            $("#loginBtn").hide();
            $("#registerBtn").hide();
            $("#indexBtn").show();
            $("#indexBtn").html("<nobr>"+data.data.company+"</nobr>");
        }

    });
}

function loadPersonInfo(overfunction) {

    $.ajax( {
        type : "POST",
        url :"queryPersonInfo.s",
        data : "",
        success : function(data) {
            overfunction(data);
        },
        dataType : "json"
    });
}

function checkingAllSpaceField(){
    var isChannel = $("input[name='channel']:checked").val();
    if(isChannel !== "0") {
        //使用场景
        let useString = $.trim($("#overlay-partner-detail #partner-company-scenario").val())
        if (useString === "" && $("#overlay-partner-detail #partner-company-scenario").length > 0){
            window.alert("使用场景未填写，请填写")
            $("#partner-company-scenario").focus()
            return false;
        }
    }
    // 服务类型
    let serString = $.trim($("#overlay-partner-detail #serviceTypeOption").children("option:selected").val())
    if (serString === "" && $("#overlay-partner-detail #serviceTypeOption").length > 0){
        window.alert("服务类型未选择，请重新选择")
        $("#serviceTypeOption").focus()
        return false;
    }
    // 所属地区
    let areaString = $.trim( $("#overlay-partner-detail #partnerRegionOption").children("option:selected").val())
    if (areaString === "" && $("#overlay-partner-detail #partnerRegionOption").length > 0){
        window.alert("所属地区未选择，请重新选择")
        $("#partnerRegionOption").focus()
        return false;
    }
    // 所属行业
    let hyString = $.trim( $("#overlay-partner-detail #partnerIndustryOption").children("option:selected").val())
    if (hyString === "" && $("#overlay-partner-detail #partnerIndustryOption").length > 0){
        window.alert("所属行业未选择，请重新选择")
        $("#partnerIndustryOption").focus()
        return false;
    }
    // 公司名字
    let companyString = $.trim($("#overlay-partner-detail #partner-company-name").val())
    if (companyString === "" && $("#overlay-partner-detail #partner-company-name").length > 0){
        window.alert("公司名称未填写，请填写")
        $("#partner-company-name").focus()
        return false;
    }
    // 姓名
    let nameString = $.trim($("#overlay-partner-detail #partner-name").val())
    if (nameString === "" && $("#overlay-partner-detail #partner-name").length > 0){
        window.alert("联系人姓名未填写，请填写")
        $("#partner-name").focus()
        return false;
    }
    // 电话
    let magString = $.trim($("#overlay-partner-detail #partner-cell").val())
    if (magString === "" && $("#overlay-partner-detail #partner-cell").length > 0){
        window.alert("联系人电话未填写，请填写")
        $("#partner-cell").focus()
        return false;
    }
    // 邮箱
    let eString = $.trim($("#overlay-partner-detail #partner-email").val())
    if (eString === "" && $("#overlay-partner-detail #partner-email").length > 0){
        window.alert("联系人邮箱未填写，请填写")
        $("#overlay-partner-detail #partner-email").focus()
        return false;
    }
    // 验证码
    let verString = $.trim($("#overlay-partner-detail #partner-verification").val())
    if (verString === "" && $("#overlay-partner-detail #partner-verification").length > 0){
        window.alert("验证码未填写，请填写")
        $("#overlay-partner-detail #partner-verification").focus()
        return false;
    }


    return true;

}
