package com.zzw.dao;

import java.util.List;

import com.zzw.pojo.TreeNode;
import com.zzw.vo.ZDepartment;

/**
 * 
 * ClassName:DeptDao	dept dao 部门 dao
 *
 * @author   李丛阳
 * @version  
 * @since    Ver 1.1
 * @Date	 2015	2015年10月20日		下午1:32:53
 *
 * @see
 */
public interface DeptDao extends BasicDao<ZDepartment> {
	/**
	 * 
	 * queryRootsDeptNode: query roots
	 * 
	 * @author 李丛阳
	 * @return
	 * @since 　Ver 1.1
	 */
	public List<ZDepartment>  queryRootsDeptNode();
	/**
	 * 
	 * queryChildRen:  query children  by parentId
	 * 
	 * @author 李丛阳
	 * @param id
	 * @return
	 * @since 　Ver 1.1
	 */
	public List<ZDepartment> queryChildRen(String id);
	/**
	 * 
	 * clearJobs: clear jobs of a dept include userJobs
	 * 
	 * @author 李丛阳
	 * @param dept
	 * @since 　Ver 1.1
	 */
	public int clearJobs(ZDepartment dept);
	/**
	 * 
	 * addJobs:add jobs into dept
	 * 
	 * @author 李丛阳
	 * @param dept
	 * @param ids	job id[]
	 * @since 　Ver 1.1
	 */
	public void addJobs(ZDepartment dept, String[] ids);
	/**
	 * 
	 * deleteJobs: delete jobs of dept
	 * 
	 * @author 李丛阳
	 * @param dept
	 * @param deleteId
	 * @since 　Ver 1.1
	 */
	public void deleteJobs(ZDepartment dept, String[] deleteId);
	
}
