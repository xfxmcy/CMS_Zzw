package com.zzw.pojo;/**
 * Created by Administrator on 2015/12/23.
 */

/**
 * 流程model  图片  x y w h
 * Created with CMS_Zzw
 * User: cy
 * Date: 2015/12/23
 * Time: 10:38
 */
public class ProcessModel {

    public ProcessModel() {
    }

    private String jpdlPath ;

    private String x,y,w,h;

    public String getJpdlPath() {
        return jpdlPath;
    }

    public void setJpdlPath(String jpdlPath) {
        this.jpdlPath = jpdlPath;
    }

    public String getX() {
        return x;
    }

    public void setX(String x) {
        this.x = x;
    }

    public String getY() {
        return y;
    }

    public void setY(String y) {
        this.y = y;
    }

    public String getW() {
        return w;
    }

    public void setW(String w) {
        this.w = w;
    }

    public String getH() {
        return h;
    }

    public void setH(String h) {
        this.h = h;
    }
}
