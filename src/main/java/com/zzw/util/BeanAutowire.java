package com.zzw.util;/**
 * Created by Administrator on 2015/12/8.
 */

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.beans.factory.config.AutowireCapableBeanFactory;
import org.springframework.stereotype.Component;

/**
 * Created with CMS_Zzw
 * User: cy
 * Date: 2015/12/8
 * Time: 14:38
 */
@Component
public class BeanAutowire implements BeanFactoryAware {

    private static  BeanFactory beanFactory;

    public BeanAutowire() {

        if (null != beanFactory) {

            ((AutowireCapableBeanFactory)beanFactory).autowireBeanProperties(this, AutowireCapableBeanFactory.AUTOWIRE_BY_NAME, true);

        }

    }

    public void setBeanFactory(BeanFactory arg0) throws BeansException {

        // TODO Auto-generated method stub

        BeanAutowire.beanFactory=arg0;

    }

    public static BeanFactory getFactory(){
        return beanFactory;
    }

}

