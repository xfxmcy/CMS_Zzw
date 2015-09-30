package com.zzw.dao.impl;

import org.springframework.stereotype.Repository;

import com.zzw.dao.WorkFlowMountDao;
import com.zzw.vo.WFProcessMount;

@Repository
public class WorkFlowMountDaoImpl extends BasicDaoimpl<WFProcessMount> implements WorkFlowMountDao {

	@Override
	public void saveWfprocessmount(WFProcessMount process) {
		super.persistence(process);
	}

	
}
