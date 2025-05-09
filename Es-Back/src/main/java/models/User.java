package models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.DBsLogic.DatabaseConnection;

public class User {

	private Integer id;
	private String email;
	private String password;
	private String phone_number;
	private String cpf;
	private String nome;
	private int endereco;



	public User() {

	}

	public User(Integer id, String email, String password, String phone_number, String cpf, String nome) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.phone_number = phone_number;
		this.cpf = cpf;
		this.nome = nome;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhone_number() {
		return phone_number;
	}

	public void setPhone_number(String phone_number) {
		this.phone_number = phone_number;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public int getEndereco() {
		return endereco;
	}

	public void setEndereco(int endereco) {
		this.endereco = endereco;
	}

	public boolean login(String email, String password) {

		String sql = "SELECT id, email, password, phone_number, cpf, password FROM users WHERE email = ?";

		try (Connection conn = DatabaseConnection.connect();
				PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setString(1, email);

			ResultSet rs = stmt.executeQuery();

			if (rs.next()) {

				String storedPassword = rs.getString("password");

				if (storedPassword.equals(password)) {

					this.id = rs.getInt("id");
					this.email = rs.getString("email");
					this.password = storedPassword;
					this.phone_number = rs.getString("phone_number");
					this.cpf = rs.getString("cpf");

					return true;
				}
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}

		return false;
	}

	public boolean cadastro(){
		String sql = "INSERT INTO users (email, password, phone_number, cpf) VALUES (?, ?, ?, ?)";

		try (Connection conn = DatabaseConnection.connect();
				PreparedStatement stmt = conn.prepareStatement(sql)) {

			stmt.setString(1, email);
			stmt.setString(2, password);
			stmt.setString(3, phone_number);
			stmt.setString(4, cpf);
			stmt.executeUpdate();
			return true;
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return false;
	}

	public void updateProfile(String newEmail, String newPhone) {
		email = newEmail;
		phone_number = newPhone;
	}

	public String getAddress() {
		return null;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

}
