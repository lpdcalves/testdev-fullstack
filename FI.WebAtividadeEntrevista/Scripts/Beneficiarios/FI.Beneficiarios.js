
var beneficiariosInserir = [];

$(document).ready(function () {

    $('#formCadastroBeneficiario').submit(function (e) {
        e.preventDefault();

        // Se obj existe, significa que estamos alterando um cliente já existente
        // Portanto, a inserção de beneficiarios é feita diretamente um a um
        if (typeof obj != 'undefined') {
            if (obj) {
                beneficiarioNovo = {
                    Nome: $("#Nome_Ben").val(),
                    CPF: $("#CPF_Ben").val(),
                };
                beneficiariosInserir.push(beneficiarioNovo);

                InserirBeneficiarios(obj.Id);
            }
        }
        else {
            beneficiarioNovo = {
                Nome: $("#Nome_Ben").val(),
                CPF: $("#CPF_Ben").val(),
            };

            if (!ChecarCpfExisteLocal(beneficiarioNovo.CPF)) {
                beneficiariosInserir.push(beneficiarioNovo);
                ModalDialog("Beneficiário Inserido", `O beneficiário de Nome: ${beneficiarioNovo.Nome} e CPF: ${beneficiarioNovo.CPF} foi inserido na lista de beneficiários local. Quando a inserção do cliente for concluída no botão "Salvar" da tela de cadastro de clientes seu beneficiário será persistido.`);
                $("#formCadastroBeneficiario")[0].reset();
            }
            else {
                ModalDialog("CPF já existente", `Já existe um beneficiario cadastrado com o CPF: ${beneficiarioNovo.CPF}. Insira um novo CPF.`);
            }
        }
    })
    
})

function InserirBeneficiarios(idCliente) {
    for (var i = 0; i < beneficiariosInserir.length; i++) {
        $.ajax({
            url: urlPostBen,
            method: "POST",
                data: {
                    "NOME": beneficiariosInserir[i].Nome,
                    "CPF": beneficiariosInserir[i].CPF,
                    "IDCLIENTE": idCliente,
            },
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success:
                function (r) {
                    updateBeneficiariosList();
                }
        });
    }
    // Limpando a lista de beneficiarios local após inseri-los
    beneficiariosInserir = [];
}

function ChecarCpfExisteLocal(cpf) {
    for (var i = 0; i < beneficiariosInserir.length; i++) {
        if (beneficiariosInserir[i].CPF == cpf) {
            return true
        }
    }
    return false;
}

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}
