/**
 * PageAction.java
 * com.zzw.action
 *
 * Function： TODO 
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年6月23日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.action;

import java.util.List;

import org.apache.struts2.json.annotations.JSON;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

/**
 * ClassName:PageAction
 * Function: page action
 * Reason:	 page action
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年6月23日		下午4:15:13
 *
 * @see 	 
 */
@Controller
@Scope("prototype")
public class PageAction {
	
	
	public static final String BASE_RESULT_JSON = "json";
	
	private Integer page,start,limit;
	
	
	@JSON(serialize=false)
	public Integer getPage() {
		return page;
	}

	public void setPage(Integer page) {
		this.page = page;
	}
	@JSON(serialize=false)
	public Integer getStart() {
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}
	@JSON(serialize=false)
	public Integer getLimit() {
		return limit;
	}

	public void setLimit(Integer limit) {
		this.limit = limit;
	}

	private Long totalCount = 1l;
	
	private List<?> rows ;

	public List<?> getRows() {
		return rows;
	}


	public Long getTotalCount() {
		return totalCount;
	}

	/**
	 * 
	 * setDataGrid:set data for extJs
	 *
	 * @param rows
	 * @param totalCount
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月2日 		cy
	 */
	public void setDataGrid(List<?> rows){
		this.rows = rows;
		this.totalCount = rows.size() + 0l;
	}


	
	
}

