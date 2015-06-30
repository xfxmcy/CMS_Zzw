/**
 * Jbpm系统管理所使用到的工具类
 * 
 * @author zhangshuaipeng
 */
Ext.define("core.utils.WfUtils", {
	/**
	 * 拿到form按钮等信息
	 * 
	 * @param {}
	 *            form
	 * @param {}
	 *            modelName
	 * @param {}
	 *            idName
	 * @param {}
	 *            idValue
	 */
	loadInfo : function(form, modelName, idName, idValue) {
		if (!form || !modelName || !idName
				|| !idValue) {
			alert("参数传递错误");
			return;
		}
		Ext.Ajax.request({
			url : "/jbpmItem/pc/wfInfoAction!loadInfo.action",
			params : {
				modelName : modelName,
				idName : idName,
				idValue : idValue
			},
			async : false,
			method : "POST",
			timeout : 4000,
			success : function(response, opts) {
				var resObj = Ext.JSON.decode(response.responseText);
				if (resObj.success) {
					var obj = resObj.obj;
					var processIds = obj.processFunMountId;
					var processNames = obj.processFunMountNames;
					var wfStart = obj.wfStart;
					if (wfStart != null && processIds != null
							&& processNames != null) {
							if (wfStart == "wfStart") {
								var process=processIds.split(",");
								var proceName=processNames.split(",");
								for(var i=0;i<process.length;i++){									
									if(i==0){
										var startBtn = form.down("button[ref=wfStart]");
										startBtn.setText("启动" + proceName[i] + "流程");
										startBtn.idValue = process[i];
										startBtn.show();
									}else{
										var tbar=form.down("button[ref=wfStart]").ownerCt;
										tbar.add({xtype:"button",text:"启动"+proceName[i]+"流程",idValue:process[i],ref:"wfStart",iconCls:"wfstart"});
									}
								
							}
						}
						return;
					}
					//代表流程已经启动   禁用所有字段和按钮
					var util = Ext.create("core.utils.FormUtils");
					util.readOnlyFields(form.getForm());
					util.hideFormButtons(form);
					util.showAbleInfo(form,obj);
				}
			}
		});
	},
	/**
	 * 启动一个流程
	 */
	doStart : function(form, processFunMountId, idValue) {
		if (!form || !processFunMountId || !idValue) {
			alert("传入参数失败");
			return;
		}
		var formObj = form.getForm();
		Ext.Ajax.request({
			url : "/jbpmItem/pc/wfProcessAction!doStartProcess.action",
			params : {
				id : processFunMountId,
				idValue : idValue
			},
			method : "POST",
			async : false,
			timeout : 4000,
			success : function(response, opts) {
				var resObj = Ext.JSON.decode(response.responseText);
				if (resObj.success) {
					var obj = resObj.obj;
					var util = Ext.create("core.utils.FormUtils");
					util.hideFormButtons(form);
					util.readOnlyFields(formObj);
					if (obj.wfNext && obj.wfBack) {
						var nextBtn=form.down("button[ref=wfNext]");
						nextBtn.taskId=obj.taskId;
						nextBtn.show();
						var endBtn=form.down("button[ref=wfEnd]")
						endBtn.taskId=obj.taskId;
						endBtn.show();
						form.down("button[ref=return]").show();
					}
					if (obj.ableFields != null && obj.ableFields != "") {
						var fields = obj.ableFields.split(",");
						Ext.each(fields, function(field) {
									formObj.findField(field).setReadOnly(false);
								});
					}
					if (obj.ableButtons != null && obj.ableButtons != "") {
						var buttons = obj.ableButtons.split(",");
						Ext.each(buttons, function(buttonName) {
									form.down("button[ref='" + buttonName
											+ "']").show();
								});
					}
					if(form.down("panel[ref=wfhistory]")){
						form.remove(form.down("panel[ref=wfhistory]",true));
					}
					Ext.Msg.alert("提示", "启动流程成功");
				}
			}
		});
	},
	/**
	 * 查找历史信息
	 * 
	 * @param {}
	 *            form
	 * @param {}
	 *            modelName
	 * @param {}
	 *            modelId
	 */
	findHistory : function(form, modelName, modelId) {
		if (!form || !modelName || !modelId) {
			alert("传入参数失败");
			return;
		}
		Ext.Ajax.request({
			url : "/jbpmItem/pc/wfHistoryAction!findHistory.action",
			params : {
				modelName : modelName,
				modelId : modelId
			},
			method : "POST",
			async : false,
			timeout : 4000,
			success : function(response, opts) {
				var resObj = Ext.JSON.decode(response.responseText);
				if (resObj.totalCount != null && resObj.totalCount > 0) {
					var array = resObj.rows;
					var space="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
					var html = "<table border=0>"
					html = "<tr><td><b>任务名称</b>"+space+"</td><td><b>任务类型</b>"+space+"</td><td><b>执行人</b>"+space+"</td><td><b>审批意见</b>"+space+"</td><td><b>开始时间</b>"+space+"</td><td><b>任务用时</b>"+space+"</td></tr><br/>"
					Ext.each(array, function(log) {
								html += "<tr><td><font color=red>" + log.nodeName +space+ "</font></td><td><font color=red>"
										+ log.typeDesc +space+ "</font></td><td><font color=red>"
										+ log.assignee +space+ "</font></td><td><font color=red>"
										+ log.comments +space+ "</font></td><td><font color=red>"
										+ log.startTime +space+ "</font></td><td><font color=red>"
										+ log.duration +space+ "</font></td></tr><br/>";
							});
							html+="</table>"
					if(form.down("panel[ref=wfhistory]")){
						form.remove(form.down("panel[ref=wfhistory]",true));
					}
					form.add({xtype:"panel",html:html,width:620,hght:400,border:0,ref:"wfhistory",colspan:2});
				}
			}
		});
	},

	/**
	 * 执行提交操作
	 */
	doSubmit:function(btn,modelName,modelId,obj){
		if(!btn){
			alert("传入参数失败");
			return;
		}
		var params={};
		if(btn.ref=="wfNext"){
			//送交
			var commForm=btn.up("panel[ref=taskjob]").down("taskconments").getForm();
			var comm=commForm.findField("conment").getValue();
			var roleUserTree=btn.up("wftaskwindow").down("roleusertree");
			var records=roleUserTree.getChecked();
			var assignees=new Array();
			var roles=new Array();
			if(records && records.length>0){
				Ext.each(records,function(model){
					if(model.raw["nodeInfo"]=="user" && btn.assigneType!="ROLE"){
						assignees.push(model.raw["code"]);
					}else if(model.raw["nodeInfo"]=="user"){
						roles.push(model.raw["code"]);
					}
				});
			}
			params.assigneType=btn.assigneType;
			params.assignees=assignees.join(",");
			params.roles=roles.join(",");
			params.submitType="to_submit";
			params.comments=comm;
		}else if(btn.ref=="wfBack"){
			var commForm=btn.up("panel[ref=taskjob]").down("taskconments").getForm();
			var comm=commForm.findField("conment").getValue();
			params.submitType="to_rollback";
			params.comments=comm;
		}else if(btn.ref=="wfReturn"){
			btn.modelName=modelName;
			btn.idValue=modelId;
			params.submitType="to_withdrow";
		}else{
			alert("按钮的ref丢失");
			return;
		}
		params.taskId=btn.taskId;
		params.modelName=btn.modelName;
		params.modelId=btn.idValue;
		Ext.Ajax.request({
			url : "/jbpmItem/pc/wfTaskJobAction!doSubmit.action",
			params : params,
			method : "POST",
			async : false,
			timeout : 4000,
			success : function(response, opts) {
				var resObj=Ext.decode(response.responseText);
				if(resObj.success){
					if(btn.ref!="wfReturn"){
						btn.up("wftaskwindow").close();
					}
					Ext.create("core.utils.FormUtils").flushForm(obj);
					Ext.Msg.alert("提示","执行成功");
				}else{
					Ext.Msg.alert("提示","执行失败");
				}
			}
		});
	},
	/**
	 *	执行处理任务操作 	 
	 */
	doTakeTask:function(btn,obj){
		if(!btn){
			alert("传入参数失败");
			return;
		}
		Ext.Ajax.request({
			url : "/jbpmItem/pc/wfTaskJobAction!takeTask.action",
			params : {taskId:btn.taskId},
			method : "POST",
			timeout : 4000,
			async : false,
			success : function(response, opts) {
				var resObj=Ext.decode(response.responseText);
				if(resObj.success){
					Ext.create("core.utils.FormUtils").flushForm(obj);
					Ext.Msg.alert("提示",resObj.obj);
				}else{
					Ext.Msg.alert("提示",resObj.obj);
				}	
			}
		});
	},
	/**
	 * 执行撤销操作
	 */
	doCall:function(btn,modelName,modelId,obj){
		if(!btn){
			alert("传入参数失败");
			return;
		}
		Ext.Ajax.request({
			url : "/jbpmItem/pc/wfTaskJobAction!callProcess.action",
			params : {
					taskId:btn.taskId,
					modelName:modelName,
					modelId:modelId
				},
			method : "POST",
			timeout : 4000,
			async : false,
			success : function(response, opts) {
				var resObj=Ext.decode(response.responseText);
				if(resObj.success){
					Ext.create("core.utils.FormUtils").flushForm(obj);
					Ext.Msg.alert("提示",resObj.obj);
				}else{
					Ext.Msg.alert("提示",resObj.obj);
				}
			}
		});
	}
});