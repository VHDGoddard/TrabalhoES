package models;

import models.enums.Tamanho;

public class Pizza extends Produto {

	private int id_produto;
	private Integer id;
	private Tamanho tamanho;
	
	public Pizza() {
		
	}

	public Pizza(int id_produto, Integer id, Tamanho tamanho) {
		this.id_produto = id_produto;
		this.id = id;
		this.tamanho = tamanho;
	}

	public int getId_produto() {
		return id_produto;
	}

	public void setId_produto(int id_produto) {
		this.id_produto = id_produto;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Tamanho getTamanho() {
		return tamanho;
	}

	public void setTamanho(Tamanho tamanho) {
		this.tamanho = tamanho;
	}
	
	public void setSize(Tamanho newSize) {
		tamanho = newSize;
	}
	
	public String getPizzaDetails() {
		return this.getNome() + ", " + this.getPreco() + 
				", " + this.getObservacao();
	}
}
