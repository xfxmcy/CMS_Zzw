package com.zzw.util;

import java.util.ResourceBundle;

/**
 * 项目参数工具类
 * 
 * @author lcy
 * 
 */
public class ResourceUtil {

	
	
	
	private static final ResourceBundle bundle = java.util.ResourceBundle.getBundle("config");

	// jpdl 上传地址
	private static String JPDL_PATH = "";
	
	
	private void ResourceUtil() {
	}

	/**
	 * 获得sessionInfo名字
	 * 
	 * @return
	 */
	public static final String getSessionInfoName() {
		return bundle.getString("sessionInfoName");
	}

	/**
	 * 获得上传表单域的名称
	 * 
	 * @return
	 */
	public static final String getUploadFieldName() {
		return bundle.getString("uploadFieldName");
	}

	/**
	 * 获得上传文件的最大大小限制
	 * 
	 * @return
	 */
	public static final long getUploadFileMaxSize() {
		return Long.valueOf(bundle.getString("uploadFileMaxSize"));
	}

	/**
	 * 获得允许上传文件的扩展名
	 * 
	 * @return
	 */
	public static final String getUploadFileExts() {
		return bundle.getString("uploadFileExts");
	}

	/**
	 * 获得上传文件要放到那个目录
	 * 
	 * @return
	 */
	public static final String getUploadDirectory() {
		return bundle.getString("uploadDirectory");
	}
	/**
	 * 获得admin Id
	 * 
	 * @return
	 */
	public static final String getUserAdmin() {
		return bundle.getString("userAdmin");
	}
	/**
	 * 
	 * getJpdlUploadPath: 获取jpdl upload path
	 * 
	 * @author 李丛阳
	 * @return
	 * @since 　Ver 1.1
	 */
	public static final String getUploadPath(){
		if("".equals(JPDL_PATH))
			JPDL_PATH = bundle.getString("uploadPath");
		if(null == JPDL_PATH || "".equals(JPDL_PATH))
			JPDL_PATH = "D://upload//jpdl";
		return JPDL_PATH;
	}
}
