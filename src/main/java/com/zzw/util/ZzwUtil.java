/**
 * ZzwUtil.java
 * com.zzw.util
 *
 * Function： TODO 
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年7月3日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.util;

import java.io.File;
import java.io.IOException;
import java.io.Writer;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.dom4j.Attribute;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.alibaba.fastjson.JSONObject;
import com.zzw.pojo.Pages;
import com.zzw.vo.ZUser;

/**
 * ClassName:ZzwUtil
 * Function: ZzwUtil
 * Reason:	 ZzwUtil
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年7月3日		上午10:53:33
 *
 * @see 	 
 */
public class ZzwUtil {
	
	/**
	 * 
	 * formatDateTime: transform to dateTime
	 *
	 * @param d
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月3日 		cy
	 */
	public static String formatDateTime(Date d){
		SimpleDateFormat datetimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		 if (d == null)
	        {
	            return "";
	        }
	     return datetimeFormat.format(d);
	}
	/**
	 * 
	 * formatDate:trans to Date
	 *
	 * @param d
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月3日 		cy
	 */
	public static String formatDate(Date d){
		SimpleDateFormat datetimeFormat = new SimpleDateFormat("yyyy-MM-dd");
		if (d == null)
		{
			return "";
		}
		return datetimeFormat.format(d);
	}
	/**
	 * 
	 * createPaged:create page object
	 *
	 * @param start
	 * @param limit
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月3日 		cy
	 */
	public static Pages createPaged(Integer start , Integer limit){
		Pages page = new Pages();
		page.setBeginIndex(null == start ? 0 : start);
		page.setCount(null == limit ? 0 : limit);
		return page;
	}
	
	/**
	 * 
	 * writeJson:write json 
	 *
	 * @param response	response
	 * @param result	result
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月8日 		cy
	 */
	public static void writeJson(HttpServletResponse response , Object result){
		if(null != response) {
			Writer writer = null;
			try {
				response.setCharacterEncoding("utf-8");
				writer =  response.getWriter();
				String res = JSONObject.toJSONString(result);
				writer.write(res);
			} catch (IOException e) {
				e.printStackTrace();
			}finally{
				try {
					writer.flush();
					writer.close();
					response.flushBuffer();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	
	/**
	 * 
	 * getJPDLKEY: get key from jpdl
	 *
	 * @param jpdl
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月8日 		cy
	 */
	public static String getJPDLKEY(File jpdl){
		/*读取XML文件,获得document对象*/
		SAXReader reader = new SAXReader();  
		Document  document = null; 
		Element root = null ;
		try {
			document = reader.read(jpdl);
			root = document.getRootElement();  
			Attribute attribute=root.attribute("key");  
			String value = attribute.getText();
			return value ;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}
	/**
	 * 
	 * getLoginUser:get login user
	 *
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月8日 		cy
	 */
	public static ZUser getLoginUser(){
		Object admin = ServletActionContext.getRequest().getSession().getAttribute(ResourceUtil.getUserAdmin());
		if(null != admin)
			return (ZUser)admin; 
		return null ;
	}

	/**
	 * 根据user list 得出 usrIds
	 * @param list
	 * @return
     */
	public static String getListUserIds(List<ZUser> list){
		if(null == list || 0 == list.size())
			return "1";
		StringBuffer stringBuffer = new StringBuffer();
		for (ZUser user : list)
			stringBuffer.append(user.getId()+",");
		return stringBuffer.substring(0,stringBuffer.length()-1);
	}
}

