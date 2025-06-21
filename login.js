require('dotenv').config();

const { chromium } = require('playwright');

const userId = process.env.USER_ID;
const passwd = process.env.PASSWD;

const today = new Date();

if (today.getDay() === 6) {
    if (Math.ceil(today.getDate() / 7) % 2 === 0) {
        console.log('Skipping script on even Saturday.');
        process.exit(0);
    }
}

(async () => {
    try {
        const browser = await chromium.launch({ headless: true });

        const page = await browser.newPage();

        await page.goto(
            'https://hr-erp.shivnadarfoundation.org/Adrenalin/Login.aspx'
        );

        await page.fill('#txtID', userId);
        await page.fill('#txtPwd', passwd);

        await page.click('#lblLogin');
        await page.waitForURL(/Attendance\/okcancel/);

        await page.click('#btnOK');

        await browser.close();

        console.log('Login successful!');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
