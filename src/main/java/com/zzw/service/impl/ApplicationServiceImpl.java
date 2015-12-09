package com.zzw.service.impl;/**
 * Created by Administrator on 2015/12/9.
 */

import com.zzw.dao.ApplicationDao;
import com.zzw.pojo.Pages;
import com.zzw.service.ApplicationService;
import com.zzw.vo.ZApplication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import java.util.List;

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
    public void doSaveApplication(ZApplication application) {
        applicationDaoImpl.persistence(application);
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
}
