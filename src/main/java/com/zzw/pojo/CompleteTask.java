package com.zzw.pojo;/**
 * Created by Administrator on 2015/12/16.
 */

/**
 * Created with CMS_Zzw
 * User: cy
 * Date: 2015/12/16
 * Time: 10:16
 */
public class CompleteTask {

    public CompleteTask() {


    }

    private String businessId;

    public String getBusinessId() {
        return businessId;
    }

    public void setBusinessId(String businessId) {
        this.businessId = businessId;
    }

    private String taskId;

    private String assess;

    private String transition;

    private String userId;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public String getAssess() {
        return assess;
    }

    public void setAssess(String assess) {
        this.assess = assess;
    }

    public String getTransition() {
        return transition;
    }

    public void setTransition(String transition) {
        this.transition = transition;
    }
}