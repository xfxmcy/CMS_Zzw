/**
 * UserServiceImpl.java
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

package com.zzw.service.impl;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.zzw.dao.UserDao;
import com.zzw.service.UserService;
import com.zzw.vo.ZUser;

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

}

