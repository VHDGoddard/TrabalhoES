package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.DBsLogic.DatabaseConnection;
import models.Endereco;

public class EnderecoDAO {

    public boolean create(Endereco endereco) {
        String sql = "INSERT INTO Endereco (rua, bairro, numero, complemento, cep, user_id) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection conn = DatabaseConnection.connect();
             PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            stmt.setString(1, endereco.getRua());
            stmt.setString(2, endereco.getBairro());
            stmt.setInt(3, endereco.getNumero());
            stmt.setString(4, endereco.getComplemento());
            stmt.setString(5, endereco.getCep());
            stmt.setInt(6, endereco.getUser());
            stmt.executeUpdate();
            System.out.println("CHEGOOOOOOOOOOOOOOOU");
            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
            if (generatedKeys.next()) {
                endereco.setId(generatedKeys.getInt(1)); // Aqui você atribui o ID ao objeto
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

    public Endereco read(int id) {
        String sql = "SELECT * FROM Endereco WHERE id = ?";
        try (Connection conn = DatabaseConnection.connect();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Endereco(
                    rs.getInt("id"),
                    rs.getString("rua"),
                    rs.getString("bairro"),
                    rs.getInt("numero"),
                    rs.getString("complemento"),
                    rs.getString("cep"),
                    rs.getInt("user_id")
                );
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Endereco> readAll() {
        List<Endereco> enderecos = new ArrayList<>();
        String sql = "SELECT * FROM Endereco";
        try (Connection conn = DatabaseConnection.connect();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                Endereco endereco = new Endereco(
                    rs.getInt("id"),
                    rs.getString("rua"),
                    rs.getString("bairro"),
                    rs.getInt("numero"),
                    rs.getString("complemento"),
                    rs.getString("cep"),
                    rs.getInt("user_id")
                );
                enderecos.add(endereco);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return enderecos;
    }

    public boolean update(Endereco endereco) {
        String sql = "UPDATE Endereco SET rua = ?, bairro = ?, numero = ?, complemento = ?, cep = ?, user_id = ? WHERE id = ?";
        try (Connection conn = DatabaseConnection.connect();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, endereco.getRua());
            stmt.setString(2, endereco.getBairro());
            stmt.setInt(3, endereco.getNumero());
            stmt.setString(4, endereco.getComplemento());
            stmt.setString(5, endereco.getCep());
            stmt.setInt(6, endereco.getUser());
            stmt.setInt(7, endereco.getId());
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public boolean delete(int id) {
        String sql = "DELETE FROM Endereco WHERE id = ?";
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
