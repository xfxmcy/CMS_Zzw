/**
 * WFDeployment.java
 * com.zzw.vo
 *
 * Function： TODO 
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年7月6日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.vo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;

import org.hibernate.annotations.GenericGenerator;

/**
 * ClassName:WFDeployment
 * Function: WFDeployment
 * Reason:	 WFDeployment
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年7月6日		上午10:26:21
 *
 * @see 	 
 */
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class WFDeployment extends BaseEntity {
	
	
	private String id;
	/*流程定义id*/
	private String processDefinitionId;
	/*部署id*/
	private String deployId;
	/*文件全名*/
	private String filePath;
	/*文件名称*/
	private String fileName;
	/*文件名称*/
	private String photoPath;
	@Column(length = 255)
	public String getPhotoPath() {
		return photoPath;
	}
	public void setPhotoPath(String photoPath) {
		this.photoPath = photoPath;
	}
	/*流程名称*/
	private String processName;
	/*流程Key*/
	private String processKey;
	/*流程版本号*/
	private Long version;
	/*流程描述*/
	private String descript;
	
	public WFDeployment() {

		// TODO Auto-generated constructor stub

	}
	@Id
	@Column(length = 40)
	@GenericGenerator(name="systemUUID",strategy="uuid")
	@GeneratedValue(generator="systemUUID")
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	@Column(length = 50)
	public String getProcessDefinitionId() {
		return processDefinitionId;
	}
	public void setProcessDefinitionId(String processDefinitionId) {
		this.processDefinitionId = processDefinitionId;
	}
	@Column(length = 50)
	public String getDeployId() {
		return deployId;
	}
	public void setDeployId(String deployId) {
		this.deployId = deployId;
	}
	@Column(length = 255)
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	@Column(length = 255)
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	@Column(length = 255)
	public String getProcessName() {
		return processName;
	}
	public void setProcessName(String processName) {
		this.processName = processName;
	}
	@Column(length = 50)
	public String getProcessKey() {
		return processKey;
	}
	public void setProcessKey(String processKey) {
		this.processKey = processKey;
	}
	@Column(length = 50)
	public Long getVersion() {
		return version;
	}
	public void setVersion(Long version) {
		this.version = version;
	}
	@Column(columnDefinition = "TEXT")
	public String getDescript() {
		return descript;
	}
	public void setDescript(String descript) {
		this.descript = descript;
	}
	
	
}

