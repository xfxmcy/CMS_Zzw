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
public interface DeptDao {
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
	
}
