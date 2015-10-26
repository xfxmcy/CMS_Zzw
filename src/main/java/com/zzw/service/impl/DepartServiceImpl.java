package com.zzw.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.zzw.dao.DeptDao;
import com.zzw.pojo.TreeNode;
import com.zzw.service.DepartService;
import com.zzw.vo.ZDepartment;
/**
 * 
 * ClassName:DepartServiceImpl    部门  service 实现
 *
 * @author   李丛阳
 * @version  
 * @since    Ver 1.1
 * @Date	 2015	2015年10月20日		下午1:21:15
 *
 * @see
 */
@Service
public class DepartServiceImpl implements DepartService {

	@Inject
	private DeptDao deptDaoImpl;
	
	@Transactional(propagation = Propagation.NOT_SUPPORTED ,readOnly = true)
	@Override
	public List<TreeNode> loadDeptTree() {
		List<ZDepartment> roots = deptDaoImpl.queryRootsDeptNode();
		/*nothing*/
		if(null == roots || 0 == roots.size())
			return new ArrayList<TreeNode>();
		List<TreeNode> nodes = new ArrayList<TreeNode>();
		for (ZDepartment dept : roots) {
			constructDeptTree(dept,nodes,null);
		}
		return nodes;
	}
	/**
	 * 
	 * constructDeptTree: 递归遍历 子节点
	 * 
	 * @author 李丛阳
	 * @param dept
	 * @param nodes
	 * @since 　Ver 1.1
	 */
	private void constructDeptTree(ZDepartment dept, List<TreeNode> nodes , TreeNode parent) {
		if(null == dept)
			return ;
		TreeNode treeNode = new TreeNode(); 
		treeNode.copyPropTreeNode(dept);
		List<ZDepartment> children = deptDaoImpl.queryChildRen(treeNode.getId());
		// leaf
		if(null == children || 0 == children.size()){
			treeNode.setLeaf(true);
			if(null == parent)
				nodes.add(treeNode);
			else
				parent.getChildren().add(treeNode);
		}	
		else{
			treeNode.setLeaf(false);
			if(null == parent)
				nodes.add(treeNode);
			else
				parent.getChildren().add(treeNode);
			for (ZDepartment zDepartment : children) {
				this.constructDeptTree(zDepartment, nodes,treeNode);
			}
		}	
	}
	@Override
	public void doDeleteDeptCascade(ZDepartment dept) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void doSaveDept(ZDepartment dept) {
		// TODO Auto-generated method stub
		
	}
	@Override
	public void doUpdateDept(ZDepartment dept) {
		// TODO Auto-generated method stub
		
	}
	
	
}
