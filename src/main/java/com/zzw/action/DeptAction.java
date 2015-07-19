/**
 * DeptAction.java
 * com.zzw.action
 *
 * Function： TODO 
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年7月19日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.action;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

/**
 * ClassName:DeptAction
 * Function: department action
 * Reason:	 department action
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年7月19日		下午3:04:40
 *
 * @see 	 
 */
@Controller
@Scope("prototype")
@ParentPackage("json-default")
@Namespace("/dept")	
@Action("deptAction")
@Results({   
	  @Result(name="json" ,type="json" ,params={"ignoreHierarchy","false","execludeProperties","result*"})
	})
public class DeptAction {
	 // /dept/deptAction!loadTree.action",
	
	
	
	public void loadTree(){
		
	}
}

