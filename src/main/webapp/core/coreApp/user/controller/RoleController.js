Ext.define("core.user.controller.RoleController", {
	extend : "Ext.app.Controller",
			init : function() {
				var self = this;
				this.control({
					"usergrid button[ref=roleAdd]":{
						click:function(btn){
							var roleTree=btn.up("rolelayout").down("roletree");
							var records=roleTree.getSelectionModel().getSelection();
							if(records.length<=0){
								Ext.Msg.alert("提示","请选择角色");
								return;
							}			
							Ext.create("core.user.view.DeptUserWindow").show();
						}
					},
					"usergrid button[ref=roleDelete]":{
						click:function(btn){
							var grid=btn.up("usergrid");
							var roleForm=grid.up("rolelayout").down("roleform").getForm();
							var records=grid.getSelectionModel().getSelection();
							var roleId=roleForm.findField("roleId").getValue();
							var roleCode=roleForm.findField("roleCode").getValue();
							var roleName=roleForm.findField("roleName").getValue();
							if(records.length<=0){
								Ext.Msg.alert("提示","请选择用户");
								return;
							}
							if(roleId==null || roleId==""){
								Ext.Msg.alert("提示","角色信息获取错误");
								return;
							}
							var ids=[];
							Ext.Array.each(records,function(model){
								var idValue=model.get("userId");
								if(idValue && idValue!=""){
									ids.push("'"+idValue+"'");
								}
							});
							var strData=" delete ROLE_USER where ROLEID='"+roleId+"' and USERID in ("+ids.join(",")+")";
							Ext.Ajax.request({
								url:"/jbpmItem/pc/roleAction!deleteUsers.action",
								params:{strData:strData,ids:ids.join(","),roleCode:roleCode,roleName:roleName},
								method:"POST",
								timeout:4000,
								success:function(response,opts){
									var resObj=Ext.decode(response.responseText);
									if(resObj.success){
										grid.getStore().load();
										Ext.Msg.alert("提示",resObj.obj);
									}else{
										Ext.Msg.alert("提示",resObj.obj);
									}
								}
							});
						}
					},
					//节点点击事件
					"roletree":{
						itemclick:function(tree,record,item,index,e,eOpts){
							var treeForm=tree.up("rolelayout").down("roleform").getForm();
							var store=tree.up("rolelayout").down("usergrid").getStore();
							if(record.raw){
								treeForm.findField("roleId").setValue(record.raw.id);
								treeForm.findField("roleName").setValue(record.raw.text);
								treeForm.findField("roleCode").setValue(record.raw.code);
								treeForm.findField("nodeInfo").setValue(record.raw.nodeInfo);
								var proxy = store.getProxy();
									whereSql = " and roleCodes like '%"+record.raw.code+"%'";
									proxy.extraParams = {
										whereSql : whereSql
								};
								store.load();
							}else{
								treeForm.findField("roleId").setValue(record.data.id);
								treeForm.findField("roleName").setValue(record.data.text);
								treeForm.findField("roleCode").setValue("");
								treeForm.findField("nodeInfo").setValue("");
							}
							tree=tree.up("rolelayout").down("roletree");
							var delBtn=tree.down("button[ref=treeDel]");
							delBtn.setDisabled(false);
						}
					},
					"roletree button[ref=treeIns]":{
						click:function(btn){
							//添加部门
							var tree=btn.up("roletree");
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
					"roletree button[ref=treeDel]":{
						//删除角色
						click:function(btn){
							var tree=btn.up("roletree");
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
								url:"/jbpmItem/pc/roleAction!doDelete.action",
								params:{ids:"'"+id+"'",idName:"roleId"},
								method:"POST",
								timeout:4000,
								success:function(response,opts){
									var resObj=Ext.decode(response.responseText);
									if(resObj.success){
										tree.getStore().load();
										var roleForm=tree.up("rolelayout").down("roleform").getForm();
										roleForm.findField("roleId").setValue("");
										roleForm.findField("roleName").setValue("");
										roleForm.findField("roleCode").setValue("");
										roleForm.findField("nodeInfo").setValue("");
										
										Ext.Msg.alert("提示",resObj.obj);
									}else{
										Ext.Msg.alert("提示",resObj.obj);
									}
								}
							});
						}
					}
					,"roleform button[ref=submit]":{
						//角色信息保存
						click:function(btn){
							var role=btn.up("roleform");
							var roleForm=role.getForm();
							var roleTree=role.up("rolelayout").down("roletree");
							var nodeInfo=roleForm.findField("nodeInfo").getValue();
							var actionName="/jbpmItem/pc/roleAction!doSave.action";
							var params={};
							if(nodeInfo && nodeInfo!=""){
								//修改								
								actionName="/jbpmItem/pc/roleAction!doUpdate.action";
								params.roleId=roleForm.findField("roleId").getValue();
							}else{
								//新部门
							}
							var roleName=roleForm.findField("roleName").getValue();
							var roleCode=roleForm.findField("roleCode").getValue();
							params.roleName=roleName;
							params.roleCode=roleCode;
							params.idName="roleId";
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
										roleForm.findField("roleId").setValue(obj["roleId"]);
										roleForm.findField("roleName").setValue(obj["roleName"]);
										roleForm.findField("roleCode").setValue(obj["roleCode"]);
										roleForm.findField("nodeInfo").setValue(obj["nodeInfo"]);
										roleTree.getStore().load();
										Ext.Msg.alert("提示","修改成功");
									}else{
										Ext.Msg.alert("提示","修改失败");
									}
								}
							});
						}
					},
					"deptuserwindow button[ref=cal]":{
						click:function(btn){
							var window=btn.up("deptuserwindow");
							window.close();
						}
					},
					"deptuserwindow button[ref=submit]":{
						click:function(btn){
							var window=btn.up("deptuserwindow");
							var tree=window.down("deptusertree");
							var roleForm=Ext.getCmp("rolelayout").down("roleform").getForm();
							var roleCode=roleForm.findField("roleCode").getValue();
							var roleId=roleForm.findField("roleId").getValue();
							var roleName=roleForm.findField("roleName").getValue();
							var params={};
							params.roleId=roleId;
							if(roleId==null || roleId==""){
								Ext.Msg.alert("提示","此角色还未存在，请保存!")
							}
							params.roleName=roleName;
							params.roleCode=roleCode;
							var ids=new Array();
							var records=tree.getChecked();
							if(records.length>0){
								Ext.each(records,function(model){
									if(model.raw["nodeInfo"]=="user"){
										ids.push("'"+model.data["id"]+"'");
									}
								});
							
							if(ids.length>0){
								params.ids=ids.join(",");
									Ext.Ajax.request({
									url:"/jbpmItem/pc/roleAction!addUsers.action",
									params:params,
									method:"POST",
									timeout:4000,
									success:function(response,opts){
										var resObj=Ext.decode(response.responseText);
										if(resObj.success){
											window.hide();
											Ext.getCmp("rolelayout").down("usergrid").getStore().load();
											Ext.Msg.alert("提示",resObj.obj);
										}else{
											Ext.Msg.alert("提示",resObj.obj);
										}
									}
								});
							}
							}else{
								Ext.Msg.alert("提示","请选择用户");
							}
						}
					},
					"deptusertree":{
						checkchange:function(node,checked,eOpts){
						if(node.data.leaf==false){
						if(checked){
							//首先打开节点
							node.expand();
								//遍历孩子  如果孩子不是叶子，可以用findChild  和isLeaf两个方法来配合使用递归
								node.eachChild(function(n){
									n.data.checked=true;
									n.updateInfo({checked:true});
								});
							}else{
								node.expand();
									//遍历孩子  如果孩子不是叶子，可以用findChild  和isLeaf两个方法来配合使用递归
									node.eachChild(function(n){
										n.data.checked=false;
										n.updateInfo({checked:false});
									});
							}
						}else{//单击叶子
							if(!checked){
								node.parentNode.data.checked=false;
								node.parentNode.updateInfo({checked:false});
							}
						}
						}					
					}
				});
			},
			views : ["core.user.view.RoleForm","core.user.view.RoleTree","core.user.view.UserGrid","core.user.view.RoleLayout","core.user.view.DeptUserTree","core.user.view.DeptUserWindow"],
			stores : ["core.user.store.UserStore","core.user.store.RoleStore","core.user.store.DeptUserStore"],
			models : ["core.user.model.UserModel","core.user.model.DeptUserModel"]
});