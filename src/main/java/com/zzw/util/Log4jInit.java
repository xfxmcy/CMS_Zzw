package com.zzw.util;


import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Properties;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
/**
 * @author CY
 * @Date   09-09
 * @description  enum CaseAdmin for Administrator
 * @version 0.0.1-SNAPSHOT
 */
public class Log4jInit extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5112548602389894419L;
	private static final Logger logger = Logger.getLogger(Log4jInit.class);

	/**
	 * 设置应用程序log4j日志输出文件 <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init(ServletConfig config) throws ServletException {
		//获得应用程序根目录的绝对路径
        String prefix = config.getServletContext().getRealPath("/");
        //获得log4j.properties的相对路径
        String file = config.getInitParameter("log4j");
        //log4j.properties的绝对路径
        String filePath = prefix + file;
        //实例化一个Properties对象，用来加载log4j.properties
        Properties props = new Properties();
        try {
            //获得log4j.properties的输入流
            FileInputStream istream = new FileInputStream(filePath);
            //将log4j.properties加载到props对象中
            props.load(istream);
            //关闭输入流
            istream.close();
            //从log4j.properties中取出原日志文件名，并在前面加上应用程序根目录路径构成绝对路径
            String logFile = prefix + props.getProperty("log4j.appender.R.File");
            //重新设置log4j.properties中的日志文件路径
            props.setProperty("log4j.appender.R.File", logFile);
            System.out.println("日志输出文件：" + logFile);
            //将修改写入log4j.properties中
            PropertyConfigurator.configure(props);
            logger.debug("connect success....");
        } catch (IOException e) {
            logger.error("文件加载失败！\n\t\t原因：" + e.getMessage());
        }
	}
	
	/**
	 * Constructor of the object.
	 */
	public Log4jInit() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out
				.println("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">");
		out.println("<HTML>");
		out.println("  <HEAD><TITLE>A Servlet</TITLE></HEAD>");
		out.println("  <BODY>");
		out.print("    This is ");
		out.print(this.getClass());
		out.println(", using the GET method");
		out.println("  </BODY>");
		out.println("</HTML>");
		out.flush();
		out.close();
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out
				.println("<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\">");
		out.println("<HTML>");
		out.println("  <HEAD><TITLE>A Servlet</TITLE></HEAD>");
		out.println("  <BODY>");
		out.print("    This is ");
		out.print(this.getClass());
		out.println(", using the POST method");
		out.println("  </BODY>");
		out.println("</HTML>");
		out.flush();
		out.close();
	}

}
