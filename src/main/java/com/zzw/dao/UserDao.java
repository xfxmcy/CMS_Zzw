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

import com.zzw.pojo.Pages;
import com.zzw.vo.ZUser;

import java.util.List;

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
public interface UserDao extends BasicDao<ZUser>{
	
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

	/**
	 * queryUsers  query users
	 * @param paged page
	 * @return
     */
	List<ZUser> queryUsers(Pages paged);

	/**
	 * queryCountUsers
	 * @return  query count users
     */
	Long queryCountUsers();

	/**
	 * merger user exclude password
	 * @param user
     */
	int mergeUser(ZUser user);
}

