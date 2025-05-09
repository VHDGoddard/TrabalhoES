package dao;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.DBsLogic.DatabaseConnection;

import models.Bebida;

public class BebidaDAO {
    public boolean create(Bebida bebida) {
        String sql = "INSERT INTO Bebida (id_produto, tamanho) VALUES (?, ?)";

        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setInt(1, bebida.getId_produto());
            stmt.setString(2,String.valueOf(bebida.getTamanho()));
            stmt.executeUpdate();
            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
            if (generatedKeys.next()) {
                bebida.setId(generatedKeys.getInt(1)); // Aqui você atribui o ID ao objeto
            } else {
                return false;
            }
        }
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public Bebida read(int id) {
        String sql = "SELECT * FROM Bebida WHERE id = ?";
        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);

            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Bebida(rs.getInt("id"),
                        rs.getInt("id_produto"),
                        rs.getString("tamanho").charAt(0));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Bebida> readAll() {
        List<Bebida> Bebidas = new ArrayList<>();
        String sql = "SELECT * FROM Bebida";
        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql);
                ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                Bebida produto = new Bebida(rs.getInt("id"),
                rs.getInt("id_produto"),
                rs.getString("tamanho").charAt(0));
                Bebidas.add(produto);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return Bebidas;
    }

    public boolean update(Bebida bebida) {
        String sql = "UPDATE Bebida SET id_produto = ?, tamanho = ? WHERE id = ?";
        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql)) {
                    stmt.setInt(1, bebida.getId_produto());
                    stmt.setString(2,String.valueOf(bebida.getTamanho()));
                    stmt.setInt(3, bebida.getId());
                    stmt.executeUpdate();
                    return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean delete(int id) {
        String sql = "DELETE FROM Bebida WHERE id = ?";
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
