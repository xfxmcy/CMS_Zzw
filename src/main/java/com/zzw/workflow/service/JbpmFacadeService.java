/**
 * JbpmFacadeService.java
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

import java.util.List;

import org.jbpm.api.RepositoryService;

import com.zzw.pojo.Pages;
import com.zzw.pojo.WfTaskJobPojo;
import com.zzw.vo.ZUser;

/**
 * ClassName:JbpmFacadeService
 * Function: jbpm facade
 * Reason:	 jbpm facade
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年6月25日		下午3:12:59
 *
 * @see 	 
 */
public interface JbpmFacadeService extends RepositoryService {

	/**
	 * 
	 * queryMyTasks:query my wait task
	 *
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月3日 		cy
	 */
	public  List<WfTaskJobPojo> queryMyTasks(ZUser user , Pages page);
	/**
	 * 
	 * queryCountMyTasks:query count for my tasks
	 *
	 * @param user
	 * @param page
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月3日 		cy
	 */
	public  Long queryCountMyTasks(ZUser user);
}

