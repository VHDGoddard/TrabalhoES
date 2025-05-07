package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.DBsLogic.DatabaseConnection;

import models.Produto;
import models.enums.Tipo;

public class ProdutoDAO {
    public boolean create(Produto produto) {
        String sql = "INSERT INTO Produto ( preco, nome, observacao, tipo) VALUES (?, ?, ?, ?)";

        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setDouble(1, produto.getPreco());
            stmt.setString(2, produto.getNome());
            stmt.setString(3, produto.getObservacao());
            stmt.setString(4, produto.getTipo().toString());
            stmt.executeUpdate();
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
                        Tipo.valueOf(rs.getString("tipo").toUpperCase()));
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
                        Tipo.valueOf(rs.getString("tipo").toUpperCase()));
                System.out.println(produto.getTipo());
                produtos.add(produto);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return produtos;
    }

    public boolean update(Produto produto) {
        String sql = "UPDATE Produto SET preco = ?, nome = ?, observacao = ?, tipo = ? WHERE id = ?";
        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql)) {
                    stmt.setDouble(1, produto.getPreco());
                    stmt.setString(2, produto.getNome());
                    stmt.setString(3, produto.getObservacao());
                    stmt.setString(4, produto.getTipo().toString());
                    stmt.setInt(5, produto.getId());
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
