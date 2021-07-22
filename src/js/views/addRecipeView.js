import View from './view.js';

class AddRecipeView extends View {
  _parentElem = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :D';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _openBtn = document.querySelector('.nav__btn--add-recipe');
  _closeBtn = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShow() {
    this._openBtn.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._closeBtn.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  //for getting the values out of form
  addHandlerUpload(handler) {
    this._parentElem.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)]; //this FormData will give the object of form element
      const data = Object.fromEntries(dataArr); //this fromEntries will convert the array into object
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
