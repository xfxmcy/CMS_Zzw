package com.zzw.dao;

import java.util.List;
import java.util.Map;

import com.zzw.pojo.Pages;
import com.zzw.vo.ZJob;
import com.zzw.vo.ZRole;

/**
 * 
 * ClassName:RoleDao  role Dao
 *
 * @author   李丛阳
 * @version  
 * @since    Ver 1.1
 * @Date	 2015	2015年10月23日		下午2:20:22
 *
 * @see
 */
public interface RoleDao extends BasicDao<ZRole>{
	/**
	 * 
	 * queryZrolePaegd: 分页查询角色
	 * 
	 * @author 李丛阳
	 * @param param
	 * @param page
	 * @return
	 * @since 　Ver 1.1
	 */
	public List<ZRole> queryZrolePaegdByDept(Map<String,Object> param,Pages page);
	/**
	 * 
	 * queryCountZrolePaegd: 查询总记录数
	 * 
	 * @author 李丛阳
	 * @param 
	 * @return
	 * @since 　Ver 1.1
	 */
	public Long queryCountZrole();
	
	/**
	 * 
	 * queryZrolePage: 分页查询roles
	 * 
	 * @author 李丛阳
	 * @param page
	 * @return
	 * @since 　Ver 1.1
	 */
	public List<ZRole> queryZrolePage(Pages page);

	public void removeRoleCascase(ZRole role);

	/**
	 * query jobs by user
	 * @param param
	 * @param paged
     * @return	jobs
     */
	List<ZJob> queryZJobPaegdByUser(Map<String, Object> param, Pages paged);

	/**
	 * 查询job 总数
 	 * @return
     */
	Long queryZJobCount();

	/**
	 * 分页查询 zjob
	 * @param paged
	 * @return
     */
	List<ZJob> queryZJobPaegd(Pages paged);

	/**
	 * add jobs for user
	 * @param userId	user
	 * @param addId 	job ids
     */
	void addJobs(String userId, String[] addId);

	/**
	 * delete jobs for user
	 * @param userId	user
	 * @param deleteId	job ids
     */
	void deleteJobs(String userId, String[] deleteId);
}
