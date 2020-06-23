import {driver, driverGetWithBasePath} from "./driver";
import {By, until} from "selenium-webdriver";

describe('Login validator', async () => {
    let elements;

    beforeAll(async () => {
        driverGetWithBasePath('/login');
        await driver.findElement(By.css("#username")).sendKeys('');
        await driver.findElement(By.css("#password")).sendKeys('');
        await driver.findElement(By.css("button[type=submit]")).click();
        await driver.wait(until.elementLocated(By.css(".ant-form-item-explain")));
        elements = await driver.findElements(By.css(".ant-form-item-explain"));
    })

    it('has two error notice', () => {
        expect(elements.length).toBe(2);
    });

    it('has first notice for username', async () => {
        expect(await elements[0].getText()).toBe("Vui lòng nhập tên tài khoản!");
    })

    it('has second notice for password', async () => {
        expect(await elements[0].getText()).toBe("Vui lòng nhập tên tài khoản!");
    })

    afterAll(() => {
       driver.quit();
    });
});
