package com.zzw.service;

import java.util.List;

import com.zzw.pojo.TreeNode;
import com.zzw.vo.ZDepartment;

/**
 * 
 * ClassName:DepartService  department service  部门 service
 *
 * @author   李丛阳
 * @version  
 * @since    Ver 1.1
 * @Date	 2015	2015年10月20日		下午1:09:13
 *
 * @see
 */
public interface DepartService {
	/**
	 * 
	 * loadDeptTree:  加载树结构
	 * 
	 * @author 李丛阳
	 * @return
	 * @since 　Ver 1.1
	 */
	public List<TreeNode> loadDeptTree();
	/**
	 * 
	 * doDeleteCascade: 级联删除部门
	 * 
	 * @author 李丛阳
	 * @param dept
	 * @since 　Ver 1.1
	 */
	public void doDeleteDeptCascade(ZDepartment dept);
	/**
	 * 
	 * doSaveDept: save dept
	 * 
	 * @author 李丛阳
	 * @param dept
	 * @since 　Ver 1.1
	 */
	public void doSaveDept(ZDepartment dept);
	/**
	 * 
	 * doUpdateDept: update  dept 
	 * 
	 * @author 李丛阳
	 * @param dept
	 * @since 　Ver 1.1
	 */
	public void doUpdateDept(ZDepartment dept);
	/**
	 * 
	 * doUpdateDeptJobs: update jobs of dept
	 * 
	 * @author 李丛阳
	 * @param dept
	 * @param addIds	增加的
	 * @param deleteIds 删除的
	 * @since 　Ver 1.1
	 */
	public void doUpdateDeptJobs(ZDepartment dept, String addIds,
			String deleteIds);
	
}
