package com.zzw.util;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.http.HttpSessionAttributeListener;
import javax.servlet.http.HttpSessionBindingEvent;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import ognl.OgnlRuntime;

/**
 * @author CY
 * @Date 20-07
 * @description listener protect  ognl security
 * @version 0.0.1-SNAPSHOT
 */

public class OgnlSecurityListener implements ServletContextListener, HttpSessionListener, HttpSessionAttributeListener {

	public void attributeAdded(HttpSessionBindingEvent arg0) {

	}

	public void attributeRemoved(HttpSessionBindingEvent arg0) {

	}

	public void attributeReplaced(HttpSessionBindingEvent arg0) {

	}

	public void sessionCreated(HttpSessionEvent arg0) {

	}

	public void sessionDestroyed(HttpSessionEvent arg0) {

	}

	public void contextDestroyed(ServletContextEvent arg0) {

	}

	public void contextInitialized(ServletContextEvent sce) {
		OgnlRuntime.setSecurityManager(null);
	}

}
