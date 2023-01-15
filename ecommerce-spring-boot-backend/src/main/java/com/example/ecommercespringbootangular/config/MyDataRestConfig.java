package com.example.ecommercespringbootangular.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.example.ecommercespringbootangular.entity.Product;
import com.example.ecommercespringbootangular.entity.ProductCategory;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		
		HttpMethod[] unsupportedHttpMethods = {HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE};
		
		config.getExposureConfiguration().forDomainType(Product.class)
				.withItemExposure((metData, httpMethods) -> httpMethods.disable(unsupportedHttpMethods))
				.withCollectionExposure((metData, httpMethods) -> httpMethods.disable(unsupportedHttpMethods));
		
		config.getExposureConfiguration().forDomainType(ProductCategory.class)
				.withItemExposure((metData, httpMethods) -> httpMethods.disable(unsupportedHttpMethods))
				.withCollectionExposure((metData, httpMethods) -> httpMethods.disable(unsupportedHttpMethods));
		
	}
	
}
