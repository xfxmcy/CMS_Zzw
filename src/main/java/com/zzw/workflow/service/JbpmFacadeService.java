/**
 * JbpmFacadeService.java
 * com.zzw.workflow.service
 *
 * Function： TODO 
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年6月25日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.workflow.service;

import java.util.List;
import java.util.Map;

import org.jbpm.api.RepositoryService;

import com.zzw.pojo.Pages;
import com.zzw.pojo.WfTaskJobPojo;
import com.zzw.vo.WFDeployment;
import com.zzw.vo.WFProcessMount;
import com.zzw.vo.ZUser;

/**
 * ClassName:JbpmFacadeService
 * Function: jbpm facade
 * Reason:	 jbpm facade
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年6月25日		下午3:12:59
 *
 * @see 	 
 */
public interface JbpmFacadeService {//extends RepositoryService {

	/**
	 * 
	 * queryMyTasks:query my wait task
	 *
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月3日 		cy
	 */
	public  List<WfTaskJobPojo> queryMyTasks(ZUser user , Pages page);
	/**
	 * 
	 * queryCountMyTasks:query count for my tasks
	 *
	 * @param user
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月3日 		cy
	 */
	public  Long queryCountMyTasks(ZUser user);
	
	/**
	 * 
	 * queryBusinessDevelopment:query business development
	 *
	 * @param createPaged
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月6日 		cy
	 */
	public List<WFDeployment> queryBusinessDevelopment(Pages createPaged);
	/**
	 * 
	 * queryCountBusinessDevelopment:query count busincess development
	 *
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月6日 		cy
	 */
	public Long queryCountBusinessDevelopment();
	/**
	 * 
	 * saveWFDevelopment: save wf Development
	 *
	 * @param deploy
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月8日 		cy
	 */
	public WFDeployment saveWFDevelopment(WFDeployment deploy);
	/**
	 * 
	 * removeJPDL:remove jpdl
	 *
	 * @param id
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月9日 		cy
	 */
	public void removeJPDL(String id);
	/**
	 * 
	 * delpoyProcessDefinition: 部署流程定义
	 * 
	 * @author 李丛阳
	 * @param id
	 * @since 　Ver 1.1
	 */
	public void delpoyProcessDefinition(String id);
	
	/**
	 * 
	 * queryBusinessProcessMount:查询流程部署
	 *
	 * @param createPaged
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年10月1日 		cy
	 */
	public List<WFProcessMount> queryBusinessProcessMount(Pages createPaged);
	/**
	 * 
	 * queryCountBusinessProcessMount:query count for 流程部署
	 *
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年10月1日 		cy
	 */
	public Long queryCountBusinessProcessMount();
	/**
	 * 
	 * mountProcess:mountProcess  挂载/卸载流程  
	 * 
	 * @author 李丛阳
	 * @param mount
	 * @since 　Ver 1.1
	 */
	public void mountProcess(WFProcessMount mount);

	/**
	 * 启动流程实例
	 * @param key	key
	 * @param param	 流程变量
     */
	void startProcessByKey(String key, Map<String, Object> param);

	/**
	 * 根据key 查询流程挂载
	 * @param key
	 * @return
     */
	WFProcessMount queryWFProcessMountByKey(String key);
}

