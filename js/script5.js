$(document).ready(() => {

    let pontuacao = 4;

    $('#btnResponder5').on('click', e => {

        e.preventDefault();

        let alternativa = document.querySelector('input[name="alternativa"]:checked').value;

        console.log(alternativa) 

        if(alternativa != '1' && pontuacao > 0) {
            pontuacao = pontuacao - 1 //descontar pontuacao por ter errado
            $('#pontuacao-disponivel').text(pontuacao);
            $('#feedback-resposta-errada').text('Resposta incorreta');
        } else if (alternativa == '1') {

            sessionStorage.setItem('score_total', parseInt(sessionStorage.getItem('score_total'))+pontuacao);
            
            location.replace('./vitoria.html'); //redirecionar pra rodada seguinte
        } else {
            $('#feedback-resposta-errada').text('Resposta incorreta');
        }

    })

    //pedir dica
    let contDica = 1;

    $('#btnDica, #label-dicas').on('click', () => {
        if(contDica <=3 && contDica >=0) {
            //mostrar dica
            $('#dica'+contDica).show();

            //atualizar o contador da dicas
            contDica = contDica + 1;

            //diminuir o numero de dicas disponiveis
            $('#numero-dicas-disponiveis').text($('#numero-dicas-disponiveis').text()-1);

            //descontar pontuacao
            if(pontuacao > 0) {
                pontuacao = pontuacao - 1
            }

            $('#pontuacao-disponivel').text(pontuacao);

        }
    })


})