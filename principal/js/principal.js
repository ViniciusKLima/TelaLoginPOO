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