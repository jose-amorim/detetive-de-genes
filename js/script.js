$(document).ready(() => {

    //Criar classe das rodadas
    class Rodada {

        constructor(id, heredograma_link, descricao_heredograma, pergunta, alternativas, posicao_resposta, dicas) {
            this.id = id,
            this.link_heredograma = heredograma_link;
            this.descricao_heredograma = descricao_heredograma;
            this.pergunta = pergunta;
            this.alternativas = alternativas;
            this.dicas = dicas;
            this.posicao_resposta = posicao_resposta;
            this.pontuacao = 4
        }

        displayRodada() {
            //numero da rodada
            $('#numero-rodada').text(this.id);
            
            //imagem do heredograma
            $('#heredograma-img').attr('src', this.link_heredograma);
    
            //descricao do heredograma
            $('#heredograma-descricao').text(this.descricao_heredograma);
    
            //pergunta
            $('#pergunta').text(this.pergunta);
    
            //alternativas
            $('#alt1').next('label').text(this.alternativas[0]);
            $('#alt2').next('label').text(this.alternativas[1]);
            $('#alt3').next('label').text(this.alternativas[2]);
            $('#alt4').next('label').text(this.alternativas[3]);
            
    
            //dicas
            $('#dica1 i').next('span').text(this.dicas[0]);
            $('#dica2 i').next('span').text(this.dicas[1]);
            $('#dica3 i').next('span').text(this.dicas[2]);

            //esconder as dicas
            $('#dica1, #dica2, #dica3').hide();

            //renovar o contador de dicas
            contDica = 1;

            //renovar o numero de dicas disponiveis de dicas
            $('#numero-dicas-disponiveis').text('3');

    
            //pontuacao
            $('#pontuacao-disponivel').text(this.pontuacao);

            //definir qual a posicao da resposta correta
            switch(this.posicao_resposta) {
                case 1:
                    $('#alt1').val('true');
                    break;
                case 2:
                    $('#alt2').val('true');
                    break;
                case 3:
                    $('#alt3').val('true');
                    break;
                case 4:
                    $('#alt4').val('true');
                    break;
            }

        }

        descontarPontuacao() {
            if(this.pontuacao >= 1) {
                this.pontuacao--;

                //mostrar a nova pontuação
                $('#pontuacao-disponivel').text(this.pontuacao);

            }
        }

        gravarPontuacao() {

            let score_parcial = sessionStorage.getItem('score_total');

            if(score_parcial == null) {
                sessionStorage.setItem('score_total', this.pontuacao);
            } else {
                sessionStorage.setItem('score_total', parseInt(score_parcial) + this.pontuacao);
            };

        }

    }

    //Criar vetor que armazena as rodadas
    const lista_rodadas = [
        new Rodada(
            1,
            './img/heredograma1.png', // './img/heredograma1.png',
            'Este é o seu primeiro caso! No heredograma acima, os indivíduos azuis são portadores de uma certa característica... e isso é tudo que sabemos.',
            'Qual é o padrão de herança desta característica?',
            ['Autossômica recessiva',
            'Ligada ao sexo recessiva',
            'Autossômica dominante',
            'Ligado ao sexo dominante'],
            0,
            [
                '4 e 7 têm os mesmos fenótipos e genótipos.',
                '1, 2 e 6 apresentam o mesmo genótipo.',
                '1 e 2 são heterozigotos.'
            ]),
        new Rodada(
            2,
            './img/heredograma2.png', // './img/heredograma2.png',
            "Agora, a dificuldade vai aumentar. Este é um heredograma de uma família com casos de albinismos (simbolos roxos), um distúrbio genético caracterizado pela ausência total ou parcial de melanina. Veja uma coisa nova: a seta indica quem é o probando, ou seja, o indivíduo que está sendo estudado.",
            "Qual é a chance dos indivíduos II.1 e II.2 terem um filho com albinismo?",
            ['1/2',
            '1/8',
            '1/4',
            'Nula'],
            2,
            [
                'O fato do casal ter uma filha sem albinismo não influencia em nada.',
                'A chance de um casal ter um filho menino é 1/2.',
                'O albinismo é causado por um alelo autossômico recessivo.'
            ]),
        new Rodada(
            3,
            './img/heredograma3.png', // './img/heredograma3.png',
            "Você sabia a surdez pode ter diversas causas genéticas diferentes? Ela pode ser causada por mutações em genes autossômicos, genes localizados no cromossomo X ou ainda por genes mitocondriais. Os heredogramas acima representam quatro famílias em que ocorre surdez nos indivíduos pintados.",
            "Qual família rejeita a possibilidade que a surdez tenha herança mitocondrial?",
            ['Família 1',
            'Família 2',
            'Família 3',
            'Família 4'],
            0,
            [
                'Uma família em que todos os indivíduos são afetados não é muito informativa neste caso.',
                'Na herança mitocrondrial, há ausência de transmissão paterna.',
                'Apenas o DNA mitocrondrial da mãe é passado para os filhos.'
            ]),
        new Rodada(
            4,
            './img/heredograma4.png', // './img/heredograma4.png',
            "Você está quase no final! O heredograma acima mostra o surgimento de atrofia muscular espinhal (AME) em um menino filho de um casal de primos (note como o casamento consanguíneo é representado por duas linhas ao invés de uma). Esta doença é autossômica recessiva e rara, causada por uma mutação em um alelo no gene SMN1, sendo que 1 a cada 50 pessoas não portadoras possuem o alelo mutante. Representamos uma pessoa que não possui a doença mas é portadora do alelo mutante com um pontinho colorido.",
            'A chance do casal II.1 e II.2 ter uma criança com AME é de 1 em:',
            ['50',
            '100',
            '200',
            '300'],
            3,
            [
                'Calcule a chance da mulher II.2 ser portadora do alelo mutante.',
                'A probabilidade do homem II.1 ter o alelo mutante ao acaso é 1/50.',
                'Calcule a probabilidade de um casal heterozigoto ter uma criança portadora. '
            ]),
        new Rodada(
            5,
            './img/heredograma5.png', //' ./img/heredograma5.png',
            "Você chegou no desafio final! Neste heredograma, o indivíduo 1 é afetado pela síndrome de Marfan. O indivíduo 2 é casado com o indivíduo 1 e não é afetado pela síndrome de Marfan, estes tiveram 2 filhos, o indivíduo 4  é afetado e herda a doença, sua irmã não possui a doença. O indivíduo 4 casa-se com uma mulher que não possui traços da síndrome em sua família, estes têm 4 filhos, onde dois desses tem a síndrome, indivíduo 7 e 8, os outros não possuem manifestações da doença. A mulher indivíduo 7 casa-se com um homem sem traços da síndrome, tem três filhos, dois homens e uma mulher, onde um dos homens possui a síndrome, a mulher não possui e o segundo filho não se sabe ainda.",
            'Qual a probabilidade do  indivíduo 12 ter a síndrome de Marfan?',
            ["0%",
            "25%",
            "50%",
            "100%"],
            2,
            [
                'Esta síndrome é uma doença dominante altamente penetrante.',
                'Considere apenas os dados conhecidos (a mãe expressa a síndrome em apenas um alelo).',
                'O pai é homozigoto recessivo.'
            ]),
            
    ];

    //submeter a resposta do usuario
    $('#btnResponder').on('click', (e) => {
        e.preventDefault();
        let alternativa = document.querySelector('input[name="alternativa"]:checked').value;

        if(alternativa == lista_rodadas[rodada_atual].posicao_resposta && rodada_atual < 4) {
            $('#feedback-resposta-errada').text('');

            //salvar pontuacao
            lista_rodadas[rodada_atual].gravarPontuacao();

            //atualizar a proxima rodada
            rodada_atual = rodada_atual + 1;

            //limpar formulario
            document.querySelector('form').reset();


            lista_rodadas[rodada_atual].displayRodada();
        } else if (alternativa == lista_rodadas[rodada_atual].posicao_resposta && rodada_atual == 4) {
            lista_rodadas[rodada_atual].gravarPontuacao();
            
            location.replace('/vitoria.html'); //location.href = './vitoria.html';
        } else {
            lista_rodadas[rodada_atual].descontarPontuacao();
            $('#feedback-resposta-errada').text('Resposta incorreta');

            setTimeout(function() {
                $('#feedback-resposta-errada').text('');
            },4000)

            document.querySelector('form').reset();
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
            lista_rodadas[rodada_atual].descontarPontuacao();

        }
    })

    //zerar pontos caso o usuario saia da rodada
    $('.icon-bar').on('click', function() {
        sessionStorage.removeItem('score_total');
    })


    //inicializar a pagina na rodada1
    let rodada_atual = 0;
    lista_rodadas[rodada_atual].displayRodada();




})
