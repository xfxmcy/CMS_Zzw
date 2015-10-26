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

import com.zzw.component.ResultInfo;
import com.zzw.pojo.TreeNode;
import com.zzw.service.DepartService;
import com.zzw.util.ZzwUtil;
import com.zzw.vo.ZDepartment;

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
	
	private ZDepartment dept;
	
	public ZDepartment getDept() {
		return dept;
	}


	public void setDept(ZDepartment dept) {
		this.dept = dept;
	}


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
	
	/**
	 * 
	 * saveDept:	增加部门
	 * 
	 * @author 李丛阳
	 * @since 　Ver 1.1
	 */
	public void saveDept(){
		ResultInfo info = new ResultInfo();
		departServiceImpl.doSaveDept(dept);
		ZzwUtil.writeJson(ServletActionContext.getResponse(), info);
	}
	/**
	 * 
	 * updateDept:   修改部门
	 * 
	 * @author 李丛阳
	 * @since 　Ver 1.1
	 */
	public void updateDept(){
		ResultInfo info = new ResultInfo();
		departServiceImpl.doUpdateDept(dept);
		ZzwUtil.writeJson(ServletActionContext.getResponse(), info);
		
	}
	/**
	 * 
	 * deleteDept:  删除部门
	 * 
	 * @author 李丛阳
	 * @since 　Ver 1.1
	 */
	public void deleteDept(){
		ResultInfo info = new ResultInfo();
		departServiceImpl.doDeleteDeptCascade(dept);
		ZzwUtil.writeJson(ServletActionContext.getResponse(), info);
		
	}
}

