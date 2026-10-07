import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import './style.css';

const initialZones = [
  { id: 1, name: 'Área 1 — Horticultura', detail: '30 min · 06:00 · Seg a Sex', active: true },
  { id: 2, name: 'Área 2 — Fruticultura', detail: '25 min · 07:30 · Diário', active: true },
  { id: 3, name: 'Área 3 — Pastagem', detail: '20 min · 09:00 · Sáb e Dom', active: true },
  { id: 4, name: 'Área 4 — Estufa', detail: '15 min · 11:00 · Ter e Qui', active: false },
  { id: 5, name: 'Área 5 — Reserva', detail: '40 min · 14:00 · Seg, Qua e Sex', active: false },
];

function Layout() {
  return (
    <div className="container">
      <nav className="sidebar">
        <div className="sidebar__titulo">
          <img src="/asserts/dashboard/plantar.png" alt="Ícone do título" />
          <h1>Irriga<span className="destaque">Smart</span></h1>
        </div>
        <div className="sidebar__nav">
          <NavLink to="/">Dashboard</NavLink>
          <NavLink to="/sistemas">Sistemas</NavLink>
          <NavLink to="/fale-conosco">Fale Conosco</NavLink>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sistemas" element={<Systems />} />
        <Route path="/fale-conosco" element={<Contact />} />
      </Routes>
    </div>
  );
}

function Dashboard() {
  return (
    <main className="content">
      <section id="dashboard" className="aba">
        <div className="dashboard__banner">
          <div className="dashboard__banner__conteudo">
            <h2 className="dashboard__banner__conteudo-subtitulo">Irrigação <span className="destaque">Inteligente</span> para melhores resultados</h2>
            <p className="dashboard__banner__conteudo-texto">Tecnologia que monitora e automatiza a irrigação, economizando água e aumentando a produtividade</p>
          </div>
        </div>
        <div className="dashboard__painel">
          <h2 className="dashboard__painel-subtitulo">Painel de controle</h2>
          <ul className="dashboard__painel__list">
            <Card icon="arquitetura" image="arquitetura.png" title="Status da irrigação" value="Ativa" />
            <Card icon="relogio" image="relogio.png" title="Próxima irrigação" value="06:00" />
            <Card icon="agua" image="agua.png" title="Consumo de água hoje" value="20L" />
          </ul>
        </div>
        <div className="dashboard__tabela">
          <h3 className="dashboard__tabela-subtitulo">Irrigações de Hoje</h3>
          <table>
            <thead><tr><th>Área</th><th>Início</th><th>Duração</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>Área 1</td><td>6:00</td><td>30 min</td><td>Concluído</td></tr>
              <tr><td>Área 2</td><td>7:30</td><td>25 min</td><td>Em andamento</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function Card({ icon, image, title, value }) {
  return (
    <li>
      <div className="painel__conteudo">
        <img className={`painel__conteudo-icone ${icon}`} src={`/asserts/dashboard/${image}`} alt="" />
        <div className="painel__conteudo-box">
          <h3 className="painel__conteudo-descricao">{title}</h3>
          <p className={`painel__conteudo-texto texto-${icon}`}>{value}</p>
        </div>
      </div>
    </li>
  );
}

function Systems() {

  const [zones, setZones] = useState(() => {
    const savedZones = localStorage.getItem('zones');

    return savedZones
      ? JSON.parse(savedZones)
      : initialZones;
  });

  const [liters, setLiters] = useState('');
  const [times, setTimes] = useState('');
  const [result, setResult] = useState(null);

  const activeCount = zones.filter(zone => zone.active).length;

  function toggleZone(id) {
    setZones(current => {
      const updatedZones = current.map(zone =>
        zone.id === id
          ? { ...zone, active: !zone.active }
          : zone
      );

      localStorage.setItem('zones', JSON.stringify(updatedZones));

      return updatedZones;
    });
  }

  // restante...


  function calculate() {
    const l = Number(liters);
    const t = Number(times);
    if (l <= 0 || t <= 0) {
      setResult({ type: 'error', text: 'Por favor, insira valores positivos para litros e vezes.' });
      return;
    }
    setResult({ type: 'success', text: `O consumo total de água é: ${l * t} litros por dia.` });
  }

  return (
    <section id="sistemas" className="aba">
      <div className="sistemas__enunciado">
        <h1>Sistemas</h1>
        <p>Gerencie as zonas e os horários de irrigação</p>
      </div>
      <ul className="sistemas__painel__list">
        <Card icon="arquitetura" image="arquitetura.png" title="Zonas ativas" value={`${activeCount} / 5`} />
        <Card icon="relogio" image="relogio.png" title="Próxima irrigação" value="06:00" />
        <Card icon="agua" image="agua.png" title="Consumo hoje" value="20 L" />
      </ul>
      <div className="sistemas__grid">
        <div className="sistemas__zonas">
          <h3 className="sistemas__zonas-subtitulo">Zonas de Irrigação</h3>
          <ul className="sistemas__zonas__list">
            {zones.map(zone => (
              <li className="zona__item" key={zone.id}>
                <div className="zona__item__info">
                  <h4 className="zona__item-nome">{zone.name}</h4>
                  <p className="zona__item-detalhe">{zone.detail}</p>
                </div>
                <button
                  type="button"
                  className={`zona__item-badge zona__item-badge--${zone.active ? 'ativo' : 'inativo'} zona-toggle`}
                  onClick={() => toggleZone(zone.id)}
                  title="Clique para alterar o status"
                >
                  {zone.active ? 'Ativo' : 'Inativo'}
                </button>
              </li>
            ))}
          </ul>
          <p className="zona-ajuda">Clique no status de uma zona para ativar ou desativar a irrigação.</p>
        </div>
        <div className="sistemas__horarios">
          <h3 className="sistemas__horarios-subtitulo">Horários Automáticos</h3>
          <table className="sistemas__horarios__tabela">
            <thead><tr><th>Área</th><th>Horário</th><th>Duração</th><th>Dias</th></tr></thead>
            <tbody>
              <tr><td>Área 1</td><td>06:00</td><td>30 min</td><td>Seg a Sex</td></tr>
              <tr><td>Área 2</td><td>07:30</td><td>25 min</td><td>Diário</td></tr>
              <tr><td>Área 3</td><td>09:00</td><td>20 min</td><td>Sáb e Dom</td></tr>
              <tr><td>Área 1</td><td>16:00</td><td>30 min</td><td>Ter e Qui</td></tr>
              <tr><td>Área 2</td><td>20:00</td><td>25 min</td><td>Seg, Qua e Sex</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <section className="simulador">
        <h3>Simulador de Consumo de Água</h3>
        <label htmlFor="litros" className="form-text">Litros por irrigação:</label>
        <input type="number" id="litros" min="1" className="form-control" value={liters} onChange={e => setLiters(e.target.value)} />
        <label htmlFor="vezes" className="form-text">Irrigações por dia:</label>
        <input type="number" id="vezes" min="1" className="form-control" value={times} onChange={e => setTimes(e.target.value)} />
        <button id="calcular" className="btn btn-primary" onClick={calculate}>Calcular</button>
        {result && <p className={`resultado ${result.type}`}>{result.text}</p>}
      </section>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ nome: '', email: '', assunto: '', mensagem: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function update(field, value) {
    setForm(current => ({ ...current, [field]: value }));
    setSent(false);
  }

  function validate() {
    const next = {};
    const parts = form.nome.trim().split(/\s+/).filter(Boolean);
    if (parts.length < 2 || parts.some(part => part.length < 2)) next.nome = 'Por favor, insira seu nome completo.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Por favor, insira um email válido.';
    if (!form.mensagem.trim()) next.mensagem = 'O campo de mensagem é obrigatório.';
    else if (form.mensagem.trim().length > 500) next.mensagem = 'A mensagem deve ter no máximo 500 caracteres.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit(event) {
    event.preventDefault();
    if (validate()) setSent(true);
  }

  return (
    <section id="fale-conosco" className="aba">
      <div className="fale-conosco__enunciado">
        <h1>Fale conosco</h1>
        <p>Precisa de ajuda com o sistema de irrigação?<br />Entre em contato com nossa equipe.</p>
      </div>
      <div className="fale-conosco__grid">
        <div className="fale-conosco__grid__fbox">
          <h2 className="fale-conosco__grid__fbox-subtitulo">Enviar Mensagem</h2>
          <form className="fale-conosco__grid__formulario" onSubmit={submit}>
            <Field label="Nome Completo*" id="nome" value={form.nome} onChange={v => update('nome', v)} error={errors.nome} />
            <Field label="Email *" id="email" value={form.email} onChange={v => update('email', v)} error={errors.email} />
            <Field label="Assunto" id="assunto" value={form.assunto} onChange={v => update('assunto', v)} />
            <div className={`form-content ${errors.mensagem ? 'error' : ''}`}>
              <label htmlFor="mensagem">Mensagem *</label>
              <textarea id="mensagem" placeholder="Descreva sua dúvida ou problema" value={form.mensagem} onChange={e => update('mensagem', e.target.value)} />
              <span>{errors.mensagem}</span>
            </div>
            <p className="fale-conosco__grid__fbox-aviso">Campos marcados com * são obrigatórios!</p>
            <button type="submit" className="fale-conosco__grid__fbox-button">
              <img src="/asserts/fale-conosco/enviar.png" alt="Ícone de enviar" /> Enviar Mensagem
            </button>
            {sent && <p className="mensagem-sucesso">Mensagem enviada com sucesso!</p>}
          </form>
        </div>
        <div className="fale-conosco__grid__sbox">
          <ul>
            <Info image="telefone.png" title="Telefone" text="(11) 99999-9999" />
            <Info image="e-mail.png" title="Email" text="suporte@irrigasmart.com" />
            <Info image="relogio.png" title="Atendimento" text="Segunda a Sexta • 08:00 às 18:00" />
            <Info image="mapa.png" title="Localização" text="São Paulo • Brasil" />
          </ul>
        </div>
      </div>
    </section>
  );
}

function Field({ label, id, value, onChange, error }) {
  return (
    <div className={`form-content ${error ? 'error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" placeholder={`Digite ${id === 'nome' ? 'seu nome' : id === 'email' ? 'seu email' : 'o assunto'}`} value={value} onChange={e => onChange(e.target.value)} />
      <span>{error}</span>
    </div>
  );
}

function Info({ image, title, text }) {
  return (
    <li className="grid__sbox__conteudo">
      <img src={`/asserts/fale-conosco/${image}`} alt="" />
      <div><h4 className="grid__sbox__conteudo-subtitulo">{title}</h4><p className="grid__sbox__conteudo-texto">{text}</p></div>
    </li>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </React.StrictMode>
);
