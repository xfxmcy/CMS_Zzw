/**
 * 表单工具类
 * 
 * @author zhangshuaipeng
 */
Ext.define("core.utils.FormUtils", {
		/**
	 * 隐藏所有工作流按钮
	 * 
	 * @param {}
	 *            form
	 */
	hideWfButtons : function(form) {
		if (!form) {
			alert("传入form参数失败")
			return;
		}
//		form.down("button[ref=wfStart]").hide();
		Ext.each(form.query("button[ref=wfStart]"),function(startBtn){
			startBtn.hide();
		});
		form.down("button[ref=wfNext]").hide();
		form.down("button[ref=wfBack]").hide();
		form.down("button[ref=wfReturn]").hide();
		form.down("button[ref=wfEnd]").hide();
		form.down("button[ref=wfTake]").hide();
	},
	/**
	 * 隐藏所有form的按钮
	 * 
	 * @param {}
	 *            form
	 */
	hideFormButtons : function(form) {
		if (!form) {
			alert("传入form参数失败")
			return;
		}
		var buttons = form.query("button");
		Ext.each(buttons, function(button) {
					if (button.ref != "return") {
						button.hide();
					}
				});
		form.down("displayfield").hide();
	},
	/**
	 * 将对象属性值设到form中
	 * @param {} formObj
	 * @param {} obj
	 */
	setFormValue:function(formObj,obj){
		var fieldsObj = formObj.getFields();
		var items = fieldsObj.items;
		Ext.each(items, function(item) {
					if(obj[item.name]){
						formObj.findField(item.name).setValue(obj[item.name]);
					}
				});
	},
	/**
	 * 还原form的信息
	 * @param {} form
	 */
	resetFormInfo:function(form){
		if(!form){
			alert("传入参数失败")
			return;
		}
		var xtype=form.initialConfig.xtype;
		var hidden=form.hidden;
		var parent=form.ownerCt;
		parent.remove(form);
		parent.add({xtype:xtype,hidden:hidden});
	},
	/**
	 * 只读所有form的字段
	 * 
	 * @param {}
	 *            formObj
	 */
	readOnlyFields : function(formObj) {
		var fieldsObj = formObj.getFields();
		var items = fieldsObj.items;
		Ext.each(items, function(item) {
					formObj.findField(item.name).setReadOnly(true);
				});
	},
	/**
	 * 根据返回的对象展示相应的工作流按钮
	 * @param {} form
	 * @param {} obj
	 */
	showAbleInfo:function(form,obj){
		if(!form || !obj){
			alert("传入参数失败");
			return;
		}
		var formObj=form.getForm();
		//可编辑字段
		var fields=obj.ableField;
		var ableButtons=obj.ableButtons;
		var buttons=obj.buttons;
		if(buttons){
			Ext.each(buttons,function(btn){
				var button=form.down("button[ref="+btn+"]");
				if(button && btn=="wfNext"){
					var assigneType=obj.assigneType;
					var assignes=obj.assignes;
					var roles=obj.roles;
					button.assigneType=assigneType;
					button.assignes=assignes;
					button.roles=roles;
					button.taskId=obj.taskId;
					button.show();
				}else if(button){
					button.taskId=obj.taskId;
					button.show();
				}
			});
		}
		if(fields && fields!=""){
			var ableFields=fields.split(",");
			Ext.each(ableFields,function(field){
				formObj.findField(field).setReadOnly(false);
			});
		}
		if(ableButtons && ableButtons!=""){
			var ableBut=ableButtons.split(",");
			Ext.each(ableBut,function(btn){
				form.down("button[ref="+btn+"]").show();
				
			});
		}
		if(obj.wfStatus=="END"){
			form.down("displayfield").show();
		}
		form.down("button[ref=return]").show();
	},
	/**
	 * 把form中字段信息构建成一个obj对象
	 * @param {} formObj
	 * @return {}
	 */
	getFormObj:function(formObj){
		var fieldsObj = formObj.getFields();
		var obj={};
		var items = fieldsObj.items;
		Ext.each(items, function(item) {
					obj[item.name]=formObj.findField(item.name).getValue();
				});
		return obj;
	},
	/**
	 * 刷新form的信息
	 * @param {} obj
	 */
	flushForm:function(obj){
		var form=obj.form;
		var formObj=form.getForm();
		var idValue=formObj.findField(obj.idName).getValue();
		var util=Ext.create("core.utils.FormUtils");
		//只读所有字段
		util.readOnlyFields(formObj);
		//隐藏所有按钮
		util.hideFormButtons(form);
		//创建工作流工具类
		var wfUtil=Ext.create("core.utils.WfUtils");
		//加载form的按钮和字段信息
		wfUtil.loadInfo(form, obj.modelName,obj.idName, idValue);
		//刷新我们的历史
		wfUtil.findHistory(form, obj.modelName,idValue);
	}
});