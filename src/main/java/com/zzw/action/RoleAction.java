package com.zzw.action;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.json.annotations.JSON;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

/**
 * 
 * ClassName:RoleAction  role action 
 *
 * @author   李丛阳
 * @version  
 * @since    Ver 1.1
 * @Date	 2015	2015年10月23日		下午1:51:50
 *
 * @see
 */
@Controller
@Scope("prototype")
@ParentPackage("json-default")
@Namespace("/role")	
@Action("roleAction")
@Results({   
	  @Result(name="json" ,type="json" ,params={"ignoreHierarchy","false"})
})
public class RoleAction extends PageAction {

	
	
	//@JSON(serialize=false)
	/**
	 * 
	 * doQueryRoles:  分页查询roles
	 * 
	 * @author 李丛阳
	 * @since 　Ver 1.1
	 */
	public String doQueryRoles(){
		return BASE_RESULT_JSON;
	}
	
}
