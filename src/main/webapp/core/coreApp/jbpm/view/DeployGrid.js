/**
 * ClassName 流程定义列表视图
 * */
Ext.define("core.jbpm.view.DeployGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.deploygrid",
	store:"core.jbpm.store.DeployStore",
	selModel:{
		selType:"checkboxmodel"
	},
	border:0,
	multiSelect:false, //设置单选
	frame:true,
	tbar:[
	    {xtype:'button',text:'上传流程定义',ref:'uploadDeploy',iconCls:'table_add'},
		{xtype:'button',text:'部署流程',ref:'addDeploy',iconCls:'table_save'},
		{xtype:'button',text:'清除流程定义',ref:'calDeploy',iconCls:'table_remove'}
	],
	bbar:{
		xtype:'pagingtoolbar',
		store:'core.jbpm.store.DeployStore',
		dock:'bottom',
		displayInfo:true
	},
	enableKeyNav:true,  //可以使用键盘控制上下
	columnLines:true, //展示竖线
	columns:[
		{xtype: 'rownumberer'},
		{text:"文件名称",dataIndex:"fileName",width:150},
		{text:"流程名称",dataIndex:"processName",width:130},
		{text:"流程Key",dataIndex:"processKey",width:130},
		{text:"部署版本",dataIndex:"version",width:100},
		{text:"流程描述",dataIndex:"descript",width:200}
	],
	initComponent:function(){
		this.callParent(arguments);
	}
});