import { PiLedPage } from './app.po';

describe('pi-led App', () => {
  let page: PiLedPage;

  beforeEach(() => {
    page = new PiLedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('led works!');
  });
});
