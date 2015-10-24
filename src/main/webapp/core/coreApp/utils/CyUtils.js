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
			layout.down('rolegrid').getStore().load();
			
		}
		
	}
});