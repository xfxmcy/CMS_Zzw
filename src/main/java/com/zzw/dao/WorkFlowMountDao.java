package com.zzw.dao;

import java.util.List;

import com.zzw.dao.impl.BasicDaoImpl;
import com.zzw.pojo.Pages;
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
	/**
	 * 
	 * queryBusinessProcessMount:query 流程部署
	 *
	 * @param page
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年10月3日 		cy
	 */
	public List<WFProcessMount> queryBusinessProcessMount(Pages page);
	/**
	 * 
	 * queryCountBusinessProcessMount: query count 流程部署
	 * 
	 * @author 李丛阳
	 * @return
	 * @since 　Ver 1.1
	 */
	public Long queryCountBusinessProcessMount();
	/**
	 * 
	 * mountProcess:  挂载流程
	 * 
	 * @author 李丛阳
	 * @param mount
	 * @since 　Ver 1.1
	 */
	public void mountProcess(WFProcessMount mount);
}
