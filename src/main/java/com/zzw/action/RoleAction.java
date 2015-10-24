package com.zzw.action;

import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.apache.struts2.json.annotations.JSON;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.zzw.service.RoleService;
import com.zzw.util.ZzwUtil;

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

	private RoleService roleServiceImpl;
	
	
	// 部门id
	private String deptId;
	
	
	public String getDeptId() {
		return deptId;
	}

	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}

	@JSON(serialize=false)
	public RoleService getRoleServiceImpl() {
		return roleServiceImpl;
	}

	public void setRoleServiceImpl(RoleService roleServiceImpl) {
		this.roleServiceImpl = roleServiceImpl;
	}

	//@JSON(serialize=false)
	/**
	 * 
	 * doQueryRoles:  根据部门分页查询roles
	 * 
	 * @author 李丛阳
	 * @since 　Ver 1.1
	 */
	public String doQueryRolesPagedByDept(){
		if(StringUtils.isEmpty(deptId))
			super.setDataGrid(roleServiceImpl.doQueryRoles(ZzwUtil.createPaged(super.getStart(),super.getLimit())),
					roleServiceImpl.doQueryCountRoles());
		else	
			super.setDataGrid(roleServiceImpl.doQueryRolesByDepts(deptId, ZzwUtil.createPaged(super.getStart(),super.getLimit())),
				roleServiceImpl.doQueryCountRoles());
		return BASE_RESULT_JSON;
	}
	
}
