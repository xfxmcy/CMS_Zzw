package com.zzw.service;

import java.util.List;

import com.zzw.pojo.TreeNode;

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
	
}
