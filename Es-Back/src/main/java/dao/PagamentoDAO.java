package dao;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import models.Pagamento;
import models.enums.TipoPagamento;

import com.DBsLogic.DatabaseConnection;

public class PagamentoDAO {

    public boolean create(Pagamento pagamento) {
    String sql = "INSERT INTO Pagamento (tipo_pagamento, horario, valor) VALUES (?, ?, ?)";
    try (Connection conn = DatabaseConnection.connect();
         PreparedStatement stmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

        // Validando e preenchendo os parâmetros
        stmt.setString(1, pagamento.getTipoPagamento().name());

        // Se horário for nulo define como horário atual
        LocalDateTime horario = pagamento.getHorario() != null ? 
                                pagamento.getHorario() : 
                                LocalDateTime.now();
        stmt.setTimestamp(2, Timestamp.valueOf(horario));

        stmt.setDouble(3, pagamento.getValor());

        stmt.executeUpdate();
        // Obter ID gerado
        try (ResultSet generatedKeys = stmt.getGeneratedKeys()) {
            if (generatedKeys.next()) {
                pagamento.setId(generatedKeys.getInt(1)); // Aqui você atribui o ID ao objeto
            } else {
                return false;
            }
        }

        return true;

    } catch (Exception e) {
        System.err.println("Erro ao inserir pagamento:");
        e.printStackTrace();
        return false;
    }
}


    public Pagamento read(int id) {
        String sql = "SELECT * FROM Pagamento WHERE id = ?";
        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Pagamento(
                        rs.getInt("id"),
                        TipoPagamento.valueOf(rs.getString("tipo_pagamento")),
                        rs.getTimestamp("horario").toLocalDateTime(),
                        rs.getDouble("valor"));
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
                Pagamento pagamento = new Pagamento(
                        rs.getInt("id"),
                        TipoPagamento.valueOf(rs.getString("tipo_pagamento")),
                        rs.getTimestamp("horario").toLocalDateTime(),
                        rs.getDouble("valor"));
                pagamentos.add(pagamento);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return pagamentos;
    }

    public boolean update(Pagamento pagamento) {
        String sql = "UPDATE Pagamento SET tipo_pagamento = ?, horario = ?, valor = ? WHERE id = ?";
        try (Connection conn = DatabaseConnection.connect();
                PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, pagamento.getTipoPagamento().name());
            stmt.setTimestamp(2, Timestamp.valueOf(pagamento.getHorario()));
            stmt.setDouble(3, pagamento.getValor());
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
