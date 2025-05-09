package App;

import static spark.Spark.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.DBsLogic.CreateDatabase;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import org.json.JSONException;
import org.json.JSONObject;

import models.*;
import models.enums.TipoPagamento;
import dao.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Aplicacao {
    public static void main(String[] args) throws Exception {

         //CreateDatabase dataBase = new CreateDatabase();
         //dataBase.create();

        port(4567); // Define a porta da API (http://localhost:4567)

        Gson gson = new GsonBuilder()
                .registerTypeAdapter(LocalDateTime.class, new JsonDeserializer<LocalDateTime>() {
                    @Override
                    public LocalDateTime deserialize(JsonElement json, java.lang.reflect.Type typeOfT,
                            JsonDeserializationContext context) {
                        // ISO_DATE_TIME aceita "2025-05-09T14:31:45.123Z"
                        return LocalDateTime.parse(json.getAsString(), DateTimeFormatter.ISO_DATE_TIME);
                    }
                })
                .registerTypeAdapter(LocalDateTime.class, new JsonSerializer<LocalDateTime>() {
                    @Override
                    public JsonElement serialize(LocalDateTime src, java.lang.reflect.Type typeOfSrc,
                            JsonSerializationContext context) {
                        return new JsonPrimitive(src.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
                    }
                })
                .create();

        UsersDAO userDAO = new UsersDAO();
        ProdutoDAO produtoDAO = new ProdutoDAO();
        PizzaDAO pizzaDAO = new PizzaDAO();
        BebidaDAO bebidaDAO = new BebidaDAO();
        PedidoItemDAO pedidoItemDAO = new PedidoItemDAO();
        PedidoDAO pedidoDAO = new PedidoDAO();
        PagamentoDAO pagamentoDAO = new PagamentoDAO();
        EnderecoDAO enderecoDAO = new EnderecoDAO();
        // Endpoint de teste
        // Responde às requisições OPTIONS (preflight)
        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            response.header("Access-Control-Allow-Origin", "*");
            return "OK";
        });

        // Endpoint de login
        post("/users/login", (req, res) -> {
            res.type("application/json");
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");

            // Converte o JSON recebido para um objeto User
            User loginRequest = gson.fromJson(req.body(), User.class);

            User user = new User(); // Instância usada para chamar login
            boolean sucesso = user.login(loginRequest.getEmail(), loginRequest.getPassword());

            if (sucesso) {
                Map<String, Object> resposta = new HashMap<>();
                    resposta.put("mensagem", "Pagamento criado com sucesso!");
                    resposta.put("sucesso", true);
                    resposta.put("id", user.getId());

                    return gson.toJson(resposta);
            } else {
                res.status(401);
                return gson.toJson(new Resposta("Email ou senha incorretos.", false));
            }
        });

        post("/users/create", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            User cadastroRequest = gson.fromJson(req.body(), User.class);
            System.out.println("Email: " + cadastroRequest.getEmail());
            System.out.println("Senha: " + cadastroRequest.getPassword());
            System.out.println("CPF: " + cadastroRequest.getCpf());
            System.out.println("Telefone: " + cadastroRequest.getPhone_number());
            System.out.println("Telefone: " + cadastroRequest.getNome());
            if (userDAO.create(cadastroRequest)) {
                return gson.toJson(new Resposta("Cadastro realizado com sucesso!", true));
            } else {
                res.status(401);
                return gson.toJson(new Resposta("Erro no cadastro!", false));
            }
        });
        // GET /users/:id - Buscar usuário
        get("/users/read/:id", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            int id = Integer.parseInt(req.params("id"));
            User user = userDAO.read(id);
            if (user != null) {
                return gson.toJson(user);
            } else {
                res.status(404);
                return gson.toJson(new Resposta("Usuário não encontrado.", false));
            }
        });

        // PUT /users/:id - Atualizar usuário
        put("/users/update/:id", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
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
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            int id = Integer.parseInt(req.params("id"));
            if (userDAO.delete(id)) {
                return gson.toJson(new Resposta("Usuário removido!", true));
            } else {
                res.status(500);
                return gson.toJson(new Resposta("Erro ao remover usuário.", false));
            }

        });
        get("/users/getAll", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            return gson.toJson(userDAO.readAll());

        });

        // POST /produto - Cadastrar produto
        post("/produto/create", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            Produto produto = gson.fromJson(req.body(), Produto.class);
            System.out.println(produto.getUrl());
            if (produtoDAO.create(produto)) {
                res.status(201);
                return gson.toJson(new Resposta("Produto cadastrado!", true));
            } else {
                res.status(500);
                return gson.toJson(new Resposta("Erro ao cadastrar produto.", false));
            }
        });

        // GET /produto/:id - Buscar produto
        get("/produto/read/:id", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            int id = Integer.parseInt(req.params("id"));
            Produto produto = produtoDAO.read(id);
            if (produto != null) {
                return gson.toJson(produto);
            } else {
                res.status(404);
                return gson.toJson(new Resposta("Produto não encontrado.", false));
            }
        });
        get("/produto/getAll", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            System.out.println(gson.toJson(produtoDAO.readAll()));
            return gson.toJson(produtoDAO.readAll());
        });
        // PUT /produto/:id - Atualizar produto
        put("/produto/update/:id", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
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
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
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
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            Pizza pizza = gson.fromJson(req.body(), Pizza.class);
            System.out.println(pizza.getId_produto());
            System.out.println(pizza);
            System.out.println(pizza.getTamanho());
            System.out.println(gson.toJson(pizza));
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
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            int id = Integer.parseInt(req.params("id"));
            Pizza pizza = pizzaDAO.read(id);
            if (pizza != null) {
                return gson.toJson(pizza);
            } else {
                res.status(404);
                return gson.toJson(new Resposta("Pizza não encontrada.", false));
            }
        });
        get("/pizza/getAll", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            return gson.toJson(pizzaDAO.readAll());
        });
        // PUT /pizza/:id - Atualizar pizza
        put("/pizza/update/:id", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
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
        delete("/pizza/delete/:id", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
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
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
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
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            int id = Integer.parseInt(req.params("id"));
            Bebida bebida = bebidaDAO.read(id);
            if (bebida != null) {
                return gson.toJson(bebida);
            } else {
                res.status(404);
                return gson.toJson(new Resposta("Bebida não encontrada.", false));
            }
        });
        get("/bebida/getAll", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            return gson.toJson(bebidaDAO.readAll());
        });
        // PUT /bebida/:id - Atualizar bebida
        put("/bebida/update/:id", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
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
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
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
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            int id = Integer.parseInt(req.params("id"));
            if (bebidaDAO.delete(id)) {
                return gson.toJson(new Resposta("Bebida removida!", true));
            } else {
                res.status(500);
                return gson.toJson(new Resposta("Erro ao remover bebida.", false));
            }
        });

        // ENDERECO

        post("/endereco/create", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            Endereco endereco = gson.fromJson(req.body(), Endereco.class);
            System.out.println(endereco.getBairro() + endereco.getCep() + endereco.getComplemento() + endereco.getRua() + endereco.getNumero() + endereco.getUser());
            enderecoDAO.create(endereco);
            res.status(201);
            return gson.toJson(endereco);
        });

        get("/endereco/read/:id", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            Endereco e = enderecoDAO.read(Integer.parseInt(req.params(":id")));
            return gson.toJson(e);
        });

        get("/endereco/getAll", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            return gson.toJson(enderecoDAO.readAll());
        });

        put("/endereco/update/:id", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            Endereco endereco = gson.fromJson(req.body(), Endereco.class);
            endereco.setId(Integer.parseInt(req.params(":id")));
            enderecoDAO.update(endereco);
            return gson.toJson(endereco);
        });

        delete("/endereco/delete/:id", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            enderecoDAO.delete(Integer.parseInt(req.params(":id")));
            return "Deletado";
        });

        // PAGAMENTO

        post("/pagamento/create", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            try {
                Pagamento pagamento = gson.fromJson(req.body(), Pagamento.class);
                // pagamento.setTipoPagamento(TipoPagamento.valueOf(gson.toJ(req.body())));
                boolean sucesso = pagamentoDAO.create(pagamento);
                if (sucesso) {
                    res.status(201);
                    Map<String, Object> resposta = new HashMap<>();
                    resposta.put("mensagem", "Pagamento criado com sucesso!");
                    resposta.put("sucesso", true);
                    resposta.put("id", pagamento.getId());

                    return gson.toJson(resposta);

                } else {
                    res.status(500);
                    return gson.toJson(new Resposta("Erro ao criar pagamento!", false));
                }
            } catch (Exception e) {
                e.printStackTrace(); // Mostra erro no console
                res.status(500);
                return gson.toJson(new Resposta("Erro interno: " + e.getMessage(), false));
            }
        });

        get("/pagamento/read/:id", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            Pagamento p = pagamentoDAO.read(Integer.parseInt(req.params(":id")));
            return gson.toJson(p);
        });

        get("/pagamento/getAll", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");

            return gson.toJson(pagamentoDAO.readAll());
        });

        put("/pagamento/update/:id", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            Pagamento pagamento = gson.fromJson(req.body(), Pagamento.class);
            pagamento.setId(Integer.parseInt(req.params(":id")));
            pagamentoDAO.update(pagamento);
            return gson.toJson(pagamento);
        });

        delete("/pagamento/delete/:id", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            pagamentoDAO.delete(Integer.parseInt(req.params(":id")));
            return "Deletado";
        });

        // PEDIDO

        post("/pedido/create", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            Pedido pedido = gson.fromJson(req.body(), Pedido.class);
            pedidoDAO.create(pedido);
            res.status(201);
            return gson.toJson(pedido);
        });

        get("/pedido/read/:id", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            Pedido p = pedidoDAO.read(Integer.parseInt(req.params(":id")));
            return gson.toJson(p);
        });

        get("/pedido/getAll", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            return gson.toJson(pedidoDAO.readAll());
        });

        put("/pedido/update/:id", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            Pedido pedido = gson.fromJson(req.body(), Pedido.class);
            pedido.setId(Integer.parseInt(req.params(":id")));
            pedidoDAO.update(pedido);
            return gson.toJson(pedido);
        });

        delete("/pedido/delete/:id", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            pedidoDAO.delete(Integer.parseInt(req.params(":id")));
            return "Deletado";
        });
        get("/pedido/calculateTotal/:id", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            int id = Integer.parseInt(req.params("id"));
            Pedido pedido = pedidoDAO.read(id);
            if (pedido != null) {
                return gson.toJson(pedido.calculateTotal());
            } else {
                res.status(404);
                return gson.toJson(new Resposta("Produto não encontrado.", false));
            }
        });

        // PEDIDO_ITEM

        post("/pedido_item/create", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            Pedido_item item = gson.fromJson(req.body(), Pedido_item.class);
            pedidoItemDAO.create(item);
            res.status(201);
            return gson.toJson(item);
        });

        get("/pedido_item/read/:id", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            Pedido_item item = pedidoItemDAO.read(Integer.parseInt(req.params(":id")));
            return gson.toJson(item);
        });

        get("/pedido_item/getAll", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");

            return gson.toJson(pedidoItemDAO.readAll());
        });

        put("/pedido_item/update/:id", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
            Pedido_item item = gson.fromJson(req.body(), Pedido_item.class);
            item.setId(Integer.parseInt(req.params(":id")));
            pedidoItemDAO.update(item);
            return gson.toJson(item);
        });

        delete("/pedido_item/delete/:id", (req, res) -> {
            res.type("application/json");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST,GET");
            res.header("Access-Control-Allow-Headers", "*");
            res.header("Access-Control-Max-Age", "86400");
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
