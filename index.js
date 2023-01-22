const puppeteer = require('puppeteer');

(async () => {
    // Iniciando uma nova instância do navegador com modo headless desativado
    const browser = await puppeteer.launch({ headless: false }); 
    // criando uma nova página
    const page = await browser.newPage(); 
    // Navegando para a página de roleta
    await page.goto('https://casino.betfair.com/pt-br/c/roleta'); 

 // armazena os últimos 8 números
let lista = []; 
// números padrão de cavalo 2,5 e 8
const horseNumbers = [2, 5, 8, 12, 15, 18, 22, 25, 28, 32, 35]; 

// loop infinito
while (true) {
    for (let x = 0; x < 8; x++) {
        // pegando elementos com classe 'number'
        let elem = await page.$$('.number'); 
        // pegando o texto contido nesses elementos
        let elem2 = await page.evaluate(el => el.textContent, elem[elem.length - x - 1]); 
        // adicionando os números à lista
        lista.push(elem2); 
    }

    const checkHorse = (lista, horseNumbers) => {
        // se a lista não tiver 8 elementos, não faz nada
        if(lista.length < 8) return; 
        let match = false;
        // loop para verificar se os números padrão aparecem em sequência tripla na lista
        for (let i = 0; i < horseNumbers.length; i++) {
            if (lista.slice(-8).join('').indexOf(`${horseNumbers[i]}${horseNumbers[i]}${horseNumbers[i]}`) !== -1) {
                match = true;
            }
        }
        if (match) {
            alert("Padrão de cavalo encontrado: " + lista.slice(-8));
            // emitir alerta aqui
        }
    }
    // chamando a função checkHorse
    checkHorse(lista, horseNumbers); 
    // imprimindo os últimos 8 números
    console.log(lista.slice(-8)); 
    // limpando a lista
    lista = []; 
    // esperando 40 segundos antes de continuar o loop
    await page.waitForTimeout(40000); 
}
await browser.close(); 
})();