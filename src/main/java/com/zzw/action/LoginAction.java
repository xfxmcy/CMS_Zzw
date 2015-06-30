/**
 * LoginAction.java
 * com.zzw.action
 *
 * Function： TODO 
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年6月30日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.action;

import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.zzw.vo.ZUser;

/**
 * ClassName:LoginAction
 * Function: login 
 * Reason:	 login
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年6月30日		上午10:14:23
 *
 * @see 	 
 */
@ParentPackage("json-default")
@Controller
@Scope("prototype")
@Results({   
	  @Result(name="failure", location="/WEB-INF/fail.jsp"),
	  @Result(name="index", location="/index.html"),
	  @Result(name="loginError" ,type="json")
	})
public class LoginAction {
	
	private ZUser user ;
	
	public ZUser getUser() {
		return user;
	}

	public void setUser(ZUser user) {
		this.user = user;
	}

	/**
	 * 
	 * userLogin: user login
	 *
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年6月30日 		cy
	 */
	public String userLogin(){
		return "loginError";
	}
}

