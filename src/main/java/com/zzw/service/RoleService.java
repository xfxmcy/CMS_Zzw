package com.zzw.service;

import java.util.List;

import com.zzw.pojo.Pages;
import com.zzw.pojo.ZJobModel;
import com.zzw.vo.ZJob;
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

	/**
	 * doSaveRole : save role
	 * @param role
     */
	public void doSaveRole(ZRole role);
	/**
	 * doUpdateRole : update role
	 * @param role
	 */
	public void doUpdateRole(ZRole role);
	/**
	 * doDeleteRole : delete role
	 * @param role
	 */
	public void doDeleteRole(ZRole role);

	/**
	 * 根据用户查询jobs
	 * @param userId	user
	 * @param paged		page
     * @return	jobs
     */
	List<ZJobModel> doQueryJobsByUsers(String userId, Pages paged);

	/**
	 * 查询jobs
	 * @param paged
	 * @return	jobs
     */
	List<ZJobModel> doQueryJobs(Pages paged);

	/**
	 * 查询jobs 数量
	 * @return	count
     */
	Long doQueryCountJobs();

	/**
	 * 更新用户 岗位
	 * @param userId	用户
	 * @param addIds	add
	 * @param deleteIds	delete
     */
	void doUpdateUserJobs(String userId, String addIds, String deleteIds);
}
