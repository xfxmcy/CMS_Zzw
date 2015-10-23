/**
 * WorkFlowDaoImpl.java
 * com.zzw.dao.impl
 *
 * Function： TODO 
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年7月3日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.dao.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import javax.inject.Inject;

import org.apache.commons.collections.CollectionUtils;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.jbpm.api.task.Task;
import org.springframework.stereotype.Repository;

import com.zzw.dao.WorkFlowDao;
import com.zzw.pojo.Pages;
import com.zzw.vo.WFDeployment;
import com.zzw.vo.ZJob;
import com.zzw.vo.ZRole;
import com.zzw.vo.ZUser;

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

}

