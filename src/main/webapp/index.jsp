<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<c:set var="cy" value="${pageContext.request.contextPath}"></c:set>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="icon" href="${cy}/img/favicon.ico">
        <title>zzw</title>
        <link rel="stylesheet" type="text/css" href="${cy}/ext4/resources/ext-theme-gray/ext-theme-gray-all.css" />
        <link rel="stylesheet" type="text/css" href="${cy}/core/css/comm.css" />
        <script type="text/javascript" src="${cy}/ext4/bootstrap.js"></script>
        <script type="text/javascript" src="${cy}/jsLib/cyUtil.js"></script>
		<script type="text/javascript" src="${cy}/jsLib/app.js"></script>
		<script type="text/javascript">
		if("${userAdmin}" && "" != "${userAdmin}"){
			//var dis = Ext.getCmp("displaylogin");
			//var topView = Ext.getCmp("topview");
			//dis.up("mainview").down("taskjobgrid").getStore().load();
			//dis.setValue("<font color=black><b>"+"${userAdmin.username}"+"->"+"${userAdmin.username}"+"</b></font>");
			//Ext.getCmp("loginwindow").close();
			CY.user.username = "${userAdmin.username}";
			CY.user.name = "${userAdmin.username}";
			CY.user.usercode = "${userAdmin.usercode}";
		}
		Ext.onReady(function(){
			
			if(!"${userAdmin}" || "" == "${userAdmin}"){
				var window=Ext.getCmp("loginwindow");
				if(window){
					window.show();
				}else{
					Ext.create("core.app.view.LoginWindow").show();
				}
			}
			
		});

	    document.onkeydown=keyDownSearch;  
	      
	    function keyDownSearch(e) {    
	        // 兼容FF和IE和Opera    
	        var theEvent = e || window.event;    
	        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;    
	        if (code == 13 && ( !"${userAdmin}" || "" == "${userAdmin}" )) {    
	            Ext.getCmp("loginWindowLogin").fireEvent('click',Ext.getCmp("loginWindowLogin"));
	            return false;    
	        }    
	        return true;    
	    }  
		</script>
    </head>
    <body>
       
    </body>
</html>
