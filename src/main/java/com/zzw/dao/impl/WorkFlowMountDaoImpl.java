package com.zzw.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.zzw.dao.WorkFlowMountDao;
import com.zzw.pojo.Pages;
import com.zzw.vo.WFProcessMount;

@Repository
public class WorkFlowMountDaoImpl extends BasicDaoImpl<WFProcessMount> implements WorkFlowMountDao {

	@Override
	public void saveWfprocessmount(WFProcessMount process) {
		super.persistence(process);
	}

	@Override
	public List<WFProcessMount> queryBusinessProcessMount(Pages page) {
		
		return getCurrentSession().createQuery("from WFProcessMount").setFirstResult(page.getBeginIndex()).setMaxResults(page.getCount()).list();
		
	}

	@Override
	public Long queryCountBusinessProcessMount() {
		Object result = getCurrentSession().createQuery("select count(*) from WFProcessMount").uniqueResult();
		
		return (null == result ? 0 : (Long)result);
	}

	@Override
	public void mountProcess(WFProcessMount mount) {
		getCurrentSession().createQuery("update WFProcessMount set mountStatus = ? where id = ? ")
			.setParameter(0, mount.getMountStatus())
			.setParameter(1, mount.getId()).executeUpdate();
		
	}

	/**
	 * query WFMountByKey
	 *
	 * @param key
	 * @return
	 */
	@Override
	public List<WFProcessMount> doQueryWFMountByKey(String key) {
		return getCurrentSession().createSQLQuery("select wp.* from wfprocessmount wp LEFT JOIN wfdeployment deploy ON wp.deployment_id = deploy.id" +
				" where deploy.processKey = ?").addEntity(WFProcessMount.class).setParameter(0,key).list();
	}
}
