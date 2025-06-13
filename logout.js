require('dotenv').config()

const { chromium } = require('playwright');
const userId = process.env.USER_ID;
const passwd = process.env.PASSWD;

(async () => {
    try {
        console.log('Logging out: ', userId);
        const browser = await chromium.launch({ headless: true });

        const page = await browser.newPage();

        await page.goto(
            'https://hr-erp.shivnadarfoundation.org/Adrenalin/Login.aspx'
        );

        await page.fill('#txtID', userId);
        await page.fill('#txtPwd', passwd);

        await page.click('#lblLogin');
        await page.waitForURL(/\/MyZolog.aspx/);

        await page.waitForLoadState('networkidle');

        await page.click('.arrow-down');

        await page.once('dialog', async (dialog) => {
            await dialog.accept();
        });

        await page.click('#lnkSignOut');

        await browser.close();
        console.log('Logout successful.');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
