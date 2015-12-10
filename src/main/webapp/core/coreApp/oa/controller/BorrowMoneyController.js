Ext.define("core.oa.controller.BorrowMoneyController", {
	extend : "Ext.app.Controller",
	mixins : {
		gridUtils : "core.utils.GridUtils",
		wfUtils : "core.utils.WfUtils",
		formUtils : "core.utils.FormUtils"
	},
	
	init : function() {
		var self = this;
		/**
		 * 显示任务处理的窗口
		 */
		this.showTaskWindow=function(btn){
//					var oldWin=Ext.getCmp("wftaskwindow");
//					if(oldWin){
//						oldWin.destroy();
//					}
					var idValue=btn.up("borrowform").getForm().findField("id").getValue();
					var html="<p>图片未找到！</p>";
					Ext.Ajax.request({
						url : "/jbpmItem/pc/wfTaskJobAction!taskImage.action",
						params : {
							taskId:btn.taskId,
							modelName : "com.oa.model.BorrowMoney",
							modelId : idValue
							},
						async : false,
						method : "POST",
						timeout : 4000,
						success : function(response, opts) {
							if(response.responseText && response.responseText!=""){
								html=response.responseText;
							}
						}});
					var idValue = btn.up("borrowform").getForm()
							.findField("id").getValue();
					var ref = btn.ref;
					var btnObj;
					var multiSelect = true;
					 if (btn.assigneType == "ASSIGNE") {
					 multiSelect = false;
					 }
					var hidden = false;
					if (ref == "wfNext") {
						btnObj = {
							xtype : "button",
							ref : "wfNext",
							iconCls : "wfnext",
							text : "送交",
							assigneType : btn.assigneType,
							assignes : btn.assignes,
							roles : btn.roles,
							taskId: btn.taskId,
							modelName : "com.oa.model.BorrowMoney",
							idValue : idValue
						}
					} else {
						btnObj = {
							xtype : "button",
							ref : "wfBack",
							iconCls : "wfback",
							text : "回退",
							taskId: btn.taskId,
							modelName : "com.oa.model.BorrowMoney",
							idValue : idValue
						}
						hidden = true
					}
					var win = Ext.create("core.oa.view.WfTaskWindow", {
								treeInfo:{
								multiSelect : multiSelect,
								hidden : hidden
								},
								btn:btnObj,
								htmlObj:html
							}).show();
					if(ref=="wfNext"){
						var store = win.down("roleusertree").getStore();
						store.getProxy().extraParams = {
							assigneType : btn.assigneType,
							assignees : btn.assignes,
							roles : btn.roles
						};
						store.load();
						if(!store.proxy.reader.rawData || store.proxy.reader.rawData.length<=0){
//							win.down("roleusertree").hide();
						}
					}else{
						win.down("roleusertree").hide();
					}

		},
		this.control({
			/**
			 * 双击进卡片
			 */
			"borrowgrid" : {
				itemdblclick : function(grid, record, item, index, e, eOpts) {
					var form = grid.up("borrowlayout").down("borrowform");
					// 还原表单内容
					self.resetFormInfo(form);
					form = grid.up("borrowlayout").down("borrowform");
					var formObj = form.getForm();
					grid = form.up("borrowlayout").down("borrowgrid");
					var records = grid.getSelectionModel().getSelection();
					var obj = records[0].data;
					// 把对象值放入form中
					self.setFormValue(formObj, obj);
					self.loadInfo(form, "com.oa.model.BorrowMoney", "id",
							obj.id);
					self.findHistory(form, "com.oa.model.BorrowMoney", obj.id);
					grid.hide();
					form.show();
				}
			},
			/**
			 * 卡片返回列表
			 */
			"borrowform button[ref=return]" : {
				click : function(btn) {
					var form = btn.up("borrowform");
					var formObj = form.getForm();
					formObj.reset();
					var grid = form.up("borrowlayout").down("borrowgrid");
					self.hideWfButtons(form);
					form.hide();
					grid.show();
				}
			},
			"borrowgrid button[ref=add]" : {
				click : function(btn) {
					var form = btn.up("borrowlayout").down("borrowform");
					self.resetFormInfo(form);
					form = btn.up("borrowlayout").down("borrowform");
					var formObj = form.getForm();
					formObj.reset();
					grid = form.up("borrowlayout").down("borrowgrid");
					grid.hide();
					formObj.findField("app.createUser").setValue(CY.user.username);
					formObj.findField("app.createUserCode").setValue(CY.user.usercode);
					form.show();
				}
			},
			"borrowgrid button[ref=delete]" : {
				click : function(btn) {
					var grid = self.findGrid(btn);
					self.doRemove(grid, "id", "/jbpmItem/pc/borrowMoneyAction");
				}
			},
			"borrowform button[ref=save]" : {
				click : function(btn) {
					var form = btn.up("borrowlayout").down("borrowform");
					var grid = form.up("borrowlayout").down("borrowgrid");
					var formObj = form.getForm();
					var id = formObj.findField("app.id").getValue();
					var ActionName = CY.ns + "/app/appAction!doSaveApplication.asp";
					if (id != null && id != "") {
						ActionName = CY.ns + "/app/appAction!doUpdateApplication.asp";
					}
					var param = {};
					param.msg = '确认提交该申请?';
					param.fn = function(result) {
						if ("yes" == result) {
							form.submit({
								clientValidation: true,
								url: ActionName,
								success: function (form, action) {
									var resObj = Ext
											.decode(action.response.responseText);
									console.info(resObj);
									if (resObj.success) {
										var obj = resObj.result;
										grid.getStore().load();
										Ext.Msg.alert("提示", resObj.info);
									} else {
										Ext.Msg.alert("提示", resObj.info);
									}
								},
								failure: function (form, action) {
									Ext.Msg.alert("提示", Ext.decode(action.response.responseText).info);
								}
							});
						}
					};
					CY.confirmBox(param);
					/*params["application.state"] = "0";
					Ext.Ajax.request({
						url: ActionName,
						//params:{"dept.id":records[0].data.id,"jobIds":jobId,"jobClean":clean},
						params:{"app.money":"232312"},
						method:"POST",
						timeout:4000,
						success:function(response,opts){
							var resObj=Ext.decode(response.responseText);
							if(resObj.success){
								var obj = resObj.result;
								form.findField("app.createTime")
										.setValue(obj.createTime);
								grid.getStore().load();
								Ext.Msg.alert("提示",resObj.info);
							}else{
								Ext.Msg.alert("提示",resObj.info);
							}
						}
					});*/
				}
			},
			"borrowform button[ref=wfStart]" : {
				click : function(btn) {
					var form = btn.up("borrowform");
					var formObj = form.getForm();
					var idValue = formObj.findField("id").getValue();
					var processFunMountId = btn.idValue;
					self.doStart(form, processFunMountId, idValue);
				}
			},
			/**
			 * 提交操作，展示委托人的信息
			 */
			"borrowform button[ref=wfNext]" : {
				click : function(btn) {
					this.showTaskWindow(btn);
				}
			},
			/**
			 * 提交操作，展示委托人的信息
			 */
			"borrowform button[ref=wfBack]" : {
				click : function(btn) {
					this.showTaskWindow(btn);
				}
			},
			/**
			 * 取回操作
			 */
			"borrowform button[ref=wfReturn]" : {
				click : function(btn) {
					var form=btn.up("borrowform");
					var formObj=btn.up("borrowform").getForm();
					var modelId=formObj.findField("id").getValue();
					self.doSubmit(btn,"com.oa.model.BorrowMoney",modelId,{form:form,modelName:"com.oa.model.BorrowMoney",idName:"id"});
//					self.resetFormInfo(form);
//					self.loadInfo(form, "com.oa.model.BorrowMoney",modelId,{form:form,modelName:"com.oa.model.BorrowMoney",idName:"id"});
				}
			},
			/**
			 * 撤销操作
			 */
			"borrowform button[ref=wfEnd]" : {
				click : function(btn) {
					var form=btn.up("borrowform");
					var formObj=btn.up("borrowform").getForm();
					var modelId=formObj.findField("id").getValue();
					self.doCall(btn,"com.oa.model.BorrowMoney",modelId,{form:form,modelName:"com.oa.model.BorrowMoney",idName:"id"});
				}
			},
			/**
			 *  处理任务操作
			 */
			"borrowform button[ref=wfTake]" : {
				click : function(btn) {
					var form=btn.up("borrowform");
					self.doTakeTask(btn,{form:form,modelName:"com.oa.model.BorrowMoney",idName:"id"});
				}
			},
			/**
			 * 送交操作
			 */
			"wftaskwindow panel[ref=taskjob] button[ref=wfNext]":{
				click:function(btn){
					var form=Ext.getCmp("borrowform");
					var formObj=form.getForm();
					var modelId=formObj.findField("id").getValue();
					self.doSubmit(btn,"com.oa.model.BorrowMoney",modelId,{form:form,modelName:"com.oa.model.BorrowMoney",idName:"id"});
				}
			},
			/**
			 * 回退操作
			 */
			"wftaskwindow panel[ref=taskjob] button[ref=wfBack]":{
				click:function(btn){
					var form=Ext.getCmp("borrowform");
					var formObj=form.getForm();
					var modelId=formObj.findField("id").getValue();
					self.doSubmit(btn,"com.oa.model.BorrowMoney",modelId,{form:form,modelName:"com.oa.model.BorrowMoney",idName:"id"});
				}
			}
		});
	},
	views : ["core.oa.view.BorrowForm", "core.oa.view.BorrowGrid",
			"core.oa.view.BorrowLayout", "core.oa.view.RoleUserTree",
			"core.oa.view.WfTaskWindow","core.oa.view.TaskConments"],
	stores : ["core.oa.store.BorrowMoneyStore", "core.oa.store.RoleUserStore"],
	models : ["core.oa.model.BorrowMoneyModel", "core.oa.model.RoleUserModel"]
});