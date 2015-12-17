package com.zzw.pojo;/**
 * Created by Administrator on 2015/12/9.
 */

import com.zzw.vo.ZUser;
import org.apache.struts2.json.annotations.JSON;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Created with CMS_Zzw
 * User: cy
 * Date: 2015/12/9
 * Time: 11:16
 */
public class ZApplicationModel {

    public ZApplicationModel() {
    }

    public String getId() {
        return id;
    }

    private String id;
    /**
     * 创建时间
     */
    private Date createTime;
    /**
     * 状态
     */
    private String state;

    private String money;
    /**
     * 车牌
     */
    private String plateNumber;
    /**
     * 车型
     */
    private String vehicleType;
    /**
     * 逻辑删除  1.未删除  0 已删除
     */
    private  String status;
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    private String remark;

    public void setId(String id) {
        this.id = id;
    }

    @JSON(format="yyyy-MM-dd HH:mm:ss")
    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getMoney() {
        return money;
    }

    public void setMoney(String money) {
        this.money = money;
    }

    public String getPlateNumber() {
        return plateNumber;
    }

    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    private ZUser user;

    public ZUser getUser() {
        return user;
    }

    public void setUser(ZUser user) {
        this.user = user;
    }

    private String processInstanceId;

    public String getProcessInstanceId() {
        return processInstanceId;
    }

    public void setProcessInstanceId(String processInstanceId) {
        this.processInstanceId = processInstanceId;
    }

    /**
     * 流程key
     */

    private String key ;
    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
    public List<HistoryAssess> getAssessList() {
        return assessList;
    }

    public void setAssessList(List<HistoryAssess> assessList) {
        this.assessList = assessList;
    }

    private List<HistoryAssess> assessList;


}
