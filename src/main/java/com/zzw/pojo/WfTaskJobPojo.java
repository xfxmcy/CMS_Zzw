package com.zzw.pojo;

import java.io.Serializable;

/**
 * 流程任务展示VO
 * @author zhangshuaipeng
 *
 */
public class WfTaskJobPojo  implements Serializable{
	/**
	 * serialVersionUID:serialVersionUID
	 *
	 */
	
	private static final long serialVersionUID = 1L;
	/**任务节点ID*/
	private String taskId;
	/**任务节点名称*/
	private String taskName;
	/**流程key*/
	private String processName;
	/**流程定义ID*/
	private String pdid;
	/**创建时间*/
	private String createTime;
	/**实体名称*/
	private String modelName;
	/**业务主键值*/
	private String idValue;
	/**当前执行人*/
	private String assigne;
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public String getTaskName() {
		return taskName;
	}
	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	public String getModelName() {
		return modelName;
	}
	public void setModelName(String modelName) {
		this.modelName = modelName;
	}
	public String getIdValue() {
		return idValue;
	}
	public void setIdValue(String idValue) {
		this.idValue = idValue;
	}
	public String getProcessName() {
		return processName;
	}
	public void setProcessName(String processName) {
		this.processName = processName;
	}
	public String getPdid() {
		return pdid;
	}
	public void setPdid(String pdid) {
		this.pdid = pdid;
	}
	public String getAssigne() {
		return assigne;
	}
	public void setAssigne(String assigne) {
		this.assigne = assigne;
	}
	
}
