package com.zzw.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import com.zzw.pojo.ZJobModel;
import com.zzw.vo.ZJob;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.zzw.dao.RoleDao;
import com.zzw.pojo.Pages;
import com.zzw.service.RoleService;
import com.zzw.vo.ZRole;
/**
 * 
 * ClassName:RoleServiceImpl  implement  角色接口
 *
 * @author   李丛阳
 * @version  
 * @since    Ver 1.1
 * @Date	 2015	2015年10月23日		下午2:13:19
 *
 * @see
 */
@Transactional
@Service
public class RoleServiceImpl implements RoleService {
	@Inject
	private RoleDao roleDaoImpl;


	@Transactional(propagation = Propagation.NOT_SUPPORTED ,readOnly = true)
	@Override
	public List<ZRole> doQueryRolesByDepts(String deptId, Pages page) {
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("departmentId", deptId);
		return roleDaoImpl.queryZrolePaegdByDept(param, page);
	}
	@Transactional(propagation = Propagation.NOT_SUPPORTED ,readOnly = true)
	@Override
	public Long doQueryCountRoles() {
		return roleDaoImpl.queryCountZrole();
	}
	
	
	@Transactional(propagation = Propagation.NOT_SUPPORTED ,readOnly = true)
	@Override
	public List<ZRole> doQueryRoles(Pages page) {
		return roleDaoImpl.queryZrolePage(page);
	}

	@Override
	public void doSaveRole(ZRole role) {
		 roleDaoImpl.persistence(role);
	}

	@Override
	public void doUpdateRole(ZRole role) {
		roleDaoImpl.merge(role);
	}


	@Override
	public void doDeleteRole(ZRole role) {

		roleDaoImpl.removeRoleCascase(role);
	}

	@Override
	public List<ZJobModel> doQueryJobsByUsers(String userId, Pages paged) {
		Map<String,Object> param = new HashMap<String,Object>();
		param.put("userId", userId);
		List<ZJob> list = roleDaoImpl.queryZJobPaegdByUser(param, paged);
		return ZJobModel.changeList(list);
	}

	/**
	 * 查询jobs
	 *
	 * @param paged
	 * @return jobs
	 */
	@Override
	public List<ZJobModel> doQueryJobs(Pages paged) {
		List<ZJob> list = roleDaoImpl.queryZJobPaegd(paged);
		return ZJobModel.changeList(list);
	}

	/**
	 * 查询jobs 数量
	 *
	 * @return count
	 */
	@Override
	public Long doQueryCountJobs() {
		return roleDaoImpl.queryZJobCount();
	}

	/**
	 * 更新用户 岗位
	 *
	 * @param userId    用户
	 * @param addIds    add
	 * @param deleteIds delete
	 */
	@Override
	public void doUpdateUserJobs(String userId, String addIds, String deleteIds) {
		if(null == userId )
			return;
		String[] addId = ((null != addIds && !"".equals(addIds.trim())) ? addIds.split(",") : null);
		String[] deleteId = ((null != deleteIds && !"".equals(deleteIds.trim())) ? deleteIds.split(",") : null);
		if(null != addId && 0 < addId.length){
			roleDaoImpl.addJobs(userId,addId);
		}
		if(null != deleteId && 0 < deleteId.length){
			roleDaoImpl.deleteJobs(userId,deleteId);
		}
	}


}
