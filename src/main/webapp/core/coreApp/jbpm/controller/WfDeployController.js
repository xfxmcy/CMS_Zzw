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
								console.info("create");
								Ext.create("core.jbpm.view.UploadPDWindow").show();
							}
							
						}
					},
					"deploygrid button[ref=addDeploy]":{
						click:function(btn){
							var grid=btn.up("deploygrid");
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
							});
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
					"upProcessDefinitionWindow button[ref=submitPD]":{
						click:function(btn){
							alert("nani2");
							var window = Ext.getCmp("upProcessDefinitionWindow");
							if(window){
								//window.hide();
							}
						}
					}
				});
			},
			views : ["core.jbpm.view.DeployGrid","core.jbpm.view.DeployLayout"/*,"core.jbpm.view.UploadPDWindow"*/],
			stores : ["core.jbpm.store.DeployStore"],
			models : ["core.jbpm.model.DeployModel"]
});