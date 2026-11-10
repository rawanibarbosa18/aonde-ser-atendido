

// =====================================
// 1. IDENTIFICAR OS DADOS DA PESQUISA
// =====================================


document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("formBusca");

    if (!formulario) {
        console.error("Formulário formBusca não encontrado!");
        return;
    }

    formulario.addEventListener("submit", async function (event) {

        event.preventDefault();

        const campoCep = document.getElementById("cep");
        const campoCategoria = document.getElementById("categoria");
        const mensagem = document.getElementById("mensagem");

        if (!campoCep || !campoCategoria || !mensagem) {
            console.error("Confira os IDs dos campos no HTML.");
            return;
        }

        const cep = campoCep.value.replace(/\D/g, "");
        const categoria = campoCategoria.value;

        // VALIDAR CEP

        if (cep.length !== 8) {
            mensagem.textContent = "Digite um CEP com 8 números.";
            return;
        }

        // VALIDAR CATEGORIA

        if (!categoria) {
            mensagem.textContent = "Selecione um atendimento.";
            return;
        }

        mensagem.textContent = "Consultando CEP...";

        try {

            // CONSULTAR VIACEP

            const resposta = await fetch(
                "https://viacep.com.br/ws/" + cep + "/json/"
            );

            if (!resposta.ok) {
                throw new Error("Não foi possível consultar o CEP.");
            }

            const endereco = await resposta.json();

            if (endereco.erro) {
                mensagem.textContent = "CEP não encontrado!";
                return;
            }

            // SALVAR OS DADOS

            const pesquisa = {
                cep: cep,
                cidade: endereco.localidade,
                estado: endereco.uf,
                bairro: endereco.bairro,
                categoria: categoria
            };

            localStorage.setItem(
                "pesquisa",
                JSON.stringify(pesquisa)
            );

            mensagem.textContent = "CEP encontrado! Abrindo resultados...";

            // REDIRECIONAR

            window.location.href = "saude.html";

        } catch (erro) {

            mensagem.textContent =
                "Erro ao consultar. Verifique sua internet e tente novamente.";

            console.error("Erro:", erro);

        }

    });

});

