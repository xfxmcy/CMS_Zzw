Ext.define("core.oa.controller.AlreadyTaskController", {
	extend : "Ext.app.Controller",
	mixins : {
		gridUtils : "core.utils.GridUtils",
		wfUtils : "core.utils.WfUtils",
		formUtils : "core.utils.FormUtils"
	},
	
	init : function() {
		var self = this;
		/**
		 * 显示任务处理的窗口
		 */
		this.showTaskWindow=function(btn){
//
		},
		this.control({
			/**
			 * 双击进卡片
			 */
			"alreadytaskgrid" : {
				itemdblclick : function(grid, record, item, index, e, eOpts) {
					var form = grid.up("borrowlayout").down("borrowform");
					// 还原表单内容
					self.resetFormInfo(form);
					form = grid.up("borrowlayout").down("borrowform");
					var formObj = form.getForm();
					grid = form.up("borrowlayout").down("borrowgrid");
					var records = grid.getSelectionModel().getSelection();
					var obj = records[0].data;
					// 把对象值放入form中
					self.setFormValue(formObj, obj);
					self.loadInfo(form, "com.oa.model.BorrowMoney", "id",
							obj.id);
					self.findHistory(form, "com.oa.model.BorrowMoney", obj.id);
					grid.hide();
					form.show();
				}
			},
			/**
			 * 卡片返回列表
			 */
			"alreadytaskform button[ref=return]" : {
				click : function(btn) {
					var form = btn.up("borrowform");
					var formObj = form.getForm();
					formObj.reset();
					var grid = form.up("borrowlayout").down("borrowgrid");
					self.hideWfButtons(form);
					form.hide();
					grid.show();
				}
			},
			"alreadytaskform button[ref=wfStart]" : {
				click : function(btn) {
					var form = btn.up("borrowform");
					var formObj = form.getForm();
					var idValue = formObj.findField("id").getValue();
					var processFunMountId = btn.idValue;
					self.doStart(form, processFunMountId, idValue);
				}
			},
			/**
			 * 提交操作，展示委托人的信息
			 */
			"alreadytaskform button[ref=wfNext]" : {
				click : function(btn) {
					this.showTaskWindow(btn);
				}
			}
		});
	},
	views :  ["core.oa.view.AlreadyTaskForm", "core.oa.view.AlreadyTaskGrid","core.oa.view.AlreadyTaskLayout"],
	stores : ["core.oa.store.AlreadyTaskStore"],
	models : ["core.oa.model.AlreadyTaskModel"]
});