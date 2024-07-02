package com.example.ecommercespringbootangular.service;

import java.util.List;
import java.util.Set;
import java.util.UUID;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ecommercespringbootangular.dao.CustomerRepository;
import com.example.ecommercespringbootangular.dto.Purchase;
import com.example.ecommercespringbootangular.dto.PurchaseResponse;
import com.example.ecommercespringbootangular.entity.Address;
import com.example.ecommercespringbootangular.entity.Customer;
import com.example.ecommercespringbootangular.entity.Order;
import com.example.ecommercespringbootangular.entity.OrderItem;

@Service
public class CheckoutServiceImpl implements CheckoutService {
	
	private CustomerRepository customerRepository;
	private EntityManager entityManager;
	
	@Autowired
	public CheckoutServiceImpl(CustomerRepository customerRepository, EntityManager entityManager) {
		this.customerRepository = customerRepository;
		this.entityManager = entityManager;
	}



	@Override
	@Transactional
	public PurchaseResponse placeOrder(Purchase purchase) {
		
		Order order = purchase.getOrder();
		Address shippingAddress = purchase.getShippingAddress();
		Address billingAddress = purchase.getBillingAddress();
		
		String orderTrackingNumber = generateOrderTrackingNumber();
		order.setOrderTrackingNumber(orderTrackingNumber);
		
		Set<OrderItem> orderItems = purchase.getOrderItems();
		
		if (orderItems != null && orderItems.size() > 0) {
			orderItems.forEach(item -> {
//				entityManager.find(Product, item.getProductId());
				
				order.addOrderItem(item);
			});	
		}
		
		order.setBillingAddress(billingAddress);
		order.setShippingAddress(shippingAddress);
		
		Customer customer = purchase.getCustomer();
		
		if (customer != null) {
			String customerEmail = customer.getEmail();
			
			if (customerEmail != null && !customerEmail.trim().isEmpty()) {
				customerEmail = customerEmail.toLowerCase();
				customer.setEmail(customerEmail);
				
				List<Customer> existingCustomers = customerRepository.findByEmailIgnoreCase(customerEmail);
				
				if (existingCustomers != null && existingCustomers.size() > 0) {
					Customer tempCustomer = existingCustomers.get(0);
					
					tempCustomer.setFirstName(customer.getFirstName());
					tempCustomer.setLastName(customer.getLastName());
					
					customer = tempCustomer;
				}
			}
		}
		
		customer.addOrder(order);
		order.setCustomer(customer);
		
		entityManager.persist(customer);
		
//		customerRepository.save(customer);
		
		return new PurchaseResponse(orderTrackingNumber);
	}
	
	private String generateOrderTrackingNumber() {
		return UUID.randomUUID().toString();
	}

}
