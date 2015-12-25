package com.zzw.service.impl;/**
 * Created by Administrator on 2015/12/9.
 */

import com.zzw.component.ResultInfo;
import com.zzw.dao.ApplicationDao;
import com.zzw.dao.WorkFlowDao;
import com.zzw.pojo.HistoryAssess;
import com.zzw.pojo.Pages;
import com.zzw.pojo.ProcessModel;
import com.zzw.pojo.ZApplicationModel;
import com.zzw.service.ApplicationService;
import com.zzw.vo.WFDeployment;
import com.zzw.vo.WFProcessMount;
import com.zzw.vo.ZApplication;
import com.zzw.workflow.service.JbpmFacadeService;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.struts2.json.annotations.JSON;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.lang.reflect.InvocationTargetException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created with CMS_Zzw
 * User: cy
 * Date: 2015/12/9
 * Time: 14:59
 */
@Transactional
@Service
public class ApplicationServiceImpl implements ApplicationService {

    @Inject
    private ApplicationDao applicationDaoImpl;
    @Inject
    private WorkFlowDao workFlowDaoImpl;
    @Inject
    private JbpmFacadeService jbpmFacadeServiceImpl;


    /**
     * query My application
     *
     * @param id
     * @param paged
     * @return applications
     */
    @Transactional(propagation = Propagation.NOT_SUPPORTED ,readOnly = true)
    @Override
    public List<ZApplication> doQueryMyApplication(String id, Pages paged) {
        return applicationDaoImpl.queryMyApplication(id,paged);
    }

    /**
     * query count applications
     *
     * @param id
     * @return
     */
    @Transactional(propagation = Propagation.NOT_SUPPORTED ,readOnly = true)
    @Override
    public Long doQueryMyCountApplication(String id) {
        return applicationDaoImpl.queryCountMyApplication(id);
    }

    /**
     * submit an application
     *
     * @param application
     */
    @Override
    public void doSaveApplication(ZApplication application,ResultInfo info) {

        WFProcessMount wfProcessMount = jbpmFacadeServiceImpl.queryWFProcessMountByKey(application.getKey());
        if(null == wfProcessMount || "0".equals(wfProcessMount.getMountStatus())){
            info.settingSuccessResult("流程未挂载,不能进行申请!", application);
            return;
        }

        Map<String, Object> param = new HashMap<String, Object>();
        /*流程启动者*/
        param.put("applicant",application.getUser() == null ? "1" : application.getUser().getId());
        param.put("modelName","com.zzw.vo.ZApplication");
        /**
         * persistence
         */
        application.setId(null);
        application.setCreateTime(new Date());
        application.setStatus("1");
        applicationDaoImpl.persistence(application);

        param.put("businessId",application.getId());
        /**
         * 启动流程
         * 流程变量
         */
        String processInstanceId = jbpmFacadeServiceImpl.startProcessByKey(application.getKey(),param);

        application.setProcessInstanceId(processInstanceId);
        applicationDaoImpl.merge(application);

        info.settingSuccessResult("申请成功", application);
    }

    /**
     * update an application
     *
     * @param application
     */
    @Override
    public void doUpdateApplication(ZApplication application) {
        applicationDaoImpl.merge(application);
    }

    /**
     * query app  by id
     *
     * @param app
     */
    @Override
    public ZApplicationModel doQueryApplicationById(ZApplication app, String business) {
        ZApplicationModel zm = new ZApplicationModel() ;
        ZApplication result = applicationDaoImpl.query(ZApplication.class, app.getId());
        //查询流程审批信息
        List<HistoryAssess> list;
        if("1".equals(business)) {
            list = applicationDaoImpl.queryHistoryAssess(app.getId());
            if (null != list && 0 < list.size())
                result.setAssessList(list);

        }
        if(null != result)
            try {
                BeanUtils.copyProperties(zm,result);
                zm.setAssessList(result.getAssessList());
            } catch (Exception e) {
                e.printStackTrace();
            }
        return zm;
    }

    /**
     * delete app
     *
     * @param app
     */
    @Override
    public void doDetelteApplication(ZApplication app) {
        jbpmFacadeServiceImpl.removeProcess(app.getProcessInstanceId());
        applicationDaoImpl.removeApplication(app);
    }

    /**
     * query cur
     *
     * @param processInstanceId
     * @return
     */
    @Override
    public List<ProcessModel> queryCurProcessPhoto(String processInstanceId) {
        List<ProcessModel> pm = jbpmFacadeServiceImpl.queryTaskDefinition(processInstanceId);
        WFDeployment wfDeployment = jbpmFacadeServiceImpl.queryDeployment(processInstanceId);
        if(0 < pm.size() && null != wfDeployment)
            pm.get(0).setJpdlPath(wfDeployment.getPhotoPath());
        return pm;
    }
}
