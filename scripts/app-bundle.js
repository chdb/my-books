define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = 'My-Books';
      config.map([{ route: ['', 'home'], name: 'home', moduleId: 'index' }, { route: 'books', name: 'books', moduleId: './resources/elements/books' }]);
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Index = exports.Index = function Index() {
    _classCallCheck(this, Index);
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources').plugin('aurelia-validation');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('renderers/bootstrap-form-renderer',['exports', 'aurelia-validation'], function (exports, _aureliaValidation) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BootstrapFormRenderer = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var BootstrapFormRenderer = exports.BootstrapFormRenderer = function () {
    function BootstrapFormRenderer() {
      _classCallCheck(this, BootstrapFormRenderer);
    }

    BootstrapFormRenderer.prototype.render = function render(instruction) {
      for (var _iterator = instruction.unrender, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref2 = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref2 = _i.value;
        }

        var _ref5 = _ref2;
        var result = _ref5.result,
            elements = _ref5.elements;

        for (var _iterator3 = elements, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
          var _ref6;

          if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref6 = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref6 = _i3.value;
          }

          var element = _ref6;

          this.remove(element, result);
        }
      }

      for (var _iterator2 = instruction.render, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref4 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref4 = _i2.value;
        }

        var _ref7 = _ref4;
        var result = _ref7.result,
            elements = _ref7.elements;

        for (var _iterator4 = elements, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
          var _ref8;

          if (_isArray4) {
            if (_i4 >= _iterator4.length) break;
            _ref8 = _iterator4[_i4++];
          } else {
            _i4 = _iterator4.next();
            if (_i4.done) break;
            _ref8 = _i4.value;
          }

          var _element = _ref8;

          this.add(_element, result);
        }
      }
    };

    BootstrapFormRenderer.prototype.add = function add(element, result) {
      if (result.valid) {
        return;
      }

      var formGroup = element.closest('.form-group');
      if (!formGroup) {
        return;
      }

      formGroup.classList.add('has-danger');

      var message = document.createElement('div');
      message.className = 'form-control-feedback mb-2 mr-sm-2 mb-sm-0';
      message.textContent = result.message;
      message.id = 'validation-message-' + result.id;

      element.classList.add('form-control-danger');

      formGroup.appendChild(message);
    };

    BootstrapFormRenderer.prototype.remove = function remove(element, result) {
      if (result.valid) {
        return;
      }

      var formGroup = element.closest('.form-group');
      if (!formGroup) {
        return;
      }

      var message = formGroup.querySelector('#validation-message-' + result.id);
      if (message) {
        formGroup.removeChild(message);

        if (formGroup.querySelectorAll('.help-block.validation-message').length === 0) {
          formGroup.classList.remove('has-danger');
          formGroup.classList.add('has-success');
          element.classList.add('form-control-success');
        }
      }
    };

    return BootstrapFormRenderer;
  }();
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('services/book-api',['exports', 'aurelia-fetch-client', 'aurelia-framework'], function (exports, _aureliaFetchClient, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.BookApi = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var BookApi = exports.BookApi = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
        function BookApi(http) {
            _classCallCheck(this, BookApi);

            this.http = http;
            this.simulatedLatency = 500;
        }

        BookApi.prototype.getBooks = function getBooks() {

            return this.http.fetch('books.json').then(function (response) {
                return response.json();
            }).then(function (books) {
                return books;
            });
        };

        BookApi.prototype.getShelves = function getShelves() {

            var shelves = ['Classics', 'Want to read', 'Research', 'For the kids'];

            return this.simulateFetch(shelves);
        };

        BookApi.prototype.getGenres = function getGenres() {

            var genres = [{ id: 1, name: 'Art' }, { id: 2, name: 'Autobiographies' }, { id: 3, name: 'Drama' }, { id: 4, name: 'Childrens' }, { id: 5, name: 'Fantasy' }, { id: 6, name: 'History' }, { id: 7, name: 'Mystery' }, { id: 8, name: 'Romance' }, { id: 9, name: 'Science' }, { id: 10, name: 'Science Fiction' }];

            return this.simulateFetch(genres);
        };

        BookApi.prototype.saveBook = function saveBook(book) {
            return this.simulateFetch(book);
        };

        BookApi.prototype.simulateFetch = function simulateFetch(fetchResult) {
            var _this = this;

            return new Promise(function (resolve) {
                setTimeout(function () {
                    resolve(fetchResult);
                }, _this.simulatedLatency);
            });
        };

        return BookApi;
    }()) || _class);
});
define('resources/attributes/tooltip',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.TooltipCustomAttribute = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2;

    var TooltipCustomAttribute = exports.TooltipCustomAttribute = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = (_class2 = function () {
        function TooltipCustomAttribute(element) {
            _classCallCheck(this, TooltipCustomAttribute);

            _initDefineProp(this, 'title', _descriptor, this);

            _initDefineProp(this, 'placement', _descriptor2, this);

            this.element = element;
        }

        TooltipCustomAttribute.prototype.attached = function attached() {
            $(this.element).tooltip({ title: this.title, placement: this.placement });
        };

        TooltipCustomAttribute.prototype.detached = function detached() {
            $(this.element).tooltip('dispose');
        };

        return TooltipCustomAttribute;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'title', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'placement', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('resources/elements/book-list',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BookList = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

  var BookList = exports.BookList = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function BookList(eventAggregator) {
    _classCallCheck(this, BookList);

    _initDefineProp(this, 'books', _descriptor, this);

    _initDefineProp(this, 'shelves', _descriptor2, this);

    _initDefineProp(this, 'genres', _descriptor3, this);

    this.eventAggregator = eventAggregator;
  }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'books', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'shelves', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'genres', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('resources/elements/book-stats',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BookStats = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _desc, _value, _class, _descriptor, _descriptor2;

  var BookStats = exports.BookStats = (_dec = (0, _aureliaFramework.computedFrom)('originalNumberOfBooks', 'books.length'), (_class = function () {
    function BookStats() {
      _classCallCheck(this, BookStats);

      _initDefineProp(this, 'books', _descriptor, this);

      _initDefineProp(this, 'originalNumberOfBooks', _descriptor2, this);
    }

    _createClass(BookStats, [{
      key: 'addedBooks',
      get: function get() {
        return this.books.length - this.originalNumberOfBooks;
      }
    }]);

    return BookStats;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'books', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'originalNumberOfBooks', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, 'addedBooks', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'addedBooks'), _class.prototype)), _class));
});
define('resources/elements/book',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Book = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

    var Book = exports.Book = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = (_class2 = function () {
        function Book(eventAggregator) {
            _classCallCheck(this, Book);

            _initDefineProp(this, 'book', _descriptor, this);

            _initDefineProp(this, 'genres', _descriptor2, this);

            _initDefineProp(this, 'shelves', _descriptor3, this);

            _initDefineProp(this, 'searchTerm', _descriptor4, this);

            this.eventAggregator = eventAggregator;
            this.editMode = false;
        }

        Book.prototype.markRead = function markRead() {
            this.book.readDate = new Date();
            this.book.read = true;
        };

        Book.prototype.removeBook = function removeBook() {
            this.eventAggregator.publish('book-removed', this.book);
        };

        Book.prototype.toggleEditMode = function toggleEditMode(event) {
            this.editMode = !this.editMode;
        };

        Book.prototype.bind = function bind() {
            this.subscribeToEvents();
        };

        Book.prototype.subscribeToEvents = function subscribeToEvents() {
            var _this = this;

            this.editModeChangedSubscription = this.eventAggregator.subscribe('edit-mode-changed', function (mode) {
                _this.editMode = mode;
            });
        };

        Book.prototype.unbind = function unbind() {
            this.editModeChangedSubscription.dispose();
        };

        return Book;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'book', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'genres', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'shelves', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'searchTerm', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('resources/elements/books',['exports', 'aurelia-framework', '../../services/book-api', 'aurelia-event-aggregator', 'lodash'], function (exports, _aureliaFramework, _bookApi, _aureliaEventAggregator, _lodash) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Books = undefined;

  var _lodash2 = _interopRequireDefault(_lodash);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  var _dec, _dec2, _class, _desc, _value, _class2;

  var Books = exports.Books = (_dec = (0, _aureliaFramework.inject)(_bookApi.BookApi, _aureliaEventAggregator.EventAggregator), _dec2 = (0, _aureliaFramework.computedFrom)('bookTitle.length'), _dec(_class = (_class2 = function () {
    function Books(bookApi, eventAggregator) {
      _classCallCheck(this, Books);

      this.bookTitle = "";
      this.books = [];
      this.bookApi = bookApi;
      this.eventAggregator = eventAggregator;
    }

    Books.prototype.bind = function bind() {
      this.loadBooks();
      this.loadGenres();
      this.loadShelves();
    };

    Books.prototype.loadGenres = function loadGenres() {
      var _this = this;

      this.bookApi.getGenres().then(function (genres) {
        _this.genres = genres;
      });
    };

    Books.prototype.loadShelves = function loadShelves() {
      var _this2 = this;

      this.bookApi.getShelves().then(function (shelves) {
        _this2.shelves = shelves;
      });
    };

    Books.prototype.addBook = function addBook() {
      this.books.push({ title: this.bookTitle });
      this.bookTitle = "";
    };

    Books.prototype.removeBook = function removeBook(toRemove) {

      var bookIndex = _lodash2.default.findIndex(this.books, function (book) {
        return book.Id === toRemove.Id;
      });

      this.books.splice(bookIndex, 1);
    };

    Books.prototype.attached = function attached() {
      this.subscribeToEvents();
    };

    Books.prototype.subscribeToEvents = function subscribeToEvents() {
      var _this3 = this;

      this.bookRemovedSubscription = this.eventAggregator.subscribe('book-removed', function (bookIndex) {
        return _this3.removeBook(bookIndex);
      });

      this.bookSavedSubscription = this.eventAggregator.subscribe('save-book', function (book) {
        return _this3.bookSaved(book);
      });
    };

    Books.prototype.bookSaved = function bookSaved(updatedBook) {
      var _this4 = this;

      this.bookApi.saveBook(updatedBook).then(function (savedBook) {
        var bookIndex = _lodash2.default.findIndex(_this4.books, function (book) {
          return book.Id === updatedBook.Id;
        });
        _this4.books[bookIndex] = updatedBook;
        _this4.eventAggregator.publish('book-save-complete-' + savedBook.Id);
      });
    };

    Books.prototype.loadBooks = function loadBooks() {
      var _this5 = this;

      this.bookApi.getBooks().then(function (savedBooks) {
        return _this5.books = savedBooks;
      });
    };

    Books.prototype.detached = function detached() {
      this.bookRemovedSubscription.dispose();
      this.bookSavedSubscription.dispose();
    };

    _createClass(Books, [{
      key: 'canAdd',
      get: function get() {
        return this.bookTitle.length === 0;
      }
    }]);

    return Books;
  }(), (_applyDecoratedDescriptor(_class2.prototype, 'canAdd', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'canAdd'), _class2.prototype)), _class2)) || _class);
});
define('resources/elements/edit-book',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../../renderers/bootstrap-form-renderer', 'aurelia-validation', 'lodash'], function (exports, _aureliaFramework, _aureliaEventAggregator, _bootstrapFormRenderer, _aureliaValidation, _lodash) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Book = exports.EditBook = undefined;

    var _lodash2 = _interopRequireDefault(_lodash);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

    var EditBook = exports.EditBook = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _aureliaFramework.NewInstance.of(_aureliaValidation.ValidationController)), _dec2 = (0, _aureliaFramework.computedFrom)('temporaryBook.title', 'temporaryBook.description', 'temporaryBook.rating', 'temporaryBook.ownACopy', 'temporaryBook.genre', 'saved', 'temporaryBook.shelves', 'temporaryBook.timesRead'), _dec(_class = (_class2 = function () {
        function EditBook(eventAggregator, controller) {
            var _this = this;

            _classCallCheck(this, EditBook);

            _initDefineProp(this, 'editMode', _descriptor, this);

            _initDefineProp(this, 'book', _descriptor2, this);

            _initDefineProp(this, 'selectedGenre', _descriptor3, this);

            _initDefineProp(this, 'genres', _descriptor4, this);

            _initDefineProp(this, 'shelves', _descriptor5, this);

            this.temporaryBook = new Book();


            this.controller = controller;
            this.controller.addRenderer(new _bootstrapFormRenderer.BootstrapFormRenderer());
            this.eventAggregator = eventAggregator;
            this.ratingChangedListener = function (e) {
                return _this.temporaryBook.rating = e.rating;
            };
            this.editingShelves = false;
            this.saved = false;
        }

        EditBook.prototype.bind = function bind() {
            var _this2 = this;

            this.resetTempBook();
            this.ratingElement.addEventListener("change", this.ratingChangedListener);
            this.selectedShelves = this.shelves.filter(function (shelf) {
                return _this2.temporaryBook.shelves.indexOf(shelf) !== -1;
            });
            this.selectedGenre = this.genres.find(function (g) {
                return g.id == _this2.book.genre;
            });
        };

        EditBook.prototype.selectedGenreChanged = function selectedGenreChanged(newValue, oldValue) {
            if (!newValue) return;
            this.temporaryBook.genre = newValue.id;
        };

        EditBook.prototype.attached = function attached() {
            var _this3 = this;

            this.bookSaveCompleteSubscription = this.eventAggregator.subscribe('book-save-complete-' + this.book.Id, function () {
                return _this3.bookSaveComplete();
            });
        };

        EditBook.prototype.editModeChanged = function editModeChanged(editModeNew, editModeOld) {
            if (editModeNew) this.resetTempBook();
        };

        EditBook.prototype.isDirty = function isDirty() {
            var _this4 = this;

            var differences = [];
            _lodash2.default.forOwn(this.temporaryBook, function (value, key) {
                return differences.push({ different: _this4.book[key] != value, key: key });
            });

            return differences.filter(function (d) {
                return d.different;
            }).length > 0;
        };

        EditBook.prototype.resetTempBook = function resetTempBook() {
            Object.assign(this.temporaryBook, this.book);
        };

        EditBook.prototype.cancel = function cancel() {
            var book = Object.assign(new Book(), this.book);
            this.temporaryBook = book;
            this.starRatingViewModel.applyRating(this.temporaryBook.rating);
            this.toggleEditMode();
        };

        EditBook.prototype.save = function save() {
            var _this5 = this;

            this.controller.validate().then(function (result) {
                if (result.valid) {
                    _this5.loading = true;
                    _this5.publishBookSavedEvent();
                }
            });
        };

        EditBook.prototype.toggleEditShelves = function toggleEditShelves() {
            this.editingShelves = !this.editingShelves;
        };

        EditBook.prototype.unToggleEditShelves = function unToggleEditShelves() {
            this.temporaryBook.shelves = this.selectedShelves;
            this.editingShelves = !this.editingShelves;
        };

        EditBook.prototype.bookSaveComplete = function bookSaveComplete() {
            var _this6 = this;

            this.loading = false;
            this.saved = true;
            Object.assign(this.book, this.temporaryBook);

            setTimeout(function () {
                _this6.saved = false;
                _this6.toggleEditMode();
            }, 500);
        };

        EditBook.prototype.publishBookSavedEvent = function publishBookSavedEvent() {
            this.eventAggregator.publish('save-book', this.temporaryBook);
        };

        EditBook.prototype.toggleEditMode = function toggleEditMode() {
            this.saved = false;
            this.eventAggregator.publish('edit-mode-changed', !this.editMode);
        };

        EditBook.prototype.detached = function detached() {
            this.ratingElement.removeEventListener('change', this.ratingChangedListener);
            this.bookSaveCompleteSubscription.dispose();
        };

        _createClass(EditBook, [{
            key: 'canSave',
            get: function get() {
                if (!this.temporaryBook.Id) return false;

                return this.isDirty();
            }
        }]);

        return EditBook;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'editMode', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'book', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'selectedGenre', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'genres', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'shelves', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _applyDecoratedDescriptor(_class2.prototype, 'canSave', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'canSave'), _class2.prototype)), _class2)) || _class);

    var Book = exports.Book = function Book() {
        _classCallCheck(this, Book);

        this.title = '';
        this.description = '';
        this.timesRead = 0;
    };

    _aureliaValidation.ValidationRules.customRule('positiveInteger', function (value, obj) {
        return value === null || value === undefined || Number.isInteger(value) || value >= 0;
    }, 'Books can only be read 0 or more times.');

    _aureliaValidation.ValidationRules.ensure(function (a) {
        return a.title;
    }).required().ensure('timesRead').required().satisfiesRule('positiveInteger').on(Book);
});
define('resources/elements/star-rating',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.StarRating = undefined;

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var StarRating = exports.StarRating = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = (_class2 = function () {
        function StarRating(element) {
            _classCallCheck(this, StarRating);

            _initDefineProp(this, 'rating', _descriptor, this);

            this.element = element;
            this.stars = [{ type: '-o', displayType: '-o', rated: false }, { type: '-o', displayType: '-o', rated: false }, { type: '-o', displayType: '-o', rated: false }, { type: '-o', displayType: '-o', rated: false }, { type: '-o', displayType: '-o', rated: false }];

            this.hovered = false;
        }

        StarRating.prototype.bind = function bind() {
            this.applyRating(this.rating);
        };

        StarRating.prototype.applyRating = function applyRating(rating) {
            var _this = this;

            this.stars.forEach(function (star, index) {
                return _this.rateStar(star, rating, index);
            });
        };

        StarRating.prototype.rateStar = function rateStar(star, rating, index) {

            if (index < rating) this.toggleOn(star);else {
                this.toggleOff(star);
            }
        };

        StarRating.prototype.toggleOn = function toggleOn(star) {
            star.displayType = '';
            star.type = '';
            star.rated = true;
        };

        StarRating.prototype.toggleOff = function toggleOff(star) {
            star.displayType = '-o';
            star.type = '-o';
            star.rated = false;
        };

        StarRating.prototype.ratingFromIndex = function ratingFromIndex(index, star) {

            if (index === 0 && star.rated) return 0;

            return index + 1;
        };

        StarRating.prototype.rate = function rate(index) {

            var rating = this.ratingFromIndex(index, this.stars[0]);

            this.rating = rating;

            this.applyRating(rating);

            this.raiseChangedEvent();
        };

        StarRating.prototype.mouseOut = function mouseOut(hoverIndex) {

            if (!this.hovered) return;

            this.hovered = false;

            this.applyHoverState(hoverIndex);
        };

        StarRating.prototype.applyHoverState = function applyHoverState(hoverIndex) {
            var _this2 = this;

            this.stars.forEach(function (star, index) {
                if (!_this2.shouldApplyHover(index, hoverIndex, star)) return;

                if (_this2.hovered) {
                    _this2.toggleDisplayOn(star);
                } else {
                    _this2.toggleDisplayOff(star);
                }
            });
        };

        StarRating.prototype.mouseOver = function mouseOver(hoverIndex) {
            if (this.hovered) return;

            this.hovered = true;

            this.applyHoverState(hoverIndex);
        };

        StarRating.prototype.toggleDisplayOff = function toggleDisplayOff(star) {
            star.displayType = star.type;
        };

        StarRating.prototype.toggleDisplayOn = function toggleDisplayOn(star) {
            star.displayType = '';
        };

        StarRating.prototype.shouldApplyHover = function shouldApplyHover(starIndex, hoverIndex, star) {
            return starIndex <= hoverIndex && !star.rated;
        };

        StarRating.prototype.raiseChangedEvent = function raiseChangedEvent() {
            var changeEvent = new CustomEvent('change', { rating: this.rating });

            this.element.dispatchEvent(changeEvent);
        };

        return StarRating;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'rating', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('resources/value-converters/book-status',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var BookStatusValueConverter = exports.BookStatusValueConverter = function () {
        function BookStatusValueConverter() {
            _classCallCheck(this, BookStatusValueConverter);
        }

        BookStatusValueConverter.prototype.toView = function toView(value) {

            switch (value) {
                case 'bad':
                    return 'fa-frown-o';
                case 'good':
                    return 'fa-smile-o';
                case 'ok':
                    return 'fa-meh-o';
            }
        };

        return BookStatusValueConverter;
    }();
});
define('resources/value-converters/date-format',['exports', 'moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DateFormatValueConverter = undefined;

  var _moment2 = _interopRequireDefault(_moment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DateFormatValueConverter = exports.DateFormatValueConverter = function () {
    function DateFormatValueConverter() {
      _classCallCheck(this, DateFormatValueConverter);
    }

    DateFormatValueConverter.prototype.toView = function toView(value) {
      if (!value) return '';

      return (0, _moment2.default)(value).format('MM/DD/YYYY h:mm:ss a');
    };

    return DateFormatValueConverter;
  }();
});
define('resources/value-converters/filter',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var FilterValueConverter = exports.FilterValueConverter = function () {
    function FilterValueConverter() {
      _classCallCheck(this, FilterValueConverter);
    }

    FilterValueConverter.prototype.toView = function toView(array, searchTerm) {
      var _this = this;

      return array.filter(function (item) {
        return searchTerm && searchTerm.length > 0 ? _this.itemMaches(searchTerm, item) : true;
      });
    };

    FilterValueConverter.prototype.itemMaches = function itemMaches(searchTerm, value) {
      var itemValue = value.title;

      if (!itemValue) return false;

      return itemValue.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1;
    };

    return FilterValueConverter;
  }();
});
define('resources/value-converters/highlight',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var HighlightValueConverter = exports.HighlightValueConverter = function () {
        function HighlightValueConverter() {
            _classCallCheck(this, HighlightValueConverter);
        }

        HighlightValueConverter.prototype.toView = function toView(value) {
            if (value && value.indexOf("<b>") !== -1) {
                return "<span style='background-color:#eceeef; padding:10px'>" + value + "</span>";
            }
            return value;
        };

        return HighlightValueConverter;
    }();
});
define('resources/value-converters/search-bold',['exports'], function (exports) {
   'use strict';

   Object.defineProperty(exports, "__esModule", {
      value: true
   });

   function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
         throw new TypeError("Cannot call a class as a function");
      }
   }

   var SearchBoldValueConverter = exports.SearchBoldValueConverter = function () {
      function SearchBoldValueConverter() {
         _classCallCheck(this, SearchBoldValueConverter);
      }

      SearchBoldValueConverter.prototype.toView = function toView(value, searchTerm) {
         if (!searchTerm) return value;
         return value.replace(new RegExp(searchTerm, 'gi'), '<b>$&</b>');
      };

      return SearchBoldValueConverter;
   }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"font-awesome.css\"></require><require from=\"styles.css\"></require><div class=\"container\"><div class=\"header clearfix\"><h3 class=\"text-muted\"><span class=\"brand-highlight\">my </span>books</h3></div><router-view></router-view><footer class=\"footer\"><p>&copy; Aurelia Demo 2017</p></footer></div></template>"; });
define('text!styles.css', ['module'], function(module) { module.exports = "/***********************************************************************************************************/\n/** Bootstrap theme specific CSS - Reference https://v4-alpha.getbootstrap.com/examples/narrow-jumbotron/ **/\n/***********************************************************************************************************/\n\n/* Space out content a bit */\nbody {\n  padding-top: 1.5rem;\n  padding-bottom: 1.5rem;\n}\n\n/* Everything but the jumbotron gets side spacing for mobile first views */\n.header,\n.footer {\n  padding-right: 1rem;\n  padding-left: 1rem;\n}\n\n/* Custom page header */\n.header {\n  padding-bottom: 1rem;\n  border-bottom: .05rem solid #e5e5e5;\n}\n\n/* Make the masthead heading the same height as the navigation */\n.header h3 {\n  margin-top: 0;\n  margin-bottom: 0;\n  line-height: 3rem;\n}\n\n/* Custom page footer */\n.footer {\n  padding-top: 1.5rem;\n  color: #777;\n  border-top: .05rem solid #e5e5e5;\n}\n\n.container-narrow > hr {\n  margin: 2rem 0;\n}\n\n.jumbotron {\n  text-align: center;\n  border-bottom: .05rem solid #e5e5e5;\n}\n\n.jumbotron .btn {\n  padding: .75rem 1.5rem;\n  font-size: 1.5rem;\n}\n\n\n/* Responsive: Portrait tablets and up */\n@media screen and (min-width: 48em) {\n  /* Remove the padding we set earlier */\n  .header,\n  .footer {\n    padding-right: 0;\n    padding-left: 0;\n  }\n  /* Space out the masthead */\n  .header {\n    margin-bottom: 2rem;\n  }\n  /* Remove the bottom border on the jumbotron for visual effect */\n  .jumbotron {\n    border-bottom: 0;\n  }\n}\n\n/***********************************************************************************************************/\n/** End Bootstrap theme specific CSS                                                                      **/\n/***********************************************************************************************************/\n\n/***********************************************************************************************************/\n/** Custom my-books CSS **/\n/***********************************************************************************************************/\nbody{\n  background-color:#f5f8fa;\n}\n\n/* Add box-shadow to jumbotron */\n.jumbotron{\n  background-color:white;\n  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);\n}\n\n/* Add brand highlight color (theme) */\n.brand-highlight{\n  color:#2ecc71;\n}\n\n/* Add nav bar brand highlight color (theme) */\n.nav-pills .nav-item.show .nav-link, .nav-pills .nav-link.active {\n    color: #fff;\n    background-color: #27ae60;\n}\n\n/* Add brand button-success color (theme) */\n.btn-success{\n    background-color: #27ae60;\n}\n\n.btn-success:hover {\n    background-color: #2ecc71;\n}\n\n.btn-success:disabled{\n  background-color: #43bd99;\n}\n\n.btn-outline-success {\n    color: #27ae60;\n    border-color: #27ae60;\n}\n\n.btn-outline-success:hover{\n    color: white;\n    border-color: #27ae60;\n    background-color: #27ae60;\n}\n\n.cancel{\n  color:#d9534f;\n}\n\n.tap-right{\n  margin-left:10px;\n}\n\n.page-heading{\n  border-bottom: 2px solid #2ecc71;\n}\n\n/** Hover style button for font-awesome icons **/\n.icon-button{\n  color: rgba(70, 74, 76, 0.78);\n}\n\n.icon-button, .icon-button:hover{\n  padding-left: 10px;\n  padding-right: 10px;\n  padding-top: 5px;\n  padding-bottom: 5px;\n}\n\n.icon-button:hover{\n    background-color: #eceeef;\n    cursor: pointer;\n    color: #292b2c;\n}\n\n/** Hide some content until we receive a hover event **/\n.hover-display{\n  display:none;\n}\n\n/** Read button state changes **/\n.read-button:hover, .edit-button:hover{\n  cursor:pointer;\n}\n\n.read-button:hover span.hover-display{\n  display:initial;\n}\n\n.read-button:disabled span.hover-display{\n  display:none;\n}\n\n/** Book list styles **/\nli.read-book{\n  border-left: 3px solid #2ecc71 !important;\n}\n\n.book-even{\n  background-color: #eceeef;;\n}\n\n/** Animations **/\n\n.books>li.au-enter {\n    opacity: 0!important;\n}\n\n.books>li.au-enter-active {\n    -webkit-animation: fadeIn 2s;\n    animation: fadeIn 2s;\n}\n\n.books>li.au-leave-active {\n    -webkit-animation: fadeOut 0.5s;\n    animation: fadeOut 0.5s;\n}\n\n@-webkit-keyframes fadeIn {\n    0%   { opacity: 0; }\n    100% { opacity: 1; }\n}\n\n@keyframes fadeIn {\n    0%   { opacity: 0; }\n    100% { opacity: 1; }\n}\n\n@-webkit-keyframes fadeOut {\n    0%   { opacity: 1; }\n    100% { opacity: 0; }\n}\n\n@keyframes fadeOut {\n    0%   { opacity: 1; }\n    100% { opacity: 0; }\n}\n\n.transformable {\n    -webkit-transition: height 100ms linear;\n    -moz-transition: height 100ms linear;\n    -o-transition: height 100ms linear;\n    -ms-transition: height 100ms linear;\n    transition: height 100ms linear;\n}\n\n/** End Animations **/\n\n/** edit-book panel styles **/\n.edit-book.hidden{\n  height: 0px;\n}\n\n.edit-book.hidden div.wrapper{\n  display: none;\n}\n\n.edit-book.visible{\n  height: 490px;\n  background-color: #f7f7f9;\n  padding-left: 40px;\n  padding-right: 40px;\n  padding-top: 20px;\n  margin-top: 15px;\n  margin-bottom: 15px;\n  border-top: 2px solid #ccc;\n}\n\n/** ratings component **/\nul.ratings li{\n  display: inline;\n  list-style-type: none;\n  padding-right: 20px;\n}\n\n.star:hover{\n  cursor: pointer;\n  font-weight: bold;\n}\n\n.star.rated{\n  color:rgb(255, 204, 0);\n\n}\n\n.padded{\n  margin-right:3px;\n}\n\ninput.number{\n  max-width: 60px;\n}\n\n@media only screen and (max-width: 1200px)  {\n  .edit-book.visible{\n    height: 550px;\n  }\n}\n\n@media only screen and (max-width: 750px)  {\n  .edit-book.visible{\n    height: 650px;\n  }\n}\n\n@media only screen and (max-width: 550px)  {\n  .edit-book.visible{\n    height: 850px;\n  }\n}\n.badge-default {\n    background-color: rgba(70, 74, 76, 0.59);\n}\n/** Add subtle shadow to elements - Reference Materialize CSS - http://materializecss.com/shadow.html **/\n.z-depth-1 {\n    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2);\n}\n"; });
define('text!index.html', ['module'], function(module) { module.exports = "<template><div class=\"jumbotron\"><h1 class=\"display-3\"><span class=\"brand-highlight\">my</span> Books</h1><p class=\"lead\">My-Books allows you to keep track of the books you've read by adding and rating them as you read.</p><a route-href=\"route: books;\">my books</a></div><div class=\"row\"><div class=\"col-lg-12\"><p></p></div></div></template>"; });
define('text!resources/elements/book-list.html', ['module'], function(module) { module.exports = "<template><require from=\"../attributes/tooltip\"></require><require from=\"./book\"></require><require from=\"../value-converters/filter\"></require><div class=\"card\"><div class=\"card-header form-inline\"><div class=\"input-group\"><span class=\"input-group-addon\" id=\"filter-icon\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i></span> <input type=\"text\" class=\"form-control\" placeholder=\"filter\" aria-describedby=\"filter-icon\" value.bind=\"searchTerm\"></div></div><ul class=\"books list-group list-group-flush\"><book containerless repeat.for=\"book of books | filter:searchTerm\" book.bind=\"book\" shelves.bind=\"shelves\" genres.bind=\"genres\" search-term.bind=\"searchTerm\"></book></ul></div></template>"; });
define('text!resources/elements/book-stats.html', ['module'], function(module) { module.exports = "<template><div class=\"card text-center\"><div class=\"card-block\"><p class=\"card-text\"><span show.bind=\"addedBooks\" class=\"badge badge-primary\">new books ${addedBooks}</span></p></div><div class=\"card-footer text-muted\">Book Stats</div></div></template>"; });
define('text!resources/elements/book.html', ['module'], function(module) { module.exports = "<template><require from=\"./edit-book\"></require><require from=\"../value-converters/book-status\"></require><require from=\"../attributes/tooltip\"></require><require from=\"../value-converters/search-bold\"></require><require from=\"../value-converters/highlight\"></require><li class=\"${book.read ? 'read-book' : ''} list-group-item au-animate\" anim-enter=\"slideRightBigIn;{duration:2000}\"><div class=\"book col-12\"><div class=\"book-options form-inline\"><div class=\"col-lg-7 col-md-2\" innerhtml.bind=\"book.title | searchBold:searchTerm | highlight\"></div><div class=\"col-lg-3 col-md-5\"><button class=\"read-button btn btn-success btn-sm\" if.bind=\"!book.read\" click.delegate=\"markRead()\"><span class=\"hover-display\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i> </span>mark read</button> <button class=\"btn btn-secondary btn-sm edit-button\" click.delegate=\"toggleEditMode()\" disabled.bind=\"editMode\">edit</button></div><span class=\"col-1\"><i class=\"fa ${book.status | bookStatus}\" aria-hidden=\"true\"></i></span><div class=\"col-1\"><span class=\"icon-button\" click.delegate=\"removeBook()\" tooltip=\"title.bind:'Remove book from list'; placement.bind:'right'\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></div></div><edit-book book.bind=\"book\" genres.bind=\"genres\" shelves.bind=\"shelves\" containerless edit-mode.bind=\"editMode\"></edit-book></div></li></template>"; });
define('text!resources/elements/books.html', ['module'], function(module) { module.exports = "<template><require from=\"./book-list\"></require><require from=\"./heading.html\"></require><heading text.bind=\"'books'\"></heading><div class=\"card\"><div class=\"card-block\"><form class=\"form-inline\" submit.trigger=\"addBook()\"><label for=\"book-title\"></label><input class=\"form-control\" value.bind=\"bookTitle\" id=\"book-title\" type=\"text\"> <input class=\"btn btn-success tap-right\" type=\"submit\" value=\"add\" disabled.one-way=\"canAdd\"></form></div></div><hr><book-list if.bind=\"books.length > 0 \n                     && genres.length > 0 \n                     && shelves.length > 0\" shelves.bind=\"shelves\" genres.bind=\"genres\" books.bind=\"books\"></book-list></template>"; });
define('text!resources/elements/edit-book.html', ['module'], function(module) { module.exports = "<template><require from=\"./star-rating\"></require><require from=\"../attributes/tooltip\"></require><require from=\"../value-converters/date-format\"></require><div ref=\"editFormDiv\" class=\"edit-book ${editMode ? 'visible': 'hidden'} transformable\"><div class=\"wrapper\"><div class=\"row\"><span class=\"col-3 offset-md-10\"><small class=\"text-muted\">${book.readDate | dateFormat}</small></span></div><form><div class=\"form-group row\"><label for=\"title\">Title</label><input type=\"text\" class=\"form-control\" id=\"title\" value.bind=\"temporaryBook.title & validate\" placeholder=\"book title\"></div><div class=\"form-group row\"><label for=\"description\">Description</label><textarea class=\"form-control\" id=\"description\" value.bind=\"temporaryBook.description\" placeholder=\"book description\"></textarea></div><hr><div class=\"form-inline row\"><div class=\"form-group\"><label for=\"genre\" class=\"mb-2 mr-sm-2 mb-sm-0\">Genre</label><select name=\"genre\" class=\"form-control mb-2 mr-sm-2 mb-sm-0\" value.bind=\"selectedGenre\"><option model.bind=\"null\">select genre...</option><option repeat.for=\"genre of genres\" model.bind=\"genre\">${genre.name}</option></select></div><star-rating view-model.ref=\"starRatingViewModel\" ref=\"ratingElement\" rating.bind=\"temporaryBook.rating\"></star-rating></div><hr><div class=\"form-inline row\"><div class=\"form-check mb-2 mr-sm-2 mb-sm-0\"><label class=\"form-check-label\"><input class=\"form-check-input\" type=\"checkbox\" checked.bind=\"temporaryBook.ownACopy\"> Own a copy?</label></div><div class=\"form-group\"><label for=\"times-read\" class=\"mb-2 mr-sm-2 mb-sm-0\">Times Read</label><input name=\"times-read\" class=\"form-control number mb-2 mr-sm-2 mb-sm-0\" placeholder=\"0\" value.bind=\"temporaryBook.timesRead & validate\"></div><div class=\"form-group\"><label for=\"shelves\" class=\"mb-2 mr-sm-2 mb-sm-0\">Shelves</label><select show.bind=\"editingShelves\" name=\"shelves\" class=\"form-control mb-1 mr-sm-1 mb-sm-0\" multiple=\"multiple\" value.bind=\"temporaryBook.shelves\"><option repeat.for=\"shelf of shelves\" value.bind=\"shelf\">${shelf}</option></select><button show.bind=\"editingShelves\" click.delegate=\"unToggleEditShelves()\" class=\"btn btn-secondary btn-sm\">ok</button><div class=\"mb-2 mr-sm-2 mb-sm-0\" show.bind=\"!editingShelves\"><span repeat.for=\"shelf of temporaryBook.shelves\" class=\"badge badge-pill badge-default mb-2 mr-sm-2 mb-sm-0\">${shelf}</span> <span class=\"icon-button\" click.delegate=\"toggleEditShelves()\" tooltip=\"title.bind:'edit shelves'; placement.bind:'right'\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></span></div></div></div><hr><div class=\"form-inline col-3 offset-lg-10 col-sm-12\"><div class=\"custom-control\" show.bind=\"loading\"><i class=\"fa fa-spinner fa-pulse fa-fw\"></i> <span class=\"sr-only\">Loading...</span></div><div class=\"custom-control brand-highlight\" show.bind=\"saved\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i></div><button class=\"btn btn-secondary btn-sm padded\" click.delegate=\"save()\" disabled.bind=\"!canSave\">save</button> <button class=\"btn btn-secondary btn-sm\" click.delegate=\"cancel()\"><span class=\"cancel\"><i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i> </span>cancel</button></div></form></div></div></template>"; });
define('text!resources/elements/heading.html', ['module'], function(module) { module.exports = "<template bindable=\"text\"><h1 class=\"page-heading\">${text}</h1></template>"; });
define('text!resources/elements/loader.html', ['module'], function(module) { module.exports = "<template bindable=\"loading\"><div class=\"custom-control\" show.bind=\"loading\"><i class=\"fa fa-spinner fa-pulse fa-fw\"></i> <span class=\"sr-only\">Loading...</span></div></template>"; });
define('text!resources/elements/star-rating.html', ['module'], function(module) { module.exports = "<template><ul class=\"ratings\"><li repeat.for=\"star of stars\" click.delegate=\"rate($index)\" mouseover.delegate=\"mouseOver($index) & debounce:100\" mouseout.delegate=\"mouseOut($index)   & debounce:100\"><span class=\"star ${star.displayType === '' ? 'rated' : ''}\"><i class=\"fa fa-star${star.displayType}\" aria-hidden=\"true\"></i></span></li></ul></template>"; });
//# sourceMappingURL=app-bundle.js.map