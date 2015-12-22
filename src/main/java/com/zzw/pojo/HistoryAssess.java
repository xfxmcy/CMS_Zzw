package com.zzw.pojo;/**
 * Created by Administrator on 2015/12/16.
 */

import org.apache.struts2.json.annotations.JSON;

import java.math.BigInteger;
import java.util.Date;

/**
 * Created with CMS_Zzw
 * User: cy
 * Date: 2015/12/16
 * Time: 14:29
 */
public class HistoryAssess {

    public HistoryAssess() {


    }
    private String modelName;

    private String businessId;

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public String getBusinessId() {
        return businessId;
    }

    public void setBusinessId(String businessId) {
        this.businessId = businessId;
    }

    private String DBID_;

    private Date TIME_;

    private String HTASK;

    private String MESSAGE_;

    private String ASSIGNEE_;

    private String username;

    private String OUTCOME_;

    private BigInteger DURATION_;

    public String getDBID_() {
        return DBID_;
    }

    public void setDBID_(String DBID_) {
        this.DBID_ = DBID_;
    }
    @JSON(format="yyyy-MM-dd HH:mm:ss")
    public Date getTIME_() {
        return TIME_;
    }

    public void setTIME_(Date TIME) {
        this.TIME_ = TIME;
    }

    public String getHTASK() {
        return HTASK;
    }

    public String getUsername() {
        return username == null ? "" : username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getOUTCOME_() {
        return OUTCOME_;
    }

    public void setOUTCOME_(String OUTCOME_) {
        this.OUTCOME_ = OUTCOME_;
    }

    public BigInteger getDURATION_() {
        return DURATION_;
    }
    private String countTime;

    public void setCountTime(String countTime) {
        this.countTime = countTime;
    }

    public String getCountTime(){
        if(null != DURATION_ && 60000 <= DURATION_.intValue())
            return DURATION_.intValue()/60000 + " 分钟 " + (DURATION_.intValue()%60000)/1000 + "秒";
        else if(null != DURATION_ ){
            return (DURATION_.intValue()%60000)/1000 + "秒";
        }
        return null;
    }

    public void setDURATION_(BigInteger DURATION_) {
        this.DURATION_ = DURATION_;
    }

    public void setHTASK(String HTASK) {
        this.HTASK = HTASK;
    }

    public String getMESSAGE_() {
        return MESSAGE_;
    }

    public void setMESSAGE_(String MESSAGE_) {
        this.MESSAGE_ = MESSAGE_;
    }

    public String getASSIGNEE_() {
        return ASSIGNEE_;
    }

    public void setASSIGNEE_(String ASSIGNEE_) {
        this.ASSIGNEE_ = ASSIGNEE_;
    }
}
