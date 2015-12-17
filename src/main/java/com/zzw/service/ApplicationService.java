package com.zzw.service;

import com.zzw.component.ResultInfo;
import com.zzw.pojo.Pages;
import com.zzw.pojo.ZApplicationModel;
import com.zzw.vo.ZApplication;

import java.util.List;

/**
 * Created by Administrator on 2015/12/9.
 */
public interface ApplicationService {

    /**
     * query My application
     * @param id
     * @param paged
     * @return  applications
     */
    List<ZApplication> doQueryMyApplication(String id, Pages paged);

    /**
     * query count applications
     * @param id
     * @return
     */
    Long doQueryMyCountApplication(String id);

    /**
     * submit an application
     * @param application
     */
    void doSaveApplication(ZApplication application,ResultInfo info);

    /**
     * update an application
     * @param application
     */
    void doUpdateApplication(ZApplication application);

    /**
     * query app  by id
     * @param app
     */
    ZApplicationModel doQueryApplicationById(ZApplication app, String business);

    /**
     * delete app
     * @param app
     */
    void doDetelteApplication(ZApplication app);
}
