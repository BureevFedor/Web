package model;

import java.io.Serializable;
import java.util.ArrayList;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.component.UIInput;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;
import javax.faces.event.ValueChangeEvent;
import javax.faces.validator.ValidatorException;

import utils.DBManager;

public class Entries implements Serializable{

    DBManager dbManager = new DBManager();

    //private ArrayList<Entry> entries = new ArrayList<Entry>();
    private ArrayList<Entry> entries = dbManager.getEntries();

    private String graphEntries = "";
 
    private String errMsg = "";

    public void addCurr() {
        boolean error = false;

        if(currX == null) {
            FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(
                FacesMessage.SEVERITY_ERROR, "X не задан", null));
            error = true;
        }

        if(currY == null) {
            FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(
                FacesMessage.SEVERITY_ERROR, "Y не задан", null));
            error = true;
        }

        if(currR == null || currR == 0.0) {
            FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(
                FacesMessage.SEVERITY_ERROR, "R не задан", null));
            error = true;
        }

        if(error) {
            return;
        }

        Entry entry = new Entry(currX, currY, currR);
        entries.add(entry);
        //setGraphEntries(currX + "," + currY + "," + (entry.atArea(currX, currY, currR) ? "1" : "0") );
        dbManager.addEntry(entry);
    }

    public void clear() {
        entries.clear();
        graphEntries = "";
        currX = null;
        currY = null;
        currR = null;

        dbManager.clear();
    }

    public ArrayList<Entry> getEntries() {
        return entries;
    }

    public String getGraphEntries() {
        String result = "";
        for(Entry entry : entries) {
            result += " " + entry.getX() + "," + entry.getY() + "," + (entry.atArea(entry.getX(), entry.getY(), (currR==null) ? 0.0 : currR) ? "1" : "0");
        }
        return result;
        // return graphEntries;
    }

    public void setGraphEntries(String s) {
        //graphEntries += " " + s;
    }

    public String getErrMsg() {
        //return dbManager.getErrMsg();
        return errMsg;
    }

    private Double currX;
    private Double currY;
    private Double currR;

    public Double getCurrX() {
        return currX;
    }

    public Double getCurrY() {
        return currY;
    }

    public Double getCurrR() {
        return currR;
    }

    public void setCurrX(Double x) {
        currX = x;
    }

    public void setCurrY(Double y) {
        currY = y;
    }

    public void setCurrR(Double r) {
        currR = r;
    }

    public void dosomething(ValueChangeEvent event)
    {
        errMsg += "aaaaa(" + currY + ")";
    }

    public void fakeaction(ActionEvent event)
    {
        errMsg += "bbbbb";
    }
}