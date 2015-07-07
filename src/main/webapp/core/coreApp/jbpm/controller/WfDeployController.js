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
							/*var grid=btn.up("deploygrid");
							var store=grid.getStore();
							var records=grid.getSelectionModel().getSelection();
							if(records==null || records.length<=0){
								Ext.Msg.alert("提示","请选择数据");
							}
							var obj=records[0];
							Ext.Ajax.request({
								url:"/jbpmItem/pc/wfDeploymentAction!deployment.action",
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
										Ext.Msg.alert("提示",resObj.obj);
									}else{
										Ext.Msg.alert("提示",resObj.obj);									
									}
								}
							});*/
						}
					},
					"deploygrid button[ref=calDeploy]":{
						click:function(btn){
							var grid=btn.up("deploygrid");
							var store=grid.getStore();
							var records=grid.getSelectionModel().getSelection();
							if(records==null || records.length<=0){
								Ext.Msg.alert("提示","请选择数据");
							}
							var obj=records[0];
							Ext.Ajax.request({
								url:"/jbpmItem/pc/wfDeploymentAction!clearDeployment.action",
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
										Ext.Msg.alert("提示",resObj.obj);
									}else{
										Ext.Msg.alert("提示",resObj.obj);									
									}
								}
							});
						}
					},
					/*上传jpdl*/
					"upProcessDefinitionWindow button[ref=submitPD]":{
						click:function(btn){
							
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
							                
							   
							            },
							            failure: function(form, action){       
							            	 alert("jinbulaima");
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