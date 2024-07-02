package com.example.ecommercespringbootangular;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy
public class EcommerceSpringBootAngularApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcommerceSpringBootAngularApplication.class, args);
	}

}
