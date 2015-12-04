Ext.define("core.user.controller.UserController", {
	extend : "Ext.app.Controller",
			init : function() {
				var self = this;
				this.control({
					/**
					 * 添加人员
					 */
					"usergrid button[ref=add]":{
						click:function(btn){
							var window = Ext.getCmp("userwindow");
							if(window){
								window.show();
							}else{
								Ext.create("core.user.view.UserWindow").show();
							}
						}
					},
					/**
					 *删除人员
					 */
					"usergrid button[ref=delete]":{
						click:function(btn){
							var grid=btn.up("usergrid");
							var records=grid.getSelectionModel().getSelection();
							if(records.length <= 0){
								Ext.Msg.alert("提示","请选择要删除的用户!");
								return;
							}
							var param = {};
							param.msg = '删除角色,对应的岗位也会被删除.您确定您的操作?';
							param.fn = function(result) {
								if ("yes" == result) {
									Ext.Ajax.request({
										url: CY.ns + "/user/userAction!doDeleteUser.asp",
										params: {"user.id": records[0].data.id},
										method: "POST",
										timeout: 4000,
										success: function (response, opts) {
											var resObj = Ext.decode(response.responseText);
											if (resObj.success) {
												grid.getStore().load();
												Ext.Msg.alert("提示", resObj.info);
											} else {
												Ext.Msg.alert("提示", resObj.info);
											}
										}
									});
								}
							};
							CY.confirmBox(param);
						}
					},
					/**
					 * 更新人员信息
					 */
					"usergrid button[ref=edit]":{
						click:function(btn){
							var grid=btn.up("usergrid");
							var records=grid.getSelectionModel().getSelection();
							if(records.length <= 0){
								Ext.Msg.alert("提示","请选择要修改的用户!");
								return;
							}
							var window = Ext.getCmp("userwindow");
							if(window){
								window.show();
							}else{
								window = Ext.create("core.user.view.UserWindow").show();
							}
							var userForm = window.down("form").getForm();
							userForm.findField("username").setValue(records[0].data.username);
							userForm.findField("usercode").setValue(records[0].data.usercode);
							userForm.findField("id").setValue(records[0].data.id);
						}
					}

					/**
					 * 保存用户信息
					 */
					,"userwindow form button[ref=submit]":{
						//部门信息保存
						click:function(btn){
							var window=btn.up("userwindow");
							var dept=window.down("form");
							var userForm=dept.getForm();
							if(!userForm.isValid()){
								Ext.Msg.alert('提示','请认真完成表单...');
								return;
							}
							var store=Ext.getCmp("usergrid").getStore();
							var roleId = userForm.findField("id").getValue();
							var params={};
							var actionName= CY.ns + "/user/userAction!doSaveUser.asp";
							if(roleId && roleId !== ""){
								//修改
								actionName = CY.ns + "/user/userAction!doUpdateUser.asp";
								params["user.id"] = roleId;
							}
							var roleName = userForm.findField("username").getValue();
							var roleCode = userForm.findField("usercode").getValue();
							params["user.username"]=roleName;
							params["user.usercode"]=roleCode;
							Ext.Ajax.request({
								url:actionName,
								params:params,
								method:"POST",
								timeout:4000,
								success:function(response,opts){
									var resObj=Ext.decode(response.responseText);
									if(resObj.success){
										//修改成功
										//将最新model值放入form中并load树形，保持数据一致化
										//var obj=resObj.obj;
										userForm.findField("id").setValue("");
										userForm.findField("username").setValue("");
										userForm.findField("usercode").setValue("");
										store.load();
										if(window){
											window.hide();
										}
										Ext.Msg.alert("提示",resObj.info);
									}else{
										Ext.Msg.alert("提示",resObj.info);
									}
								}
							});

						}
					},
					"jobgrid button[ref=jobAdd]":{
						click:function(btn) {
							var grid = Ext.getCmp("usergrid");
							var records = grid.getSelectionModel().getSelection();
							if (records.length <= 0) {
								Ext.Msg.alert("提示", "请选择要修改的用户!");
								return;
							}
							//获得增加和删除	列表   无操作 有提示
							var roleGrid = Ext.getCmp("jobgrid");
							var addSelection = roleGrid.getUserGridAdd();
							var gridChecked = roleGrid.getUserGridChecked();
							var removeSelection = roleGrid.getUserGridDelete();
							var flag = false; //改变标志
							var addIds = "",deleteIds = "";
							//遍历集合
							addSelection.each(function(item,index,len){
								//if(!gridChecked.contains(item)){
								addIds += item+ ",";
								flag = true;
								//}
							});
							removeSelection.each(function(item,index,len){
								flag = true;
								deleteIds += item+ ",";
							});
							if(!flag){
								Ext.Msg.alert("提示","数据没有变化!");
								return;
							}
							/*var jobs = grid.getSelectionModel().getSelection();
							 var clean = (jobs.length == 0 ? true : false);
							 var jobId = "";*/
							/*for(var i = 0 ; i<jobs.length ; i++)
							 jobId += jobs[i].data.id + ",";*/
							Ext.Ajax.request({
								url: CY.ns +"/role/roleAction!refreshUserJobs.asp",
								//params:{"dept.id":records[0].data.id,"jobIds":jobId,"jobClean":clean},
								params:{"userId":records[0].data.id,"addIds":addIds,"deleteIds":deleteIds},
								method:"POST",
								timeout:4000,
								success:function(response,opts){
									var resObj=Ext.decode(response.responseText);
									if(resObj.success){
										grid.getStore().load();
										addSelection.clear();
										removeSelection.clear();
										gridChecked.clear();
										Ext.Msg.alert("提示",resObj.info);
									}else{
										Ext.Msg.alert("提示",resObj.info);
									}
								}
							});



						}
					},
					"usergrid": {
						itemclick: function (grid, record, item, index, e, eOpts ) {
							var jobGrid = Ext.getCmp("jobgrid");
							var store=jobGrid.getStore();
							var proxy = store.getProxy();
							proxy.extraParams = {
								userId : record.raw.id
							};
							var addJobSelection = jobGrid.getUserGridAdd();
							var gridJobChecked = jobGrid.getUserGridChecked();
							var removeJobSelection = jobGrid.getUserGridDelete();
							if(0 < addJobSelection.getCount())
								addJobSelection.clear();
							if(0 < removeJobSelection.getCount())
								removeJobSelection.clear();
							if(0 < gridJobChecked.getCount())
								gridJobChecked.clear();
							store.load();


						}
					}
					
				});
			},
			views : ["core.user.view.UserLayout","core.user.view.UserGrid","core.user.view.JobGrid"],
			stores : ["core.user.store.UserStore","core.user.store.JobGridStore"],
			models : ["core.user.model.JobGridModel","core.user.model.UserModel"]
});