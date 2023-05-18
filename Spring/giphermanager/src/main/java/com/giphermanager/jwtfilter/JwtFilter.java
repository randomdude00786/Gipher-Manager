package com.giphermanager.jwtfilter;

import org.springframework.web.filter.GenericFilterBean;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;

public class JwtFilter extends GenericFilterBean {
	
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
    	HttpServletRequest req = (HttpServletRequest) request;
    	HttpServletResponse res = (HttpServletResponse) response;
    	String authHeader = req.getHeader("Authorization");
    	if("OPTIONS".equals(req.getMethod())) {
    		res.setStatus(HttpServletResponse.SC_OK);
    		//System.out.println("inside if condition");
    		chain.doFilter(req, res);
    	} else {
    	if(authHeader ==  null || !authHeader.startsWith("Bearer ")) {
    		throw new ServletException("Authorization token is missing");
    	}
		    	String token = authHeader.substring(7);
		    	//System.out.println("token"+token);
		    	final Claims claims = Jwts.parser().setSigningKey("secretkey").parseClaimsJws(token).getBody();
		    	req.setAttribute("claims", claims);
		    	chain.doFilter(req, res);
    	}
    }
}
