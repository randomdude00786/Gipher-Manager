package com.giphermanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

import com.giphermanager.jwtfilter.JwtFilter;

@SpringBootApplication
public class GipherManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(GipherManagerApplication.class, args);
	}
	
	@Bean
    public FilterRegistrationBean jwtFilter() {

	  FilterRegistrationBean frb = new FilterRegistrationBean<>();
		frb.setFilter(new JwtFilter());
		frb.addUrlPatterns("/api/*");
		
		return frb;

    }

}

