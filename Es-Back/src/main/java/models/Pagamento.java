package models;

import java.time.LocalDateTime;

import models.enums.TipoPagamento;

public class Pagamento {
	private Integer id;
	private TipoPagamento tipoPagamento;
	private LocalDateTime horario;
	private Double valor;
	
	public Pagamento () {
		
	}

	public Pagamento(Integer id, TipoPagamento tipoPagamento, LocalDateTime horario, Double valor) {
		this.id = id;
		this.tipoPagamento = tipoPagamento;
		this.horario = horario;
		this.valor = valor;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public TipoPagamento getTipoPagamento() {
		return tipoPagamento;
	}

	public void setTipoPagamento(TipoPagamento tipoPagamento) {
		this.tipoPagamento = tipoPagamento;
	}

	public LocalDateTime getHorario() {
		return horario;
	}

	public void setHorario(LocalDateTime horario) {
		this.horario = horario;
	}

	public Double getValor() {
		return valor;
	}

	public void setValor(Double valor) {
		this.valor = valor;
	}
	
	
}
