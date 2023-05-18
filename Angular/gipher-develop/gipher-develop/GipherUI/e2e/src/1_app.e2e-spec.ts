import { AppPage } from './page-objects/app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.isParagraphText()).toBeTruthy("should display welcome message");
  });
});
