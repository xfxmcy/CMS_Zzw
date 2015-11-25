/**
 * ZRole.java
 * com.zzw.vo
 *
 * Function： TODO 
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年7月3日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.vo;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.*;

import org.apache.struts2.json.annotations.JSON;
import org.hibernate.annotations.GenericGenerator;

/**
 * ClassName:ZRole
 * Function: ZRole
 * Reason:	 ZRole
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年7月3日		下午1:13:20
 *
 * @see 	 
 */
@Entity
public class ZRole implements Serializable {
	/**
	 * serialVersionUID:serialVersionUID
	 */
	
	private static final long serialVersionUID = 1L;
	
	public ZRole() {

		// TODO Auto-generated constructor stub

	}
	
	public ZRole(String id) {
		this.id = id;
	}

	private String id;
	
	private String name;
	
	private String code;
	// 0 未选中   1选中
	private String checked = "0";
	
	// 数据库无用字段
	public String getChecked() {
		return checked;
	}

	public void setChecked(String checked) {
		this.checked = checked;
	}

	@Column(length = 40)
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
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
	@Column(length = 40)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
/*	private Set<ZUser>  users;
	
	@ManyToMany(mappedBy = "roles" ,cascade = CascadeType.REFRESH , fetch = FetchType.LAZY)
	public Set<ZUser> getUsers() {
		return users;
	}

	public void setUsers(Set<ZUser> users) {
		this.users = users;
	}*/
	private Set<ZJob> jobs ;
	
	@JSON(serialize=false)
	@OneToMany(cascade = CascadeType.REMOVE , fetch = FetchType.LAZY,mappedBy = "role")
	public Set<ZJob> getJobs() {
		return jobs;
	}


	public void setJobs(Set<ZJob> jobs) {
		this.jobs = jobs;
	}
}

