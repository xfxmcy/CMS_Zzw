package com.zzw.dao.impl;/**
 * Created by Administrator on 2015/12/9.
 */

import com.zzw.dao.ApplicationDao;
import com.zzw.pojo.HistoryAssess;
import com.zzw.pojo.Pages;
import com.zzw.vo.ZApplication;
import org.hibernate.Hibernate;
import org.hibernate.transform.Transformers;
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
        Object result = getCurrentSession().createQuery("select count(*) from ZApplication where user.id = ? and status='1'")
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
        return getCurrentSession().createQuery("from ZApplication where user.id = ? and status='1'")
                .setParameter(0,id).setFirstResult(paged.getBeginIndex())
                .setMaxResults(paged.getCount()).list();
    }

    @Override
    public void removeApplication(ZApplication app) {
        getCurrentSession().createQuery("update ZApplication set status = '0' where id = ?").setParameter(0,app.getId()).executeUpdate();
    }

    /**
     * 更改状态,为流程
     *
     * @param state
     * @param businessId
     */
    @Override
    public void updateStateForJBPM(String state, String businessId) {
        getCurrentSession().createQuery("update ZApplication set state = ? where id = ?")
                .setParameter(0,state).setParameter(1,businessId).executeUpdate();
    }

    /**
     * 查询历史审批
     *
     * @param id
     */
    @Override
    public List<HistoryAssess> queryHistoryAssess(String id) {
        return getCurrentSession().createSQLQuery("SELECT " +
               /* " detail.DBID_" +*/
                " u.username," +
                " ht.OUTCOME_," +
                " ht.DURATION_," +
                " ht.ASSIGNEE_," +
                " detail.TIME_," +
                " detail.MESSAGE_" +
                " FROM" +
                " jbpm4_hist_detail detail" +
                " INNER JOIN jbpm4_hist_task ht ON ht.DBID_ = detail.HTASK_" +
                " INNER JOIN jbpm4_hist_procinst hin ON ht.EXECUTION_ = hin.ID_" +
                " INNER JOIN zapplication app ON hin.ID_ = app.processInstanceId" +
                " LEFT JOIN zuser u ON u.id = ht.ASSIGNEE_" +
                " WHERE" +
                //注册到非 Hibernate pojo 中：
                " app.id = ? order by detail.TIME_ desc").addScalar("TIME_", Hibernate.TIMESTAMP)
                .addScalar("OUTCOME_",Hibernate.STRING)
                .addScalar("username",Hibernate.STRING)
                .addScalar("DURATION_",Hibernate.BIG_INTEGER)
                .addScalar("ASSIGNEE_",Hibernate.STRING)
                .addScalar("MESSAGE_",Hibernate.STRING).setResultTransformer(Transformers.aliasToBean(HistoryAssess.class)).setParameter(0,id).list();
    }
}
