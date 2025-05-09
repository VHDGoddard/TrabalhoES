package com.DBsLogic;

import java.sql.*;

public class CreateDatabase {
    public void create() throws Exception{
        try {
            // Carregar o driver JDBC do MySQL (não é necessário no MySQL 8+ com DriverManager)
            // Class.forName("com.mysql.cj.jdbc.Driver"); // Opcional para versões mais antigas

            // Estabelecer a conexão com o banco de dados
            Connection conn = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/Es_bd", "es_user", "senha123"
            );
            
            Statement stmt = conn.createStatement();

            String sqlEndereco = "CREATE TABLE IF NOT EXISTS Endereco (" +
            "id INTEGER PRIMARY KEY AUTO_INCREMENT," +
            "rua VARCHAR(40)," +
            "bairro VARCHAR(20)," +
            "numero INTEGER," +
            "complemento VARCHAR(100))";
    stmt.execute(sqlEndereco);

    String sqlUsers = "CREATE TABLE IF NOT EXISTS users (" +
            "id INTEGER PRIMARY KEY AUTO_INCREMENT," +
            "email VARCHAR(100)," +
            "password VARCHAR(100)," +
            "phone_number VARCHAR(20)," +
            "cpf VARCHAR(15) UNIQUE," +
            "endereco_id INTEGER," +
            "FOREIGN KEY (endereco_id) REFERENCES Endereco(id) ON DELETE SET NULL)";
    stmt.execute(sqlUsers);

    String sqlProduto = "CREATE TABLE IF NOT EXISTS Produto (" +
            "id INTEGER PRIMARY KEY AUTO_INCREMENT," +
            "preco DECIMAL(10, 2)," +
            "nome VARCHAR(100)," +
            "observacao VARCHAR(255)," +
            "tipo VARCHAR(50))";
    stmt.execute(sqlProduto);

    String sqlPizza = "CREATE TABLE IF NOT EXISTS Pizza (" +
            "id INTEGER PRIMARY KEY AUTO_INCREMENT," +
            "id_produto INTEGER," +
            "tamanho VARCHAR(30)," +
            "FOREIGN KEY (id_produto) REFERENCES Produto(id) ON DELETE CASCADE)";
    stmt.execute(sqlPizza);

    String sqlBebida = "CREATE TABLE IF NOT EXISTS Bebida (" +
            "id INTEGER PRIMARY KEY AUTO_INCREMENT," +
            "id_produto INTEGER," +
            "tamanho VARCHAR(50)," +
            "FOREIGN KEY (id_produto) REFERENCES Produto(id) ON DELETE CASCADE)";
    stmt.execute(sqlBebida);

    String sqlPagamento = "CREATE TABLE IF NOT EXISTS Pagamento (" +
            "id INTEGER PRIMARY KEY AUTO_INCREMENT," +
            "tipo_pagamento VARCHAR(20)," +
            "horario TIMESTAMP," +
            "valor DOUBLE)";
    stmt.execute(sqlPagamento);

    String sqlPedido = "CREATE TABLE IF NOT EXISTS Pedido (" +
            "id INTEGER PRIMARY KEY AUTO_INCREMENT," +
            "user_id INTEGER," +
            "endereco_id INTEGER," +
            "Pagamento_id INTEGER," +
            "FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE," +
            "FOREIGN KEY (endereco_id) REFERENCES Endereco(id) ON DELETE SET NULL," +
            "FOREIGN KEY (Pagamento_id) REFERENCES Pagamento(id) ON DELETE SET NULL)";
    stmt.execute(sqlPedido);

    String sqlPedidoItem = "CREATE TABLE IF NOT EXISTS Pedido_item (" +
            "id INTEGER PRIMARY KEY AUTO_INCREMENT," +
            "pedido_id INTEGER," +
            "produto_id INTEGER," +
            "quantidade INTEGER," +
            "FOREIGN KEY (pedido_id) REFERENCES Pedido(id) ON DELETE CASCADE," +
            "FOREIGN KEY (produto_id) REFERENCES Produto(id) ON DELETE CASCADE)";
    stmt.execute(sqlPedidoItem);

            System.out.println("Tabelas criadas com sucesso!");


            // Endereço
            stmt.executeUpdate("INSERT INTO Endereco (rua, bairro, numero, complemento) VALUES " +
                               "('Rua das Flores', 'Centro', 123, 'Apto 101')");

            // Produto (1 pizza, 1 bebida)
            stmt.executeUpdate("INSERT INTO Produto (preco, nome, observacao, tipo) VALUES " +
                               "(39.90, 'Pizza Margherita', 'Sem borda', 'PIZZA')," +
                               "(8.50, 'Coca-Cola', 'Gelada', 'BEBIDA')");

            // Pizza e Bebida
            stmt.executeUpdate("INSERT INTO Pizza (id_produto, tamanho) VALUES (1, 'FAMILIA')");
            stmt.executeUpdate("INSERT INTO Bebida (id_produto, tamanho) VALUES (2, 'M')");

            // Usuário
            stmt.executeUpdate("INSERT INTO users (email, password, phone_number, cpf, endereco_id) VALUES " +
                               "('joao@email.com', '123456', '11999999999', '123456789123', 1)");
            stmt.executeUpdate("INSERT INTO users (email, password, phone_number, cpf, endereco_id) VALUES " +
                               "('paulo@gmail.com', '123456', '11999999999', '25943588787', 1)");

            // Pagamento
            stmt.executeUpdate("INSERT INTO Pagamento (tipo_pagamento, horario, valor) VALUES " +
                               "('CREDITO', NOW(), 48.40)");
            stmt.executeUpdate("INSERT INTO Pagamento (tipo_pagamento, horario, valor) VALUES " +
                               "('PIX', NOW(), 60.20)");

            // Pedido
            stmt.executeUpdate("INSERT INTO Pedido (user_id, endereco_id, Pagamento_id) VALUES (1, 1, 1)");

            // Pedido_item
            stmt.executeUpdate("INSERT INTO Pedido_item (pedido_id, produto_id, quantidade) VALUES " +
                               "(1, 1, 1)," +  // 1 pizza
                               "(1, 2, 1)");   // 1 bebida

            System.out.println("Tabelas criadas e populadas com sucesso!");

            }
         catch (SQLException e) {
            System.out.println("Erro ao conectar ou criar tabelas: " + e.getMessage());
        }
    }

}