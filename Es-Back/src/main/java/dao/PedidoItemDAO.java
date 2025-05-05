package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import models.Pedido_item;
import com.DBsLogic.DatabaseConnection;

public class PedidoItemDAO {

    public boolean create(Pedido_item item) {
        String sql = "INSERT INTO Pedido_item (pedido_id, produto_id, quantidade) VALUES (?, ?, ?)";
        try (Connection conn = DatabaseConnection.connect();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, item.getPedido_id());
            stmt.setInt(2, item.getProduto_id());
            stmt.setInt(3, item.getQuantidade());
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public Pedido_item read(int id) {
        String sql = "SELECT * FROM Pedido_item WHERE id = ?";
        try (Connection conn = DatabaseConnection.connect();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Pedido_item(
                    rs.getInt("id"),
                    rs.getInt("pedido_id"),
                    rs.getInt("produto_id"),
                    rs.getInt("quantidade")
                );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Pedido_item> readAll() {
    List<Pedido_item> itens = new ArrayList<>();
    String sql = "SELECT * FROM Pedido_item";
    try (Connection conn = DatabaseConnection.connect();
         PreparedStatement stmt = conn.prepareStatement(sql);
         ResultSet rs = stmt.executeQuery()) {

        while (rs.next()) {
            Pedido_item item = new Pedido_item(
                rs.getInt("id"),
                rs.getInt("pedido_id"),
                rs.getInt("produto_id"),
                rs.getInt("quantidade")
            );
            itens.add(item);
        }
    } catch (SQLException e) {
        e.printStackTrace();
    }
    return itens;
}


    public boolean update(Pedido_item item) {
        String sql = "UPDATE Pedido_item SET pedido_id = ?, produto_id = ?, quantidade = ? WHERE id = ?";
        try (Connection conn = DatabaseConnection.connect();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, item.getPedido_id());
            stmt.setInt(2, item.getProduto_id());
            stmt.setInt(3, item.getQuantidade());
            stmt.setInt(4, item.getId());
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean delete(int id) {
        String sql = "DELETE FROM Pedido_item WHERE id = ?";
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
