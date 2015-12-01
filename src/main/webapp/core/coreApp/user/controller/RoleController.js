Ext.define("core.user.controller.RoleController", {
	extend : "Ext.app.Controller",
			init : function() {
				var self = this;
				this.control({
					/*添加角色*/
					"rolesgrid button[ref=add]":{
						click:function(btn){
							var window = Ext.getCmp("rolewindow");
							if(window){
								window.show();
							}else{
								Ext.create("core.user.view.RoleWindow").show();
							}
						}
					},
					/*修改角色*/
					"rolesgrid button[ref=edit]":{
						click:function(btn){
							var grid=btn.up("rolesgrid");
							var records=grid.getSelectionModel().getSelection();
							if(records.length <= 0){
								Ext.Msg.alert("提示","请选择要修改的角色!");
								return;
							}
							var window = Ext.getCmp("rolewindow");
							if(window){
								window.show();
							}else{
								window = Ext.create("core.user.view.RoleWindow").show();
							}
							var roleForm = window.down("roleform").getForm();
							roleForm.findField("roleName").setValue(records[0].data.name);
							roleForm.findField("roleCode").setValue(records[0].data.code);
							roleForm.findField("roleId").setValue(records[0].data.id);
						}
					},
					/*删除角色*/
					"rolesgrid button[ref=delete]":{
						click:function(btn){
							var grid=btn.up("rolesgrid");
							var records=grid.getSelectionModel().getSelection();
							if(records.length <= 0){
								Ext.Msg.alert("提示","请选择要删除的角色!");
								return;
							}
							var param = {};
							param.msg = '删除角色,对应的岗位也会被删除.您确定您的操作?';
							param.fn = function(result) {
								if ("yes" == result) {
									Ext.Ajax.request({
										url: CY.ns + "/role/roleAction!deleteRole.asp",
										params: {"role.id": records[0].data.id},
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
					//节点点击事件
					/*"roletree":{
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
					},*/
					/*"roletree button[ref=treeDel]":{
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
					},*/
					"rolewindow button[ref=submit]":{
						//角色信息保存
						click:function(btn){
							var window=btn.up("rolewindow");
							var role=window.down("roleform");
							var roleForm=role.getForm();
							if(!roleForm.isValid()){
								Ext.Msg.alert('提示','请认真完成表单...');
								return;
							}
							var store=Ext.getCmp("rolesgrid").getStore();
							var roleId = roleForm.findField("roleId").getValue();
							var params={};
							var actionName= CY.ns + "/role/roleAction!saveRole.asp";
							if(roleId && roleId !== ""){
								//修改
								actionName = CY.ns + "/role/roleAction!updateRole.asp";
								params["role.id"] = roleId;
							}
							var roleName = roleForm.findField("roleName").getValue();
							var roleCode = roleForm.findField("roleCode").getValue();
							params["role.name"]=roleName;
							params["role.code"]=roleCode;
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
										roleForm.findField("roleId").setValue("");
										roleForm.findField("roleName").setValue("");
										roleForm.findField("roleCode").setValue("");
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
					/*"deptuserwindow button[ref=cal]":{
						click:function(btn){
							var window=btn.up("deptuserwindow");
							window.close();
						}
					},*/
					/*"deptuserwindow button[ref=submit]":{
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
					},*/
					/*"deptusertree":{
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
					}*/
				});
			},
			views : ["core.user.view.RoleForm","core.user.view.RoleLayout",/*"core.user.view.DeptUserTree","core.user.view.DeptUserWindow"*/"core.user.view.RolesGrid"],
			stores : [/*"core.user.store.UserStore","core.user.store.RoleStore","core.user.store.DeptUserStore",*/"core.user.store.RolesGridStore"],
			models : [/*"core.user.model.UserModel","core.user.model.DeptUserModel",*/"core.user.model.RoleGridModel"]
});