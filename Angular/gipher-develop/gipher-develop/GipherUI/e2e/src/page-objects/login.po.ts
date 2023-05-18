import { browser, by, element, ElementFinder, promise } from 'protractor';

export class LoginPage {
  navigateToLogin() {
    return browser.get('/login');
  }
  getCurrentURL() {
    return browser.getCurrentUrl();
  }
  navigateToDashboardView() {
    return browser.get('/dashboard');
  }
  getloginComponent(): ElementFinder {
    return element(by.tagName('app-login'));
  }
  getUserNameInputBox(): ElementFinder {
    return element(by.css("input[formControlName=userId]"));  
  }
  isUserNameInputBoxPresent(): promise.Promise<boolean> {
    return this.getUserNameInputBox().isPresent();
  }
  getPasswordInputBox(): ElementFinder {
    return element(by.css("input[formControlName=userPassword]"));
  }
  isPasswordInputBoxPresent(): promise.Promise<boolean> {
    return this.getPasswordInputBox().isPresent();
  }
  getLoginButton(): ElementFinder {
    return this.getloginComponent().element(by.buttonText('Login'));
  }
  isLoginButtonPresent(): promise.Promise<boolean> {
    return this.getLoginButton().isPresent();
  }
  clickLoginButton(): promise.Promise<void> {
    return this.getLoginButton().click();
  }
  getLoginInputBoxesDefaultValues(): any {
    let inputUsername, inputPassword;
    inputUsername = this.getUserNameInputBox().getAttribute('value');
    inputPassword = this.getPasswordInputBox().getAttribute('value');
    return Promise.all([inputUsername, inputPassword]).then( (values) => {
      return values;
    });
  }
  getMockLoginDetail(): string {
    const loginDetail: any = { userId: 'singh', userPassword : 'airtel'};
    return loginDetail;
  }
  addLoginValues(): any {
    const login: any = this.getMockLoginDetail();
    this.getUserNameInputBox().sendKeys(login.userId);
    this.getPasswordInputBox().sendKeys(login.userPassword);
    return Object.keys(login).map(key => login[key]);
  }
}
