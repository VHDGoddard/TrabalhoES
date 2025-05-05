package App;

import static spark.Spark.*;

import java.util.List;

import com.google.gson.Gson;
import models.*;
import dao.*;

public class Aplicacao {
    public static void main(String[] args) {

        port(4567); // Define a porta da API (http://localhost:4567)

        Gson gson = new Gson(); // Para conversão de objetos para JSON e vice-versa
        UsersDAO userDAO = new UsersDAO();
        ProdutoDAO produtoDAO = new ProdutoDAO();
        PizzaDAO pizzaDAO = new PizzaDAO();
        BebidaDAO bebidaDAO = new BebidaDAO();
        // Endpoint de teste
        get("/", (req, res) -> "API está rodando!");

        // Endpoint de login
        post("/users/login", (req, res) -> {
            res.type("application/json");

            // Converte o JSON recebido para um objeto User
            User loginRequest = gson.fromJson(req.body(), User.class);

            User user = new User(); // Instância usada para chamar login
            boolean sucesso = user.login(loginRequest.getEmail(), loginRequest.getPassword());

            if (sucesso) {
                return gson.toJson(new Resposta("Login realizado com sucesso!", true));
            } else {
                res.status(401);
                return gson.toJson(new Resposta("Email ou senha incorretos.", false));
            }
        });

        post("/users/create", (req, res) -> {
            res.type("application/json");
            User cadastroRequest = gson.fromJson(req.body(), User.class);
            System.out.println("Email: " + cadastroRequest.getEmail());
            System.out.println("Senha: " + cadastroRequest.getPassword());
            System.out.println("CPF: " + cadastroRequest.getCpf());
            System.out.println("Telefone: " + cadastroRequest.getPhone_number());
            if (userDAO.create(cadastroRequest)) {
                return gson.toJson(new Resposta("Cadastro realizado com sucesso!", true));
            } else {
                res.status(401);
                return gson.toJson(new Resposta("Erro no cadastro!", false));
            }
        });
        // GET /users/:id - Buscar usuário
        get("/users/read/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            User user = userDAO.read(id);
            if (user != null) {
                return gson.toJson(user);
            } else {
                res.status(404);
                return gson.toJson(new Resposta("Usuário não encontrado.", false));
            }
        });

        get("/users/readAll", (req, res) -> {
            List<User> users = userDAO.readAll();
            if (!users.isEmpty()) {
                return gson.toJson(users);
            } else {
                res.status(404);
                return gson.toJson(new Resposta("Nenhum usuário encontrado.", false));
            }
        });

        // PUT /users/:id - Atualizar usuário
        put("/users/update/:id", (req, res) -> {
            User user = gson.fromJson(req.body(), User.class);
            user.setId(Integer.parseInt(req.params("id")));
            if (userDAO.update(user)) {
                return gson.toJson(new Resposta("Usuário atualizado!", true));
            } else {
                res.status(500);
                return gson.toJson(new Resposta("Erro ao atualizar usuário.", false));
            }
        });

        // DELETE /users/:id - Remover usuário
        delete("/users/delete/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            if (userDAO.delete(id)) {
                return gson.toJson(new Resposta("Usuário removido!", true));
            } else {
                res.status(500);
                return gson.toJson(new Resposta("Erro ao remover usuário.", false));
            }

        });
        get("/users/getAll", (req, res) -> gson.toJson(userDAO.readAll()));

        // POST /produto - Cadastrar produto
        post("/produto/create", (req, res) -> {
            Produto produto = gson.fromJson(req.body(), Produto.class);
            if (produtoDAO.create(produto)) {
                res.status(201);
                return gson.toJson(new Resposta("Produto cadastrado!", true));
            } else {
                res.status(500);
                return gson.toJson(new Resposta("Erro ao cadastrar produto.", false));
            }
        });

        // GET /produto/:id - Buscar produto
        get("/produto/read", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            Produto produto = produtoDAO.read(id);
            if (produto != null) {
                return gson.toJson(produto);
            } else {
                res.status(404);
                return gson.toJson(new Resposta("Produto não encontrado.", false));
            }
        });

        // PUT /produto/:id - Atualizar produto
        put("/produto/update/:id", (req, res) -> {
            Produto produto = gson.fromJson(req.body(), Produto.class);
            produto.setId(Integer.parseInt(req.params("id")));
            if (produtoDAO.update(produto)) {
                return gson.toJson(new Resposta("Produto atualizado!", true));
            } else {
                res.status(500);
                return gson.toJson(new Resposta("Erro ao atualizar produto.", false));
            }
        });

        // DELETE /produto/:id - Remover produto
        delete("/produto/delete/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            if (produtoDAO.delete(id)) {
                return gson.toJson(new Resposta("Produto removido!", true));
            } else {
                res.status(500);
                return gson.toJson(new Resposta("Erro ao remover produto.", false));
            }
        });
        // POST /pizza - Cadastrar pizza
        post("/pizza/create", (req, res) -> {
            Pizza pizza = gson.fromJson(req.body(), Pizza.class);
            if (pizzaDAO.create(pizza)) {
                res.status(201);
                return gson.toJson(new Resposta("Pizza cadastrada!", true));
            } else {
                res.status(500);
                return gson.toJson(new Resposta("Erro ao cadastrar pizza.", false));
            }
        });

        // GET /pizza/:id - Buscar pizza
        get("/pizza/read/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            Pizza pizza = pizzaDAO.read(id);
            if (pizza != null) {
                return gson.toJson(pizza);
            } else {
                res.status(404);
                return gson.toJson(new Resposta("Pizza não encontrada.", false));
            }
        });

        // PUT /pizza/:id - Atualizar pizza
        put("/pizza/update/:id", (req, res) -> {
            Pizza pizza = gson.fromJson(req.body(), Pizza.class);
            pizza.setId(Integer.parseInt(req.params("id")));
            if (pizzaDAO.update(pizza)) {
                return gson.toJson(new Resposta("Pizza atualizada!", true));
            } else {
                res.status(500);
                return gson.toJson(new Resposta("Erro ao atualizar pizza.", false));
            }
        });

        // DELETE /pizza/:id - Remover pizza
        delete("/pizza/remove/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            if (pizzaDAO.delete(id)) {
                return gson.toJson(new Resposta("Pizza removida!", true));
            } else {
                res.status(500);
                return gson.toJson(new Resposta("Erro ao remover pizza.", false));
            }
        });
        // POST /bebida - Cadastrar bebida
        post("/bebida/create", (req, res) -> {
            Bebida bebida = gson.fromJson(req.body(), Bebida.class);
            if (bebidaDAO.create(bebida)) {
                res.status(201);
                return gson.toJson(new Resposta("Bebida cadastrada!", true));
            } else {
                res.status(500);
                return gson.toJson(new Resposta("Erro ao cadastrar bebida.", false));
            }
        });

        // GET /bebida/:id - Buscar bebida
        get("/bebida/read/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            Bebida bebida = bebidaDAO.read(id);
            if (bebida != null) {
                return gson.toJson(bebida);
            } else {
                res.status(404);
                return gson.toJson(new Resposta("Bebida não encontrada.", false));
            }
        });

        // PUT /bebida/:id - Atualizar bebida
        put("/bebida/update/:id", (req, res) -> {
            Bebida bebida = gson.fromJson(req.body(), Bebida.class);
            bebida.setId(Integer.parseInt(req.params("id")));
            if (bebidaDAO.update(bebida)) {
                return gson.toJson(new Resposta("Bebida atualizada!", true));
            } else {
                res.status(500);
                return gson.toJson(new Resposta("Erro ao atualizar bebida.", false));
            }
        });

        // DELETE /bebida/:id - Remover bebida
        delete("/bebida/delete/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            if (bebidaDAO.delete(id)) {
                return gson.toJson(new Resposta("Bebida removida!", true));
            } else {
                res.status(500);
                return gson.toJson(new Resposta("Erro ao remover bebida.", false));
            }
        });

        // DELETE /bebida/:id - Remover bebida
        delete("/bebida/:id", (req, res) -> {
            int id = Integer.parseInt(req.params("id"));
            if (bebidaDAO.delete(id)) {
                return gson.toJson(new Resposta("Bebida removida!", true));
            } else {
                res.status(500);
                return gson.toJson(new Resposta("Erro ao remover bebida.", false));
            }
        });

        // Outros endpoints podem ser adicionados aqui (cadastro, pedidos, etc)

        // ENDERECO
        EnderecoDAO enderecoDAO = new EnderecoDAO();

        post("/endereco", (req, res) -> {
            Endereco endereco = gson.fromJson(req.body(), Endereco.class);
            enderecoDAO.create(endereco);
            res.status(201);
            return gson.toJson(endereco);
        });

        get("/endereco/:id", (req, res) -> {
            Endereco e = enderecoDAO.read(Integer.parseInt(req.params(":id")));
            return gson.toJson(e);
        });

        get("/endereco", (req, res) -> gson.toJson(enderecoDAO.readAll()));

        put("/endereco/:id", (req, res) -> {
            Endereco endereco = gson.fromJson(req.body(), Endereco.class);
            endereco.setId(Integer.parseInt(req.params(":id")));
            enderecoDAO.update(endereco);
            return gson.toJson(endereco);
        });

        delete("/endereco/:id", (req, res) -> {
            enderecoDAO.delete(Integer.parseInt(req.params(":id")));
            return "Deletado";
        });

        // PAGAMENTO
        PagamentoDAO pagamentoDAO = new PagamentoDAO();

        post("/pagamento", (req, res) -> {
            Pagamento pagamento = gson.fromJson(req.body(), Pagamento.class);
            pagamentoDAO.create(pagamento);
            res.status(201);
            return gson.toJson(pagamento);
        });

        get("/pagamento/:id", (req, res) -> {
            Pagamento p = pagamentoDAO.read(Integer.parseInt(req.params(":id")));
            return gson.toJson(p);
        });

        get("/pagamento", (req, res) -> gson.toJson(pagamentoDAO.readAll()));

        put("/pagamento/:id", (req, res) -> {
            Pagamento pagamento = gson.fromJson(req.body(), Pagamento.class);
            pagamento.setId(Integer.parseInt(req.params(":id")));
            pagamentoDAO.update(pagamento);
            return gson.toJson(pagamento);
        });

        delete("/pagamento/:id", (req, res) -> {
            pagamentoDAO.delete(Integer.parseInt(req.params(":id")));
            return "Deletado";
        });

        // PEDIDO
        PedidoDAO pedidoDAO = new PedidoDAO();

        post("/pedido", (req, res) -> {
            Pedido pedido = gson.fromJson(req.body(), Pedido.class);
            pedidoDAO.create(pedido);
            res.status(201);
            return gson.toJson(pedido);
        });

        get("/pedido/:id", (req, res) -> {
            Pedido p = pedidoDAO.read(Integer.parseInt(req.params(":id")));
            return gson.toJson(p);
        });

        get("/pedido", (req, res) -> gson.toJson(pedidoDAO.readAll()));

        put("/pedido/:id", (req, res) -> {
            Pedido pedido = gson.fromJson(req.body(), Pedido.class);
            pedido.setId(Integer.parseInt(req.params(":id")));
            pedidoDAO.update(pedido);
            return gson.toJson(pedido);
        });

        delete("/pedido/:id", (req, res) -> {
            pedidoDAO.delete(Integer.parseInt(req.params(":id")));
            return "Deletado";
        });

        // PEDIDO_ITEM
        PedidoItemDAO pedidoItemDAO = new PedidoItemDAO();

        post("/pedido_item", (req, res) -> {
            Pedido_item item = gson.fromJson(req.body(), Pedido_item.class);
            pedidoItemDAO.create(item);
            res.status(201);
            return gson.toJson(item);
        });

        get("/pedido_item/:id", (req, res) -> {
            Pedido_item item = pedidoItemDAO.read(Integer.parseInt(req.params(":id")));
            return gson.toJson(item);
        });

        get("/pedido_item", (req, res) -> gson.toJson(pedidoItemDAO.readAll()));

        put("/pedido_item/:id", (req, res) -> {
            Pedido_item item = gson.fromJson(req.body(), Pedido_item.class);
            item.setId(Integer.parseInt(req.params(":id")));
            pedidoItemDAO.update(item);
            return gson.toJson(item);
        });

        delete("/pedido_item/:id", (req, res) -> {
            pedidoItemDAO.delete(Integer.parseInt(req.params(":id")));
            return "Deletado";
        });

    }
}

// Classe auxiliar para enviar respostas JSON
class Resposta {
    String mensagem;
    boolean sucesso;

    public Resposta(String mensagem, boolean sucesso) {
        this.mensagem = mensagem;
        this.sucesso = sucesso;
    }
}
