/**
 * ClassName role window
 */
Ext.define("core.user.view.RoleWindow", {
			extend : "Ext.window.Window",
			alias : "widget.rolewindow",
			id:"rolewindow",
			width:362,
			height:158,
			title:"角色信息",
			layout:"fit",
			closable:true,
			closeAction:"destroy",
			modal:true,
			items:[{xtype:"roleform"}],
			bbar:[{
				xtype:"button",
				text:"确定",
				ref:"submit",
				width : 50,
				margin : "0 0 0 200"
			},{
				xtype:"button",
				text:"取消",
				ref:"cal",
				width : 50,
				margin : "0 0 0 40",
				handler : function(btn) {
					var window=btn.up("rolewindow");
					window.hide();
				}
			}]
	});