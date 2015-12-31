/**
 * ResultInfo.java
 * com.zzw.component
 *
 * Function： json resultInfo
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年6月30日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.component;

import java.io.Serializable;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

/**
 * ClassName:ResultInfo
 * Function: json resultInfo
 * Reason:	 json resultInfo
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年6月30日		下午9:03:47
 *
 * @see 	 
 */
@Component
public class ResultInfo implements Serializable{
	/**
	 * serialVersionUID:serialVersionUID
	 *
	 */
	
	private static final long serialVersionUID = 1L;
	
	public ResultInfo() {

	}
	
	private boolean success = false ;
	
	private String info;
	
	private Object result ;

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public Object getResult() {
		return result;
	}

	public void setResult(Object result) {
		this.result = result;
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
		this.setSuccess(true);
		this.setInfo(info);
		this.setResult(result);
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
		this.setSuccess(false);
		this.setInfo(info);
		this.setResult(result);
	}
}

