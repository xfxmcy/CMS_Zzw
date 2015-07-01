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

import javax.inject.Inject;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.json.annotations.JSON;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.zzw.component.ResultInfo;
import com.zzw.service.UserService;
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
@Controller
@Scope("prototype")
@ParentPackage("json-default")
@Namespace("/sys")	
@Action("loginAction")
@Results({   
	  @Result(name="failure", location="/WEB-INF/fail.jsp"),
	  @Result(name="index", location="/index.html"),
	  @Result(name="json" ,type="json")
	})
public class LoginAction extends BaseAction{
	
	@Inject
	private UserService userServiceImpl ;
	
	@JSON(serialize=false)
	public UserService getUserServiceImpl() {
		return userServiceImpl;
	}

	public void setUserServiceImpl(UserService userServiceImpl) {
		this.userServiceImpl = userServiceImpl;
	}

	/**
	 * serialVersionUID:serialVersionUID
	 *
	 */
	
	private static final long serialVersionUID = 1L;
	
	/**
	 * 变量名  不要使用大小混写   eg zUser 
	 * 		bug 赋值不了
	 */
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
		
		userServiceImpl.userLoginService(user);
		
		settingSuccessResult("","");
		
		return BASE_RESULT_JSON;
	}
}

