import View from './view.js';
import previewView from './previewView.js';

class ResultView extends View {
  _parentElem = document.querySelector('.results');
  _messagError = 'No recipes found for your query. Please try again!';
  _msg = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultView();
