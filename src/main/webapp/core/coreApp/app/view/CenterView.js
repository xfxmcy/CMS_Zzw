/**
 * 程序布局放大中间的部分
 */
Ext.define("core.app.view.CenterView",{
	extend: 'Ext.tab.Panel',
	alias: 'widget.centerview',
	id:'centerid',
	autoDestroy:true,
	enableRerfesh:true,
	//margins: '2 0 0 0',
	border : 0,
	bodyStyle: 'padding:0px',
	menuAlign:"center",
	items:[{
		title:'<center height=40>首页</center>',
//		iconCls:'home',
		bodyPadding :5,
		layout:'fit',
		items:{
			xtype:'taskjobgrid'
		},
		tabConfig  : {//标签配置参数
			
        }
        
	}],
	/*tools:[{
        type:'refresh',
        tooltip: 'Refresh form Data',
        // hidden:true,
        handler: function(event, toolEl, panelHeader) {
            // refresh logic
        }
    }],*/
   /* listeners:{
    	show:function(){
        	alert("222");
        	//self.load();
        },
    	
        activate:function(self){
        	//console.info(self.getActiveTab());
        	
        	//console.info(this.getLoader().load());
        },
        tabchange:function(tabPanel, newCard, oldCard, eOpts ){
        	
        }
        
   },*/
   /*plugins: Ext.create('Ext.ux.TabCloseMenu', {
       closeTabText: '关闭当前',
       closeOthersTabsText: '关闭其他',
       closeAllTabsText: '关闭所有',
       extraItemsTail: [
                   '-',
                   {
                       text: '可关闭',
                       checked: true,
                       hideOnClick: true,
                       handler: function (item) {
                           currentItem.tab.setClosable(item.checked);
                       }
                   }
               ],
       listeners: {
           aftermenu: function () {
               currentItem = null;
           },
           beforemenu: function (menu, item) {
               var menuitem = menu.child('*[text="可关闭"]');
               currentItem = item;
               menuitem.setChecked(item.closable);
           }
       }
   })*/
	
	plugins: Ext.create('Ext.ux.TabCloseMenu', {
        extraItemsTail: [
            '-',
            {
                text: 'Closable',
                checked: true,
                hideOnClick: true,
                handler: function (item) {
                    currentItem.tab.setClosable(item.checked);
                }
            },
            '-',
            {
                text: 'Enabled',
                checked: true,
                hideOnClick: true,
                handler: function(item) {
                    currentItem.tab.setDisabled(!item.checked);
                }
            }
        ],
        listeners: {
            beforemenu: function (menu, item) {
                var enabled = menu.child('[text="Enabled"]'); 
                menu.child('[text="Closable"]').setChecked(item.closable);
                if (item.tab.active) {
                    enabled.disable();
                } else {
                    enabled.enable();
                    enabled.setChecked(!item.tab.isDisabled());
                }

                currentItem = item;
            }
        }
	})

});