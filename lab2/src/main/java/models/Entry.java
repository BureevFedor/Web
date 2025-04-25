package models;

import java.io.Serializable;

public class Entry implements Serializable{
    public Double x, y, r;
    public Boolean isHit;

    public Entry(Double x, Double y, Double r, Boolean isHit) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.isHit = isHit;
    }

    public Double getX() {
        return x;
    }

    public Double getY() {
        return y;
    }

    public Double getR() {
        return r;
    }

    public Boolean getIsHit() {
        return isHit;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public void setR(Double r) {
        this.r = r;
    }

    public void setIsHit(Boolean isHit) {
        this.isHit = isHit;
    }
}