/**
 * WorkFlowAction.java
 * com.zzw.action
 *
 * Function： TODO 
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年7月2日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.action;

import java.util.ArrayList;
import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.zzw.pojo.WfTaskJobPojo;

/**
 * ClassName:WorkFlowAction
 * Function: TODO ADD FUNCTION
 * Reason:	 TODO ADD REASON
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年7月2日		下午2:40:27
 *
 * @see 	 
 */
@Controller
@Scope("prototype")
@ParentPackage("json-default")
@Namespace("/workflow")	
@Action("wkAction")
@Results({   
	  @Result(name="json" ,type="json" ,params={"ignoreHierarchy","false"})
})
public class WorkFlowAction extends PageAction {

	
	
	/**
	 * 
	 * queryMyTasks: query my tasks
	 *
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月2日 		cy
	 */
	public String queryMyTasks(){
		List<WfTaskJobPojo> jobs = new ArrayList<WfTaskJobPojo>();
		WfTaskJobPojo wfTaskJobPojo = new WfTaskJobPojo();
		wfTaskJobPojo.setTaskId("222");
		wfTaskJobPojo.setProcessName("23232");
		jobs.add(wfTaskJobPojo);
		super.setDataGrid(jobs);
		return BASE_RESULT_JSON;
	} 

}

