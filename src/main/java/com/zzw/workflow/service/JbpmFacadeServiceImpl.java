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

package com.zzw.workflow.service;

import java.io.InputStream;
import java.util.List;
import java.util.Set;

import org.jbpm.api.DeploymentQuery;
import org.jbpm.api.NewDeployment;
import org.jbpm.api.ProcessDefinitionQuery;
import org.jbpm.api.model.ActivityCoordinates;

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
public class JbpmFacadeServiceImpl implements JbpmFacadeService {

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

}

