<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page import="models.Entry"%>
<%@ page import="java.util.ArrayList"%>
<%
    ArrayList<Entry> entries = (ArrayList<Entry>)session.getAttribute("Entries");
    if(entries != null) {
        String S = "";
        for (Entry entry : entries){
            S += " " + entry.x + "," + entry.y;
        }
        out.println(S);
    }
%>