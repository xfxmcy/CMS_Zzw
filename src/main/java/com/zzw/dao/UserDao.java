/**
 * UserDao.java
 * com.zzw.dao
 *
 * Function： TODO 
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年7月1日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.dao;

import com.zzw.vo.ZUser;

/**
 * ClassName:UserDao
 * Function: user dao
 * Reason:	 user dao
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年7月1日		下午4:33:04
 *
 * @see 	 
 */
public interface UserDao {
	
	/**
	 * 
	 * userLoginDao: user login dao
	 *
	 * @param user
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月1日 		cy
	 */
	public ZUser userLoginDao(ZUser user);
}

