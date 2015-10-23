package com.zzw.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.zzw.dao.RoleDao;
import com.zzw.pojo.Pages;
import com.zzw.vo.ZRole;
/**
 * 
 * ClassName:RoleDaoImpl role dao Impl
 *
 * @author   李丛阳
 * @version  
 * @since    Ver 1.1
 * @Date	 2015	2015年10月23日		下午2:22:16
 *
 * @see
 */
@Repository
public class RoleDaoImpl extends BasicDaoImpl<ZRole> implements RoleDao {

	@Override
	public List<ZRole> queryZrolePaegd(Map<String, Object> param, Pages page) {
		return getCurrentSession().createQuery("select count(*) from ZRole").list();
	}

	@Override
	public Long queryCountZrolePaegd(Map<String, Object> param) {
		Object result = getCurrentSession().createQuery("select count(*) from ZRole").uniqueResult();
		
		return (null == result ? 0 : (Long)result);
	}

}
