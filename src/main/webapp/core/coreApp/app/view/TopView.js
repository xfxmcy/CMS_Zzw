Ext.define("core.app.view.TopView", {
	extend:"Ext.panel.Panel",
	alias : 'widget.topview',
	id:"topview",
	height : 50,
	bodyStyle : {
		//background : '#075281',
		padding : '10px'
	},
	html : "<h1>  <font color=black size=5>&nbsp;&nbsp;&nbsp;&nbsp;CMS-ZZW</font></h1>",
	layout : "absolute",
	items : [{
				x : 800,
				y : 20,
				ref : "logininfo",
				xtype : "displayfield",
				id:"displaylogin",
				value : "<font color=white><b>未登录</b></font>"
			}, {
				x : 900,
				y : 20,
				xtype : "button",
				ref : "login",
				text : "登录"
			}, {
				x : 960,
				y : 20,
				xtype : "button",
				ref : "exit",
				text : "退出"
			}]
})
