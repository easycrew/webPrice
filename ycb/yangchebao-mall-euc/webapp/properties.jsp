<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.util.*" import="java.io.*"%>
<%@ taglib prefix="sae" uri="sae.tld" %>
<%@ page language="java" import="cn.com.carsmart.sae.SaeUtils" %>
<%
     String env = getServletContext().getInitParameter("env");
     Properties pro = new Properties();
     String filePath = request.getSession().getServletContext().getRealPath("/")+ "/WEB-INF/classes/wsconfig."+env+".properties";
     FileInputStream in = new FileInputStream(filePath);
     if (in != null) {
         pro.load(in);
         in.close();
    }

    InputStream versionStream = getServletContext().getResourceAsStream("/META-INF/MANIFEST.MF");
    Properties versionProp = null;
    if (versionStream != null) {
        versionProp = new Properties();
        versionProp.load(versionStream);
    }
%>

<script type="text/javascript">
       var carsmart_config = (function (){});

       function isPermitted(permission) {
            var ret;
            $.ajax({
                url : "/euc/ws/0.1/permission/check?permission=" + encodeURIComponent(permission),
                contentType : "application/json;charset=utf-8",
                dataType : "json",
                type : "POST",
                async: false,
                success : function(data) {
                    ret = data;
                },
                error : function(xhr) {
                    ret = false;
                }
            });

            return ret;
       }

       <sae:guest>
            carsmart_config.operatorName = "";
            carsmart_config.alias = '';
        </sae:guest>
        <sae:user>
            <%try{%>
                 carsmart_config.operatorName = '<%=SaeUtils.getContext().getSubject().getUserInfo().getUserName()%>';
                 carsmart_config.alias ='<%=SaeUtils.getContext().getSubject().getUserInfo().getUserName()%>';
             <%} catch(Exception ex){%>
                 carsmart_config.operatorName ="";
                 carsmart_config.alias = "";
             <%}%>
         </sae:user>
</script>
