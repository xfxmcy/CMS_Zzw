Ext.define("core.user.view.RoleForm",{
	extend:"Ext.form.Panel",
	alias:"widget.roleform",
	layout:"auto",
	align:"left",
	frame:true,
	defaults:{
			margin:"7 0 0 15",
			selectOnFocus:true,
			msgTarget:"side" //提示信息现在的位置
		},
	items:[{
				xtype:"textfield",
				fieldLabel:"角色ID",
				name:"roleId",
				hidden:true
			},{
				xtype:"textfield",
				fieldLabel:"角色名称",
				selectOnFocus : true,
				allowBlank : false,
				name:"roleName"
			},{
				xtype:"textfield",
				fieldLabel:"角色编码",
				allowBlank : false,
				name:"roleCode"
			}/*,{
				xtype:"button",
				ref:"submit",
				text:"保存"
			}*/]
});