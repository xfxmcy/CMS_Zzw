Ext.define("core.jbpm.controller.WfProcessController", {
	extend : "Ext.app.Controller",
	mixins : {
		gridUtils : "core.utils.GridUtils",
		formUtils : "core.utils.FormUtils"
	},
	init : function() {
		var self = this;
		this.control({
			/**
			 * 挂接流程
			 */
			"processgrid button[ref=addProcess]" : {
				click : function(btn) {
					var grid = btn.up("processgrid");
					var store = grid.getStore();
					var records = grid.getSelectionModel().getSelection();
					if (records == null || records.length <= 0) {
						Ext.Msg.alert("提示", "请选择数据");
					}
					var obj = records[0];
					if (obj.mountStatus == "已挂接") {
						Ext.Msg.alert("提示", "该流程已经挂接");
						return;
					}
					Ext.Ajax.request({
						url : "/jbpmItem/pc/wfProcessAction!addProcessFun.action",
						params : obj.data,
						method : "POST",
						timeout : 4000,
						success : function(response, opts) {
							var resObj = Ext.decode(response.responseText);
							if (resObj.success) {
								store.load();
								Ext.Msg.alert("提示", resObj.obj);
							} else {
								Ext.Msg.alert("提示", resObj.obj);
							}
						}
					});
				}
			},
			/**
			 * 取消挂接
			 */
			"processgrid button[ref=calProcess]" : {
				click : function(btn) {
					var grid = btn.up("processgrid");
					var store = grid.getStore();
					var records = grid.getSelectionModel().getSelection();
					if (!records || records.length <= 0) {
						Ext.Msg.alert("提示", "请选择数据");
						return;
					}
					var obj = records[0];
					if (obj.mountStatus == "未挂接") {
						Ext.Msg.alert("提示", "该流程未挂接");
						return;
					}
					Ext.Ajax.request({
						url : "/jbpmItem/pc/wfProcessAction!delProcessFun.action",
						params : obj.data,
						method : "POST",
						timeout : 4000,
						success : function(response, opts) {
							var resObj = Ext.decode(response.responseText);
							if (resObj.success) {
								store.load();
								Ext.Msg.alert("提示", resObj.obj);
							} else {
								Ext.Msg.alert("提示", resObj.obj);
							}
						}
					});
				}
			},
			/**
			 * 单击进卡片,查询事件和任务节点
			 */
			"processgrid" : {
				itemdblclick : function(grid, record, item, index, e, eOpts) {
					var form = grid.up("processlayout").down("processform");
					var formObj = form.getForm();
					grid = form.up("processlayout").down("processgrid");
					var records = grid.getSelectionModel().getSelection();
					var obj = records[0].data;
					self.setFormValue(formObj, obj);
					if (obj.id != null && obj.id != "") {
						var eventGrid = form.down("processeventgrid");
						var taskGrid = form.down("taskgrid");
						taskGrid.getStore().getProxy().extraParams = {
							ids : obj.id
						}
						eventGrid.getStore().getProxy().extraParams = {
							ids : obj.id,
							orderSql : " order by orderIndex desc",
							parentType : "ProcessFunMount"
						}
						eventGrid.getStore().load();
						taskGrid.getStore().load();
					}
					grid.hide();
					form.show();
				}
			},
			/**
			 * 卡片返回列表
			 */
			"processform button[ref=return]" : {
				click : function(btn) {
					var form = btn.up("processform");
					var grid = form.up("processlayout").down("processgrid");
					form.hide();
					grid.show();
				}
			},
			//添加流程事件
			"processeventgrid button[ref=addEvent]" : {
				click : function(btn) {
					var grid = btn.up("processeventgrid");
					var form = grid.up("processform").getForm();
					var idValue = form.findField("id").getValue();
					self.doInsert(grid, {
								orderIndex : 0,
								eventScope:"PROCESS"
							}, {
								orderIndex : 0,
								foreignKey : idValue,
								parentType : "ProcessFunMount",
								eventScope:"PROCESS"
							}, "/jbpmItem/pc/wfTaskEventAction", "id");
				}
			},
			//保存流程事件
			"processeventgrid button[ref=saveEvent]" : {
				click : function(btn) {
					var grid = btn.up("processeventgrid");
					self.doSave(grid, "id", "TaskEventInfo",
							"/jbpmItem/pc/wfTaskEventAction");
				}
			},
			//删除流程事件
			"processeventgrid button[ref=delEvnet]" : {
				click : function(btn) {
					var grid = btn.up("processeventgrid");
					self.doRemove(grid, "id", "/jbpmItem/pc/wfTaskEventAction");
				}
			},
			//任务节点事件添加
			"taskeventgrid button[ref=addEvent]" : {
				click : function(btn) {
					var grid = btn.up("taskeventgrid");
					var taskGrid = btn.up("tasklayout").down("taskgrid");
					var rescords=taskGrid.getSelectionModel().getSelection();
					if(!rescords || rescords.length<=0){
						Ext.Msg.alert("提示","请选择节点数据");
						return;
					}
					var obj = rescords[0].data;
					self.doInsert(grid, {
								orderIndex : 0,
								eventScope:"TASK"
							}, {
								orderIndex : 0,
								foreignKey : obj.id,
								parentType : "TaskFuncMount",
								eventScope:"TASK"
							}, "/jbpmItem/pc/wfTaskEventAction", "id");
				}
			},
			//任务节点事件保存
			"taskeventgrid button[ref=saveEvent]" : {
				click : function(btn) {
					var grid = btn.up("taskeventgrid");
					self.doSave(grid, "id", "TaskEventInfo",
							"/jbpmItem/pc/wfTaskEventAction");
				}
			},
			//任务节点事件删除
			"taskeventgrid button[ref=delEvnet]" : {
				click : function(btn) {
					var grid = btn.up("taskeventgrid");
					self.doRemove(grid, "id", "/jbpmItem/pc/wfTaskEventAction");
				}
			},
			//保存任务节点信息
			"taskgrid button[ref=saveNode]" : {
				click : function(btn) {
					var grid = btn.up("taskgrid");
					self.doSave(grid, "id", "TaskFuncMount",
							"/jbpmItem/pc/wfTaskAction");
				}
			},
			/**
			 * 任务节点点击  load部署任务的信息。。  load当前任务的事件
			 */
			"taskgrid" : {
				itemclick : function(grid, record, item, index, e, eOpts) {
					var records = grid.getSelectionModel().getSelection();
					var obj = records[0].data;
					var id = obj.id;
					//读取任务事件
					var grid=grid.up("tasklayout").down("taskeventgrid");
					if (id && id != "") {
						var taskEventGrid = grid.down("taskeventgrid");
						grid.getStore().getProxy().extraParams = {
							ids : id,
							orderSql : " order by orderIndex desc",
							parentType : "TaskFuncMount"
						}
					}
					grid.getStore().load();
					//部署对象form信息
					Ext.Ajax.request({
						url : "/jbpmItem/pc/wfTaskAction!findWfDeployTask.action",
						params : {
							processDefinitionId : obj.processDefinitionId,
							taskNodeName : obj.taskNodeName
						},
						method : "POST",
						timeout : 4000,
						success : function(response, opts) {
							var resObj = Ext.decode(response.responseText);
							if (resObj.success) {
								if (resObj.obj && resObj.obj != "") {
									var formObj = grid.ownerCt.down("taskform")
											.getForm();
									formObj.reset();
									self.setFormValue(formObj, resObj.obj);
								}
							}
						}
					});
				}
			},
			//任务表单保存
			"taskform button[ref=saveInfo]":{
				click:function(btn){
					var form=btn.up("taskform");
					var obj=self.getFormObj(form.getForm());
					var datas=new Array();
					datas.push(obj);
					var strData=self.getExcuteSql(datas,"WfDeployTask","id");
					Ext.Ajax.request({
						url : "/jbpmItem/pc/wfDeployTaskAction!doListUpdate.action",
						params : {strData:strData},
						method : "POST",
						timeout : 4000,
						success : function(response, opts) {
							var resObj=Ext.JSON.decode(response.responseText);
							if(resObj.success){
								Ext.Msg.alert("提示","保存成功");
							}else{
								Ext.Msg.alert("提示","保存失败");
							}
						}
					});
				}
			}
		});
	},
	views : ["core.jbpm.view.ProcessGrid", "core.jbpm.view.ProcessLayout",
			"core.jbpm.view.ProcessEventGrid", "core.jbpm.view.ProcessForm",
			"core.jbpm.view.ProcessTab", "core.jbpm.view.TaskEventGrid",
			"core.jbpm.view.TaskGrid", "core.jbpm.view.TaskTab",
			"core.jbpm.view.TaskLayout","core.jbpm.view.TaskForm"],
	stores : ["core.jbpm.store.ProcessStore",
			"core.jbpm.store.ProcessEventStore",
			"core.jbpm.store.TaskEventStore", "core.jbpm.store.TaskStore"],
	models : ["core.jbpm.model.ProcessModel", "core.jbpm.model.TaskEventModel",
			"core.jbpm.model.TaskModel"]
});