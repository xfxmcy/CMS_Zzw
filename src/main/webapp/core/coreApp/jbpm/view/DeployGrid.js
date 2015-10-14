/**
 * ClassName 流程定义列表视图
 * */
Ext.define("core.jbpm.view.DeployGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.deploygrid",
	store:"core.jbpm.store.DeployStore",
	selModel:{
		/*selType:"checkboxmodel",
		multiSelect : "false"*/
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
	autoHeight:true,
	columns:[
		{xtype: 'rownumberer'},
		{text:"文件名称",dataIndex:"fileName",width:150,align:'center',renderer: function(value, cellmeta, record, rowIndex, columnIndex, store){
	     
	        return "<a href='#' onclick='javascript:window.location.href=\"" + CY.ns +
	        "/download/downloadAction!downloadJPDL.asp?fileName=" + value 
	        + "&filePath=" + record.data["filePath"]
	        + "\";'>" + value + "</a>";
	    }},
		{text:"流程名称",dataIndex:"processName",width:130,align:'center'},
		{text:"流程Key",dataIndex:"processKey",width:130,align:'center'},
		{text:"部署版本",dataIndex:"version",width:100,align:'center'},
		{text:"流程描述",dataIndex:"descript",width:190,align:'center'},
		{text:"上传时间",dataIndex:"createTime",width:185,align:'center'},
		{text:"上传人",dataIndex:"createUser",width:140,align:'center'},
		{
            xtype:'actioncolumn',
            width:70,
            align:'center',
            text: '操作',
            items: [{
                icon: 'ext4/icon/cog_edit.png',  // Use a URL in the icon config
                tooltip: '图片查看',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                   // alert("Edit445 " + rec.get('photoPath'));
					var window = Ext.getCmp("jpdlPhotoWindow");
					if(window){
						window.html = "<img src='" + CY.nsPhoto + rec.get('photoPath') + "' />" ;
						window.show();
					}else{
						window = Ext.create("core.jbpm.view.JPDLPhotoWindow")
						window.html = "<div align='center'><img src='" + CY.nsPhoto + rec.get('photoPath') + "' width='320' /></div>" ;
						window.show();
					}
                }
            }/*,{
                icon: 'ext4/icon/delete.png',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    alert("Terminate " + rec.get('firstname'));
                }
            }*/]
        }
	],
	initComponent:function(){
		this.callParent(arguments);
	}
});