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

import java.text.SimpleDateFormat;
import java.util.Date;

import com.zzw.pojo.Pages;

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
}

