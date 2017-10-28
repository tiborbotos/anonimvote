import { AnonimvotePage } from './app.po';

describe('anonymvote App', () => {
  let page: AnonimvotePage;

  beforeEach(() => {
    page = new AnonimvotePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
