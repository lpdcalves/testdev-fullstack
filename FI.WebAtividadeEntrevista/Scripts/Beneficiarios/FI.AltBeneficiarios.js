
$(document).ready(function () {

    $('#formAlterarBeneficiario').submit(function (e) {
        e.preventDefault();
        
        $.ajax({
            url: urlAlteracaoBen,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome_Ben").val(),
                "CPF": $(this).find("#CPF_Ben").val(),
                "ID": alterarBeneficiarioID,
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
                $("#formAlterarBeneficiario")[0].reset();
                window.location.href = urlRetorno;
            }
        });
    })
    
})

$(document).on("click", ".abrir-alterarModal", function () {
    var cpf = $(this).data('cpf');
    var nome = $(this).data('nome');
    alterarBeneficiarioID = $(this).data('id');
    $(".modal-body #CPF_Ben").val(cpf);
    $(".modal-body #Nome_Ben").val(nome);
});

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
