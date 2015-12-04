/*
 * ClassName 用户数据集
 */
 Ext.define("core.user.store.RoleGridStore",{
 	extend:'Ext.data.Store',
	model:'core.user.model.RoleGridModel',
	pageSize:10,
	proxy:{
		type:"ajax",
		url:CY.ns + "/role/roleAction!doQueryRolesPagedByDept.asp",
		reader:{
			type:"json",
			root:"rows",
			totalProperty :'totalCount'		
		},
		writer:{
			type:"json"
		}
	},
	listeners: {
		load: function(self, records, successful, eOpts ){
			var selmod = Ext.getCmp('rolegrid').getSelectionModel();
			var roleGrid = Ext.getCmp("rolegrid");
			var gridChecked = roleGrid.getGridChecked();
			var addSelection = roleGrid.getGridAdd();
			var removeSelection = roleGrid.getGridDelete();
			var current = gridChecked.get("currentPage");
			if(!current || current != self.currentPage)
				selmod.deselectAll();
			gridChecked.add("currentPage",self.currentPage);
			for(var i=0 ; i < records.length ; i++){

				if("1" === records[i].data.checked){

					//置后  ==> 防止点击刷新按钮(分页组件里的刷新,它刷新 会先触发 deselect 事件(每一条))
					if(!gridChecked.containsKey(records[i].get("id"))){
						gridChecked.add(records[i].get("id"),records[i].get("id"));
					}
					//要删除未保存 不选中
					if(!removeSelection.containsKey(records[i].get("id"))){
						selmod.select(records[i],true);//true  已经选中的  保持选中
					}
				}
				else if(addSelection.containsKey(records[i].get("id"))){
					//新增未保存的
					selmod.select(records[i],true);
				}
			}
			
		}
	},
	autoLoad:true	
 });