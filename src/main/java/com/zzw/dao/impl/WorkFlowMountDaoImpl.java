package com.zzw.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.zzw.dao.WorkFlowMountDao;
import com.zzw.pojo.Pages;
import com.zzw.vo.WFProcessMount;

@Repository
public class WorkFlowMountDaoImpl extends BasicDaoimpl<WFProcessMount> implements WorkFlowMountDao {

	@Override
	public void saveWfprocessmount(WFProcessMount process) {
		super.persistence(process);
	}

	@Override
	public List<WFProcessMount> queryBusinessProcessMount(Pages page) {
		
		// TODO Auto-generated method stub
		return null;
		
	}

	
}
