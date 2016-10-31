<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.util.*" import="java.io.*"%>
<%@ taglib prefix="sae" uri="sae.tld" %>
<%@ page language="java" import="cn.com.carsmart.sae.SaeUtils" %>

<script type="text/javascript">
       var carsmart_config = (function (){});

       function isPermitted(permission) {
            var ret;
            $.ajax({
                url : "/mall-euc-ws/ws/0.1/permission/check?permission=" + encodeURIComponent(permission),
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
            carsmart_config.isAgentor = '';
            carsmart_config.regions = '';
        </sae:guest>
        <sae:user>
            <%try{%>
                 carsmart_config.operatorName = '<%=SaeUtils.getContext().getSubject().getUserInfo().getUserName()%>';
                 carsmart_config.alias ='<%=SaeUtils.getContext().getSubject().getUserInfo().getUserName()%>';
                 carsmart_config.userId ='<%=SaeUtils.getContext().getSubject().getUserInfo().getUserId()%>';
                 carsmart_config.isAgentor ='<%=SaeUtils.getContext().getAttribute("isAgentor")%>';
                 carsmart_config.regions ='<%=SaeUtils.getContext().getAttribute("regions")%>';
             <%} catch(Exception ex){%>
                 carsmart_config.operatorName ="";
                 carsmart_config.alias = "";
                 carsmart_config.isAgentor = '';
                 carsmart_config.regions = '';
             <%}%>
         </sae:user>
</script>
