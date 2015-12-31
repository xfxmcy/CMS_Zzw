/**
 * DownLoadAction.java
 * com.zzw.action
 *
 * Function： download action
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年7月9日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.zzw.util.ResourceUtil;

/**
 * ClassName:DownLoadAction
 * Function: download action
 * Reason:	 download action
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年7月9日		下午1:34:50
 *
 * @see 	 
 */
@Controller
@Scope("prototype")
@Namespace("/download")	
@Action("downloadAction")
@Results({   
	  @Result(name="success" ,type="stream" ,
			  params={"contentType","text/plain",
			  		"contentDisposition","attachment;fileName=\"${fileName}\"",
			  		"inputName","inputStream",
			  		"bufferSize","1024"
	  })
})
public class DownLoadAction extends ActionSupport{

	/**
	 * serialVersionUID:download action
	 *
	 */
	
	private String fileName; 
	
	private String filePath;
	
	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	private static final long serialVersionUID = 1L;
	
	private InputStream inputStream ;
	
	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public InputStream getInputStream() {
		return inputStream;
	}

	public void setInputStream(InputStream inputStream) {
		this.inputStream = inputStream;
	}

	//返回一个输入流，作为一个客户端来说是一个输入流，但对于服务器端是一个 输出流  
    public String downloadJPDL() throws Exception  
    {  
       //获取资源路径  
       //inputStream = ServletActionContext.getServletContext().getResourceAsStream(filePath) ;
    	File file = new File(ResourceUtil.getUploadPath() + filePath);
    	if(null != file || file.exists())
    		inputStream = new FileInputStream(file);
       //文件名不需要转码, 接收就是iso-8859-1  下载时也需要返回iso-8859-1
       return SUCCESS;      
    }  
}

