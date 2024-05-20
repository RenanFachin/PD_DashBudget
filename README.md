# DashBudget

DashBudget é uma aplicação ReactJS que ajuda usuários a gerenciar seus orçamentos pessoais e acompanhar suas transações financeiras. Com um dashboard intuitivo e opções para gestão detalhada, o DashBudget torna a administração financeira simples e acessível.

### Ferramentas utilizadas
- NextJS 14
- Typescript
- Clerk
- Shadcn/ui
- Prisma ORM

### Instalaçã
Instale as depêndências do projeto
```bash
npm install
```

Criar um container docker para rodar o banco de dados Postgres
```bash
docker compose up -d
```

Criar as variáveis de ambiente (env.local é do NextJS e .env é referente ao prismaORM)
```bash
cp .env.local.example .env.local
cp .env.example .env
```

Criar as chaves de acesso para autenticação com clerk, gerar uma aplicação e copiar as API KEYS para dentro do .env.local

Gerar tabelas no banco de dados
```bash
npx prisma migrate dev
```

Rodando o projeto
```bash
npm run dev
```


<!-- 
### Documentações relevantes
https://clerk.com/docs/quickstarts/nextjs
https://clerk.com/docs/components/user/user-button
https://clerk.com/docs/references/nextjs/current-user
https://clerk.com/docs/guides/custom-redirects#fallback-redirect

https://ui.shadcn.com/docs
https://ui.shadcn.com/docs/components/combobox#responsive
https://github.com/shadcn-ui/ui/blob/main/apps/www/hooks/use-media-query.tsx


https://tailwindcss.com/docs/container

https://www.prisma.io/nextjs
https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
-->