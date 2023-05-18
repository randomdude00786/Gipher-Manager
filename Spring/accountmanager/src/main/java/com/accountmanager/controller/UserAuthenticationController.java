package com.accountmanager.controller;


import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.accountmanager.exception.UserAlreadyExistsException;
import com.accountmanager.model.User;
import com.accountmanager.service.UserAuthenticationService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@CrossOrigin(origins="*")
public class UserAuthenticationController {
	
	HashMap<String, String> map = new HashMap<>();

	@Autowired
	UserAuthenticationService authicationService;
    public UserAuthenticationController(UserAuthenticationService authicationService) {
    	this.authicationService = authicationService;
	}

    @PostMapping("/api/v1/auth/register")
    public ResponseEntity<?> registerUser(@RequestBody User user){
    	Calendar calender = Calendar.getInstance();
    	Date date = calender.getTime();
    	user.setUserAddedDate(date);
    	try {
    		authicationService.saveUser(user);
		} catch (UserAlreadyExistsException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.CONFLICT);
		}
		 return new ResponseEntity<>(user,HttpStatus.CREATED);
    	
    }

    @PostMapping("/api/v1/auth/login")
    public ResponseEntity<?> login(@RequestBody User user){
    	try {
			String token = getToken(user.getUserId(), user.getUserPassword());
			map.clear();
			map.put("token", token);
			map.put("message", "User logged in successfully");
			
		} catch (Exception e) {
			e.printStackTrace();
			map.clear();
			map.put("token", null);
			map.put("message",e.getMessage());
			return new ResponseEntity<>(map,HttpStatus.UNAUTHORIZED); 
		}
		return new ResponseEntity<>(map, HttpStatus.OK);
    	
    }
    
    @PostMapping("/api/v1/auth/authenticate")
    public ResponseEntity<?> isAuthenticate(ServletRequest request) throws ServletException{
    	
    	HttpServletRequest req = (HttpServletRequest) request;
    	
    	String authHeader = req.getHeader("Authorization");
    	
    	if(authHeader ==  null || !authHeader.startsWith("Bearer ")) {
    		throw new ServletException("Authorization token is missing");
    	}
    	String token = authHeader.substring(7);
    	final Claims claims = Jwts.parser().setSigningKey("secretkey").parseClaimsJws(token).getBody();
    	req.setAttribute("claims", claims);
    	HashMap<String, Boolean> map = new HashMap<>();
    	map.clear();
    	map.put("isAuthenticated", true);
    	return new ResponseEntity<>(map,HttpStatus.OK);
    }

    // Generate JWT token
	public String getToken(String userid, String password) throws Exception {
		if(userid == null || password == null) {
			
		}
		User user = authicationService.findByUserIdAndPassword(userid, password);
		if(user != null) {
			String jwttoken = Jwts.builder().setSubject(userid).setIssuedAt(new Date(System.currentTimeMillis()))
					.signWith(SignatureAlgorithm.HS256, "secretkey").compact();
			return jwttoken;
		} else
			 throw new ServletException();
		
	}


}
