package com.zzw.action;

import com.zzw.component.ResultInfo;
import com.zzw.vo.ZRole;
import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.ServletActionContext;
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
 * @since    Ver 1.1
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

	private String userId;
	@JSON(serialize=false)
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	private ZRole role;

	@JSON(serialize=false)
	public ZRole getRole() {
		return role;
	}

	public void setRole(ZRole role) {
		this.role = role;
	}

	@JSON(serialize=false)
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

	/**
	 *
	 * saveRole:  保存角色
	 *
	 * @author 李丛阳
	 * @since 　Ver 1.1
	 */
	public void saveRole(){
		ResultInfo info = new ResultInfo();
		roleServiceImpl.doSaveRole(role);
		info.settingSuccessResult("增加成功", role);
		ZzwUtil.writeJson(ServletActionContext.getResponse(), info);
	}
	/**
	 *
	 * updateRole:  修改角色
	 *
	 * @author 李丛阳
	 * @since 　Ver 1.1
	 */
	public void updateRole(){
		ResultInfo info = new ResultInfo();
		roleServiceImpl.doUpdateRole(role);
		info.settingSuccessResult("修改成功", role);
		ZzwUtil.writeJson(ServletActionContext.getResponse(), info);
	}
	/**
	 *
	 * doDeleteRole:  删除角色
	 *
	 * @author 李丛阳
	 * @since 　Ver 1.1
	 */
	public void deleteRole(){
		ResultInfo info = new ResultInfo();
		roleServiceImpl.doDeleteRole(role);
		info.settingSuccessResult("删除成功", role);
		ZzwUtil.writeJson(ServletActionContext.getResponse(), info);
	}


}
