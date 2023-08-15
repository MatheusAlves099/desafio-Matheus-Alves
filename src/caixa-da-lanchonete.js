class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            'cafe': 3.00,
            'chantily': 1.50,
            'suco': 6.20,
            'sanduiche': 6.50,
            'queijo': 2.00,
            'salgado': 7.25,
            'combo1': 9.50,
            'combo2': 7.50
        };
        this.itensPrincipais = {
            'queijo': ['sanduiche'],
            'chantily': ['cafe']
        };
        this.combos = ['combo1', 'combo2'];
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        const descontoDinheiro = 0.05;  // 5% de desconto em pagamento em dinheiro

        let valorTotal = 0;
        const itensNoCarrinho = {};

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        itens.forEach(item => {
            const [codigo, quantidade] = item.split(',');

            if (!this.cardapio[codigo]) {
                return "Item inválido!";
            }

            if (!itensNoCarrinho[codigo]) {
                itensNoCarrinho[codigo] = 0;
            }
            itensNoCarrinho[codigo] += parseInt(quantidade);

            if (this.itensPrincipais[codigo] && !this.combos.includes(codigo)) {
                this.itensPrincipais[codigo].forEach(extra => {
                    if (!itensNoCarrinho[extra]) {
                        return "Item extra não pode ser pedido sem o principal";
                    }
                });
            }

            valorTotal += this.cardapio[codigo] * quantidade;
        });

        if (formaDePagamento === 'dinheiro') {
            valorTotal *= (1 - descontoDinheiro);
        } else if (formaDePagamento === 'credito') {
            valorTotal *= 1.03; // Acréscimo de 3% em pagamento a crédito
        } else if (formaDePagamento !== 'debito') {
            return "Forma de pagamento inválida!";
        }

        if (valorTotal === 0) {
            return "Quantidade inválida!";
        }

        return `R$ ${valorTotal.toFixed(2)}`;
    }
}

const caixa = new CaixaDaLanchonete();

console.log(caixa.calcularValorDaCompra('dinheiro', ['chantily,1'])); // "Item extra não pode ser pedido sem o principal"
console.log(caixa.calcularValorDaCompra('dinheiro', ['pizza,1'])); // "Item inválido! OBS: A mensagem está aparecendo como "Quantidade Inváida!""
console.log(caixa.calcularValorDaCompra('dinheiro', ['cafe,1','chantily,1'])); // "R$ 4,27"
console.log(caixa.calcularValorDaCompra('credito', ['combo1,1','cafe,2'])); // "R$ 15,96"
console.log(caixa.calcularValorDaCompra('dinheiro', [])); // "Não há itens no carrinho de compra!"
console.log(caixa.calcularValorDaCompra('paypal', ['cafe,1'])); // "Forma de pagamento inválida!"

export { CaixaDaLanchonete };