var criaJogo = function(sprite) {

    var etapa = 1;
    var palavraSecreta = '';
    var lacunas = [];
    var erros = 0;

    var ganhou = function () {
        if (lacunas.length <= 0) return false;

        return lacunas.every(function(chute) {
            return chute !== '';
        });
    };

    var perdeu = function () {
        return erros >= 8;
    };

    var ganhouOuPerdeu = function () {
        return ganhou() || perdeu();
    };

    var reinicia = function () {
        etapa = 1;
        lacunas = [];
        palavraSecreta = '';
        sprite.reset();
        erros = 0;
    };

    var criarLacunas = function() {
        lacunas = Array(palavraSecreta.length).fill('');
    };

    var proximaEtapa = function() {
        etapa = 2;
    };

    var processaChute = function(chute) {        

        var resultado,
            errou = true,
            exp = new RegExp(chute, 'gi');

            while ( resultado = exp.exec(palavraSecreta) ) {
                lacunas[resultado.index] = chute;
                errou = false;
            }

            if(errou) {
                sprite.nextFrame();
                erros++;
            }
    };

    var getLacunas = function() {
        return lacunas
    };

    var getEtapa = function() {
        return etapa;
    };

    var setPalavraSecreta = function(palavra) {

        palavraSecreta = palavra;
        criarLacunas();
        proximaEtapa();
    };    

    return {
        setPalavraSecreta: setPalavraSecreta,
        getLacunas: getLacunas,
        getEtapa: getEtapa,
        processaChute: processaChute, 
        ganhou : ganhou,
        perdeu : perdeu,
        ganhouOuPerdeu: ganhouOuPerdeu,
        reinicia: reinicia
    }

};