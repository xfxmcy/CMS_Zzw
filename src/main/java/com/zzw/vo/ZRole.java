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

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

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
	
	private String id;
	
	private String name;
	
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
	
	private Set<ZUser>  users;
	
	@ManyToMany(mappedBy = "roles" ,cascade = CascadeType.REFRESH , fetch = FetchType.LAZY)
	public Set<ZUser> getUsers() {
		return users;
	}

	public void setUsers(Set<ZUser> users) {
		this.users = users;
	}
	
}

