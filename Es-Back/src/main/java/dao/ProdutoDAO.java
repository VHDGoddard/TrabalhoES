package dao;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.DBsLogic.DatabaseConnection;

import models.Produto;
import models.enums.Tipo;

public class ProdutoDAO {
    public boolean create(Produto produto) {
        String sql = "INSERT INTO Produto ( preco, nome, observacao, tipo, url) VALUES (?, ?, ?, ?, ?)";

        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            stmt.setDouble(1, produto.getPreco());
            stmt.setString(2, produto.getNome());
            stmt.setString(3, produto.getObservacao());
            stmt.setString(4, produto.getTipo().toString());
            stmt.setString(5, produto.getUrl());
            stmt.executeUpdate();
            try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
            if (generatedKeys.next()) {
                produto.setId(generatedKeys.getInt(1)); // Aqui você atribui o ID ao objeto
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

    public Produto read(int id) {
        String sql = "SELECT * FROM Produto WHERE id = ?";
        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);

            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Produto(rs.getInt("id"),
                        rs.getDouble("preco"),
                        rs.getString("nome"),
                        rs.getString("observacao"),
                        Tipo.valueOf(rs.getString("tipo").toUpperCase()),
                        rs.getString("url"));
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Produto> readAll() {
        List<Produto> produtos = new ArrayList<>();
        String sql = "SELECT * FROM Produto";
        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql);
                ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                Produto produto = new Produto(rs.getInt("id"),
                        rs.getDouble("preco"),
                        rs.getString("nome"),
                        rs.getString("observacao"),
                        Tipo.valueOf(rs.getString("tipo").toUpperCase()),
                         rs.getString("url"));
                produtos.add(produto);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return produtos;
    }

    public boolean update(Produto produto) {
        String sql = "UPDATE Produto SET preco = ?, nome = ?, observacao = ?, tipo = ?, url = ? WHERE id = ?";
        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql)) {
                    stmt.setDouble(1, produto.getPreco());
                    stmt.setString(2, produto.getNome());
                    stmt.setString(3, produto.getObservacao());
                    stmt.setString(4, produto.getTipo().toString());
                    stmt.setString(5, produto.getUrl());
                    stmt.setInt(6, produto.getId());
                    stmt.executeUpdate();
                    return true;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean delete(int id) {
        String sql = "DELETE FROM Produto WHERE id = ?";
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
