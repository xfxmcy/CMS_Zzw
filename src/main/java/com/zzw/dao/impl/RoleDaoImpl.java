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
	public List<ZRole> queryZrolePaegdByDept(Map<String, Object> param, Pages page) {
		return createSqlQueryByMap("SELECT r.id,r.code,r.name,"
				+ "IF ( " 
				+ "(select count(*) from ZJob z where z.role_id =r.id and z.department_id = :departmentId) > 0,'1','0'"
				+ ") AS checked FROM ZRole r ORDER BY checked desc, r.code asc"
				,param).addEntity(ZRole.class).setFirstResult(page.getBeginIndex())
				.setMaxResults(page.getCount()).list();
	}

	@Override
	public Long queryCountZrole() {
		Object result = getCurrentSession().createQuery("select count(*) from ZRole").uniqueResult();
		
		return (null == result ? 0 : (Long)result);
	}

	@Override
	public List<ZRole> queryZrolePage(Pages page) {
		// TODO Auto-generated method stub
		return getCurrentSession().createQuery("from ZRole order by code asc").setFirstResult(page.getBeginIndex())
				.setMaxResults(page.getCount()).list();
	}

}
