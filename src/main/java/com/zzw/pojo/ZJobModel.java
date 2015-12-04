package com.zzw.pojo;/**
 * Created by Administrator on 2015/12/4.
 */

import com.zzw.vo.ZJob;

import java.util.ArrayList;
import java.util.List;

/**
 * Created with CMS_Zzw
 * User: cy
 * Date: 2015/12/4
 * Time: 9:31

 */
public class ZJobModel {

    private String id ;

    private String jobName ;

    private String checked;

    public ZJobModel() {

    }

    public ZJobModel(String id, String jobName, String checked) {
        this.id = id;
        this.jobName = jobName;
        this.checked = checked;
    }

    public static List<ZJobModel> changeList(List<ZJob> list){
        List<ZJobModel> result = new ArrayList<ZJobModel>();
        if(null == list || 0 == list.size())
            return result;
        ZJobModel model = null ;
        for (ZJob job : list){
            model = new ZJobModel(job.getId(),job.getJobName(),job.getChecked());
            result.add(model);
        }
        return  result;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getJobName() {
        return jobName;
    }

    public void setJobName(String jobName) {
        this.jobName = jobName;
    }

    public String getChecked() {
        return checked;
    }

    public void setChecked(String checked) {
        this.checked = checked;
    }
}
