var CY = new Object();

/*contextPath */
CY.ns = "/CMS_Zzw";
/*photo ns*/
CY.nsPhoto = "/CMSPhoto";

CY.user = {};
/**
 *	processBox 
 */
CY.processBox = function (param){
	var msgBox ;  //滚动条
	var count = 0;//滚动条被刷新的次数    
    var percentage = 0;//进度百分比    
    var progressText = '';//进度条信息 
	
    var task = {    
        run:function(){    
            count++;    
            //计算进度    
            percentage = count/10;                
            /**
             *  10次之后关闭
             */              
            /*//生成进度条文字    
            progressText = '当前完成度:'+percentage*100+"%";    
            //更新信息提示对话框    
            msgBox.updateProgress(percentage,progressText,'当前时间:'+Ext.util.Format.date(new Date(),'Y-m-d g:i:s A'));    
            //刷新10次后关闭信息提示框    
            if (count>10)    
            {    
                Ext.TaskManager.stop(task);    
                msgBox.hide();    
            }*/    
            
            /**
             * 一直转  关闭交给调用
             */
            msgBox.updateProgress(percentage);
            
            if (count>10)    
            {    
            	count = 0;  
            }    
            
        },    
        interval:1000    
    }    
	
    msgBox = Ext.MessageBox.show({   	  
        title: (param == undefined || param.title == undefined) ? 'Please wait':param.title,   

        msg: (param == undefined || param.msg == undefined) ? 'Uploading...':param.msg,

        progressText: '',   

        width:300,   

        progress:true,   
        
        autoShow : true,
        
        closable:false,   

        animEl: 'loading'

       
	});  
    /* 关闭任务 及窗口 */
    msgBox.closeCY = function (){
        Ext.TaskManager.stop(task);
        this.close();
    };
    /*自动更新滚动条*/
    Ext.TaskManager.start(task); 
	return msgBox ; 	
};

/**
 * 确认框
 */
CY.confirmBox  = function(param){
	Ext.MessageBox.confirm(
		(param == undefined || param.title == undefined) ? '提示':param.title,
		
		(param == undefined || param.msg == undefined) ? '您是否确认您的操作?':param.msg,
		
		function(result){
			param.fn(result);
		}
	);
};
/*
* 车辆申请
*   状态转换
* */
CY.changeStateValue = function(value){
    if("0" == value)
        return "审核中";
    else if("1" == value)
        return "待选车";
    else if("2" == value)
        return "注册审核中";
    else if("3" == value)
        return "注册打回";
    else if("4" == value)
        return "注册成功";
}/*
 * 车辆申请
 *   状态转换value
 * */
CY.changeValueState = function(value){
    if("0" == value)
        return "审核中";
    else if("1" == value)
        return "待选车";
    else if("2" == value)
        return "注册审核中";
    else if("3" == value)
        return "注册打回";
    else if("4" == value)
        return "注册成功";
}

/**
 * 根据taskId 查询 transitions
 * @param value
 */
CY.queryTransitionByTaskId = function(param){
    Ext.Ajax.request({
        url: CY.ns + "/workflow/wkAction!queryTransitions.asp",
        params: {"id": param.id},
        method: "POST",
        timeout: 4000,
        success: function (response, opts) {
            var resObj = Ext.decode(response.responseText);
            var result = resObj.result;
            if (resObj.success) {
                param.fn(result);
            }
            else
                Ext.Msg.alert("提示","任务异常!");
        }
    });
}
/**
 * set transition
 */
CY.setTransitionIntoForm = function(transition,taskForm){
    if(transition && transition.length > 0 ){
        var button = taskForm.down("button[ref=button_first]");
        button.setText(transition[0].name);
        button.cyValue = transition[0].name;
        button.show();
    }
    if(transition && transition.length > 1 ){
        var buttonSecond = taskForm.down("button[ref=button_second]");
        buttonSecond.setText(transition[1].name);
        buttonSecond.cyValue = transition[1].name;
        buttonSecond.show();
    }
    if(transition && transition.length > 2 ){
        var buttonThird = taskForm.down("button[ref=button_third]");
        buttonThird.setText(transition[2].name);
        buttonThird.cyValue = transition[2].name;
        buttonThird.show();
    }

}