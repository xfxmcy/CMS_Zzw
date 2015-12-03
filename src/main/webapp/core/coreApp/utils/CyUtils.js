/**
 * cy工具类
 * 
 * @author cy
 */
Ext.define("core.utils.CyUtils", {
	
	// 重新刷新  store
	storeReload:function(layout){
		var layoutName = Ext.getClass(layout).getName();
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
			var roleStore = layout.down('rolegrid').getStore();
			var proxy = roleStore.getProxy();
			proxy.extraParams = {
				
			};
			roleStore.load();
			//var selmod = Ext.getCmp('rolegrid').getSelectionModel();
			//selmod.deselectAll();
			//清空分页checked
			var roleGrid = Ext.getCmp("rolegrid");
			var gridChecked = roleGrid.getGridChecked();
			var addSelection = roleGrid.getGridAdd();
			var removeSelection = roleGrid.getGridDelete();
			gridChecked.clear();
			addSelection.clear();
			removeSelection.clear();

		}
		/*角色管理*/
		else if("core.user.view.RoleLayout" == layoutName){
			//layout.down('depttree').getStore().load();
			var roleStore = layout.down('rolesgrid').getStore();
			roleStore.load();

		}
		/*用户管理*/
		else if("core.user.view.UserLayout" == layoutName){
			//layout.down('depttree').getStore().load();
			//layout.down('usergrid').getSelectionModel().deselectAll();
			var userStore = layout.down('usergrid').getStore();
			//清空分页checked
			var roleGrid = Ext.getCmp("jobgrid");
			var jobStore = roleGrid.getStore();
			var proxy = jobStore.getProxy();
			proxy.extraParams = {

			};
			var selmod = Ext.getCmp('jobgrid').getSelectionModel();
			selmod.deselectAll();
			var gridChecked = roleGrid.getUserGridChecked();
			var addSelection = roleGrid.getUserGridAdd();
			var removeSelection = roleGrid.getUserGridDelete();
			gridChecked.clear();
			addSelection.clear();
			removeSelection.clear();
			jobStore.load();
			userStore.load();

		}
	}
});