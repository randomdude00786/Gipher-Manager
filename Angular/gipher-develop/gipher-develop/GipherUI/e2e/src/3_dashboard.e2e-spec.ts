import { DashboardPage } from './page-objects/dashboard.po';

describe('dashboard page', () => {
  let page: DashboardPage;

  beforeEach(() => {
    page = new DashboardPage();
  });

  
  it('should get search input box', () => {
    page.navigateToDashBoard();
    expect(page.isSearchInputBoxPresent())
    .toBeTruthy(`<input class="search" [formControl]='query'> should exist in dashboard.component.html`);
  });

  it('should get search button', () => {
    page.navigateToDashBoard();
    expect(page.isSearchButtonPresent())
    .toBeTruthy(`<button type="submit" [disabled]="!searchForm.valid" mat-button>Search</button>`);
  });

  it('should gipher view be rendered', () => {
    page.navigateToDashBoard();
    page.addSearchValues();
    page.clickSearchButton();
    expect(page.isGipherViewPresent());
  });

  it('should bookmark view be rendered', () => {
    page.navigateToDashBoard();
    page.addSearchValues();
    page.clickSearchButton();
    expect(page.isBookmarkViewPresent());
  });

  it('should favourite view be rendered', () => {
    page.navigateToDashBoard();
    page.addSearchValues();
    page.clickSearchButton();
    expect(page.isFavouriteViewPresent());
  });

});
