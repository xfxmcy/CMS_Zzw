/**
 * WorkFlowDaoImpl.java
 * com.zzw.dao.impl
 *
 * Function： query advanced workflow
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年7月3日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.dao.impl;

import java.math.BigInteger;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import javax.inject.Inject;

import com.zzw.pojo.HistoryAssess;
import com.zzw.vo.*;
import org.apache.commons.collections.CollectionUtils;
import org.hibernate.Hibernate;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.Transformers;
import org.jbpm.api.task.Task;
import org.springframework.stereotype.Repository;

import com.zzw.dao.WorkFlowDao;
import com.zzw.pojo.Pages;

/**
 * ClassName:WorkFlowDaoImpl
 * Function: query advanced workflow
 * Reason:	 query advanced workflow
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年7月3日		上午9:27:54
 *
 * @see 	 
 */
@Repository
public class WorkFlowDaoImpl extends BasicDaoImpl<WFDeployment> implements WorkFlowDao{



	@Override
	public List<Task> queryMyTaskIncludeGroup(ZUser user , Pages page) {
	
		/*拼接  groupStr*/
		String[] group = null;
		int j = 0 ;
		if(null != user.getJobs().toArray() && 0 < user.getJobs().size()){
			group = new String[user.getJobs().size()];
			for (Iterator iterator = user.getJobs().iterator(); iterator.hasNext();) {
				group[j++] = ((ZJob)iterator.next()).getRole().getId();

			}
		}else{
			return new ArrayList<Task>();
		}
		StringBuffer buffer = new StringBuffer();
		String groupStr = "";
		for (int i = 0; i < group.length; i++) {
			buffer.append("'" + group[i] + "',");
		};
		groupStr = buffer.substring(0,  buffer.length()-1);


		Query result = getCurrentSession().createQuery("select task from org.jbpm.pvm.internal.task.TaskImpl task "
				+ "left join task.participations  pt "
				+ "where (task.assignee='" + user.getId()+"' or ( task.assignee is null and pt.type = 'candidate'"
				+ "and ((pt.userId='" + user.getId() + "') or (pt.groupId in (" + groupStr + ")))))");
		result.setFirstResult(page.getBeginIndex());
		result.setMaxResults(page.getCount());
		return result.list();
	}

	@Override
	public Long queryCountMyTaskIncludeGroup(ZUser user) {
		
		/*拼接  groupStr*/
		String[] group = null;
		int j = 0 ;
		if(null != user.getJobs().toArray() && 0 < user.getJobs().size()){
			group = new String[user.getJobs().size()];
			for (Iterator iterator = user.getJobs().iterator(); iterator.hasNext();) {
				group[j++] = ((ZJob)iterator.next()).getRole().getId();

			}
		}else{
			return 0l;
		}
		StringBuffer buffer = new StringBuffer();
		String groupStr = "";
		for (int i = 0; i < group.length; i++) {
			buffer.append("'" + group[i] + "',");
		};
		groupStr = buffer.substring(0,  buffer.length()-1);

		Object result = getCurrentSession().createQuery("select count(task) from org.jbpm.pvm.internal.task.TaskImpl task "
				+ "left join task.participations  pt "
				+ "where (task.assignee='" + user.getId()+"' or ( task.assignee is null and pt.type = 'candidate'"
				+ "and ((pt.userId='" + user.getId() + "') or (pt.groupId in (" + groupStr + ")))))").uniqueResult();


		return (null == result ? 0 : (Long)result);

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<WFDeployment> queryBusinessDevelopment(Pages page) {

		return getCurrentSession().createQuery("from WFDeployment").setFirstResult(page.getBeginIndex()).setMaxResults(page.getCount()).list();
	}

	@Override
	public Long queryCountBusinessDevelopment() {

		Object result = getCurrentSession().createQuery("select count(*) from WFDeployment").uniqueResult();

		return (null == result ? 0 : (Long)result);
	}

	@Override
	public void saveWFDevelopment(WFDeployment deploy) {

		super.persistence(deploy);

	}

	@Override
	public WFDeployment queryBusinessDevelopmentById(String id) {
		return super.query(WFDeployment.class, id);
	}

	@Override
	public void removeWFDevelopment(WFDeployment deploy) {

		super.remove(deploy);

	}

	/**
	 * 根据流程实例ID 查询 流程部署 名称
	 *
	 * @param executionId 流程实例ID
	 * @return
	 */
	@Override
	public String queryJBPMDeployNameByInstanceId(String executionId) {

		List<String> list = getCurrentSession().createSQLQuery("SELECT" +
				" deploy.NAME_" +
				" FROM" +
				" jbpm4_deployment deploy" +
				" inner JOIN jbpm4_deployprop prop ON deploy.DBID_ = prop.DEPLOYMENT_" +
				" AND prop.KEY_ = 'pdid' " +
				" inner JOIN jbpm4_execution execu ON prop.STRINGVAL_ = execu.PROCDEFID_" +
				" where execu.ID_ = ?").addScalar("NAME_", Hibernate.STRING).setParameter(0, executionId).list();
		if(null != list && 0 < list.size())
			return list.get(0);
		return null;
	}

	/**
	 * query development_ by taskid
	 *
	 * @param id
	 * @return
	 */
	@Override
	public Blob queryDevelopmentByTaskId(String id) {
		List<Blob> list = getCurrentSession().createSQLQuery("SELECT" +
				" lob.BLOB_VALUE_" +
				" FROM" +
				" jbpm4_lob lob" +
				" inner JOIN  jbpm4_deployprop prop on lob.DEPLOYMENT_ = prop.DEPLOYMENT_ "+
				" AND prop.KEY_ = 'pdid' " +
				" inner JOIN jbpm4_execution execu ON prop.STRINGVAL_ = execu.PROCDEFID_" +
				" INNER JOIN jbpm4_task  task on task.EXECUTION_ID_ = execu.ID_" +
				" where task.DBID_ = ?").addScalar("BLOB_VALUE_", Hibernate.BLOB).setParameter(0, id).list();
		if(null != list && 0 < list.size())
			return list.get(0);
		return null;
	}

	/**
	 * query my already tasks
	 *
	 * @param id
	 * @param paged
	 * @return
	 */
	@Override
	public List<HistoryAssess> queryMyAlreadyTasks(String id, Pages paged) {
		return getCurrentSession().createSQLQuery("SELECT " +
               /* " detail.DBID_" +*/
				" u.username," +
				" ht.OUTCOME_," +
				" ht.DURATION_," +
				" ht.ASSIGNEE_," +
				" detail.TIME_," +
				" detail.MESSAGE_," +
				" var.STRING_VALUE_ as modelName," +
				" varBus.STRING_VALUE_ as businessId"+
				" FROM" +
				" jbpm4_hist_detail detail" +
				" INNER JOIN jbpm4_hist_task ht ON ht.DBID_ = detail.HTASK_" +
				" INNER JOIN jbpm4_hist_procinst hin ON ht.EXECUTION_ = hin.ID_" +
				" INNER JOIN zapplication app ON hin.ID_ = app.processInstanceId" +
				" LEFT JOIN zuser u ON u.id = ht.ASSIGNEE_" +
				" LEFT JOIN jbpm4_variable var on var.EXECUTION_ = hin.DBID_ and var.KEY_ = 'modelName'"+
				" LEFT JOIN jbpm4_variable varBus on varBus.EXECUTION_ = hin.DBID_ and varBus.KEY_ = 'businessId'"+
				" WHERE" +
				//注册到非 Hibernate pojo 中：
				" ht.ASSIGNEE_ = ? and ht.END_ is not null order by detail.TIME_ desc").addScalar("TIME_", Hibernate.TIMESTAMP)
				.addScalar("OUTCOME_",Hibernate.STRING)
				.addScalar("username",Hibernate.STRING)
				.addScalar("DURATION_",Hibernate.BIG_INTEGER)
				.addScalar("ASSIGNEE_",Hibernate.STRING)
				.addScalar("MESSAGE_",Hibernate.STRING)
				.addScalar("modelName",Hibernate.STRING)
				.addScalar("businessId",Hibernate.STRING)
				.setResultTransformer(Transformers.aliasToBean(HistoryAssess.class)).setParameter(0,id)
				.setFirstResult(paged.getBeginIndex())
				.setMaxResults(paged.getCount()).list();
	}

	/**
	 * query count
	 *
	 * @param id
	 * @return
	 */
	@Override
	public Long queryCountMyApplication(String id) {
		Object result = getCurrentSession().createSQLQuery("select count(*) from jbpm4_hist_task where ASSIGNEE_ = ? and END_ is not null")
				.setParameter(0,id).uniqueResult();
		return (null == result ? 0 : ((BigInteger)result).longValue());
	}

	@Override
	public WFDeployment queryWFDeploymentByDFID(String pdId) {
		List<WFDeployment> list = getCurrentSession().createQuery("from WFDeployment where processDefinitionId = ?")
				.setParameter(0, pdId).list();
		if(null != list && 0 < list.size())
			return list.get(0);
		return null;

	}


}

