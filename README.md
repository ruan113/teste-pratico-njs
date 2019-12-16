# teste-pratico-njs

## Instruções de instalação

Para inicializar o projeto e suas dependencias: 
```
    $ git clone https://github.com/ruan113/teste-pratico-njs.git
    $ cd teste-pratico-njs
    $ npm install
```
Para rodar o projeto: 
```
    $ npx nodemon src -w src
```



## Configuração do banco de dados

Execute o código abaixo em uma query no mysql workbench para criar um database:
```
CREATE SCHEMA `smarkio-cities` ;

CREATE TABLE `smarkio-cities`.`cidades` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `lastSearch` DATETIME NOT NULL,
  `searchCounter` INT NULL DEFAULT 0,
  PRIMARY KEY (`id`));

CREATE  OR REPLACE VIEW `gettopresults` AS
SELECT * FROM cidades ORDER BY searchCounter DESC LIMIT 5;

CREATE PROCEDURE `setCity`(cidadeId INT, cidadeNome VARCHAR(45), dataAtual DATETIME)
BEGIN
	IF exists(SELECT * FROM cidades WHERE id = cidadeId) THEN
		UPDATE cidades SET searchCounter=searchCounter+1 WHERE id=cidadeId;
	ELSE
		INSERT INTO cidades
        (id, nome, lastSearch)
        VALUES 
        (cidadeId, cidadeNome, dataAtual);
	END IF;
END
```

Lembre-se de mudar as informações necessárias referentes ao usuário do seu banco de dados no arquivo "database.js" na pasta de providers.

```
const db = mysql.createConnection({
    host: 'localhost',
    user: '[NOME_DO_USUÁRIO]',
    password: '[SENHA_DO_USUÁRIO]',
    database: 'smarkio-cities'
});
```
