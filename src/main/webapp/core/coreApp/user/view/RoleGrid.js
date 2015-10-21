/**
 * ClassName 角色列表
 * */

Ext.define("core.user.view.RoleGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.rolegrid",
	id:"rolegrid",
	store:"core.user.store.RoleGridStore",
	selModel:{
		selType:"checkboxmodel",
		checkOnly:true
	},
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
	 		
	 		{text:"角色",dataIndex:"userName",width:200,align:'center',field:{
	 			xtype:"textfield"
	 			}
	 		},
	 		{text:"角色编码",dataIndex:"userCode",width:300,field:{
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