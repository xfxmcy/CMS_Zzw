package com.zzw.dao.impl;/**
 * Created by Administrator on 2015/12/9.
 */

import com.zzw.dao.ApplicationDao;
import com.zzw.pojo.Pages;
import com.zzw.vo.ZApplication;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created with CMS_Zzw
 * User: cy
 * Date: 2015/12/9
 * Time: 14:45
 */
@Repository
public class ApplicationDaoImpl extends  BasicDaoImpl<ZApplication> implements ApplicationDao{


    /**
     * query countMyApplication
     *
     * @param id
     * @return
     */
    @Override
    public Long queryCountMyApplication(String id) {
        Object result = getCurrentSession().createQuery("select count(*) from ZApplication where user.id = ?")
                .setParameter(0,id).uniqueResult();
        return (null == result ? 0 : (Long)result);
    }

    /**
     * query count of my application
     *
     * @param id
     * @param paged
     * @return
     */
    @Override
    public List<ZApplication> queryMyApplication(String id, Pages paged) {
        return getCurrentSession().createQuery("from ZApplication where user.id = ?")
                .setParameter(0,id).setFirstResult(paged.getBeginIndex())
                .setMaxResults(paged.getCount()).list();
    }
}
