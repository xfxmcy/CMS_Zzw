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
import java.util.List;
import java.util.Map;

import com.zzw.pojo.Pages;
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
public class UserDaoImpl extends BasicDaoImpl<ZUser> implements UserDao {

	
	
	
	
	@Override
	public ZUser userLoginDao(ZUser user) {
		String hql = "from ZUser  where username = :username and password = :password";
		Map<String, Object> param = new HashMap<String, Object>();
		param.put("username", user.getUsername());
		param.put("password", user.getPassword());
		return super.queryByHql(hql, param);
	}

	/**
	 * queryUsers  query users
	 *
	 * @param page page
	 * @return
	 */
	@Override
	public List<ZUser> queryUsers(Pages page) {
		return getCurrentSession().createQuery("from ZUser order by usercode asc").setFirstResult(page.getBeginIndex())
				.setMaxResults(page.getCount()).list();
	}

	/**
	 * queryCountUsers
	 *
	 * @return query count users
	 */
	@Override
	public Long queryCountUsers() {
		Object result = getCurrentSession().createQuery("select count(*) from ZUser").uniqueResult();

		return (null == result ? 0 : (Long)result);
	}

}

