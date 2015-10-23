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

        msg: 'Uploading...',   

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

