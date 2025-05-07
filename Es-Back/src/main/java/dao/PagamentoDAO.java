package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import models.Pagamento;
import models.Pedido;
import models.Produto;
import com.DBsLogic.DatabaseConnection;

public class PagamentoDAO {

    public boolean create(Pagamento pagamento) {
        String sql = "INSERT INTO Pagamento (pedido_id, produto_id, quantidade) VALUES (?, ?, ?)";
        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, pagamento.getPedido_id().getId());
            stmt.setInt(2, pagamento.getProduto_id().getId());
            stmt.setInt(3, pagamento.getQuantidade());
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public Pagamento read(int id) {
        String sql = "SELECT * FROM Pagamento WHERE id = ?";
        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                Pedido pedido = new Pedido();
                pedido.setId(rs.getInt("pedido_id"));

                Produto produto = new Produto();
                produto.setId(rs.getInt("produto_id"));

                return new Pagamento(
                        rs.getInt("id"),
                        pedido,
                        produto,
                        rs.getInt("quantidade"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Pagamento> readAll() {
        List<Pagamento> pagamentos = new ArrayList<>();
        String sql = "SELECT * FROM Pagamento";
        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql);
                ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Pedido pedido = new Pedido();
                pedido.setId(rs.getInt("pedido_id"));

                Produto produto = new Produto();
                produto.setId(rs.getInt("produto_id"));

                Pagamento pagamento = new Pagamento(
                        rs.getInt("id"),
                        pedido,
                        produto,
                        rs.getInt("quantidade"));
                pagamentos.add(pagamento);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return pagamentos;
    }

    public boolean update(Pagamento pagamento) {
        String sql = "UPDATE Pagamento SET pedido_id = ?, produto_id = ?, quantidade = ? WHERE id = ?";
        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, pagamento.getPedido_id().getId());
            stmt.setInt(2, pagamento.getProduto_id().getId());
            stmt.setInt(3, pagamento.getQuantidade());
            stmt.setInt(4, pagamento.getId());
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean delete(int id) {
        String sql = "DELETE FROM Pagamento WHERE id = ?";
        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
}
