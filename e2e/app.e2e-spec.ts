import { NodeManagerWebPage } from './app.po';

describe('node-manager-web App', () => {
  let page: NodeManagerWebPage;

  beforeEach(() => {
    page = new NodeManagerWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
