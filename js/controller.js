var criaController = function(jogo) {
 
    var $entrada = $('#entrada');
    var $lacunas = $('.lacunas');

    
    // consulta jogo.getLacunas() e exibe para o usuário cada lacuna 
    var exibeLacunas = function () {
        $lacunas.empty();
        jogo.getLacunas().forEach(function(lacuna){
            $('<li>').addClass('lacuna').text(lacuna).appendTo($lacunas)
        });
    };
    
    // muda o texto do placeHolder do campo de entrada    
    var mudaPlaceHolder = function (texto) {
        $entrada.attr('placeholder', texto);
    };    
    
    // passa para jogo.setPalavraSecreta() o valor digitado pelo jogador e chama o a função `exibeLacunas()` e `mudaPlaceHolder()` definidas no controller. 
    var guardaPalavraSecreta = function () {
        
        jogo.setPalavraSecreta($entrada.val().trim());
        $entrada.val('');
        mudaPlaceHolder('chute');
        exibeLacunas();
    };

    var reinicia = function () {

        // limpa todas as lacunas
        $lacunas.empty();
        // volta para a mensagem da etapa 1
        mudaPlaceHolder('Palavra secreta');
        // solita ao jogo que reinicia 
        jogo.reinicia();
    };

    var leChute = function() {
        jogo.processaChute($entrada.val().trim().substr(0, 1));
        $entrada.val('');
        exibeLacunas();

        setTimeout(function () {
            if (jogo.ganhouOuPerdeu()) {
                if (jogo.ganhou()) {
                    alert('Ganhou!');
                } else if (jogo.perdeu()) {
                    alert('Uma pena, tente novamente.');
                }
                reinicia();
            }
        }, 200);
    };


     // faz a associação do evento keypress para capturar a entrada do usuário toda vez que ele teclar ENTER
     var inicia = function () {

        $entrada.keypress(function (event) {
            if (event.which == 13) {
                switch (jogo.getEtapa()) {
                    case 1:                    
                        guardaPalavraSecreta();
                        break;
                    case 2:
                        leChute();
                        break;
                }
            }
        });

    };

    // retorna um objeto com a propriedade inicia, que deve ser chamada assim que o controller for criado. 
    return { inicia: inicia };
};