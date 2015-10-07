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
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.inject.Inject;

import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.json.annotations.JSON;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import sofocus.bpm.jbpm.JpdlXMLToPng;

import com.zzw.component.ResultInfo;
import com.zzw.pojo.WfTaskJobPojo;
import com.zzw.util.ResourceUtil;
import com.zzw.util.ZzwUtil;
import com.zzw.vo.WFDeployment;
import com.zzw.vo.WFProcessMount;
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
	
	private String id;
	
	@JSON(serialize=false)
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}

	private WFDeployment deploy ;
	@JSON(serialize=false)
	public WFDeployment getDeploy() {
		return deploy;
	}
	public void setDeploy(WFDeployment deploy) {
		this.deploy = deploy;
	}
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
	
	@JSON(serialize=false)
	public JbpmFacadeService getJbpmFacadeServiceImpl() {
		return jbpmFacadeServiceImpl;
	}

	public void setJbpmFacadeServiceImpl(JbpmFacadeService jbpmFacade) {
		this.jbpmFacadeServiceImpl = jbpmFacade;
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
		ZUser user = ZzwUtil.getLoginUser();
		if(null == user)
			return BASE_RESULT_JSON;
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
	/**
	 * 
	 * queryMyDefinition:query 流程 挂接
	 *
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月6日 		cy
	 */
	public String queryBusinessWFProcessMount(){
		List<WFProcessMount> result = jbpmFacadeServiceImpl.queryBusinessProcessMount(ZzwUtil.createPaged(super.getStart(),super.getLimit()));
		super.setDataGrid(result,jbpmFacadeServiceImpl.queryCountBusinessProcessMount());
		return BASE_RESULT_JSON;
	}
	/**
	 * 
	 * uploadJPDL:上传JPDL 
	 *
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月8日 		cy
	 */
	public void uploadJPDL(){
		ResultInfo info = new ResultInfo();
		ZUser user = ZzwUtil.getLoginUser();
		String realpath = ServletActionContext.getServletContext().getRealPath("/jpdl");
	        //D:\apache-tomcat-6.0.18\webapps\struts2_upload\images
        if (jpdl != null) {
        	if(!"jpdl.xml".equals(jpdlFileName.split("\\.",2)[1]))
        		info.settingErrorResult("jpdl类型错误!", null);
        	else{
        		String newName = UUID.randomUUID().toString();
	            File savefile = new File(new File(realpath), newName+ ".jpdl.xml");
	            if (!savefile.getParentFile().exists())
	            	savefile.getParentFile().mkdirs();
	            try {
					FileUtils.copyFile(jpdl, savefile);
					String key = ZzwUtil.getJPDLKEY(savefile);
					if(null != key && !"".equals(key)){
						InputStream inputStream = new FileInputStream(savefile);
						JpdlXMLToPng.toPng(inputStream, realpath + "\\" + newName + ".png");
						/*赋值*/
						deploy.setFileName(jpdlFileName);
						deploy.setCreateTime(ZzwUtil.formatDate(new Date()));
						deploy.setProcessKey(key);
						if(null != user)
							deploy.setCreateUser(user.getUsername());
						deploy.setFilePath("/jpdl/" + newName+ ".jpdl.xml" );
						deploy.setPhotoPath("/jpdl/"  + newName+ ".png" );
						/*保存*/
						deploy = jbpmFacadeServiceImpl.saveWFDevelopment(deploy);
						info.settingSuccessResult("jpdl上传成功", null);
					}else
						info.settingErrorResult("jpdl文件定义错误 检查是否有key!", null);
				} catch (Exception e) {
					info.settingErrorResult("jpdl上传失败,请检查定义格式", null);
					e.printStackTrace();
					
				}
        	} 
        }
		ZzwUtil.writeJson(ServletActionContext.getResponse(), info);
	}
	
	/**
	 * 
	 * deleteJPDL:delete jpdl	
	 *
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月9日 		cy
	 */
	public void deleteJPDL(){
		ResultInfo info = new ResultInfo();
		jbpmFacadeServiceImpl.removeJPDL(id);
		info.settingSuccessResult("jpdl 删除成功", null);
		ZzwUtil.writeJson(ServletActionContext.getResponse(), info);
	}
	
	
	/**
	 * 
	 * delpoyProcessDefinition:	部署流程定义
	 * 
	 * @author 李丛阳
	 * @since 　Ver 1.1
	 */
	public void delpoyProcessDefinition(){
		ResultInfo info = new ResultInfo();
		jbpmFacadeServiceImpl.delpoyProcessDefinition(id,ServletActionContext.getServletContext().getRealPath("/"));
		info.settingSuccessResult("流程部署成功", null);
		ZzwUtil.writeJson(ServletActionContext.getResponse(), info);
	}
}

