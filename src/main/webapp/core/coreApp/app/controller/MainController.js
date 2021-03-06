Ext.define("core.app.controller.MainController", {
	extend : "Ext.app.Controller",
	mixins : {
		cyUtils : "core.utils.CyUtils"
	},
			init : function() {
				var self = this;
				//用户已经登录
				/*if(CY.user.username){
					var dis = Ext.getCmp("displaylogin");
					dis.setValue("<font color=black><b>"+CY.user.username+"->"+CY.user.name+"</b></font>");
				}*/
				/**
				 * 动态加载controller并渲染它的主窗体
				 */
				this.addFunItem=function(funInfo){
					if(funInfo){
						var mainView=funInfo.mainView;
						var funPanel=mainView.down(funInfo.funViewXtype);
						if(!funPanel){
							self.application.getController(funInfo.funController);
							// .init()
							funPanel=Ext.create(funInfo.funViewName);
							mainView.add(funPanel);
							mainView.setActiveTab(funPanel);
							// grid
							/*if(funInfo.gridXtype){
								var grid = mainView.down(funInfo.gridXtype);
								var store=grid.getStore();
								store.load();
							}*/
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
							/**部门管理*/
							if(record.data["id"]=="dept-user"){
								self.addFunItem({
									mainView:mainView,
									funViewXtype:"deptlayout",
									funController:"core.user.controller.DeptController",
									funViewName:"core.user.view.DeptLayout"
								});
							/*角色管理*/
							}else if(record.data["id"]=="role-user"){
								self.addFunItem({
									mainView:mainView,
									funViewXtype:"rolelayout",
									funController:"core.user.controller.RoleController",
									funViewName:"core.user.view.RoleLayout"
								});
							/**人员管理*/
							}else if(record.data["id"]=="user-user"){
								self.addFunItem({
									mainView:mainView,
									funViewXtype:"userlayout",
									funController:"core.user.controller.UserController",
									funViewName:"core.user.view.UserLayout"
								});
							}
							else if(record.data["id"]=="deployment"){
								self.addFunItem({
									mainView:mainView,
									funViewXtype:"deploylayout",
									funController:"core.jbpm.controller.WfDeployController",
									//gridXtype:"deploygrid",
									funViewName:"core.jbpm.view.DeployLayout"
								});
							}else if(record.data["id"]=="process"){
								self.addFunItem({
									mainView:mainView,
									funViewXtype:"processlayout",
									funController:"core.jbpm.controller.WfProcessController",
									//gridXtype:"processgrid",
									funViewName:"core.jbpm.view.ProcessLayout"
								});
							}else if(record.data["id"]=="buyCar"){
								self.addFunItem({
									mainView:mainView,
									funViewXtype:"borrowlayout",
									funController:"core.oa.controller.BorrowMoneyController",
									funViewName:"core.oa.view.BorrowLayout"
								});
							}else if(record.data["id"]=="alreadyTask"){
								self.addFunItem({
									mainView:mainView,
									funViewXtype:"alreadyTaskLayout",
									funController:"core.oa.controller.AlreadyTaskController",
									funViewName:"core.oa.view.AlreadyTaskLayout"
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
					"taskjobform button[ref=return]":{
						click:function(btn){
							var form = btn.up("taskjobform");
							var ass = form.getForm().findField("assessDisplay");
							ass.ownerCt.remove(ass);
							var formObj = form.getForm();
							formObj.reset();
							var grid = form.up("centerview").down("taskjobgrid");
							//self.hideWfButtons(form);
							form.hide();
							grid.show();
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
											CY.user = {};
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
					 "topview":{
						 afterrender:function(self, eOpts ){
							 if(CY.user.username){
								var dis = Ext.getCmp("displaylogin");
								dis.setValue("<font color=black><b>"+CY.user.username+"->"+CY.user.name+"</b></font>");
							}
						 }
					 },
					 "loginwindow":{
						 afterrender:function(self, eOpts ){
							 self.onkeydown=keyDownSearch;  
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
										CY.user = userObj;
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
					 },
					 "#centerid":{
						 	tabchange:function(tabPanel, newCard, oldCard, eOpts ){
						 		this.storeReload(newCard);
						 	}
					 },
					/*jbpm*/
					"taskjobform button[ref=button_first]":{
							click:function(btn){
								var transitionTo = btn.cyValue;
								var assess = btn.up("taskjobform").getForm().findField('assess').getValue();
								var taskId = btn.up("taskjobform").getForm().findField('taskId').getValue();
								var id = btn.up("taskjobform").getForm().findField('app.id').getValue();
								var taskgrid = Ext.getCmp("taskjobgrid");
								var taskform =  btn.up("taskjobform");
								var param = {};
								var box ;
								param.msg = '确认您的操作?';
								param.fn = function(result) {
									if ("yes" == result) {
										box	= CY.processBox({"title":"提示",msg:"请等待..."});
										Ext.Ajax.request({
											url: CY.ns + "/workflow/wkAction!completeTaskByTaskId.asp",
											params: {"comp.transition": transitionTo,
											         "comp.assess":assess,
													 "comp.taskId":taskId,
													 "comp.businessId":id},
											method: "POST",
											timeout: 4000,
											success: function (response, opts) {
												box.closeCY();
												var resObj = Ext.decode(response.responseText);
												if (resObj.success) {
													//切换到  列表
													taskgrid.getStore().load();
													var ass = taskform.getForm().findField("assessDisplay");
													ass.ownerCt.remove(ass);
													taskform.hide();
													taskgrid.show();
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
					/*jbpm*/
					"taskjobform button[ref=button_second]":{
						click:function(btn){
							var transitionTo = btn.cyValue;
							var assess = btn.up("taskjobform").getForm().findField('assess').getValue();
							var taskId = btn.up("taskjobform").getForm().findField('taskId').getValue();
							var id = btn.up("taskjobform").getForm().findField('app.id').getValue();
							var taskgrid = Ext.getCmp("taskjobgrid");
							var taskform =  btn.up("taskjobform");
							var param = {};
							var box ;
							param.msg = '确认您的操作?';
							param.fn = function(result) {
								if ("yes" == result) {
									box	= CY.processBox({"title":"提示",msg:"请等待..."});
									Ext.Ajax.request({
										url: CY.ns + "/workflow/wkAction!completeTaskByTaskId.asp",
										params: {"comp.transition": transitionTo,
											"comp.assess":assess,
											"comp.taskId":taskId,
											"comp.businessId":id},
										method: "POST",
										timeout: 4000,
										success: function (response, opts) {
											box.closeCY();
											var resObj = Ext.decode(response.responseText);
											if (resObj.success) {
												//切换到  列表
												taskgrid.getStore().load();
												var ass = taskform.getForm().findField("assessDisplay");
												ass.ownerCt.remove(ass);
												taskform.hide();
												taskgrid.show();
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
					/*jbpm*/
					"taskjobform button[ref=button_third]":{
						click:function(btn){
							var transitionTo = btn.cyValue;
							var assess = btn.up("taskjobform").getForm().findField('assess').getValue();
							var taskId = btn.up("taskjobform").getForm().findField('taskId').getValue();
							var id = btn.up("taskjobform").getForm().findField('app.id').getValue();
							var taskgrid = Ext.getCmp("taskjobgrid");
							var taskform =  btn.up("taskjobform");
							var param = {};
							var box ;
							param.msg = '确认您的操作?';
							param.fn = function(result) {
								if ("yes" == result) {
									box	= CY.processBox({"title":"提示",msg:"请等待..."});
									Ext.Ajax.request({
										url: CY.ns + "/workflow/wkAction!completeTaskByTaskId.asp",
										params: {"comp.transition": transitionTo,
											"comp.assess":assess,
											"comp.taskId":taskId,
											"comp.businessId":id},
										method: "POST",
										timeout: 4000,
										success: function (response, opts) {
											box.closeCY();
											var resObj = Ext.decode(response.responseText);
											if (resObj.success) {
												//切换到  列表
												taskgrid.getStore().load();
												var ass = taskform.getForm().findField("assessDisplay");
												ass.ownerCt.remove(ass);
												taskform.hide();
												taskgrid.show();
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
					}
						
						
						
						
				});
				
			},
			views : ["core.app.view.CenterView", "core.app.view.WestView","core.app.view.TopView", "core.app.view.MainView","core.app.view.TaskJobGrid","core.app.view.TaskJobForm"],
			stores : ["core.app.store.TaskJobStore"],
			models : ["core.app.model.TaskJobModel"]
});
/*"core.app.view.LoginWindow",*/
						