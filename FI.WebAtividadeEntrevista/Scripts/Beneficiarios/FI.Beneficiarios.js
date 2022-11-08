
$(document).ready(function () {

    $('#formCadastroBeneficiario').submit(function (e) {
        e.preventDefault();

        let postClienteFuncionou = false;
        let clientId;

        let variaveisValidadas = true;
        let variaveis = [];
        variaveis.push($("#Nome").val());
        variaveis.push($("#CPF").val());
        variaveis.push($("#CEP").val());
        variaveis.push($("#Email").val());
        variaveis.push($("#Sobrenome").val());
        variaveis.push($("#Nacionalidade").val());
        variaveis.push($("#Estado").val());
        variaveis.push($("#Cidade").val());
        variaveis.push($("#Logradouro").val());
        variaveis.push($("#Telefone").val());

        for (var i = 0; i < variaveis.length; i++) {
            if (variaveis[i] == "") {
                variaveisValidadas = false;
                break;
            }
        }

        if (variaveisValidadas) {
            $.ajax({
                url: urlPost,
                method: "POST",
                data: {
                    "NOME": $("#Nome").val(),
                    "CPF": $("#CPF").val(),
                    "CEP": $("#CEP").val(),
                    "Email": $("#Email").val(),
                    "Sobrenome": $("#Sobrenome").val(),
                    "Nacionalidade": $("#Nacionalidade").val(),
                    "Estado": $("#Estado").val(),
                    "Cidade": $("#Cidade").val(),
                    "Logradouro": $("#Logradouro").val(),
                    "Telefone": $("#Telefone").val()
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
                        postClienteFuncionou = true;
                        clientId = r.Id;
                        var test = $("#Nome_Ben").val();

                        if (postClienteFuncionou) {
                            $.ajax({
                                url: urlPostBen,
                                method: "POST",
                                data: {
                                    "NOME": $("#Nome_Ben").val(),
                                    "CPF": $("#CPF_Ben").val(),
                                    "IDCLIENTE": clientId,
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
                                        ModalDialog("Sucesso!", r)
                                        $("#formCadastroBeneficiario")[0].reset();
                                    }
                            });
                        }

                        ModalDialog("Sucesso!", r.Mensagem)
                        $("#formCadastro")[0].reset();
                    }
            });
        }
        else {
            ModalDialog("Formulário incompleto", "Os dados do cliente não estão completos, preencha todos os campos corretamente e depois tente inserir um beneficiario");
        }
        
    })
    
})

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
