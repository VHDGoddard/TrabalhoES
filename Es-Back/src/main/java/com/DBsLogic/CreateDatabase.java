package com.DBsLogic;

import java.sql.*;

public class CreateDatabase {
    public static void main(String[] args) throws Exception{
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
                              "FOREIGN KEY (endereco_id) REFERENCES Endereco(id))";
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
                              "tamanho CHAR(1)," +
                              "FOREIGN KEY (id_produto) REFERENCES Produto(id))";
            stmt.execute(sqlPizza);

            String sqlBebida = "CREATE TABLE IF NOT EXISTS Bebida (" +
                               "id INTEGER PRIMARY KEY AUTO_INCREMENT," +
                               "id_produto INTEGER," +
                               "tamanho VARCHAR(50)," +
                               "FOREIGN KEY (id_produto) REFERENCES Produto(id))";
            stmt.execute(sqlBebida);

            String sqlPagamento = "CREATE TABLE IF NOT EXISTS Pagamento (" +
                                  "id INTEGER PRIMARY KEY AUTO_INCREMENT," +
                                  "tipo VARCHAR(50)," +
                                  "horario DATETIME," +
                                  "valor FLOAT)";
            stmt.execute(sqlPagamento);

            String sqlPedido = "CREATE TABLE IF NOT EXISTS Pedido (" +
                               "id INTEGER PRIMARY KEY AUTO_INCREMENT," +
                               "user_id INTEGER," +
                               "endereco_id INTEGER," +
                               "Pagamento_id INTEGER," +
                               "FOREIGN KEY (user_id) REFERENCES users(id)," +
                               "FOREIGN KEY (endereco_id) REFERENCES Endereco(id)," +
                               "FOREIGN KEY (Pagamento_id) REFERENCES Pagamento(id))";
            stmt.execute(sqlPedido);

            String sqlPedidoItem = "CREATE TABLE IF NOT EXISTS Pedido_item (" +
                                   "id INTEGER PRIMARY KEY AUTO_INCREMENT," +
                                   "pedido_id INTEGER," +
                                   "produto_id INTEGER," +
                                   "quantidade INTEGER," +
                                   "FOREIGN KEY (pedido_id) REFERENCES Pedido(id)," +
                                   "FOREIGN KEY (produto_id) REFERENCES Produto(id))";
            stmt.execute(sqlPedidoItem);

            System.out.println("Tabelas criadas com sucesso!");

            }
         catch (SQLException e) {
            System.out.println("Erro ao conectar ou criar tabelas: " + e.getMessage());
        }
    }

}