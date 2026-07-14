# RS Soluções - Website Institucional Premium

Este projeto consiste em um site institucional moderno, premium e responsivo para a empresa **RS Soluções**, pronto para ser publicado no **Firebase Hosting**. O site foi desenvolvido do zero em HTML5 semântico, CSS3 puro (com animações fluidas e efeitos de hover) e JavaScript ES6.

---

## Guia de Publicação no Firebase Hosting

Siga o passo a passo abaixo para colocar o site no ar de forma rápida e segura.

### 1. Como instalar o Firebase CLI

O Firebase CLI (interface de linha de comando) é necessário para conectar o código local aos servidores do Firebase. Ele depende do **Node.js** instalado no sistema.

1. Baixe e instale o Node.js (versão LTS recomendada) em [nodejs.org](https://nodejs.org/).
2. Abra o terminal (PowerShell no Windows, Terminal no macOS/Linux) e execute o comando abaixo para instalar o Firebase CLI globalmente:
   ```bash
   npm install -g firebase-tools
   ```
3. Confirme que a instalação foi bem-sucedida verificando a versão instalada:
   ```bash
   firebase --version
   ```

### 2. Como executar o `firebase login`

Para associar o terminal à sua conta Google que gerencia os projetos do Firebase:

1. No terminal, execute o comando:
   ```bash
   firebase login
   ```
2. Uma janela do seu navegador padrão será aberta. Faça login com a conta Google desejada e clique em **Permitir** para conceder acesso às ferramentas do Firebase.
3. No terminal, você verá uma mensagem confirmando que o login foi bem-sucedido.

### 3. Como criar um projeto no Firebase

1. Acesse o **Console do Firebase** em [console.firebase.google.com](https://console.firebase.google.com/).
2. Clique em **Adicionar projeto** (ou criar projeto).
3. Insira o nome do seu projeto (ex: `rs-solucoes` ou `rs-solucoes-prod`) e clique em **Continuar**.
4. Escolha se deseja ativar o Google Analytics para o projeto (opcional, pode ser desativado para sites puramente institucionais) e clique em **Criar projeto**.
5. Aguarde alguns segundos e clique em **Continuar** assim que o projeto estiver pronto.

### 4. Como conectar o projeto local ao Firebase

O projeto já inclui as configurações padrão necessárias no arquivo `firebase.json` e `.firebaserc`. Para ligar a sua pasta local ao projeto que você acabou de criar no console web do Firebase:

1. No terminal, certifique-se de estar na pasta raiz deste projeto (`c:\Users\IDF\Downloads\RS SOLUÇÕES`).
2. Vincule seu projeto executando:
   ```bash
   firebase use --add
   ```
3. O CLI listará os projetos existentes na sua conta. Selecione o projeto criado no passo anterior utilizando as setas do teclado e pressione `Enter`.
4. O terminal solicitará um apelido (alias) para esta associação. Digite `default` (ou simplesmente pressione `Enter` para usar as configurações existentes no arquivo `.firebaserc`).

*(Nota: Caso queira editar manualmente, basta abrir o arquivo `.firebaserc` e substituir `"rs-solucoes-prod"` pelo ID exato do seu projeto criado no Firebase).*

### 5. Como publicar usando `firebase deploy`

Com o projeto devidamente configurado e vinculado, a publicação final é extremamente simples:

1. No terminal, na raiz do projeto, execute o seguinte comando:
   ```bash
   firebase deploy
   ```
2. O Firebase CLI fará o upload dos arquivos (HTML, CSS, JS, Imagens, favicon) e configurará os cabeçalhos de segurança e cache automático.
3. Ao finalizar, o terminal exibirá a mensagem **Deploy complete!** juntamente com a **Hosting URL** pública gerada pelo Firebase (normalmente algo como `https://seu-projeto.web.app` ou `https://seu-projeto.firebaseapp.com`).

### 6. Como atualizar o site futuramente

Se você realizar alterações nos arquivos locais (ex: atualizar textos, trocar imagens ou alterar estilos) e quiser publicá-las:

1. Salve todas as modificações no código local.
2. Abra o terminal na pasta do projeto e execute novamente:
   ```bash
   firebase deploy
   ```
3. O Firebase Hosting fará o upload apenas dos arquivos modificados de forma rápida, substituindo-os na CDN mundial. Caso ocorra qualquer erro no deploy novo, o painel do Firebase permite reverter instantaneamente para a versão anterior com apenas um clique.

---

## Configurando o domínio do Squarespace

Após o deploy, o Firebase fornece domínios gratuitos `.web.app`. Para apontar o seu domínio próprio adquirido ou gerenciado no **Squarespace** (ex: `rssolucoes.com.br`) para os servidores do Firebase, siga os passos abaixo:

### Passo 1: Iniciar o processo no Firebase Console
1. Acesse o **Console do Firebase** e entre no seu projeto.
2. No menu lateral esquerdo, vá em **Compilação** (Build) > **Hosting**.
3. Clique no botão **Adicionar domínio personalizado** (Add custom domain).
4. Digite o nome do seu domínio (ex: `rssolucoes.com.br`) e marque a opção para redirecionar o subdomínio `www` para o domínio raiz (se desejar). Clique em **Continuar**.
5. O Firebase exibirá instruções de DNS contendo **um registro TXT** (para verificar que você é dono do domínio) e, em seguida, **dois registros A** com endereços de IP do Firebase. Copie esses valores.

### Passo 2: Configurar o DNS no Squarespace Domains
1. Acesse sua conta no **Squarespace** e vá em seu Painel de Controle de Domínios em [domains.squarespace.com](https://domains.squarespace.com/).
2. Clique no domínio que você deseja configurar para abrir os detalhes.
3. No painel lateral, clique em **Configurações de DNS** (DNS Settings).
4. Se existirem registros antigos apontando para outros servidores (como servidores antigos do Wix, WordPress ou redirecionamentos anteriores), exclua-os para evitar conflito.
5. Adicione os seguintes registros fornecidos pelo Firebase:

   * **Registro de Verificação (TXT):**
     * **Tipo:** `TXT`
     * **Host/Nome:** `@` (ou deixe em branco se o painel exigir)
     * **Valor/Dados:** Coloque a linha de verificação copiada do Firebase (começa com `firebase-status-verification...`)
     * **TTL:** Padrão (normalmente 1 hora ou 3600 segundos)

   * **Registros de Apontamento (A):**
     * Adicione o primeiro IP fornecido pelo Firebase:
       * **Tipo:** `A`
       * **Host/Nome:** `@` (ou deixe em branco)
       * **Valor/Dados:** Primeiro IP fornecido (ex: `199.36.158.100`)
     * Adicione o segundo IP fornecido pelo Firebase (para redundância):
       * **Tipo:** `A`
       * **Host/Nome:** `@`
       * **Valor/Dados:** Segundo IP fornecido (ex: `199.36.158.100`)

   * **Registro para o subdomínio WWW (Redirecionamento/Apontamento):**
     * Adicione os mesmos registros A para o host `www`, ou crie um registro CNAME:
       * **Tipo:** `CNAME`
       * **Host/Nome:** `www`
       * **Valor/Dados:** `seu-projeto.web.app.` (com o ponto final se o Squarespace exigir)

6. Clique em **Salvar** no topo da tela do Squarespace para registrar as alterações nas tabelas de DNS mundiais.

### Passo 3: Verificar o domínio no Firebase
1. Volte para a aba do console do Firebase e clique em **Verificar** (Verify).
2. *Nota de Propagação:* A atualização do DNS pode demorar de alguns minutos até 24 horas para se propagar mundialmente. Se o Firebase não detectar o registro imediatamente, aguarde um momento e tente novamente.

### Passo 4: Ativação automática do HTTPS (SSL)
* Uma vez que o Firebase Hosting verifica com sucesso a posse e o apontamento do seu domínio, ele **solicita e instala automaticamente um certificado SSL gratuito Let's Encrypt**.
* Esse processo é 100% automatizado pelo Firebase e costuma demorar entre 1 a 4 horas após a verificação de DNS. Você não precisará fazer nenhuma configuração de certificado no Squarespace.

### Passo 5: Confirmar o funcionamento
1. Acesse o seu domínio no navegador (ex: `https://rssolucoes.com.br`).
2. Verifique se o site carrega perfeitamente e se o ícone do cadeado de segurança (HTTPS) está ativo na barra de endereços do navegador.
