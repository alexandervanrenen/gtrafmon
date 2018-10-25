const puppeteer = require('puppeteer');
const fs = require('fs');
const mkdirp = require('mkdirp');


(async () => {
    // Puppeteer magic
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.google.de/maps/dir/Boulderwelt+M%C3%BCnchen+West,+Bertha-Kipfm%C3%BCller-Stra%C3%9Fe,+Munich/Boulderwelt+M%C3%BCnchen+Ost,+Friedenstra%C3%9Fe+22a,+81671+M%C3%BCnchen/@48.1484046,11.4436562,12z/am=t/data=!4m14!4m13!1m5!1m1!1s0x479dd7e90b4e67cd:0xbfc9699469d1fe47!2m2!1d11.420385!2d48.13652!1m5!1m1!1s0x479ddf86475a875f:0x1fb8f80cc2e9a4bb!2m2!1d11.6089109!2d48.1277383!3e0');

    setTimeout(async () => {
        let html_body = await page.evaluate(() => document.body.innerHTML);

        // Logging
        let current_date = new Date().toISOString().split('T')[0];
        let current_time = new Date().toLocaleTimeString('en-US', {hour12: false, hour: "numeric", minute: "numeric"});
        let path = "log/" + current_date + "/";
        await mkdirp(path);
        await page.screenshot({path: path + current_time + ".png"});
        fs.appendFile(path + current_time + ".txt", html_body, function (err) {
            if (err) throw err;
        });

        // Extract useful info
        let travel_time = html_body.match(/[0-9]* [Mm]in/)[0].slice(0, -4);

        // Write to file
        let file_content = current_time + "\t" + travel_time + "\n";
        fs.appendFile(current_date, file_content, function (err) {
            if (err) throw err;
        });

        // Finish up
        await browser.close();
    }, 5000);
})();
