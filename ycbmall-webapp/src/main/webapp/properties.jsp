<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" import="java.util.*" import="java.io.*"%>
<%@ taglib prefix="sae" uri="sae.tld" %>
<%@ page language="java" import="cn.com.carsmart.sae.SaeUtils" %>

<script type="text/javascript">
       var ycbmall_config = (function (){});
            <sae:guest>
                ycbmall_config.operatorName = "";
                ycbmall_config.alias = '';
                ycbmall_config.isAgentor = '';
                ycbmall_config.regions = '';
            </sae:guest>
            <sae:user>
                <%try{%>
                    ycbmall_config.userName = '<%=SaeUtils.getContext().getAttribute("username")%>';
                    // ycbmall_config.userName = '<%=SaeUtils.getContext().setAttribute("username","test")%>';
                    ycbmall_config.customerId ='<%=SaeUtils.getContext().getAttribute("customerId")%>';
                    ycbmall_config.mobile ='<%=SaeUtils.getContext().getAttribute("mobile")%>';
                 <%} catch(Exception ex){%>
                    ycbmall_config.userName = "1";
    	            ycbmall_config.customerId = "2";
    	            ycbmall_config.mobile = "3";
                 <%}%>
            </sae:user>
            console.log(ycbmall_config.userName)
</script>
