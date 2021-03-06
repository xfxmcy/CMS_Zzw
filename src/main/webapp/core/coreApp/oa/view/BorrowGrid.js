/**
 * ClassName 借款申请视图
 * */
Ext.define("core.oa.view.BorrowGrid",{
	extend:"Ext.grid.Panel",
	alias:"widget.borrowgrid",
	store:"core.oa.store.BorrowMoneyStore",
	/*selModel:{
		selType:"checkboxmodel"
	},*/
	border:0,
	multiSelect:false,
	frame:true,
	tbar:[
		{xtype:'button',text:'申请',ref:'add',iconCls:'table_add'},
		{xtype:'button',text:'删除',ref:'delete',iconCls:'table_remove'}
	],
	bbar:{
		xtype:'pagingtoolbar',
		store:'core.oa.store.BorrowMoneyStore',
		dock:'bottom',
		displayInfo:true
	},
	enableKeyNav:true,  //可以使用键盘控制上下
	columnLines:true, //展示竖线
	columns:[
		{xtype: 'rownumberer'},
		{text:"申请人",align:'center',dataIndex:"user.username",width:'10%'},
		{text:"车型",align:'center',dataIndex:"vehicleType",width:'15%'},
		{text:"车牌",align:'center',dataIndex:"plateNumber",width:'15%'},
		{text:"金额",align:'center',dataIndex:"money",width:'18%'},
		{text:"申请时间",align:'center',dataIndex:"createTime",width:'15%'},
		{text:"状态",align:'center',dataIndex:"state",width:'10%',
			renderer: function(value) {
				return CY.changeStateValue(value);
			}
		},
		{xtype: 'actioncolumn',width:'14%',align: 'center',
			text: '流程查看',
			items: [{
				icon: 'ext4/icon/cog_edit.png',  // Use a URL in the icon config
				tooltip: '查看当前流程',
				handler: function (grid, rowIndex, colIndex) {
					var borrowgrid = grid.up('borrowlayout').down('borrowgrid');
					var renderData = borrowgrid.getStore().getAt(rowIndex);
					Ext.Ajax.request({
						url: CY.ns + "/app/appAction!doQueryCurrentProcessPhoto.asp",
						params: {"processInstanceId": renderData.data.processInstanceId},
						method: "POST",
						timeout: 4000,
						success: function (response, opts) {
							var resObj = Ext.decode(response.responseText);
							var result = resObj.result;
							if (resObj.success && result) {
								var resHtml = "";
								var window = Ext.getCmp("curJPDLWindow");
								if(window){
									resHtml += "<div style='left: 0px;top:0px;'><img src='" + CY.nsPhoto + result[0].jpdlPath + "' /></div>" ;
									for(var i = 0;i < result.length; i++)
										resHtml +="<div style='position: absolute;border: 1px solid;border-color:crimson;left:"+result[i].x+"px;top:"
									+result[i].y+"px;width:"+result[i].w+"px;height: "
									+result[i].h+"px;' />";
									window.html = resHtml;
									window.show();
								}else{
									window = Ext.create("core.oa.view.CurJPDLWindow");
									resHtml += "<div style='left: 0px;top:0px;'><img src='" + CY.nsPhoto + result[0].jpdlPath + "' /></div>" ;
									for(var i = 0;  i < result.length;i++)
										resHtml +="<div style='position: absolute;border: 1px solid;border-color:crimson;left:"+result[i].x+"px;top:"
												+result[i].y+"px;width:"+result[i].w+"px;height: "
												+result[i].h+"px;' />";
									window.html = resHtml;
									window.show();
								}
							}
						}
					});

				}
			}]
		}
	],
	initComponent:function(){
		this.callParent(arguments);
	}
});