package models;

public class Bebida{

	private int id_produto;
	private Integer id;
	private char tamanho;
	
	public Bebida() {
		
	}

	public Bebida(int id_produto, Integer id, char tamanho) {
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

	public char getTamanho() {
		return tamanho;
	}

	public void setTamanho(char tamanho) {
		this.tamanho = tamanho;
	}
	
	public void setSize (char newSize) {
		tamanho = newSize;
	}
	
	
}
