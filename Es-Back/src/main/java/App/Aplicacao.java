package App;

import static spark.Spark.*;

import com.google.gson.Gson;
import models.*;

public class Aplicacao {
    public static void main(String[] args) {

        port(4567); // Define a porta da API (http://localhost:4567)

        Gson gson = new Gson(); // Para conversão de objetos para JSON e vice-versa

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

        post("/users/cadastro", (req, res) -> {
            res.type("application/json");
            User cadastroRequest = gson.fromJson(req.body(), User.class);
            System.out.println("Email: " + cadastroRequest.getEmail());
            System.out.println("Senha: " + cadastroRequest.getPassword());
            System.out.println("CPF: " + cadastroRequest.getCpf());
            System.out.println("Telefone: " + cadastroRequest.getPhone_number());
            if (cadastroRequest.cadastro()) {
                return gson.toJson(new Resposta("Cadastro realizado com sucesso!", true));
            } else {
                res.status(401);
                return gson.toJson(new Resposta("Erro no cadastro!", false));
            }
        });
        // GET /users/:id - Buscar usuário
get("/users/:id", (req, res) -> {
    int id = Integer.parseInt(req.params("id"));
    User user = User.buscarPorId(id);
    if (user != null) {
        return gson.toJson(user);
    } else {
        res.status(404);
        return gson.toJson(new Resposta("Usuário não encontrado.", false));
    }
});

// PUT /users/:id - Atualizar usuário
put("/users/:id", (req, res) -> {
    User user = gson.fromJson(req.body(), User.class);
    user.setId(Integer.parseInt(req.params("id")));
    if (user.atualizar()) {
        return gson.toJson(new Resposta("Usuário atualizado!", true));
    } else {
        res.status(500);
        return gson.toJson(new Resposta("Erro ao atualizar usuário.", false));
    }
});

// DELETE /users/:id - Remover usuário
delete("/users/:id", (req, res) -> {
    int id = Integer.parseInt(req.params("id"));
    if (User.remover(id)) {
        return gson.toJson(new Resposta("Usuário removido!", true));
    } else {
        res.status(500);
        return gson.toJson(new Resposta("Erro ao remover usuário.", false));
    }
});// POST /produto - Cadastrar produto
post("/produto", (req, res) -> {
    Produto produto = gson.fromJson(req.body(), Produto.class);
    if (produto.salvar()) {
        res.status(201);
        return gson.toJson(new Resposta("Produto cadastrado!", true));
    } else {
        res.status(500);
        return gson.toJson(new Resposta("Erro ao cadastrar produto.", false));
    }
});

// GET /produto/:id - Buscar produto
get("/produto/:id", (req, res) -> {
    int id = Integer.parseInt(req.params("id"));
    Produto produto = Produto.buscarPorId(id);
    if (produto != null) {
        return gson.toJson(produto);
    } else {
        res.status(404);
        return gson.toJson(new Resposta("Produto não encontrado.", false));
    }
});

// PUT /produto/:id - Atualizar produto
put("/produto/:id", (req, res) -> {
    Produto produto = gson.fromJson(req.body(), Produto.class);
    produto.setId(Integer.parseInt(req.params("id")));
    if (produto.atualizar()) {
        return gson.toJson(new Resposta("Produto atualizado!", true));
    } else {
        res.status(500);
        return gson.toJson(new Resposta("Erro ao atualizar produto.", false));
    }
});

// DELETE /produto/:id - Remover produto
delete("/produto/:id", (req, res) -> {
    int id = Integer.parseInt(req.params("id"));
    if (Produto.remover(id)) {
        return gson.toJson(new Resposta("Produto removido!", true));
    } else {
        res.status(500);
        return gson.toJson(new Resposta("Erro ao remover produto.", false));
    }
});
// POST /pizza - Cadastrar pizza
post("/pizza", (req, res) -> {
    Pizza pizza = gson.fromJson(req.body(), Pizza.class);
    if (pizza.salvar()) {
        res.status(201);
        return gson.toJson(new Resposta("Pizza cadastrada!", true));
    } else {
        res.status(500);
        return gson.toJson(new Resposta("Erro ao cadastrar pizza.", false));
    }
});

// GET /pizza/:id - Buscar pizza
get("/pizza/:id", (req, res) -> {
    int id = Integer.parseInt(req.params("id"));
    Pizza pizza = Pizza.buscarPorId(id);
    if (pizza != null) {
        return gson.toJson(pizza);
    } else {
        res.status(404);
        return gson.toJson(new Resposta("Pizza não encontrada.", false));
    }
});

// PUT /pizza/:id - Atualizar pizza
put("/pizza/:id", (req, res) -> {
    Pizza pizza = gson.fromJson(req.body(), Pizza.class);
    pizza.setId(Integer.parseInt(req.params("id")));
    if (pizza.atualizar()) {
        return gson.toJson(new Resposta("Pizza atualizada!", true));
    } else {
        res.status(500);
        return gson.toJson(new Resposta("Erro ao atualizar pizza.", false));
    }
});

// DELETE /pizza/:id - Remover pizza
delete("/pizza/:id", (req, res) -> {
    int id = Integer.parseInt(req.params("id"));
    if (Pizza.remover(id)) {
        return gson.toJson(new Resposta("Pizza removida!", true));
    } else {
        res.status(500);
        return gson.toJson(new Resposta("Erro ao remover pizza.", false));
    }
});
// POST /bebida - Cadastrar bebida
post("/bebida", (req, res) -> {
    Bebida bebida = gson.fromJson(req.body(), Bebida.class);
    if (bebida.salvar()) {
        res.status(201);
        return gson.toJson(new Resposta("Bebida cadastrada!", true));
    } else {
        res.status(500);
        return gson.toJson(new Resposta("Erro ao cadastrar bebida.", false));
    }
});

// GET /bebida/:id - Buscar bebida
get("/bebida/:id", (req, res) -> {
    int id = Integer.parseInt(req.params("id"));
    Bebida bebida = Bebida.buscarPorId(id);
    if (bebida != null) {
        return gson.toJson(bebida);
    } else {
        res.status(404);
        return gson.toJson(new Resposta("Bebida não encontrada.", false));
    }
});

// PUT /bebida/:id - Atualizar bebida
put("/bebida/:id", (req, res) -> {
    Bebida bebida = gson.fromJson(req.body(), Bebida.class);
    bebida.setId(Integer.parseInt(req.params("id")));
    if (bebida.atualizar()) {
        return gson.toJson(new Resposta("Bebida atualizada!", true));
    } else {
        res.status(500);
        return gson.toJson(new Resposta("Erro ao atualizar bebida.", false));
    }
});

// DELETE /bebida/:id - Remover bebida
delete("/bebida/:id", (req, res) -> {
    int id = Integer.parseInt(req.params("id"));
    if (Bebida.remover(id)) {
        return gson.toJson(new Resposta("Bebida removida!", true));
    } else {
        res.status(500);
        return gson.toJson(new Resposta("Erro ao remover bebida.", false));
    }
});


        // Outros endpoints podem ser adicionados aqui (cadastro, pedidos, etc)
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
