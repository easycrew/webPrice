<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.util.*" import="java.io.*"%>
<%
    InputStream versionStream = getServletContext().getResourceAsStream("/META-INF/MANIFEST.MF");
    Properties versionProp = null;
    if (versionStream != null) {
        versionProp = new Properties();
        versionProp.load(versionStream);
    }

    String java_version = "";
    if (versionStream != null) {
        java_version = versionProp.getProperty("Implementation-Version");
        java_version += "-" + versionProp.getProperty("Build-Date");
        java_version += "-" + versionProp.getProperty("SCM-Revision");
    }
%>
{ "version": "<%=java_version%>" }