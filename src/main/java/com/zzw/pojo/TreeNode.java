/**
 * TreeNode.java
 * com.zzw.pojo
 *
 * Function： TODO 
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年7月19日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.pojo;

import java.util.ArrayList;
import java.util.List;

import com.zzw.vo.ZDepartment;

/**
 * ClassName:TreeNode
 * Function: tree node model
 * Reason:	 tree node model
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年7月19日		下午1:40:14
 *
 * @see 	 
 */
public class TreeNode {
	
	private String id;
	
	private String text;       //展示文本
	
	private Boolean leaf = true;   //是否叶子
	
	private boolean expandable = true;   //是否展开
	
	private String description;   //描述信息
	
	private String code;    //编码
 	
	private String parent; // 父节点ID
 	
	private String nodeInfo;//节点信息。区分人员和部门 角色
 	
	List<TreeNode> children = new ArrayList<TreeNode>();
 	
	public TreeNode() {

		// TODO Auto-generated constructor stub

	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Boolean getLeaf() {
		return leaf;
	}

	public void setLeaf(Boolean leaf) {
		this.leaf = leaf;
	}

	public boolean isExpandable() {
		return expandable;
	}

	public void setExpandable(boolean expandable) {
		this.expandable = expandable;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}

	public String getNodeInfo() {
		return nodeInfo;
	}

	public void setNodeInfo(String nodeInfo) {
		this.nodeInfo = nodeInfo;
	}

	public List<TreeNode> getChildren() {
		return children;
	}

	public void setChildren(List<TreeNode> children) {
		this.children = children;
	}
	/**
	 * 
	 * copyPropTreeNode: dept change to treeNode
	 * 
	 * @author 李丛阳
	 * @param dept
	 * @return
	 * @since 　Ver 1.1
	 */
	public void copyPropTreeNode(ZDepartment dept) {
		this.setId(dept.getId());
		this.setCode(dept.getCode());
		this.setParent((null == dept.getDepartment()) ? "-1" : dept.getDepartment().getId());
		this.setText(dept.getName());
	}
	
	
}

