package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.DBsLogic.DatabaseConnection;

import models.Pizza;
import models.enums.Tamanho;

public class PizzaDAO {
    
    public boolean create(Pizza pizza) {
        String sql = "INSERT INTO Pizza (id_produto, tamanho) VALUES (?, ?)";

        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, pizza.getId_produto());
            stmt.setString(2, pizza.getTamanho().toString());
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public Pizza read(int id) {
        String sql = "SELECT * FROM Pizza WHERE id = ?";
        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);

            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Pizza(rs.getInt("id"),
                        rs.getInt("id_produto"),
                        Tamanho.valueOf(rs.getString("tamanho").toUpperCase()));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Pizza> readAll() {
        List<Pizza> pizzas = new ArrayList<>();
        String sql = "SELECT * FROM Pizza";
        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql);
                ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                System.out.println(rs.getString("tamanho").charAt(0));
                Pizza produto = new Pizza(rs.getInt("id"),
                rs.getInt("id_produto"),
                Tamanho.valueOf(rs.getString("tamanho").toUpperCase()));
                pizzas.add(produto);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return pizzas;
    }

    public boolean update(Pizza pizza) {
        String sql = "UPDATE Pizza SET id_produto = ?, tamanho = ? WHERE id = ?";
        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql)) {
                    stmt.setInt(1, pizza.getId_produto());
                    stmt.setString(2, pizza.getTamanho().toString());
                    stmt.setInt(3, pizza.getId());
                    stmt.executeUpdate();
                    return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean delete(int id) {
        String sql = "DELETE FROM Pizza WHERE id = ?";
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
