const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://casino.betfair.com/pt-br/c/roleta');

    const sequenciasAnteriores = [[1,3,], [2,4,], [3,5],[4,6],[5,7],[6,8],[26,26],[36,35],[6,23,12]];
    let lista = [];

    while (true) {
        for (let x = 0; x < 8; x++) {
            let elem = await page.$$('.number');
            let elem2 = await page.evaluate(el => el.textContent, elem[elem.length - x - 1]);
            lista.push(elem2);
        }
    
        if (lista.slice(-8).toString() === sequenciasAnteriores.toString() || lista.slice(-8).reverse().toString() === sequenciasAnteriores.toString()) {
            console.log(`Sequencia repetida: ${lista.slice(-8)}`);
            // emitir alerta aqui
        } else {
            sequenciasAnteriores.push(lista.slice(-8));
        }
    
        console.log(lista.slice(-8));
        lista = [];


        await page.waitForTimeout(40000);
    }
    
    await browser.close();
})();
