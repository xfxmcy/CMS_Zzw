package com.zzw.dao;

import java.util.List;
import java.util.Map;

import com.zzw.pojo.Pages;
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
public interface RoleDao {
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
	 * @param param
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
}
