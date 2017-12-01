# _Where_ **2** _Party_

Nesse arquivo vou explicar como realizar a preparação do ambiente para
desenvolvimento do nosso aplicativo

### 1. Pre-requesitos

* Android Studio
* Sdk-Tools 23.0.3
* nodeJs (npm)
* yarn
* git
* react-native-cli

### 2. Clonagem do repositorio

Instale o git conforme esse
[Guia](https://git-scm.com/book/pt-br/v1/Primeiros-passos-Instalando-Git#Instalando-no-Windows)

É recomendado o uso de uma ferramenta de gerenciamento de repositórios no nosso
caso o [GitKraken](https://www.gitkraken.com/)

### 3. Instalaçao dos pre-requesitos

Para a instalaçao dos pre-requesitos, utilize a secção de instalação do guia do
React-Native disponivel
[aqui](http://facebook.github.io/react-native/releases/0.47/docs/getting-started.html#installing-dependencies)

### 4. Instalação das dependencias

Para o projeto poder funcionar direito, deve-se baixar as dependencias do mesmo,
utilizando o comando `yarn` na raiz do projeto

### 5. Build do fonte

> _Durante o executar da instalaçao dos pre-requesitos, sera pedido para
> executar o comando `react-native run-android` que sozinho ira rodar um
> servidor de deploy, mas caso de algum erro o mesmo se fechara e não
> possibilitara o debbug do erro, por isso optei por executar o servidor em um
> prompt separado._

Na raiz do projeto execute o comando `yarn start`. Isso ira rodar o servidor que
fará o deploy dos arquivo js dinamicamente durante o executar do debug do
aplicativo.

Em outro prompt, rode o comando (tambem na raiz) `react-native run-android`,
isso ira fazer o deploy do aplicativo para o seu dispositivo.

### 6. Hot-Loading (opcional)

É recomendado o uso do hot-loading para um desenvolvimento mais dinamico.
Podendo ver erros causados assim que as mudanças são salvas.

Para habilita-lo, basta apertar o botão de menu , _ou chacoalhar o dispositivo_,
que um menu pop-up ira aparecer, com varias opçoes;
