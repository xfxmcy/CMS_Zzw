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
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;

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
@Controller
@Results({   
	  @Result(name="failure", location="/WEB-INF/fail.jsp"),
	  @Result(name="index", location="/index.html")
	})
public class PageAction {
	
	private String index;
	public String getIndex() {
		return index;
	}
	public void setIndex(String index) {
		this.index = index;
	}
	/**
	 * 
	 * index: page location
	 *
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年6月30日 		cy
	 */
	@Action("page/index")
	public String index(){
		
		/* index */
		if("index".equals(index))
			return "index";
		
		
		
		return "index";
	}
}

