Ext.define("core.user.controller.UserController", {
	mixins:{
		gridUtils:"core.utils.GridUtils"
	},
	extend : "Ext.app.Controller",
			init : function() {
				var self = this;
				this.control({
					/**
					 * 添加人员
					 */
					"usergrid button[ref=add]":{
						click:function(btn){
							var grid=self.findGrid(btn);
							var deptForm=grid.up("userlayout").down("deptform").getForm();
							var keyValue=deptForm.findField("deptId").getValue();
							if(!keyValue && keyValue==""){
								Ext.Msg.alert("提示","请选择部门");
							}
							var deptCode=deptForm.findField("deptCode").getValue();
							var deptName=deptForm.findField("deptName").getValue();
							var foreignmodel={deptName:deptName,deptCode:deptCode,'dept.deptId':keyValue}
							self.doInsert(grid,{deptName:deptName,deptCode:deptCode},foreignmodel,"/jbpmItem/pc/userAction","userId");
						}
					},
					/**
					 *删除人员
					 */
					"usergrid button[ref=delete]":{
						click:function(btn){
							var grid=self.findGrid(btn);
							self.doRemove(grid,"userId","/jbpmItem/pc/userAction");
						}
					},
					/**
					 * 更新人员信息
					 */
					"usergrid button[ref=edit]":{
						click:function(btn){
							var grid=self.findGrid(btn);
							self.doSave(grid,"userId","ENDUSER","/jbpmItem/pc/userAction");
						}
					}

					/**
					 * 保存部门信息
					 */
					,"userRolegrid button[ref=userRoleGridAdd]":{
						//部门信息保存
						click:function(btn){
							var dept=btn.up("deptform");
							var deptForm=dept.getForm();
							var deptTree=dept.up("userlayout").down("depttree");
							var treeSign=deptForm.findField("treeSign").getValue();
							/*首先声明保存操作*/
							var actionName="/jbpmItem/pc/deptAction!doSaveTree.action";
							var params={};
							if(treeSign && treeSign!=""){
								//修改								
								actionName="/jbpmItem/pc/deptAction!doUpdateTree.action";
								params.deptId=deptForm.findField("deptId").getValue();
								params.treeSign=deptForm.findField("treeSign").getValue();
							}else{
								//新部门
							}
							var deptName=deptForm.findField("deptName").getValue();
							var deptCode=deptForm.findField("deptCode").getValue();
							var parentId=deptForm.findField("parentId").getValue();
							var leaf=deptForm.findField("leaf").getValue();
							params.deptName=deptName;
							params.deptCode=deptCode;
							params.parentId=parentId;
							params.leaf=leaf;
							params.idName="deptId";
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
										var obj=resObj.obj;
										deptForm.findField("deptId").setValue(obj["deptId"]);
										deptForm.findField("deptName").setValue(obj["deptName"]);
										deptForm.findField("deptCode").setValue(obj["deptCode"]);
										deptForm.findField("parentId").setValue(obj["parentId"]);
										deptForm.findField("treeSign").setValue(obj["treeSign"]);
										deptForm.findField("leaf").setValue(obj["treeSign"]);
										deptTree.getStore().load();
										Ext.Msg.alert("提示","修改成功");
									}else{
										Ext.Msg.alert("提示","修改失败");
									}
								}
							});
						}
					}
					
				});
			},
			views : ["core.user.view.UserGrid","core.user.view.UserRoleGrid","core.user.view.UserLayout"],
			stores : ["core.user.store.UserStore","core.user.store.UserRoleGridStore"],
			models : ["core.user.model.UserModel"]
});