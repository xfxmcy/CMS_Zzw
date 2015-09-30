package com.zzw.vo;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import org.hibernate.annotations.GenericGenerator;


/**
 * 流程功能挂接表
 * @author zhangshuaipeng
 *
 */
@Entity
public class WFProcessMount  {
	
	/**实体的Name
	private String modelName;*/
	/**实体的主键Name
	private String modelIdName;*/
	/**是否可回退
	private String rollBackAble;*/
	/**是否可取回
	private String withrawAble;*/
	
	
	
	
	
	/** 流程定义ID 
	private String processDefinitionId;*/
	/** 流程名称 
	private String processName;*/
	/** 流程KEY 
	private String processKey;*/
	
	
	
	private String id;
	/** 挂接状态    1 挂接   2 停用*/
	private String mountStatus;
	/** 业务ID**/
	private String businessId;
	/** 业务url**/
	private String businessUrl;
	/** 修改时间**/
	private Date updateTime;
	/** 挂接部门**/
	private String departmentCode;
	
	/** 修改人**/
	private String updateUser;
	
	private WFDeployment deployment;
	
	@OneToOne(fetch = FetchType.EAGER )
	public WFDeployment getDeployment() {
		return deployment;
	}
	public void setDeployment(WFDeployment deployment) {
		this.deployment = deployment;
	}
	public String getBusinessId() {
		return businessId;
	}
	public void setBusinessId(String businessId) {
		this.businessId = businessId;
	}
	public String getBusinessUrl() {
		return businessUrl;
	}
	public void setBusinessUrl(String businessUrl) {
		this.businessUrl = businessUrl;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public String getDepartmentCode() {
		return departmentCode;
	}
	public void setDepartmentCode(String departmentCode) {
		this.departmentCode = departmentCode;
	}
	public String getUpdateUser() {
		return updateUser;
	}
	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}
	
	public WFProcessMount() {

		// TODO Auto-generated constructor stub

	}
	@Id
	@GeneratedValue(generator="systemUUID")
	@GenericGenerator(name="systemUUID",strategy="uuid")
	@Column(length=50)
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	

	
	public String getMountStatus() {
		return mountStatus;
	}
	public void setMountStatus(String mountStatus) {
		this.mountStatus = mountStatus;
	}
	
}
