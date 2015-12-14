/**
 * 宸﹁竟閮ㄥ垎
 */
Ext.define("core.app.view.WestView",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.westview',
	collapsible: true,
	split: true,
	defaults: {
		bodyStyle: 'padding:2px'
	}, 	
	border:1,
	margins: '2 2 0 0',
	width: 225,
	minSize: 100,
	maxSize: 250,
	title:"业务导航",
	layout : 'accordion',
	layoutConfig :{
				titleCollapse: false,
				animate: true,
				activeOnTop: true
			},
	items:[{
		title:"人员管理",
		items:[{
			xtype:"treepanel",
			rootVisible : false,// 不展示根节点
			displayField : "text",
			border:0,
			root: {
	       	 	expanded: true,
	        	children: [{ 
	            		text: "部门管理",
	            		id:"dept-user",
	            	 	leaf: true 
	            	},{
	            		text: "角色管理",
	            		id:"role-user",
	            	 	leaf: true             		
	            	},{
	            		text: "人员管理",
	            		id:"user-user",
	            	 	leaf: true             		
	            	}
	        	]
    		}
		}]
	},{
		title:"工作流管理",
		items:[{
			xtype:"treepanel",
			rootVisible : false,// 不展示根节点
			displayField : "text",
			border:0,
			root: {
	       	 	expanded: true,
	        	children: [
	            	{ 
	            		id:"deployment",
	            		text: "流程部署管理", 
	            	 	leaf: true 
	            	},{ 
	            		id:"process",
	            		text: "流程挂接管理", 
	            	 	leaf: true 
	            	}
	        	]
    		}
		}]
	},{
		title:"OA业务",
		items:[{
			xtype:"treepanel",
			rootVisible : false,// 不展示根节点
			displayField : "text",
			border:0,
			root: {
	       	 	expanded: true,
	        	children: [
	            	{ 
	            		id:"buyCar",
	            		text: "申请买车",
	            	 	leaf: true 
	            	},{
						id:"alreadyTask",
						text: "已办任务",
						leaf: true
					}
	        	]
    		}
		}]
	},{
		title:"其他业务",
		html: "其他业务"	
	}],
    initComponent: function(){
        this.callParent(arguments);
    }
});



