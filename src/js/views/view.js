//parent class for view

import icons from 'url:../../img/icons.svg';
export default class View {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const renderData = this._generateMarkup();

    if (!render) return renderData;
    this._clear();
    this._parentElem.insertAdjacentHTML('afterbegin', renderData);
  }

  update(data) {
    this._data = data;
    const renderData = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(renderData);
    const newElement = Array.from(newDOM.querySelectorAll('*'));
    const currElement = Array.from(this._parentElem.querySelectorAll('*'));

    newElement.forEach((newEl, index) => {
      const curEl = currElement[index];

      //updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      //updated chenged attributes
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
    });
  }

  _clear() {
    this._parentElem.innerHTML = '';
  }

  //showing loading spinner
  renderSpinner = function () {
    const markup = `<div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>
</div>`;
    this._clear();
    this._parentElem.insertAdjacentHTML('afterbegin', markup);
  };

  renderError(message = this._messagError) {
    const markup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div> `;
    this._clear();
    this._parentElem.insertAdjacentHTML('afterbegin', markup);
  }

  renderMsg(message = this._msg) {
    const markup = `<div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div> `;
    this._clear();
    this._parentElem.insertAdjacentHTML('afterbegin', markup);
  }
}
