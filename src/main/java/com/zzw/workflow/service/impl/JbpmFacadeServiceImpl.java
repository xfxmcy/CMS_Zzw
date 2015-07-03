/**
 * JbpmFacadeServiceImpl.java
 * com.zzw.workflow.service
 *
 * Function： TODO 
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年6月25日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.workflow.service.impl;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.inject.Inject;

import org.jbpm.api.DeploymentQuery;
import org.jbpm.api.ExecutionService;
import org.jbpm.api.HistoryService;
import org.jbpm.api.NewDeployment;
import org.jbpm.api.ProcessDefinitionQuery;
import org.jbpm.api.RepositoryService;
import org.jbpm.api.TaskService;
import org.jbpm.api.model.ActivityCoordinates;
import org.jbpm.api.task.Task;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.zzw.dao.WorkFlowDao;
import com.zzw.pojo.Pages;
import com.zzw.pojo.WfTaskJobPojo;
import com.zzw.util.ZzwUtil;
import com.zzw.vo.ZUser;
import com.zzw.workflow.service.JbpmFacadeService;

/**
 * ClassName:JbpmFacadeServiceImpl
 * Function: implement of jbpm facade
 * Reason:	 implement of jbpm facade
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年6月25日		下午3:16:39
 *
 * @see 	 
 */
@Service
public class JbpmFacadeServiceImpl implements JbpmFacadeService {

	@Inject
	private TaskService taskService;
	@Inject
	private ExecutionService executionService;
	@Inject
	private HistoryService historyService;
	@Inject
	private RepositoryService repositoryService;
	@Inject
	private WorkFlowDao workFlowDaoImpl;
	
	
	

	@Override
	public NewDeployment createDeployment() {
		
		// TODO Auto-generated method stub
		return null;
		
	}

	@Override
	public DeploymentQuery createDeploymentQuery() {
		
		// TODO Auto-generated method stub
		return null;
		
	}

	@Override
	public ProcessDefinitionQuery createProcessDefinitionQuery() {
		
		// TODO Auto-generated method stub
		return null;
		
	}

	@Override
	public void deleteDeployment(String arg0) {
		
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteDeploymentCascade(String arg0) {
		
		// TODO Auto-generated method stub
		
	}

	@Override
	public ActivityCoordinates getActivityCoordinates(String arg0, String arg1) {
		
		// TODO Auto-generated method stub
		return null;
		
	}

	@Override
	public InputStream getResourceAsStream(String arg0, String arg1) {
		
		// TODO Auto-generated method stub
		return null;
		
	}

	@Override
	public Set<String> getResourceNames(String arg0) {
		
		// TODO Auto-generated method stub
		return null;
		
	}

	@Override
	public List<String> getStartActivityNames(String arg0) {
		
		// TODO Auto-generated method stub
		return null;
		
	}

	@Override
	public String getStartFormResourceName(String arg0, String arg1) {
		
		// TODO Auto-generated method stub
		return null;
		
	}

	@Override
	public void resumeDeployment(String arg0) {
		
		// TODO Auto-generated method stub
		
	}

	@Override
	public void suspendDeployment(String arg0) {
		
		// TODO Auto-generated method stub
		
	}
	
	@Transactional(propagation = Propagation.NOT_SUPPORTED ,readOnly = true)
	@Override
	public List<WfTaskJobPojo> queryMyTasks(ZUser user , Pages page) {
		
		List<Task> result = workFlowDaoImpl.queryMyTaskIncludeGroup(user, page);
		
		
		return transformToTaskModel(result);
	}
	@Transactional(propagation = Propagation.NOT_SUPPORTED ,readOnly = true)
	@Override
	public Long queryCountMyTasks(ZUser user) {
		
		return workFlowDaoImpl.queryCountMyTaskIncludeGroup(user);
	}
	/**
	 * 
	 * transformToTaskModel:transform to WfTaskJobPojo from task
	 *
	 * @param result
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月3日 		cy
	 */
	private List<WfTaskJobPojo> transformToTaskModel(List<Task> result) {
		List<WfTaskJobPojo> taskJobs = new ArrayList<WfTaskJobPojo>();
		if(null == result || 0 == result.size())
			return taskJobs;
		WfTaskJobPojo pojo = null;
		for (Task task : result) {
			pojo = new WfTaskJobPojo();
			pojo.setTaskId(task.getId());
			pojo.setTaskName(task.getName());
			pojo.setCreateTime(ZzwUtil.formatDateTime(task.getCreateTime()));
			taskJobs.add(pojo);
		}
		return taskJobs;
		
	}

	public TaskService getTaskService() {
		return taskService;
	}

	public void setTaskService(TaskService taskService) {
		this.taskService = taskService;
	}

	public ExecutionService getExecutionService() {
		return executionService;
	}

	public void setExecutionService(ExecutionService executionService) {
		this.executionService = executionService;
	}

	public HistoryService getHistoryService() {
		return historyService;
	}

	public void setHistoryService(HistoryService historyService) {
		this.historyService = historyService;
	}

	public RepositoryService getRepositoryService() {
		return repositoryService;
	}

	public void setRepositoryService(RepositoryService repositoryService) {
		this.repositoryService = repositoryService;
	}
	public WorkFlowDao getWorkFlowDaoImpl() {
		return workFlowDaoImpl;
	}

	public void setWorkFlowDaoImpl(WorkFlowDao workFlowDaoImpl) {
		this.workFlowDaoImpl = workFlowDaoImpl;
	}

	
}

