package com.zzw.dao;

import com.zzw.pojo.Pages;
import com.zzw.vo.ZApplication;

import java.util.List;

/**
 * Created by cy on 2015/12/9.
 */
public interface ApplicationDao extends BasicDao<ZApplication>{


    /**
     * query countMyApplication
     * @param id
     * @return
     */
    Long queryCountMyApplication(String id);

    /**
     * query count of my application
     * @param id
     * @param paged
     * @return
     */
    List<ZApplication> queryMyApplication(String id, Pages paged);
}
