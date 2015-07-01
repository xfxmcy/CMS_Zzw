/**
 * UserService.java
 * com.zzw.service.impl
 *
 * Function： TODO 
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年7月1日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.service;

import com.zzw.vo.ZUser;

/**
 * ClassName:UserService
 * Function: user service
 * Reason:	 user service
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年7月1日		下午4:16:07
 *
 * @see 	 
 */
public interface UserService {
	/**
	 * 
	 * userLoginService:user login service
	 *
	 * @param user
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月1日 		cy
	 */
	public ZUser userLoginService(ZUser user);	
}

