function mostrarConteudo(secao) {
    // Esconde todas as seções
    var conteudos = document.querySelectorAll('.conteudo');
    conteudos.forEach(function(conteudo) {
        conteudo.style.display = 'none';
    });

    // Exibe a seção escolhida
    var secaoEscolhida = document.getElementById(secao);
    secaoEscolhida.style.display = 'block';
}

//-----------------------//

function salvar() { 
    var json, pessoa,                      // Variáveis para armazenar o JSON enviado e o objeto retornado.
        data = {},                         // Objeto para armazenar os dados digitados no formulário.
        request = new XMLHttpRequest(),    // Cria uma instância do objeto XMLHttpRequest para enviar a requisição.
        url = "http://localhost:8080/api/v1/pessoa"; // Define a URL do endpoint da API.

    data.nome = document.getElementById('inputNome').value; // Captura o valor do campo "Nome" do formulário.
    data.idade = document.getElementById('inputIdade').value; // Captura o valor do campo "Idade" do formulário.

    json = JSON.stringify(data); // Converte o objeto `data` para uma string no formato JSON.

    request.open('POST', url, true); // Configura a requisição HTTP com método POST, URL e define como assíncrona.
    request.setRequestHeader("Content-Type", "application/json"); // Define o cabeçalho indicando que os dados enviados serão JSON.

    request.onload = function () { // Define o comportamento quando a resposta for recebida.
        pessoa = JSON.parse(request.responseText); // Converte a resposta da API de JSON para um objeto.

        if (request.readyState == 4 && request.status == "201") { // Verifica se a requisição foi bem-sucedida.
            console.table(pessoa); // Exibe os dados retornados em formato de tabela no console.
        } else { // Caso contrário, trata como erro.
            console.error(pessoa); // Exibe a mensagem de erro no console.
        }
    };

    request.onerror = function() { // Define o comportamento para erros de conexão.
        console.log("Erro:" + request); // Exibe uma mensagem de erro genérica no console.
    };

    request.send(json); // Envia os dados JSON para a API.
    console.log(request.response); // Exibe a resposta da API no console (geralmente estará vazia neste ponto).
}

function alterar() {
    var pessoa, json,                      // Variáveis para armazenar o JSON enviado e o objeto retornado.
        data = {},                         // Objeto para armazenar os dados digitados no formulário.
        url = "http://localhost:8080/api/v1/pessoa", // Define a URL do endpoint da API.
        request = new XMLHttpRequest();    // Cria uma instância do objeto XMLHttpRequest para enviar a requisição.

    data.id = document.getElementById('inputID').value; // Captura o valor do campo "ID" do formulário.
    data.nome = document.getElementById('inputNome').value; // Captura o valor do campo "Nome" do formulário.
    data.nome = document.getElementById('inputIdade').value; // Captura o valor do campo "Idade" do formulário.

    json = JSON.stringify(data); // Converte o objeto `data` para uma string no formato JSON.

    request.open("PUT", url, true); // Configura a requisição HTTP com método PUT, URL e define como assíncrona.
    request.setRequestHeader("Content-type", "application/json"); // Define o cabeçalho indicando que os dados enviados serão JSON.

    request.onload = function () { // Define o comportamento quando a resposta for recebida.
        pessoa = JSON.parse(request.responseText); // Converte a resposta da API de JSON para um objeto.

        if (request.readyState == 4 && request.status == "200") { // Verifica se a requisição foi bem-sucedida.
            console.table(pessoa); // Exibe os dados retornados em formato de tabela no console.
        } else { // Caso contrário, trata como erro.
            console.error(pessoa); // Exibe a mensagem de erro no console.
        }
    };

    request.send(json); // Envia os dados JSON para a API.
}

function excluir() {
    var pessoa,                            // Variável para armazenar o objeto retornado.
        data = {},                         // Objeto para armazenar os dados digitados no formulário.
        request = new XMLHttpRequest(),    // Cria uma instância do objeto XMLHttpRequest para enviar a requisição.
        url = "http://localhost:8080/api/v1/pessoa"; // Define a URL do endpoint da API.

    data.id = document.getElementById('inputID').value; // Captura o valor do campo "ID" do formulário.

    request.open("DELETE", url + '/' + data.id, true); // Configura a requisição HTTP com método DELETE e URL com ID.

    request.onload = function () { // Define o comportamento quando a resposta for recebida.
        pessoa = JSON.parse(request.responseText); // Converte a resposta da API de JSON para um objeto.

        if (request.readyState == 4 && request.status == "200") { // Verifica se a requisição foi bem-sucedida.
            console.table(pessoa); // Exibe os dados retornados em formato de tabela no console.
        } else { // Caso contrário, trata como erro.
            console.error(pessoa); // Exibe a mensagem de erro no console.
        }
    };

    request.send(null); // Envia a requisição (sem corpo).
}

function listar() { 
    var resp, i,                           // Variáveis para armazenar a resposta e o índice do loop.
        txt = "",                          // Variável para construir o conteúdo HTML da tabela.
        request = new XMLHttpRequest(),    // Cria uma instância do objeto XMLHttpRequest para enviar a requisição.
        url = "http://localhost:8080/api/v1/pessoa"; // Define a URL do endpoint da API.

    request.open('GET', url, true); // Configura a requisição HTTP com método GET e define como assíncrona.

    request.onload = function() { // Define o comportamento quando a resposta for recebida.
        if (request.readyState == 4 && (request.status >= 200 && request.status < 400)) { // Verifica se a requisição foi bem-sucedida.
            resp = JSON.parse(request.responseText); // Converte a resposta da API de JSON para um objeto.

            // Monta uma tabela HTML para exibir os dados.
            txt += "<table style='width:53%' border='1' class='table table-hover'>";
            txt += "<thead class='thead-dark'>";
            txt += "<tr><th style='text-align:center'>Código</th><th>Nome</th><th>Idade</th></tr></thead>";

            for (i = 0; i < resp.length; i++) { // Itera sobre os registros retornados.
                txt += "<tr><td style='text-align:center'>" + resp[i].id + "</td>";
                txt += "<td>" + resp[i].nome + "</td>";
                txt += "<td>" + resp[i].idade + "</td></tr>";
            }

            txt += "</table>";
            document.getElementById('tabela').innerHTML = txt; // Exibe a tabela na página.
        } else { // Caso contrário, trata como erro.
            console.error(request); // Exibe a mensagem de erro no console.
        }
    };

    request.onerror = function() { // Define o comportamento para erros de conexão.
        console.log("Erro:" + request); // Exibe uma mensagem de erro genérica no console.
    };

    request.send(); // Envia a requisição (sem corpo).
}

function buscar() { 
    var resp,                              // Variável para armazenar a resposta.
        txt = "",                          // Variável para construir o conteúdo HTML da tabela.
        data = {},                         // Objeto para armazenar os dados digitados no formulário.
        request = new XMLHttpRequest(),    // Cria uma instância do objeto XMLHttpRequest para enviar a requisição.
        url = "http://localhost:8080/api/v1/pessoa"; // Define a URL do endpoint da API.

    data.id = document.getElementById('inputID').value; // Captura o valor do campo "ID" do formulário.

    request.open('GET', url + '/' + data.id, true); // Configura a requisição HTTP com método GET e URL com ID.

    request.onload = function() { // Define o comportamento quando a resposta for recebida.
        if (request.readyState == 4 && (request.status >= 200 && request.status < 400)) { // Verifica se a requisição foi bem-sucedida.
            resp = JSON.parse(request.responseText); // Converte a resposta da API de JSON para um objeto.

            // Monta uma tabela HTML para exibir o dado.
            txt += "<table style='width:53%' border='1' class='table table-hover'>";
            txt += "<thead class='thead-dark'>";
            txt += "<tr><th style='text-align:center'>Código</th><th>Nome</th><th>idade</th></tr></thead>";

            txt += "<tr><td style='text-align:center'>" + resp.id + "</td>";
            txt += "<td style='text-align:center'>" + resp.nome + "</td>";
            txt += "<td style='text-align:center'>" + resp.idade + "</td></tr>";

            txt += "</table>";
            document.getElementById('tabela').innerHTML = txt; // Exibe a tabela na página.
        } else { // Caso contrário, trata como erro.
            console.error(request); // Exibe a mensagem de erro no console.
        }
    };

    request.onerror = function() { // Define o comportamento para erros de conexão.
        console.log("Erro:" + request); // Exibe uma mensagem de erro genérica no console.
    };

    request.send(); // Envia a requisição (sem corpo).
}
