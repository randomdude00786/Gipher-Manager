import { browser, by, element, ElementFinder, promise } from 'protractor';

export class DashboardPage {
  navigateToDashBoard() {
    return browser.get('/dashboard');
  }
  getCurrentURL() {
    return browser.getCurrentUrl();
  }
  navigateToDashboardView() {
    return browser.get('/dashboard');
  }
  getDashboardComponent(): ElementFinder {
    return element(by.tagName('app-dashboard'));
  }
  getSearchInputBox(): ElementFinder {
    return element(by.css("input[formControlName=query]"));  
  }
  isSearchInputBoxPresent(): promise.Promise<boolean> {
    return this.getSearchInputBox().isPresent();
  }
  getSearchButton(): ElementFinder {
    return this.getDashboardComponent().element(by.buttonText('Search'));
  }
  isSearchButtonPresent(): promise.Promise<boolean> {
    return this.getSearchButton().isPresent();
  }
  clickSearchButton(): promise.Promise<void> {
    return this.getSearchButton().click();
  }
  getSearchInputBoxesDefaultValues(): any {
    let query;
    query = this.getSearchInputBox().getAttribute('value');
    return Promise.resolve(query).then( (values) => {
      return values;
    });
  }
  addSearchValues(): any {
    const query: any = "love";
    this.getSearchInputBox().sendKeys(query);
  }
  getGipherViewTab(): ElementFinder {
    return this.getDashboardComponent().element(by.id('md-tab-label-0-0'));
  }
  isGipherViewPresent(): promise.Promise<boolean> {
    return this.getGipherViewTab().isPresent();
  }
  getBookamrkViewTab(): ElementFinder {
    return this.getDashboardComponent().element(by.id('md-tab-label-0-1'));
  }
  isBookmarkViewPresent(): promise.Promise<boolean> {
    return this.getGipherViewTab().isPresent();
  }
  getFavouriteViewTab(): ElementFinder {
    return this.getDashboardComponent().element(by.id('md-tab-label-0-2'));
  }
  isFavouriteViewPresent(): promise.Promise<boolean> {
    return this.getGipherViewTab().isPresent();
  }
  
}
