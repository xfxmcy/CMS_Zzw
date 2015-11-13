Ext.define("core.user.controller.DeptController", {
	mixins:{
		gridUtils:"core.utils.GridUtils"
	},
	extend : "Ext.app.Controller",
			init : function() {
				var self = this;
				this.control({
					/**
					 * 添加人员   useless
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
					 *删除人员  useless
					 */
					"usergrid button[ref=delete]":{
						click:function(btn){
							var grid=self.findGrid(btn);
							self.doRemove(grid,"userId","/jbpmItem/pc/userAction");
						}
					},
					/**
					 * 更新人员信息 useless
					 */
					"usergrid button[ref=save]":{
						click:function(btn){
							var grid=self.findGrid(btn);
							self.doSave(grid,"userId","ENDUSER","/jbpmItem/pc/userAction");
						}
					},
					/**
					 * 更新岗位
					 */
					"rolegrid button[ref=roleGridAdd]":{
						click:function(btn){
							var grid=self.findGrid(btn);
							//查看item 是否选中
							var tree=btn.ownerCt.ownerCt.up("deptlayout").down("depttree");
							var records = tree.getSelectionModel().getSelection();
							if(!records || 0 === records.length){
								Ext.Msg.alert("提示","请先选中部门,再进行岗位选择!");
								return;
							}
							//获得增加和删除	列表   无操作 有提示
							var roleGrid = Ext.getCmp("rolegrid");
							var addSelection = roleGrid.getGridAdd();
							var gridChecked = roleGrid.getGridChecked();
							var removeSelection = roleGrid.getGridDelete();
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
								url: CY.ns +"/dept/deptAction!refreshJobs.asp",
								//params:{"dept.id":records[0].data.id,"jobIds":jobId,"jobClean":clean},
								params:{"dept.id":records[0].data.id,"addIds":addIds,"deleteIds":deleteIds},
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
								treeForm.findField("treeSign").setValue("1"); //1就是修改
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
								//清空分页checked
								var roleGrid = Ext.getCmp("rolegrid");
								var addSelection = roleGrid.getGridAdd();
								var removeSelection = roleGrid.getGridDelete();
								var gridChecked = roleGrid.getGridChecked();
								addSelection.clear();
								removeSelection.clear();
								gridChecked.clear();
							}else{
								//未知  什么情况进入 else
								treeForm.findField("deptId").setValue(record.data.id);
								treeForm.findField("deptName").setValue(record.data.text);
								treeForm.findField("deptCode").setValue("");
								treeForm.findField("treeSign").setValue("0");// 0是增加
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
													parentId:"-1",
													leaf : true
												});
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
								Ext.Msg.alert("提示","不能为未存在的部门添加");
								return;
							}
							// 将leaf属性改变
							parentNode.data["leaf"] = false;
							//parentNode.updateInfo();
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
							var id=records[0].data.id;
							var parentId = records[0].data.parentId;
							//撤销刚添加的节点
							if(!id || id === ""){
								//tree 删除根节点
								if("-1" === parentId){
									var rootNode = tree.getStore().getRootNode();
									rootNode.removeChild(records[0]);
								}else{
									var parentNode = tree.getStore()
									.getNodeById(parentId);
									parentNode.removeChild(records[0]);
								}
								//tree.getStore().load();
								var deptForm=tree.up("deptlayout").down("deptform").getForm();
								deptForm.findField("deptId").setValue("");
								deptForm.findField("deptName").setValue("");
								deptForm.findField("deptCode").setValue("");
								deptForm.findField("parentId").setValue("");
								deptForm.findField("treeSign").setValue("");
								Ext.Msg.alert("提示","删除成功!");
								return;
							}
							
							
							if(records.length<1){
								Ext.Msg.alert("提示","请选择部门");
								return;
							}
							if(!records[0].raw){
								Ext.Msg.alert("提示","不能删除未存在部门");
								return;
							}
							
							var param = {};
							param.msg = '删除部门,会级联删除子部门,以及对应的岗位.您确定删除该部门?';
							param.fn = function(result){
								if("yes" == result){
									Ext.Ajax.request({
										url: CY.ns +"/dept/deptAction!deleteDept.asp",
										params:{"dept.id":id},
										method:"POST",
										timeout:4000,
										success:function(response,opts){
											var resObj=Ext.decode(response.responseText);
											if(resObj.success){
												tree.getStore().load();
												var deptForm=tree.up("deptlayout").down("deptform").getForm();
												deptForm.findField("deptId").setValue("");
												deptForm.findField("deptName").setValue("");
												deptForm.findField("deptCode").setValue("");
												deptForm.findField("parentId").setValue("");
												deptForm.findField("treeSign").setValue("");
												//deptForm.findField("leaf").setValue("");
												Ext.Msg.alert("提示",resObj.info);
											}else{
												Ext.Msg.alert("提示",resObj.info);
											}
										}
									});
								}
								
							};
							CY.confirmBox(param);
							
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
							var deptTree=dept.up("deptlayout").down("depttree");
							var treeSign=deptForm.findField("treeSign").getValue();
							/*首先声明保存操作*/
							var actionName = CY.ns + "/dept/deptAction!saveDept.asp";
							var params={};
							var deptId = deptForm.findField("deptId").getValue();
							if(deptId && deptId !== ""){
								//修改								
								actionName = CY.ns + "/dept/deptAction!updateDept.asp";
								params["dept.id"] = deptId;
							}
							if(!treeSign && treeSign === ""){
								//直接点击保存
								Ext.Msg.alert("提示","请先选择部门结构!");
								return;
							}
							var deptName=deptForm.findField("deptName").getValue();
							var deptCode=deptForm.findField("deptCode").getValue();
							var parentId=deptForm.findField("parentId").getValue();
							var leaf=deptForm.findField("leaf").getValue();
							params["dept.name"]=deptName;
							params["dept.code"]=deptCode;
							// -1 是根节点
							if(parentId && parentId !== "" && parentId !== "-1")
								params["dept.department.id"]=parentId;
							//params.leaf=leaf;
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
										var obj=resObj.result;
										deptForm.findField("deptId").setValue(obj["id"]);
										deptForm.findField("deptName").setValue(obj["name"]);
										deptForm.findField("deptCode").setValue(obj["code"]);
										if(parentId && parentId !== "" && parentId !== "-1")
											deptForm.findField("parentId").setValue((obj["department"])["id"]);
										if(parentId && parentId !== "" && parentId === "-1")
											deptForm.findField("parentId").setValue("-1");
										deptForm.findField("treeSign").setValue("1");
										//deptForm.findField("leaf").setValue(obj["treeSign"]);
										deptTree.getStore().load();
										Ext.Msg.alert("提示",resObj.info);
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