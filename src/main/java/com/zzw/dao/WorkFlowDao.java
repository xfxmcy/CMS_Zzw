/**
 * WorkFlowDao.java
 * com.zzw.dao
 *
 * Function： TODO 
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年7月3日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.dao;

import java.util.List;

import org.jbpm.api.task.Task;

import com.zzw.pojo.Pages;
import com.zzw.vo.ZUser;

/**
 * ClassName:WorkFlowDao
 * Function: WorkFlowDao
 * Reason:	 WorkFlowDao
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年7月3日		上午9:26:58
 *
 * @see 	 
 */
public interface WorkFlowDao {
	/**
	 * 
	 * queryMyTaskIncludeGroup:query users's waitTask 
	 * 					include groups 's which user was in  waitTask
	 *
	 * @param user
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月3日 		cy
	 */
	public List<Task> queryMyTaskIncludeGroup(ZUser user , Pages page);
	/**
	 * 
	 * queryCountMyTaskIncludeGroup: query count my Task inculde my group 's task
	 *
	 * @param user
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月3日 		cy
	 */
	public Long queryCountMyTaskIncludeGroup(ZUser user); 
}

