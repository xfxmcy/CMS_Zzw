Ext.define("core.app.controller.MainController", {
	extend : "Ext.app.Controller",
			init : function() {
				var self = this;
				/**
				 * 动态加载controller并渲染它的主窗体
				 */
				this.addFunItem=function(funInfo){
					if(funInfo){
						var mainView=funInfo.mainView;
						var funPanel=mainView.down(funInfo.funViewXtype);
						if(!funPanel){
							self.application.getController(funInfo.funController).init();
							funPanel=Ext.create(funInfo.funViewName);
							mainView.add(funPanel);
							mainView.setActiveTab(funPanel);
						}else{									
							mainView.setActiveTab(funPanel);
						}
					}
				},
					
				//	Ext.create("core.app.view.LoginWindow").show();
				this.control({
					"westview treepanel":{
						itemclick:function(tree,record,item,index,e,eOpts){
							var mainView=tree.up("mainview").down("centerview");
							/**部门人员管理*/
							if(record.data["id"]=="dept-user"){
								self.addFunItem({
									mainView:mainView,
									funViewXtype:"userlayout",
									funController:"core.user.controller.UserController",
									funViewName:"core.user.view.UserLayout"
								});
							/**角色人员管理*/
							}else if(record.data["id"]=="role-user"){
								self.addFunItem({
									mainView:mainView,
									funViewXtype:"rolelayout",
									funController:"core.user.controller.RoleController",
									funViewName:"core.user.view.RoleLayout"
								});
							}else if(record.data["id"]=="deployment"){
								self.addFunItem({
									mainView:mainView,
									funViewXtype:"deploylayout",
									funController:"core.jbpm.controller.WfDeployController",
									funViewName:"core.jbpm.view.DeployLayout"
								});
							}else if(record.data["id"]=="process"){
								self.addFunItem({
									mainView:mainView,
									funViewXtype:"processlayout",
									funController:"core.jbpm.controller.WfProcessController",
									funViewName:"core.jbpm.view.ProcessLayout"
								});
							}else if(record.data["id"]=="borrowMoney"){
								self.addFunItem({
									mainView:mainView,
									funViewXtype:"borrowlayout",
									funController:"core.oa.controller.BorrowMoneyController",
									funViewName:"core.oa.view.BorrowLayout"
								});
							}
						}
					},
					"topview button[ref=login]":{
							click:function(btn){
								var window=Ext.getCmp("loginwindow");
								if(window){
									window.show();
								}else{
									Ext.create("core.app.view.LoginWindow").show();
								}
							}
						},
					"topview button[ref=exit]":{
							click:function(btn){
								/*var form=Ext.getCmp("loginwindow").down("form[ref=loginform]").getForm();
					 			var userName=form.findField("userName").getValue();
					 			var passWord=form.findField("password").getValue();*/
								Ext.Ajax.request({
								url:CY.ns + "/sys/loginAction!userLogout.asp",
								//params:{userCode:userName,passWord:passWord},
								method:"POST",
								timeout:4000,
								success:function(response,opts){
									var resObj=Ext.decode(response.responseText);
									var resultInfo = resObj.resultInfo;
									if(resultInfo.success){
										var dis=Ext.getCmp("displaylogin");
										dis.setValue("<font color=black><b>未登录</b></font>");
										//dis.up("mainview").down("taskjobgrid").getStore().load();
										//Ext.create("core.app.view.LoginWindow").show();
										var window=Ext.getCmp("loginwindow");
										if(window){
											window.show();
										}else{
											Ext.create("core.app.view.LoginWindow").show();
										}
									}else{
										Ext.Msg.alert("提示",resultInfo.info);
									}
								
								}
								});
							}
						},
					 "loginwindow button[ref=login]":{
					 	click:function(btn){
					 		var form=btn.up("form[ref=loginform]").getForm();
					 		var userName=form.findField("userName").getValue();
					 		var passWord=form.findField("password").getValue();
					 		Ext.Ajax.request({
								url:CY.ns + "/sys/loginAction!userLogin.asp",
								params:{'user.username':userName,'user.password':passWord},
								method:"POST",
								timeout:4000,
								success:function(response,opts){
									var resObj=Ext.decode(response.responseText);
									var resultInfo = resObj.resultInfo;
									if(resultInfo.success){
										var userObj=resultInfo.result;
										var dis=Ext.getCmp("displaylogin");
										dis.up("mainview").down("taskjobgrid").getStore().load();
										dis.setValue("<font color=black><b>" + userName+"->"+userName+"</b></font>");
										//btn.up("loginwindow").close();
										btn.up("loginwindow").hide();
									}else{
										Ext.Msg.alert("提示",resultInfo.info);
									}
								}
					 		});
					 	}
					 }
					
				});
				
			},
			views : ["core.app.view.CenterView", "core.app.view.WestView","core.app.view.TopView", "core.app.view.MainView","core.app.view.LoginWindow","core.app.view.TaskJobGrid","core.jbpm.view.UploadPDWindow"],
			stores : ["core.app.store.TaskJobStore"],
			models : ["core.app.model.TaskJobModel"]
});

						