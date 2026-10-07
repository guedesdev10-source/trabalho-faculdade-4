# IrrigaSmart — Fase 5 (React)

Versão React do projeto IrrigaSmart, mantendo o visual da Fase 4 e adicionando uma nova funcionalidade interativa.

## Nova funcionalidade

Na página **Sistemas**, cada zona de irrigação pode ser ativada/desativada. O contador de **Zonas ativas** é atualizado automaticamente usando estado do React (`useState`).

Também foram convertidos para React:
- Dashboard
- Sistemas
- Fale Conosco
- Simulador de consumo de água
- Validação do formulário de contato

## Como executar

1. Instale o Node.js.
2. Abra esta pasta no VS Code.
3. No terminal, execute:

```bash
npm install
npm run dev
```

4. Abra o endereço mostrado pelo Vite, normalmente `http://localhost:5173`.

## Estrutura

- `src/main.jsx` — componentes React, rotas, estados e funcionalidades.
- `src/style.css` — estilos do projeto.
- `public/asserts` — imagens originais do projeto.
- `index.html` — entrada da aplicação Vite/React.
- `package.json` — dependências e scripts.
