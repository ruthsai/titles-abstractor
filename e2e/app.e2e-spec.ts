import { TitlesAbstractorPage } from './app.po';

describe('titles-abstractor App', () => {
  let page: TitlesAbstractorPage;

  beforeEach(() => {
    page = new TitlesAbstractorPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
