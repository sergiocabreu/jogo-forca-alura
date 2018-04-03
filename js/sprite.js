var createSprite = function(seletor) {
 
    var temProximo = function() {
        return atual + 1 <= ultimo;
    };

    var moveFrame = function(de, para) {
        $container.removeClass(de).addClass(para);
    };

    var nextFrame = function() {
        if (temProximo()) moveFrame(frames[atual], frames[++atual]);
    };

    var reset = function() {
        console.log('resetou');
        moveFrame(frames[atual], frames[0]);
        atual = 0;
    };

    var isFinished = function() {
        return !temProximo();
    };

    var $container = $(seletor);

    var frames = ['frame1','frame2','frame3','frame4','frame5','frame6','frame7','frame8','frame9'];

    var atual = 0;
    var ultimo = frames.length - 1;

    $container.addClass(frames[atual]);

    return {
        nextFrame: nextFrame,
        reset: reset,
        isFinished: isFinished
    } 
};