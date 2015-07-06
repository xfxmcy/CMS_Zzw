package com.zzw.vo;

import javax.persistence.MappedSuperclass;
/**
 * 基本model类
 * @author licy
 *@MappedSuperclass  baseEntity
 */
@MappedSuperclass
public abstract class BaseEntity{
	//创建的用户名称
	private String createUser;
	//创建的用户Code
	private String createUserCode;
	//创建的用户部门
	private String createDept;
	//创建的用户部门Code
	private String createDeptCode;
	//流程实例ID
	private String piId;
	//流程定义ID
	private String pdId;
	//流程执行的状态
	private String status;
	//创建时间
	private String createTime;
	
	public String getCreateUser() {
		return createUser;
	}
	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}
	public String getCreateUserCode() {
		return createUserCode;
	}
	public void setCreateUserCode(String createUserCode) {
		this.createUserCode = createUserCode;
	}
	public String getCreateDept() {
		return createDept;
	}
	public void setCreateDept(String createDept) {
		this.createDept = createDept;
	}
	public String getCreateDeptCode() {
		return createDeptCode;
	}
	public void setCreateDeptCode(String createDeptCode) {
		this.createDeptCode = createDeptCode;
	}
	public String getPiId() {
		return piId;
	}
	public void setPiId(String piid) {
		this.piId = piid;
	}
	public String getPdId() {
		return pdId;
	}
	public void setPdId(String pdid) {
		this.pdId = pdid;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	
}
