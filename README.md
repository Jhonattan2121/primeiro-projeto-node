# Recuperação de Senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções com recuperação de senha;
- o usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por email para resetar senha , deve expirar em 2 horas;
- o usuário precisa confirmar a nova senha ao resetar sua senha ;

# Atualização de perfil

**RF**

- O usuário deve poder atualizar seu nome, email, e senha;

**RNF**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha , o usuário deve informar a senha antiga;
- Para atualizar sua senha , o usuário precisa confirmar a nova senha;

**RN**

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualiazar as notificações não lidas; 

**RFN**

- Os agendamentos do prestador nno dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;


**RN**

- A notificaçâo deve ter um status de lida ou näo-lida para que o prestador possa controlar;

# Agendamento de serviços 

**RF**

- O usuário deve poder listar todos prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponivel de um prestador;
- O usuário deve poder listar horários disponiveis em um dia especifico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**
- A listagem de prestadores deve ser armazenada em cache;



**RN**

- Cada agendamento deve durar 1 hora exatamente;
- Os agendamentos devem estar disponiveis entre 8 horas as 18 horas (Primeiro as 8 horas, último as 17 horas);
- O usuário não pode agendar em um horário já ocupado;
- O  usuário ão pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;
