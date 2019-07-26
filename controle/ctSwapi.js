
function ObterPlaneta(planeta) {
    
    var nAparicoes = 0;
    console.log('buscando.. ');
    console.log('buscando.. ' + planeta);

    var request = require('request');
    request('https://swapi.co/api/planets/', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var nPlanetas = JSON.parse(body).count;

            if (nPlanetas > 0) {
                /*
                    Buscando planetas....
                */
                for (var p = 1; p <= nPlanetas; p++) {
                    var subRequest = require('request');
                    subRequest('https://swapi.co/api/planets/' + p + '/', function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            var nomePlaneta = JSON.parse(body).name;
                            if (nomePlaneta === planeta) {
                                console.log(JSON.parse(body));
                                var nfilmes = JSON.parse(body).films;
                                console.log(nfilmes.length.toString());
                                nAparicoes = nfilmes.length;
                            }
                        };
                    });
                };
            }
            else {
                // res.status(500).send('Planeta: ' + planeta.nome + ' não encontrados em Swapi.co!, nº aparicoes indisponivel');
                console.log('Planeta: ' + planeta.nome + ' não encontrados em Swapi.co!, nº aparicoes indisponivel');

                if (planeta.aparicoes != nAparicoes) {
                    console.log('planeta.nome: ' + ObterPlaneta.toString());
                    nAparicoes = planeta.aparicoes;
                };
            };

        }
    })

    return nAparicoes;
};

module.exports = ObterPlaneta();