<%@ page  language="java" pageEncoding="UTF-8"%>

<%
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
%>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">


<!-- js -->
<script type="text/javascript" src="<%=basePath%>/ext4/ext-all.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=basePath%>/ext4/ext-lang-zh_CN.js" charset="utf-8"></script>
<!-- css -->
<link rel="stylesheet" href="<%=basePath%>/ext4/resources/ext-theme-gray/ext-theme-gray-all.css" type="text/css"></link>
