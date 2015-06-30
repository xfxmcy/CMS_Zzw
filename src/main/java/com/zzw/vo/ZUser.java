/**
 * ZUser.java
 * com.zzw.vo
 *
 * Function： TODO 
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年6月30日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.vo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;



/**
 * ClassName:ZUser
 * Function: zuser
 * Reason:	 zuser
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年6月30日		上午10:19:45
 *
 * @see 	 
 */
@Entity
public class ZUser implements Serializable {
	/**
	 * serialVersionUID:TODO（用一句话描述这个变量表示什么）
	 */
	
	private static final long serialVersionUID = 1L;

	public ZUser() {

	}
	
	private String id;
	
	private String username,password;
	
	@Id
	@Column(length = 40)
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	@Column(length = 40)
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	@Column(length = 40)
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}

