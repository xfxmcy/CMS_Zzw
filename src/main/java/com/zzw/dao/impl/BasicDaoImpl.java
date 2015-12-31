/**
 * BasicDaoimpl.java
 * com.zzw.service.impl
 *
 * Function： basic dao impl
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年7月1日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.dao.impl;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.inject.Inject;

import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;

import com.zzw.dao.BasicDao;

/**
 * ClassName:BasicDaoimpl
 * Function: basic dao impl
 * Reason:	 basic dao impl
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年7月1日		下午4:28:34
 *
 * @see 	 
 */
@Repository
public class BasicDaoImpl<ZZW> implements BasicDao<ZZW> {

	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(BasicDaoImpl.class);
	
	@Inject
	SessionFactory sessionFactory;
	
	Session session = null;
	
	
	public Session getCurrentSession(){
		 session = sessionFactory.getCurrentSession();
		 return session;
	};
	
	@Override
	public ZZW queryByHql(String hql, Map<String, Object> param) {
		List<ZZW> list  = null;
		list = this.createQueryByMap(hql,param).list(); 
		if(null != list && 0 != list.size())
			return list.get(0);
		return null;
	};
	
	/**
	 * 
	 * createQueryByMap:construct query
	 *
	 * @param hql
	 * @param param
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月1日 		cy
	 */
	public Query createQueryByMap(String hql, Map<String, Object> param) {
		
		Query query = this.getCurrentSession().createQuery(hql);
		if(null != param){
			for (Map.Entry<String, Object> mapEntry : param.entrySet()) {
				query.setParameter(mapEntry.getKey(), mapEntry.getValue());
			}
		}		
		return query;
	}
	public SQLQuery createSqlQueryByMap(String sql, Map<String, Object> param) {
		
		SQLQuery query = this.getCurrentSession().createSQLQuery(sql);
		if(null != param){
			for (Map.Entry<String, Object> mapEntry : param.entrySet()) {
				query.setParameter(mapEntry.getKey(), mapEntry.getValue());
			}
		}		
		return query;
	}
	@Override
	public void persistence(ZZW object) {
		
		 this.getCurrentSession().persist(object);
		
	}

	@Override
	public ZZW query(Class type ,String id) {
		
		return (ZZW) this.getCurrentSession().get(type, id);
	}

	@Override
	public void remove(ZZW object) {
		
		this.getCurrentSession().delete(object);
		
	}

	@Override
	public void removeGeneral(Class cls,Serializable id) {
		this.getCurrentSession().delete(getCurrentSession().get(cls,id));
	}

	@Override
	public void merge(ZZW object) {
		this.getCurrentSession().merge(object);
	};
}

