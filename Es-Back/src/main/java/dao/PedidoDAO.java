package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import models.Pedido;
import models.Endereco;
import models.Pagamento;
import com.DBsLogic.DatabaseConnection;

public class PedidoDAO {

    public boolean create(Pedido pedido) {
        String sql = "INSERT INTO Pedido (user_id, endereco_id, pagamento_id) VALUES (?, ?, ?)";
        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, pedido.getUser_id());
            stmt.setInt(2, pedido.getEndereco_id());
            stmt.setInt(3, pedido.getPagamento_id());
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public Pedido read(int id) {
        String sql = "SELECT * FROM Pedido WHERE id = ?";
        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                Endereco endereco = new Endereco();
                endereco.setId(rs.getInt("endereco_id"));

                Pagamento pagamento = new Pagamento();
                pagamento.setId(rs.getInt("pagamento_id"));

                return new Pedido(
                        rs.getInt("id"),
                        rs.getInt("user_id"),
                        rs.getInt("endereco_id"),
                        rs.getInt("pagamento_id"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Pedido> readAll() {
        List<Pedido> pedidos = new ArrayList<>();
        String sql = "SELECT * FROM Pedido";
        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql);
                ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Endereco endereco = new Endereco();
                endereco.setId(rs.getInt("endereco_id"));

                Pagamento pagamento = new Pagamento();
                pagamento.setId(rs.getInt("pagamento_id"));

                Pedido pedido = new Pedido(
                        rs.getInt("id"),
                        rs.getInt("user_id"),
                        rs.getInt("endereco_id"),
                        rs.getInt("pagamento_id"));
                pedidos.add(pedido);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return pedidos;
    }

    public boolean update(Pedido pedido) {
        String sql = "UPDATE Pedido SET user_id = ?, endereco_id = ?, pagamento_id = ? WHERE id = ?";
        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, pedido.getUser_id());
            stmt.setInt(2, pedido.getEndereco_id());
            stmt.setInt(3, pedido.getPagamento_id());
            stmt.setInt(4, pedido.getId());
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean delete(int id) {
        String sql = "DELETE FROM Pedido WHERE id = ?";
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
