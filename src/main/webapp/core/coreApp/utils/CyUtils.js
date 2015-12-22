/**
 * cy工具类
 * 
 * @author cy
 */
var userRoleInit = "0";
var userJobInit = "0";
Ext.define("core.utils.CyUtils", {
	
	// 重新刷新  store
	storeReload:function(layout){
		var layoutName = Ext.getClass(layout).getName();
		/*首页*/
		if("Ext.panel.Panel" == layoutName){
			layout.down('taskjobgrid').getStore().load();
		}
		/*流程部署*/
		if("core.jbpm.view.DeployLayout" == layoutName){
			layout.down('deploygrid').getStore().load();
		}
		/*流程挂接*/
		else if("core.jbpm.view.ProcessLayout" == layoutName){
			layout.down('processgrid').getStore().load();
		}
		/*部门管理*/
		else if("core.user.view.DeptLayout" == layoutName){
			//layout.down('depttree').getStore().load();
			if("1" === userRoleInit){
				var tree = layout.down('depttree');
				tree.getSelectionModel().deselectAll();
				var roleStore = layout.down('rolegrid').getStore();
				var proxy = roleStore.getProxy();
				proxy.extraParams = {

				};
				var roleGrid = Ext.getCmp("rolegrid");
				roleGrid.clearRoleGridCache();
				roleStore.loadPage(1);
			}
			else
				userRoleInit = "1";


		}
		/*角色管理*/
		else if("core.user.view.RoleLayout" == layoutName){
			//layout.down('depttree').getStore().load();
			var roleStore = layout.down('rolesgrid').getStore();
			roleStore.load();

		}
		/*用户管理*/
		else if("core.user.view.UserLayout" == layoutName){
			if("1" === userJobInit) {
				var userGrid = layout.down('usergrid');
				userGrid.getSelectionModel().deselectAll();
				var userStore = userGrid.getStore();
				//清空分页checked
				var jobgrid = Ext.getCmp("jobgrid");
				var proxy = jobgrid.getStore().getProxy();
				proxy.extraParams = {};
				jobgrid.clearJobGridCache();
				jobgrid.getStore().loadPage(1);
				userStore.load();
			}
			else
				userJobInit = "1";
			/**
			 *  刷新bug
			 *			关闭Tab后,再次刷新，记住的是上一次的数据选中 暂未解决
			 *
			 *
			 *  解决方案
			 			selModel:{
							selType:"checkboxmodel",
							checkOnly:true
						},
			 			捕捉   grid select  事件即可
			 *
			 *
			 */

		}
		/*申请买车*/
		else if("core.oa.view.BorrowLayout" == layoutName){
			layout.down('borrowgrid').getStore().load();
		}/*已办任务*/
		else if("core.oa.view.AlreadyTaskLayout" == layoutName){
			layout.down('alreadytaskgrid').getStore().load();
		}

	}
});