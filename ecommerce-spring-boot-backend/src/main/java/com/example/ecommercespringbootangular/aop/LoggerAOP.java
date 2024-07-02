package com.example.ecommercespringbootangular.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class LoggerAOP {

	private Logger log = LoggerFactory.getLogger(LoggerAOP.class);
	
	
	@Before("execution(* com.example.ecommercespringbootangular.controller.CheckoutController.*(*))")
	public void beforeController(JoinPoint joinPoint) {
		log.info(String.format("Controller with signature called: %s", joinPoint.getSignature()));
	}
}
