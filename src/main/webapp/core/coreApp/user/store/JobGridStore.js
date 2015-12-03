/*
 * ClassName 用户数据集
 */
 Ext.define("core.user.store.JobGridStore",{
 	extend:'Ext.data.Store',
	model:'core.user.model.JobGridModel',
	pageSize:20,
	proxy:{
		type:"ajax",
		url:CY.ns + "/role/roleAction!doQueryJobsPagedByUser.asp",
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
			var selmod = Ext.getCmp('jobgrid').getSelectionModel();
			var roleGrid = Ext.getCmp("jobgrid");
			var gridChecked = roleGrid.getUserGridChecked();
			var addSelection = roleGrid.getUserGridAdd();
			var removeSelection = roleGrid.getUserGridDelete();
			var current = gridChecked.get("currentPage");
			if(!current || current !== self.currentPage)
				selmod.deselectAll();

			gridChecked.add("currentPage",self.currentPage);
			//selmod.selectAll();
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