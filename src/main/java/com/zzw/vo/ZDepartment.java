/**
 * ZDepartment.java
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

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.GenericGenerator;

/**
 * ClassName:ZDepartment
 * Function: ZDepartment
 * Reason:	 ZDepartment
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年7月6日		上午10:24:33
 *
 * @see 	 
 */
@Entity
public class ZDepartment {
	
	private String id ; 

	private String code ;
	
	@Column(length = 40)
	public String getCode() {
		return code;
	}


	public void setCode(String code) {
		this.code = code;
	}


	private String name ;
	
	@OneToMany(cascade = CascadeType.ALL , fetch = FetchType.LAZY,mappedBy = "department")
	public Set<ZUser> getUsers() {
		return users;
	}

	public void setUsers(Set<ZUser> users) {
		this.users = users;
	}


	private Set<ZUser> users;
	
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


	public ZDepartment() {

		// TODO Auto-generated constructor stub

	}
	
	
	

}

