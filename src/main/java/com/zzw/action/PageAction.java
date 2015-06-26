/**
 * PageAction.java
 * com.zzw.action
 *
 * Function： TODO 
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年6月23日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.action;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;

/**
 * ClassName:PageAction
 * Function: page action
 * Reason:	 page action
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年6月23日		下午4:15:13
 *
 * @see 	 
 */
@Results({   
	  @Result(name="failure", location="/WEB-INF/fail.jsp"),
	  @Result(name="index", location="/index.jsp")
	})
public class PageAction {
	
	@Action("page/index")
	public String index(){
		
		return "index";
	}
}

