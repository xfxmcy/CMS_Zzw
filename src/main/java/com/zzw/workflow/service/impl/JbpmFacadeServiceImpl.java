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

import java.io.File;
import java.io.InputStream;
import java.util.*;

import javax.inject.Inject;

import org.apache.commons.lang.StringUtils;
import org.jbpm.api.*;
import org.jbpm.api.model.ActivityCoordinates;
import org.jbpm.api.task.Task;
import org.jbpm.pvm.internal.util.StringUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.zzw.dao.WorkFlowDao;
import com.zzw.dao.WorkFlowMountDao;
import com.zzw.pojo.Pages;
import com.zzw.pojo.WfTaskJobPojo;
import com.zzw.util.ResourceUtil;
import com.zzw.util.ZzwUtil;
import com.zzw.vo.WFDeployment;
import com.zzw.vo.WFProcessMount;
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
@Transactional
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
	
	@Inject
	private WorkFlowMountDao workFlowMountDaoImpl;
	

	
	public void createDeployment(String filePath,Long version,String id) {
		/*jpdl*/
		File jpdl = new File(filePath); 
		NewDeployment deployment =repositoryService.createDeployment().addResourceFromFile(jpdl);
		String deployId = deployment.deploy();
	}

	
	@Transactional(propagation = Propagation.NOT_SUPPORTED ,readOnly = true)
	@Override
	public List<WfTaskJobPojo> queryMyTasks(ZUser user , Pages page) {
		
		List<Task> result = workFlowDaoImpl.queryMyTaskIncludeGroup(user, page);
		
		
		return transformToTaskModel(user,result);
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
	@Transactional(propagation = Propagation.NOT_SUPPORTED ,readOnly = true)
	private List<WfTaskJobPojo> transformToTaskModel(ZUser user ,List<Task> result) {
		List<WfTaskJobPojo> taskJobs = new ArrayList<WfTaskJobPojo>();
		if(null == result || 0 == result.size())
			return taskJobs;
		WfTaskJobPojo pojo = null;
		for (Task task : result) {
			pojo = new WfTaskJobPojo();
			pojo.setTaskId(task.getId());
			pojo.setTaskName(task.getName());
			pojo.setAssigne(user.getUsername());
			/*
			   根据流程实例ID 查询 流程部署 名称

			ProcessInstanceQuery instance = executionService.createProcessInstanceQuery().processInstanceId(task.getExecutionId());
			List<ProcessInstance> instanceList = instance.list();
			if(null != instanceList && 0 < instanceList.size()) {
			List<ProcessDefinition> definitionList = repositoryService.createProcessDefinitionQuery().processDefinitionId(instanceList.get(0).getProcessDefinitionId()).list();
				if(null != definitionList && 0 < definitionList.size()) {
				pojo.setProcessName(definitionList.get(0).getName());
			}*/


			pojo.setProcessName(workFlowDaoImpl.queryJBPMDeployNameByInstanceId(task.getExecutionId()));

			pojo.setCreateTime(ZzwUtil.formatDateTime(task.getCreateTime()));
			taskJobs.add(pojo);
		}
		return taskJobs;
		
	}
	
	
	@Transactional(propagation = Propagation.NOT_SUPPORTED ,readOnly = true)
	@Override
	public List<WFDeployment> queryBusinessDevelopment(Pages page) {
		
		return workFlowDaoImpl.queryBusinessDevelopment(page);
		
	}

	@Transactional(propagation = Propagation.NOT_SUPPORTED ,readOnly = true)
	@Override
	public Long queryCountBusinessDevelopment() {
		
		return workFlowDaoImpl.queryCountBusinessDevelopment();
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


	@Override
	public WFDeployment saveWFDevelopment(WFDeployment deploy) {
		deploy.setStatus("1");
		workFlowDaoImpl.saveWFDevelopment(deploy);
		return deploy;
	}


	@Override
	public void removeJPDL(String id) {
		
		WFDeployment deploy = workFlowDaoImpl.queryBusinessDevelopmentById(id);
		if(null == deploy)
			return;
		/*只删除WFDevelopment*/
		if(null == deploy.getProcessDefinitionId() || "".equals(deploy.getProcessDefinitionId())){
			workFlowDaoImpl.removeWFDevelopment(deploy);
		}
		/*已经部署 ,需要删除流程定义  实例  任务   jpdl文件    删除WFDevelopment*/
		else{
			/*最后一步*/
			workFlowDaoImpl.removeWFDevelopment(deploy);
		}
			
	}


	@Override
	public void delpoyProcessDefinition(String id) {
		if(null == id)
			return;
		WFDeployment deploy = workFlowDaoImpl.queryBusinessDevelopmentById(id);
		if(null == deploy)
			return;
		//文件上传地址
		String realPath = ResourceUtil.getUploadPath();
		//jpdl 文件定义
		File jpdl = new File(realPath + deploy.getFilePath());
		String deployId = repositoryService.createDeployment().addResourceFromFile(jpdl).setName(deploy.getProcessName()).deploy();
		if(StringUtils.isEmpty(deployId))
			return;
		List<ProcessDefinition> processDefinitios = repositoryService.createProcessDefinitionQuery()
				.processDefinitionKey(deploy.getProcessKey()).orderDesc(ProcessDefinitionQuery.PROPERTY_VERSION).list();
		//merge 部署表
		deploy.setDeployId(deployId);
		
		
		
		//persistence   流程挂接表  默认已挂接	
		
		WFProcessMount mount = null;
		mount = (null == deploy.getProcessMount() ? new WFProcessMount() : deploy.getProcessMount());
		mount.setMountStatus("1");
		ZUser user = ZzwUtil.getLoginUser();
		if(null != user)
			mount.setUpdateUser(user);
		mount.setDeployment(deploy);
		mount.setUpdateTime(new Date());
		/*是否已经部署   已经部署  更新部署信息*/
		if(null != deploy.getProcessMount())
			workFlowMountDaoImpl.merge(mount);
		else
			workFlowMountDaoImpl.persistence(mount);
		if(null != processDefinitios && 0 < processDefinitios.size()){
			deploy.setProcessDefinitionId(processDefinitios.get(0).getId());
			deploy.setPdId(processDefinitios.get(0).getId());
			deploy.setVersion((long) processDefinitios.get(0).getVersion());
		}	
		workFlowDaoImpl.merge(deploy);
	}

	@Transactional(propagation = Propagation.NOT_SUPPORTED ,readOnly = true)
	@Override
	public List<WFProcessMount> queryBusinessProcessMount(Pages page) {
		
		return workFlowMountDaoImpl.queryBusinessProcessMount(page);
		
	}

	@Transactional(propagation = Propagation.NOT_SUPPORTED ,readOnly = true)
	@Override
	public Long queryCountBusinessProcessMount() {
		
		return workFlowMountDaoImpl.queryCountBusinessProcessMount();
		
	}


	@Override
	public void mountProcess(WFProcessMount mount) {
	
		 workFlowMountDaoImpl.mountProcess(mount);
	}

	/**
	 * 启动流程实例
	 *
	 * @param key   key
	 * @param param 流程变量
	 */
	@Override
	public String startProcessByKey(String key, Map<String, Object> param) {
		ProcessInstance instance = executionService.startProcessInstanceByKey(key, param);
		if(null != instance)
			return instance.getId();
		return  null;
	}

	/**
	 * 根据key 查询流程挂载
	 * @param key
	 * @return
	 */
	@Transactional(propagation = Propagation.NOT_SUPPORTED ,readOnly = true)
	@Override
	public WFProcessMount queryWFProcessMountByKey(String key) {
		List<WFProcessMount> list = workFlowMountDaoImpl.doQueryWFMountByKey(key);
		if(null != list && 0 < list.size())
			return list.get(0);
		return null;

	}


}

