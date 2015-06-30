/**
 * Jbpm系统管理所使用到的工具类
 * 
 * @author zhangshuaipeng
 */
Ext.define("core.utils.GridUtils", {
	/**
	 * 表格通用的删除
	 * @param {} grid
	 */
	doRemove:function(grid,idName,action){
		if(!grid){
			alert("传入 参数错误");
			return;
		}
		//得到数据集合
		var store=grid.getStore();
		//得到选中数据
		var records=grid.getSelectionModel().getSelection();
		var data=[];
		Ext.Array.each(records,function(model){
			var idValue=model.get(idName);
			if(idValue && idValue!=""){
				data.push("'"+idValue+"'");
			}
		});
			if(data.length>0){
				Ext.Ajax.request({
					url:action+"!doDelete.action",
					params:{ids:""+data.join(",")+"",idName:idName},
					method:"POST",
					timeout:4000,
					success:function(response,opts){
						var resObj=Ext.JSON.decode(response.responseText);
						if(resObj.success){
							Ext.Msg.alert("提示",resObj.obj);
							store.load();
						}else{
							Ext.Msg.alert("提示","后台删除失败！");
						}
					}
				});
			}else{
				Ext.Msg.alert("提示","你没有选中数据，不能执行操作！");
			}
	},
	/**
	 * 表格通用的保存
	 * @param {} grid
	 */
	doSave:function(grid,idName,tableName,action){
		if(!grid){
			alert("传入 参数错误");
			return;
		}
		//得到数据集合
		var store=grid.getStore();
		//records  被修改过的数据
		var records=store.getUpdatedRecords();
//		var newRecords = store.getNewRecords();
//		records = records.concat(newRecords);
		var objects = [];
    	Ext.Array.each(records,function(mode){
    		var model = mode.getChanges();
    		model[idName] = mode.data[idName]
    		objects.push(model);
    	});
		//因为只用到data属性，遍历data并存到一个数组中
    	var strData =this.getExcuteSql(objects,tableName,idName);
		if(objects.length>0){
			Ext.Ajax.request({
				url:action+"!doListUpdate.action",  //实现低耦合，url不能写固定，因为这个是工具类，需要在store配置api
				params:{strData:strData},
				method:"POST",
				timeout:4000,
				success:function(response,opts){
					var resObj=Ext.JSON.decode(response.responseText);
					if(resObj.success){
						store.load(function(records, operation, success) {
						});
						Ext.Msg.alert("提示","保存成功");
					}else{
						Ext.Msg.alert("提示","保存失败");
					}
				}
			});	
		}else{
			Ext.Msg.alert("提示","你没有修改，不能保存!");	
		}
	},
	/**
	 * 表格通用的插入
	 * @param {} grid
	 */
	doInsert:function(grid,modelObj,foreignModel,action,idName){
		if(!(grid)){
			alert("参数传入错误");
			return;
		}
		//得到表格的集合
		var store=grid.getStore();
		//得到编辑插件
		var edit=grid.editing;
		//得到数据模型
		var model=store.model;
		//初始化一个模型类
		var obj=new model(modelObj);
			Ext.Ajax.request({
					url:action+"!doSave.action",
					params:foreignModel,
					method:"POST",
					timeout:4000,
					success:function(response,opts){
						var resObj=Ext.decode(response.responseText);
						obj.data[idName]=resObj.obj[idName];
						if(resObj.success){
							edit.cancelEdit(); //取消其他插件的编辑活动
								store.insert(0,obj);
								obj.commit();
								edit.startEditByPosition({
									row:0,
									column:2
							});
						}
					}
			});
	},
	/**
	 * 根据tbar上的按钮找到grid
	 * @param {} btn
	 * @return {}
	 */
	findGrid:function(btn){
		var grid=btn.ownerCt.ownerCt;
		if(grid){
			return grid;
		}
	},
	/**
	 * 拼接修改的sql语句
	 * @param {} tableName
	 * @param {} datas
	 */
	getExcuteSql:function(datas,tableName,idName){
		var strData = [];
		Ext.Array.each(datas,function(obj){
			//要更新的数据
			var setStr = [];
			//更新字段集合 
			var fields = [];
			var idValue = "";
				//拼接更新语句
			for(var p in obj){
				//p为属性名称
				if(idName == p){
					idValue = obj[p];
				}else{
					var v = Ext.value(obj[p],'')+'';
					//为什么要替换它， 因为sql语句中出现单引号是作为值的概念。前方如果加上单引号代表是转义
					v = v.replace("'","''");
					setStr.push( p+"='"+ v +"'");
					fields.push(p);
				}
			}
			if(setStr.length>0){
				strData.push("{id:\""+idValue+"\",fields:\""+fields.join(",")+"\",sql:\"update "+tableName+" set "+setStr.join(",")+" where "+idName+"='"+idValue+"'\"}"); 
			}
		});
		return "["+strData.join(',')+"]";
	},
	getUUID:function(actionName){
		var uuid=Ext.create("Ext.data.UuidGenerator",{
			id:"uuid",
			salt:10
		}).generate();
		if(uuid){
			return uuid;
		}else{
			return "";
		}
	}
	
});