/**
 * UserDaoImpl.java
 * com.zzw.dao.impl
 *
 * Function： TODO 
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年7月1日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.dao.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.zzw.dao.UserDao;
import com.zzw.vo.ZUser;

/**
 * ClassName:UserDaoImpl
 * Function: implement user dao
 * Reason:	 implement user dao
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年7月1日		下午4:33:38
 *
 * @see 	 
 */
@Repository
public class UserDaoImpl extends BasicDaoimpl<ZUser> implements UserDao {

	
	
	
	
	@Override
	public ZUser userLoginDao(ZUser user) {
		
		String hql = "from LinkMaterial as link where link.material.mid =1";
		Map<String, Object> param = new HashMap<String, Object>();
		
		ZUser result = super.queryByHql(hql, param);
		return result ;
	}

}

