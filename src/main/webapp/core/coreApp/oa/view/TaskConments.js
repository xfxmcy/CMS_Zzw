Ext.define("core.oa.view.TaskConments",{
	extend:"Ext.form.Panel",
	alias:"widget.taskconments",
	layout:"fit",
	title:"审批意见",
	defaults:{
			margin:"15 15 15 15",
			selectOnFocus:true,
			msgTarget:"side" //提示信息现在的位置
		},
	items:[{
				xtype:"textareafield",
				name:"conment"
			}]
});