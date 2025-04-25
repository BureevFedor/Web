<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page import="models.Entry"%>
<%@ page import="java.util.ArrayList"%>
<%
    if (session.getAttribute("tableData") != null) {
        session.setAttribute("tableData", "");
    }

    if (session.getAttribute("Entries") != null) {
        session.setAttribute("Entries", new ArrayList<Entry>());
    }

    session.setAttribute("LastX", "");
    session.setAttribute("LastY", "");
    session.setAttribute("LastR", "");
    session.setAttribute("LastEntries", "");
    session.setAttribute("LastTableData", "");

%>