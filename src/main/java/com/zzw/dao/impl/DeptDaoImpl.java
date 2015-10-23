package com.zzw.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.zzw.dao.DeptDao;
import com.zzw.pojo.TreeNode;
import com.zzw.vo.ZDepartment;
@Repository
public class DeptDaoImpl extends BasicDaoImpl<ZDepartment> implements DeptDao {

	
	
	@Override
	public List<ZDepartment> queryRootsDeptNode() {
		return getCurrentSession().createQuery("from ZDepartment where department is null").list();
	}

	@Override
	public List<ZDepartment> queryChildRen(String id) {
		return getCurrentSession().createQuery("from ZDepartment where department.id = ?").setParameter(0, id).list();
	}

}
