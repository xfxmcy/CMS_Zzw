Ext.define("core.jbpm.controller.WfDeployController", {
	extend : "Ext.app.Controller",
			init : function() {
				var self = this;
				this.control({
					"deploygrid button[ref=uploadDeploy]":{
						click:function(btn){
							var grid=btn.up("deploygrid");
							var store=grid.getStore();
							var records=grid.getSelectionModel().getSelection();
							/*显示上传   window*/
							var window = Ext.getCmp("upProcessDefinitionWindow");
							if(window){
								window.show();
							}else{
								Ext.create("core.jbpm.view.UploadPDWindow").show();
							}
							
						}
					},
					"deploygrid button[ref=addDeploy]":{
						click:function(btn){
							
							var grid=btn.up("deploygrid");
							
							var mainView=grid.up("centerview");
							var mainController = this.application.getController("core.app.controller.MainController");
						
							var store=grid.getStore();
							var records=grid.getSelectionModel().getSelection();
							if(records==null || records.length<=0){
								Ext.Msg.alert("提示","请选择数据");
							}
							var obj=records[0];
							var param = {};
				
							param.fn = function(result){
								if("yes" == result){
									Ext.Ajax.request({
										url:CY.ns + '/workflow/wkAction!delpoyProcessDefinition.asp',
										params:{id:obj.data.id},
										method:"POST",
										timeout:4000,
										success:function(response,opts){
											var resObj=Ext.decode(response.responseText);
											if(resObj.success){
												store.load();
												var funGrid=grid.up("centerview").down("processgrid");
												if(funGrid!=null){
													funGrid.getStore().load();
												}
												Ext.Msg.alert("提示",resObj.info);
												/*切换   流程部署panel*/
												mainController.addFunItem({
													mainView:mainView,
													funViewXtype:"processlayout",
													funController:"core.jbpm.controller.WfProcessController",
													funViewName:"core.jbpm.view.ProcessLayout"
												});
											}else{
												Ext.Msg.alert("提示",resObj.info);									
											}
										}
									});
								}
								
							};
							CY.confirmBox(param);
						}
					},
					"deploygrid button[ref=calDeploy]":{
						click:function(btn){
							var grid=btn.up("deploygrid");
							var store=grid.getStore();
							var records=grid.getSelectionModel().getSelection();
							if(records==null || records.length<=0){
								Ext.Msg.alert("提示","请选择数据");
								return ;
							}
							var obj=records[0];
							var param = {};
							param.msg = ( null == obj.data.processDefinitionId || "" == obj.data.processDefinitionId ) ? 
									"您确认您的操作?该操作不可回滚" : "该流程已经部署,删除后,流程定义,实例,任务都会被删除,您是否确认删除?"; 
							param.fn = function(result){
								if("yes" == result){
									Ext.Ajax.request({
										url:CY.ns + '/workflow/wkAction!deleteJPDL.asp',
										params:obj.data,
										method:"POST",
										timeout:4000,
										success:function(response,opts){
											var resObj=Ext.decode(response.responseText);
											if(resObj.success){
												store.load();
												var funGrid=grid.up("centerview").down("processgrid");
												if(funGrid!=null){
													funGrid.getStore().load();
												}
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
					},
					/*上传jpdl*/
					"upProcessDefinitionWindow button[ref=submitPD]":{
						click:function(btn){
							var dis=Ext.getCmp("displaylogin");
							var window = Ext.getCmp("upProcessDefinitionWindow");
							var form ;
							var box ;
							var param = {};
							param.fn = function(result){
								if("yes" == result){
									box	= CY.processBox();
									/*上传工作*/
									form.submit({       
							            url:CY.ns + '/workflow/wkAction!uploadJPDL.asp',   
							            success: function(form, action){ 
							            	box.closeCY();
							            	dis.up("mainview").down("deploygrid").getStore().load();
							            	//Ext.getCmp("deploygrid").getStore().load();
							            	Ext.Msg.alert('Success', action.result.info);
							   
							            },
							            failure: function(form, action){ 
							            	box.closeCY();	
							            	Ext.Msg.alert('Error', action.result.info);
							            }   
									});
								}
							};
							if(window){
								form =  btn.up('form').getForm();
								if(form.isValid()){
								    CY.confirmBox(param);
								}	
								else
									Ext.Msg.alert('提示','请认真完成表单...');   
							}
							
						}
					}
				});
				
			},
			views : ["core.jbpm.view.DeployGrid","core.jbpm.view.DeployLayout"],
			stores : ["core.jbpm.store.DeployStore"],
			models : ["core.jbpm.model.DeployModel"]
});/*,"core.jbpm.view.UploadPDWindow"*/
