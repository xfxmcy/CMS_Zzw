/**
 * ClassName 角色列表
 * */

Ext.define("core.user.view.RoleGrid",{
	mixins:{
		gridUtils:"core.utils.GridUtils"
	},
	extend:"Ext.grid.Panel",
	alias:"widget.rolegrid",
	id:"rolegrid",
	store:"core.user.store.RoleGridStore",
	
/*	selModel:{
		selType:"checkboxmodel",
		checkOnly:true
	},*/
	selModel : Ext.create('Ext.selection.CheckboxModel',{
		checkOnly:true,
		listeners : {
			/**
			 * 角色grid 记录跨页选中
			 */
			'select':function(sm,colIndex,rowIndex){
				var roleGrid = Ext.getCmp("rolegrid");
				var addSelection = roleGrid.getGridAdd();
				var removeSelection = roleGrid.getGridDelete();
				var gridChecked = roleGrid.getGridChecked();
				var record = sm.getStore().getAt(rowIndex);
				/*删除里包含添加*/
				/*原始里不包含增加*/
				if(!gridChecked.containsKey(record.get("id")) && !addSelection.containsKey(record.get("id"))){
					addSelection.add(record.get("id"),record.get("id"));
				}	
				else if(removeSelection.containsKey(record.get("id")))
					removeSelection.remove(removeSelection.get(record.get("id")));
				/*if(removeSelection.containsKey(record.get("id"))){
					removeSelection.remove(removeSelection.get(record.get("id")));
					return;
				}	
				if(!addSelection.containsKey(record.get("id")))
					addSelection.add(record.get("id"),record.get("id"));*/
			},
			'deselect':function(sm,colIndex,rowIndex){
				var roleGrid = Ext.getCmp("rolegrid");
				var addSelection = roleGrid.getGridAdd();
				var removeSelection = roleGrid.getGridDelete();
				var gridChecked = roleGrid.getGridChecked();
				var record = sm.getStore().getAt(rowIndex);
				/*原始里包含删除*/
				if(gridChecked.containsKey(record.get("id")) && !removeSelection.containsKey(record.get("id"))){
					removeSelection.add(record.get("id"),record.get("id"));
				}	
				else if(addSelection.containsKey(record.get("id")))
					addSelection.remove(addSelection.get(record.get("id")));
			}
			
		}
	}),
	border:0,
	multiSelect:true,
	frame:true,
	tbar : [{
		xtype : 'button',
		tooltip : '保存',
		text : '保存',
		iconCls : 'table_add',
		ref : 'roleGridAdd'
	}],
	bbar:{
		xtype:'pagingtoolbar',
		store:'core.user.store.RoleGridStore',
		dock:'bottom',
		displayInfo:true
	},
	enableKeyNav:true,  //可以使用键盘控制上下
	columnLines:true, //展示竖线
	columns:[
	 		{xtype: 'rownumberer'},
	 		{text:"id",dataIndex:"id",width:250,align:'center',hidden:true
	 		},
	 		{text:"角色名称",dataIndex:"name",width:250,align:'center',field:{
	 			xtype:"textfield"
	 			}
	 		},
	 		{text:"角色编码",dataIndex:"code",width:350,align:'center',field:{
	 			xtype:"textfield"
	 			}
	 		}
	 		
	 	],
	 	initComponent:function(){
	 		// 行编辑
	 		//this.editing=Ext.create("Ext.grid.plugin.CellEditing");
	 		//this.plugins=[this.editing];
	 		this.callParent(arguments);
	 	}
	
});