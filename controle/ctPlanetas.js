
async function AparicoesPlaneta(planeta) {

    const swapi = require('swapi-node');
    var nfilmes = -1;

    let request = require('request');    
    await swapi.get('https://swapi.co/api/planets/').then((result) => 
        {
            // console.log(result.count);
            var nPlanetas = result.count;
            
            if (nPlanetas > 0) {
                /*
                    Buscando planetas....
                */
                for (var p = 1; p <= nPlanetas; p++) {
                    swapi.get('https://swapi.co/api/planets/' + p + '/').then((result) => 
                    {
                        var nomePlaneta = result.name;

                        if (nomePlaneta === planeta) {
                            console.log((result));
                            var nfilmes = result.films;
                            console.log(nfilmes.length.toString());
                            return nfilmes.length;
                        };
                    });
                };

                if (nfilmes === -1)
                    return 0;
            }
            else {
                // res.status(500).send('Planeta: ' + planeta.nome + ' não encontrados em Swapi.co!, nº aparicoes indisponivel');
                console.log('Planeta: ' + planeta.nome + ' não encontrados em Swapi.co!, nº aparicoes indisponivel');

                if (planeta.aparicoes != nAparicoes) {
                    console.log('planeta.nome: ' + AparicoesPlaneta.toString());
                    return 0;
                };
            };            
        }
    );

    if (nfilmes === -1)
    return 0;
};

async function inserindo(req, res, Planeta, n)
{
    let PlanetaNew = new Planeta(req.body);
    PlanetaNew.aparicoes = n;

    Planeta.find({ nome: PlanetaNew.nome }, function (err, planetas) {
        if (err) {
            res.status(500);
            res.send('Erro :' + err.message);
        }
        else {
            if (!planetas.length) {
                console.log(AparicoesPlaneta(req.body.name));
                PlanetaNew.save(function (err2) {
                    if (err2) {
                        res.status(500);
                        console.log(err2);
                        res.send('Erro  ao inserir:' + err2.message);
                        // throw err;
                    }
                    else {
                        console.log(PlanetaNew);
                        res.status(201);
                        res.send(PlanetaNew);
                    }
                });
            }
            else {
                /* Update - não pedido...

                planetas.nome = req.body.nome;
                planetas.terreno = req.body.terreno;
                planetas.clima = req.body.clima;
                planetas.aparicoes = req.body.aparicoes;
                
                planetas.save(function (err2) {
                    if (err2) 
                    {
                        res.status(500);
                        throw err;
                    }
                    else
                    {
                        req.status(200).json(planetas).send(planetas.nome);
                    }
                });  
                */

                // devolvo o cadastrado....
                res.status(209);
                res.send(PlanetaNew);
            }
        }
    }).catch(err => {
        console.log(err);
    });
};

var ctPlanetas = function (Planeta) {
    // Buscando Todos os Planetas no MongoBD...
    var GetAll = function (req, res) {
        Planeta.find(function (err, planetas) {
            if (err) {
                res.status(500);
                res.send('Erro Interno no Servidor');
            }
            else {
                res.status(200);
                res.send(planetas);
            };
        }).catch(err => {
            console.log(err);
        });
    };

    // Buscar pelo _id
    var GetById = function (req, res) {
        Planeta.findById(req.params.id, function (err, planetas) {
            if (err) {
                res.status(404);
                res.send('Planeta não encontrado! ');
            }
            else {
                res.status(200);
                res.send(planetas);
            };
        }).catch(err => {
            console.log(err);
        });
    };

    // Buscar Pelo Nome
    var GetByName = function (req, res) {
        Planeta.findOne({ nome: req.params.nome }, function (err, planetas) {
            if (err) {
                res.status(404);
                res.send('Planeta não encontrado! ' + err.message);
            }
            else {
                if (Planeta) {
                    console.log(planetas);
                    res.status(200);
                    res.send(planetas);
                }
                else {
                    res.status(404);
                    res.send('Planeta não encontrado! ' + err.message);
                };
            };
        }).catch(err => {
            console.log(err);
        });
    };

    /*
        Insert, verificando se existe no banco 
    */
    var Insert = async function (req, res) {
        let n;
        try
        {
            n  = await AparicoesPlaneta(req.body.name);
        }
        catch(e)
        {
            n  = await AparicoesPlaneta(req.body.name);
        };

        await inserindo(req, res, Planeta, n);
    };
    
    // var Update = function (req, res) {

    //     var nome = req.params.nome;

    //     Planeta.findOne({ nome: nome }, function (err, planetas) {
    //         if (err) {
    //             req.status(500);
    //             res.send(err.message + 'Planeta não atualizado...');
    //             // throw err;
    //         }
    //         else {
    //             planetas.nome = req.body.nome || planetas.nome;
    //             planetas.terreno = req.body.terreno || planetas.terreno;
    //             planetas.clima = req.body.clima || planetas.clima;

    //             var Swapi = require('./ctSwapi')(planetas);
    //             planetas.aparicoes = AparicoesPlaneta(PlanetaNew.nome);               

    //             planetas.save(); // Salvando a alteração

    //             res.status(200);
    //             res.send(planetas);
    //         };
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // };
    var Delete = function (req, res) {
        let dnome = req.params.nome;
        Planeta.findOneAndDelete({ nome: dnome }, function (err) {
            if (err) {
                res.send('Erro:' + err.message);
                res.status(500);
            }
            else {
                res.status(200);
                res.send('planeta ' + dnome + ' removido!');
            };

            console.log(res.send);
        }).catch(err => {
            console.log(err);
        });
    };

    return {
        GetAll: GetAll,
        GetById: GetById,
        GetByName: GetByName,
        Insert: Insert,
        //Update: Update,
        Delete: Delete
    };
};

module.exports = ctPlanetas;