package com.zzw.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

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
		// TODO Auto-generated method stub
		return roleDaoImpl.queryCountZrole();
	}
	
	
	@Transactional(propagation = Propagation.NOT_SUPPORTED ,readOnly = true)
	@Override
	public List<ZRole> doQueryRoles(Pages page) {
		// TODO Auto-generated method stub
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


}
