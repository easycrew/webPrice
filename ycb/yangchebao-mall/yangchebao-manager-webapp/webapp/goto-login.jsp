<%@ page language="java" contentType="text/html; charset=UTF-8"  import="java.util.*" import="java.io.*"%>
<%@ taglib prefix="sae" uri="sae.tld" %>
<script type="text/javascript">
    <sae:guest>
         window.location.href = "login.jsp?backurl=" + window.location.href;
    </sae:guest>
</script>