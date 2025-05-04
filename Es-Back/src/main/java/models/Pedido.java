package models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.DBsLogic.DatabaseConnection;

public class Pedido {

	private Integer id;
	private int user_id;
	private Endereco endereco_id;
	private Pagamento pagamento_id;

	public Pedido() {

	}

	public Pedido(Integer id, int user_id, Endereco endereco_id, Pagamento pagamento_id) {
		this.id = id;
		this.user_id = user_id;
		this.endereco_id = endereco_id;
		this.pagamento_id = pagamento_id;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public Endereco getEndereco_id() {
		return endereco_id;
	}

	public void setEndereco_id(Endereco endereco_id) {
		this.endereco_id = endereco_id;
	}

	public Pagamento getPagamento_id() {
		return pagamento_id;
	}

	public void setPagamento_id(Pagamento pagamento_id) {
		this.pagamento_id = pagamento_id;
	}

	public void addItem(Produto produto, int quantidade) {

	}

	public Double calculateTotal() {
		String sql = "SELECT * FROM Pedido_item WHERE id = ?"; // Selecionando todas as colunas da tabela Produto onde
																// id corresponde ao parâmetro

		try (Connection conn = DatabaseConnection.connect();
				PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setInt(1, this.id); // Certifique-se de que `produto_id` seja do tipo inteiro, se for um valor
										// numérico.
			double total = 0.0;
			// Executando a consulta
			try (ResultSet rs = stmt.executeQuery()) {
				while (rs.next()) { // Verifica se encontrou algum resultado
					int id = rs.getInt("id");
					int produto_id = rs.getInt("produto_id");
					int pedido_id = rs.getInt("pedido_id");
					int quantidade = rs.getInt("quantidade");
					// Continue pegando outros campos conforme necessário
					Pedido_item pedido = new Pedido_item(id, pedido_id, produto_id, quantidade);
					total += pedido.calculateSubtotal();
				}
				return total;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
	}

	public void finalizeOrder() {

	}

}
