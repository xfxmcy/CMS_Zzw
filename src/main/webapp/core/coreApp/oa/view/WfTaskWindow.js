/**
 * ClassName 工作流任务处理视图
 */
Ext.define("core.oa.view.WfTaskWindow", {
			extend : "Ext.window.Window",
			alias : "widget.wftaskwindow",
			id : "wftaskwindow",
			width : 600,
			height : 518,
			title : "任务执行",
			layout : "border",
			closable : true,
			closeAction:"destroy",
			modal : true,
		initComponent : function() {
				var btn=this.btn;
				var treeInfo=this.treeInfo;
				var html=this.htmlObj;
				this.items=[{
						region : 'west',
						xtype : "roleusertree",
						width:200,
						hidden:treeInfo.hidden,
						multiSelect:treeInfo.multiSelect
					},{
						region : "center",
						xtype : "panel",
						ref:"taskjob",
						width:300,
						layout : "border",
						tbar:[btn],
						items : [{
							region : 'north',
							xtype : "taskconments"
							},{
								region : 'center',
								xtype : "panel",
								layout:"fit",
								autoScroll:true,
								title:"流程图",
								html:html
							}
						]
					}]
				this.callParent(arguments);
			}
		});