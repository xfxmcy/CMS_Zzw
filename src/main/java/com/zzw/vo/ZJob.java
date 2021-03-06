/**
 * ZJob.java
 * com.zzw.vo
 *
 * Function： ZJob
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年7月10日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.vo;

import java.util.Set;

import javax.persistence.*;

import org.hibernate.annotations.GenericGenerator;

/**
 * ClassName:ZJob
 * Function: ZJob
 * Reason:	 role + department = job     role -> job  <- department
 *			 user <->  job
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年7月10日		上午9:01:40
 *
 * @see 	 
 */
@Entity
public class ZJob {
	
	public ZJob() {


	}
	private String id ; 
	
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
	@ManyToOne(fetch = FetchType.EAGER )
	public ZDepartment getDepartment() {
		return department;
	}

	public void setDepartment(ZDepartment department) {
		this.department = department;
	}
	@ManyToOne(fetch = FetchType.EAGER )
	public ZRole getRole() {
		return role;
	}

	public void setRole(ZRole role) {
		this.role = role;
	}

	private ZDepartment department;
	
	private ZRole role;
	
	private Set<ZUser>  users;
	
	@ManyToMany(cascade = CascadeType.REMOVE ,mappedBy = "jobs" , fetch = FetchType.LAZY)
	public Set<ZUser> getUsers() {
		return users;
	}

	public void setUsers(Set<ZUser> users) {
		this.users = users;
	}

	private String jobName ;

	@Transient
	public String getJobName() {
		if(null != department && null != role)
			return department.getName() + " " + role.getName();
		return jobName;
	}

	public void setJobName(String jobName) {
		this.jobName = jobName;
	}


	// 0 未选中   1选中
	private String checked = "0";

	// 数据库无用字段
	public String getChecked() {
		return checked;
	}

	public void setChecked(String checked) {
		this.checked = checked;
	}

}

