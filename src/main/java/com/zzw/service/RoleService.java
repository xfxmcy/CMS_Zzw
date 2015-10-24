package com.zzw.service;

import java.util.List;

import com.zzw.pojo.Pages;
import com.zzw.vo.ZRole;

/**
 * 
 * ClassName:RoleService	role service
 *
 * @author   李丛阳
 * @version  
 * @since    Ver 1.1
 * @Date	 2015	2015年10月23日		下午2:12:29
 *
 * @see
 */
public interface RoleService {
	/**
	 * 
	 * doQueryRolesByDepts:  根据部门  选中  角色
	 * 
	 * @author 李丛阳
	 * @param deptId
	 * @param page
	 * @return
	 * @since 　Ver 1.1
	 */
	public List<ZRole> doQueryRolesByDepts(String deptId,Pages page);
	/**
	 * 
	 * doQueryCountRoles:   count(*) from zrole
	 * 
	 * @author 李丛阳
	 * @return
	 * @since 　Ver 1.1
	 */
	public Long doQueryCountRoles();
	/**
	 * 
	 * doQueryRoles:  分页查询  角色
	 * 
	 * @author 李丛阳
	 * @param createPaged
	 * @return
	 * @since 　Ver 1.1
	 */
	public List<ZRole> doQueryRoles(Pages createPaged);
}
