Ext.define('core.oa.view.CurJPDLWindow', {
	extend : 'Ext.window.Window',
	title : "当前流程图查看",
	width : 425,
	height : 451,
	alias:"widget.curJPDLWindow",
	modal : true,
	closable : true,
	closeAction:"destroy",
	layout : "fit",
	id:"curJPDLWindow",
	html:""
});
