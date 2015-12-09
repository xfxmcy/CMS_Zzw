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

import com.zzw.pojo.Pages;
import com.zzw.vo.ZUser;

import java.util.List;

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

	/**
	 * doQueryUsers query users
	 * @param paged	page
	 * @return
     */
	List<ZUser> doQueryUsers(Pages paged);

	/**
	 * doQueryCountUsers
	 * @return	count
     */
	Long doQueryCountUsers();

	/**
	 * save user
	 * @param user user
     */
	void saveUser(ZUser user);

	/**
	 * update user
	 * @param user user
     */
	void updateUser(ZUser user);

	/**
	 * delete user
	 * @param user	user
     */
	void deleteUser(ZUser user);

	/**
	 * query users by role
	 * @param assigneeRoleId
	 * @return
     */
	List<ZUser> queryUsersByRoles(String assigneeRoleId);
}

