/**
 * WorkFlowAction.java
 * com.zzw.action
 *
 * Function： TODO 
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年7月2日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.action;

import java.io.File;
import java.util.List;

import javax.inject.Inject;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.json.annotations.JSON;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.zzw.pojo.WfTaskJobPojo;
import com.zzw.util.ResourceUtil;
import com.zzw.util.ZzwUtil;
import com.zzw.vo.WFDeployment;
import com.zzw.vo.ZUser;
import com.zzw.workflow.service.JbpmFacadeService;

/**
 * ClassName:WorkFlowAction
 * Function: workFlow 's	Action
 * Reason:	 workFlow 's	Action
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年7月2日		下午2:40:27
 *
 * @see 	 
 */
@Controller
@Scope("prototype")
@ParentPackage("json-default")
@Namespace("/workflow")	
@Action("wkAction")
@Results({   
	  @Result(name="json" ,type="json" ,params={"ignoreHierarchy","false"})
})
public class WorkFlowAction extends PageAction {
	
	@Inject
	private JbpmFacadeService jbpmFacadeServiceImpl;
	
	@JSON(serialize=false)
	public File getJpdl() {
		return jpdl;
	}
	public void setJpdl(File jpdl) {
		this.jpdl = jpdl;
	}

	private File jpdl ;
	
	private String jpdlContentType;   
	  
    private String jpdlFileName; 
    
    @JSON(serialize=false)
	public String getJpdlContentType() {
		return jpdlContentType;
	}
    
	public void setJpdlContentType(String jpdlContentType) {
		this.jpdlContentType = jpdlContentType;
	}
	
	@JSON(serialize=false)
	public String getJpdlFileName() {
		return jpdlFileName;
	}
	
	public void setJpdlFileName(String jpdlFileName) {
		this.jpdlFileName = jpdlFileName;
	}
	/**
	 * 
	 * queryMyTasks: query my tasks
	 *
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月2日 		cy
	 */
	public String queryMyTasks(){
		Object admin = ServletActionContext.getRequest().getSession().getAttribute(ResourceUtil.getUserAdmin());
		if(null == admin)
			return BASE_RESULT_JSON;
		ZUser user = (ZUser)admin; 
		List<WfTaskJobPojo> result = jbpmFacadeServiceImpl.queryMyTasks(user, ZzwUtil.createPaged(super.getStart(),super.getLimit()));
		super.setDataGrid(result,jbpmFacadeServiceImpl.queryCountMyTasks(user));
		return BASE_RESULT_JSON;
	} 
	/**
	 * 
	 * queryMyDefinition:query my definitions
	 *
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月6日 		cy
	 */
	public String queryBusinessDevelopment(){
		List<WFDeployment> result = jbpmFacadeServiceImpl.queryBusinessDevelopment(ZzwUtil.createPaged(super.getStart(),super.getLimit()));
		super.setDataGrid(result,jbpmFacadeServiceImpl.queryCountBusinessDevelopment());
		return BASE_RESULT_JSON;
	}
	
	public String uploadJPDL(){
		//this.setJsonString("{success:true}");   
		System.out.println("222");
		System.out.println(jpdl.getName());
		System.out.println(jpdl.getPath());
		System.out.println(getJpdlFileName());
		System.out.println(getJpdlContentType());
		return BASE_RESULT_JSON;
	}
	
	
	@JSON(serialize=false)
	public JbpmFacadeService getJbpmFacadeServiceImpl() {
		return jbpmFacadeServiceImpl;
	}

	public void setJbpmFacadeServiceImpl(JbpmFacadeService jbpmFacade) {
		this.jbpmFacadeServiceImpl = jbpmFacade;
	}

}

