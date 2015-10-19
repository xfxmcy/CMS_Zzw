/**
 * ClassName 流程挂接视图
 * */
Ext.define("core.jbpm.view.ProcessGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.processgrid",
	store:"core.jbpm.store.ProcessStore",
	selModel:{
		/*selType:"checkboxmodel"*/
	},
	border:0,
	multiSelect:false,
	frame:true,
	tbar:[
		{xtype:'button',text:'挂接流程',ref:'addProcess',iconCls:'table_add'},
		{xtype:'button',text:'取消挂接',ref:'calProcess',iconCls:'table_remove'}
	],
	bbar:{
		xtype:'pagingtoolbar',
		store:'core.jbpm.store.ProcessStore',
		dock:'bottom',
		displayInfo:true
	},
	enableKeyNav:true,  //可以使用键盘控制上下
	columnLines:true, //展示竖线
	columns:[
		{xtype: 'rownumberer'},
		{text:"流程名称",dataIndex:"deployment.processName",width:150,align:'center'},
		{text:"流程key",dataIndex:"deployment.processKey",width:150,align:'center'},
		{text:"挂接状态",dataIndex:"mountStatus",width:114,align:'center',renderer: function(value, cellmeta, record, rowIndex, columnIndex, store){
		     
			if(1 == value || "1" == value)
				return "已挂接";
			else if(0 == value || "0" == value)	
				return "未挂接";
	    }},
		{text:"挂载人员",dataIndex:"updateUser.username",width:170,align:'center'},
		{text:"挂载时间",dataIndex:"updateTime",width:180,align:'center'},
		{text:"挂载部门编号",dataIndex:"departmentCode",width:200,align:'center'},
		
		{text:"流程版本",dataIndex:"deployment.version",width:130,align:'center'}
	],
	initComponent:function(){
		this.callParent(arguments);
	}
});