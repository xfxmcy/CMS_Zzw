/**
 * ZUser.java
 * com.zzw.vo
 *
 * Function： TODO 
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年6月30日 		cy
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
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.GenericGenerator;



/**
 * ClassName:ZUser
 * Function: zuser
 * Reason:	 zuser
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年6月30日		上午10:19:45
 *
 * @see 	 
 */
@Entity
public class ZUser implements Serializable {
	/**
	 * serialVersionUID:serialVersionUID
	 */
	
	private static final long serialVersionUID = 1L;

	public ZUser() {

	}
	
	private String id;
	
	private String username,password;
	
	@ManyToOne(fetch = FetchType.EAGER ,cascade = CascadeType.PERSIST,optional = true)
	public ZDepartment getDepartment() {
		return department;
	}
	public void setDepartment(ZDepartment department) {
		this.department = department;
	}
	
	
	private ZDepartment department ;
	
	@Id
	@Column(length = 40)
	@GenericGenerator(name="systemUUID",strategy="uuid")
	@GeneratedValue(generator="systemUUID")
	public String getId() {
		return id;
	}
	
	private Set<ZRole>  roles;
	
	@ManyToMany(cascade = CascadeType.REFRESH , fetch = FetchType.EAGER)
	@JoinTable(
            name = "user_role",
            joinColumns = @JoinColumn(name="user_id"),
            inverseJoinColumns = @JoinColumn(name="role_id")
    )
	public Set<ZRole> getRoles() {
		return roles;
	}
	public void setRoles(Set<ZRole> roles) {
		this.roles = roles;
	}
	public void setId(String id) {
		this.id = id;
	}
	@Column(length = 40)
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	@Column(length = 40)
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}

