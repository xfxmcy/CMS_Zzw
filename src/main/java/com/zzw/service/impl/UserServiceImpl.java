/**
 * UserServiceImpl.java
 * com.zzw.service.impl
 *
 * Function： implment of user service
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年7月1日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.service.impl;

import javax.inject.Inject;

import com.zzw.pojo.Pages;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.zzw.dao.UserDao;
import com.zzw.service.UserService;
import com.zzw.vo.ZUser;

import java.util.List;

/**
 * ClassName:UserServiceImpl
 * Function: implment of user service
 * Reason:	 implment of user service
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年7月1日		下午4:19:15
 *
 * @see 	 
 */
@Transactional
@Service
public class UserServiceImpl implements UserService {

	@Inject
	private UserDao userDaoImpl ;
	
	public UserDao getUserDaoImpl() {
		return userDaoImpl;
	}

	public void setUserDaoImpl(UserDao userDaoImpl) {
		this.userDaoImpl = userDaoImpl;
	}


	@Transactional(propagation = Propagation.NOT_SUPPORTED ,readOnly = true)
	@Override
	public ZUser userLoginService(ZUser user) {
		return userDaoImpl.userLoginDao(user);

	}

	/**
	 * save user
	 *
	 * @param user user
	 */
	@Override
	public void saveUser(ZUser user) {
		userDaoImpl.persistence(user);
	}

	@Override
	public Long doQueryCountUsers() {
		return userDaoImpl.queryCountUsers();
	}

	@Override
	public List<ZUser> doQueryUsers(Pages paged) {
		return userDaoImpl.queryUsers(paged);
	}

	/**
	 * update user
	 *
	 * @param user user
	 */
	@Override

	public void updateUser(ZUser user) {

		userDaoImpl.mergeUser(user);
	}

	/**
	 * delete user
	 *
	 * @param user user
	 */
	@Override
	public void deleteUser(ZUser user) {
		userDaoImpl.remove(user);
	}

	/**
	 * query users by role
	 *
	 * @param assigneeRoleId
	 * @return
	 */
	@Override
	public List<ZUser> queryUsersByRoles(String assigneeRoleId) {


		return userDaoImpl.doQueryUsersByRoles(assigneeRoleId);
	}

}

