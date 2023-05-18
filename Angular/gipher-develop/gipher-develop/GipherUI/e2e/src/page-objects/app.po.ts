import { browser, by, element, ElementFinder, promise } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.tagName('app-root'));
  }

  isParagraphText(): promise.Promise<boolean> {
    return this.getParagraphText().isPresent();
  }


}
