package com.example.ecommercespringbootangular.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

import com.okta.spring.boot.oauth.Okta;

@Configuration
public class SecurityConfiguration {

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
		
		// protect endpoint '/api/orders'
		httpSecurity.authorizeHttpRequests(customizer -> customizer.antMatchers("/api/orders/**").authenticated())
				.oauth2ResourceServer().jwt();
		
		// add cors filter
		httpSecurity.cors();
		
		// add content negotiation strategy
		httpSecurity.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());
		
		// add non-empty response body for 401
		Okta.configureResourceServer401ResponseBody(httpSecurity);
		
		return httpSecurity.build();
	}
}
