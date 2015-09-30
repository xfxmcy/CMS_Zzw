package com.zzw.dao;

import com.zzw.dao.impl.BasicDaoimpl;
import com.zzw.vo.WFDeployment;
import com.zzw.vo.WFProcessMount;

/**
 * 
 * ClassName:WorkFlowMountDao  wfprocessmount
 *
 * @author   李丛阳
 * @version  
 * @since    Ver 1.1
 * @Date	 2015	2015年8月20日		下午3:34:48
 *
 * @see
 */
public interface WorkFlowMountDao extends BasicDao<WFProcessMount>{
	
	/**
	 * 
	 * saveWfprocessmount:	save a Wfprocessmount
	 *
	 * @param deploy	deploy
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月8日 		cy
	 */
	public void saveWfprocessmount(WFProcessMount process);
}
