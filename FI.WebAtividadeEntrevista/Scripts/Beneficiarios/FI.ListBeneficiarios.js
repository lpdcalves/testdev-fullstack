
$(document).ready(function () {

    var clientID;
    if (obj) {
        clientID = obj.Id;

        if (document.getElementById("gridBeneficiarios"))
            $('#gridBeneficiarios').jtable({
                title: 'Beneficiarios',
                actions: {
                    listAction: urlBeneficiarioList + "?Id=" + clientID,
                },
                fields: {
                    CPF: {
                        title: 'CPF',
                        width: '40%'
                    },
                    Nome: {
                        title: 'Nome',
                        width: '40%'
                    },
                    Alterar: {
                        title: '',
                        display: function (data) {
                            return '<button class="abrir-alterarModal btn btn-sm btn-primary" data-cpf="' + data.record.CPF + '" data-nome="' + data.record.Nome + '" data-id="' + data.record.Id + '" data-toggle="modal" data-target="#alterarBeneficiariosModal" > Alterar</button > ';
                        }
                    },
                    Excluir: {
                        title: '',
                        display: function (data) {
                            return '<button onclick="window.location.href=\'' + urlExclusaoBen + '/' + data.record.Id + '\'" class="btn btn-primary btn-sm">Excluir</button>';
                        }
                    }
                }
            });
    }

    //Load student list from server
    if (document.getElementById("gridBeneficiarios"))
        $('#gridBeneficiarios').jtable('load');
})