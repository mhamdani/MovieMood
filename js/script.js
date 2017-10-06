function toDecimal(ratio) {
    var decimal = Number(ratio),
        numbers;

    if (!decimal) {
        numbers = ratio.match(/^(\d+)\s*\/\s*(\d+)$/);
        decimal = numbers[1] / numbers[2];
    }

    return decimal;
}

function toDpi(resolution) {
    var value = parseFloat(resolution),
        units = String(resolution).match(RE_RESOLUTION_UNIT)[1];

    switch (units) {
        case 'dpcm': return value / 2.54;
        case 'dppx': return value * 96;
        default    : return value;
    }
}

function toPx(length) {
    var value = parseFloat(length),
        units = String(length).match(RE_LENGTH_UNIT)[1];

    switch (units) {
        case 'em' : return value * 16;
        case 'rem': return value * 16;
        case 'cm' : return value * 96 / 2.54;
        case 'mm' : return value * 96 / 2.54 / 10;
        case 'in' : return value * 96;
        case 'pt' : return value * 72;
        case 'pc' : return value * 72 / 12;
        default   : return value;
    }
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

'use strict';

var staticMatch = __webpack_require__(10).match;
var dynamicMatch = typeof window !== 'undefined' ? window.matchMedia : null;

// our fake MediaQueryList
function Mql(query, values){
  var self = this;
  if(dynamicMatch){
    var mql = dynamicMatch.call(window, query);
    this.matches = mql.matches;
    this.media = mql.media;
    // TODO: is there a time it makes sense to remove this listener?
    mql.addListener(update);
  } else {
    this.matches = staticMatch(query, values);
    this.media = query;
  }

  this.addListener = addListener;
  this.removeListener = removeListener;

  function addListener(listener){
    if(mql){
      mql.addListener(listener);
    }
  }

  function removeListener(listener){
    if(mql){
      mql.removeListener(listener);
    }
  }

  // update ourselves!
  function update(evt){
    self.matches = evt.matches;
    self.media = evt.media;
  }
}

function matchMedia(query, values){
  return new Mql(query, values);
}

module.exports = matchMedia;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(3);
  var warning = __webpack_require__(5);
  var ReactPropTypesSecret = __webpack_require__(8);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var emptyFunction = __webpack_require__(2);
var invariant = __webpack_require__(3);

module.exports = function() {
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  function shim() {
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var emptyFunction = __webpack_require__(2);
var invariant = __webpack_require__(3);
var warning = __webpack_require__(5);

var ReactPropTypesSecret = __webpack_require__(8);
var checkPropTypes = __webpack_require__(12);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ })
/******/ ])
});
;
//# sourceMappingURL=react-responsive.js.map

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(50);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(81);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


var MediaQuery = __webpack_require__(82);

document.addEventListener("DOMContentLoaded", function () {
    var getRandom = Math.floor(Math.random() * 996 + 11);

    var MovieApp = function (_React$Component) {
        _inherits(MovieApp, _React$Component);

        function MovieApp(props) {
            _classCallCheck(this, MovieApp);

            var _this = _possibleConstructorReturn(this, (MovieApp.__proto__ || Object.getPrototypeOf(MovieApp)).call(this, props));

            _this.getId = function () {
                var randomPage = "https://api.themoviedb.org/3/discover/movie?api_key=37c1cec5856970e41782ef3828236ba2&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=" + _this.state.randomNumber + "&with_genres=" + _this.state.loadGenre;
                $.ajax({ url: randomPage }).done(function (response) {
                    var ids = [];

                    $.each(response.results, function (key, array) {
                        ids.push(array.id);
                    });
                    var rand = Math.floor(Math.random() * 16);
                    _this.changeLink(ids[rand]);

                    _this.movieReload();
                }).fail(function () {
                    console.log("error getting id");
                });
            };


_this.movieReload = function () {
    var loadMovie = function loadMovie() {
        $.ajax({ url: _this.state.url }).done(function (response) {
            var genres = [];

            $.each(response.genres, function (key, array) {
                genres.push(" | " + array.name);
            });

            _this.setState({
                title: response.original_title,
                description: response.overview,
                rating: response.vote_average,
                votes: response.vote_count,
                releaseDate: response.release_date,
                poster: "https://image.tmdb.org/t/p/w342/" + response.poster_path,
                genres: genres
            });
        }).fail(function () {
            loadMovie();
        });
    };
    loadMovie();
};

_this.state = {
    title: "",
    poster: "",
    url: "https://api.themoviedb.org/3/movie/" + "555" + "?api_key=37c1cec5856970e41782ef3828236ba2",
    trailerUrl: "",
    description: "",
    rating: "",
    votes: "",
    releaseDate: "",
    color: "black",
    genres: "",
    display: "none",
    displayGenre: "none",
    randomNumber: "",
    loadGenre: "",
    border: ""
};
return _this;
}
}
})
//
// console.log(response.overview)

// $(document).ready(function() {
//
// $(".poster").append(this.response.overview)
// })
//


// _createClass(MovieApp, [{
// key: 'changeLink',
// value: function changeLink(number) {
//     this.setState({
//         url: "https://api.themoviedb.org/3/movie/" + number + "?api_key=37c1cec5856970e41782ef3828236ba2"
//     });
// }
// }, {
// key: 'componentDidMount',
// value: function componentDidMount() {
//     this.getId();
// }
// }, {
// key: 'handleClickTrailer',
// value: function handleClickTrailer() {
//     event.preventDefault();
//     document.querySelector("iframe").src = "https://youtube.com/embed/?listType=search&list=" + this.state.title + " trailer";
//     this.setState({ display: "block" });
// }
// }, {
// key: 'handleClickClose',
// value: function handleClickClose() {
//     event.preventDefault();
//     document.getElementById('VideoPlayer').src = "https://youtube.com/embed/?listType=search&list=" + this.state.title + " trailer";
//     this.setState({ display: "none", displayGenre: "none" });
// }
// }, {
// key: 'handleClickGenre',
// value: function handleClickGenre() {
//     event.preventDefault();
//     document.getElementById('VideoPlayer').src = "https://youtube.com/embed/?listType=search&list=" + this.state.title + " trailer";
//     this.setState({ displayGenre: "block" });
// }
// }, {
// key: 'handleClickRoll',
// value: function handleClickRoll() {
//     event.preventDefault();
//     $(".container").ready(function () {
//         $(".title").addClass("text-focus-in");
//         $(".poster").removeClass("shadow-drop-center");
//
//         setTimeout(function () {
//             $(".poster").addClass("shadow-drop-center");
//             $(".title").removeClass("text-focus-in");
//         }, 300);
//     });
//     this.getId();
//     this.setState({
//         randomNumber: Math.floor(Math.random() * 15 + 1)
//     });
//
//     console.log("page: " + this.state.randomNumber);
// }
// }, {
// key: 'BtnClick',
// value: function BtnClick(event) {
//     $(".genreBtn").on("click", function () {
//         $(".active").removeClass("active");
//         $(this).addClass("active");
//     });
//     this.setState({ displayGenre: "none" });
//     this.getId();
// }
// }, {
// key: 'render',
// value: function render() {
//     var _this20 = this,
//         _ref;
//
//     if (this.state.rating < 5.5) {
//         this.state.color = "red";
//     } else if (this.state.rating > 7) {
//         this.state.color = "#009688";
//     } else {
//         this.state.color = "orange";
//     }
//     return _react2.default.createElement(
//         'div',
//         { className: 'mainContainer' },
//         _react2.default.createElement(
//             MediaQuery,
//             { minDeviceWidth: 768 },
//             _react2.default.createElement(
//                 'div',
//                 { className: 'container floatLeft' },
//                 _react2.default.createElement(
//                     'button',
//                     { onClick: function onClick() {
//                             _this20.BtnHorrorClick();
//                             _this20.BtnClick();
//                         }, className: 'genreBtn horrorBtn' },
//                     _react2.default.createElement(
//                         'span',
//                         null,
//                         'SCARE ME'
//                     )
//                 ),
//
//         _react2.default.createElement(
//             MediaQuery,
//             { maxDeviceWidth: 767 },
//             _react2.default.createElement(
//                 'div',
//                 { className: 'container', style: {
//                         display: this.state.displayGenre,
//                         zIndex: "999",
//                         position: "absolute",
//                         top: "0",
//                         right: "0",
//                         bottom: "0",
//                         left: "0",
//                         width: "100%",
//                         height: "90%",
//                         backgroundColor: "black",
//                         padding: "20px",
//                         marginLeft: "0px"
//                     } },
//
//             _react2.default.createElement(
//                 'div',
//                 { style: {
//                         width: "100%",
//                         height: "1700px",
//                         margin: "0",
//                         padding: "0",
//                         backgroundColor: "rgba(0, 0, 0, 0.9)",
//                         display: "flex",
//                         alignItems: "center",
//                         flexDirection: "column",
//                         position: "relative"
//                     } },
//                 _react2.default.createElement(
//                     'h1',
//                     { style: {
//                             fontSize: "3.2rem",
//                             borderBottom: "5px solid rgb(176, 0, 53)",
//                             marginTop: "0",
//                             height: "280px",
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                             textAlign: "center"
//                         }, className: 'title' },
//                     this.state.title
//                 ),
//                 _react2.default.createElement('div',
//                 { style: {
//                         backgroundImage: 'url(' + this.state.poster + ')',
//                         width: '400px',
//                         height: '1200px',
//                         backgroundSize: 'cover',
//                         backgroundPosition: 'center',
//                         marginTop: "20px"
//                     } }),
//                 _react2.default.createElement(
//                     'div',
//                     { className: 'description-container' },
//                     this.state.description
//                 ),
//
//                 _react2.default.createElement(
//                     'h4',
//                     { style: {
//                             fontSize: "3rem",
//                             height: "50px",
//                             margin: "15px"
//                         } },
//                     'Average rating:\xA0',
//                     _react2.default.createElement(
//                         'span',
//                         { style: {
//                                 color: this.state.color
//                             } },
//                         this.state.rating,
//                         '/10\xA0'
//                     ),
//                     '(',
//                     this.state.votes,
//                     '\xA0votes)'
//                 ),
//                 _react2.default.createElement(
//                     'div',
//                     { style: {
//                             display: this.state.display,
//                             zIndex: "998",
//                             position: "absolute",
//                             top: "0",
//                             right: "0",
//                             bottom: "0",
//                             left: "0"
//                         } },
//                     _react2.default.createElement('iframe', { id: 'VideoPlayer', width: '970', height: '1450', src: '', frameBorder: '0', allowFullScreen: 'true' }),
//                     _react2.default.createElement('div', { style: {
//                             width: "100%",
//                             height: "250px",
//                             marginTop: "10px",
//                             backgroundImage: 'url(images/closeButton.jpg)',
//                             backgroundSize: "cover",
//                             backgroundRepeat: "no-repeat",
//                             backgroundPosition: "center"
//                         }, onClick: this.handleClickClose.bind(this) })
//                 ),
//                 _react2.default.createElement(
//                     'h4',
//                     { style: {
//                             fontSize: "2.5rem",
//                             marginTop: "20px",
//                             marginBottom: "50px"
//                         }, className: 'releaseDate' },
//                     'Release date: ',
//                     this.state.releaseDate
//                 ),
//                 _react2.default.createElement('button', { style: {
//                         height: "300px",
//                         width: "900px",
//                         marginLeft: "20px",
//                         marginBottom: "20px",
//                         backgroundImage: 'url(images/choosegenre.png)',
//                         backgroundSize: "cover",
//                         backgroundRepeat: "no-repeat",
//                         backgroundPosition: "center"
//                     }, onClick: this.handleClickGenre.bind(this) }),
//                 _react2.default.createElement(
//                     'div',
//                     { style: {
//                             height: "200px"
//                         } },
//                     _react2.default.createElement('button', { style: {
//                             fontSize: "4rem",
//                             height: "200px",
//                             width: "350px",
//                             float: "left",
//                             marginLeft: "20px",
//                             backgroundImage: 'url(images/watchtrailer.png)',
//                             backgroundSize: "cover",
//                             backgroundRepeat: "no-repeat",
//                             backgroundPosition: "center"
//                         }, onClick: this.handleClickTrailer.bind(this) }),
//                         //
//
//                         //
//
//                     _react2.default.createElement('button', { style: {
//                             fontSize: "4rem",
//                             height: "200px",
//                             width: "530px",
//                             float: "left",
//                             marginLeft: "20px",
//                             backgroundImage: 'url(images/next-2.png)',
//                             backgroundSize: "cover",
//                             backgroundRepeat: "no-repeat"
//                         }, onClick: this.handleClickRoll.bind(this) })
//                 )
//             )
//         ),
//         _react2.default.createElement(
//             MediaQuery,
//             { minDeviceWidth: 768 },
//             _react2.default.createElement(
//                 'div',
//                 { className: 'containerCenter floatLeft' },
//                 _react2.default.createElement(
//                     'h1',
//                     { className: 'title' },
//                     this.state.title
//                 ),
//                 _react2.default.createElement('div', { className: 'flickity-cell poster', style: {
//                         backgroundImage: 'url(' + this.state.poster + ')'
//                     } }),
//                 _react2.default.createElement(
//                     'h4',
//                     { className: 'rating' },
//                     'Rating:\xA0',
//                     _react2.default.createElement(
//                         'span',
//                         { style: {
//                                 color: this.state.color
//                             } },
//                         this.state.rating,
//                         '/10\xA0'
//                     ),
//                     '(',
//                     'average votes)'
//                 ),
//                 _react2.default.createElement(
//                     'div',
//                     { className: 'youtube', style: {
//                             display: this.state.display
//                         } },
//                     _react2.default.createElement('iframe', { id: 'VideoPlayer', width: '700', height: '350', src: '', frameBorder: '0', allowFullScreen: 'true' }),
//                     _react2.default.createElement('div', { onClick: this.handleClickClose.bind(this), className: 'close' })
//                 ),
//                 _react2.default.createElement(
//                     'h4',
//                     { className: 'releaseDate' },
//                     'Release date: ',
//                     this.state.releaseDate
//                 ),
//                 _react2.default.createElement(
//                     'button',
//                     { onClick: this.handleClickTrailer.bind(this), className: 'trailerBtn' },
//                     'Watch Trailer'
//                 ),
//                 _react2.default.createElement(
//                     'div',
//                     { style: {
//                             flexDirection: "row"
//                         } },
//                     _react2.default.createElement('img', { className: 'nextButton', src: 'images/next.png', onClick: this.handleClickRoll.bind(this) })
//                 )
//             )
//         ),
//     );
// }
// }]);
//
// return MovieApp;
// }(_react2.default.Component);
