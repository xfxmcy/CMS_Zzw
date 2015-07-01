/**
 * BasicDao.java
 * com.zzw.service
 *
 * Function： TODO 
 *
 *   ver     date      		author
 * ──────────────────────────────────
 *   		 2015年7月1日 		cy
 *
 * Copyright (c) 2015, xfxmcy All Rights Reserved.
*/

package com.zzw.dao;

import java.util.Map;

/**
 * ClassName:BasicDao
 * Function: base dao
 * Reason:	 base dao
 *
 * @author   cy
 * @version  
 * @since    Ver 1.1
 * @Date	 2015年7月1日		下午4:23:56
 *
 * @see 	 
 */
public interface BasicDao <ZZW> {
	/**
	  * query Y by hql
	  * @param hql  hql
	  * @param param query condition and value
	  * @return Y
	  */
	ZZW queryByHql(String hql,Map<String,Object> param);
}

