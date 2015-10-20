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

import java.util.List;

import javax.inject.Inject;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.zzw.pojo.TreeNode;
import com.zzw.service.DepartService;
import com.zzw.util.ZzwUtil;

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
public class DeptAction extends BaseAction {
	 // /dept/deptAction!loadTree.action",
	
	@Inject
	private DepartService departServiceImpl;
	/**
	 * 
	 * loadTree: 加载部门
	 * 
	 * @author 李丛阳
	 * @since 　Ver 1.1
	 */
	public void loadTree(){
		List<TreeNode> list = departServiceImpl.loadDeptTree();
		ZzwUtil.writeJson(ServletActionContext.getResponse(), list);
	}
}

