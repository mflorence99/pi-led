import { browser, element, by } from 'protractor';

export class PiLedPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('led-root h1')).getText();
  }
}
