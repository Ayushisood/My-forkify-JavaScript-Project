import View from './view.js';
import previewView from './previewView.js';

class BookmarkView extends View {
  _parentElem = document.querySelector('.bookmarks__list');
  _messagError = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _msg = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarkView();
