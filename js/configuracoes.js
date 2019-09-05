$(document).ready(function() {

    function block() {

        $("#cpf").val("");
        $("#nome").val("");
        $("#sexo").val("");
        $("#nascimento").val("");
        $("#turno").val("");
        $("#serie").val("");
        $.blockUI({
            message: "Aguarde...",
            css: {
                border: "none",
                padding: "15px",
                backgroundColor: "#000",
                "-webkit-border-radius": "10px",
                "-moz-border-radius": "10px",
                opacity: .5,
                color: "#fff",
                "font-size": "16px",
                "font-weight": "bold"

            }

        });
    }

    block();

    var intervalo = setInterval(function() {
            clearInterval(intervalo);


            $("#carregando").fadeIn(1500);
            $.unblockUI();
        },
        1000);

    $(".cpf").mask('000.000.000-00', { reverse: true });

    $(".telefone").mask("(00) 0000-00009");

    $(".telefone").blur(function(event) {
        if ($(this).val().length == 15) {
            $(".telefone").mask("(00) 00000-0009")
        } else {
            $(".telefone").mask("(00) 0000-00009")
        }
    });

    $(".email").mask("A", {
        translation: {
            "A": { pattern: /[\w@\-.+]/, recursive: true }
        }
    });

    $("#modal_cadastro").submit(function(e) {
        e.preventDefault();

    });

    $("#cpf").keyup(validarForm_Responsavel);
    $("#senha").keyup(validarForm_Responsavel);
    $("#nome").keyup(validarForm_Responsavel);
    $("#telefone").keyup(validarForm_Responsavel);
    $("#email").keyup(validarForm_Responsavel);


    validarForm_Responsavel();

    function validarForm_Responsavel() {

        if ($("#cpf").val().length > 0 && $("#senha").val().length > 0 && $("#nome").val().length > 0 && $("#telefone").val().length > 0 && ($("#email").val().length > 0)) {
            return true;

        } else {
            return false;

        }
    }


    $("#criar_responsavel").click(function() {
        $("#cpf").val("");
        $("#senha").val("");
        $("#nome").val("");
        $("#telefone").val("");
        $("#email").val("");

    });





    $("#salvar_confirm").click(function(e) {

        if (validarForm_Responsavel() == true) {

            $.ajax({
                url: "cadastro.php",
                type: 'POST',
                data: $("#form_cadastro").serialize(),
                success: function(data) {
                    console.log(data.length);
                    $("#receber_dados").html(data);
                    $.growl.notice({ title: "Responsável", message: "Salvo Com sucesso!" });
                    $("#modal_cadastro").modal("hide");

                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    alert("deu erro");
                    return false;
                }



            });

        } else {


            $.growl.warning({ title: "Responsável", message: "Favor, Verificar Todos os dados preenchidos e tente novamente" });


        }

    });











    $("#nascimento").datepicker({
        format: 'dd/mm/yyyy',
        language: 'pt-BR',
        endDate: "today",

    });

    $(document).ready(function() {
        $('#sidebarCollapse').on('click', function() {
            $('#sidebar').toggleClass('active');
        });
    });



});