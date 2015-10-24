Ext.define("core.user.controller.DeptController", {
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
					"usergrid button[ref=save]":{
						click:function(btn){
							var grid=self.findGrid(btn);
							self.doSave(grid,"userId","ENDUSER","/jbpmItem/pc/userAction");
						}
					},
					/**
					 * 部门树形节点点击
					 */
					"depttree":{
						itemclick:function(tree,record,item,index,e,eOpts){
							//节点点击事件
							var treeForm=tree.up("deptlayout").down("deptform").getForm();
							var store=tree.up("deptlayout").down("rolegrid").getStore();
							if(record.raw){
								treeForm.findField("deptId").setValue(record.raw.id);
								treeForm.findField("deptName").setValue(record.raw.text);
								treeForm.findField("deptCode").setValue(record.raw.code);
								treeForm.findField("treeSign").setValue(record.raw.description);
								treeForm.findField("parentId").setValue(record.raw.parent);
								treeForm.findField("leaf").setValue(record.raw.leaf);
								/*var proxy = store.getProxy();
									whereSql = " and deptCode='"+record.raw.code+"'";
									proxy.extraParams = {
										whereSql : whereSql
								};*/
								var proxy = store.getProxy();
								proxy.extraParams = {
									deptId : record.raw.id
								};
								store.load();
							}else{
								treeForm.findField("deptId").setValue(record.data.id);
								treeForm.findField("deptName").setValue(record.data.text);
								treeForm.findField("deptCode").setValue("");
								treeForm.findField("treeSign").setValue("");
								treeForm.findField("parentId").setValue(record.data.parentId);
								treeForm.findField("leaf").setValue(record.data.leaf);
							}
							tree=tree.up("deptlayout").down("depttree");
							var addChildBtn=tree.down("button[ref=treechildIns]");
							var delBtn=tree.down("button[ref=treeDel]");
							addChildBtn.setDisabled(false);
							delBtn.setDisabled(false);
						}
					},
					/**
					 * 为根节点添加部门
					 */
					"depttree button[ref=treeIns]":{
						click:function(btn){
							//添加部门
							var tree=btn.up("depttree");
							var rootNode = tree.getStore()
												.getRootNode(); // 得到根节点
							rootNode.appendChild({
													text :"",
													parentId:"root",
													leaf : true
												});
							//
												
						}
					},
					/**
					 * 为指定部门添加子部门
					 */
					"depttree button[ref=treechildIns]":{
						//添加子部门
						click:function(btn){
							var tree=btn.up("depttree");
							var records = tree.getSelectionModel().getSelection();
							if(records.length<1){
								Ext.Msg.alert("提示","选择父部门");
								return;
							}
							var parentId=records[0].data.id;
							var parentNode = tree.getStore()
												.getNodeById(parentId);
							if(!parentNode){
								Ext.Msg.alert("提示","不能为未存在的部门添加")
								return;
							}
							// 将leaf属性改变
							parentNode.data["leaf"] = false;
							parentNode.updateInfo();
							// 给它加一个孩子节点
							parentNode.appendChild({
														parent:parentId,
														leaf : true
													});
							parentNode.expand(); // 打开父节点
							}
					},
					/**
					 * 删除部门
					 */
					"depttree button[ref=treeDel]":{
						//删除部门
						click:function(btn){
							var tree=btn.up("depttree");
							var records = tree.getSelectionModel().getSelection();
							if(records.length<1){
								Ext.Msg.alert("提示","请选择部门");
								return;
							}
							if(!records[0].raw){
								Ext.Msg.alert("提示","不能删除未存在部门");
								return;
							}
							var id=records[0].data.id;
							Ext.Ajax.request({
								url:"/jbpmItem/pc/deptAction!doDeleteTree.action",
								params:{ids:id,idName:"deptId"},
								method:"POST",
								timeout:4000,
								success:function(response,opts){
									var resObj=Ext.decode(response.responseText);
									if(resObj.success){
										tree.getStore().load();
										var deptForm=tree.up("userlayout").down("deptform").getForm();
										deptForm.findField("deptId").setValue("");
										deptForm.findField("deptName").setValue("");
										deptForm.findField("deptCode").setValue("");
										deptForm.findField("parentId").setValue("");
										deptForm.findField("treeSign").setValue("");
										deptForm.findField("leaf").setValue("");
										Ext.Msg.alert("提示",resObj.obj);
									}else{
										Ext.Msg.alert("提示",resObj.obj);
									}
								}
							});
						}
					}
					/**
					 * 保存部门信息
					 */
					,"deptform button[ref=submit]":{
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
			views : ["core.user.view.DeptForm","core.user.view.DeptTree","core.user.view.DeptLayout","core.user.view.RoleGrid"],//
			stores : ["core.user.store.DeptStore","core.user.store.RoleGridStore"],
			models : ["core.user.model.RoleGridModel"]
});