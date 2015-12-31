/**
 * AppAssessAssignable.java
 * com.zzw.workflow.assignable
 *
 * Function： app assess assignable
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年7月3日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.workflow.assignable;

import com.zzw.service.UserService;
import com.zzw.util.BeanAutowire;
import com.zzw.util.ZzwUtil;
import com.zzw.vo.ZUser;
import org.jbpm.api.model.OpenExecution;
import org.jbpm.api.task.Assignable;
import org.jbpm.api.task.AssignmentHandler;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.util.List;

/**
 * ClassName:AppAssessAssignable
 * Function: app assess assignable
 * Reason:	 app assess assignable
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年7月3日		下午3:18:35
 *
 * @see 	 
 */

public class AppAssessAssignable  implements AssignmentHandler {

	/**
	 * serialVersionUID:serialVersionUID
	 *
	 */
	
	private static final long serialVersionUID = 1L;

	public String assigneeRoleId;


	private UserService userServiceImpl ;

	@Override
	public void assign(Assignable assignable, OpenExecution execution)
			throws Exception {
		//assignable.
		//assignable.setAssignee("");
		userServiceImpl = (UserService) BeanAutowire.getFactory().getBean("userServiceImpl");
		List<ZUser> list = userServiceImpl.queryUsersByRoles(assigneeRoleId);
		assignable.addCandidateUser(ZzwUtil.getListUserIds(list));
	}

}

