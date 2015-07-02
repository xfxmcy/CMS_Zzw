/**
 * BaseAction.java
 * com.zzw.action
 *
 * Function： base action
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年7月1日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.action;

import javax.inject.Inject;

import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.zzw.component.ResultInfo;

/**
 * ClassName:BaseAction
 * Function: base action
 * Reason:	 base action
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年7月1日		下午3:28:11
 *
 * @see 	 
 */
@Controller
@Namespace("")
@Scope("prototype")
public class BaseAction extends ActionSupport {
	
	public static final String BASE_RESULT_JSON = "json";

	/**
	 * serialVersionUID:serialVersionUID
	 *
	 */
	
	private static final long serialVersionUID = 1L;

	/*json 返回信息*/
	@Inject
	private ResultInfo resultInfo ;
	
	public ResultInfo getResultInfo() {
		return resultInfo;
	}

	public void setResultInfo(ResultInfo resultInfo) {
		this.resultInfo = resultInfo;
	}
	
	/**
	 * 
	 * settingSuccessResult: 设置成功信息
	 *
	 * @param info
	 * @param result
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月1日 		cy
	 */
	public void settingSuccessResult(String info,Object result){
		resultInfo.setSuccess(true);
		resultInfo.setInfo(info);
		resultInfo.setResult(result);
	}
	/**
	 * 
	 * settingErrorResult: 设置失败信息
	 *
	 * @param info
	 * @param result
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月1日 		cy
	 */
	public void settingErrorResult(String info,Object result){
		resultInfo.setSuccess(false);
		resultInfo.setInfo(info);
		resultInfo.setResult(result);
	}
}

