package com.zzw.action;/**
 * Created by Administrator on 2015/12/9.
 */

import com.zzw.component.ResultInfo;
import com.zzw.pojo.ProcessModel;
import com.zzw.pojo.ZApplicationModel;
import com.zzw.service.ApplicationService;
import com.zzw.util.ResourceUtil;
import com.zzw.util.ZzwUtil;
import com.zzw.vo.ZApplication;
import com.zzw.vo.ZUser;
import com.zzw.workflow.service.JbpmFacadeService;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.json.annotations.JSON;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import javax.inject.Inject;
import java.util.Date;
import java.util.List;

/**
 * Created with CMS_Zzw
 * User: cy
 * Date: 2015/12/9
 * Time: 15:00
 */
@Controller
@Scope("prototype")
@ParentPackage("json-default")
@Namespace("/app")
@Action("appAction")
@Results({
        @Result(name="json" ,type="json" ,params={"ignoreHierarchy","false"})
})
public class ApplicationAction extends PageAction {

    private ApplicationService applicationServiceImpl;


    @JSON(serialize=false)
    public ApplicationService getApplicationServiceImpl() {
        return applicationServiceImpl;
    }

    public void setApplicationServiceImpl(ApplicationService applicationServiceImpl) {
        this.applicationServiceImpl = applicationServiceImpl;
    }
    private ZApplication app;
    @JSON(serialize=false)
    public ZApplication getApp() {
        return app;
    }

    public void setApp(ZApplication app) {
        this.app = app;
    }

    private String processInstanceId ;

    private String business ;

    @JSON(serialize=false)
    public String getProcessInstanceId() {
        return processInstanceId;
    }

    public void setProcessInstanceId(String processInstanceId) {
        this.processInstanceId = processInstanceId;
    }

    public String getBusiness() {
        return business;
    }

    public void setBusiness(String business) {
        this.business = business;
    }

    /**
     * query my application paged
     * @return
     */
    public String doQueryMyApplicationPaged(){
        Object result = ServletActionContext.getRequest().getSession().getAttribute(ResourceUtil.getUserAdmin());
        if(null != result) {
            ZUser user = (ZUser) result;
            super.setDataGrid(applicationServiceImpl.doQueryMyApplication(user.getId(),ZzwUtil.createPaged(super.getStart(), super.getLimit())),
            applicationServiceImpl.doQueryMyCountApplication(user.getId()));
        }
        return BASE_RESULT_JSON;
    }

    /**
     * SAVE application
     */
    public void doSaveApplication(){
        ResultInfo info = new ResultInfo();
        Object result = ServletActionContext.getRequest().getSession().getAttribute(ResourceUtil.getUserAdmin());
        if(null != result)
            app.setUser((ZUser) result);
        applicationServiceImpl.doSaveApplication(app,info);
        app.setUser(null);//避免懒加载
        ZzwUtil.writeJson(ServletActionContext.getResponse(), info);
    }
    /**
     * UPDATE application
     */
    public void doUpdateApplication(){
        ResultInfo info =  new ResultInfo();
        applicationServiceImpl.doUpdateApplication(app);
        info.settingSuccessResult("修改成功", app);
        ZzwUtil.writeJson(ServletActionContext.getResponse(), info);
    }

    /**
     * query application by id
     */
    public void doQueryApplicationById(){
        ResultInfo info = new ResultInfo();
        ZApplicationModel result = applicationServiceImpl.doQueryApplicationById(app, business);
        info.settingSuccessResult("查询成功", result);
        ZzwUtil.writeJson(ServletActionContext.getResponse(), info);
    }

    /**
     * delete process
     */
    public void doDeleteApplicationById(){
        ResultInfo info = new ResultInfo();
        applicationServiceImpl.doDetelteApplication(app);
        info.settingSuccessResult("删除成功", app);
        ZzwUtil.writeJson(ServletActionContext.getResponse(), info);
    }

    /**
     * query current process photo
     */
    public void doQueryCurrentProcessPhoto(){
        // businessId
        ResultInfo info = new ResultInfo();
        List<ProcessModel> model = applicationServiceImpl.queryCurProcessPhoto(processInstanceId);
        info.settingSuccessResult("查询成功", model);
        ZzwUtil.writeJson(ServletActionContext.getResponse(), info);
    }
}
