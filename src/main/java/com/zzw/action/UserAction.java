package com.zzw.action;
import com.zzw.service.UserService;
import com.zzw.util.ZzwUtil;
import com.zzw.vo.ZUser;
import org.apache.struts2.convention.annotation.*;
import org.apache.struts2.json.annotations.JSON;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import javax.inject.Inject;

/**
 * Created with CMS_Zzw
 * User: cy
 * Date: 2015/11/25
 * Time: 16:47
 */
@Controller
@Scope("prototype")
@ParentPackage("json-default")
@Namespace("/user")
@Action("userAction")
@Results({
        @Result(name="json" ,type="json" ,params={"ignoreHierarchy","false"})
})
public class UserAction extends PageAction {
    @Inject
    private UserService userServiceImpl ;

    @JSON(serialize=false)
    public UserService getUserServiceImpl() {
        return userServiceImpl;
    }

    public void setUserServiceImpl(UserService userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }

    /**
     * 变量名  不要使用大小混写   eg zUser
     * 		bug 赋值不了
     */
    private ZUser user ;

    @JSON(serialize=false)
    public ZUser getUser() {
        return user;
    }

    public void setUser(ZUser user) {
        this.user = user;
    }

    /**
     * query users paged
     * @return json
     */
    public String doQueryUsers(){
        super.setDataGrid(userServiceImpl.doQueryUsers(ZzwUtil.createPaged(super.getStart(),super.getLimit())),
                userServiceImpl.doQueryCountUsers());
        return BASE_RESULT_JSON;
    }
}