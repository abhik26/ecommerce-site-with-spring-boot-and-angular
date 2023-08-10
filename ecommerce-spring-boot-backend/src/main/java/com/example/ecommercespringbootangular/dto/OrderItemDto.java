package com.example.ecommercespringbootangular.dto;

import com.example.ecommercespringbootangular.entity.Order;
import com.example.ecommercespringbootangular.entity.Product;

public class OrderItemDto {
	private String imageUrl;
	private Integer quantity;
	private Product product;
	private Order order;
	
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public Order getOrder() {
		return order;
	}
	public void setOrder(Order order) {
		this.order = order;
	}
}
