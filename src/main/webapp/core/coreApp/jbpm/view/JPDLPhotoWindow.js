Ext.define('core.jbpm.view.JPDLPhotoWindow', {
	extend : 'Ext.window.Window',
	title : "流程定义图片查看",
	width : 325,
	height : 390,
	alias:"widget.jpdlPhotoWindow",
	modal : true,
	closable : true,
	closeAction:"destroy",
	layout : "fit",
	id:"jpdlPhotoWindow",
	html:""
});
