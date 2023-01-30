package com.example.ecommercespringbootangular.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.example.ecommercespringbootangular.entity.Product;
import com.example.ecommercespringbootangular.entity.ProductCategory;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
	
	final private EntityManager entityManager;
	
	@Autowired
	public MyDataRestConfig(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		
		HttpMethod[] unsupportedHttpMethods = {HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE};
		
		config.getExposureConfiguration().forDomainType(Product.class)
				.withItemExposure((metData, httpMethods) -> httpMethods.disable(unsupportedHttpMethods))
				.withCollectionExposure((metData, httpMethods) -> httpMethods.disable(unsupportedHttpMethods));
		
		config.getExposureConfiguration().forDomainType(ProductCategory.class)
				.withItemExposure((metData, httpMethods) -> httpMethods.disable(unsupportedHttpMethods))
				.withCollectionExposure((metData, httpMethods) -> httpMethods.disable(unsupportedHttpMethods));
		
		exposeIds(config);
		
	}

	private void exposeIds(RepositoryRestConfiguration config) {
		
		
		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
		
		List<Class> entityClasses = new ArrayList<Class>();
		
		for (EntityType<?> entityType : entities) {
			entityClasses.add(entityType.getJavaType());
		}
		
		Class[] domainTypes = entityClasses.toArray(new Class[entityClasses.size()]);
		
		config.exposeIdsFor(domainTypes);
	}
	
}
