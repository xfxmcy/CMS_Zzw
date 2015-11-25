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

import java.io.Serializable;
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
	/**
	 * 
	 * persistence:persistence
	 *
	 * @param object entity	
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月8日 		cy
	 */
	void persistence (ZZW object);
	/**
	 * 
	 * query:query  by PK
	 *
	 * @param id	PK
	 * @return
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月9日 		cy
	 */
	ZZW query (Class type ,String id);
	/**
	 * 
	 * remove:remove
	 *
	 * @param object
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月9日 		cy
	 */
	void remove (ZZW object);

	/**
	 * removeGeneral object
	 * @param id
	 * @return
     */
	void removeGeneral(Class cls,Serializable id);
	/**
	 * 
	 * merge merge
	 *
	 * @param object
	 *   ver     date      		author
	 * ──────────────────────────────────
	 *   		 2015年7月9日 		cy
	 */
	void merge (ZZW object);
}

