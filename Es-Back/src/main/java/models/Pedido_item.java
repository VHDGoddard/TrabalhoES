package models;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.DBsLogic.DatabaseConnection;

public class Pedido_item {

	private Integer id;
	private int pedido_id;
	private int produto_id;
	private Integer quantidade;
	
	public Pedido_item() {
		
	}

	public Pedido_item(Integer id, int pedido_id, int produto_id, Integer quantidade) {
		super();
		this.id = id;
		this.pedido_id = pedido_id;
		this.produto_id = produto_id;
		this.quantidade = quantidade;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public int getPedido_id() {
		return pedido_id;
	}

	public void setPedido_id(int pedido_id) {
		this.pedido_id = pedido_id;
	}

	public int getProduto_id() {
		return produto_id;
	}

	public void setProduto_id(int produto_id) {
		this.produto_id = produto_id;
	}

	public Integer getQuantidade() {
		return quantidade;
	}

	public void setQuantidade(Integer quantidade) {
		this.quantidade = quantidade;
	}
	
	public void updateQuantity (int newQuantity) {
		quantidade = newQuantity;	
	}
	
	public Double calculateSubtotal() {
		String sql = "SELECT preco FROM Produto WHERE id = ?";
        
        try (Connection conn = DatabaseConnection.connect();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            // Definindo os parâmetros para o PreparedStatement
            stmt.setInt(1, this.produto_id);

            // Executa a inserção
          ResultSet rs = stmt.executeQuery();
		  if(rs.next())
				return rs.getDouble("preco") * this.getQuantidade();
        } catch (SQLException e) {
            e.printStackTrace();
			return null;
		}
		return null;
    }

	}

