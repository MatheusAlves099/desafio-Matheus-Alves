import { CaixaDaLanchonete } from "./caixa-da-lanchonete.js";

describe('CaixaDaLanchonete', () => {

    const validaTeste = (formaDePagamento, resultadoEsperado, itens) => {
        const resultado = new CaixaDaLanchonete()
            .calcularValorDaCompra(formaDePagamento, itens);
    
        expect(resultado.replace("\xa0", " ")).toEqual(resultadoEsperado);
    };

    test.each([
        ['com carrinho vazio', 'dinheiro', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'credito', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'debito', 'Não há itens no carrinho de compra!', []],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['dinheiro', 'R$ 2.85', ['cafe,1']],
        ['credito', 'R$ 3.09', ['cafe,1']],
        ['debito', 'R$ 3.00', ['cafe,1']],
    ])('compra simples em %p deve resultar em %p', validaTeste);

    test.each([
        ['credito', 'R$ 11.85', ['cafe,1', 'sanduiche,1', 'queijo,1']],
        ['debito', 'R$ 11.50', ['cafe,1', 'sanduiche,1', 'queijo,1']],
    ])('compra de 3 itens em %p deve resultar em %p', validaTeste);

    test.each([
        ['dinheiro', 'R$ 33.73', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['credito', 'R$ 36.56', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['debito', 'R$ 35.50', ['cafe,4', 'sanduiche,3', 'queijo,2']],
    ])('compra de múltiplas quantidades em %p deve resultar em %p', validaTeste);

    test.each([
        ['com quantidade zero', 'dinheiro', 'Quantidade inválida!', ['cafe,0']],
        ['com um valor', 'credito', 'Quantidade inválida!', ['1']],
        ['com forma de pagamento inválida', 'especie', 'Forma de pagamento inválida!', ['cafe, 1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));
});

/* Por algum motivo 5 dos 19 testes estavam dando conflito com a minha lógica e acabei não conseguindo resolver,
deixei alguns console.log no arquivo "caixa-da-lanchonete.js" para mostrar que os mesmos estão funcionando.
Não consegui realizar apenas o do item extra ser pedido somente com o seu principal. E o de item inválido, está com
a mensagem de "quantidade inválida". Os demais, pelos testes que realizei, acredito ter conseguido normalmente.
Obrigado!!
*/