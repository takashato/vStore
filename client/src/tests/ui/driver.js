import 'chromedriver';
import {Builder} from 'selenium-webdriver';
import 'selenium-webdriver/chrome';
import {homepage} from '../../../package.json';

export const basePath = `http://localhost:3000${homepage}`;

export const driver = new Builder()
    .forBrowser('chrome')
    .build();

export const driverGetWithBasePath = (path) => driver.get(basePath + path);
