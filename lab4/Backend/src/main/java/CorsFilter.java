import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;

import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;

public class CorsFilter implements Filter{

  public void destroy() {

  }
  
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
    HttpServletResponse resp = (HttpServletResponse) response;

    resp.addHeader("Access-Control-Allow-Origin", "*");
    resp.addHeader("Access-Control-Allow-Headers", "*");
    resp.addHeader("Access-Control-Allow-Methods", 
    "GET, POST, PUT, DELETE, OPTIONS, HEAD");

    chain.doFilter(request, response);
  }

  public void init(FilterConfig fConfig) throws ServletException {

  }
}