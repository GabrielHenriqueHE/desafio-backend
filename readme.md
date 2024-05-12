# Desafio Back-end

## Requisitos

A seguir estão algumas regras de negócio que são importantes para o funcionamento do PicPay Simplificado:

- Para ambos tipos de usuário, precisamos do `Nome Completo`, `CPF`, `e-mail` e `Senha`. CPF/CNPJ e e-mails devem ser
  únicos no sistema. Sendo assim, seu sistema deve permitir apenas um cadastro com o mesmo CPF ou endereço de e-mail;

- Usuários podem enviar dinheiro (efetuar transferência) para lojistas e entre usuários;

- Lojistas **só recebem** transferências, não enviam dinheiro para ninguém;

- Validar se o usuário tem saldo antes da transferência;

- A operação de transferência deve ser uma transação (ou seja, revertida em qualquer caso de inconsistência) e o
  dinheiro deve voltar para a carteira do usuário que envia;

- Este serviço deve ser RESTFul.

### Endpoint de transferência

Você pode implementar o que achar conveniente, porém vamos nos atentar **somente** ao fluxo de transferência entre dois
usuários. A implementação deve seguir o contrato abaixo.

```http request
POST /transfer
Content-Type: application/json

{
  "value": 100.0,
  "payerId": 4,
  "receiverId": 15
}
```
