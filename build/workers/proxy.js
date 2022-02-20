/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 5569:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Relay v11.0.2
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
module.exports = __webpack_require__(5265);

/***/ }),

/***/ 5828:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Relay v11.0.2
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
module.exports = __webpack_require__(1280);

/***/ }),

/***/ 5728:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


function getComponentName(component) {
  return component.displayName || component.name || 'Component';
}

function getContainerName(Component) {
  return 'Relay(' + getComponentName(Component) + ')';
}

module.exports = {
  getComponentName: getComponentName,
  getContainerName: getContainerName
};

/***/ }),

/***/ 5265:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var React = __webpack_require__(657);

var _require = __webpack_require__(3271),
    createRelayContext = _require.__internal.createRelayContext;

module.exports = createRelayContext(React);

/***/ }),

/***/ 9265:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _objectSpread2 = _interopRequireDefault(__webpack_require__(4638));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(5305));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(9922));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(914));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3116));

var React = __webpack_require__(657);

var areEqual = __webpack_require__(9074);

var buildReactRelayContainer = __webpack_require__(2937);

var getRootVariablesForFragments = __webpack_require__(4290);

var _require = __webpack_require__(5728),
    getContainerName = _require.getContainerName;

var _require2 = __webpack_require__(1948),
    assertRelayContext = _require2.assertRelayContext;

var _require3 = __webpack_require__(3271),
    createFragmentSpecResolver = _require3.createFragmentSpecResolver,
    getDataIDsFromObject = _require3.getDataIDsFromObject,
    isScalarAndEqual = _require3.isScalarAndEqual;
/**
 * Composes a React component class, returning a new class that intercepts
 * props, resolving them with the provided fragments and subscribing for
 * updates.
 */


function createContainerWithFragments(Component, fragments) {
  var _class, _temp;

  var containerName = getContainerName(Component);
  return _temp = _class = /*#__PURE__*/function (_React$Component) {
    (0, _inheritsLoose2["default"])(_class, _React$Component);

    function _class(props) {
      var _props$__rootIsQueryR, _this;

      _this = _React$Component.call(this, props) || this;
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleFragmentDataUpdate", function () {
        var resolverFromThisUpdate = _this.state.resolver;

        _this.setState(function (updatedState) {
          return (// If this event belongs to the current data source, update.
            // Otherwise we should ignore it.
            resolverFromThisUpdate === updatedState.resolver ? {
              data: updatedState.resolver.resolve(),
              relayProp: getRelayProp(updatedState.relayProp.environment)
            } : null
          );
        });
      });
      var relayContext = assertRelayContext(props.__relayContext);
      var rootIsQueryRenderer = (_props$__rootIsQueryR = props.__rootIsQueryRenderer) !== null && _props$__rootIsQueryR !== void 0 ? _props$__rootIsQueryR : false; // Do not provide a subscription/callback here.
      // It is possible for this render to be interrupted or aborted,
      // In which case the subscription would cause a leak.
      // We will add the subscription in componentDidMount().

      var resolver = createFragmentSpecResolver(relayContext, containerName, fragments, props, rootIsQueryRenderer);
      _this.state = {
        data: resolver.resolve(),
        prevProps: props,
        prevPropsContext: relayContext,
        relayProp: getRelayProp(relayContext.environment),
        resolver: resolver
      };
      return _this;
    }
    /**
     * When new props are received, read data for the new props and subscribe
     * for updates. Props may be the same in which case previous data and
     * subscriptions can be reused.
     */


    _class.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
      var _nextProps$__rootIsQu; // Any props change could impact the query, so we mirror props in state.
      // This is an unusual pattern, but necessary for this container usecase.


      var prevProps = prevState.prevProps;
      var relayContext = assertRelayContext(nextProps.__relayContext);
      var rootIsQueryRenderer = (_nextProps$__rootIsQu = nextProps.__rootIsQueryRenderer) !== null && _nextProps$__rootIsQu !== void 0 ? _nextProps$__rootIsQu : false;
      var prevIDs = getDataIDsFromObject(fragments, prevProps);
      var nextIDs = getDataIDsFromObject(fragments, nextProps);
      var resolver = prevState.resolver; // If the environment has changed or props point to new records then
      // previously fetched data and any pending fetches no longer apply:
      // - Existing references are on the old environment.
      // - Existing references are based on old variables.
      // - Pending fetches are for the previous records.

      if (prevState.prevPropsContext.environment !== relayContext.environment || !areEqual(prevIDs, nextIDs)) {
        // Do not provide a subscription/callback here.
        // It is possible for this render to be interrupted or aborted,
        // In which case the subscription would cause a leak.
        // We will add the subscription in componentDidUpdate().
        resolver = createFragmentSpecResolver(relayContext, containerName, fragments, nextProps, rootIsQueryRenderer);
        return {
          data: resolver.resolve(),
          prevPropsContext: relayContext,
          prevProps: nextProps,
          relayProp: getRelayProp(relayContext.environment),
          resolver: resolver
        };
      } else {
        resolver.setProps(nextProps);
        var data = resolver.resolve();

        if (data !== prevState.data) {
          return {
            data: data,
            prevProps: nextProps,
            prevPropsContext: relayContext,
            relayProp: getRelayProp(relayContext.environment)
          };
        }
      }

      return null;
    };

    var _proto = _class.prototype;

    _proto.componentDidMount = function componentDidMount() {
      this._subscribeToNewResolver();

      this._rerenderIfStoreHasChanged();
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
      if (this.state.resolver !== prevState.resolver) {
        prevState.resolver.dispose();

        this._subscribeToNewResolver();
      }

      this._rerenderIfStoreHasChanged();
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this.state.resolver.dispose();
    };

    _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
      // Short-circuit if any Relay-related data has changed
      if (nextState.data !== this.state.data) {
        return true;
      } // Otherwise, for convenience short-circuit if all non-Relay props
      // are scalar and equal


      var keys = Object.keys(nextProps);

      for (var ii = 0; ii < keys.length; ii++) {
        var _key = keys[ii];

        if (_key === '__relayContext') {
          if (nextState.prevPropsContext.environment !== this.state.prevPropsContext.environment) {
            return true;
          }
        } else {
          if (!fragments.hasOwnProperty(_key) && !isScalarAndEqual(nextProps[_key], this.props[_key])) {
            return true;
          }
        }
      }

      return false;
    }
    /**
     * Render new data for the existing props/context.
     */
    ;

    _proto._rerenderIfStoreHasChanged = function _rerenderIfStoreHasChanged() {
      var _this$state = this.state,
          data = _this$state.data,
          resolver = _this$state.resolver; // External values could change between render and commit.
      // Check for this case, even though it requires an extra store read.

      var maybeNewData = resolver.resolve();

      if (data !== maybeNewData) {
        this.setState({
          data: maybeNewData
        });
      }
    };

    _proto._subscribeToNewResolver = function _subscribeToNewResolver() {
      var resolver = this.state.resolver; // Event listeners are only safe to add during the commit phase,
      // So they won't leak if render is interrupted or errors.

      resolver.setCallback(this._handleFragmentDataUpdate);
    };

    _proto.render = function render() {
      var _this$props = this.props,
          componentRef = _this$props.componentRef,
          __relayContext = _this$props.__relayContext,
          __rootIsQueryRenderer = _this$props.__rootIsQueryRenderer,
          props = (0, _objectWithoutPropertiesLoose2["default"])(_this$props, ["componentRef", "__relayContext", "__rootIsQueryRenderer"]);
      return React.createElement(Component, (0, _objectSpread2["default"])((0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, props), this.state.data), {}, {
        ref: componentRef,
        relay: this.state.relayProp
      }));
    };

    return _class;
  }(React.Component), (0, _defineProperty2["default"])(_class, "displayName", containerName), _temp;
}

function getRelayProp(environment) {
  return {
    environment: environment
  };
}
/**
 * Wrap the basic `createContainer()` function with logic to adapt to the
 * `context.relay.environment` in which it is rendered. Specifically, the
 * extraction of the environment-specific version of fragments in the
 * `fragmentSpec` is memoized once per environment, rather than once per
 * instance of the container constructed/rendered.
 */


function createContainer(Component, fragmentSpec) {
  // $FlowFixMe[incompatible-return]
  return buildReactRelayContainer(Component, fragmentSpec, createContainerWithFragments);
}

module.exports = {
  createContainer: createContainer
};

/***/ }),

/***/ 179:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var React = __webpack_require__(657);

var ReactRelayContext = __webpack_require__(5265);

var ReactRelayQueryRendererContext = __webpack_require__(9442);

var useLayoutEffect = React.useLayoutEffect,
    useState = React.useState,
    useRef = React.useRef,
    useMemo = React.useMemo;

var _require = __webpack_require__(3271),
    createOperationDescriptor = _require.createOperationDescriptor,
    deepFreeze = _require.deepFreeze,
    getRequest = _require.getRequest;

var areEqual = __webpack_require__(9074);

var queryRendererContext = {
  rootIsQueryRenderer: true
};

function useDeepCompare(value) {
  var latestValue = React.useRef(value);

  if (!areEqual(latestValue.current, value)) {
    if (false) {}

    latestValue.current = value;
  }

  return latestValue.current;
}

function ReactRelayLocalQueryRenderer(props) {
  var environment = props.environment,
      query = props.query,
      variables = props.variables,
      render = props.render;
  var latestVariables = useDeepCompare(variables);
  var operation = useMemo(function () {
    var request = getRequest(query);
    return createOperationDescriptor(request, latestVariables);
  }, [query, latestVariables]);
  var relayContext = useMemo(function () {
    return {
      environment: environment
    };
  }, [environment]); // Use a ref to prevent rendering twice when data changes
  // because of props change

  var dataRef = useRef(null);

  var _useState = useState(null),
      forceUpdate = _useState[1];

  var cleanupFnRef = useRef(null);
  var snapshot = useMemo(function () {
    environment.check(operation);
    var res = environment.lookup(operation.fragment);
    dataRef.current = res.data; // Run effects here so that the data can be retained
    // and subscribed before the component commits

    var retainDisposable = environment.retain(operation);
    var subscribeDisposable = environment.subscribe(res, function (newSnapshot) {
      dataRef.current = newSnapshot.data;
      forceUpdate(dataRef.current);
    });
    var disposed = false;

    function nextCleanupFn() {
      if (!disposed) {
        disposed = true;
        cleanupFnRef.current = null;
        retainDisposable.dispose();
        subscribeDisposable.dispose();
      }
    }

    if (cleanupFnRef.current) {
      cleanupFnRef.current();
    }

    cleanupFnRef.current = nextCleanupFn;
    return res;
  }, [environment, operation]);
  useLayoutEffect(function () {
    var cleanupFn = cleanupFnRef.current;
    return function () {
      cleanupFn && cleanupFn();
    };
  }, [snapshot]);
  return /*#__PURE__*/React.createElement(ReactRelayContext.Provider, {
    value: relayContext
  }, /*#__PURE__*/React.createElement(ReactRelayQueryRendererContext.Provider, {
    value: queryRendererContext
  }, render({
    props: dataRef.current
  })));
}

module.exports = ReactRelayLocalQueryRenderer;

/***/ }),

/***/ 9710:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _typeof = __webpack_require__(3634);

var _interopRequireDefault = __webpack_require__(249);

var _extends2 = _interopRequireDefault(__webpack_require__(3339));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(5305));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(9922));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(914));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3116));

var _objectSpread3 = _interopRequireDefault(__webpack_require__(4638));

var React = __webpack_require__(657);

var ReactRelayContext = __webpack_require__(5265);

var ReactRelayQueryFetcher = __webpack_require__(9087);

var areEqual = __webpack_require__(9074);

var buildReactRelayContainer = __webpack_require__(2937);

var getRootVariablesForFragments = __webpack_require__(4290);

var invariant = __webpack_require__(4990);

var warning = __webpack_require__(480);

var _require = __webpack_require__(5728),
    getComponentName = _require.getComponentName,
    getContainerName = _require.getContainerName;

var _require2 = __webpack_require__(1948),
    assertRelayContext = _require2.assertRelayContext;

var _require3 = __webpack_require__(3271),
    ConnectionInterface = _require3.ConnectionInterface,
    Observable = _require3.Observable,
    createFragmentSpecResolver = _require3.createFragmentSpecResolver,
    createOperationDescriptor = _require3.createOperationDescriptor,
    getDataIDsFromObject = _require3.getDataIDsFromObject,
    getRequest = _require3.getRequest,
    getSelector = _require3.getSelector,
    getVariablesFromObject = _require3.getVariablesFromObject,
    isScalarAndEqual = _require3.isScalarAndEqual;

var FORWARD = 'forward';
/**
 * Extends the functionality of RelayFragmentContainer by providing a mechanism
 * to load more data from a connection.
 *
 * # Configuring a PaginationContainer
 *
 * PaginationContainer accepts the standard FragmentContainer arguments and an
 * additional `connectionConfig` argument:
 *
 * - `Component`: the component to be wrapped/rendered.
 * - `fragments`: an object whose values are `graphql` fragments. The object
 *   keys determine the prop names by which fragment data is available.
 * - `connectionConfig`: an object that determines how to load more connection
 *   data. Details below.
 *
 * # Loading More Data
 *
 * Use `props.relay.hasMore()` to determine if there are more items to load.
 *
 * ```
 * hasMore(): boolean
 * ```
 *
 * Use `props.relay.isLoading()` to determine if a previous call to `loadMore()`
 * is still pending. This is convenient for avoiding duplicate load calls.
 *
 * ```
 * isLoading(): boolean
 * ```
 *
 * Use `props.relay.loadMore()` to load more items. This will return null if
 * there are no more items to fetch, otherwise it will fetch more items and
 * return a Disposable that can be used to cancel the fetch.
 *
 * `pageSize` should be the number of *additional* items to fetch (not the
 * total).
 *
 * ```
 * loadMore(pageSize: number, callback: ?(error: ?Error) => void): ?Disposable
 * ```
 *
 * A complete example:
 *
 * ```
 * class Foo extends React.Component {
 *   ...
 *   _onEndReached() {
 *     if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
 *       return;
 *     }
 *     this.props.relay.loadMore(10);
 *   }
 *   ...
 * }
 * ```
 *
 * # Connection Config
 *
 * Here's an example, followed by details of each config property:
 *
 * ```
 * ReactRelayPaginationContainer.createContainer(
 *   Component,
 *   {
 *     user: graphql`fragment FriendsFragment on User {
 *       friends(after: $afterCursor first: $count) @connection {
 *         edges { ... }
 *         pageInfo {
 *           startCursor
 *           endCursor
 *           hasNextPage
 *           hasPreviousPage
 *         }
 *       }
 *     }`,
 *   },
 *   {
 *     direction: 'forward',
 *     getConnectionFromProps(props) {
 *       return props.user && props.user.friends;
 *     },
 *     getFragmentVariables(vars, totalCount) {
 *       // The component presumably wants *all* edges, not just those after
 *       // the cursor, so notice that we don't set $afterCursor here.
 *       return {
 *         ...vars,
 *         count: totalCount,
 *       };
 *     },
 *     getVariables(props, {count, cursor}, fragmentVariables) {
 *       return {
 *         id: props.user.id,
 *         afterCursor: cursor,
 *         count,
 *       },
 *     },
 *     query: graphql`
 *       query FriendsQuery($id: ID!, $afterCursor: ID, $count: Int!) {
 *         node(id: $id) {
 *           ...FriendsFragment
 *         }
 *       }
 *     `,
 *   }
 * );
 * ```
 *
 * ## Config Properties
 *
 * - `direction`: Either "forward" to indicate forward pagination using
 *   after/first, or "backward" to indicate backward pagination using
 *   before/last.
 * - `getConnectionFromProps(props)`: PaginationContainer doesn't magically know
 *   which connection data you mean to fetch more of (a container might fetch
 *   multiple connections, but can only paginate one of them). This function is
 *   given the fragment props only (not full props), and should return the
 *   connection data. See the above example that returns the friends data via
 *   `props.user.friends`.
 * - `getFragmentVariables(previousVars, totalCount)`: Given the previous variables
 *   and the new total number of items, get the variables to use when reading
 *   your fragments. Typically this means setting whatever your local "count"
 *   variable is to the value of `totalCount`. See the example.
 * - `getVariables(props, {count, cursor})`: Get the variables to use when
 *   fetching the pagination `query`. You may determine the root object id from
 *   props (see the example that uses `props.user.id`) and may also set whatever
 *   variables you use for the after/first/before/last calls based on the count
 *   and cursor.
 * - `query`: A query to use when fetching more connection data. This should
 *   typically reference one of the container's fragment (as in the example)
 *   to ensure that all the necessary fields for sub-components are fetched.
 */

function createGetConnectionFromProps(metadata) {
  var path = metadata.path;
  !path ?  false ? 0 : invariant(false) : void 0;
  return function (props) {
    var data = props[metadata.fragmentName];

    for (var i = 0; i < path.length; i++) {
      if (!data || _typeof(data) !== 'object') {
        return null;
      }

      data = data[path[i]];
    }

    return data;
  };
}

function createGetFragmentVariables(metadata) {
  var countVariable = metadata.count;
  !countVariable ?  false ? 0 : invariant(false) : void 0; // $FlowFixMe[cannot-spread-interface]

  return function (prevVars, totalCount) {
    return (0, _objectSpread3["default"])((0, _objectSpread3["default"])({}, prevVars), {}, (0, _defineProperty2["default"])({}, countVariable, totalCount));
  };
}

function findConnectionMetadata(fragments) {
  var foundConnectionMetadata = null;
  var isRelayModern = false;

  for (var fragmentName in fragments) {
    var fragment = fragments[fragmentName];
    var connectionMetadata = fragment.metadata && fragment.metadata.connection; // HACK: metadata is always set to `undefined` in classic. In modern, even
    // if empty, it is set to null (never undefined). We use that knowlege to
    // check if we're dealing with classic or modern

    if (fragment.metadata !== undefined) {
      isRelayModern = true;
    }

    if (connectionMetadata) {
      !(connectionMetadata.length === 1) ?  false ? 0 : invariant(false) : void 0;
      !!foundConnectionMetadata ?  false ? 0 : invariant(false) : void 0;
      foundConnectionMetadata = (0, _objectSpread3["default"])((0, _objectSpread3["default"])({}, connectionMetadata[0]), {}, {
        fragmentName: fragmentName
      });
    }
  }

  !(!isRelayModern || foundConnectionMetadata !== null) ?  false ? 0 : invariant(false) : void 0;
  return foundConnectionMetadata || {};
}

function toObserver(observerOrCallback) {
  return typeof observerOrCallback === 'function' ? {
    error: observerOrCallback,
    complete: observerOrCallback,
    unsubscribe: function unsubscribe(subscription) {
      typeof observerOrCallback === 'function' && observerOrCallback();
    }
  } : observerOrCallback || {};
}

function createContainerWithFragments(Component, fragments, connectionConfig) {
  var _class, _temp;

  var componentName = getComponentName(Component);
  var containerName = getContainerName(Component);
  var metadata = findConnectionMetadata(fragments);
  var getConnectionFromProps = connectionConfig.getConnectionFromProps || createGetConnectionFromProps(metadata);
  var direction = connectionConfig.direction || metadata.direction;
  !direction ?  false ? 0 : invariant(false) : void 0;
  var getFragmentVariables = connectionConfig.getFragmentVariables || createGetFragmentVariables(metadata);
  return _temp = _class = /*#__PURE__*/function (_React$Component) {
    (0, _inheritsLoose2["default"])(_class, _React$Component);

    function _class(props) {
      var _props$__rootIsQueryR, _this;

      _this = _React$Component.call(this, props) || this;
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleFragmentDataUpdate", function () {
        _this.setState({
          data: _this._resolver.resolve()
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_hasMore", function () {
        var connectionData = _this._getConnectionData();

        return !!(connectionData && connectionData.hasMore && connectionData.cursor);
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_isLoading", function () {
        return !!_this._refetchSubscription;
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_refetchConnection", function (totalCount, observerOrCallback, refetchVariables) {
        if (!_this._canFetchPage('refetchConnection')) {
          return {
            dispose: function dispose() {}
          };
        }

        _this._refetchVariables = refetchVariables;
        var paginatingVariables = {
          count: totalCount,
          cursor: null,
          totalCount: totalCount
        };

        var fetch = _this._fetchPage(paginatingVariables, toObserver(observerOrCallback), {
          force: true
        });

        return {
          dispose: fetch.unsubscribe
        };
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_loadMore", function (pageSize, observerOrCallback, options) {
        if (!_this._canFetchPage('loadMore')) {
          return {
            dispose: function dispose() {}
          };
        }

        var observer = toObserver(observerOrCallback);

        var connectionData = _this._getConnectionData();

        if (!connectionData) {
          Observable.create(function (sink) {
            return sink.complete();
          }).subscribe(observer);
          return null;
        }

        var totalCount = connectionData.edgeCount + pageSize;

        if (options && options.force) {
          return _this._refetchConnection(totalCount, observerOrCallback);
        }

        var _ConnectionInterface$ = ConnectionInterface.get(),
            END_CURSOR = _ConnectionInterface$.END_CURSOR,
            START_CURSOR = _ConnectionInterface$.START_CURSOR;

        var cursor = connectionData.cursor;
         false ? 0 : void 0;
        var paginatingVariables = {
          count: pageSize,
          cursor: cursor,
          totalCount: totalCount
        };

        var fetch = _this._fetchPage(paginatingVariables, observer, options);

        return {
          dispose: fetch.unsubscribe
        };
      });
      var relayContext = assertRelayContext(props.__relayContext);
      var rootIsQueryRenderer = (_props$__rootIsQueryR = props.__rootIsQueryRenderer) !== null && _props$__rootIsQueryR !== void 0 ? _props$__rootIsQueryR : false;
      _this._isARequestInFlight = false;
      _this._refetchSubscription = null;
      _this._refetchVariables = null;
      _this._resolver = createFragmentSpecResolver(relayContext, containerName, fragments, props, rootIsQueryRenderer, _this._handleFragmentDataUpdate);
      _this.state = {
        data: _this._resolver.resolve(),
        prevContext: relayContext,
        contextForChildren: relayContext,
        relayProp: _this._buildRelayProp(relayContext)
      };
      _this._isUnmounted = false;
      _this._hasFetched = false;
      return _this;
    }

    var _proto = _class.prototype;

    _proto.componentDidMount = function componentDidMount() {
      this._isUnmounted = false;
    }
    /**
     * When new props are received, read data for the new props and subscribe
     * for updates. Props may be the same in which case previous data and
     * subscriptions can be reused.
     */
    ;

    _proto.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
      var _nextProps$__rootIsQu;

      var relayContext = assertRelayContext(nextProps.__relayContext);
      var rootIsQueryRenderer = (_nextProps$__rootIsQu = nextProps.__rootIsQueryRenderer) !== null && _nextProps$__rootIsQu !== void 0 ? _nextProps$__rootIsQu : false;
      var prevIDs = getDataIDsFromObject(fragments, this.props);
      var nextIDs = getDataIDsFromObject(fragments, nextProps);
      var prevRootVariables = getRootVariablesForFragments(fragments, this.props);
      var nextRootVariables = getRootVariablesForFragments(fragments, nextProps); // If the environment has changed or props point to new records then
      // previously fetched data and any pending fetches no longer apply:
      // - Existing references are on the old environment.
      // - Existing references are based on old variables.
      // - Pending fetches are for the previous records.

      if (relayContext.environment !== this.state.prevContext.environment || !areEqual(prevRootVariables, nextRootVariables) || !areEqual(prevIDs, nextIDs)) {
        this._cleanup(); // Child containers rely on context.relay being mutated (for gDSFP).


        this._resolver = createFragmentSpecResolver(relayContext, containerName, fragments, nextProps, rootIsQueryRenderer, this._handleFragmentDataUpdate);
        this.setState({
          prevContext: relayContext,
          contextForChildren: relayContext,
          relayProp: this._buildRelayProp(relayContext)
        });
      } else if (!this._hasFetched) {
        this._resolver.setProps(nextProps);
      }

      var data = this._resolver.resolve();

      if (data !== this.state.data) {
        this.setState({
          data: data
        });
      }
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this._isUnmounted = true;

      this._cleanup();
    };

    _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
      // Short-circuit if any Relay-related data has changed
      if (nextState.data !== this.state.data || nextState.relayProp !== this.state.relayProp) {
        return true;
      } // Otherwise, for convenience short-circuit if all non-Relay props
      // are scalar and equal


      var keys = Object.keys(nextProps);

      for (var ii = 0; ii < keys.length; ii++) {
        var _key = keys[ii];

        if (_key === '__relayContext') {
          if (nextState.prevContext.environment !== this.state.prevContext.environment) {
            return true;
          }
        } else {
          if (!fragments.hasOwnProperty(_key) && !isScalarAndEqual(nextProps[_key], this.props[_key])) {
            return true;
          }
        }
      }

      return false;
    };

    _proto._buildRelayProp = function _buildRelayProp(relayContext) {
      return {
        hasMore: this._hasMore,
        isLoading: this._isLoading,
        loadMore: this._loadMore,
        refetchConnection: this._refetchConnection,
        environment: relayContext.environment
      };
    }
    /**
     * Render new data for the existing props/context.
     */
    ;

    _proto._getConnectionData = function _getConnectionData() {
      // Extract connection data and verify there are more edges to fetch
      var _this$props = this.props,
          _ = _this$props.componentRef,
          restProps = (0, _objectWithoutPropertiesLoose2["default"])(_this$props, ["componentRef"]);
      var props = (0, _objectSpread3["default"])((0, _objectSpread3["default"])({}, restProps), this.state.data);
      var connectionData = getConnectionFromProps(props);

      if (connectionData == null) {
        return null;
      }

      var _ConnectionInterface$2 = ConnectionInterface.get(),
          EDGES = _ConnectionInterface$2.EDGES,
          PAGE_INFO = _ConnectionInterface$2.PAGE_INFO,
          HAS_NEXT_PAGE = _ConnectionInterface$2.HAS_NEXT_PAGE,
          HAS_PREV_PAGE = _ConnectionInterface$2.HAS_PREV_PAGE,
          END_CURSOR = _ConnectionInterface$2.END_CURSOR,
          START_CURSOR = _ConnectionInterface$2.START_CURSOR;

      !(_typeof(connectionData) === 'object') ?  false ? 0 : invariant(false) : void 0;
      var edges = connectionData[EDGES];
      var pageInfo = connectionData[PAGE_INFO];

      if (edges == null || pageInfo == null) {
        return null;
      }

      !Array.isArray(edges) ?  false ? 0 : invariant(false) : void 0;
      !(_typeof(pageInfo) === 'object') ?  false ? 0 : invariant(false) : void 0;
      var hasMore = direction === FORWARD ? pageInfo[HAS_NEXT_PAGE] : pageInfo[HAS_PREV_PAGE];
      var cursor = direction === FORWARD ? pageInfo[END_CURSOR] : pageInfo[START_CURSOR];

      if (typeof hasMore !== 'boolean' || edges.length !== 0 && typeof cursor === 'undefined') {
         false ? 0 : void 0;
        return null;
      }

      return {
        cursor: cursor,
        edgeCount: edges.length,
        hasMore: hasMore
      };
    };

    _proto._getQueryFetcher = function _getQueryFetcher() {
      if (!this._queryFetcher) {
        this._queryFetcher = new ReactRelayQueryFetcher();
      }

      return this._queryFetcher;
    };

    _proto._canFetchPage = function _canFetchPage(method) {
      if (this._isUnmounted) {
         false ? 0 : void 0;
        return false;
      }

      return true;
    };

    _proto._fetchPage = function _fetchPage(paginatingVariables, observer, options) {
      var _this2 = this;

      var _assertRelayContext = assertRelayContext(this.props.__relayContext),
          environment = _assertRelayContext.environment;

      var _this$props2 = this.props,
          _ = _this$props2.componentRef,
          __relayContext = _this$props2.__relayContext,
          __rootIsQueryRenderer = _this$props2.__rootIsQueryRenderer,
          restProps = (0, _objectWithoutPropertiesLoose2["default"])(_this$props2, ["componentRef", "__relayContext", "__rootIsQueryRenderer"]);
      var props = (0, _objectSpread3["default"])((0, _objectSpread3["default"])({}, restProps), this.state.data);
      var fragmentVariables;
      var rootVariables = getRootVariablesForFragments(fragments, restProps); // $FlowFixMe[cannot-spread-interface]

      fragmentVariables = getVariablesFromObject(fragments, restProps); // $FlowFixMe[cannot-spread-interface]

      fragmentVariables = (0, _objectSpread3["default"])((0, _objectSpread3["default"])((0, _objectSpread3["default"])({}, rootVariables), fragmentVariables), this._refetchVariables);
      var fetchVariables = connectionConfig.getVariables(props, {
        count: paginatingVariables.count,
        cursor: paginatingVariables.cursor
      }, fragmentVariables);
      !(_typeof(fetchVariables) === 'object' && fetchVariables !== null) ?  false ? 0 : invariant(false) : void 0; // $FlowFixMe[cannot-spread-interface]

      fetchVariables = (0, _objectSpread3["default"])((0, _objectSpread3["default"])({}, fetchVariables), this._refetchVariables);
      fragmentVariables = (0, _objectSpread3["default"])((0, _objectSpread3["default"])({}, fetchVariables), fragmentVariables);
      var cacheConfig = options ? {
        force: !!options.force
      } : undefined;

      if (cacheConfig != null && (options === null || options === void 0 ? void 0 : options.metadata) != null) {
        cacheConfig.metadata = options === null || options === void 0 ? void 0 : options.metadata;
      }

      var request = getRequest(connectionConfig.query);
      var operation = createOperationDescriptor(request, fetchVariables, cacheConfig);
      var refetchSubscription = null;

      if (this._refetchSubscription) {
        this._refetchSubscription.unsubscribe();
      }

      this._hasFetched = true;

      var onNext = function onNext(payload, complete) {
        var prevData = _this2._resolver.resolve();

        _this2._resolver.setVariables(getFragmentVariables(fragmentVariables, paginatingVariables.totalCount), operation.request.node);

        var nextData = _this2._resolver.resolve(); // Workaround slightly different handling for connection in different
        // core implementations:
        // - Classic core requires the count to be explicitly incremented
        // - Modern core automatically appends new items, updating the count
        //   isn't required to see new data.
        //
        // `setState` is only required if changing the variables would change the
        // resolved data.
        // TODO #14894725: remove PaginationContainer equal check


        if (!areEqual(prevData, nextData)) {
          _this2.setState({
            data: nextData,
            contextForChildren: {
              environment: _this2.props.__relayContext.environment
            }
          }, complete);
        } else {
          complete();
        }
      };

      var cleanup = function cleanup() {
        if (_this2._refetchSubscription === refetchSubscription) {
          _this2._refetchSubscription = null;
          _this2._isARequestInFlight = false;
        }
      };

      this._isARequestInFlight = true;
      refetchSubscription = this._getQueryFetcher().execute({
        environment: environment,
        operation: operation,
        preservePreviousReferences: true
      }).mergeMap(function (payload) {
        return Observable.create(function (sink) {
          onNext(payload, function () {
            sink.next(); // pass void to public observer's `next`

            sink.complete();
          });
        });
      }) // use do instead of finally so that observer's `complete` fires after cleanup
      ["do"]({
        error: cleanup,
        complete: cleanup,
        unsubscribe: cleanup
      }).subscribe(observer || {});
      this._refetchSubscription = this._isARequestInFlight ? refetchSubscription : null;
      return refetchSubscription;
    };

    _proto._cleanup = function _cleanup() {
      this._resolver.dispose();

      this._refetchVariables = null;
      this._hasFetched = false;

      if (this._refetchSubscription) {
        this._refetchSubscription.unsubscribe();

        this._refetchSubscription = null;
        this._isARequestInFlight = false;
      }

      if (this._queryFetcher) {
        this._queryFetcher.dispose();
      }
    };

    _proto.render = function render() {
      var _this$props3 = this.props,
          componentRef = _this$props3.componentRef,
          __relayContext = _this$props3.__relayContext,
          __rootIsQueryRenderer = _this$props3.__rootIsQueryRenderer,
          props = (0, _objectWithoutPropertiesLoose2["default"])(_this$props3, ["componentRef", "__relayContext", "__rootIsQueryRenderer"]);
      return /*#__PURE__*/React.createElement(ReactRelayContext.Provider, {
        value: this.state.contextForChildren
      }, /*#__PURE__*/React.createElement(Component, (0, _extends2["default"])({}, props, this.state.data, {
        ref: componentRef,
        relay: this.state.relayProp
      })));
    };

    return _class;
  }(React.Component), (0, _defineProperty2["default"])(_class, "displayName", containerName), _temp;
}
/**
 * Wrap the basic `createContainer()` function with logic to adapt to the
 * `context.relay.environment` in which it is rendered. Specifically, the
 * extraction of the environment-specific version of fragments in the
 * `fragmentSpec` is memoized once per environment, rather than once per
 * instance of the container constructed/rendered.
 */


function createContainer(Component, fragmentSpec, connectionConfig) {
  // $FlowFixMe[incompatible-return]
  return buildReactRelayContainer(Component, fragmentSpec, function (ComponentClass, fragments) {
    return createContainerWithFragments(ComponentClass, fragments, connectionConfig);
  });
}

module.exports = {
  createContainer: createContainer
};

/***/ }),

/***/ 9087:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3116));

var invariant = __webpack_require__(4990);

var _require = __webpack_require__(3271),
    createOperationDescriptor = _require.createOperationDescriptor,
    isRelayModernEnvironment = _require.isRelayModernEnvironment,
    fetchQuery = _require.__internal.fetchQuery;

var ReactRelayQueryFetcher = /*#__PURE__*/function () {
  function ReactRelayQueryFetcher(args) {
    (0, _defineProperty2["default"])(this, "_selectionReferences", []);
    (0, _defineProperty2["default"])(this, "_callOnDataChangeWhenSet", false);

    if (args != null) {
      this._cacheSelectionReference = args.cacheSelectionReference;
      this._selectionReferences = args.selectionReferences;
    }
  }

  var _proto = ReactRelayQueryFetcher.prototype;

  _proto.getSelectionReferences = function getSelectionReferences() {
    return {
      cacheSelectionReference: this._cacheSelectionReference,
      selectionReferences: this._selectionReferences
    };
  };

  _proto.lookupInStore = function lookupInStore(environment, operation, fetchPolicy) {
    if (fetchPolicy === 'store-and-network' || fetchPolicy === 'store-or-network') {
      if (environment.check(operation).status === 'available') {
        this._retainCachedOperation(environment, operation);

        return environment.lookup(operation.fragment);
      }
    }

    return null;
  };

  _proto.execute = function execute(_ref) {
    var _this = this;

    var environment = _ref.environment,
        operation = _ref.operation,
        _ref$preservePrevious = _ref.preservePreviousReferences,
        preservePreviousReferences = _ref$preservePrevious === void 0 ? false : _ref$preservePrevious;
    var reference = environment.retain(operation);

    var error = function error() {
      // We may have partially fulfilled the request, so let the next request
      // or the unmount dispose of the references.
      _this._selectionReferences = _this._selectionReferences.concat(reference);
    };

    var complete = function complete() {
      if (!preservePreviousReferences) {
        _this.disposeSelectionReferences();
      }

      _this._selectionReferences = _this._selectionReferences.concat(reference);
    };

    var unsubscribe = function unsubscribe() {
      // Let the next request or the unmount code dispose of the references.
      // We may have partially fulfilled the request.
      _this._selectionReferences = _this._selectionReferences.concat(reference);
    };

    if (!isRelayModernEnvironment(environment)) {
      return environment.execute({
        operation: operation
      })["do"]({
        error: error,
        complete: complete,
        unsubscribe: unsubscribe
      });
    }

    return fetchQuery(environment, operation)["do"]({
      error: error,
      complete: complete,
      unsubscribe: unsubscribe
    });
  };

  _proto.setOnDataChange = function setOnDataChange(onDataChange) {
    !this._fetchOptions ?  false ? 0 : invariant(false) : void 0;

    if (typeof onDataChange === 'function') {
      // Mutate the most recent fetchOptions in place,
      // So that in-progress requests can access the updated callback.
      this._fetchOptions.onDataChangeCallbacks = this._fetchOptions.onDataChangeCallbacks || [];

      this._fetchOptions.onDataChangeCallbacks.push(onDataChange);

      if (this._callOnDataChangeWhenSet) {
        // We don't reset '_callOnDataChangeWhenSet' because another callback may be set
        if (this._error != null) {
          onDataChange({
            error: this._error
          });
        } else if (this._snapshot != null) {
          onDataChange({
            snapshot: this._snapshot
          });
        }
      }
    }
  }
  /**
   * `fetch` fetches the data for the given operation.
   * If a result is immediately available synchronously, it will be synchronously
   * returned by this function.
   *
   * Otherwise, the fetched result will be communicated via the `onDataChange` callback.
   * `onDataChange` will be called with the first result (**if it wasn't returned synchronously**),
   * and then subsequently whenever the data changes.
   */
  ;

  _proto.fetch = function fetch(fetchOptions, cacheConfigOverride) {
    var _this2 = this;

    var environment = fetchOptions.environment,
        operation = fetchOptions.operation,
        onDataChange = fetchOptions.onDataChange;
    var fetchHasReturned = false;

    var _error;

    this.disposeRequest();
    var oldOnDataChangeCallbacks = this._fetchOptions && this._fetchOptions.onDataChangeCallbacks;
    this._fetchOptions = {
      environment: environment,
      onDataChangeCallbacks: oldOnDataChangeCallbacks || [],
      operation: operation
    };

    if (onDataChange && this._fetchOptions.onDataChangeCallbacks.indexOf(onDataChange) === -1) {
      this._fetchOptions.onDataChangeCallbacks.push(onDataChange);
    }

    var operationOverride = cacheConfigOverride ? createOperationDescriptor(operation.request.node, operation.request.variables, cacheConfigOverride) : operation;
    var request = this.execute({
      environment: environment,
      operation: operationOverride
    })["finally"](function () {
      _this2._pendingRequest = null;
    }).subscribe({
      next: function next() {
        // If we received a response,
        // Make a note that to notify the callback when it's later added.
        _this2._callOnDataChangeWhenSet = true;
        _this2._error = null; // Only notify of the first result if `next` is being called **asynchronously**
        // (i.e. after `fetch` has returned).

        _this2._onQueryDataAvailable({
          notifyFirstResult: fetchHasReturned
        });
      },
      error: function error(err) {
        // If we received a response when we didn't have a change callback,
        // Make a note that to notify the callback when it's later added.
        _this2._callOnDataChangeWhenSet = true;
        _this2._error = err;
        _this2._snapshot = null;
        var onDataChangeCallbacks = _this2._fetchOptions && _this2._fetchOptions.onDataChangeCallbacks; // Only notify of error if `error` is being called **asynchronously**
        // (i.e. after `fetch` has returned).

        if (fetchHasReturned) {
          if (onDataChangeCallbacks) {
            onDataChangeCallbacks.forEach(function (onDataChange) {
              onDataChange({
                error: err
              });
            });
          }
        } else {
          _error = err;
        }
      }
    });
    this._pendingRequest = {
      dispose: function dispose() {
        request.unsubscribe();
      }
    };
    fetchHasReturned = true;

    if (_error) {
      throw _error;
    }

    return this._snapshot;
  };

  _proto.retry = function retry(cacheConfigOverride) {
    !this._fetchOptions ?  false ? 0 : invariant(false) : void 0;
    return this.fetch({
      environment: this._fetchOptions.environment,
      operation: this._fetchOptions.operation,
      onDataChange: null // If there are onDataChangeCallbacks they will be reused

    }, cacheConfigOverride);
  };

  _proto.dispose = function dispose() {
    this.disposeRequest();
    this.disposeSelectionReferences();
  };

  _proto.disposeRequest = function disposeRequest() {
    this._error = null;
    this._snapshot = null; // order is important, dispose of pendingFetch before selectionReferences

    if (this._pendingRequest) {
      this._pendingRequest.dispose();
    }

    if (this._rootSubscription) {
      this._rootSubscription.dispose();

      this._rootSubscription = null;
    }
  };

  _proto._retainCachedOperation = function _retainCachedOperation(environment, operation) {
    this._disposeCacheSelectionReference();

    this._cacheSelectionReference = environment.retain(operation);
  };

  _proto._disposeCacheSelectionReference = function _disposeCacheSelectionReference() {
    this._cacheSelectionReference && this._cacheSelectionReference.dispose();
    this._cacheSelectionReference = null;
  };

  _proto.disposeSelectionReferences = function disposeSelectionReferences() {
    this._disposeCacheSelectionReference();

    this._selectionReferences.forEach(function (r) {
      return r.dispose();
    });

    this._selectionReferences = [];
  };

  _proto._onQueryDataAvailable = function _onQueryDataAvailable(_ref2) {
    var _this3 = this;

    var notifyFirstResult = _ref2.notifyFirstResult;
    !this._fetchOptions ?  false ? 0 : invariant(false) : void 0;
    var _this$_fetchOptions = this._fetchOptions,
        environment = _this$_fetchOptions.environment,
        onDataChangeCallbacks = _this$_fetchOptions.onDataChangeCallbacks,
        operation = _this$_fetchOptions.operation; // `_onQueryDataAvailable` can be called synchronously the first time and can be called
    // multiple times by network layers that support data subscriptions.
    // Wait until the first payload to call `onDataChange` and subscribe for data updates.

    if (this._snapshot) {
      return;
    }

    this._snapshot = environment.lookup(operation.fragment); // Subscribe to changes in the data of the root fragment

    this._rootSubscription = environment.subscribe(this._snapshot, function (snapshot) {
      // Read from this._fetchOptions in case onDataChange() was lazily added.
      if (_this3._fetchOptions != null) {
        var maybeNewOnDataChangeCallbacks = _this3._fetchOptions.onDataChangeCallbacks;

        if (Array.isArray(maybeNewOnDataChangeCallbacks)) {
          maybeNewOnDataChangeCallbacks.forEach(function (onDataChange) {
            return onDataChange({
              snapshot: snapshot
            });
          });
        }
      }
    });

    if (this._snapshot && notifyFirstResult && Array.isArray(onDataChangeCallbacks)) {
      var snapshot = this._snapshot;
      onDataChangeCallbacks.forEach(function (onDataChange) {
        return onDataChange({
          snapshot: snapshot
        });
      });
    }
  };

  return ReactRelayQueryFetcher;
}();

module.exports = ReactRelayQueryFetcher;

/***/ }),

/***/ 6693:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _objectSpread2 = _interopRequireDefault(__webpack_require__(4638));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(914));

var React = __webpack_require__(657);

var ReactRelayContext = __webpack_require__(5265);

var ReactRelayQueryFetcher = __webpack_require__(9087);

var ReactRelayQueryRendererContext = __webpack_require__(9442);

var areEqual = __webpack_require__(9074);

var _require = __webpack_require__(3271),
    createOperationDescriptor = _require.createOperationDescriptor,
    deepFreeze = _require.deepFreeze,
    getRequest = _require.getRequest;
/**
 * React may double-fire the constructor, and we call 'fetch' in the
 * constructor. If a request is already in flight from a previous call to the
 * constructor, just reuse the query fetcher and wait for the response.
 */


var requestCache = {};
var queryRendererContext = {
  rootIsQueryRenderer: true
};
/**
 * @public
 *
 * Orchestrates fetching and rendering data for a single view or view hierarchy:
 * - Fetches the query/variables using the given network implementation.
 * - Normalizes the response(s) to that query, publishing them to the given
 *   store.
 * - Renders the pending/fail/success states with the provided render function.
 * - Subscribes for updates to the root data and re-renders with any changes.
 */

var ReactRelayQueryRenderer = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(ReactRelayQueryRenderer, _React$Component);

  function ReactRelayQueryRenderer(props) {
    var _this;

    _this = _React$Component.call(this, props) || this; // Callbacks are attached to the current instance and shared with static
    // lifecyles by bundling with state. This is okay to do because the
    // callbacks don't change in reaction to props. However we should not
    // "leak" them before mounting (since we would be unable to clean up). For
    // that reason, we define them as null initially and fill them in after
    // mounting to avoid leaking memory.

    var retryCallbacks = {
      handleDataChange: null,
      handleRetryAfterError: null
    };
    var queryFetcher;
    var requestCacheKey;

    if (props.query) {
      var query = props.query;
      var request = getRequest(query);
      requestCacheKey = getRequestCacheKey(request.params, props.variables);
      queryFetcher = requestCache[requestCacheKey] ? requestCache[requestCacheKey].queryFetcher : new ReactRelayQueryFetcher();
    } else {
      queryFetcher = new ReactRelayQueryFetcher();
    }

    _this.state = (0, _objectSpread2["default"])({
      prevPropsEnvironment: props.environment,
      prevPropsVariables: props.variables,
      prevQuery: props.query,
      queryFetcher: queryFetcher,
      retryCallbacks: retryCallbacks
    }, fetchQueryAndComputeStateFromProps(props, queryFetcher, retryCallbacks, requestCacheKey));
    return _this;
  }

  ReactRelayQueryRenderer.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.prevQuery !== nextProps.query || prevState.prevPropsEnvironment !== nextProps.environment || !areEqual(prevState.prevPropsVariables, nextProps.variables)) {
      var query = nextProps.query;
      var prevSelectionReferences = prevState.queryFetcher.getSelectionReferences();
      prevState.queryFetcher.disposeRequest();
      var queryFetcher;

      if (query) {
        var request = getRequest(query);
        var requestCacheKey = getRequestCacheKey(request.params, nextProps.variables);
        queryFetcher = requestCache[requestCacheKey] ? requestCache[requestCacheKey].queryFetcher : new ReactRelayQueryFetcher(prevSelectionReferences);
      } else {
        queryFetcher = new ReactRelayQueryFetcher(prevSelectionReferences);
      }

      return (0, _objectSpread2["default"])({
        prevQuery: nextProps.query,
        prevPropsEnvironment: nextProps.environment,
        prevPropsVariables: nextProps.variables,
        queryFetcher: queryFetcher
      }, fetchQueryAndComputeStateFromProps(nextProps, queryFetcher, prevState.retryCallbacks // passing no requestCacheKey will cause it to be recalculated internally
      // and we want the updated requestCacheKey, since variables may have changed
      ));
    }

    return null;
  };

  var _proto = ReactRelayQueryRenderer.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var _this$state = this.state,
        retryCallbacks = _this$state.retryCallbacks,
        queryFetcher = _this$state.queryFetcher,
        requestCacheKey = _this$state.requestCacheKey;

    if (requestCacheKey) {
      delete requestCache[requestCacheKey];
    }

    retryCallbacks.handleDataChange = function (params) {
      var error = params.error == null ? null : params.error;
      var snapshot = params.snapshot == null ? null : params.snapshot;

      _this2.setState(function (prevState) {
        var prevRequestCacheKey = prevState.requestCacheKey;

        if (prevRequestCacheKey) {
          delete requestCache[prevRequestCacheKey];
        } // Don't update state if nothing has changed.


        if (snapshot === prevState.snapshot && error === prevState.error) {
          return null;
        }

        return {
          renderProps: getRenderProps(error, snapshot, prevState.queryFetcher, prevState.retryCallbacks),
          snapshot: snapshot,
          requestCacheKey: null
        };
      });
    };

    retryCallbacks.handleRetryAfterError = function (error) {
      return _this2.setState(function (prevState) {
        var prevRequestCacheKey = prevState.requestCacheKey;

        if (prevRequestCacheKey) {
          delete requestCache[prevRequestCacheKey];
        }

        return {
          renderProps: getLoadingRenderProps(),
          requestCacheKey: null
        };
      });
    }; // Re-initialize the ReactRelayQueryFetcher with callbacks.
    // If data has changed since constructions, this will re-render.


    if (this.props.query) {
      queryFetcher.setOnDataChange(retryCallbacks.handleDataChange);
    }
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    // We don't need to cache the request after the component commits
    var requestCacheKey = this.state.requestCacheKey;

    if (requestCacheKey) {
      delete requestCache[requestCacheKey]; // HACK

      delete this.state.requestCacheKey;
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.state.queryFetcher.dispose();
  };

  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    return nextProps.render !== this.props.render || nextState.renderProps !== this.state.renderProps;
  };

  _proto.render = function render() {
    var _this$state2 = this.state,
        renderProps = _this$state2.renderProps,
        relayContext = _this$state2.relayContext; // Note that the root fragment results in `renderProps.props` is already
    // frozen by the store; this call is to freeze the renderProps object and
    // error property if set.

    if (false) {}

    return /*#__PURE__*/React.createElement(ReactRelayContext.Provider, {
      value: relayContext
    }, /*#__PURE__*/React.createElement(ReactRelayQueryRendererContext.Provider, {
      value: queryRendererContext
    }, this.props.render(renderProps)));
  };

  return ReactRelayQueryRenderer;
}(React.Component);

function getLoadingRenderProps() {
  return {
    error: null,
    props: null,
    // `props: null` indicates that the data is being fetched (i.e. loading)
    retry: null
  };
}

function getEmptyRenderProps() {
  return {
    error: null,
    props: {},
    // `props: {}` indicates no data available
    retry: null
  };
}

function getRenderProps(error, snapshot, queryFetcher, retryCallbacks) {
  return {
    error: error ? error : null,
    props: snapshot ? snapshot.data : null,
    retry: function retry(cacheConfigOverride) {
      var syncSnapshot = queryFetcher.retry(cacheConfigOverride);

      if (syncSnapshot && typeof retryCallbacks.handleDataChange === 'function') {
        retryCallbacks.handleDataChange({
          snapshot: syncSnapshot
        });
      } else if (error && typeof retryCallbacks.handleRetryAfterError === 'function') {
        // If retrying after an error and no synchronous result available,
        // reset the render props
        retryCallbacks.handleRetryAfterError(error);
      }
    }
  };
}

function getRequestCacheKey(request, variables) {
  return JSON.stringify({
    id: request.cacheID ? request.cacheID : request.id,
    variables: variables
  });
}

function fetchQueryAndComputeStateFromProps(props, queryFetcher, retryCallbacks, requestCacheKey) {
  var environment = props.environment,
      query = props.query,
      variables = props.variables,
      cacheConfig = props.cacheConfig;
  var genericEnvironment = environment;

  if (query) {
    var request = getRequest(query);
    var operation = createOperationDescriptor(request, variables, cacheConfig);
    var relayContext = {
      environment: genericEnvironment
    };

    if (typeof requestCacheKey === 'string' && requestCache[requestCacheKey]) {
      // This same request is already in flight.
      var snapshot = requestCache[requestCacheKey].snapshot;

      if (snapshot) {
        // Use the cached response
        return {
          error: null,
          relayContext: relayContext,
          renderProps: getRenderProps(null, snapshot, queryFetcher, retryCallbacks),
          snapshot: snapshot,
          requestCacheKey: requestCacheKey
        };
      } else {
        // Render loading state
        return {
          error: null,
          relayContext: relayContext,
          renderProps: getLoadingRenderProps(),
          snapshot: null,
          requestCacheKey: requestCacheKey
        };
      }
    }

    try {
      var storeSnapshot = queryFetcher.lookupInStore(genericEnvironment, operation, props.fetchPolicy);
      var querySnapshot = queryFetcher.fetch({
        environment: genericEnvironment,
        onDataChange: retryCallbacks.handleDataChange,
        operation: operation
      }); // Use network data first, since it may be fresher

      var _snapshot = querySnapshot || storeSnapshot; // cache the request to avoid duplicate requests


      requestCacheKey = requestCacheKey || getRequestCacheKey(request.params, props.variables);
      requestCache[requestCacheKey] = {
        queryFetcher: queryFetcher,
        snapshot: _snapshot
      };

      if (!_snapshot) {
        return {
          error: null,
          relayContext: relayContext,
          renderProps: getLoadingRenderProps(),
          snapshot: null,
          requestCacheKey: requestCacheKey
        };
      }

      return {
        error: null,
        relayContext: relayContext,
        renderProps: getRenderProps(null, _snapshot, queryFetcher, retryCallbacks),
        snapshot: _snapshot,
        requestCacheKey: requestCacheKey
      };
    } catch (error) {
      return {
        error: error,
        relayContext: relayContext,
        renderProps: getRenderProps(error, null, queryFetcher, retryCallbacks),
        snapshot: null,
        requestCacheKey: requestCacheKey
      };
    }
  } else {
    queryFetcher.dispose();
    var _relayContext = {
      environment: genericEnvironment
    };
    return {
      error: null,
      relayContext: _relayContext,
      renderProps: getEmptyRenderProps(),
      requestCacheKey: null // if there is an error, don't cache request

    };
  }
}

module.exports = ReactRelayQueryRenderer;

/***/ }),

/***/ 9442:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var React = __webpack_require__(657);

module.exports = React.createContext({
  rootIsQueryRenderer: false
});

/***/ }),

/***/ 8181:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _extends2 = _interopRequireDefault(__webpack_require__(3339));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__(5305));

var _objectSpread2 = _interopRequireDefault(__webpack_require__(4638));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(9922));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__(914));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3116));

var React = __webpack_require__(657);

var ReactRelayContext = __webpack_require__(5265);

var ReactRelayQueryFetcher = __webpack_require__(9087);

var areEqual = __webpack_require__(9074);

var buildReactRelayContainer = __webpack_require__(2937);

var getRootVariablesForFragments = __webpack_require__(4290);

var warning = __webpack_require__(480);

var _require = __webpack_require__(5728),
    getContainerName = _require.getContainerName;

var _require2 = __webpack_require__(1948),
    assertRelayContext = _require2.assertRelayContext;

var _require3 = __webpack_require__(3271),
    Observable = _require3.Observable,
    createFragmentSpecResolver = _require3.createFragmentSpecResolver,
    createOperationDescriptor = _require3.createOperationDescriptor,
    getDataIDsFromObject = _require3.getDataIDsFromObject,
    getRequest = _require3.getRequest,
    getSelector = _require3.getSelector,
    getVariablesFromObject = _require3.getVariablesFromObject,
    isScalarAndEqual = _require3.isScalarAndEqual;
/**
 * Composes a React component class, returning a new class that intercepts
 * props, resolving them with the provided fragments and subscribing for
 * updates.
 */


function createContainerWithFragments(Component, fragments, taggedNode) {
  var _class, _temp;

  var containerName = getContainerName(Component);
  return _temp = _class = /*#__PURE__*/function (_React$Component) {
    (0, _inheritsLoose2["default"])(_class, _React$Component);

    function _class(props) {
      var _props$__rootIsQueryR, _this;

      _this = _React$Component.call(this, props) || this;
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_handleFragmentDataUpdate", function () {
        var resolverFromThisUpdate = _this.state.resolver;

        _this.setState(function (updatedState) {
          return (// If this event belongs to the current data source, update.
            // Otherwise we should ignore it.
            resolverFromThisUpdate === updatedState.resolver ? {
              data: updatedState.resolver.resolve()
            } : null
          );
        });
      });
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_refetch", function (refetchVariables, renderVariables, observerOrCallback, options) {
        if (_this._isUnmounted) {
           false ? 0 : void 0;
          return {
            dispose: function dispose() {}
          };
        }

        var _assertRelayContext = assertRelayContext(_this.props.__relayContext),
            environment = _assertRelayContext.environment;

        var rootVariables = getRootVariablesForFragments(fragments, _this.props);
        var fetchVariables = typeof refetchVariables === 'function' ? refetchVariables(_this._getFragmentVariables()) : refetchVariables; // $FlowFixMe[cannot-spread-interface]

        fetchVariables = (0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, rootVariables), fetchVariables);
        var fragmentVariables = renderVariables ? // $FlowFixMe[cannot-spread-interface]
        (0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, fetchVariables), renderVariables) : fetchVariables;
        var cacheConfig = options ? {
          force: !!options.force
        } : undefined;

        if (cacheConfig != null && (options === null || options === void 0 ? void 0 : options.metadata) != null) {
          cacheConfig.metadata = options === null || options === void 0 ? void 0 : options.metadata;
        }

        var observer = typeof observerOrCallback === 'function' ? {
          // callback is not exectued on complete or unsubscribe
          // for backward compatibility
          next: observerOrCallback,
          error: observerOrCallback
        } : observerOrCallback || {};
        var query = getRequest(taggedNode);
        var operation = createOperationDescriptor(query, fetchVariables, cacheConfig); // TODO: T26288752 find a better way

        /* eslint-disable lint/react-state-props-mutation */

        _this.state.localVariables = fetchVariables;
        /* eslint-enable lint/react-state-props-mutation */
        // Cancel any previously running refetch.

        _this._refetchSubscription && _this._refetchSubscription.unsubscribe(); // Declare refetchSubscription before assigning it in .start(), since
        // synchronous completion may call callbacks .subscribe() returns.

        var refetchSubscription;

        var storeSnapshot = _this._getQueryFetcher().lookupInStore(environment, operation, options === null || options === void 0 ? void 0 : options.fetchPolicy);

        if (storeSnapshot != null) {
          _this.state.resolver.setVariables(fragmentVariables, operation.request.node);

          _this.setState(function (latestState) {
            return {
              data: latestState.resolver.resolve(),
              contextForChildren: {
                environment: _this.props.__relayContext.environment
              }
            };
          }, function () {
            observer.next && observer.next();
            observer.complete && observer.complete();
          });

          return {
            dispose: function dispose() {}
          };
        }

        _this._getQueryFetcher().execute({
          environment: environment,
          operation: operation,
          // TODO (T26430099): Cleanup old references
          preservePreviousReferences: true
        }).mergeMap(function (response) {
          _this.state.resolver.setVariables(fragmentVariables, operation.request.node);

          return Observable.create(function (sink) {
            return _this.setState(function (latestState) {
              return {
                data: latestState.resolver.resolve(),
                contextForChildren: {
                  environment: _this.props.__relayContext.environment
                }
              };
            }, function () {
              sink.next();
              sink.complete();
            });
          });
        })["finally"](function () {
          // Finalizing a refetch should only clear this._refetchSubscription
          // if the finizing subscription is the most recent call.
          if (_this._refetchSubscription === refetchSubscription) {
            _this._refetchSubscription = null;
          }
        }).subscribe((0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, observer), {}, {
          start: function start(subscription) {
            _this._refetchSubscription = refetchSubscription = subscription;
            observer.start && observer.start(subscription);
          }
        }));

        return {
          dispose: function dispose() {
            refetchSubscription && refetchSubscription.unsubscribe();
          }
        };
      });
      var relayContext = assertRelayContext(props.__relayContext);
      var rootIsQueryRenderer = (_props$__rootIsQueryR = props.__rootIsQueryRenderer) !== null && _props$__rootIsQueryR !== void 0 ? _props$__rootIsQueryR : false;
      _this._refetchSubscription = null; // Do not provide a subscription/callback here.
      // It is possible for this render to be interrupted or aborted,
      // In which case the subscription would cause a leak.
      // We will add the subscription in componentDidMount().

      var resolver = createFragmentSpecResolver(relayContext, containerName, fragments, props, rootIsQueryRenderer);
      _this.state = {
        data: resolver.resolve(),
        localVariables: null,
        prevProps: props,
        prevPropsContext: relayContext,
        contextForChildren: relayContext,
        relayProp: getRelayProp(relayContext.environment, _this._refetch),
        resolver: resolver
      };
      _this._isUnmounted = false;
      return _this;
    }

    var _proto = _class.prototype;

    _proto.componentDidMount = function componentDidMount() {
      this._isUnmounted = false;

      this._subscribeToNewResolver();
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
      // If the environment has changed or props point to new records then
      // previously fetched data and any pending fetches no longer apply:
      // - Existing references are on the old environment.
      // - Existing references are based on old variables.
      // - Pending fetches are for the previous records.
      if (this.state.resolver !== prevState.resolver) {
        prevState.resolver.dispose();
        this._queryFetcher && this._queryFetcher.dispose();
        this._refetchSubscription && this._refetchSubscription.unsubscribe();

        this._subscribeToNewResolver();
      }
    }
    /**
     * When new props are received, read data for the new props and add it to
     * state. Props may be the same in which case previous data can be reused.
     */
    ;

    _class.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
      var _nextProps$__rootIsQu; // Any props change could impact the query, so we mirror props in state.
      // This is an unusual pattern, but necessary for this container usecase.


      var prevProps = prevState.prevProps;
      var relayContext = assertRelayContext(nextProps.__relayContext);
      var rootIsQueryRenderer = (_nextProps$__rootIsQu = nextProps.__rootIsQueryRenderer) !== null && _nextProps$__rootIsQu !== void 0 ? _nextProps$__rootIsQu : false;
      var prevIDs = getDataIDsFromObject(fragments, prevProps);
      var nextIDs = getDataIDsFromObject(fragments, nextProps);
      var prevRootVariables = getRootVariablesForFragments(fragments, prevProps);
      var nextRootVariables = getRootVariablesForFragments(fragments, nextProps);
      var resolver = prevState.resolver; // If the environment has changed or props point to new records then
      // previously fetched data and any pending fetches no longer apply:
      // - Existing references are on the old environment.
      // - Existing references are based on old variables.
      // - Pending fetches are for the previous records.

      if (prevState.prevPropsContext.environment !== relayContext.environment || !areEqual(prevRootVariables, nextRootVariables) || !areEqual(prevIDs, nextIDs)) {
        // Do not provide a subscription/callback here.
        // It is possible for this render to be interrupted or aborted,
        // In which case the subscription would cause a leak.
        // We will add the subscription in componentDidUpdate().
        resolver = createFragmentSpecResolver(relayContext, containerName, fragments, nextProps, rootIsQueryRenderer);
        return {
          data: resolver.resolve(),
          localVariables: null,
          prevProps: nextProps,
          prevPropsContext: relayContext,
          contextForChildren: relayContext,
          relayProp: getRelayProp(relayContext.environment, prevState.relayProp.refetch),
          resolver: resolver
        };
      } else if (!prevState.localVariables) {
        resolver.setProps(nextProps);
      }

      var data = resolver.resolve();

      if (data !== prevState.data) {
        return {
          data: data,
          prevProps: nextProps
        };
      }

      return null;
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      this._isUnmounted = true;
      this.state.resolver.dispose();
      this._queryFetcher && this._queryFetcher.dispose();
      this._refetchSubscription && this._refetchSubscription.unsubscribe();
    };

    _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
      // Short-circuit if any Relay-related data has changed
      if (nextState.data !== this.state.data || nextState.relayProp !== this.state.relayProp) {
        return true;
      } // Otherwise, for convenience short-circuit if all non-Relay props
      // are scalar and equal


      var keys = Object.keys(nextProps);

      for (var ii = 0; ii < keys.length; ii++) {
        var _key = keys[ii];

        if (_key === '__relayContext') {
          if (this.state.prevPropsContext.environment !== nextState.prevPropsContext.environment) {
            return true;
          }
        } else {
          if (!fragments.hasOwnProperty(_key) && !isScalarAndEqual(nextProps[_key], this.props[_key])) {
            return true;
          }
        }
      }

      return false;
    };

    _proto._subscribeToNewResolver = function _subscribeToNewResolver() {
      var _this$state = this.state,
          data = _this$state.data,
          resolver = _this$state.resolver; // Event listeners are only safe to add during the commit phase,
      // So they won't leak if render is interrupted or errors.

      resolver.setCallback(this._handleFragmentDataUpdate); // External values could change between render and commit.
      // Check for this case, even though it requires an extra store read.

      var maybeNewData = resolver.resolve();

      if (data !== maybeNewData) {
        this.setState({
          data: maybeNewData
        });
      }
    }
    /**
     * Render new data for the existing props/context.
     */
    ;

    _proto._getFragmentVariables = function _getFragmentVariables() {
      return getVariablesFromObject(fragments, this.props);
    };

    _proto._getQueryFetcher = function _getQueryFetcher() {
      if (!this._queryFetcher) {
        this._queryFetcher = new ReactRelayQueryFetcher();
      }

      return this._queryFetcher;
    };

    _proto.render = function render() {
      var _this$props = this.props,
          componentRef = _this$props.componentRef,
          __relayContext = _this$props.__relayContext,
          __rootIsQueryRenderer = _this$props.__rootIsQueryRenderer,
          props = (0, _objectWithoutPropertiesLoose2["default"])(_this$props, ["componentRef", "__relayContext", "__rootIsQueryRenderer"]);
      var _this$state2 = this.state,
          relayProp = _this$state2.relayProp,
          contextForChildren = _this$state2.contextForChildren;
      return /*#__PURE__*/React.createElement(ReactRelayContext.Provider, {
        value: contextForChildren
      }, /*#__PURE__*/React.createElement(Component, (0, _extends2["default"])({}, props, this.state.data, {
        ref: componentRef,
        relay: relayProp
      })));
    };

    return _class;
  }(React.Component), (0, _defineProperty2["default"])(_class, "displayName", containerName), _temp;
}

function getRelayProp(environment, refetch) {
  return {
    environment: environment,
    refetch: refetch
  };
}
/**
 * Wrap the basic `createContainer()` function with logic to adapt to the
 * `context.relay.environment` in which it is rendered. Specifically, the
 * extraction of the environment-specific version of fragments in the
 * `fragmentSpec` is memoized once per environment, rather than once per
 * instance of the container constructed/rendered.
 */


function createContainer(Component, fragmentSpec, taggedNode) {
  // $FlowFixMe[incompatible-return]
  return buildReactRelayContainer(Component, fragmentSpec, function (ComponentClass, fragments) {
    return createContainerWithFragments(ComponentClass, fragments, taggedNode);
  });
}

module.exports = {
  createContainer: createContainer
};

/***/ }),

/***/ 1948:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _typeof = __webpack_require__(3634);

var invariant = __webpack_require__(4990);

var isRelayEnvironment = __webpack_require__(6183);
/**
 * Asserts that the input is a matches the `RelayContext` type defined in
 * `RelayEnvironmentTypes` and returns it as that type.
 */


function assertRelayContext(relay) {
  !isRelayContext(relay) ?  false ? 0 : invariant(false) : void 0;
  return relay;
}
/**
 * Determine if the input is a plain object that matches the `RelayContext`
 * type defined in `RelayEnvironmentTypes`.
 */


function isRelayContext(context) {
  return _typeof(context) === 'object' && context !== null && !Array.isArray(context) && isRelayEnvironment(context.environment);
}

module.exports = {
  assertRelayContext: assertRelayContext,
  isRelayContext: isRelayContext
};

/***/ }),

/***/ 799:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _typeof = __webpack_require__(3634);

var invariant = __webpack_require__(4990);
/**
 * Fail fast if the user supplies invalid fragments as input.
 */


function assertFragmentMap(componentName, fragmentSpec) {
  !(fragmentSpec && _typeof(fragmentSpec) === 'object') ?  false ? 0 : invariant(false) : void 0;

  for (var key in fragmentSpec) {
    if (fragmentSpec.hasOwnProperty(key)) {
      var fragment = fragmentSpec[key];
      !(fragment && (_typeof(fragment) === 'object' || typeof fragment === 'function')) ?  false ? 0 : invariant(false) : void 0;
    }
  }
}

module.exports = assertFragmentMap;

/***/ }),

/***/ 2937:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _extends2 = _interopRequireDefault(__webpack_require__(3339));

var React = __webpack_require__(657);

var ReactRelayContext = __webpack_require__(5265);

var ReactRelayQueryRendererContext = __webpack_require__(9442);

var assertFragmentMap = __webpack_require__(799);

var invariant = __webpack_require__(4990);

var readContext = __webpack_require__(6742);

var _require = __webpack_require__(5728),
    getComponentName = _require.getComponentName,
    getContainerName = _require.getContainerName;

var _require2 = __webpack_require__(3271),
    getFragment = _require2.getFragment;
/**
 * Helper to create the Relay HOCs with ref forwarding, setting the displayName
 * and reading the React context.
 */


function buildReactRelayContainer(ComponentClass, fragmentSpec, createContainerWithFragments) {
  // Sanity-check user-defined fragment input
  var containerName = getContainerName(ComponentClass);
  assertFragmentMap(getComponentName(ComponentClass), fragmentSpec);
  var fragments = {};

  for (var key in fragmentSpec) {
    fragments[key] = getFragment(fragmentSpec[key]);
  }

  var Container = createContainerWithFragments(ComponentClass, fragments);
  Container.displayName = containerName;

  function forwardRef(props, ref) {
    var _queryRendererContext;

    var context = readContext(ReactRelayContext);
    !(context != null) ?  false ? 0 : invariant(false) : void 0;
    var queryRendererContext = readContext(ReactRelayQueryRendererContext);
    return /*#__PURE__*/React.createElement(Container, (0, _extends2["default"])({}, props, {
      __relayContext: context,
      __rootIsQueryRenderer: (_queryRendererContext = queryRendererContext === null || queryRendererContext === void 0 ? void 0 : queryRendererContext.rootIsQueryRenderer) !== null && _queryRendererContext !== void 0 ? _queryRendererContext : false,
      componentRef: props.componentRef || ref
    }));
  }

  forwardRef.displayName = containerName;
  var ForwardContainer = React.forwardRef(forwardRef);

  if (false) {} // $FlowFixMe[incompatible-return]


  return ForwardContainer;
}

module.exports = buildReactRelayContainer;

/***/ }),

/***/ 4290:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _objectSpread2 = _interopRequireDefault(__webpack_require__(4638));

var _require = __webpack_require__(3271),
    getSelector = _require.getSelector;

function getRootVariablesForFragments(fragments, props) {
  var rootVariables = {}; // NOTE: For extra safety, we make sure the rootVariables include the
  // variables from all owners in this fragmentSpec, even though they
  // should all point to the same owner

  Object.keys(fragments).forEach(function (key) {
    var _selector$selectors$, _selector$selectors$2, _selector$owner$varia;

    var fragmentNode = fragments[key];
    var fragmentRef = props[key];
    var selector = getSelector(fragmentNode, fragmentRef);
    var fragmentOwnerVariables = selector != null && selector.kind === 'PluralReaderSelector' ? (_selector$selectors$ = (_selector$selectors$2 = selector.selectors[0]) === null || _selector$selectors$2 === void 0 ? void 0 : _selector$selectors$2.owner.variables) !== null && _selector$selectors$ !== void 0 ? _selector$selectors$ : {} : (_selector$owner$varia = selector === null || selector === void 0 ? void 0 : selector.owner.variables) !== null && _selector$owner$varia !== void 0 ? _selector$owner$varia : {}; // $FlowFixMe[cannot-spread-interface]

    rootVariables = (0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, rootVariables), fragmentOwnerVariables);
  });
  return rootVariables;
}

module.exports = getRootVariablesForFragments;

/***/ }),

/***/ 1280:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var EntryPointContainer = __webpack_require__(3075);

var ReactRelayContext = __webpack_require__(5265);

var ReactRelayFragmentContainer = __webpack_require__(9265);

var ReactRelayLocalQueryRenderer = __webpack_require__(179);

var ReactRelayPaginationContainer = __webpack_require__(9710);

var ReactRelayQueryRenderer = __webpack_require__(6693);

var ReactRelayRefetchContainer = __webpack_require__(8181);

var RelayEnvironmentProvider = __webpack_require__(2588);

var RelayRuntime = __webpack_require__(3271);

var loadEntryPoint = __webpack_require__(274);

var useEntryPointLoader = __webpack_require__(1297);

var useFragment = __webpack_require__(4968);

var useLazyLoadQuery = __webpack_require__(7562);

var useMutation = __webpack_require__(8231);

var usePaginationFragment = __webpack_require__(9824);

var usePreloadedQuery = __webpack_require__(5543);

var useQueryLoader = __webpack_require__(2729);

var useRefetchableFragment = __webpack_require__(8931);

var useRelayEnvironment = __webpack_require__(9708);

var useSubscribeToInvalidationState = __webpack_require__(7874);

var useSubscription = __webpack_require__(312);

var _require = __webpack_require__(4652),
    loadQuery = _require.loadQuery;
/**
 * The public interface to react-relay.
 * Currently contains both Relay Hooks and legacy Container APIs.
 * Will eventually only export the interface from ./hooks.js.
 */


module.exports = {
  ConnectionHandler: RelayRuntime.ConnectionHandler,
  QueryRenderer: ReactRelayQueryRenderer,
  LocalQueryRenderer: ReactRelayLocalQueryRenderer,
  MutationTypes: RelayRuntime.MutationTypes,
  RangeOperations: RelayRuntime.RangeOperations,
  ReactRelayContext: ReactRelayContext,
  applyOptimisticMutation: RelayRuntime.applyOptimisticMutation,
  commitLocalUpdate: RelayRuntime.commitLocalUpdate,
  commitMutation: RelayRuntime.commitMutation,
  createFragmentContainer: ReactRelayFragmentContainer.createContainer,
  createPaginationContainer: ReactRelayPaginationContainer.createContainer,
  createRefetchContainer: ReactRelayRefetchContainer.createContainer,
  fetchQuery_DEPRECATED: RelayRuntime.fetchQuery_DEPRECATED,
  graphql: RelayRuntime.graphql,
  readInlineData: RelayRuntime.readInlineData,
  requestSubscription: RelayRuntime.requestSubscription,
  // Relay Hooks
  EntryPointContainer: EntryPointContainer,
  RelayEnvironmentProvider: RelayEnvironmentProvider,
  fetchQuery: RelayRuntime.fetchQuery,
  loadQuery: loadQuery,
  loadEntryPoint: loadEntryPoint,
  useFragment: useFragment,
  useLazyLoadQuery: useLazyLoadQuery,
  useEntryPointLoader: useEntryPointLoader,
  useQueryLoader: useQueryLoader,
  useMutation: useMutation,
  usePaginationFragment: usePaginationFragment,
  usePreloadedQuery: usePreloadedQuery,
  useRefetchableFragment: useRefetchableFragment,
  useRelayEnvironment: useRelayEnvironment,
  useSubscribeToInvalidationState: useSubscribeToInvalidationState,
  useSubscription: useSubscription
};

/***/ }),

/***/ 6183:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error

/**
 * Determine if a given value is an object that implements the `Environment`
 * interface defined in `RelayEnvironmentTypes`.
 */

var _typeof = __webpack_require__(3634);

function isRelayEnvironment(environment) {
  return _typeof(environment) === 'object' && environment !== null && // TODO: add applyMutation/sendMutation once ready in both cores
  typeof environment.check === 'function' && typeof environment.lookup === 'function' && typeof environment.retain === 'function' && typeof environment.execute === 'function' && typeof environment.subscribe === 'function';
}

module.exports = isRelayEnvironment;

/***/ }),

/***/ 6742:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var React = __webpack_require__(657);

var _React$__SECRET_INTER =
/* $FlowFixMe[prop-missing] Flow doesn't know about React's internals for
 * good reason, but for now, Relay needs the dispatcher to read context. */
React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    ReactCurrentDispatcher = _React$__SECRET_INTER.ReactCurrentDispatcher,
    ReactCurrentOwner = _React$__SECRET_INTER.ReactCurrentOwner;

function readContext(Context) {
  var dispatcher = ReactCurrentDispatcher != null ? ReactCurrentDispatcher.current : ReactCurrentOwner.currentDispatcher;
  return dispatcher.readContext(Context);
}

module.exports = readContext;

/***/ }),

/***/ 3075:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var ProfilerContext = __webpack_require__(5116);

var React = __webpack_require__(657);

var useRelayEnvironment = __webpack_require__(9708);

var warning = __webpack_require__(480);

var _require = __webpack_require__(657),
    useContext = _require.useContext,
    useEffect = _require.useEffect;

function EntryPointContainer(_ref) {
  var entryPointReference = _ref.entryPointReference,
      props = _ref.props;
   false ? 0 : void 0;
  var getComponent = entryPointReference.getComponent,
      queries = entryPointReference.queries,
      entryPoints = entryPointReference.entryPoints,
      extraProps = entryPointReference.extraProps,
      rootModuleID = entryPointReference.rootModuleID;
  var Component = getComponent();
  var profilerContext = useContext(ProfilerContext);
  var environment = useRelayEnvironment();
  useEffect(function () {
    environment.__log({
      name: 'entrypoint.root.consume',
      profilerContext: profilerContext,
      rootModuleID: rootModuleID
    });
  }, [environment, profilerContext, rootModuleID]);
  return /*#__PURE__*/React.createElement(Component, {
    entryPoints: entryPoints,
    extraProps: extraProps,
    props: props,
    queries: queries
  });
}

module.exports = EntryPointContainer;

/***/ }),

/***/ 9495:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @emails oncall+relay
 * @format
 */
// flowlint ambiguous-object-type:error


var _typeof = __webpack_require__(3634);

var _interopRequireDefault = __webpack_require__(249);

var _objectSpread2 = _interopRequireDefault(__webpack_require__(4638));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(3749));

var LRUCache = __webpack_require__(446);

var invariant = __webpack_require__(4990);

var _require = __webpack_require__(3271),
    getPromiseForActiveRequest = _require.__internal.getPromiseForActiveRequest,
    getFragmentIdentifier = _require.getFragmentIdentifier,
    getSelector = _require.getSelector,
    isPromise = _require.isPromise,
    recycleNodesInto = _require.recycleNodesInto,
    reportMissingRequiredFields = _require.reportMissingRequiredFields;

var WEAKMAP_SUPPORTED = typeof WeakMap === 'function'; // TODO: Fix to not rely on LRU. If the number of active fragments exceeds this
// capacity, readSpec() will fail to find cached entries and break object
// identity even if data hasn't changed.

var CACHE_CAPACITY = 1000000; // this is frozen so that users don't accidentally push data into the array

var CONSTANT_READONLY_EMPTY_ARRAY = Object.freeze([]);

function isMissingData(snapshot) {
  if (Array.isArray(snapshot)) {
    return snapshot.some(function (s) {
      return s.isMissingData;
    });
  }

  return snapshot.isMissingData;
}

function getFragmentResult(cacheKey, snapshot) {
  if (Array.isArray(snapshot)) {
    return {
      cacheKey: cacheKey,
      snapshot: snapshot,
      data: snapshot.map(function (s) {
        return s.data;
      })
    };
  }

  return {
    cacheKey: cacheKey,
    snapshot: snapshot,
    data: snapshot.data
  };
}

function getPromiseForPendingOperationAffectingOwner(environment, request) {
  return environment.getOperationTracker().getPromiseForPendingOperationsAffectingOwner(request);
}

var FragmentResourceImpl = /*#__PURE__*/function () {
  function FragmentResourceImpl(environment) {
    this._environment = environment;
    this._cache = LRUCache.create(CACHE_CAPACITY);
  }
  /**
   * This function should be called during a Component's render function,
   * to read the data for a fragment, or suspend if the fragment is being
   * fetched.
   */


  var _proto = FragmentResourceImpl.prototype;

  _proto.read = function read(fragmentNode, fragmentRef, componentDisplayName, fragmentKey) {
    return this.readWithIdentifier(fragmentNode, fragmentRef, getFragmentIdentifier(fragmentNode, fragmentRef), componentDisplayName, fragmentKey);
  }
  /**
   * Like `read`, but with a pre-computed fragmentIdentifier that should be
   * equal to `getFragmentIdentifier(fragmentNode, fragmentRef)` from the
   * arguments.
   */
  ;

  _proto.readWithIdentifier = function readWithIdentifier(fragmentNode, fragmentRef, fragmentIdentifier, componentDisplayName, fragmentKey) {
    var _fragmentNode$metadat;

    var environment = this._environment; // If fragmentRef is null or undefined, pass it directly through.
    // This is a convenience when consuming fragments via a HOC API, when the
    // prop corresponding to the fragment ref might be passed as null.

    if (fragmentRef == null) {
      return {
        cacheKey: fragmentIdentifier,
        data: null,
        snapshot: null
      };
    } // If fragmentRef is plural, ensure that it is an array.
    // If it's empty, return the empty array directly before doing any more work.


    if ((fragmentNode === null || fragmentNode === void 0 ? void 0 : (_fragmentNode$metadat = fragmentNode.metadata) === null || _fragmentNode$metadat === void 0 ? void 0 : _fragmentNode$metadat.plural) === true) {
      !Array.isArray(fragmentRef) ?  false ? 0 : invariant(false) : void 0;

      if (fragmentRef.length === 0) {
        return {
          cacheKey: fragmentIdentifier,
          data: CONSTANT_READONLY_EMPTY_ARRAY,
          snapshot: CONSTANT_READONLY_EMPTY_ARRAY
        };
      }
    } // Now we actually attempt to read the fragment:
    // 1. Check if there's a cached value for this fragment


    var cachedValue = this._cache.get(fragmentIdentifier);

    if (cachedValue != null) {
      if (isPromise(cachedValue)) {
        throw cachedValue;
      }

      if (cachedValue.snapshot) {
        this._reportMissingRequiredFieldsInSnapshot(cachedValue.snapshot);

        return cachedValue;
      }
    } // 2. If not, try reading the fragment from the Relay store.
    // If the snapshot has data, return it and save it in cache


    var fragmentSelector = getSelector(fragmentNode, fragmentRef);
    !(fragmentSelector != null) ?  false ? 0 : invariant(false) : void 0;
    var snapshot = fragmentSelector.kind === 'PluralReaderSelector' ? fragmentSelector.selectors.map(function (s) {
      return environment.lookup(s);
    }) : environment.lookup(fragmentSelector);
    var fragmentOwner = fragmentSelector.kind === 'PluralReaderSelector' ? fragmentSelector.selectors[0].owner : fragmentSelector.owner;

    if (!isMissingData(snapshot)) {
      this._reportMissingRequiredFieldsInSnapshot(snapshot);

      var fragmentResult = getFragmentResult(fragmentIdentifier, snapshot);

      this._cache.set(fragmentIdentifier, fragmentResult);

      return fragmentResult;
    } // 3. If we don't have data in the store, check if a request is in
    // flight for the fragment's parent query, or for another operation
    // that may affect the parent's query data, such as a mutation
    // or subscription. If a promise exists, cache the promise and use it
    // to suspend.


    var networkPromise = this._getAndSavePromiseForFragmentRequestInFlight(fragmentIdentifier, fragmentNode, fragmentOwner);

    if (networkPromise != null) {
      throw networkPromise;
    }

    this._reportMissingRequiredFieldsInSnapshot(snapshot);

    return getFragmentResult(fragmentIdentifier, snapshot);
  };

  _proto._reportMissingRequiredFieldsInSnapshot = function _reportMissingRequiredFieldsInSnapshot(snapshot) {
    var _this = this;

    if (Array.isArray(snapshot)) {
      snapshot.forEach(function (s) {
        if (s.missingRequiredFields != null) {
          reportMissingRequiredFields(_this._environment, s.missingRequiredFields);
        }
      });
    } else {
      if (snapshot.missingRequiredFields != null) {
        reportMissingRequiredFields(this._environment, snapshot.missingRequiredFields);
      }
    }
  };

  _proto.readSpec = function readSpec(fragmentNodes, fragmentRefs, componentDisplayName) {
    var result = {};

    for (var _key in fragmentNodes) {
      result[_key] = this.read(fragmentNodes[_key], fragmentRefs[_key], componentDisplayName, _key);
    }

    return result;
  };

  _proto.subscribe = function subscribe(fragmentResult, callback) {
    var _this2 = this;

    var environment = this._environment;
    var cacheKey = fragmentResult.cacheKey;
    var renderedSnapshot = fragmentResult.snapshot;

    if (!renderedSnapshot) {
      return {
        dispose: function dispose() {}
      };
    } // 1. Check for any updates missed during render phase
    // TODO(T44066760): More efficiently detect if we missed an update


    var _this$checkMissedUpda = this.checkMissedUpdates(fragmentResult),
        didMissUpdates = _this$checkMissedUpda[0],
        currentSnapshot = _this$checkMissedUpda[1]; // 2. If an update was missed, notify the component so it updates with
    // the latest data.


    if (didMissUpdates) {
      callback();
    } // 3. Establish subscriptions on the snapshot(s)


    var dataSubscriptions = [];

    if (Array.isArray(renderedSnapshot)) {
      !Array.isArray(currentSnapshot) ?  false ? 0 : invariant(false) : void 0;
      currentSnapshot.forEach(function (snapshot, idx) {
        dataSubscriptions.push(environment.subscribe(snapshot, function (latestSnapshot) {
          _this2._updatePluralSnapshot(cacheKey, currentSnapshot, latestSnapshot, idx);

          callback();
        }));
      });
    } else {
      !(currentSnapshot != null && !Array.isArray(currentSnapshot)) ?  false ? 0 : invariant(false) : void 0;
      dataSubscriptions.push(environment.subscribe(currentSnapshot, function (latestSnapshot) {
        _this2._cache.set(cacheKey, getFragmentResult(cacheKey, latestSnapshot));

        callback();
      }));
    }

    return {
      dispose: function dispose() {
        dataSubscriptions.map(function (s) {
          return s.dispose();
        });

        _this2._cache["delete"](cacheKey);
      }
    };
  };

  _proto.subscribeSpec = function subscribeSpec(fragmentResults, callback) {
    var _this3 = this;

    var disposables = Object.keys(fragmentResults).map(function (key) {
      return _this3.subscribe(fragmentResults[key], callback);
    });
    return {
      dispose: function dispose() {
        disposables.forEach(function (disposable) {
          disposable.dispose();
        });
      }
    };
  };

  _proto.checkMissedUpdates = function checkMissedUpdates(fragmentResult) {
    var environment = this._environment;
    var cacheKey = fragmentResult.cacheKey;
    var renderedSnapshot = fragmentResult.snapshot;

    if (!renderedSnapshot) {
      return [false, null];
    }

    var didMissUpdates = false;

    if (Array.isArray(renderedSnapshot)) {
      var currentSnapshots = [];
      renderedSnapshot.forEach(function (snapshot, idx) {
        var currentSnapshot = environment.lookup(snapshot.selector);
        var renderData = snapshot.data;
        var currentData = currentSnapshot.data;
        var updatedData = recycleNodesInto(renderData, currentData);

        if (updatedData !== renderData) {
          currentSnapshot = (0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, currentSnapshot), {}, {
            data: updatedData
          });
          didMissUpdates = true;
        }

        currentSnapshots[idx] = currentSnapshot;
      });

      if (didMissUpdates) {
        this._cache.set(cacheKey, getFragmentResult(cacheKey, currentSnapshots));
      }

      return [didMissUpdates, currentSnapshots];
    }

    var currentSnapshot = environment.lookup(renderedSnapshot.selector);
    var renderData = renderedSnapshot.data;
    var currentData = currentSnapshot.data;
    var updatedData = recycleNodesInto(renderData, currentData);
    currentSnapshot = {
      data: updatedData,
      isMissingData: currentSnapshot.isMissingData,
      seenRecords: currentSnapshot.seenRecords,
      selector: currentSnapshot.selector,
      missingRequiredFields: currentSnapshot.missingRequiredFields
    };

    if (updatedData !== renderData) {
      this._cache.set(cacheKey, getFragmentResult(cacheKey, currentSnapshot));

      didMissUpdates = true;
    }

    return [didMissUpdates, currentSnapshot];
  };

  _proto.checkMissedUpdatesSpec = function checkMissedUpdatesSpec(fragmentResults) {
    var _this4 = this;

    return Object.keys(fragmentResults).some(function (key) {
      return _this4.checkMissedUpdates(fragmentResults[key])[0];
    });
  };

  _proto._getAndSavePromiseForFragmentRequestInFlight = function _getAndSavePromiseForFragmentRequestInFlight(cacheKey, fragmentNode, fragmentOwner) {
    var _this5 = this;

    var _getPromiseForActiveR;

    var environment = this._environment;
    var networkPromise = (_getPromiseForActiveR = getPromiseForActiveRequest(environment, fragmentOwner)) !== null && _getPromiseForActiveR !== void 0 ? _getPromiseForActiveR : getPromiseForPendingOperationAffectingOwner(environment, fragmentOwner);

    if (!networkPromise) {
      return null;
    } // When the Promise for the request resolves, we need to make sure to
    // update the cache with the latest data available in the store before
    // resolving the Promise


    var promise = networkPromise.then(function () {
      _this5._cache["delete"](cacheKey);
    })["catch"](function (error) {
      _this5._cache["delete"](cacheKey);
    });

    this._cache.set(cacheKey, promise);

    var queryName = fragmentOwner.node.params.name;
    var fragmentName = fragmentNode.name;
    var promiseDisplayName = queryName === fragmentName ? "Relay(".concat(queryName, ")") : "Relay(".concat(queryName, ":").concat(fragmentName, ")"); // $FlowExpectedError[prop-missing] Expando to annotate Promises.

    promise.displayName = promiseDisplayName;
    return promise;
  };

  _proto._updatePluralSnapshot = function _updatePluralSnapshot(cacheKey, baseSnapshots, latestSnapshot, idx) {
    var currentFragmentResult = this._cache.get(cacheKey);

    if (isPromise(currentFragmentResult)) {
      reportInvalidCachedData(latestSnapshot.selector.node.name);
      return;
    }

    var currentSnapshot = currentFragmentResult === null || currentFragmentResult === void 0 ? void 0 : currentFragmentResult.snapshot;

    if (currentSnapshot && !Array.isArray(currentSnapshot)) {
      reportInvalidCachedData(latestSnapshot.selector.node.name);
      return;
    }

    var nextSnapshots = currentSnapshot ? (0, _toConsumableArray2["default"])(currentSnapshot) : (0, _toConsumableArray2["default"])(baseSnapshots);
    nextSnapshots[idx] = latestSnapshot;

    this._cache.set(cacheKey, getFragmentResult(cacheKey, nextSnapshots));
  };

  return FragmentResourceImpl;
}();

function reportInvalidCachedData(nodeName) {
   true ?  false ? 0 : invariant(false) : 0;
}

function createFragmentResource(environment) {
  return new FragmentResourceImpl(environment);
}

var dataResources = WEAKMAP_SUPPORTED ? new WeakMap() : new Map();

function getFragmentResourceForEnvironment(environment) {
  var cached = dataResources.get(environment);

  if (cached) {
    return cached;
  }

  var newDataResource = createFragmentResource(environment);
  dataResources.set(environment, newDataResource);
  return newDataResource;
}

module.exports = {
  createFragmentResource: createFragmentResource,
  getFragmentResourceForEnvironment: getFragmentResourceForEnvironment
};

/***/ }),

/***/ 446:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @emails oncall+relay
 * @format
 */
// flowlint ambiguous-object-type:error


var invariant = __webpack_require__(4990);
/**
 * JS maps (both plain objects and Map) maintain key insertion
 * order, which means there is an easy way to simulate LRU behavior
 * that should also perform quite well:
 *
 * To insert a new value, first delete the key from the inner _map,
 * then _map.set(k, v). By deleting and reinserting, you ensure that the
 * map sees the key as the last inserted key.
 *
 * Get does the same: if the key is present, delete and reinsert it.
 */


var LRUCache = /*#__PURE__*/function () {
  function LRUCache(capacity) {
    this._capacity = capacity;
    !(this._capacity > 0) ?  false ? 0 : invariant(false) : void 0;
    this._map = new Map();
  }

  var _proto = LRUCache.prototype;

  _proto.set = function set(key, value) {
    this._map["delete"](key);

    this._map.set(key, value);

    if (this._map.size > this._capacity) {
      var firstKey = this._map.keys().next();

      if (!firstKey.done) {
        this._map["delete"](firstKey.value);
      }
    }
  };

  _proto.get = function get(key) {
    var value = this._map.get(key);

    if (value != null) {
      this._map["delete"](key);

      this._map.set(key, value);
    }

    return value;
  };

  _proto.has = function has(key) {
    return this._map.has(key);
  };

  _proto["delete"] = function _delete(key) {
    this._map["delete"](key);
  };

  _proto.size = function size() {
    return this._map.size;
  };

  _proto.capacity = function capacity() {
    return this._capacity - this._map.size;
  };

  _proto.clear = function clear() {
    this._map.clear();
  };

  return LRUCache;
}();

function create(capacity) {
  return new LRUCache(capacity);
}

module.exports = {
  create: create
};

/***/ }),

/***/ 5116:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error
// This contextual profiler can be used to wrap a react sub-tree. It will bind
// the RelayProfiler during the render phase of these components. Allows
// collecting metrics for a specific part of your application.


var React = __webpack_require__(657);

var ProfilerContext = React.createContext({
  wrapPrepareQueryResource: function wrapPrepareQueryResource(cb) {
    return cb();
  }
});
module.exports = ProfilerContext;

/***/ }),

/***/ 9267:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @emails oncall+relay
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _objectSpread2 = _interopRequireDefault(__webpack_require__(4638));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3116));

var LRUCache = __webpack_require__(446);

var invariant = __webpack_require__(4990);

var _require = __webpack_require__(3271),
    isPromise = _require.isPromise;

var CACHE_CAPACITY = 1000;
var DEFAULT_FETCH_POLICY = 'store-or-network';
var DATA_RETENTION_TIMEOUT = 5 * 60 * 1000;
var WEAKMAP_SUPPORTED = typeof WeakMap === 'function';

function getQueryCacheIdentifier(environment, operation, maybeFetchPolicy, maybeRenderPolicy, cacheBreaker) {
  var fetchPolicy = maybeFetchPolicy !== null && maybeFetchPolicy !== void 0 ? maybeFetchPolicy : DEFAULT_FETCH_POLICY;
  var renderPolicy = maybeRenderPolicy !== null && maybeRenderPolicy !== void 0 ? maybeRenderPolicy : environment.UNSTABLE_getDefaultRenderPolicy();
  var cacheIdentifier = "".concat(fetchPolicy, "-").concat(renderPolicy, "-").concat(operation.request.identifier);

  if (cacheBreaker != null) {
    return "".concat(cacheIdentifier, "-").concat(cacheBreaker);
  }

  return cacheIdentifier;
}

function getQueryResult(operation, cacheIdentifier) {
  var rootFragmentRef = {
    __id: operation.fragment.dataID,
    __fragments: (0, _defineProperty2["default"])({}, operation.fragment.node.name, operation.request.variables),
    __fragmentOwner: operation.request
  };
  return {
    cacheIdentifier: cacheIdentifier,
    fragmentNode: operation.request.node.fragment,
    fragmentRef: rootFragmentRef,
    operation: operation
  };
}

var nextID = 200000;

function createCacheEntry(cacheIdentifier, operation, value, networkSubscription, onDispose) {
  var currentValue = value;
  var retainCount = 0;
  var retainDisposable = null;
  var releaseTemporaryRetain = null;
  var currentNetworkSubscription = networkSubscription;

  var retain = function retain(environment) {
    retainCount++;

    if (retainCount === 1) {
      retainDisposable = environment.retain(operation);
    }

    return {
      dispose: function dispose() {
        retainCount = Math.max(0, retainCount - 1);

        if (retainCount === 0) {
          !(retainDisposable != null) ?  false ? 0 : invariant(false) : void 0;
          retainDisposable.dispose();
          retainDisposable = null;
        }

        onDispose(cacheEntry);
      }
    };
  };

  var cacheEntry = {
    cacheIdentifier: cacheIdentifier,
    id: nextID++,
    getValue: function getValue() {
      return currentValue;
    },
    setValue: function setValue(val) {
      currentValue = val;
    },
    getRetainCount: function getRetainCount() {
      return retainCount;
    },
    getNetworkSubscription: function getNetworkSubscription() {
      return currentNetworkSubscription;
    },
    setNetworkSubscription: function setNetworkSubscription(subscription) {
      if (currentNetworkSubscription != null) {
        currentNetworkSubscription.unsubscribe();
      }

      currentNetworkSubscription = subscription;
    },
    temporaryRetain: function temporaryRetain(environment) {
      // NOTE: If we're executing in a server environment, there's no need
      // to create temporary retains, since the component will never commit.
      if (environment.isServer()) {
        return {
          dispose: function dispose() {}
        };
      } // NOTE: temporaryRetain is called during the render phase. However,
      // given that we can't tell if this render will eventually commit or not,
      // we create a timer to autodispose of this retain in case the associated
      // component never commits.
      // If the component /does/ commit, permanentRetain will clear this timeout
      // and permanently retain the data.


      var disposable = retain(environment);
      var releaseQueryTimeout = null;

      var localReleaseTemporaryRetain = function localReleaseTemporaryRetain() {
        clearTimeout(releaseQueryTimeout);
        releaseQueryTimeout = null;
        releaseTemporaryRetain = null;
        disposable.dispose(); // Normally if this entry never commits, the request would've ended by the
        // time this timeout expires and the temporary retain is released. However,
        // we need to do this for live queries which remain open indefinitely.

        if (retainCount <= 0 && currentNetworkSubscription != null) {
          currentNetworkSubscription.unsubscribe();
        }
      };

      releaseQueryTimeout = setTimeout(localReleaseTemporaryRetain, DATA_RETENTION_TIMEOUT); // NOTE: Since temporaryRetain can be called multiple times, we release
      // the previous temporary retain after we re-establish a new one, since
      // we only ever need a single temporary retain until the permanent retain is
      // established.
      // temporaryRetain may be called multiple times by React during the render
      // phase, as well as multiple times by other query components that are
      // rendering the same query/variables.

      if (releaseTemporaryRetain != null) {
        releaseTemporaryRetain();
      }

      releaseTemporaryRetain = localReleaseTemporaryRetain;
      return {
        dispose: function dispose() {
          releaseTemporaryRetain && releaseTemporaryRetain();
        }
      };
    },
    permanentRetain: function permanentRetain(environment) {
      var disposable = retain(environment);

      if (releaseTemporaryRetain != null) {
        releaseTemporaryRetain();
        releaseTemporaryRetain = null;
      }

      return {
        dispose: function dispose() {
          disposable.dispose();

          if (retainCount <= 0 && currentNetworkSubscription != null) {
            currentNetworkSubscription.unsubscribe();
          }
        }
      };
    }
  };
  return cacheEntry;
}

var QueryResourceImpl = /*#__PURE__*/function () {
  function QueryResourceImpl(environment) {
    var _this = this;

    (0, _defineProperty2["default"])(this, "_clearCacheEntry", function (cacheEntry) {
      if (cacheEntry.getRetainCount() <= 0) {
        _this._cache["delete"](cacheEntry.cacheIdentifier);
      }
    });
    this._environment = environment;
    this._cache = LRUCache.create(CACHE_CAPACITY);
  }

  var _proto = QueryResourceImpl.prototype;

  _proto.prepare = function prepare(operation, fetchObservable, maybeFetchPolicy, maybeRenderPolicy, observer, cacheBreaker, profilerContext) {
    var cacheIdentifier = getQueryCacheIdentifier(this._environment, operation, maybeFetchPolicy, maybeRenderPolicy, cacheBreaker);
    return this.prepareWithIdentifier(cacheIdentifier, operation, fetchObservable, maybeFetchPolicy, maybeRenderPolicy, observer, profilerContext);
  }
  /**
   * This function should be called during a Component's render function,
   * to either read an existing cached value for the query, or fetch the query
   * and suspend.
   */
  ;

  _proto.prepareWithIdentifier = function prepareWithIdentifier(cacheIdentifier, operation, fetchObservable, maybeFetchPolicy, maybeRenderPolicy, observer, profilerContext) {
    var environment = this._environment;
    var fetchPolicy = maybeFetchPolicy !== null && maybeFetchPolicy !== void 0 ? maybeFetchPolicy : DEFAULT_FETCH_POLICY;
    var renderPolicy = maybeRenderPolicy !== null && maybeRenderPolicy !== void 0 ? maybeRenderPolicy : environment.UNSTABLE_getDefaultRenderPolicy(); // 1. Check if there's a cached value for this operation, and reuse it if
    // it's available

    var cacheEntry = this._cache.get(cacheIdentifier);

    var temporaryRetainDisposable = null;

    if (cacheEntry == null) {
      // 2. If a cached value isn't available, try fetching the operation.
      // _fetchAndSaveQuery will update the cache with either a Promise or
      // an Error to throw, or a QueryResult to return.
      cacheEntry = this._fetchAndSaveQuery(cacheIdentifier, operation, fetchObservable, fetchPolicy, renderPolicy, profilerContext, (0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, observer), {}, {
        unsubscribe: function unsubscribe(subscription) {
          // 4. If the request is cancelled, make sure to dispose
          // of the temporary retain; this will ensure that a promise
          // doesn't remain unnecessarily cached until the temporary retain
          // expires. Not clearing the temporary retain might cause the
          // query to incorrectly re-suspend.
          if (temporaryRetainDisposable != null) {
            temporaryRetainDisposable.dispose();
          }

          var observerUnsubscribe = observer === null || observer === void 0 ? void 0 : observer.unsubscribe;
          observerUnsubscribe && observerUnsubscribe(subscription);
        }
      }));
    } // 3. Temporarily retain here in render phase. When the component reading
    // the operation is committed, we will transfer ownership of data retention
    // to the component.
    // In case the component never commits (mounts or updates) from this render,
    // this data retention hold will auto-release itself after a timeout.


    temporaryRetainDisposable = cacheEntry.temporaryRetain(environment);
    var cachedValue = cacheEntry.getValue();

    if (isPromise(cachedValue) || cachedValue instanceof Error) {
      throw cachedValue;
    }

    return cachedValue;
  }
  /**
   * This function should be called during a component's commit phase
   * (e.g. inside useEffect), in order to retain the operation in the Relay store
   * and transfer ownership of the operation to the component lifecycle.
   */
  ;

  _proto.retain = function retain(queryResult, profilerContext) {
    var environment = this._environment;
    var cacheIdentifier = queryResult.cacheIdentifier,
        operation = queryResult.operation;

    var cacheEntry = this._getOrCreateCacheEntry(cacheIdentifier, operation, queryResult, null);

    var disposable = cacheEntry.permanentRetain(environment);

    environment.__log({
      name: 'queryresource.retain',
      profilerContext: profilerContext,
      resourceID: cacheEntry.id
    });

    return {
      dispose: function dispose() {
        disposable.dispose();
      }
    };
  };

  _proto.TESTS_ONLY__getCacheEntry = function TESTS_ONLY__getCacheEntry(operation, maybeFetchPolicy, maybeRenderPolicy, cacheBreaker) {
    var environment = this._environment;
    var cacheIdentifier = getQueryCacheIdentifier(environment, operation, maybeFetchPolicy, maybeRenderPolicy, cacheBreaker);
    return this._cache.get(cacheIdentifier);
  };

  _proto._getOrCreateCacheEntry = function _getOrCreateCacheEntry(cacheIdentifier, operation, value, networkSubscription) {
    var cacheEntry = this._cache.get(cacheIdentifier);

    if (cacheEntry == null) {
      cacheEntry = createCacheEntry(cacheIdentifier, operation, value, networkSubscription, this._clearCacheEntry);

      this._cache.set(cacheIdentifier, cacheEntry);
    }

    return cacheEntry;
  };

  _proto._fetchAndSaveQuery = function _fetchAndSaveQuery(cacheIdentifier, operation, fetchObservable, fetchPolicy, renderPolicy, profilerContext, observer) {
    var _this2 = this;

    var environment = this._environment; // NOTE: Running `check` will write missing data to the store using any
    // missing data handlers specified on the environment;
    // We run it here first to make the handlers get a chance to populate
    // missing data.

    var queryAvailability = environment.check(operation);
    var queryStatus = queryAvailability.status;
    var hasFullQuery = queryStatus === 'available';
    var canPartialRender = hasFullQuery || renderPolicy === 'partial' && queryStatus !== 'stale';
    var shouldFetch;
    var shouldAllowRender;

    var resolveNetworkPromise = function resolveNetworkPromise() {};

    switch (fetchPolicy) {
      case 'store-only':
        {
          shouldFetch = false;
          shouldAllowRender = true;
          break;
        }

      case 'store-or-network':
        {
          shouldFetch = !hasFullQuery;
          shouldAllowRender = canPartialRender;
          break;
        }

      case 'store-and-network':
        {
          shouldFetch = true;
          shouldAllowRender = canPartialRender;
          break;
        }

      case 'network-only':
      default:
        {
          shouldFetch = true;
          shouldAllowRender = false;
          break;
        }
    } // NOTE: If this value is false, we will cache a promise for this
    // query, which means we will suspend here at this query root.
    // If it's true, we will cache the query resource and allow rendering to
    // continue.


    if (shouldAllowRender) {
      var queryResult = getQueryResult(operation, cacheIdentifier);

      var _cacheEntry = createCacheEntry(cacheIdentifier, operation, queryResult, null, this._clearCacheEntry);

      this._cache.set(cacheIdentifier, _cacheEntry);
    }

    if (shouldFetch) {
      var _queryResult = getQueryResult(operation, cacheIdentifier);

      var networkSubscription;
      fetchObservable.subscribe({
        start: function start(subscription) {
          networkSubscription = subscription;

          var cacheEntry = _this2._cache.get(cacheIdentifier);

          if (cacheEntry) {
            cacheEntry.setNetworkSubscription(networkSubscription);
          }

          var observerStart = observer === null || observer === void 0 ? void 0 : observer.start;
          observerStart && observerStart(subscription);
        },
        next: function next() {
          var snapshot = environment.lookup(operation.fragment);

          var cacheEntry = _this2._getOrCreateCacheEntry(cacheIdentifier, operation, _queryResult, networkSubscription);

          cacheEntry.setValue(_queryResult);
          resolveNetworkPromise();
          var observerNext = observer === null || observer === void 0 ? void 0 : observer.next;
          observerNext && observerNext(snapshot);
        },
        error: function error(_error) {
          var cacheEntry = _this2._getOrCreateCacheEntry(cacheIdentifier, operation, _error, networkSubscription);

          cacheEntry.setValue(_error);
          resolveNetworkPromise();
          networkSubscription = null;
          cacheEntry.setNetworkSubscription(null);
          var observerError = observer === null || observer === void 0 ? void 0 : observer.error;
          observerError && observerError(_error);
        },
        complete: function complete() {
          resolveNetworkPromise();
          networkSubscription = null;

          var cacheEntry = _this2._cache.get(cacheIdentifier);

          if (cacheEntry) {
            cacheEntry.setNetworkSubscription(null);
          }

          var observerComplete = observer === null || observer === void 0 ? void 0 : observer.complete;
          observerComplete && observerComplete();
        },
        unsubscribe: observer === null || observer === void 0 ? void 0 : observer.unsubscribe
      });

      var _cacheEntry2 = this._cache.get(cacheIdentifier);

      if (!_cacheEntry2) {
        var networkPromise = new Promise(function (resolve) {
          resolveNetworkPromise = resolve;
        }); // $FlowExpectedError[prop-missing] Expando to annotate Promises.

        networkPromise.displayName = 'Relay(' + operation.fragment.node.name + ')';
        _cacheEntry2 = createCacheEntry(cacheIdentifier, operation, networkPromise, networkSubscription, this._clearCacheEntry);

        this._cache.set(cacheIdentifier, _cacheEntry2);
      }
    } else {
      var observerComplete = observer === null || observer === void 0 ? void 0 : observer.complete;
      observerComplete && observerComplete();
    }

    var cacheEntry = this._cache.get(cacheIdentifier);

    !(cacheEntry != null) ?  false ? 0 : invariant(false) : void 0;

    environment.__log({
      name: 'queryresource.fetch',
      resourceID: cacheEntry.id,
      operation: operation,
      profilerContext: profilerContext,
      fetchPolicy: fetchPolicy,
      renderPolicy: renderPolicy,
      queryAvailability: queryAvailability,
      shouldFetch: shouldFetch
    });

    return cacheEntry;
  };

  return QueryResourceImpl;
}();

function createQueryResource(environment) {
  return new QueryResourceImpl(environment);
}

var dataResources = WEAKMAP_SUPPORTED ? new WeakMap() : new Map();

function getQueryResourceForEnvironment(environment) {
  var cached = dataResources.get(environment);

  if (cached) {
    return cached;
  }

  var newDataResource = createQueryResource(environment);
  dataResources.set(environment, newDataResource);
  return newDataResource;
}

module.exports = {
  createQueryResource: createQueryResource,
  getQueryResourceForEnvironment: getQueryResourceForEnvironment,
  getQueryCacheIdentifier: getQueryCacheIdentifier
};

/***/ }),

/***/ 2588:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var React = __webpack_require__(657);

var ReactRelayContext = __webpack_require__(5569);

var useMemo = React.useMemo;

function RelayEnvironmentProvider(props) {
  var children = props.children,
      environment = props.environment;
  var context = useMemo(function () {
    return {
      environment: environment
    };
  }, [environment]);
  return /*#__PURE__*/React.createElement(ReactRelayContext.Provider, {
    value: context
  }, children);
}

module.exports = RelayEnvironmentProvider;

/***/ }),

/***/ 3216:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var getRefetchMetadata = __webpack_require__(6469);

var invariant = __webpack_require__(4990);

function getPaginationMetadata(fragmentNode, componentDisplayName) {
  var _fragmentNode$metadat, _fragmentNode$metadat2;

  var _getRefetchMetadata = getRefetchMetadata(fragmentNode, componentDisplayName),
      paginationRequest = _getRefetchMetadata.refetchableRequest,
      refetchMetadata = _getRefetchMetadata.refetchMetadata;

  var paginationMetadata = refetchMetadata.connection;
  !(paginationMetadata != null) ?  false ? 0 : invariant(false) : void 0;
  var connectionPathInFragmentData = paginationMetadata.path;
  var connectionMetadata = ((_fragmentNode$metadat = (_fragmentNode$metadat2 = fragmentNode.metadata) === null || _fragmentNode$metadat2 === void 0 ? void 0 : _fragmentNode$metadat2.connection) !== null && _fragmentNode$metadat !== void 0 ? _fragmentNode$metadat : [])[0];
  !(connectionMetadata != null) ?  false ? 0 : invariant(false) : void 0;
  var identifierField = refetchMetadata.identifierField;
  !(identifierField == null || typeof identifierField === 'string') ?  false ? 0 : invariant(false) : void 0;
  return {
    connectionPathInFragmentData: connectionPathInFragmentData,
    identifierField: identifierField,
    paginationRequest: paginationRequest,
    paginationMetadata: paginationMetadata,
    stream: connectionMetadata.stream === true
  };
}

module.exports = getPaginationMetadata;

/***/ }),

/***/ 8780:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3116));

var _objectSpread4 = _interopRequireDefault(__webpack_require__(4638));

var invariant = __webpack_require__(4990);

var warning = __webpack_require__(480);

function getPaginationVariables(direction, count, cursor, baseVariables, extraVariables, paginationMetadata) {
  var _objectSpread3;

  var backwardMetadata = paginationMetadata.backward,
      forwardMetadata = paginationMetadata.forward;

  if (direction === 'backward') {
    var _objectSpread2;

    !(backwardMetadata != null && backwardMetadata.count != null && backwardMetadata.cursor != null) ?  false ? 0 : invariant(false) : void 0;
     false ? 0 : void 0;
     false ? 0 : void 0; // $FlowFixMe[cannot-spread-interface]

    var _paginationVariables = (0, _objectSpread4["default"])((0, _objectSpread4["default"])((0, _objectSpread4["default"])({}, baseVariables), extraVariables), {}, (_objectSpread2 = {}, (0, _defineProperty2["default"])(_objectSpread2, backwardMetadata.cursor, cursor), (0, _defineProperty2["default"])(_objectSpread2, backwardMetadata.count, count), _objectSpread2));

    if (forwardMetadata && forwardMetadata.cursor) {
      _paginationVariables[forwardMetadata.cursor] = null;
    }

    if (forwardMetadata && forwardMetadata.count) {
      _paginationVariables[forwardMetadata.count] = null;
    }

    return _paginationVariables;
  }

  !(forwardMetadata != null && forwardMetadata.count != null && forwardMetadata.cursor != null) ?  false ? 0 : invariant(false) : void 0;
   false ? 0 : void 0;
   false ? 0 : void 0; // $FlowFixMe[cannot-spread-interface]

  var paginationVariables = (0, _objectSpread4["default"])((0, _objectSpread4["default"])((0, _objectSpread4["default"])({}, baseVariables), extraVariables), {}, (_objectSpread3 = {}, (0, _defineProperty2["default"])(_objectSpread3, forwardMetadata.cursor, cursor), (0, _defineProperty2["default"])(_objectSpread3, forwardMetadata.count, count), _objectSpread3));

  if (backwardMetadata && backwardMetadata.cursor) {
    paginationVariables[backwardMetadata.cursor] = null;
  }

  if (backwardMetadata && backwardMetadata.count) {
    paginationVariables[backwardMetadata.count] = null;
  }

  return paginationVariables;
}

module.exports = getPaginationVariables;

/***/ }),

/***/ 6469:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var invariant = __webpack_require__(4990);

function getRefetchMetadata(fragmentNode, componentDisplayName) {
  var _fragmentNode$metadat, _fragmentNode$metadat2;

  !(((_fragmentNode$metadat = fragmentNode.metadata) === null || _fragmentNode$metadat === void 0 ? void 0 : _fragmentNode$metadat.plural) !== true) ?  false ? 0 : invariant(false) : void 0;
  var refetchMetadata = (_fragmentNode$metadat2 = fragmentNode.metadata) === null || _fragmentNode$metadat2 === void 0 ? void 0 : _fragmentNode$metadat2.refetch;
  !(refetchMetadata != null) ?  false ? 0 : invariant(false) : void 0; // handle both commonjs and es modules

  var refetchableRequest = refetchMetadata.operation["default"] ? refetchMetadata.operation["default"] : refetchMetadata.operation;
  var fragmentRefPathInResponse = refetchMetadata.fragmentPathInResult;
  !(typeof refetchableRequest !== 'string') ?  false ? 0 : invariant(false) : void 0;
  var identifierField = refetchMetadata.identifierField;
  !(identifierField == null || typeof identifierField === 'string') ?  false ? 0 : invariant(false) : void 0;
  return {
    fragmentRefPathInResponse: fragmentRefPathInResponse,
    identifierField: identifierField,
    refetchableRequest: refetchableRequest,
    refetchMetadata: refetchMetadata
  };
}

module.exports = getRefetchMetadata;

/***/ }),

/***/ 6830:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _typeof = __webpack_require__(3634);

var _interopRequireDefault = __webpack_require__(249);

var _createForOfIteratorHelper2 = _interopRequireDefault(__webpack_require__(8629));

var invariant = __webpack_require__(4990);

function getValueAtPath(data, path) {
  var result = data;

  var _iterator = (0, _createForOfIteratorHelper2["default"])(path),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var key = _step.value;

      if (result == null) {
        return null;
      }

      if (typeof key === 'number') {
        !Array.isArray(result) ?  false ? 0 : invariant(false) : void 0;
        result = result[key];
      } else {
        !(_typeof(result) === 'object' && !Array.isArray(result)) ?  false ? 0 : invariant(false) : void 0;
        result = result[key];
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return result;
}

module.exports = getValueAtPath;

/***/ }),

/***/ 274:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 * @emails oncall+relay
 */


var _require = __webpack_require__(4652),
    loadQuery = _require.loadQuery;

function loadEntryPoint(environmentProvider, entryPoint, entryPointParams) {
  // Start loading the code for the entrypoint
  var loadingPromise = null;

  if (entryPoint.root.getModuleIfRequired() == null) {
    loadingPromise = entryPoint.root.load();
  }

  var preloadProps = entryPoint.getPreloadProps(entryPointParams);
  var queries = preloadProps.queries,
      entryPoints = preloadProps.entryPoints,
      extraProps = preloadProps.extraProps;
  var preloadedQueries = {};
  var preloadedEntryPoints = {};

  if (queries != null) {
    var queriesPropNames = Object.keys(queries);
    queriesPropNames.forEach(function (queryPropName) {
      var _queries$queryPropNam = queries[queryPropName],
          environmentProviderOptions = _queries$queryPropNam.environmentProviderOptions,
          options = _queries$queryPropNam.options,
          parameters = _queries$queryPropNam.parameters,
          variables = _queries$queryPropNam.variables;
      var environment = environmentProvider.getEnvironment(environmentProviderOptions);
      preloadedQueries[queryPropName] = loadQuery(environment, parameters, variables, {
        fetchPolicy: options === null || options === void 0 ? void 0 : options.fetchPolicy,
        networkCacheConfig: options === null || options === void 0 ? void 0 : options.networkCacheConfig,
        __nameForWarning: 'loadEntryPoint'
      }, environmentProviderOptions);
    });
  }

  if (entryPoints != null) {
    var entryPointPropNames = Object.keys(entryPoints);
    entryPointPropNames.forEach(function (entryPointPropName) {
      var entryPointDescription = entryPoints[entryPointPropName];

      if (entryPointDescription == null) {
        return;
      }

      var nestedEntryPoint = entryPointDescription.entryPoint,
          nestedParams = entryPointDescription.entryPointParams;
      preloadedEntryPoints[entryPointPropName] = loadEntryPoint(environmentProvider, nestedEntryPoint, nestedParams);
    });
  }

  var isDisposed = false;
  return {
    dispose: function dispose() {
      if (isDisposed) {
        return;
      }

      if (preloadedQueries != null) {
        Object.values(preloadedQueries).forEach(function (_ref) {
          var innerDispose = _ref.dispose;
          innerDispose();
        });
      }

      if (preloadedEntryPoints != null) {
        Object.values(preloadedEntryPoints).forEach(function (_ref2) {
          var innerDispose = _ref2.dispose;
          innerDispose();
        });
      }

      isDisposed = true;
    },
    entryPoints: preloadedEntryPoints,
    extraProps: extraProps !== null && extraProps !== void 0 ? extraProps : null,
    getComponent: function getComponent() {
      var component = entryPoint.root.getModuleIfRequired();

      if (component == null) {
        var _loadingPromise;

        loadingPromise = (_loadingPromise = loadingPromise) !== null && _loadingPromise !== void 0 ? _loadingPromise : entryPoint.root.load();
        throw loadingPromise;
      } // $FlowFixMe[incompatible-cast] - trust me Flow, its entryPoint component


      return component;
    },

    // $FlowFixMe[unsafe-getters-setters] - this has no side effects
    get isDisposed() {
      return isDisposed;
    },

    queries: preloadedQueries,
    rootModuleID: entryPoint.root.getModuleId()
  };
}

module.exports = loadEntryPoint;

/***/ }),

/***/ 4652:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 * @emails oncall+relay
 */


var _interopRequireDefault = __webpack_require__(249);

var _objectSpread2 = _interopRequireDefault(__webpack_require__(4638));

var React = __webpack_require__(657);

var invariant = __webpack_require__(4990);

var warning = __webpack_require__(480);

var _require = __webpack_require__(3271),
    PreloadableQueryRegistry = _require.PreloadableQueryRegistry,
    ReplaySubject = _require.ReplaySubject,
    createOperationDescriptor = _require.createOperationDescriptor,
    getRequest = _require.getRequest,
    getRequestIdentifier = _require.getRequestIdentifier,
    Observable = _require.Observable,
    RelayFeatureFlags = _require.RelayFeatureFlags,
    fetchQueryDeduped = _require.__internal.fetchQueryDeduped;

var RenderDispatcher = null;
var fetchKey = 100001;

function useTrackLoadQueryInRender() {
  if (RenderDispatcher === null) {
    var _React$__SECRET_INTER, _React$__SECRET_INTER2; // Flow does not know of React internals (rightly so), but we need to
    // ensure here that this function isn't called inside render.


    RenderDispatcher = // $FlowFixMe[prop-missing]
    (_React$__SECRET_INTER = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) === null || _React$__SECRET_INTER === void 0 ? void 0 : (_React$__SECRET_INTER2 = _React$__SECRET_INTER.ReactCurrentDispatcher) === null || _React$__SECRET_INTER2 === void 0 ? void 0 : _React$__SECRET_INTER2.current;
  }
}

function loadQuery(environment, preloadableRequest, variables, options, environmentProviderOptions) {
  var _React$__SECRET_INTER3, _React$__SECRET_INTER4, _options$__nameForWar, _options$fetchPolicy; // This code ensures that we don't call loadQuery during render.


  var CurrentDispatcher = // $FlowFixMe[prop-missing]
  (_React$__SECRET_INTER3 = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) === null || _React$__SECRET_INTER3 === void 0 ? void 0 : (_React$__SECRET_INTER4 = _React$__SECRET_INTER3.ReactCurrentDispatcher) === null || _React$__SECRET_INTER4 === void 0 ? void 0 : _React$__SECRET_INTER4.current;
   false ? 0 : void 0; // Every time you call loadQuery, we will generate a new fetchKey.
  // This will ensure that every query reference that is created and
  // passed to usePreloadedQuery is independently evaluated,
  // even if they are for the same query/variables.
  // Specifically, we want to avoid a case where we try to refetch a
  // query by calling loadQuery a second time, and have the Suspense
  // cache in usePreloadedQuery reuse the cached result instead of
  // re-evaluating the new query ref and triggering a refetch if
  // necessary.

  fetchKey++;
  var fetchPolicy = (_options$fetchPolicy = options === null || options === void 0 ? void 0 : options.fetchPolicy) !== null && _options$fetchPolicy !== void 0 ? _options$fetchPolicy : 'store-or-network';
  var networkCacheConfig = (0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, options === null || options === void 0 ? void 0 : options.networkCacheConfig), {}, {
    force: true
  }); // executeWithNetworkSource will retain and execute an operation
  // against the Relay store, given an Observable that would provide
  // the network events for the operation.

  var retainReference;
  var didExecuteNetworkSource = false;

  var executeWithNetworkSource = function executeWithNetworkSource(operation, networkObservable) {
    didExecuteNetworkSource = true;
    return environment.executeWithSource({
      operation: operation,
      source: networkObservable
    });
  }; // N.B. For loadQuery, we unconventionally want to return an Observable
  // that isn't lazily executed, meaning that we don't want to wait
  // until the returned Observable is subscribed to to actually start
  // fetching and executing an operation; i.e. we want to execute the
  // operation eagerly, when loadQuery is called.
  // For this reason, we use an intermediate executionSubject which
  // allows us to capture the events that occur during the eager execution
  // of the operation, and then replay them to the Observable we
  // ultimately return.


  var executionSubject = new ReplaySubject();
  var returnedObservable = Observable.create(function (sink) {
    return executionSubject.subscribe(sink);
  });
  var unsubscribeFromNetworkRequest;
  var networkError = null; // makeNetworkRequest will immediately start a raw network request if
  // one isn't already in flight and return an Observable that when
  // subscribed to will replay the network events that have occured so far,
  // as well as subsequent events.

  var didMakeNetworkRequest = false;

  var makeNetworkRequest = function makeNetworkRequest(params) {
    // N.B. this function is called synchronously or not at all
    // didMakeNetworkRequest is safe to rely on in the returned value
    // Even if the request gets deduped below, we still wan't to return an
    // observable that provides the replayed network events for the query,
    // so we set this to true before deduping, to guarantee that the
    // `source` observable is returned.
    didMakeNetworkRequest = true;
    var observable;
    var subject = new ReplaySubject();

    if (RelayFeatureFlags.ENABLE_LOAD_QUERY_REQUEST_DEDUPING === true) {
      // Here, we are calling fetchQueryDeduped at the network layer level,
      // which ensures that only a single network request is active for a given
      // (environment, identifier) pair.
      // Since network requests can be started /before/ we have the query ast
      // necessary to process the results, we need to dedupe the raw requests
      // separately from deduping the operation execution; specifically,
      // if `loadQuery` is called multiple times before the query ast is available,
      // we still want the network request to be deduped.
      // - If a duplicate active network request is found, it will return an
      // Observable that replays the events of the already active request.
      // - If no duplicate active network request is found, it will call the fetchFn
      // to start the request, and return an Observable that will replay
      // the events from the network request.
      // We provide an extra key to the identifier to distinguish deduping
      // of raw network requests vs deduping of operation executions.
      var identifier = 'raw-network-request-' + getRequestIdentifier(params, variables);
      observable = fetchQueryDeduped(environment, identifier, function () {
        var network = environment.getNetwork();
        return network.execute(params, variables, networkCacheConfig);
      });
    } else {
      var network = environment.getNetwork();
      observable = network.execute(params, variables, networkCacheConfig);
    }

    var _observable$subscribe = observable.subscribe({
      error: function error(err) {
        networkError = err;
        subject.error(err);
      },
      next: function next(data) {
        subject.next(data);
      },
      complete: function complete() {
        subject.complete();
      }
    }),
        unsubscribe = _observable$subscribe.unsubscribe;

    unsubscribeFromNetworkRequest = unsubscribe;
    return Observable.create(function (sink) {
      var subjectSubscription = subject.subscribe(sink);
      return function () {
        subjectSubscription.unsubscribe();
        unsubscribeFromNetworkRequest();
      };
    });
  };

  var unsubscribeFromExecution;

  var executeDeduped = function executeDeduped(operation, fetchFn) {
    if (RelayFeatureFlags.ENABLE_LOAD_QUERY_REQUEST_DEDUPING === true) {
      // N.B. at this point, if we're calling execute with a query ast (OperationDescriptor),
      // we are guaranteed to have started a network request. We set this to
      // true here as well since `makeNetworkRequest` might get skipped in the case
      // where the query ast is already available and the query executions get deduped.
      // Even if the execution gets deduped below, we still wan't to return
      // an observable that provides the replayed network events for the query,
      // so we set this to true before deduping, to guarantee that the `source`
      // observable is returned.
      didMakeNetworkRequest = true;
    } // Here, we are calling fetchQueryDeduped, which ensures that only
    // a single operation is active for a given (environment, identifier) pair,
    // and also tracks the active state of the operation, which is necessary
    // for our Suspense infra to later be able to suspend (or not) on
    // active operations. Even though we already dedupe raw network requests,
    // we also need to dedupe and keep track operation execution for our Suspense
    // infra, and we also want to avoid processing responses more than once, for
    // the cases where `loadQuery` might be called multiple times after the query ast
    // is available.
    // - If a duplicate active operation is found, it will return an
    // Observable that replays the events of the already active operation.
    // - If no duplicate active operation is found, it will call the fetchFn
    // to execute the operation, and return an Observable that will provide
    // the events for executing the operation.


    var _fetchQueryDeduped$su = fetchQueryDeduped(environment, operation.request.identifier, fetchFn).subscribe({
      error: function error(err) {
        executionSubject.error(err);
      },
      next: function next(data) {
        executionSubject.next(data);
      },
      complete: function complete() {
        executionSubject.complete();
      }
    });

    unsubscribeFromExecution = _fetchQueryDeduped$su.unsubscribe;
  };

  var checkAvailabilityAndExecute = function checkAvailabilityAndExecute(concreteRequest) {
    var operation = createOperationDescriptor(concreteRequest, variables, networkCacheConfig);
    retainReference = environment.retain(operation);

    if (fetchPolicy === 'store-only') {
      return;
    } // N.B. If the fetch policy allows fulfillment from the store but the
    // environment already has the data for that operation cached in the store,
    // then we do nothing.


    var shouldFetch = fetchPolicy !== 'store-or-network' || environment.check(operation).status !== 'available';

    if (shouldFetch) {
      executeDeduped(operation, function () {
        // N.B. Since we have the operation synchronously available here,
        // we can immediately fetch and execute the operation.
        var networkObservable = makeNetworkRequest(concreteRequest.params);
        var executeObservable = executeWithNetworkSource(operation, networkObservable);
        return executeObservable;
      });
    }
  };

  var params;
  var cancelOnLoadCallback;
  var queryId;

  if (preloadableRequest.kind === 'PreloadableConcreteRequest') {
    var preloadableConcreteRequest = preloadableRequest;
    params = preloadableConcreteRequest.params;
    var _params = params;
    queryId = _params.id;
    !(queryId !== null) ?  false ? 0 : invariant(false) : void 0;

    var _module = PreloadableQueryRegistry.get(queryId);

    if (_module != null) {
      checkAvailabilityAndExecute(_module);
    } else {
      // If the module isn't synchronously available, we launch the
      // network request immediately if the fetchPolicy might produce
      // a network fetch, regardless of the state of the store cache. We
      // do this because we can't check if a query is cached without the
      // ast, and we know that if we don't have the query ast
      // available, then this query could've never been written to the
      // store in the first place, so it couldn't have been cached.
      var networkObservable = fetchPolicy === 'store-only' ? null : makeNetworkRequest(params);

      var _PreloadableQueryRegi = PreloadableQueryRegistry.onLoad( // $FlowFixMe[incompatible-call]
      queryId, function (preloadedModule) {
        cancelOnLoadCallback();
        var operation = createOperationDescriptor(preloadedModule, variables, networkCacheConfig);
        retainReference = environment.retain(operation);

        if (networkObservable != null) {
          executeDeduped(operation, function () {
            return executeWithNetworkSource(operation, networkObservable);
          });
        }
      });

      cancelOnLoadCallback = _PreloadableQueryRegi.dispose;
    }
  } else {
    var graphQlTaggedNode = preloadableRequest;
    var request = getRequest(graphQlTaggedNode);
    params = request.params;
    queryId = params.cacheID != null ? params.cacheID : params.id;
    checkAvailabilityAndExecute(request);
  }

  var isDisposed = false;
  return {
    kind: 'PreloadedQuery',
    environment: environment,
    environmentProviderOptions: environmentProviderOptions,
    dispose: function dispose() {
      if (isDisposed) {
        return;
      }

      if (didExecuteNetworkSource) {
        unsubscribeFromExecution && unsubscribeFromExecution();
      } else {
        unsubscribeFromNetworkRequest && unsubscribeFromNetworkRequest();
      }

      retainReference && retainReference.dispose();
      cancelOnLoadCallback && cancelOnLoadCallback();
      isDisposed = true;
    },
    fetchKey: fetchKey,
    id: queryId,

    // $FlowFixMe[unsafe-getters-setters] - this has no side effects
    get isDisposed() {
      return isDisposed;
    },

    // $FlowFixMe[unsafe-getters-setters] - this has no side effects
    get networkError() {
      return networkError;
    },

    name: params.name,
    networkCacheConfig: networkCacheConfig,
    fetchPolicy: fetchPolicy,
    source: didMakeNetworkRequest ? returnedObservable : undefined,
    variables: variables
  };
}

module.exports = {
  loadQuery: loadQuery,
  useTrackLoadQueryInRender: useTrackLoadQueryInRender
};

/***/ }),

/***/ 1297:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _createForOfIteratorHelper2 = _interopRequireDefault(__webpack_require__(8629));

var loadEntryPoint = __webpack_require__(274);

var useIsMountedRef = __webpack_require__(3581);

var _require = __webpack_require__(4652),
    useTrackLoadQueryInRender = _require.useTrackLoadQueryInRender;

var _require2 = __webpack_require__(657),
    useCallback = _require2.useCallback,
    useEffect = _require2.useEffect,
    useRef = _require2.useRef,
    useState = _require2.useState;

var initialNullEntryPointReferenceState = {
  kind: 'NullEntryPointReference'
};

function useLoadEntryPoint(environmentProvider, entryPoint, options) {
  var _options$TEST_ONLY__i, _options$TEST_ONLY__i2, _options$TEST_ONLY__i3, _options$TEST_ONLY__i4;
  /**
   * We want to always call `entryPointReference.dispose()` for every call to
   * `setEntryPointReference(loadEntryPoint(...))` so that no leaks of data in Relay
   * stores will occur.
   *
   * However, a call to `setState(newState)` is not always followed by a commit where
   * this value is reflected in the state. Thus, we cannot reliably clean up each ref
   * with `useEffect(() => () => entryPointReference.dispose(), [entryPointReference])`.
   *
   * Instead, we keep track of each call to `loadEntryPoint` in a ref.
   * Relying on the fact that if a state change commits, no state changes that were
   * initiated prior to the currently committing state change will ever subsequently
   * commit, we can safely dispose of all preloaded entry point references
   * associated with state changes initiated prior to the currently committing state
   * change.
   *
   * Finally, when the hook unmounts, we also dispose of all remaining uncommitted
   * entry point references.
   */


  useTrackLoadQueryInRender();
  var initialEntryPointReferenceInternal = (_options$TEST_ONLY__i = options === null || options === void 0 ? void 0 : (_options$TEST_ONLY__i2 = options.TEST_ONLY__initialEntryPointData) === null || _options$TEST_ONLY__i2 === void 0 ? void 0 : _options$TEST_ONLY__i2.entryPointReference) !== null && _options$TEST_ONLY__i !== void 0 ? _options$TEST_ONLY__i : initialNullEntryPointReferenceState;
  var initialEntryPointParamsInternal = (_options$TEST_ONLY__i3 = options === null || options === void 0 ? void 0 : (_options$TEST_ONLY__i4 = options.TEST_ONLY__initialEntryPointData) === null || _options$TEST_ONLY__i4 === void 0 ? void 0 : _options$TEST_ONLY__i4.entryPointParams) !== null && _options$TEST_ONLY__i3 !== void 0 ? _options$TEST_ONLY__i3 : null;
  var isMountedRef = useIsMountedRef();
  var undisposedEntryPointReferencesRef = useRef(new Set([initialEntryPointReferenceInternal]));

  var _useState = useState(initialEntryPointReferenceInternal),
      entryPointReference = _useState[0],
      setEntryPointReference = _useState[1];

  var _useState2 = useState(initialEntryPointParamsInternal),
      entryPointParams = _useState2[0],
      setEntryPointParams = _useState2[1];

  var disposeEntryPoint = useCallback(function () {
    if (isMountedRef.current) {
      var nullEntryPointReference = {
        kind: 'NullEntryPointReference'
      };
      undisposedEntryPointReferencesRef.current.add(nullEntryPointReference);
      setEntryPointReference(nullEntryPointReference);
    }
  }, [setEntryPointReference, isMountedRef]);
  var entryPointLoaderCallback = useCallback(function (params) {
    if (isMountedRef.current) {
      var updatedEntryPointReference = loadEntryPoint(environmentProvider, entryPoint, params);
      undisposedEntryPointReferencesRef.current.add(updatedEntryPointReference);
      setEntryPointReference(updatedEntryPointReference);
      setEntryPointParams(params);
    }
  }, [environmentProvider, entryPoint, setEntryPointReference, isMountedRef]);
  var maybeHiddenOrFastRefresh = useRef(false);
  useEffect(function () {
    return function () {
      // Attempt to detect if the component was
      // hidden (by Offscreen API), or fast refresh occured;
      // Only in these situations would the effect cleanup
      // for "unmounting" run multiple times, so if
      // we are ever able to read this ref with a value
      // of true, it means that one of these cases
      // has happened.
      maybeHiddenOrFastRefresh.current = true;
    };
  }, []);
  useEffect(function () {
    if (maybeHiddenOrFastRefresh.current === true) {
      // This block only runs if the component has previously "unmounted"
      // due to it being hidden by the Offscreen API, or during fast refresh.
      // At this point, the current entryPointReference will have been disposed
      // by the previous cleanup, so instead of attempting to
      // do our regular commit setup, which would incorrectly leave our
      // current entryPointReference disposed, we need to load the entryPoint again
      // and force a re-render by calling entryPointLoaderCallback again,
      // so that the entryPointReference's queries are correctly re-retained, and
      // potentially refetched if necessary.
      maybeHiddenOrFastRefresh.current = false;

      if (entryPointReference.kind !== 'NullEntryPointReference' && entryPointParams != null) {
        entryPointLoaderCallback(entryPointParams);
      }

      return;
    } // When a new entryPointReference is committed, we iterate over all
    // entrypoint refs in undisposedEntryPointReferences and dispose all of
    // the refs that aren't the currently committed one. This ensures
    // that we don't leave any dangling entrypoint references for the
    // case that loadEntryPoint is called multiple times before commit; when
    // this happens, multiple state updates will be scheduled, but only one
    // will commit, meaning that we need to keep track of and dispose any
    // query references that don't end up committing.
    // - We are relying on the fact that sets iterate in insertion order, and we
    // can remove items from a set as we iterate over it (i.e. no iterator
    // invalidation issues.) Thus, it is safe to loop through
    // undisposedEntryPointReferences until we find entryPointReference, and
    // remove and dispose all previous references.
    // - We are guaranteed to find entryPointReference in the set, because if a
    // state change results in a commit, no state changes initiated prior to that
    // one will be committed, and we are disposing and removing references
    // associated with commits that were initiated prior to the currently
    // committing state change. (A useEffect callback is called during the commit
    // phase.)


    var undisposedEntryPointReferences = undisposedEntryPointReferencesRef.current;

    if (isMountedRef.current) {
      var _iterator = (0, _createForOfIteratorHelper2["default"])(undisposedEntryPointReferences),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var undisposedEntryPointReference = _step.value;

          if (undisposedEntryPointReference === entryPointReference) {
            break;
          }

          undisposedEntryPointReferences["delete"](undisposedEntryPointReference);

          if (undisposedEntryPointReference.kind !== 'NullEntryPointReference') {
            undisposedEntryPointReference.dispose();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, [entryPointReference, entryPointParams, entryPointLoaderCallback, isMountedRef]);
  useEffect(function () {
    return function disposeAllRemainingEntryPointReferences() {
      // undisposedEntryPointReferences.current is never reassigned
      // eslint-disable-next-line react-hooks/exhaustive-deps
      var _iterator2 = (0, _createForOfIteratorHelper2["default"])(undisposedEntryPointReferencesRef.current),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var unhandledStateChange = _step2.value;

          if (unhandledStateChange.kind !== 'NullEntryPointReference') {
            unhandledStateChange.dispose();
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    };
  }, []);
  return [entryPointReference.kind === 'NullEntryPointReference' ? null : entryPointReference, entryPointLoaderCallback, disposeEntryPoint];
}

module.exports = useLoadEntryPoint;

/***/ }),

/***/ 981:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _require = __webpack_require__(657),
    useCallback = _require.useCallback,
    useEffect = _require.useEffect,
    useRef = _require.useRef;
/**
 * This hook returns a mutable React ref that holds the value of whether a
 * fetch request is in flight. The reason this is a mutable ref instead of
 * state is because we don't actually want to trigger an update when this
 * changes, but instead synchronously keep track of whether the network request
 * is in flight, for example in order to bail out of a request if one is
 * already in flight. If this was state, due to the nature of concurrent
 * updates, this value wouldn't be in sync with when the request is actually
 * in flight.
 * The additional functions returned by this Hook can be used to mutate
 * the ref.
 */


function useFetchTrackingRef() {
  var subscriptionRef = useRef(null);
  var isFetchingRef = useRef(false);
  var disposeFetch = useCallback(function () {
    if (subscriptionRef.current != null) {
      subscriptionRef.current.unsubscribe();
      subscriptionRef.current = null;
    }

    isFetchingRef.current = false;
  }, []);
  var startFetch = useCallback(function (subscription) {
    subscriptionRef.current = subscription;
    isFetchingRef.current = true;
  }, []);
  var completeFetch = useCallback(function () {
    subscriptionRef.current = null;
    isFetchingRef.current = false;
  }, []); // Dipose of ongoing fetch on unmount

  useEffect(function () {
    return disposeFetch;
  }, [disposeFetch]);
  return {
    isFetchingRef: isFetchingRef,
    startFetch: startFetch,
    disposeFetch: disposeFetch,
    completeFetch: completeFetch
  };
}

module.exports = useFetchTrackingRef;

/***/ }),

/***/ 4968:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var useFragmentNode = __webpack_require__(7556);

var useStaticFragmentNodeWarning = __webpack_require__(8716);

var _require = __webpack_require__(4652),
    useTrackLoadQueryInRender = _require.useTrackLoadQueryInRender;

var _require2 = __webpack_require__(657),
    useDebugValue = _require2.useDebugValue;

var _require3 = __webpack_require__(3271),
    getFragment = _require3.getFragment;

function useFragment(fragmentInput, fragmentRef) {
  // We need to use this hook in order to be able to track if
  // loadQuery was called during render
  useTrackLoadQueryInRender();
  var fragmentNode = getFragment(fragmentInput);
  useStaticFragmentNodeWarning(fragmentNode, 'first argument of useFragment()');

  var _useFragmentNode = useFragmentNode(fragmentNode, fragmentRef, 'useFragment()'),
      data = _useFragmentNode.data;

  if (false) {}

  return data;
}

module.exports = useFragment;

/***/ }),

/***/ 7556:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var useRelayEnvironment = __webpack_require__(9708);

var warning = __webpack_require__(480);

var _require = __webpack_require__(9495),
    getFragmentResourceForEnvironment = _require.getFragmentResourceForEnvironment;

var _require2 = __webpack_require__(657),
    useEffect = _require2.useEffect,
    useRef = _require2.useRef,
    useState = _require2.useState;

var _require3 = __webpack_require__(3271),
    getFragmentIdentifier = _require3.getFragmentIdentifier;

function useFragmentNode(fragmentNode, fragmentRef, componentDisplayName) {
  var environment = useRelayEnvironment();
  var FragmentResource = getFragmentResourceForEnvironment(environment);
  var isMountedRef = useRef(false);

  var _useState = useState(0),
      forceUpdate = _useState[1];

  var fragmentIdentifier = getFragmentIdentifier(fragmentNode, fragmentRef); // Read fragment data; this might suspend.

  var fragmentResult = FragmentResource.readWithIdentifier(fragmentNode, fragmentRef, fragmentIdentifier, componentDisplayName);
  var isListeningForUpdatesRef = useRef(true);

  function enableStoreUpdates() {
    isListeningForUpdatesRef.current = true;
    var didMissUpdates = FragmentResource.checkMissedUpdates(fragmentResult)[0];

    if (didMissUpdates) {
      handleDataUpdate();
    }
  }

  function disableStoreUpdates() {
    isListeningForUpdatesRef.current = false;
  }

  function handleDataUpdate() {
    if (isMountedRef.current === false || isListeningForUpdatesRef.current === false) {
      return;
    } // React bails out on noop state updates as an optimization.
    // If we want to force an update via setState, we need to pass an value.
    // The actual value can be arbitrary though, e.g. an incremented number.


    forceUpdate(function (count) {
      return count + 1;
    });
  } // Establish Relay store subscriptions in the commit phase, only if
  // rendering for the first time, or if we need to subscribe to new data
  // If the fragment identifier changes, it means that the variables on the
  // fragment owner changed, or the fragment ref points to different records.
  // In this case, we need to resubscribe to the Relay store.


  useEffect(function () {
    isMountedRef.current = true;
    var disposable = FragmentResource.subscribe(fragmentResult, handleDataUpdate);
    return function () {
      // When unmounting or resubscribing to new data, clean up current
      // subscription. This will also make sure fragment data is no longer
      // cached so that next time it its read, it will be freshly read from
      // the Relay store
      isMountedRef.current = false;
      disposable.dispose();
    }; // NOTE: We disable react-hooks-deps warning because environment and fragmentIdentifier
    // is capturing all information about whether the effect should be re-ran.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [environment, fragmentIdentifier]);

  if (false) {}

  return {
    // $FlowFixMe[incompatible-return]
    data: fragmentResult.data,
    disableStoreUpdates: disableStoreUpdates,
    enableStoreUpdates: enableStoreUpdates
  };
}

module.exports = useFragmentNode;

/***/ }),

/***/ 3581:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _require = __webpack_require__(657),
    useEffect = _require.useEffect,
    useRef = _require.useRef;

function useIsMountedRef() {
  var isMountedRef = useRef(true);
  useEffect(function () {
    isMountedRef.current = true;
    return function () {
      isMountedRef.current = false;
    };
  }, []);
  return isMountedRef;
}

module.exports = useIsMountedRef;

/***/ }),

/***/ 7409:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */


var React = __webpack_require__(657);

var invariant = __webpack_require__(4990);

var useRelayEnvironment = __webpack_require__(9708);

var _require = __webpack_require__(3271),
    getObservableForActiveRequest = _require.__internal.getObservableForActiveRequest,
    getSelector = _require.getSelector;

var useEffect = React.useEffect,
    useState = React.useState,
    useMemo = React.useMemo;

function useIsOperationNodeActive(fragmentNode, fragmentRef) {
  var environment = useRelayEnvironment();
  var observable = useMemo(function () {
    var selector = getSelector(fragmentNode, fragmentRef);

    if (selector == null) {
      return null;
    }

    !(selector.kind === 'SingularReaderSelector') ?  false ? 0 : invariant(false) : void 0;
    return getObservableForActiveRequest(environment, selector.owner);
  }, [environment, fragmentNode, fragmentRef]);

  var _useState = useState(observable != null),
      isActive = _useState[0],
      setIsActive = _useState[1];

  useEffect(function () {
    var subscription;
    setIsActive(observable != null);

    if (observable != null) {
      var onCompleteOrError = function onCompleteOrError() {
        setIsActive(false);
      };

      subscription = observable.subscribe({
        complete: onCompleteOrError,
        error: onCompleteOrError
      });
    }

    return function () {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [observable]);
  return isActive;
}

module.exports = useIsOperationNodeActive;

/***/ }),

/***/ 7562:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var useLazyLoadQueryNode = __webpack_require__(2683);

var useMemoOperationDescriptor = __webpack_require__(6381);

var useRelayEnvironment = __webpack_require__(9708);

var _require = __webpack_require__(4652),
    useTrackLoadQueryInRender = _require.useTrackLoadQueryInRender;

var _require2 = __webpack_require__(3271),
    fetchQuery = _require2.__internal.fetchQuery;

function useLazyLoadQuery(gqlQuery, variables, options) {
  // We need to use this hook in order to be able to track if
  // loadQuery was called during render
  useTrackLoadQueryInRender();
  var environment = useRelayEnvironment();
  var query = useMemoOperationDescriptor(gqlQuery, variables, options && options.networkCacheConfig ? options.networkCacheConfig : {
    force: true
  });
  var data = useLazyLoadQueryNode({
    componentDisplayName: 'useLazyLoadQuery()',
    fetchKey: options === null || options === void 0 ? void 0 : options.fetchKey,
    fetchObservable: fetchQuery(environment, query),
    fetchPolicy: options === null || options === void 0 ? void 0 : options.fetchPolicy,
    query: query,
    renderPolicy: options === null || options === void 0 ? void 0 : options.UNSTABLE_renderPolicy
  });
  return data;
}

module.exports = useLazyLoadQuery;

/***/ }),

/***/ 2683:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var ProfilerContext = __webpack_require__(5116);

var React = __webpack_require__(657);

var useFetchTrackingRef = __webpack_require__(981);

var useFragmentNode = __webpack_require__(7556);

var useRelayEnvironment = __webpack_require__(9708);

var _require = __webpack_require__(9267),
    getQueryResourceForEnvironment = _require.getQueryResourceForEnvironment,
    getQueryCacheIdentifier = _require.getQueryCacheIdentifier;

var useContext = React.useContext,
    useEffect = React.useEffect,
    useState = React.useState,
    useRef = React.useRef;

function useLazyLoadQueryNode(_ref) {
  var query = _ref.query,
      componentDisplayName = _ref.componentDisplayName,
      fetchObservable = _ref.fetchObservable,
      fetchPolicy = _ref.fetchPolicy,
      fetchKey = _ref.fetchKey,
      renderPolicy = _ref.renderPolicy;
  var environment = useRelayEnvironment();
  var profilerContext = useContext(ProfilerContext);
  var QueryResource = getQueryResourceForEnvironment(environment);

  var _useState = useState(0),
      forceUpdateKey = _useState[0],
      forceUpdate = _useState[1];

  var _useFetchTrackingRef = useFetchTrackingRef(),
      startFetch = _useFetchTrackingRef.startFetch,
      completeFetch = _useFetchTrackingRef.completeFetch;

  var cacheBreaker = "".concat(forceUpdateKey, "-").concat(fetchKey !== null && fetchKey !== void 0 ? fetchKey : '');
  var cacheIdentifier = getQueryCacheIdentifier(environment, query, fetchPolicy, renderPolicy, cacheBreaker);
  var preparedQueryResult = profilerContext.wrapPrepareQueryResource(function () {
    return QueryResource.prepareWithIdentifier(cacheIdentifier, query, fetchObservable, fetchPolicy, renderPolicy, {
      start: startFetch,
      complete: completeFetch,
      error: completeFetch
    }, profilerContext);
  });
  var maybeHiddenOrFastRefresh = useRef(false);
  useEffect(function () {
    return function () {
      // Attempt to detect if the component was
      // hidden (by Offscreen API), or fast refresh occured;
      // Only in these situations would the effect cleanup
      // for "unmounting" run multiple times, so if
      // we are ever able to read this ref with a value
      // of true, it means that one of these cases
      // has happened.
      maybeHiddenOrFastRefresh.current = true;
    };
  }, []);
  useEffect(function () {
    if (maybeHiddenOrFastRefresh.current === true) {
      // This block only runs if the component has previously "unmounted"
      // due to it being hidden by the Offscreen API, or during fast refresh.
      // At this point, the current cached resource will have been disposed
      // by the previous cleanup, so instead of attempting to
      // do our regular commit setup, which would incorrectly attempt to
      // retain a cached query resource that was disposed, we need to force
      // a re-render so that the cache entry for this query is re-intiliazed and
      // and re-evaluated (and potentially cause a refetch).
      maybeHiddenOrFastRefresh.current = false;
      forceUpdate(function (n) {
        return n + 1;
      });
      return;
    }

    var disposable = QueryResource.retain(preparedQueryResult, profilerContext);
    return function () {
      disposable.dispose();
    }; // NOTE: We disable react-hooks-deps warning because the `environment`
    // and `cacheIdentifier` identities are capturing all information about whether
    // the effect should be re-executed and the query re-retained.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [environment, cacheIdentifier]);
  var fragmentNode = preparedQueryResult.fragmentNode,
      fragmentRef = preparedQueryResult.fragmentRef;

  var _useFragmentNode = useFragmentNode(fragmentNode, fragmentRef, componentDisplayName),
      data = _useFragmentNode.data;

  return data;
}

module.exports = useLazyLoadQueryNode;

/***/ }),

/***/ 8140:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _typeof = __webpack_require__(3634);

var _interopRequireDefault = __webpack_require__(249);

var _objectSpread2 = _interopRequireDefault(__webpack_require__(4638));

var getPaginationVariables = __webpack_require__(8780);

var getValueAtPath = __webpack_require__(6830);

var invariant = __webpack_require__(4990);

var useFetchTrackingRef = __webpack_require__(981);

var useIsMountedRef = __webpack_require__(3581);

var useIsOperationNodeActive = __webpack_require__(7409);

var useRelayEnvironment = __webpack_require__(9708);

var warning = __webpack_require__(480);

var _require = __webpack_require__(657),
    useCallback = _require.useCallback,
    useEffect = _require.useEffect,
    useState = _require.useState;

var _require2 = __webpack_require__(3271),
    ConnectionInterface = _require2.ConnectionInterface,
    fetchQuery = _require2.__internal.fetchQuery,
    createOperationDescriptor = _require2.createOperationDescriptor,
    getSelector = _require2.getSelector;

function useLoadMoreFunction(args) {
  var direction = args.direction,
      fragmentNode = args.fragmentNode,
      fragmentRef = args.fragmentRef,
      fragmentIdentifier = args.fragmentIdentifier,
      fragmentData = args.fragmentData,
      connectionPathInFragmentData = args.connectionPathInFragmentData,
      paginationRequest = args.paginationRequest,
      paginationMetadata = args.paginationMetadata,
      componentDisplayName = args.componentDisplayName,
      observer = args.observer,
      onReset = args.onReset,
      identifierField = args.identifierField;
  var environment = useRelayEnvironment();

  var _useFetchTrackingRef = useFetchTrackingRef(),
      isFetchingRef = _useFetchTrackingRef.isFetchingRef,
      startFetch = _useFetchTrackingRef.startFetch,
      disposeFetch = _useFetchTrackingRef.disposeFetch,
      completeFetch = _useFetchTrackingRef.completeFetch;

  var identifierValue = identifierField != null && fragmentData != null && _typeof(fragmentData) === 'object' ? fragmentData[identifierField] : null;
  var isMountedRef = useIsMountedRef();

  var _useState = useState(environment),
      mirroredEnvironment = _useState[0],
      setMirroredEnvironment = _useState[1];

  var _useState2 = useState(fragmentIdentifier),
      mirroredFragmentIdentifier = _useState2[0],
      setMirroredFragmentIdentifier = _useState2[1];

  var isParentQueryActive = useIsOperationNodeActive(fragmentNode, fragmentRef);
  var shouldReset = environment !== mirroredEnvironment || fragmentIdentifier !== mirroredFragmentIdentifier;

  if (shouldReset) {
    disposeFetch();
    onReset();
    setMirroredEnvironment(environment);
    setMirroredFragmentIdentifier(fragmentIdentifier);
  }

  var _getConnectionState = getConnectionState(direction, fragmentNode, fragmentData, connectionPathInFragmentData),
      cursor = _getConnectionState.cursor,
      hasMore = _getConnectionState.hasMore; // Dispose of pagination requests in flight when unmounting


  useEffect(function () {
    return function () {
      disposeFetch();
    };
  }, [disposeFetch]);
  var loadMore = useCallback(function (count, options) {
    // TODO(T41131846): Fetch/Caching policies for loadMore
    var onComplete = options === null || options === void 0 ? void 0 : options.onComplete;

    if (isMountedRef.current !== true) {
      // Bail out and warn if we're trying to paginate after the component
      // has unmounted
       false ? 0 : void 0;
      return {
        dispose: function dispose() {}
      };
    }

    var fragmentSelector = getSelector(fragmentNode, fragmentRef);

    if (isFetchingRef.current === true || fragmentData == null || isParentQueryActive) {
      if (fragmentSelector == null) {
         false ? 0 : void 0;
      }

      if (onComplete) {
        onComplete(null);
      }

      return {
        dispose: function dispose() {}
      };
    }

    !(fragmentSelector != null && fragmentSelector.kind !== 'PluralReaderSelector') ?  false ? 0 : invariant(false) : void 0;
    var parentVariables = fragmentSelector.owner.variables;
    var fragmentVariables = fragmentSelector.variables;
    var extraVariables = options === null || options === void 0 ? void 0 : options.UNSTABLE_extraVariables; // $FlowFixMe[cannot-spread-interface]

    var baseVariables = (0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, parentVariables), fragmentVariables);
    var paginationVariables = getPaginationVariables(direction, count, cursor, baseVariables, // $FlowFixMe[cannot-spread-interface]
    (0, _objectSpread2["default"])({}, extraVariables), paginationMetadata); // If the query needs an identifier value ('id' or similar) and one
    // was not explicitly provided, read it from the fragment data.

    if (identifierField != null) {
      // @refetchable fragments are guaranteed to have an `id` selection
      // if the type is Node, implements Node, or is @fetchable. Double-check
      // that there actually is a value at runtime.
      if (typeof identifierValue !== 'string') {
         false ? 0 : void 0;
      }

      paginationVariables.id = identifierValue;
    }

    var paginationQuery = createOperationDescriptor(paginationRequest, paginationVariables, {
      force: true
    });
    fetchQuery(environment, paginationQuery).subscribe((0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, observer), {}, {
      start: function start(subscription) {
        startFetch(subscription);
        observer.start && observer.start(subscription);
      },
      complete: function complete() {
        completeFetch();
        observer.complete && observer.complete();
        onComplete && onComplete(null);
      },
      error: function error(_error) {
        completeFetch();
        observer.error && observer.error(_error);
        onComplete && onComplete(_error);
      }
    }));
    return {
      dispose: disposeFetch
    };
  }, // NOTE: We disable react-hooks-deps warning because all values
  // inside paginationMetadata are static
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [environment, identifierValue, direction, cursor, startFetch, disposeFetch, completeFetch, isFetchingRef, isParentQueryActive, fragmentData, fragmentNode.name, fragmentRef, componentDisplayName]);
  return [loadMore, hasMore, disposeFetch];
}

function getConnectionState(direction, fragmentNode, fragmentData, connectionPathInFragmentData) {
  var _pageInfo$END_CURSOR, _pageInfo$START_CURSO;

  var _ConnectionInterface$ = ConnectionInterface.get(),
      EDGES = _ConnectionInterface$.EDGES,
      PAGE_INFO = _ConnectionInterface$.PAGE_INFO,
      HAS_NEXT_PAGE = _ConnectionInterface$.HAS_NEXT_PAGE,
      HAS_PREV_PAGE = _ConnectionInterface$.HAS_PREV_PAGE,
      END_CURSOR = _ConnectionInterface$.END_CURSOR,
      START_CURSOR = _ConnectionInterface$.START_CURSOR;

  var connection = getValueAtPath(fragmentData, connectionPathInFragmentData);

  if (connection == null) {
    return {
      cursor: null,
      hasMore: false
    };
  }

  !(_typeof(connection) === 'object') ?  false ? 0 : invariant(false) : void 0;
  var edges = connection[EDGES];
  var pageInfo = connection[PAGE_INFO];

  if (edges == null || pageInfo == null) {
    return {
      cursor: null,
      hasMore: false
    };
  }

  !Array.isArray(edges) ?  false ? 0 : invariant(false) : void 0;
  !(_typeof(pageInfo) === 'object') ?  false ? 0 : invariant(false) : void 0;
  var cursor = direction === 'forward' ? (_pageInfo$END_CURSOR = pageInfo[END_CURSOR]) !== null && _pageInfo$END_CURSOR !== void 0 ? _pageInfo$END_CURSOR : null : (_pageInfo$START_CURSO = pageInfo[START_CURSOR]) !== null && _pageInfo$START_CURSO !== void 0 ? _pageInfo$START_CURSO : null;
  !(cursor === null || typeof cursor === 'string') ?  false ? 0 : invariant(false) : void 0;
  var hasMore;

  if (direction === 'forward') {
    hasMore = cursor != null && pageInfo[HAS_NEXT_PAGE] === true;
  } else {
    hasMore = cursor != null && pageInfo[HAS_PREV_PAGE] === true;
  }

  return {
    cursor: cursor,
    hasMore: hasMore
  };
}

module.exports = useLoadMoreFunction;

/***/ }),

/***/ 6381:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var React = __webpack_require__(657);

var useMemoVariables = __webpack_require__(4933);

var _require = __webpack_require__(3271),
    createOperationDescriptor = _require.createOperationDescriptor,
    getRequest = _require.getRequest;

var useMemo = React.useMemo;

function useMemoOperationDescriptor(gqlQuery, variables, cacheConfig) {
  var _useMemoVariables = useMemoVariables(variables),
      memoVariables = _useMemoVariables[0];

  var _useMemoVariables2 = useMemoVariables(cacheConfig || {}),
      memoCacheConfig = _useMemoVariables2[0];

  return useMemo(function () {
    return createOperationDescriptor(getRequest(gqlQuery), memoVariables, memoCacheConfig);
  }, [gqlQuery, memoVariables, memoCacheConfig]);
}

module.exports = useMemoOperationDescriptor;

/***/ }),

/***/ 4933:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var React = __webpack_require__(657);

var areEqual = __webpack_require__(9074);

var useMemo = React.useMemo,
    useRef = React.useRef,
    useState = React.useState;

function useMemoVariables(variables) {
  var _variablesChangedGene2; // The value of this ref is a counter that should be incremented when
  // variables change. This allows us to use the counter as a
  // memoization value to indicate if the computation for useMemo
  // should be re-executed.


  var variablesChangedGenerationRef = useRef(0); // We mirror the variables to check if they have changed between renders

  var _useState = useState(variables),
      mirroredVariables = _useState[0],
      setMirroredVariables = _useState[1];

  var variablesChanged = !areEqual(variables, mirroredVariables);

  if (variablesChanged) {
    var _variablesChangedGene;

    variablesChangedGenerationRef.current = ((_variablesChangedGene = variablesChangedGenerationRef.current) !== null && _variablesChangedGene !== void 0 ? _variablesChangedGene : 0) + 1;
    setMirroredVariables(variables);
  } // NOTE: We disable react-hooks-deps warning because we explicitly
  // don't want to memoize on object identity
  // eslint-disable-next-line react-hooks/exhaustive-deps


  var memoVariables = useMemo(function () {
    return variables;
  }, [variablesChangedGenerationRef.current]);
  return [memoVariables, (_variablesChangedGene2 = variablesChangedGenerationRef.current) !== null && _variablesChangedGene2 !== void 0 ? _variablesChangedGene2 : 0];
}

module.exports = useMemoVariables;

/***/ }),

/***/ 8231:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _objectSpread2 = _interopRequireDefault(__webpack_require__(4638));

var React = __webpack_require__(657);

var useRelayEnvironment = __webpack_require__(9708);

var _require = __webpack_require__(3271),
    defaultCommitMutation = _require.commitMutation;

var useState = React.useState,
    useEffect = React.useEffect,
    useRef = React.useRef,
    useCallback = React.useCallback;

var useIsMountedRef = __webpack_require__(3581);

function useMutation(mutation) {
  var commitMutationFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultCommitMutation;
  var environment = useRelayEnvironment();
  var isMountedRef = useIsMountedRef();
  var environmentRef = useRef(environment);
  var mutationRef = useRef(mutation);
  var inFlightMutationsRef = useRef(new Set());

  var _useState = useState(false),
      isMutationInFlight = _useState[0],
      setMutationInFlight = _useState[1];

  var cleanup = useCallback(function (disposable) {
    if (environmentRef.current === environment && mutationRef.current === mutation) {
      inFlightMutationsRef.current["delete"](disposable);

      if (isMountedRef.current) {
        setMutationInFlight(inFlightMutationsRef.current.size > 0);
      }
    }
  }, [environment, isMountedRef, mutation]);
  useEffect(function () {
    if (environmentRef.current !== environment || mutationRef.current !== mutation) {
      inFlightMutationsRef.current = new Set();

      if (isMountedRef.current) {
        setMutationInFlight(false);
      }

      environmentRef.current = environment;
      mutationRef.current = mutation;
    }
  }, [environment, isMountedRef, mutation]);
  var commit = useCallback(function (config) {
    var disposable = commitMutationFn(environment, (0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, config), {}, {
      mutation: mutation,
      onCompleted: function onCompleted(response, errors) {
        cleanup(disposable);
        config.onCompleted && config.onCompleted(response, errors);
      },
      onError: function onError(error) {
        cleanup(disposable);
        config.onError && config.onError(error);
      },
      onUnsubscribe: function onUnsubscribe() {
        cleanup(disposable);
        config.onUnsubscribe && config.onUnsubscribe();
      }
    }));
    inFlightMutationsRef.current.add(disposable);

    if (isMountedRef.current) {
      setMutationInFlight(true);
    }

    return disposable;
  }, [cleanup, commitMutationFn, environment, isMountedRef, mutation]);
  return [commit, isMutationInFlight];
}

module.exports = useMutation;

/***/ }),

/***/ 9824:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _objectSpread2 = _interopRequireDefault(__webpack_require__(4638));

var getPaginationMetadata = __webpack_require__(3216);

var useLoadMoreFunction = __webpack_require__(8140);

var useRefetchableFragmentNode = __webpack_require__(433);

var useStaticFragmentNodeWarning = __webpack_require__(8716);

var _require = __webpack_require__(657),
    useCallback = _require.useCallback,
    useDebugValue = _require.useDebugValue,
    useState = _require.useState;

var _require2 = __webpack_require__(3271),
    getFragment = _require2.getFragment,
    getFragmentIdentifier = _require2.getFragmentIdentifier;

function usePaginationFragment(fragmentInput, parentFragmentRef) {
  var fragmentNode = getFragment(fragmentInput);
  useStaticFragmentNodeWarning(fragmentNode, 'first argument of usePaginationFragment()');
  var componentDisplayName = 'usePaginationFragment()';

  var _getPaginationMetadat = getPaginationMetadata(fragmentNode, componentDisplayName),
      connectionPathInFragmentData = _getPaginationMetadat.connectionPathInFragmentData,
      paginationRequest = _getPaginationMetadat.paginationRequest,
      paginationMetadata = _getPaginationMetadat.paginationMetadata,
      identifierField = _getPaginationMetadat.identifierField;

  var _useRefetchableFragme = useRefetchableFragmentNode(fragmentNode, parentFragmentRef, componentDisplayName),
      fragmentData = _useRefetchableFragme.fragmentData,
      fragmentRef = _useRefetchableFragme.fragmentRef,
      refetch = _useRefetchableFragme.refetch;

  var fragmentIdentifier = getFragmentIdentifier(fragmentNode, fragmentRef); // Backward pagination

  var _useLoadMore = useLoadMore({
    componentDisplayName: componentDisplayName,
    connectionPathInFragmentData: connectionPathInFragmentData,
    direction: 'backward',
    fragmentData: fragmentData,
    fragmentIdentifier: fragmentIdentifier,
    fragmentNode: fragmentNode,
    fragmentRef: fragmentRef,
    identifierField: identifierField,
    paginationMetadata: paginationMetadata,
    paginationRequest: paginationRequest
  }),
      loadPrevious = _useLoadMore[0],
      hasPrevious = _useLoadMore[1],
      isLoadingPrevious = _useLoadMore[2],
      disposeFetchPrevious = _useLoadMore[3]; // Forward pagination


  var _useLoadMore2 = useLoadMore({
    componentDisplayName: componentDisplayName,
    connectionPathInFragmentData: connectionPathInFragmentData,
    direction: 'forward',
    fragmentData: fragmentData,
    fragmentIdentifier: fragmentIdentifier,
    fragmentNode: fragmentNode,
    fragmentRef: fragmentRef,
    identifierField: identifierField,
    paginationMetadata: paginationMetadata,
    paginationRequest: paginationRequest
  }),
      loadNext = _useLoadMore2[0],
      hasNext = _useLoadMore2[1],
      isLoadingNext = _useLoadMore2[2],
      disposeFetchNext = _useLoadMore2[3];

  var refetchPagination = useCallback(function (variables, options) {
    disposeFetchNext();
    disposeFetchPrevious();
    return refetch(variables, (0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, options), {}, {
      __environment: undefined
    }));
  }, [disposeFetchNext, disposeFetchPrevious, refetch]);

  if (false) {}

  return {
    data: fragmentData,
    loadNext: loadNext,
    loadPrevious: loadPrevious,
    hasNext: hasNext,
    hasPrevious: hasPrevious,
    isLoadingNext: isLoadingNext,
    isLoadingPrevious: isLoadingPrevious,
    refetch: refetchPagination
  };
}

function useLoadMore(args) {
  var _useState = useState(false),
      isLoadingMore = _useState[0],
      setIsLoadingMore = _useState[1];

  var observer = {
    start: function start() {
      return setIsLoadingMore(true);
    },
    complete: function complete() {
      return setIsLoadingMore(false);
    },
    error: function error() {
      return setIsLoadingMore(false);
    }
  };

  var handleReset = function handleReset() {
    return setIsLoadingMore(false);
  };

  var _useLoadMoreFunction = useLoadMoreFunction((0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, args), {}, {
    observer: observer,
    onReset: handleReset
  })),
      loadMore = _useLoadMoreFunction[0],
      hasMore = _useLoadMoreFunction[1],
      disposeFetch = _useLoadMoreFunction[2];

  return [loadMore, hasMore, isLoadingMore, disposeFetch];
}

module.exports = usePaginationFragment;

/***/ }),

/***/ 5543:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var invariant = __webpack_require__(4990);

var useLazyLoadQueryNode = __webpack_require__(2683);

var useMemoOperationDescriptor = __webpack_require__(6381);

var useRelayEnvironment = __webpack_require__(9708);

var warning = __webpack_require__(480);

var _require = __webpack_require__(4652),
    useTrackLoadQueryInRender = _require.useTrackLoadQueryInRender;

var _require2 = __webpack_require__(657),
    useDebugValue = _require2.useDebugValue;

var _require3 = __webpack_require__(3271),
    _require3$__internal = _require3.__internal,
    fetchQueryDeduped = _require3$__internal.fetchQueryDeduped,
    fetchQuery = _require3$__internal.fetchQuery;

function usePreloadedQuery(gqlQuery, preloadedQuery, options) {
  // We need to use this hook in order to be able to track if
  // loadQuery was called during render
  useTrackLoadQueryInRender();
  var environment = useRelayEnvironment();
  var fetchKey = preloadedQuery.fetchKey,
      fetchPolicy = preloadedQuery.fetchPolicy,
      source = preloadedQuery.source,
      variables = preloadedQuery.variables,
      networkCacheConfig = preloadedQuery.networkCacheConfig;
  var operation = useMemoOperationDescriptor(gqlQuery, variables, networkCacheConfig);
  var useLazyLoadQueryNodeParams;

  if (preloadedQuery.kind === 'PreloadedQuery_DEPRECATED') {
    !(operation.request.node.params.name === preloadedQuery.name) ?  false ? 0 : invariant(false) : void 0;
    useLazyLoadQueryNodeParams = {
      componentDisplayName: 'usePreloadedQuery()',
      fetchKey: fetchKey,
      fetchObservable: fetchQueryDeduped(environment, operation.request.identifier, function () {
        if (environment === preloadedQuery.environment && source != null) {
          return environment.executeWithSource({
            operation: operation,
            source: source
          });
        } else {
          return environment.execute({
            operation: operation
          });
        }
      }),
      fetchPolicy: fetchPolicy,
      query: operation,
      renderPolicy: options === null || options === void 0 ? void 0 : options.UNSTABLE_renderPolicy
    };
  } else {
     false ? 0 : void 0;
    var fallbackFetchObservable = fetchQuery(environment, operation);
    var fetchObservable;

    if (source != null && environment === preloadedQuery.environment) {
      // If the source observable exists and the environments match, reuse
      // the source observable.
      // If the source observable happens to be empty, we need to fall back
      // and re-execute and de-dupe the query (at render time).
      fetchObservable = source.ifEmpty(fallbackFetchObservable);
    } else if (environment !== preloadedQuery.environment) {
      // If a call to loadQuery is made with a particular environment, and that
      // preloaded query is passed to usePreloadedQuery in a different environment
      // context, we cannot re-use the existing preloaded query.
      // Instead, we need to fall back and re-execute and de-dupe the query with
      // the new environment (at render time).
      // TODO T68036756 track occurences of this warning and turn it into a hard error
       false ? 0 : void 0;
      fetchObservable = fallbackFetchObservable;
    } else {
      // if (source == null)
      // If the source observable does not exist, we need to
      // fall back and re-execute and de-dupe the query (at render time).
      fetchObservable = fallbackFetchObservable;
    }

    useLazyLoadQueryNodeParams = {
      componentDisplayName: 'usePreloadedQuery()',
      fetchObservable: fetchObservable,
      fetchKey: fetchKey,
      fetchPolicy: fetchPolicy,
      query: operation,
      renderPolicy: options === null || options === void 0 ? void 0 : options.UNSTABLE_renderPolicy
    };
  }

  var data = useLazyLoadQueryNode(useLazyLoadQueryNodeParams);

  if (false) {}

  return data;
}

module.exports = usePreloadedQuery;

/***/ }),

/***/ 2729:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _createForOfIteratorHelper2 = _interopRequireDefault(__webpack_require__(8629));

var useIsMountedRef = __webpack_require__(3581);

var useRelayEnvironment = __webpack_require__(9708);

var _require = __webpack_require__(4652),
    loadQuery = _require.loadQuery,
    useTrackLoadQueryInRender = _require.useTrackLoadQueryInRender;

var _require2 = __webpack_require__(657),
    useCallback = _require2.useCallback,
    useEffect = _require2.useEffect,
    useRef = _require2.useRef,
    useState = _require2.useState;

var initialNullQueryReferenceState = {
  kind: 'NullQueryReference'
};

function useQueryLoader(preloadableRequest, initialQueryReference) {
  /**
   * We want to always call `queryReference.dispose()` for every call to
   * `setQueryReference(loadQuery(...))` so that no leaks of data in Relay stores
   * will occur.
   *
   * However, a call to `setState(newState)` is not always followed by a commit where
   * this value is reflected in the state. Thus, we cannot reliably clean up each
   * ref with `useEffect(() => () => queryReference.dispose(), [queryReference])`.
   *
   * Instead, we keep track of each call to `loadQuery` in a ref.
   * Relying on the fact that if a state change commits, no state changes that were
   * initiated prior to the currently committing state change will ever subsequently
   * commit, we can safely dispose of all preloaded query references
   * associated with state changes initiated prior to the currently committing state
   * change.
   *
   * Finally, when the hook unmounts, we also dispose of all remaining uncommitted
   * query references.
   */
  var initialQueryReferenceInternal = initialQueryReference !== null && initialQueryReference !== void 0 ? initialQueryReference : initialNullQueryReferenceState;
  var environment = useRelayEnvironment();
  useTrackLoadQueryInRender();
  var isMountedRef = useIsMountedRef();
  var undisposedQueryReferencesRef = useRef(new Set([initialQueryReferenceInternal]));

  var _useState = useState(function () {
    return initialQueryReferenceInternal;
  }),
      queryReference = _useState[0],
      setQueryReference = _useState[1];

  var _useState2 = useState(function () {
    return initialQueryReferenceInternal;
  }),
      previousInitialQueryReference = _useState2[0],
      setPreviousInitialQueryReference = _useState2[1];

  if (initialQueryReferenceInternal !== previousInitialQueryReference) {
    // Rendering the query reference makes it "managed" by this hook, so
    // we start keeping track of it so we can dispose it when it is no longer
    // necessary here
    // TODO(T78446637): Handle disposal of managed query references in
    // components that were never mounted after rendering
    undisposedQueryReferencesRef.current.add(initialQueryReferenceInternal);
    setPreviousInitialQueryReference(initialQueryReferenceInternal);
    setQueryReference(initialQueryReferenceInternal);
  }

  var disposeQuery = useCallback(function () {
    if (isMountedRef.current) {
      undisposedQueryReferencesRef.current.add(initialNullQueryReferenceState);
      setQueryReference(initialNullQueryReferenceState);
    }
  }, [isMountedRef]);
  var queryLoaderCallback = useCallback(function (variables, options) {
    var mergedOptions = options != null && options.hasOwnProperty('__environment') ? {
      fetchPolicy: options.fetchPolicy,
      networkCacheConfig: options.networkCacheConfig,
      __nameForWarning: options.__nameForWarning
    } : options;

    if (isMountedRef.current) {
      var _options$__environmen;

      var updatedQueryReference = loadQuery((_options$__environmen = options === null || options === void 0 ? void 0 : options.__environment) !== null && _options$__environmen !== void 0 ? _options$__environmen : environment, preloadableRequest, variables, mergedOptions);
      undisposedQueryReferencesRef.current.add(updatedQueryReference);
      setQueryReference(updatedQueryReference);
    }
  }, [environment, preloadableRequest, setQueryReference, isMountedRef]);
  var maybeHiddenOrFastRefresh = useRef(false);
  useEffect(function () {
    return function () {
      // Attempt to detect if the component was
      // hidden (by Offscreen API), or fast refresh occured;
      // Only in these situations would the effect cleanup
      // for "unmounting" run multiple times, so if
      // we are ever able to read this ref with a value
      // of true, it means that one of these cases
      // has happened.
      maybeHiddenOrFastRefresh.current = true;
    };
  }, []);
  useEffect(function () {
    if (maybeHiddenOrFastRefresh.current === true) {
      // This block only runs if the component has previously "unmounted"
      // due to it being hidden by the Offscreen API, or during fast refresh.
      // At this point, the current queryReference will have been disposed
      // by the previous cleanup, so instead of attempting to
      // do our regular commit setup, which would incorrectly leave our
      // current queryReference disposed, we need to load the query again
      // and force a re-render by calling queryLoaderCallback again,
      // so that the queryReference is correctly re-retained, and
      // potentially refetched if necessary.
      maybeHiddenOrFastRefresh.current = false;

      if (queryReference.kind !== 'NullQueryReference') {
        queryLoaderCallback(queryReference.variables, {
          fetchPolicy: queryReference.fetchPolicy,
          networkCacheConfig: queryReference.networkCacheConfig
        });
      }

      return;
    } // When a new queryReference is committed, we iterate over all
    // query references in undisposedQueryReferences and dispose all of
    // the refs that aren't the currently committed one. This ensures
    // that we don't leave any dangling query references for the
    // case that loadQuery is called multiple times before commit; when
    // this happens, multiple state updates will be scheduled, but only one
    // will commit, meaning that we need to keep track of and dispose any
    // query references that don't end up committing.
    // - We are relying on the fact that sets iterate in insertion order, and we
    // can remove items from a set as we iterate over it (i.e. no iterator
    // invalidation issues.) Thus, it is safe to loop through
    // undisposedQueryReferences until we find queryReference, and
    // remove and dispose all previous references.
    // - We are guaranteed to find queryReference in the set, because if a
    // state update results in a commit, no state updates initiated prior to that
    // one will be committed, and we are disposing and removing references
    // associated with updates that were scheduled prior to the currently
    // committing state change. (A useEffect callback is called during the commit
    // phase.)


    var undisposedQueryReferences = undisposedQueryReferencesRef.current;

    if (isMountedRef.current) {
      var _iterator = (0, _createForOfIteratorHelper2["default"])(undisposedQueryReferences),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var undisposedQueryReference = _step.value;

          if (undisposedQueryReference === queryReference) {
            break;
          }

          undisposedQueryReferences["delete"](undisposedQueryReference);

          if (undisposedQueryReference.kind !== 'NullQueryReference') {
            undisposedQueryReference.dispose && undisposedQueryReference.dispose();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, [queryReference, isMountedRef, queryLoaderCallback]);
  useEffect(function () {
    return function disposeAllRemainingQueryReferences() {
      // undisposedQueryReferences.current is never reassigned
      // eslint-disable-next-line react-hooks/exhaustive-deps
      var _iterator2 = (0, _createForOfIteratorHelper2["default"])(undisposedQueryReferencesRef.current),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var unhandledStateChange = _step2.value;

          if (unhandledStateChange.kind !== 'NullQueryReference') {
            unhandledStateChange.dispose && unhandledStateChange.dispose();
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    };
  }, []);
  return [queryReference.kind === 'NullQueryReference' ? null : queryReference, queryLoaderCallback, disposeQuery];
}

module.exports = useQueryLoader;

/***/ }),

/***/ 8931:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var useRefetchableFragmentNode = __webpack_require__(433);

var useStaticFragmentNodeWarning = __webpack_require__(8716);

var _require = __webpack_require__(657),
    useDebugValue = _require.useDebugValue;

var _require2 = __webpack_require__(3271),
    getFragment = _require2.getFragment;

function useRefetchableFragment(fragmentInput, fragmentRef) {
  var fragmentNode = getFragment(fragmentInput);
  useStaticFragmentNodeWarning(fragmentNode, 'first argument of useRefetchableFragment()');

  var _useRefetchableFragme = useRefetchableFragmentNode(fragmentNode, fragmentRef, 'useRefetchableFragment()'),
      fragmentData = _useRefetchableFragme.fragmentData,
      refetch = _useRefetchableFragme.refetch;

  if (false) {}
  /* $FlowExpectedError[prop-missing] : Exposed options is a subset of internal
   * options */


  return [fragmentData, refetch];
}

module.exports = useRefetchableFragment;

/***/ }),

/***/ 433:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _typeof = __webpack_require__(3634);

var _interopRequireDefault = __webpack_require__(249);

var _objectSpread2 = _interopRequireDefault(__webpack_require__(4638));

var ProfilerContext = __webpack_require__(5116);

var getRefetchMetadata = __webpack_require__(6469);

var getValueAtPath = __webpack_require__(6830);

var invariant = __webpack_require__(4990);

var useFragmentNode = __webpack_require__(7556);

var useIsMountedRef = __webpack_require__(3581);

var useQueryLoader = __webpack_require__(2729);

var useRelayEnvironment = __webpack_require__(9708);

var warning = __webpack_require__(480);

var _require = __webpack_require__(9495),
    getFragmentResourceForEnvironment = _require.getFragmentResourceForEnvironment;

var _require2 = __webpack_require__(9267),
    getQueryResourceForEnvironment = _require2.getQueryResourceForEnvironment;

var _require3 = __webpack_require__(657),
    useCallback = _require3.useCallback,
    useContext = _require3.useContext,
    useReducer = _require3.useReducer;

var _require4 = __webpack_require__(3271),
    fetchQuery = _require4.__internal.fetchQuery,
    createOperationDescriptor = _require4.createOperationDescriptor,
    getFragmentIdentifier = _require4.getFragmentIdentifier,
    getSelector = _require4.getSelector;

function reducer(state, action) {
  switch (action.type) {
    case 'refetch':
      {
        var _action$refetchEnviro;

        return (0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, state), {}, {
          fetchPolicy: action.fetchPolicy,
          mirroredEnvironment: (_action$refetchEnviro = action.refetchEnvironment) !== null && _action$refetchEnviro !== void 0 ? _action$refetchEnviro : state.mirroredEnvironment,
          onComplete: action.onComplete,
          refetchEnvironment: action.refetchEnvironment,
          refetchQuery: action.refetchQuery,
          renderPolicy: action.renderPolicy
        });
      }

    case 'reset':
      {
        return {
          fetchPolicy: undefined,
          mirroredEnvironment: action.environment,
          mirroredFragmentIdentifier: action.fragmentIdentifier,
          onComplete: undefined,
          refetchQuery: null,
          renderPolicy: undefined
        };
      }

    default:
      {
        action.type;
        throw new Error('useRefetchableFragmentNode: Unexpected action type');
      }
  }
}

function useRefetchableFragmentNode(fragmentNode, parentFragmentRef, componentDisplayName) {
  var parentEnvironment = useRelayEnvironment();

  var _getRefetchMetadata = getRefetchMetadata(fragmentNode, componentDisplayName),
      refetchableRequest = _getRefetchMetadata.refetchableRequest,
      fragmentRefPathInResponse = _getRefetchMetadata.fragmentRefPathInResponse,
      identifierField = _getRefetchMetadata.identifierField;

  var fragmentIdentifier = getFragmentIdentifier(fragmentNode, parentFragmentRef);

  var _useReducer = useReducer(reducer, {
    fetchPolicy: undefined,
    mirroredEnvironment: parentEnvironment,
    mirroredFragmentIdentifier: fragmentIdentifier,
    onComplete: undefined,
    refetchEnvironment: null,
    refetchQuery: null,
    renderPolicy: undefined
  }),
      refetchState = _useReducer[0],
      dispatch = _useReducer[1];

  var fetchPolicy = refetchState.fetchPolicy,
      mirroredEnvironment = refetchState.mirroredEnvironment,
      mirroredFragmentIdentifier = refetchState.mirroredFragmentIdentifier,
      onComplete = refetchState.onComplete,
      refetchEnvironment = refetchState.refetchEnvironment,
      refetchQuery = refetchState.refetchQuery,
      renderPolicy = refetchState.renderPolicy;
  var environment = refetchEnvironment !== null && refetchEnvironment !== void 0 ? refetchEnvironment : parentEnvironment;
  var QueryResource = getQueryResourceForEnvironment(environment);
  var FragmentResource = getFragmentResourceForEnvironment(environment);
  var profilerContext = useContext(ProfilerContext);
  var shouldReset = environment !== mirroredEnvironment || fragmentIdentifier !== mirroredFragmentIdentifier;

  var _useQueryLoader = useQueryLoader(refetchableRequest),
      queryRef = _useQueryLoader[0],
      loadQuery = _useQueryLoader[1],
      disposeQuery = _useQueryLoader[2];

  var fragmentRef = parentFragmentRef;

  if (shouldReset) {
    dispatch({
      type: 'reset',
      environment: environment,
      fragmentIdentifier: fragmentIdentifier
    });
    disposeQuery();
  } else if (refetchQuery != null && queryRef != null) {
    // If refetch was called, we expect to have a refetchQuery and queryRef
    // in state, since both state updates to set the refetchQuery and the
    // queryRef occur simultaneously.
    // In this case, we need to read the refetched query data (potentially
    // suspending if it's in flight), and extract the new fragment ref
    // from the query in order read the current @refetchable fragment
    // with the updated fragment owner as the new refetchQuery.
    // Before observing the refetch, record the current ID and typename
    // so that, if we are refetching existing data on
    // a field that implements Node, after refetching we
    // can validate that the received data is consistent
    var debugPreviousIDAndTypename;

    if (false) {}

    var handleQueryCompleted = function handleQueryCompleted(maybeError) {
      onComplete && onComplete(maybeError !== null && maybeError !== void 0 ? maybeError : null);
    }; // The queryRef.source obtained from useQueryLoader will be
    // an observable we can consume /if/ a network request was
    // started. Otherwise, given that QueryResource.prepare
    // always expects an observable we fall back to a new network
    // observable. Note however that if loadQuery did not make a network
    // request, we don't expect to make one here, unless the state of
    // the cache has changed between the call to refetch and this
    // render.


    var fetchObservable = queryRef.source != null ? queryRef.source : fetchQuery(environment, refetchQuery); // Now wwe can we read the refetch query here using the
    // queryRef provided from useQueryLoader. Note that the
    // network request is started during the call to refetch,
    // but if the refetch query is still in flight, we will suspend
    // at this point:

    var queryResult = profilerContext.wrapPrepareQueryResource(function () {
      return QueryResource.prepare(refetchQuery, fetchObservable, fetchPolicy, renderPolicy, {
        error: handleQueryCompleted,
        complete: function complete() {
          // Validate that the type of the object we got back matches the type
          // of the object already in the store
          if (false) {}

          handleQueryCompleted();
        }
      }, queryRef.fetchKey, profilerContext);
    });
    var queryData = FragmentResource.read(queryResult.fragmentNode, queryResult.fragmentRef, componentDisplayName).data;
    !(queryData != null) ?  false ? 0 : invariant(false) : void 0; // After reading/fetching the refetch query, we extract from the
    // refetch query response the new fragment ref we need to use to read
    // the fragment. The new fragment ref will point to the refetch query
    // as its fragment owner.

    var refetchedFragmentRef = getValueAtPath(queryData, fragmentRefPathInResponse);
    fragmentRef = refetchedFragmentRef;

    if (false) {}
  } // We read and subscribe to the fragment using useFragmentNode.
  // If refetch was called, we read the fragment using the new computed
  // fragment ref from the refetch query response; otherwise, we use the
  // fragment ref passed by the caller as normal.


  var _useFragmentNode = useFragmentNode(fragmentNode, fragmentRef, componentDisplayName),
      fragmentData = _useFragmentNode.data,
      disableStoreUpdates = _useFragmentNode.disableStoreUpdates,
      enableStoreUpdates = _useFragmentNode.enableStoreUpdates;

  var refetch = useRefetchFunction(componentDisplayName, dispatch, disposeQuery, fragmentData, fragmentIdentifier, fragmentNode, fragmentRefPathInResponse, identifierField, loadQuery, parentFragmentRef, refetchableRequest);
  return {
    fragmentData: fragmentData,
    fragmentRef: fragmentRef,
    refetch: refetch,
    disableStoreUpdates: disableStoreUpdates,
    enableStoreUpdates: enableStoreUpdates
  };
}

function useRefetchFunction(componentDisplayName, dispatch, disposeQuery, fragmentData, fragmentIdentifier, fragmentNode, fragmentRefPathInResponse, identifierField, loadQuery, parentFragmentRef, refetchableRequest) {
  var isMountedRef = useIsMountedRef();
  var identifierValue = identifierField != null && fragmentData != null && _typeof(fragmentData) === 'object' ? fragmentData[identifierField] : null;
  return useCallback(function (providedRefetchVariables, options) {
    // Bail out and warn if we're trying to refetch after the component
    // has unmounted
    if (isMountedRef.current !== true) {
       false ? 0 : void 0;
      return {
        dispose: function dispose() {}
      };
    }

    if (parentFragmentRef == null) {
       false ? 0 : void 0;
    }

    var refetchEnvironment = options === null || options === void 0 ? void 0 : options.__environment;
    var fetchPolicy = options === null || options === void 0 ? void 0 : options.fetchPolicy;
    var renderPolicy = options === null || options === void 0 ? void 0 : options.UNSTABLE_renderPolicy;
    var onComplete = options === null || options === void 0 ? void 0 : options.onComplete;
    var fragmentSelector = getSelector(fragmentNode, parentFragmentRef);
    var parentVariables;
    var fragmentVariables;

    if (fragmentSelector == null) {
      parentVariables = {};
      fragmentVariables = {};
    } else if (fragmentSelector.kind === 'PluralReaderSelector') {
      var _fragmentSelector$sel, _fragmentSelector$sel2, _fragmentSelector$sel3, _fragmentSelector$sel4;

      parentVariables = (_fragmentSelector$sel = (_fragmentSelector$sel2 = fragmentSelector.selectors[0]) === null || _fragmentSelector$sel2 === void 0 ? void 0 : _fragmentSelector$sel2.owner.variables) !== null && _fragmentSelector$sel !== void 0 ? _fragmentSelector$sel : {};
      fragmentVariables = (_fragmentSelector$sel3 = (_fragmentSelector$sel4 = fragmentSelector.selectors[0]) === null || _fragmentSelector$sel4 === void 0 ? void 0 : _fragmentSelector$sel4.variables) !== null && _fragmentSelector$sel3 !== void 0 ? _fragmentSelector$sel3 : {};
    } else {
      parentVariables = fragmentSelector.owner.variables;
      fragmentVariables = fragmentSelector.variables;
    } // A user of `useRefetchableFragment()` may pass a subset of
    // all variables required by the fragment when calling `refetch()`.
    // We fill in any variables not passed by the call to `refetch()` with the
    // variables from the original parent fragment owner.
    // $FlowFixMe[cannot-spread-interface]


    var refetchVariables = (0, _objectSpread2["default"])((0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, parentVariables), fragmentVariables), providedRefetchVariables); // If the query needs an identifier value ('id' or similar) and one
    // was not explicitly provided, read it from the fragment data.

    if (identifierField != null && !providedRefetchVariables.hasOwnProperty('id')) {
      // @refetchable fragments are guaranteed to have an `id` selection
      // if the type is Node, implements Node, or is @fetchable. Double-check
      // that there actually is a value at runtime.
      if (typeof identifierValue !== 'string') {
         false ? 0 : void 0;
      }

      refetchVariables.id = identifierValue;
    }

    var refetchQuery = createOperationDescriptor(refetchableRequest, refetchVariables, {
      force: true
    }); // We call loadQuery which will start a network request if necessary
    // and update the querRef from useQueryLoader.
    // Note the following:
    // - loadQuery will dispose of any previously refetched queries.
    // - We use the variables extracted off the OperationDescriptor
    // so that they have been filtered out to include only the
    // variables actually declared in the query.

    loadQuery(refetchQuery.request.variables, {
      fetchPolicy: fetchPolicy,
      __environment: refetchEnvironment,
      __nameForWarning: 'refetch'
    });
    dispatch({
      type: 'refetch',
      fetchPolicy: fetchPolicy,
      onComplete: onComplete,
      refetchEnvironment: refetchEnvironment,
      refetchQuery: refetchQuery,
      renderPolicy: renderPolicy
    });
    return {
      dispose: disposeQuery
    };
  }, // NOTE: We disable react-hooks-deps warning because:
  //   - We know fragmentRefPathInResponse is static, so it can be omitted from
  //     deps
  //   - We know fragmentNode is static, so it can be omitted from deps.
  //   - fragmentNode and parentFragmentRef are also captured by including
  //     fragmentIdentifier
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [fragmentIdentifier, dispatch, disposeQuery, identifierValue]);
}

var debugFunctions;

if (false) {}

module.exports = useRefetchableFragmentNode;

/***/ }),

/***/ 9708:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var ReactRelayContext = __webpack_require__(5569);

var invariant = __webpack_require__(4990);

var _require = __webpack_require__(657),
    useContext = _require.useContext;

function useRelayEnvironment() {
  var context = useContext(ReactRelayContext);
  !(context != null) ?  false ? 0 : invariant(false) : void 0;
  return context.environment;
}

module.exports = useRelayEnvironment;

/***/ }),

/***/ 8716:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var warning = __webpack_require__(480);

var _require = __webpack_require__(657),
    useRef = _require.useRef;

function useStaticFragmentNodeWarning(fragmentNode, warningContext) {
  if (false) { var initialPropRef; }
}

module.exports = useStaticFragmentNodeWarning;

/***/ }),

/***/ 7874:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var useRelayEnvironment = __webpack_require__(9708);

var _require = __webpack_require__(657),
    useEffect = _require.useEffect,
    useRef = _require.useRef;
/**
 * This hook subscribes a callback to the invalidation state of the given data
 * ids.
 * Any time the invalidation state of the given data ids changes, the provided
 * callback will be called.
 * If new ids or a new callback are provided, the subscription will be
 * re-established and the previous one will be disposed.
 * The subscription will automatically be disposed on unmount
 */


function useSubscribeToInvalidationState(dataIDs, callback) {
  var environment = useRelayEnvironment();
  var disposableRef = useRef(null);
  var stableDataIDs = Array.from(dataIDs).sort().join('');
  useEffect(function () {
    var store = environment.getStore();
    var invalidationState = store.lookupInvalidationState(dataIDs);
    var disposable = store.subscribeToInvalidationState(invalidationState, callback);
    disposableRef.current = disposable;
    return function () {
      return disposable.dispose();
    }; // Intentionally excluding dataIDs, since we're using stableDataIDs
    // instead
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stableDataIDs, callback, environment]);
  return {
    dispose: function dispose() {
      if (disposableRef.current != null) {
        disposableRef.current.dispose();
      }
    }
  };
}

module.exports = useSubscribeToInvalidationState;

/***/ }),

/***/ 312:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var React = __webpack_require__(657);

var useRelayEnvironment = __webpack_require__(9708);

var _require = __webpack_require__(3271),
    requestSubscription = _require.requestSubscription;

function useSubscription(config, requestSubscriptionFn) {
  // N.B. this will re-subscribe every render if config or requestSubscriptionFn
  // are not memoized.
  // Please do not pass an object defined in-line.
  var actualRequestSubscription = requestSubscriptionFn !== null && requestSubscriptionFn !== void 0 ? requestSubscriptionFn : requestSubscription;
  var environment = useRelayEnvironment();
  React.useEffect(function () {
    var _requestSubscription = requestSubscription(environment, config),
        dispose = _requestSubscription.dispose;

    return dispose;
  }, [environment, config, actualRequestSubscription]);
}

module.exports = useSubscription;

/***/ }),

/***/ 5736:
/***/ ((module) => {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 5059:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeToArray = __webpack_require__(5736);

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 9922:
/***/ ((module) => {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 2552:
/***/ ((module) => {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 2689:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var setPrototypeOf = __webpack_require__(2900);

var isNativeReflectConstruct = __webpack_require__(4846);

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
    module.exports.default = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };

    module.exports.default = module.exports, module.exports.__esModule = true;
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 8629:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var unsupportedIterableToArray = __webpack_require__(5273);

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function F() {};

      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

module.exports = _createForOfIteratorHelper;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 3116:
/***/ ((module) => {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 3339:
/***/ ((module) => {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  module.exports.default = module.exports, module.exports.__esModule = true;
  return _extends.apply(this, arguments);
}

module.exports = _extends;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 9608:
/***/ ((module) => {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  module.exports.default = module.exports, module.exports.__esModule = true;
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 267:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var setPrototypeOf = __webpack_require__(2900);

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 914:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var setPrototypeOf = __webpack_require__(2900);

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  setPrototypeOf(subClass, superClass);
}

module.exports = _inheritsLoose;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 249:
/***/ ((module) => {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 8135:
/***/ ((module) => {

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

module.exports = _isNativeFunction;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 4846:
/***/ ((module) => {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = _isNativeReflectConstruct;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 3627:
/***/ ((module) => {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

module.exports = _iterableToArray;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 9614:
/***/ ((module) => {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 4638:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var defineProperty = __webpack_require__(3116);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

module.exports = _objectSpread2;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 5305:
/***/ ((module) => {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 8177:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _typeof = __webpack_require__(3634).default;

var assertThisInitialized = __webpack_require__(9922);

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 2900:
/***/ ((module) => {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  module.exports.default = module.exports, module.exports.__esModule = true;
  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 3749:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayWithoutHoles = __webpack_require__(5059);

var iterableToArray = __webpack_require__(3627);

var unsupportedIterableToArray = __webpack_require__(5273);

var nonIterableSpread = __webpack_require__(9614);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 3634:
/***/ ((module) => {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };

    module.exports.default = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    module.exports.default = module.exports, module.exports.__esModule = true;
  }

  return _typeof(obj);
}

module.exports = _typeof;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 5273:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var arrayLikeToArray = __webpack_require__(5736);

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 8471:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var getPrototypeOf = __webpack_require__(9608);

var setPrototypeOf = __webpack_require__(2900);

var isNativeFunction = __webpack_require__(8135);

var construct = __webpack_require__(2689);

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return construct(Class, arguments, getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return setPrototypeOf(Wrapper, Class);
  };

  module.exports.default = module.exports, module.exports.__esModule = true;
  return _wrapNativeSuper(Class);
}

module.exports = _wrapNativeSuper;
module.exports.default = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ 5776:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(2669);

/***/ }),

/***/ 4074:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


var _regeneratorRuntime = __webpack_require__(5776);

var _typeof = __webpack_require__(3634);

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.serveSinglePageApp = exports.mapRequestToAsset = exports.getAssetFromKV = void 0;

var mime = __webpack_require__(8221);

var types_1 = __webpack_require__(7967);

Object.defineProperty(exports, "MethodNotAllowedError", ({
  enumerable: true,
  get: function get() {
    return types_1.MethodNotAllowedError;
  }
}));
Object.defineProperty(exports, "NotFoundError", ({
  enumerable: true,
  get: function get() {
    return types_1.NotFoundError;
  }
}));
Object.defineProperty(exports, "InternalError", ({
  enumerable: true,
  get: function get() {
    return types_1.InternalError;
  }
}));
var defaultCacheControl = {
  browserTTL: null,
  edgeTTL: 2 * 60 * 60 * 24,
  bypassCache: false // do not bypass Cloudflare's cache

};

function assignOptions(options) {
  // Assign any missing options passed in to the default
  // options.mapRequestToAsset is handled manually later
  return Object.assign({
    ASSET_NAMESPACE: __STATIC_CONTENT,
    ASSET_MANIFEST: __STATIC_CONTENT_MANIFEST,
    cacheControl: defaultCacheControl,
    defaultMimeType: 'text/plain',
    defaultDocument: 'index.html'
  }, options);
}
/**
 * maps the path of incoming request to the request pathKey to look up
 * in bucket and in cache
 * e.g.  for a path '/' returns '/index.html' which serves
 * the content of bucket/index.html
 * @param {Request} request incoming request
 */


var mapRequestToAsset = function mapRequestToAsset(request, options) {
  options = assignOptions(options);
  var parsedUrl = new URL(request.url);
  var pathname = parsedUrl.pathname;

  if (pathname.endsWith('/')) {
    // If path looks like a directory append options.defaultDocument
    // e.g. If path is /about/ -> /about/index.html
    pathname = pathname.concat(options.defaultDocument);
  } else if (!mime.getType(pathname)) {
    // If path doesn't look like valid content
    //  e.g. /about.me ->  /about.me/index.html
    pathname = pathname.concat('/' + options.defaultDocument);
  }

  parsedUrl.pathname = pathname;
  return new Request(parsedUrl.toString(), request);
};

exports.mapRequestToAsset = mapRequestToAsset;
/**
 * maps the path of incoming request to /index.html if it evaluates to
 * any HTML file.
 * @param {Request} request incoming request
 */

function serveSinglePageApp(request, options) {
  options = assignOptions(options); // First apply the default handler, which already has logic to detect
  // paths that should map to HTML files.

  request = mapRequestToAsset(request, options);
  var parsedUrl = new URL(request.url); // Detect if the default handler decided to map to
  // a HTML file in some specific directory.

  if (parsedUrl.pathname.endsWith('.html')) {
    // If expected HTML file was missing, just return the root index.html (or options.defaultDocument)
    return new Request("".concat(parsedUrl.origin, "/").concat(options.defaultDocument), request);
  } else {
    // The default handler decided this is not an HTML page. It's probably
    // an image, CSS, or JS file. Leave it as-is.
    return request;
  }
}

exports.serveSinglePageApp = serveSinglePageApp;
/**
 * takes the path of the incoming request, gathers the appropriate content from KV, and returns
 * the response
 *
 * @param {FetchEvent} event the fetch event of the triggered request
 * @param {{mapRequestToAsset: (string: Request) => Request, cacheControl: {bypassCache:boolean, edgeTTL: number, browserTTL:number}, ASSET_NAMESPACE: any, ASSET_MANIFEST:any}} [options] configurable options
 * @param {CacheControl} [options.cacheControl] determine how to cache on Cloudflare and the browser
 * @param {typeof(options.mapRequestToAsset)} [options.mapRequestToAsset]  maps the path of incoming request to the request pathKey to look up
 * @param {Object | string} [options.ASSET_NAMESPACE] the binding to the namespace that script references
 * @param {any} [options.ASSET_MANIFEST] the map of the key to cache and store in KV
 * */

var getAssetFromKV = function getAssetFromKV(event, options) {
  return __awaiter(void 0, void 0, void 0, /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var request, ASSET_NAMESPACE, ASSET_MANIFEST, rawPathKey, pathIsEncoded, requestKey, mappedRequest, mappedRawPathKey, SUPPORTED_METHODS, parsedUrl, pathname, pathKey, cache, mimeType, shouldEdgeCache, cacheKey, evalCacheOpts, formatETag, shouldSetBrowserCache, response, opts, body, etag, ifNoneMatch, proxyCacheStatus;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = assignOptions(options);
            request = event.request;
            ASSET_NAMESPACE = options.ASSET_NAMESPACE;
            ASSET_MANIFEST = typeof options.ASSET_MANIFEST === 'string' ? JSON.parse(options.ASSET_MANIFEST) : options.ASSET_MANIFEST;

            if (!(typeof ASSET_NAMESPACE === 'undefined')) {
              _context.next = 6;
              break;
            }

            throw new types_1.InternalError("there is no KV namespace bound to the script");

          case 6:
            rawPathKey = new URL(request.url).pathname.replace(/^\/+/, ''); // strip any preceding /'s

            pathIsEncoded = false;

            // if options.mapRequestToAsset is explicitly passed in, always use it and assume user has own intentions
            // otherwise handle request as normal, with default mapRequestToAsset below
            if (options.mapRequestToAsset) {
              requestKey = options.mapRequestToAsset(request);
            } else if (ASSET_MANIFEST[rawPathKey]) {
              requestKey = request;
            } else if (ASSET_MANIFEST[decodeURIComponent(rawPathKey)]) {
              pathIsEncoded = true;
              requestKey = request;
            } else {
              mappedRequest = mapRequestToAsset(request);
              mappedRawPathKey = new URL(mappedRequest.url).pathname.replace(/^\/+/, '');

              if (ASSET_MANIFEST[decodeURIComponent(mappedRawPathKey)]) {
                pathIsEncoded = true;
                requestKey = mappedRequest;
              } else {
                // use default mapRequestToAsset
                requestKey = mapRequestToAsset(request, options);
              }
            }

            SUPPORTED_METHODS = ['GET', 'HEAD'];

            if (SUPPORTED_METHODS.includes(requestKey.method)) {
              _context.next = 12;
              break;
            }

            throw new types_1.MethodNotAllowedError("".concat(requestKey.method, " is not a valid request method"));

          case 12:
            parsedUrl = new URL(requestKey.url);
            pathname = pathIsEncoded ? decodeURIComponent(parsedUrl.pathname) : parsedUrl.pathname; // decode percentage encoded path only when necessary
            // pathKey is the file path to look up in the manifest

            pathKey = pathname.replace(/^\/+/, ''); // remove prepended /
            // @ts-ignore

            cache = caches.default;
            mimeType = mime.getType(pathKey) || options.defaultMimeType;

            if (mimeType.startsWith('text') || mimeType === 'application/javascript') {
              mimeType += '; charset=utf-8';
            }

            shouldEdgeCache = false; // false if storing in KV by raw file path i.e. no hash
            // check manifest for map from file path to hash

            if (typeof ASSET_MANIFEST !== 'undefined') {
              if (ASSET_MANIFEST[pathKey]) {
                pathKey = ASSET_MANIFEST[pathKey]; // if path key is in asset manifest, we can assume it contains a content hash and can be cached

                shouldEdgeCache = true;
              }
            } // TODO this excludes search params from cache, investigate ideal behavior


            cacheKey = new Request("".concat(parsedUrl.origin, "/").concat(pathKey), request); // if argument passed in for cacheControl is a function then
            // evaluate that function. otherwise return the Object passed in
            // or default Object

            evalCacheOpts = function () {
              switch (_typeof(options.cacheControl)) {
                case 'function':
                  return options.cacheControl(request);

                case 'object':
                  return options.cacheControl;

                default:
                  return defaultCacheControl;
              }
            }(); // formats the etag depending on the response context. if the entityId
            // is invalid, returns an empty string (instead of null) to prevent the
            // the potentially disastrous scenario where the value of the Etag resp
            // header is "null". Could be modified in future to base64 encode etc


            formatETag = function formatETag() {
              var entityId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : pathKey;
              var validatorType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'strong';

              if (!entityId) {
                return '';
              }

              switch (validatorType) {
                case 'weak':
                  if (!entityId.startsWith('W/')) {
                    return "W/".concat(entityId);
                  }

                  return entityId;

                case 'strong':
                  if (entityId.startsWith("W/\"")) {
                    entityId = entityId.replace('W/', '');
                  }

                  if (!entityId.endsWith("\"")) {
                    entityId = "\"".concat(entityId, "\"");
                  }

                  return entityId;

                default:
                  return '';
              }
            };

            options.cacheControl = Object.assign({}, defaultCacheControl, evalCacheOpts); // override shouldEdgeCache if options say to bypassCache

            if (options.cacheControl.bypassCache || options.cacheControl.edgeTTL === null || request.method == 'HEAD') {
              shouldEdgeCache = false;
            } // only set max-age if explicitly passed in a number as an arg


            shouldSetBrowserCache = typeof options.cacheControl.browserTTL === 'number';
            response = null;

            if (!shouldEdgeCache) {
              _context.next = 31;
              break;
            }

            _context.next = 30;
            return cache.match(cacheKey);

          case 30:
            response = _context.sent;

          case 31:
            if (!response) {
              _context.next = 35;
              break;
            }

            if (response.status > 300 && response.status < 400) {
              if (response.body && 'cancel' in Object.getPrototypeOf(response.body)) {
                response.body.cancel();
                console.log('Body exists and environment supports readable streams. Body cancelled');
              } else {
                console.log('Environment doesnt support readable streams');
              }

              response = new Response(null, response);
            } else {
              // fixes #165
              opts = {
                headers: new Headers(response.headers),
                status: 0,
                statusText: ''
              };
              opts.headers.set('cf-cache-status', 'HIT');

              if (response.status) {
                opts.status = response.status;
                opts.statusText = response.statusText;
              } else if (opts.headers.has('Content-Range')) {
                opts.status = 206;
                opts.statusText = 'Partial Content';
              } else {
                opts.status = 200;
                opts.statusText = 'OK';
              }

              response = new Response(response.body, opts);
            }

            _context.next = 42;
            break;

          case 35:
            _context.next = 37;
            return ASSET_NAMESPACE.get(pathKey, 'arrayBuffer');

          case 37:
            body = _context.sent;

            if (!(body === null)) {
              _context.next = 40;
              break;
            }

            throw new types_1.NotFoundError("could not find ".concat(pathKey, " in your content namespace"));

          case 40:
            response = new Response(body);

            if (shouldEdgeCache) {
              response.headers.set('Accept-Ranges', 'bytes');
              response.headers.set('Content-Length', body.length); // set etag before cache insertion

              if (!response.headers.has('etag')) {
                response.headers.set('etag', formatETag(pathKey, 'strong'));
              } // determine Cloudflare cache behavior


              response.headers.set('Cache-Control', "max-age=".concat(options.cacheControl.edgeTTL));
              event.waitUntil(cache.put(cacheKey, response.clone()));
              response.headers.set('CF-Cache-Status', 'MISS');
            }

          case 42:
            response.headers.set('Content-Type', mimeType);

            if (response.status === 304) {
              etag = formatETag(response.headers.get('etag'), 'strong');
              ifNoneMatch = cacheKey.headers.get('if-none-match');
              proxyCacheStatus = response.headers.get('CF-Cache-Status');

              if (etag) {
                if (ifNoneMatch && ifNoneMatch === etag && proxyCacheStatus === 'MISS') {
                  response.headers.set('CF-Cache-Status', 'EXPIRED');
                } else {
                  response.headers.set('CF-Cache-Status', 'REVALIDATED');
                }

                response.headers.set('etag', formatETag(etag, 'weak'));
              }
            }

            if (shouldSetBrowserCache) {
              response.headers.set('Cache-Control', "max-age=".concat(options.cacheControl.browserTTL));
            } else {
              response.headers.delete('Cache-Control');
            }

            return _context.abrupt("return", response);

          case 46:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
};

exports.getAssetFromKV = getAssetFromKV;

/***/ }),

/***/ 7967:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var _classCallCheck = __webpack_require__(2552);

var _assertThisInitialized = __webpack_require__(9922);

var _inherits = __webpack_require__(267);

var _possibleConstructorReturn = __webpack_require__(8177);

var _getPrototypeOf = __webpack_require__(9608);

var _wrapNativeSuper = __webpack_require__(8471);

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.InternalError = exports.NotFoundError = exports.MethodNotAllowedError = exports.KVError = void 0;

var KVError = /*#__PURE__*/function (_Error) {
  _inherits(KVError, _Error);

  var _super = _createSuper(KVError);

  function KVError(message) {
    var _this;

    var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    _classCallCheck(this, KVError);

    _this = _super.call(this, message); // see: typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html

    Object.setPrototypeOf(_assertThisInitialized(_this), (this instanceof KVError ? this.constructor : void 0).prototype); // restore prototype chain

    _this.name = KVError.name; // stack traces display correctly now

    _this.status = status;
    return _this;
  }

  return KVError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

exports.KVError = KVError;

var MethodNotAllowedError = /*#__PURE__*/function (_KVError) {
  _inherits(MethodNotAllowedError, _KVError);

  var _super2 = _createSuper(MethodNotAllowedError);

  function MethodNotAllowedError() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Not a valid request method";
    var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 405;

    _classCallCheck(this, MethodNotAllowedError);

    return _super2.call(this, message, status);
  }

  return MethodNotAllowedError;
}(KVError);

exports.MethodNotAllowedError = MethodNotAllowedError;

var NotFoundError = /*#__PURE__*/function (_KVError2) {
  _inherits(NotFoundError, _KVError2);

  var _super3 = _createSuper(NotFoundError);

  function NotFoundError() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Not Found";
    var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 404;

    _classCallCheck(this, NotFoundError);

    return _super3.call(this, message, status);
  }

  return NotFoundError;
}(KVError);

exports.NotFoundError = NotFoundError;

var InternalError = /*#__PURE__*/function (_KVError3) {
  _inherits(InternalError, _KVError3);

  var _super4 = _createSuper(InternalError);

  function InternalError() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Internal Error in KV Asset Handler";
    var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    _classCallCheck(this, InternalError);

    return _super4.call(this, message, status);
  }

  return InternalError;
}(KVError);

exports.InternalError = InternalError;

/***/ }),

/***/ 9074:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

var _typeof = __webpack_require__(3634);

var aStackPool = [];
var bStackPool = [];
/**
 * Checks if two values are equal. Values may be primitives, arrays, or objects.
 * Returns true if both arguments have the same keys and values.
 *
 * @see http://underscorejs.org
 * @copyright 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
 * @license MIT
 */

function areEqual(a, b) {
  var aStack = aStackPool.length ? aStackPool.pop() : [];
  var bStack = bStackPool.length ? bStackPool.pop() : [];
  var result = eq(a, b, aStack, bStack);
  aStack.length = 0;
  bStack.length = 0;
  aStackPool.push(aStack);
  bStackPool.push(bStack);
  return result;
}

function eq(a, b, aStack, bStack) {
  if (a === b) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    return a !== 0 || 1 / a == 1 / b;
  }

  if (a == null || b == null) {
    // a or b can be `null` or `undefined`
    return false;
  }

  if (_typeof(a) != 'object' || _typeof(b) != 'object') {
    return false;
  }

  var objToStr = Object.prototype.toString;
  var className = objToStr.call(a);

  if (className != objToStr.call(b)) {
    return false;
  }

  switch (className) {
    case '[object String]':
      return a == String(b);

    case '[object Number]':
      return isNaN(a) || isNaN(b) ? false : a == Number(b);

    case '[object Date]':
    case '[object Boolean]':
      return +a == +b;

    case '[object RegExp]':
      return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
  } // Assume equality for cyclic structures.


  var length = aStack.length;

  while (length--) {
    if (aStack[length] == a) {
      return bStack[length] == b;
    }
  }

  aStack.push(a);
  bStack.push(b);
  var size = 0; // Recursively compare objects and arrays.

  if (className === '[object Array]') {
    size = a.length;

    if (size !== b.length) {
      return false;
    } // Deep compare the contents, ignoring non-numeric properties.


    while (size--) {
      if (!eq(a[size], b[size], aStack, bStack)) {
        return false;
      }
    }
  } else {
    if (a.constructor !== b.constructor) {
      return false;
    }

    if (a.hasOwnProperty('valueOf') && b.hasOwnProperty('valueOf')) {
      return a.valueOf() == b.valueOf();
    }

    var keys = Object.keys(a);

    if (keys.length != Object.keys(b).length) {
      return false;
    }

    for (var i = 0; i < keys.length; i++) {
      if (!eq(a[keys[i]], b[keys[i]], aStack, bStack)) {
        return false;
      }
    }
  }

  aStack.pop();
  bStack.pop();
  return true;
}

module.exports = areEqual;

/***/ }),

/***/ 5971:
/***/ ((module) => {

"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}
/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */


var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);

emptyFunction.thatReturnsThis = function () {
  return this;
};

emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),

/***/ 480:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */


var emptyFunction = __webpack_require__(5971);
/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */


function printWarning(format) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var argIndex = 0;
  var message = 'Warning: ' + format.replace(/%s/g, function () {
    return args[argIndex++];
  });

  if (typeof console !== 'undefined') {
    console.error(message);
  }

  try {
    // --- Welcome to debugging React ---
    // This error was thrown as a convenience so that you can use this stack
    // to find the callsite that caused this warning to fire.
    throw new Error(message);
  } catch (x) {}
}

var warning =  false ? 0 : emptyFunction;
module.exports = warning;

/***/ }),

/***/ 4990:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function invariant(condition, format, a, b, c, d, e, f) {
  if (false) {}

  if (!condition) {
    var error;

    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame

    throw error;
  }
};

module.exports = invariant;

/***/ }),

/***/ 8436:
/***/ ((module) => {

"use strict";

/**
 * @param typeMap [Object] Map of MIME type -> Array[extensions]
 * @param ...
 */

function Mime() {
  this._types = Object.create(null);
  this._extensions = Object.create(null);

  for (var i = 0; i < arguments.length; i++) {
    this.define(arguments[i]);
  }

  this.define = this.define.bind(this);
  this.getType = this.getType.bind(this);
  this.getExtension = this.getExtension.bind(this);
}
/**
 * Define mimetype -> extension mappings.  Each key is a mime-type that maps
 * to an array of extensions associated with the type.  The first extension is
 * used as the default extension for the type.
 *
 * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
 *
 * If a type declares an extension that has already been defined, an error will
 * be thrown.  To suppress this error and force the extension to be associated
 * with the new type, pass `force`=true.  Alternatively, you may prefix the
 * extension with "*" to map the type to extension, without mapping the
 * extension to the type.
 *
 * e.g. mime.define({'audio/wav', ['wav']}, {'audio/x-wav', ['*wav']});
 *
 *
 * @param map (Object) type definitions
 * @param force (Boolean) if true, force overriding of existing definitions
 */


Mime.prototype.define = function (typeMap, force) {
  for (var type in typeMap) {
    var extensions = typeMap[type].map(function (t) {
      return t.toLowerCase();
    });
    type = type.toLowerCase();

    for (var i = 0; i < extensions.length; i++) {
      var ext = extensions[i]; // '*' prefix = not the preferred type for this extension.  So fixup the
      // extension, and skip it.

      if (ext[0] === '*') {
        continue;
      }

      if (!force && ext in this._types) {
        throw new Error('Attempt to change mapping for "' + ext + '" extension from "' + this._types[ext] + '" to "' + type + '". Pass `force=true` to allow this, otherwise remove "' + ext + '" from the list of extensions for "' + type + '".');
      }

      this._types[ext] = type;
    } // Use first extension as default


    if (force || !this._extensions[type]) {
      var _ext = extensions[0];
      this._extensions[type] = _ext[0] !== '*' ? _ext : _ext.substr(1);
    }
  }
};
/**
 * Lookup a mime type based on extension
 */


Mime.prototype.getType = function (path) {
  path = String(path);
  var last = path.replace(/^.*[/\\]/, '').toLowerCase();
  var ext = last.replace(/^.*\./, '').toLowerCase();
  var hasPath = last.length < path.length;
  var hasDot = ext.length < last.length - 1;
  return (hasDot || !hasPath) && this._types[ext] || null;
};
/**
 * Return file extension associated with a mime type
 */


Mime.prototype.getExtension = function (type) {
  type = /^\s*([^;\s]*)/.test(type) && RegExp.$1;
  return type && this._extensions[type.toLowerCase()] || null;
};

module.exports = Mime;

/***/ }),

/***/ 8221:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Mime = __webpack_require__(8436);

module.exports = new Mime(__webpack_require__(263), __webpack_require__(1305));

/***/ }),

/***/ 1305:
/***/ ((module) => {

module.exports = {
  "application/prs.cww": ["cww"],
  "application/vnd.1000minds.decision-model+xml": ["1km"],
  "application/vnd.3gpp.pic-bw-large": ["plb"],
  "application/vnd.3gpp.pic-bw-small": ["psb"],
  "application/vnd.3gpp.pic-bw-var": ["pvb"],
  "application/vnd.3gpp2.tcap": ["tcap"],
  "application/vnd.3m.post-it-notes": ["pwn"],
  "application/vnd.accpac.simply.aso": ["aso"],
  "application/vnd.accpac.simply.imp": ["imp"],
  "application/vnd.acucobol": ["acu"],
  "application/vnd.acucorp": ["atc", "acutc"],
  "application/vnd.adobe.air-application-installer-package+zip": ["air"],
  "application/vnd.adobe.formscentral.fcdt": ["fcdt"],
  "application/vnd.adobe.fxp": ["fxp", "fxpl"],
  "application/vnd.adobe.xdp+xml": ["xdp"],
  "application/vnd.adobe.xfdf": ["xfdf"],
  "application/vnd.ahead.space": ["ahead"],
  "application/vnd.airzip.filesecure.azf": ["azf"],
  "application/vnd.airzip.filesecure.azs": ["azs"],
  "application/vnd.amazon.ebook": ["azw"],
  "application/vnd.americandynamics.acc": ["acc"],
  "application/vnd.amiga.ami": ["ami"],
  "application/vnd.android.package-archive": ["apk"],
  "application/vnd.anser-web-certificate-issue-initiation": ["cii"],
  "application/vnd.anser-web-funds-transfer-initiation": ["fti"],
  "application/vnd.antix.game-component": ["atx"],
  "application/vnd.apple.installer+xml": ["mpkg"],
  "application/vnd.apple.keynote": ["key"],
  "application/vnd.apple.mpegurl": ["m3u8"],
  "application/vnd.apple.numbers": ["numbers"],
  "application/vnd.apple.pages": ["pages"],
  "application/vnd.apple.pkpass": ["pkpass"],
  "application/vnd.aristanetworks.swi": ["swi"],
  "application/vnd.astraea-software.iota": ["iota"],
  "application/vnd.audiograph": ["aep"],
  "application/vnd.balsamiq.bmml+xml": ["bmml"],
  "application/vnd.blueice.multipass": ["mpm"],
  "application/vnd.bmi": ["bmi"],
  "application/vnd.businessobjects": ["rep"],
  "application/vnd.chemdraw+xml": ["cdxml"],
  "application/vnd.chipnuts.karaoke-mmd": ["mmd"],
  "application/vnd.cinderella": ["cdy"],
  "application/vnd.citationstyles.style+xml": ["csl"],
  "application/vnd.claymore": ["cla"],
  "application/vnd.cloanto.rp9": ["rp9"],
  "application/vnd.clonk.c4group": ["c4g", "c4d", "c4f", "c4p", "c4u"],
  "application/vnd.cluetrust.cartomobile-config": ["c11amc"],
  "application/vnd.cluetrust.cartomobile-config-pkg": ["c11amz"],
  "application/vnd.commonspace": ["csp"],
  "application/vnd.contact.cmsg": ["cdbcmsg"],
  "application/vnd.cosmocaller": ["cmc"],
  "application/vnd.crick.clicker": ["clkx"],
  "application/vnd.crick.clicker.keyboard": ["clkk"],
  "application/vnd.crick.clicker.palette": ["clkp"],
  "application/vnd.crick.clicker.template": ["clkt"],
  "application/vnd.crick.clicker.wordbank": ["clkw"],
  "application/vnd.criticaltools.wbs+xml": ["wbs"],
  "application/vnd.ctc-posml": ["pml"],
  "application/vnd.cups-ppd": ["ppd"],
  "application/vnd.curl.car": ["car"],
  "application/vnd.curl.pcurl": ["pcurl"],
  "application/vnd.dart": ["dart"],
  "application/vnd.data-vision.rdz": ["rdz"],
  "application/vnd.dbf": ["dbf"],
  "application/vnd.dece.data": ["uvf", "uvvf", "uvd", "uvvd"],
  "application/vnd.dece.ttml+xml": ["uvt", "uvvt"],
  "application/vnd.dece.unspecified": ["uvx", "uvvx"],
  "application/vnd.dece.zip": ["uvz", "uvvz"],
  "application/vnd.denovo.fcselayout-link": ["fe_launch"],
  "application/vnd.dna": ["dna"],
  "application/vnd.dolby.mlp": ["mlp"],
  "application/vnd.dpgraph": ["dpg"],
  "application/vnd.dreamfactory": ["dfac"],
  "application/vnd.ds-keypoint": ["kpxx"],
  "application/vnd.dvb.ait": ["ait"],
  "application/vnd.dvb.service": ["svc"],
  "application/vnd.dynageo": ["geo"],
  "application/vnd.ecowin.chart": ["mag"],
  "application/vnd.enliven": ["nml"],
  "application/vnd.epson.esf": ["esf"],
  "application/vnd.epson.msf": ["msf"],
  "application/vnd.epson.quickanime": ["qam"],
  "application/vnd.epson.salt": ["slt"],
  "application/vnd.epson.ssf": ["ssf"],
  "application/vnd.eszigno3+xml": ["es3", "et3"],
  "application/vnd.ezpix-album": ["ez2"],
  "application/vnd.ezpix-package": ["ez3"],
  "application/vnd.fdf": ["fdf"],
  "application/vnd.fdsn.mseed": ["mseed"],
  "application/vnd.fdsn.seed": ["seed", "dataless"],
  "application/vnd.flographit": ["gph"],
  "application/vnd.fluxtime.clip": ["ftc"],
  "application/vnd.framemaker": ["fm", "frame", "maker", "book"],
  "application/vnd.frogans.fnc": ["fnc"],
  "application/vnd.frogans.ltf": ["ltf"],
  "application/vnd.fsc.weblaunch": ["fsc"],
  "application/vnd.fujitsu.oasys": ["oas"],
  "application/vnd.fujitsu.oasys2": ["oa2"],
  "application/vnd.fujitsu.oasys3": ["oa3"],
  "application/vnd.fujitsu.oasysgp": ["fg5"],
  "application/vnd.fujitsu.oasysprs": ["bh2"],
  "application/vnd.fujixerox.ddd": ["ddd"],
  "application/vnd.fujixerox.docuworks": ["xdw"],
  "application/vnd.fujixerox.docuworks.binder": ["xbd"],
  "application/vnd.fuzzysheet": ["fzs"],
  "application/vnd.genomatix.tuxedo": ["txd"],
  "application/vnd.geogebra.file": ["ggb"],
  "application/vnd.geogebra.tool": ["ggt"],
  "application/vnd.geometry-explorer": ["gex", "gre"],
  "application/vnd.geonext": ["gxt"],
  "application/vnd.geoplan": ["g2w"],
  "application/vnd.geospace": ["g3w"],
  "application/vnd.gmx": ["gmx"],
  "application/vnd.google-apps.document": ["gdoc"],
  "application/vnd.google-apps.presentation": ["gslides"],
  "application/vnd.google-apps.spreadsheet": ["gsheet"],
  "application/vnd.google-earth.kml+xml": ["kml"],
  "application/vnd.google-earth.kmz": ["kmz"],
  "application/vnd.grafeq": ["gqf", "gqs"],
  "application/vnd.groove-account": ["gac"],
  "application/vnd.groove-help": ["ghf"],
  "application/vnd.groove-identity-message": ["gim"],
  "application/vnd.groove-injector": ["grv"],
  "application/vnd.groove-tool-message": ["gtm"],
  "application/vnd.groove-tool-template": ["tpl"],
  "application/vnd.groove-vcard": ["vcg"],
  "application/vnd.hal+xml": ["hal"],
  "application/vnd.handheld-entertainment+xml": ["zmm"],
  "application/vnd.hbci": ["hbci"],
  "application/vnd.hhe.lesson-player": ["les"],
  "application/vnd.hp-hpgl": ["hpgl"],
  "application/vnd.hp-hpid": ["hpid"],
  "application/vnd.hp-hps": ["hps"],
  "application/vnd.hp-jlyt": ["jlt"],
  "application/vnd.hp-pcl": ["pcl"],
  "application/vnd.hp-pclxl": ["pclxl"],
  "application/vnd.hydrostatix.sof-data": ["sfd-hdstx"],
  "application/vnd.ibm.minipay": ["mpy"],
  "application/vnd.ibm.modcap": ["afp", "listafp", "list3820"],
  "application/vnd.ibm.rights-management": ["irm"],
  "application/vnd.ibm.secure-container": ["sc"],
  "application/vnd.iccprofile": ["icc", "icm"],
  "application/vnd.igloader": ["igl"],
  "application/vnd.immervision-ivp": ["ivp"],
  "application/vnd.immervision-ivu": ["ivu"],
  "application/vnd.insors.igm": ["igm"],
  "application/vnd.intercon.formnet": ["xpw", "xpx"],
  "application/vnd.intergeo": ["i2g"],
  "application/vnd.intu.qbo": ["qbo"],
  "application/vnd.intu.qfx": ["qfx"],
  "application/vnd.ipunplugged.rcprofile": ["rcprofile"],
  "application/vnd.irepository.package+xml": ["irp"],
  "application/vnd.is-xpr": ["xpr"],
  "application/vnd.isac.fcs": ["fcs"],
  "application/vnd.jam": ["jam"],
  "application/vnd.jcp.javame.midlet-rms": ["rms"],
  "application/vnd.jisp": ["jisp"],
  "application/vnd.joost.joda-archive": ["joda"],
  "application/vnd.kahootz": ["ktz", "ktr"],
  "application/vnd.kde.karbon": ["karbon"],
  "application/vnd.kde.kchart": ["chrt"],
  "application/vnd.kde.kformula": ["kfo"],
  "application/vnd.kde.kivio": ["flw"],
  "application/vnd.kde.kontour": ["kon"],
  "application/vnd.kde.kpresenter": ["kpr", "kpt"],
  "application/vnd.kde.kspread": ["ksp"],
  "application/vnd.kde.kword": ["kwd", "kwt"],
  "application/vnd.kenameaapp": ["htke"],
  "application/vnd.kidspiration": ["kia"],
  "application/vnd.kinar": ["kne", "knp"],
  "application/vnd.koan": ["skp", "skd", "skt", "skm"],
  "application/vnd.kodak-descriptor": ["sse"],
  "application/vnd.las.las+xml": ["lasxml"],
  "application/vnd.llamagraphics.life-balance.desktop": ["lbd"],
  "application/vnd.llamagraphics.life-balance.exchange+xml": ["lbe"],
  "application/vnd.lotus-1-2-3": ["123"],
  "application/vnd.lotus-approach": ["apr"],
  "application/vnd.lotus-freelance": ["pre"],
  "application/vnd.lotus-notes": ["nsf"],
  "application/vnd.lotus-organizer": ["org"],
  "application/vnd.lotus-screencam": ["scm"],
  "application/vnd.lotus-wordpro": ["lwp"],
  "application/vnd.macports.portpkg": ["portpkg"],
  "application/vnd.mcd": ["mcd"],
  "application/vnd.medcalcdata": ["mc1"],
  "application/vnd.mediastation.cdkey": ["cdkey"],
  "application/vnd.mfer": ["mwf"],
  "application/vnd.mfmp": ["mfm"],
  "application/vnd.micrografx.flo": ["flo"],
  "application/vnd.micrografx.igx": ["igx"],
  "application/vnd.mif": ["mif"],
  "application/vnd.mobius.daf": ["daf"],
  "application/vnd.mobius.dis": ["dis"],
  "application/vnd.mobius.mbk": ["mbk"],
  "application/vnd.mobius.mqy": ["mqy"],
  "application/vnd.mobius.msl": ["msl"],
  "application/vnd.mobius.plc": ["plc"],
  "application/vnd.mobius.txf": ["txf"],
  "application/vnd.mophun.application": ["mpn"],
  "application/vnd.mophun.certificate": ["mpc"],
  "application/vnd.mozilla.xul+xml": ["xul"],
  "application/vnd.ms-artgalry": ["cil"],
  "application/vnd.ms-cab-compressed": ["cab"],
  "application/vnd.ms-excel": ["xls", "xlm", "xla", "xlc", "xlt", "xlw"],
  "application/vnd.ms-excel.addin.macroenabled.12": ["xlam"],
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": ["xlsb"],
  "application/vnd.ms-excel.sheet.macroenabled.12": ["xlsm"],
  "application/vnd.ms-excel.template.macroenabled.12": ["xltm"],
  "application/vnd.ms-fontobject": ["eot"],
  "application/vnd.ms-htmlhelp": ["chm"],
  "application/vnd.ms-ims": ["ims"],
  "application/vnd.ms-lrm": ["lrm"],
  "application/vnd.ms-officetheme": ["thmx"],
  "application/vnd.ms-outlook": ["msg"],
  "application/vnd.ms-pki.seccat": ["cat"],
  "application/vnd.ms-pki.stl": ["*stl"],
  "application/vnd.ms-powerpoint": ["ppt", "pps", "pot"],
  "application/vnd.ms-powerpoint.addin.macroenabled.12": ["ppam"],
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": ["pptm"],
  "application/vnd.ms-powerpoint.slide.macroenabled.12": ["sldm"],
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": ["ppsm"],
  "application/vnd.ms-powerpoint.template.macroenabled.12": ["potm"],
  "application/vnd.ms-project": ["mpp", "mpt"],
  "application/vnd.ms-word.document.macroenabled.12": ["docm"],
  "application/vnd.ms-word.template.macroenabled.12": ["dotm"],
  "application/vnd.ms-works": ["wps", "wks", "wcm", "wdb"],
  "application/vnd.ms-wpl": ["wpl"],
  "application/vnd.ms-xpsdocument": ["xps"],
  "application/vnd.mseq": ["mseq"],
  "application/vnd.musician": ["mus"],
  "application/vnd.muvee.style": ["msty"],
  "application/vnd.mynfc": ["taglet"],
  "application/vnd.neurolanguage.nlu": ["nlu"],
  "application/vnd.nitf": ["ntf", "nitf"],
  "application/vnd.noblenet-directory": ["nnd"],
  "application/vnd.noblenet-sealer": ["nns"],
  "application/vnd.noblenet-web": ["nnw"],
  "application/vnd.nokia.n-gage.ac+xml": ["*ac"],
  "application/vnd.nokia.n-gage.data": ["ngdat"],
  "application/vnd.nokia.n-gage.symbian.install": ["n-gage"],
  "application/vnd.nokia.radio-preset": ["rpst"],
  "application/vnd.nokia.radio-presets": ["rpss"],
  "application/vnd.novadigm.edm": ["edm"],
  "application/vnd.novadigm.edx": ["edx"],
  "application/vnd.novadigm.ext": ["ext"],
  "application/vnd.oasis.opendocument.chart": ["odc"],
  "application/vnd.oasis.opendocument.chart-template": ["otc"],
  "application/vnd.oasis.opendocument.database": ["odb"],
  "application/vnd.oasis.opendocument.formula": ["odf"],
  "application/vnd.oasis.opendocument.formula-template": ["odft"],
  "application/vnd.oasis.opendocument.graphics": ["odg"],
  "application/vnd.oasis.opendocument.graphics-template": ["otg"],
  "application/vnd.oasis.opendocument.image": ["odi"],
  "application/vnd.oasis.opendocument.image-template": ["oti"],
  "application/vnd.oasis.opendocument.presentation": ["odp"],
  "application/vnd.oasis.opendocument.presentation-template": ["otp"],
  "application/vnd.oasis.opendocument.spreadsheet": ["ods"],
  "application/vnd.oasis.opendocument.spreadsheet-template": ["ots"],
  "application/vnd.oasis.opendocument.text": ["odt"],
  "application/vnd.oasis.opendocument.text-master": ["odm"],
  "application/vnd.oasis.opendocument.text-template": ["ott"],
  "application/vnd.oasis.opendocument.text-web": ["oth"],
  "application/vnd.olpc-sugar": ["xo"],
  "application/vnd.oma.dd2+xml": ["dd2"],
  "application/vnd.openblox.game+xml": ["obgx"],
  "application/vnd.openofficeorg.extension": ["oxt"],
  "application/vnd.openstreetmap.data+xml": ["osm"],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": ["pptx"],
  "application/vnd.openxmlformats-officedocument.presentationml.slide": ["sldx"],
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": ["ppsx"],
  "application/vnd.openxmlformats-officedocument.presentationml.template": ["potx"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ["xlsx"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": ["xltx"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ["docx"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": ["dotx"],
  "application/vnd.osgeo.mapguide.package": ["mgp"],
  "application/vnd.osgi.dp": ["dp"],
  "application/vnd.osgi.subsystem": ["esa"],
  "application/vnd.palm": ["pdb", "pqa", "oprc"],
  "application/vnd.pawaafile": ["paw"],
  "application/vnd.pg.format": ["str"],
  "application/vnd.pg.osasli": ["ei6"],
  "application/vnd.picsel": ["efif"],
  "application/vnd.pmi.widget": ["wg"],
  "application/vnd.pocketlearn": ["plf"],
  "application/vnd.powerbuilder6": ["pbd"],
  "application/vnd.previewsystems.box": ["box"],
  "application/vnd.proteus.magazine": ["mgz"],
  "application/vnd.publishare-delta-tree": ["qps"],
  "application/vnd.pvi.ptid1": ["ptid"],
  "application/vnd.quark.quarkxpress": ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"],
  "application/vnd.rar": ["rar"],
  "application/vnd.realvnc.bed": ["bed"],
  "application/vnd.recordare.musicxml": ["mxl"],
  "application/vnd.recordare.musicxml+xml": ["musicxml"],
  "application/vnd.rig.cryptonote": ["cryptonote"],
  "application/vnd.rim.cod": ["cod"],
  "application/vnd.rn-realmedia": ["rm"],
  "application/vnd.rn-realmedia-vbr": ["rmvb"],
  "application/vnd.route66.link66+xml": ["link66"],
  "application/vnd.sailingtracker.track": ["st"],
  "application/vnd.seemail": ["see"],
  "application/vnd.sema": ["sema"],
  "application/vnd.semd": ["semd"],
  "application/vnd.semf": ["semf"],
  "application/vnd.shana.informed.formdata": ["ifm"],
  "application/vnd.shana.informed.formtemplate": ["itp"],
  "application/vnd.shana.informed.interchange": ["iif"],
  "application/vnd.shana.informed.package": ["ipk"],
  "application/vnd.simtech-mindmapper": ["twd", "twds"],
  "application/vnd.smaf": ["mmf"],
  "application/vnd.smart.teacher": ["teacher"],
  "application/vnd.software602.filler.form+xml": ["fo"],
  "application/vnd.solent.sdkm+xml": ["sdkm", "sdkd"],
  "application/vnd.spotfire.dxp": ["dxp"],
  "application/vnd.spotfire.sfs": ["sfs"],
  "application/vnd.stardivision.calc": ["sdc"],
  "application/vnd.stardivision.draw": ["sda"],
  "application/vnd.stardivision.impress": ["sdd"],
  "application/vnd.stardivision.math": ["smf"],
  "application/vnd.stardivision.writer": ["sdw", "vor"],
  "application/vnd.stardivision.writer-global": ["sgl"],
  "application/vnd.stepmania.package": ["smzip"],
  "application/vnd.stepmania.stepchart": ["sm"],
  "application/vnd.sun.wadl+xml": ["wadl"],
  "application/vnd.sun.xml.calc": ["sxc"],
  "application/vnd.sun.xml.calc.template": ["stc"],
  "application/vnd.sun.xml.draw": ["sxd"],
  "application/vnd.sun.xml.draw.template": ["std"],
  "application/vnd.sun.xml.impress": ["sxi"],
  "application/vnd.sun.xml.impress.template": ["sti"],
  "application/vnd.sun.xml.math": ["sxm"],
  "application/vnd.sun.xml.writer": ["sxw"],
  "application/vnd.sun.xml.writer.global": ["sxg"],
  "application/vnd.sun.xml.writer.template": ["stw"],
  "application/vnd.sus-calendar": ["sus", "susp"],
  "application/vnd.svd": ["svd"],
  "application/vnd.symbian.install": ["sis", "sisx"],
  "application/vnd.syncml+xml": ["xsm"],
  "application/vnd.syncml.dm+wbxml": ["bdm"],
  "application/vnd.syncml.dm+xml": ["xdm"],
  "application/vnd.syncml.dmddf+xml": ["ddf"],
  "application/vnd.tao.intent-module-archive": ["tao"],
  "application/vnd.tcpdump.pcap": ["pcap", "cap", "dmp"],
  "application/vnd.tmobile-livetv": ["tmo"],
  "application/vnd.trid.tpt": ["tpt"],
  "application/vnd.triscape.mxs": ["mxs"],
  "application/vnd.trueapp": ["tra"],
  "application/vnd.ufdl": ["ufd", "ufdl"],
  "application/vnd.uiq.theme": ["utz"],
  "application/vnd.umajin": ["umj"],
  "application/vnd.unity": ["unityweb"],
  "application/vnd.uoml+xml": ["uoml"],
  "application/vnd.vcx": ["vcx"],
  "application/vnd.visio": ["vsd", "vst", "vss", "vsw"],
  "application/vnd.visionary": ["vis"],
  "application/vnd.vsf": ["vsf"],
  "application/vnd.wap.wbxml": ["wbxml"],
  "application/vnd.wap.wmlc": ["wmlc"],
  "application/vnd.wap.wmlscriptc": ["wmlsc"],
  "application/vnd.webturbo": ["wtb"],
  "application/vnd.wolfram.player": ["nbp"],
  "application/vnd.wordperfect": ["wpd"],
  "application/vnd.wqd": ["wqd"],
  "application/vnd.wt.stf": ["stf"],
  "application/vnd.xara": ["xar"],
  "application/vnd.xfdl": ["xfdl"],
  "application/vnd.yamaha.hv-dic": ["hvd"],
  "application/vnd.yamaha.hv-script": ["hvs"],
  "application/vnd.yamaha.hv-voice": ["hvp"],
  "application/vnd.yamaha.openscoreformat": ["osf"],
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": ["osfpvg"],
  "application/vnd.yamaha.smaf-audio": ["saf"],
  "application/vnd.yamaha.smaf-phrase": ["spf"],
  "application/vnd.yellowriver-custom-menu": ["cmp"],
  "application/vnd.zul": ["zir", "zirz"],
  "application/vnd.zzazz.deck+xml": ["zaz"],
  "application/x-7z-compressed": ["7z"],
  "application/x-abiword": ["abw"],
  "application/x-ace-compressed": ["ace"],
  "application/x-apple-diskimage": ["*dmg"],
  "application/x-arj": ["arj"],
  "application/x-authorware-bin": ["aab", "x32", "u32", "vox"],
  "application/x-authorware-map": ["aam"],
  "application/x-authorware-seg": ["aas"],
  "application/x-bcpio": ["bcpio"],
  "application/x-bdoc": ["*bdoc"],
  "application/x-bittorrent": ["torrent"],
  "application/x-blorb": ["blb", "blorb"],
  "application/x-bzip": ["bz"],
  "application/x-bzip2": ["bz2", "boz"],
  "application/x-cbr": ["cbr", "cba", "cbt", "cbz", "cb7"],
  "application/x-cdlink": ["vcd"],
  "application/x-cfs-compressed": ["cfs"],
  "application/x-chat": ["chat"],
  "application/x-chess-pgn": ["pgn"],
  "application/x-chrome-extension": ["crx"],
  "application/x-cocoa": ["cco"],
  "application/x-conference": ["nsc"],
  "application/x-cpio": ["cpio"],
  "application/x-csh": ["csh"],
  "application/x-debian-package": ["*deb", "udeb"],
  "application/x-dgc-compressed": ["dgc"],
  "application/x-director": ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"],
  "application/x-doom": ["wad"],
  "application/x-dtbncx+xml": ["ncx"],
  "application/x-dtbook+xml": ["dtb"],
  "application/x-dtbresource+xml": ["res"],
  "application/x-dvi": ["dvi"],
  "application/x-envoy": ["evy"],
  "application/x-eva": ["eva"],
  "application/x-font-bdf": ["bdf"],
  "application/x-font-ghostscript": ["gsf"],
  "application/x-font-linux-psf": ["psf"],
  "application/x-font-pcf": ["pcf"],
  "application/x-font-snf": ["snf"],
  "application/x-font-type1": ["pfa", "pfb", "pfm", "afm"],
  "application/x-freearc": ["arc"],
  "application/x-futuresplash": ["spl"],
  "application/x-gca-compressed": ["gca"],
  "application/x-glulx": ["ulx"],
  "application/x-gnumeric": ["gnumeric"],
  "application/x-gramps-xml": ["gramps"],
  "application/x-gtar": ["gtar"],
  "application/x-hdf": ["hdf"],
  "application/x-httpd-php": ["php"],
  "application/x-install-instructions": ["install"],
  "application/x-iso9660-image": ["*iso"],
  "application/x-java-archive-diff": ["jardiff"],
  "application/x-java-jnlp-file": ["jnlp"],
  "application/x-keepass2": ["kdbx"],
  "application/x-latex": ["latex"],
  "application/x-lua-bytecode": ["luac"],
  "application/x-lzh-compressed": ["lzh", "lha"],
  "application/x-makeself": ["run"],
  "application/x-mie": ["mie"],
  "application/x-mobipocket-ebook": ["prc", "mobi"],
  "application/x-ms-application": ["application"],
  "application/x-ms-shortcut": ["lnk"],
  "application/x-ms-wmd": ["wmd"],
  "application/x-ms-wmz": ["wmz"],
  "application/x-ms-xbap": ["xbap"],
  "application/x-msaccess": ["mdb"],
  "application/x-msbinder": ["obd"],
  "application/x-mscardfile": ["crd"],
  "application/x-msclip": ["clp"],
  "application/x-msdos-program": ["*exe"],
  "application/x-msdownload": ["*exe", "*dll", "com", "bat", "*msi"],
  "application/x-msmediaview": ["mvb", "m13", "m14"],
  "application/x-msmetafile": ["*wmf", "*wmz", "*emf", "emz"],
  "application/x-msmoney": ["mny"],
  "application/x-mspublisher": ["pub"],
  "application/x-msschedule": ["scd"],
  "application/x-msterminal": ["trm"],
  "application/x-mswrite": ["wri"],
  "application/x-netcdf": ["nc", "cdf"],
  "application/x-ns-proxy-autoconfig": ["pac"],
  "application/x-nzb": ["nzb"],
  "application/x-perl": ["pl", "pm"],
  "application/x-pilot": ["*prc", "*pdb"],
  "application/x-pkcs12": ["p12", "pfx"],
  "application/x-pkcs7-certificates": ["p7b", "spc"],
  "application/x-pkcs7-certreqresp": ["p7r"],
  "application/x-rar-compressed": ["*rar"],
  "application/x-redhat-package-manager": ["rpm"],
  "application/x-research-info-systems": ["ris"],
  "application/x-sea": ["sea"],
  "application/x-sh": ["sh"],
  "application/x-shar": ["shar"],
  "application/x-shockwave-flash": ["swf"],
  "application/x-silverlight-app": ["xap"],
  "application/x-sql": ["sql"],
  "application/x-stuffit": ["sit"],
  "application/x-stuffitx": ["sitx"],
  "application/x-subrip": ["srt"],
  "application/x-sv4cpio": ["sv4cpio"],
  "application/x-sv4crc": ["sv4crc"],
  "application/x-t3vm-image": ["t3"],
  "application/x-tads": ["gam"],
  "application/x-tar": ["tar"],
  "application/x-tcl": ["tcl", "tk"],
  "application/x-tex": ["tex"],
  "application/x-tex-tfm": ["tfm"],
  "application/x-texinfo": ["texinfo", "texi"],
  "application/x-tgif": ["*obj"],
  "application/x-ustar": ["ustar"],
  "application/x-virtualbox-hdd": ["hdd"],
  "application/x-virtualbox-ova": ["ova"],
  "application/x-virtualbox-ovf": ["ovf"],
  "application/x-virtualbox-vbox": ["vbox"],
  "application/x-virtualbox-vbox-extpack": ["vbox-extpack"],
  "application/x-virtualbox-vdi": ["vdi"],
  "application/x-virtualbox-vhd": ["vhd"],
  "application/x-virtualbox-vmdk": ["vmdk"],
  "application/x-wais-source": ["src"],
  "application/x-web-app-manifest+json": ["webapp"],
  "application/x-x509-ca-cert": ["der", "crt", "pem"],
  "application/x-xfig": ["fig"],
  "application/x-xliff+xml": ["*xlf"],
  "application/x-xpinstall": ["xpi"],
  "application/x-xz": ["xz"],
  "application/x-zmachine": ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"],
  "audio/vnd.dece.audio": ["uva", "uvva"],
  "audio/vnd.digital-winds": ["eol"],
  "audio/vnd.dra": ["dra"],
  "audio/vnd.dts": ["dts"],
  "audio/vnd.dts.hd": ["dtshd"],
  "audio/vnd.lucent.voice": ["lvp"],
  "audio/vnd.ms-playready.media.pya": ["pya"],
  "audio/vnd.nuera.ecelp4800": ["ecelp4800"],
  "audio/vnd.nuera.ecelp7470": ["ecelp7470"],
  "audio/vnd.nuera.ecelp9600": ["ecelp9600"],
  "audio/vnd.rip": ["rip"],
  "audio/x-aac": ["aac"],
  "audio/x-aiff": ["aif", "aiff", "aifc"],
  "audio/x-caf": ["caf"],
  "audio/x-flac": ["flac"],
  "audio/x-m4a": ["*m4a"],
  "audio/x-matroska": ["mka"],
  "audio/x-mpegurl": ["m3u"],
  "audio/x-ms-wax": ["wax"],
  "audio/x-ms-wma": ["wma"],
  "audio/x-pn-realaudio": ["ram", "ra"],
  "audio/x-pn-realaudio-plugin": ["rmp"],
  "audio/x-realaudio": ["*ra"],
  "audio/x-wav": ["*wav"],
  "chemical/x-cdx": ["cdx"],
  "chemical/x-cif": ["cif"],
  "chemical/x-cmdf": ["cmdf"],
  "chemical/x-cml": ["cml"],
  "chemical/x-csml": ["csml"],
  "chemical/x-xyz": ["xyz"],
  "image/prs.btif": ["btif"],
  "image/prs.pti": ["pti"],
  "image/vnd.adobe.photoshop": ["psd"],
  "image/vnd.airzip.accelerator.azv": ["azv"],
  "image/vnd.dece.graphic": ["uvi", "uvvi", "uvg", "uvvg"],
  "image/vnd.djvu": ["djvu", "djv"],
  "image/vnd.dvb.subtitle": ["*sub"],
  "image/vnd.dwg": ["dwg"],
  "image/vnd.dxf": ["dxf"],
  "image/vnd.fastbidsheet": ["fbs"],
  "image/vnd.fpx": ["fpx"],
  "image/vnd.fst": ["fst"],
  "image/vnd.fujixerox.edmics-mmr": ["mmr"],
  "image/vnd.fujixerox.edmics-rlc": ["rlc"],
  "image/vnd.microsoft.icon": ["ico"],
  "image/vnd.ms-dds": ["dds"],
  "image/vnd.ms-modi": ["mdi"],
  "image/vnd.ms-photo": ["wdp"],
  "image/vnd.net-fpx": ["npx"],
  "image/vnd.pco.b16": ["b16"],
  "image/vnd.tencent.tap": ["tap"],
  "image/vnd.valve.source.texture": ["vtf"],
  "image/vnd.wap.wbmp": ["wbmp"],
  "image/vnd.xiff": ["xif"],
  "image/vnd.zbrush.pcx": ["pcx"],
  "image/x-3ds": ["3ds"],
  "image/x-cmu-raster": ["ras"],
  "image/x-cmx": ["cmx"],
  "image/x-freehand": ["fh", "fhc", "fh4", "fh5", "fh7"],
  "image/x-icon": ["*ico"],
  "image/x-jng": ["jng"],
  "image/x-mrsid-image": ["sid"],
  "image/x-ms-bmp": ["*bmp"],
  "image/x-pcx": ["*pcx"],
  "image/x-pict": ["pic", "pct"],
  "image/x-portable-anymap": ["pnm"],
  "image/x-portable-bitmap": ["pbm"],
  "image/x-portable-graymap": ["pgm"],
  "image/x-portable-pixmap": ["ppm"],
  "image/x-rgb": ["rgb"],
  "image/x-tga": ["tga"],
  "image/x-xbitmap": ["xbm"],
  "image/x-xpixmap": ["xpm"],
  "image/x-xwindowdump": ["xwd"],
  "message/vnd.wfa.wsc": ["wsc"],
  "model/vnd.collada+xml": ["dae"],
  "model/vnd.dwf": ["dwf"],
  "model/vnd.gdl": ["gdl"],
  "model/vnd.gtw": ["gtw"],
  "model/vnd.mts": ["mts"],
  "model/vnd.opengex": ["ogex"],
  "model/vnd.parasolid.transmit.binary": ["x_b"],
  "model/vnd.parasolid.transmit.text": ["x_t"],
  "model/vnd.usdz+zip": ["usdz"],
  "model/vnd.valve.source.compiled-map": ["bsp"],
  "model/vnd.vtu": ["vtu"],
  "text/prs.lines.tag": ["dsc"],
  "text/vnd.curl": ["curl"],
  "text/vnd.curl.dcurl": ["dcurl"],
  "text/vnd.curl.mcurl": ["mcurl"],
  "text/vnd.curl.scurl": ["scurl"],
  "text/vnd.dvb.subtitle": ["sub"],
  "text/vnd.fly": ["fly"],
  "text/vnd.fmi.flexstor": ["flx"],
  "text/vnd.graphviz": ["gv"],
  "text/vnd.in3d.3dml": ["3dml"],
  "text/vnd.in3d.spot": ["spot"],
  "text/vnd.sun.j2me.app-descriptor": ["jad"],
  "text/vnd.wap.wml": ["wml"],
  "text/vnd.wap.wmlscript": ["wmls"],
  "text/x-asm": ["s", "asm"],
  "text/x-c": ["c", "cc", "cxx", "cpp", "h", "hh", "dic"],
  "text/x-component": ["htc"],
  "text/x-fortran": ["f", "for", "f77", "f90"],
  "text/x-handlebars-template": ["hbs"],
  "text/x-java-source": ["java"],
  "text/x-lua": ["lua"],
  "text/x-markdown": ["mkd"],
  "text/x-nfo": ["nfo"],
  "text/x-opml": ["opml"],
  "text/x-org": ["*org"],
  "text/x-pascal": ["p", "pas"],
  "text/x-processing": ["pde"],
  "text/x-sass": ["sass"],
  "text/x-scss": ["scss"],
  "text/x-setext": ["etx"],
  "text/x-sfv": ["sfv"],
  "text/x-suse-ymp": ["ymp"],
  "text/x-uuencode": ["uu"],
  "text/x-vcalendar": ["vcs"],
  "text/x-vcard": ["vcf"],
  "video/vnd.dece.hd": ["uvh", "uvvh"],
  "video/vnd.dece.mobile": ["uvm", "uvvm"],
  "video/vnd.dece.pd": ["uvp", "uvvp"],
  "video/vnd.dece.sd": ["uvs", "uvvs"],
  "video/vnd.dece.video": ["uvv", "uvvv"],
  "video/vnd.dvb.file": ["dvb"],
  "video/vnd.fvt": ["fvt"],
  "video/vnd.mpegurl": ["mxu", "m4u"],
  "video/vnd.ms-playready.media.pyv": ["pyv"],
  "video/vnd.uvvu.mp4": ["uvu", "uvvu"],
  "video/vnd.vivo": ["viv"],
  "video/x-f4v": ["f4v"],
  "video/x-fli": ["fli"],
  "video/x-flv": ["flv"],
  "video/x-m4v": ["m4v"],
  "video/x-matroska": ["mkv", "mk3d", "mks"],
  "video/x-mng": ["mng"],
  "video/x-ms-asf": ["asf", "asx"],
  "video/x-ms-vob": ["vob"],
  "video/x-ms-wm": ["wm"],
  "video/x-ms-wmv": ["wmv"],
  "video/x-ms-wmx": ["wmx"],
  "video/x-ms-wvx": ["wvx"],
  "video/x-msvideo": ["avi"],
  "video/x-sgi-movie": ["movie"],
  "video/x-smv": ["smv"],
  "x-conference/x-cooltalk": ["ice"]
};

/***/ }),

/***/ 263:
/***/ ((module) => {

module.exports = {
  "application/andrew-inset": ["ez"],
  "application/applixware": ["aw"],
  "application/atom+xml": ["atom"],
  "application/atomcat+xml": ["atomcat"],
  "application/atomdeleted+xml": ["atomdeleted"],
  "application/atomsvc+xml": ["atomsvc"],
  "application/atsc-dwd+xml": ["dwd"],
  "application/atsc-held+xml": ["held"],
  "application/atsc-rsat+xml": ["rsat"],
  "application/bdoc": ["bdoc"],
  "application/calendar+xml": ["xcs"],
  "application/ccxml+xml": ["ccxml"],
  "application/cdfx+xml": ["cdfx"],
  "application/cdmi-capability": ["cdmia"],
  "application/cdmi-container": ["cdmic"],
  "application/cdmi-domain": ["cdmid"],
  "application/cdmi-object": ["cdmio"],
  "application/cdmi-queue": ["cdmiq"],
  "application/cu-seeme": ["cu"],
  "application/dash+xml": ["mpd"],
  "application/davmount+xml": ["davmount"],
  "application/docbook+xml": ["dbk"],
  "application/dssc+der": ["dssc"],
  "application/dssc+xml": ["xdssc"],
  "application/ecmascript": ["ecma", "es"],
  "application/emma+xml": ["emma"],
  "application/emotionml+xml": ["emotionml"],
  "application/epub+zip": ["epub"],
  "application/exi": ["exi"],
  "application/fdt+xml": ["fdt"],
  "application/font-tdpfr": ["pfr"],
  "application/geo+json": ["geojson"],
  "application/gml+xml": ["gml"],
  "application/gpx+xml": ["gpx"],
  "application/gxf": ["gxf"],
  "application/gzip": ["gz"],
  "application/hjson": ["hjson"],
  "application/hyperstudio": ["stk"],
  "application/inkml+xml": ["ink", "inkml"],
  "application/ipfix": ["ipfix"],
  "application/its+xml": ["its"],
  "application/java-archive": ["jar", "war", "ear"],
  "application/java-serialized-object": ["ser"],
  "application/java-vm": ["class"],
  "application/javascript": ["js", "mjs"],
  "application/json": ["json", "map"],
  "application/json5": ["json5"],
  "application/jsonml+json": ["jsonml"],
  "application/ld+json": ["jsonld"],
  "application/lgr+xml": ["lgr"],
  "application/lost+xml": ["lostxml"],
  "application/mac-binhex40": ["hqx"],
  "application/mac-compactpro": ["cpt"],
  "application/mads+xml": ["mads"],
  "application/manifest+json": ["webmanifest"],
  "application/marc": ["mrc"],
  "application/marcxml+xml": ["mrcx"],
  "application/mathematica": ["ma", "nb", "mb"],
  "application/mathml+xml": ["mathml"],
  "application/mbox": ["mbox"],
  "application/mediaservercontrol+xml": ["mscml"],
  "application/metalink+xml": ["metalink"],
  "application/metalink4+xml": ["meta4"],
  "application/mets+xml": ["mets"],
  "application/mmt-aei+xml": ["maei"],
  "application/mmt-usd+xml": ["musd"],
  "application/mods+xml": ["mods"],
  "application/mp21": ["m21", "mp21"],
  "application/mp4": ["mp4s", "m4p"],
  "application/mrb-consumer+xml": ["*xdf"],
  "application/mrb-publish+xml": ["*xdf"],
  "application/msword": ["doc", "dot"],
  "application/mxf": ["mxf"],
  "application/n-quads": ["nq"],
  "application/n-triples": ["nt"],
  "application/node": ["cjs"],
  "application/octet-stream": ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"],
  "application/oda": ["oda"],
  "application/oebps-package+xml": ["opf"],
  "application/ogg": ["ogx"],
  "application/omdoc+xml": ["omdoc"],
  "application/onenote": ["onetoc", "onetoc2", "onetmp", "onepkg"],
  "application/oxps": ["oxps"],
  "application/p2p-overlay+xml": ["relo"],
  "application/patch-ops-error+xml": ["*xer"],
  "application/pdf": ["pdf"],
  "application/pgp-encrypted": ["pgp"],
  "application/pgp-signature": ["asc", "sig"],
  "application/pics-rules": ["prf"],
  "application/pkcs10": ["p10"],
  "application/pkcs7-mime": ["p7m", "p7c"],
  "application/pkcs7-signature": ["p7s"],
  "application/pkcs8": ["p8"],
  "application/pkix-attr-cert": ["ac"],
  "application/pkix-cert": ["cer"],
  "application/pkix-crl": ["crl"],
  "application/pkix-pkipath": ["pkipath"],
  "application/pkixcmp": ["pki"],
  "application/pls+xml": ["pls"],
  "application/postscript": ["ai", "eps", "ps"],
  "application/provenance+xml": ["provx"],
  "application/pskc+xml": ["pskcxml"],
  "application/raml+yaml": ["raml"],
  "application/rdf+xml": ["rdf", "owl"],
  "application/reginfo+xml": ["rif"],
  "application/relax-ng-compact-syntax": ["rnc"],
  "application/resource-lists+xml": ["rl"],
  "application/resource-lists-diff+xml": ["rld"],
  "application/rls-services+xml": ["rs"],
  "application/route-apd+xml": ["rapd"],
  "application/route-s-tsid+xml": ["sls"],
  "application/route-usd+xml": ["rusd"],
  "application/rpki-ghostbusters": ["gbr"],
  "application/rpki-manifest": ["mft"],
  "application/rpki-roa": ["roa"],
  "application/rsd+xml": ["rsd"],
  "application/rss+xml": ["rss"],
  "application/rtf": ["rtf"],
  "application/sbml+xml": ["sbml"],
  "application/scvp-cv-request": ["scq"],
  "application/scvp-cv-response": ["scs"],
  "application/scvp-vp-request": ["spq"],
  "application/scvp-vp-response": ["spp"],
  "application/sdp": ["sdp"],
  "application/senml+xml": ["senmlx"],
  "application/sensml+xml": ["sensmlx"],
  "application/set-payment-initiation": ["setpay"],
  "application/set-registration-initiation": ["setreg"],
  "application/shf+xml": ["shf"],
  "application/sieve": ["siv", "sieve"],
  "application/smil+xml": ["smi", "smil"],
  "application/sparql-query": ["rq"],
  "application/sparql-results+xml": ["srx"],
  "application/srgs": ["gram"],
  "application/srgs+xml": ["grxml"],
  "application/sru+xml": ["sru"],
  "application/ssdl+xml": ["ssdl"],
  "application/ssml+xml": ["ssml"],
  "application/swid+xml": ["swidtag"],
  "application/tei+xml": ["tei", "teicorpus"],
  "application/thraud+xml": ["tfi"],
  "application/timestamped-data": ["tsd"],
  "application/toml": ["toml"],
  "application/ttml+xml": ["ttml"],
  "application/ubjson": ["ubj"],
  "application/urc-ressheet+xml": ["rsheet"],
  "application/urc-targetdesc+xml": ["td"],
  "application/voicexml+xml": ["vxml"],
  "application/wasm": ["wasm"],
  "application/widget": ["wgt"],
  "application/winhlp": ["hlp"],
  "application/wsdl+xml": ["wsdl"],
  "application/wspolicy+xml": ["wspolicy"],
  "application/xaml+xml": ["xaml"],
  "application/xcap-att+xml": ["xav"],
  "application/xcap-caps+xml": ["xca"],
  "application/xcap-diff+xml": ["xdf"],
  "application/xcap-el+xml": ["xel"],
  "application/xcap-error+xml": ["xer"],
  "application/xcap-ns+xml": ["xns"],
  "application/xenc+xml": ["xenc"],
  "application/xhtml+xml": ["xhtml", "xht"],
  "application/xliff+xml": ["xlf"],
  "application/xml": ["xml", "xsl", "xsd", "rng"],
  "application/xml-dtd": ["dtd"],
  "application/xop+xml": ["xop"],
  "application/xproc+xml": ["xpl"],
  "application/xslt+xml": ["*xsl", "xslt"],
  "application/xspf+xml": ["xspf"],
  "application/xv+xml": ["mxml", "xhvml", "xvml", "xvm"],
  "application/yang": ["yang"],
  "application/yin+xml": ["yin"],
  "application/zip": ["zip"],
  "audio/3gpp": ["*3gpp"],
  "audio/adpcm": ["adp"],
  "audio/amr": ["amr"],
  "audio/basic": ["au", "snd"],
  "audio/midi": ["mid", "midi", "kar", "rmi"],
  "audio/mobile-xmf": ["mxmf"],
  "audio/mp3": ["*mp3"],
  "audio/mp4": ["m4a", "mp4a"],
  "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"],
  "audio/ogg": ["oga", "ogg", "spx", "opus"],
  "audio/s3m": ["s3m"],
  "audio/silk": ["sil"],
  "audio/wav": ["wav"],
  "audio/wave": ["*wav"],
  "audio/webm": ["weba"],
  "audio/xm": ["xm"],
  "font/collection": ["ttc"],
  "font/otf": ["otf"],
  "font/ttf": ["ttf"],
  "font/woff": ["woff"],
  "font/woff2": ["woff2"],
  "image/aces": ["exr"],
  "image/apng": ["apng"],
  "image/avif": ["avif"],
  "image/bmp": ["bmp"],
  "image/cgm": ["cgm"],
  "image/dicom-rle": ["drle"],
  "image/emf": ["emf"],
  "image/fits": ["fits"],
  "image/g3fax": ["g3"],
  "image/gif": ["gif"],
  "image/heic": ["heic"],
  "image/heic-sequence": ["heics"],
  "image/heif": ["heif"],
  "image/heif-sequence": ["heifs"],
  "image/hej2k": ["hej2"],
  "image/hsj2": ["hsj2"],
  "image/ief": ["ief"],
  "image/jls": ["jls"],
  "image/jp2": ["jp2", "jpg2"],
  "image/jpeg": ["jpeg", "jpg", "jpe"],
  "image/jph": ["jph"],
  "image/jphc": ["jhc"],
  "image/jpm": ["jpm"],
  "image/jpx": ["jpx", "jpf"],
  "image/jxr": ["jxr"],
  "image/jxra": ["jxra"],
  "image/jxrs": ["jxrs"],
  "image/jxs": ["jxs"],
  "image/jxsc": ["jxsc"],
  "image/jxsi": ["jxsi"],
  "image/jxss": ["jxss"],
  "image/ktx": ["ktx"],
  "image/ktx2": ["ktx2"],
  "image/png": ["png"],
  "image/sgi": ["sgi"],
  "image/svg+xml": ["svg", "svgz"],
  "image/t38": ["t38"],
  "image/tiff": ["tif", "tiff"],
  "image/tiff-fx": ["tfx"],
  "image/webp": ["webp"],
  "image/wmf": ["wmf"],
  "message/disposition-notification": ["disposition-notification"],
  "message/global": ["u8msg"],
  "message/global-delivery-status": ["u8dsn"],
  "message/global-disposition-notification": ["u8mdn"],
  "message/global-headers": ["u8hdr"],
  "message/rfc822": ["eml", "mime"],
  "model/3mf": ["3mf"],
  "model/gltf+json": ["gltf"],
  "model/gltf-binary": ["glb"],
  "model/iges": ["igs", "iges"],
  "model/mesh": ["msh", "mesh", "silo"],
  "model/mtl": ["mtl"],
  "model/obj": ["obj"],
  "model/stl": ["stl"],
  "model/vrml": ["wrl", "vrml"],
  "model/x3d+binary": ["*x3db", "x3dbz"],
  "model/x3d+fastinfoset": ["x3db"],
  "model/x3d+vrml": ["*x3dv", "x3dvz"],
  "model/x3d+xml": ["x3d", "x3dz"],
  "model/x3d-vrml": ["x3dv"],
  "text/cache-manifest": ["appcache", "manifest"],
  "text/calendar": ["ics", "ifb"],
  "text/coffeescript": ["coffee", "litcoffee"],
  "text/css": ["css"],
  "text/csv": ["csv"],
  "text/html": ["html", "htm", "shtml"],
  "text/jade": ["jade"],
  "text/jsx": ["jsx"],
  "text/less": ["less"],
  "text/markdown": ["markdown", "md"],
  "text/mathml": ["mml"],
  "text/mdx": ["mdx"],
  "text/n3": ["n3"],
  "text/plain": ["txt", "text", "conf", "def", "list", "log", "in", "ini"],
  "text/richtext": ["rtx"],
  "text/rtf": ["*rtf"],
  "text/sgml": ["sgml", "sgm"],
  "text/shex": ["shex"],
  "text/slim": ["slim", "slm"],
  "text/spdx": ["spdx"],
  "text/stylus": ["stylus", "styl"],
  "text/tab-separated-values": ["tsv"],
  "text/troff": ["t", "tr", "roff", "man", "me", "ms"],
  "text/turtle": ["ttl"],
  "text/uri-list": ["uri", "uris", "urls"],
  "text/vcard": ["vcard"],
  "text/vtt": ["vtt"],
  "text/xml": ["*xml"],
  "text/yaml": ["yaml", "yml"],
  "video/3gpp": ["3gp", "3gpp"],
  "video/3gpp2": ["3g2"],
  "video/h261": ["h261"],
  "video/h263": ["h263"],
  "video/h264": ["h264"],
  "video/iso.segment": ["m4s"],
  "video/jpeg": ["jpgv"],
  "video/jpm": ["*jpm", "jpgm"],
  "video/mj2": ["mj2", "mjp2"],
  "video/mp2t": ["ts"],
  "video/mp4": ["mp4", "mp4v", "mpg4"],
  "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"],
  "video/ogg": ["ogv"],
  "video/quicktime": ["qt", "mov"],
  "video/webm": ["webm"]
};

/***/ }),

/***/ 1440:
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

/***/ }),

/***/ 2932:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


var _typeof = __webpack_require__(3634);

var l = __webpack_require__(1440),
    n = 60103,
    p = 60106;

exports.Fragment = 60107;
exports.StrictMode = 60108;
exports.Profiler = 60114;
var q = 60109,
    r = 60110,
    t = 60112;
exports.Suspense = 60113;
var u = 60115,
    v = 60116;

if ("function" === typeof Symbol && Symbol.for) {
  var w = Symbol.for;
  n = w("react.element");
  p = w("react.portal");
  exports.Fragment = w("react.fragment");
  exports.StrictMode = w("react.strict_mode");
  exports.Profiler = w("react.profiler");
  q = w("react.provider");
  r = w("react.context");
  t = w("react.forward_ref");
  exports.Suspense = w("react.suspense");
  u = w("react.memo");
  v = w("react.lazy");
}

var x = "function" === typeof Symbol && Symbol.iterator;

function y(a) {
  if (null === a || "object" !== _typeof(a)) return null;
  a = x && a[x] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}

function z(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) {
    b += "&args[]=" + encodeURIComponent(arguments[c]);
  }

  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}

var A = {
  isMounted: function isMounted() {
    return !1;
  },
  enqueueForceUpdate: function enqueueForceUpdate() {},
  enqueueReplaceState: function enqueueReplaceState() {},
  enqueueSetState: function enqueueSetState() {}
},
    B = {};

function C(a, b, c) {
  this.props = a;
  this.context = b;
  this.refs = B;
  this.updater = c || A;
}

C.prototype.isReactComponent = {};

C.prototype.setState = function (a, b) {
  if ("object" !== _typeof(a) && "function" !== typeof a && null != a) throw Error(z(85));
  this.updater.enqueueSetState(this, a, b, "setState");
};

C.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};

function D() {}

D.prototype = C.prototype;

function E(a, b, c) {
  this.props = a;
  this.context = b;
  this.refs = B;
  this.updater = c || A;
}

var F = E.prototype = new D();
F.constructor = E;
l(F, C.prototype);
F.isPureReactComponent = !0;
var G = {
  current: null
},
    H = Object.prototype.hasOwnProperty,
    I = {
  key: !0,
  ref: !0,
  __self: !0,
  __source: !0
};

function J(a, b, c) {
  var e,
      d = {},
      k = null,
      h = null;
  if (null != b) for (e in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) {
    H.call(b, e) && !I.hasOwnProperty(e) && (d[e] = b[e]);
  }
  var g = arguments.length - 2;
  if (1 === g) d.children = c;else if (1 < g) {
    for (var f = Array(g), m = 0; m < g; m++) {
      f[m] = arguments[m + 2];
    }

    d.children = f;
  }
  if (a && a.defaultProps) for (e in g = a.defaultProps, g) {
    void 0 === d[e] && (d[e] = g[e]);
  }
  return {
    $$typeof: n,
    type: a,
    key: k,
    ref: h,
    props: d,
    _owner: G.current
  };
}

function K(a, b) {
  return {
    $$typeof: n,
    type: a.type,
    key: b,
    ref: a.ref,
    props: a.props,
    _owner: a._owner
  };
}

function L(a) {
  return "object" === _typeof(a) && null !== a && a.$$typeof === n;
}

function escape(a) {
  var b = {
    "=": "=0",
    ":": "=2"
  };
  return "$" + a.replace(/[=:]/g, function (a) {
    return b[a];
  });
}

var M = /\/+/g;

function N(a, b) {
  return "object" === _typeof(a) && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}

function O(a, b, c, e, d) {
  var k = _typeof(a);

  if ("undefined" === k || "boolean" === k) a = null;
  var h = !1;
  if (null === a) h = !0;else switch (k) {
    case "string":
    case "number":
      h = !0;
      break;

    case "object":
      switch (a.$$typeof) {
        case n:
        case p:
          h = !0;
      }

  }
  if (h) return h = a, d = d(h), a = "" === e ? "." + N(h, 0) : e, Array.isArray(d) ? (c = "", null != a && (c = a.replace(M, "$&/") + "/"), O(d, b, c, "", function (a) {
    return a;
  })) : null != d && (L(d) && (d = K(d, c + (!d.key || h && h.key === d.key ? "" : ("" + d.key).replace(M, "$&/") + "/") + a)), b.push(d)), 1;
  h = 0;
  e = "" === e ? "." : e + ":";
  if (Array.isArray(a)) for (var g = 0; g < a.length; g++) {
    k = a[g];
    var f = e + N(k, g);
    h += O(k, b, c, f, d);
  } else if (f = y(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done;) {
    k = k.value, f = e + N(k, g++), h += O(k, b, c, f, d);
  } else if ("object" === k) throw b = "" + a, Error(z(31, "[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b));
  return h;
}

function P(a, b, c) {
  if (null == a) return a;
  var e = [],
      d = 0;
  O(a, e, "", "", function (a) {
    return b.call(c, a, d++);
  });
  return e;
}

function Q(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    a._status = 0;
    a._result = b;
    b.then(function (b) {
      0 === a._status && (b = b.default, a._status = 1, a._result = b);
    }, function (b) {
      0 === a._status && (a._status = 2, a._result = b);
    });
  }

  if (1 === a._status) return a._result;
  throw a._result;
}

var R = {
  current: null
};

function S() {
  var a = R.current;
  if (null === a) throw Error(z(321));
  return a;
}

var T = {
  ReactCurrentDispatcher: R,
  ReactCurrentBatchConfig: {
    transition: 0
  },
  ReactCurrentOwner: G,
  IsSomeRendererActing: {
    current: !1
  },
  assign: l
};
exports.Children = {
  map: P,
  forEach: function forEach(a, b, c) {
    P(a, function () {
      b.apply(this, arguments);
    }, c);
  },
  count: function count(a) {
    var b = 0;
    P(a, function () {
      b++;
    });
    return b;
  },
  toArray: function toArray(a) {
    return P(a, function (a) {
      return a;
    }) || [];
  },
  only: function only(a) {
    if (!L(a)) throw Error(z(143));
    return a;
  }
};
exports.Component = C;
exports.PureComponent = E;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T;

exports.cloneElement = function (a, b, c) {
  if (null === a || void 0 === a) throw Error(z(267, a));
  var e = l({}, a.props),
      d = a.key,
      k = a.ref,
      h = a._owner;

  if (null != b) {
    void 0 !== b.ref && (k = b.ref, h = G.current);
    void 0 !== b.key && (d = "" + b.key);
    if (a.type && a.type.defaultProps) var g = a.type.defaultProps;

    for (f in b) {
      H.call(b, f) && !I.hasOwnProperty(f) && (e[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
    }
  }

  var f = arguments.length - 2;
  if (1 === f) e.children = c;else if (1 < f) {
    g = Array(f);

    for (var m = 0; m < f; m++) {
      g[m] = arguments[m + 2];
    }

    e.children = g;
  }
  return {
    $$typeof: n,
    type: a.type,
    key: d,
    ref: k,
    props: e,
    _owner: h
  };
};

exports.createContext = function (a, b) {
  void 0 === b && (b = null);
  a = {
    $$typeof: r,
    _calculateChangedBits: b,
    _currentValue: a,
    _currentValue2: a,
    _threadCount: 0,
    Provider: null,
    Consumer: null
  };
  a.Provider = {
    $$typeof: q,
    _context: a
  };
  return a.Consumer = a;
};

exports.createElement = J;

exports.createFactory = function (a) {
  var b = J.bind(null, a);
  b.type = a;
  return b;
};

exports.createRef = function () {
  return {
    current: null
  };
};

exports.forwardRef = function (a) {
  return {
    $$typeof: t,
    render: a
  };
};

exports.isValidElement = L;

exports.lazy = function (a) {
  return {
    $$typeof: v,
    _payload: {
      _status: -1,
      _result: a
    },
    _init: Q
  };
};

exports.memo = function (a, b) {
  return {
    $$typeof: u,
    type: a,
    compare: void 0 === b ? null : b
  };
};

exports.useCallback = function (a, b) {
  return S().useCallback(a, b);
};

exports.useContext = function (a, b) {
  return S().useContext(a, b);
};

exports.useDebugValue = function () {};

exports.useEffect = function (a, b) {
  return S().useEffect(a, b);
};

exports.useImperativeHandle = function (a, b, c) {
  return S().useImperativeHandle(a, b, c);
};

exports.useLayoutEffect = function (a, b) {
  return S().useLayoutEffect(a, b);
};

exports.useMemo = function (a, b) {
  return S().useMemo(a, b);
};

exports.useReducer = function (a, b, c) {
  return S().useReducer(a, b, c);
};

exports.useRef = function (a) {
  return S().useRef(a);
};

exports.useState = function (a) {
  return S().useState(a);
};

exports.version = "17.0.2";

/***/ }),

/***/ 657:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(2932);
} else {}

/***/ }),

/***/ 2669:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);
var _typeof = __webpack_require__(3634);

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }

  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  define(Gp, iteratorSymbol, function () {
    return this;
  });
  define(Gp, "toString", function () {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function stop() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  }; // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.

  return exports;
}( // If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
( false ? 0 : _typeof(module)) === "object" ? module.exports : {});

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

/***/ }),

/***/ 3271:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Relay v11.0.2
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
module.exports = __webpack_require__(6663);

/***/ }),

/***/ 3655:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var ConnectionHandler = __webpack_require__(6732);

var MutationHandlers = __webpack_require__(8608);

var invariant = __webpack_require__(4990);

function RelayDefaultHandlerProvider(handle) {
  switch (handle) {
    case 'connection':
      return ConnectionHandler;

    case 'deleteRecord':
      return MutationHandlers.DeleteRecordHandler;

    case 'deleteEdge':
      return MutationHandlers.DeleteEdgeHandler;

    case 'appendEdge':
      return MutationHandlers.AppendEdgeHandler;

    case 'prependEdge':
      return MutationHandlers.PrependEdgeHandler;

    case 'appendNode':
      return MutationHandlers.AppendNodeHandler;

    case 'prependNode':
      return MutationHandlers.PrependNodeHandler;
  }

   true ?  false ? 0 : invariant(false) : 0;
}

module.exports = RelayDefaultHandlerProvider;

/***/ }),

/***/ 6732:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var ConnectionInterface = __webpack_require__(176);

var getRelayHandleKey = __webpack_require__(9845);

var invariant = __webpack_require__(4990);

var warning = __webpack_require__(480);

var _require = __webpack_require__(5057),
    generateClientID = _require.generateClientID;

var _require2 = __webpack_require__(880),
    getStableStorageKey = _require2.getStableStorageKey;

var CONNECTION = 'connection'; // Per-instance incrementing index used to generate unique edge IDs

var NEXT_EDGE_INDEX = '__connection_next_edge_index';
/**
 * @public
 *
 * A default runtime handler for connection fields that appends newly fetched
 * edges onto the end of a connection, regardless of the arguments used to fetch
 * those edges.
 */

function update(store, payload) {
  var record = store.get(payload.dataID);

  if (!record) {
    return;
  }

  var _ConnectionInterface$ = ConnectionInterface.get(),
      EDGES = _ConnectionInterface$.EDGES,
      END_CURSOR = _ConnectionInterface$.END_CURSOR,
      HAS_NEXT_PAGE = _ConnectionInterface$.HAS_NEXT_PAGE,
      HAS_PREV_PAGE = _ConnectionInterface$.HAS_PREV_PAGE,
      PAGE_INFO = _ConnectionInterface$.PAGE_INFO,
      PAGE_INFO_TYPE = _ConnectionInterface$.PAGE_INFO_TYPE,
      START_CURSOR = _ConnectionInterface$.START_CURSOR;

  var serverConnection = record.getLinkedRecord(payload.fieldKey);
  var serverPageInfo = serverConnection && serverConnection.getLinkedRecord(PAGE_INFO);

  if (!serverConnection) {
    record.setValue(null, payload.handleKey);
    return;
  } // In rare cases the handleKey field may be unset even though the client
  // connection record exists, in this case new edges should still be merged
  // into the existing client connection record (and the field reset to point
  // to that record).


  var clientConnectionID = generateClientID(record.getDataID(), payload.handleKey);
  var clientConnectionField = record.getLinkedRecord(payload.handleKey);
  var clientConnection = clientConnectionField !== null && clientConnectionField !== void 0 ? clientConnectionField : store.get(clientConnectionID);
  var clientPageInfo = clientConnection && clientConnection.getLinkedRecord(PAGE_INFO);

  if (!clientConnection) {
    // Initial fetch with data: copy fields from the server record
    var connection = store.create(clientConnectionID, serverConnection.getType());
    connection.setValue(0, NEXT_EDGE_INDEX);
    connection.copyFieldsFrom(serverConnection);
    var serverEdges = serverConnection.getLinkedRecords(EDGES);

    if (serverEdges) {
      serverEdges = serverEdges.map(function (edge) {
        return buildConnectionEdge(store, connection, edge);
      });
      connection.setLinkedRecords(serverEdges, EDGES);
    }

    record.setLinkedRecord(connection, payload.handleKey);
    clientPageInfo = store.create(generateClientID(connection.getDataID(), PAGE_INFO), PAGE_INFO_TYPE);
    clientPageInfo.setValue(false, HAS_NEXT_PAGE);
    clientPageInfo.setValue(false, HAS_PREV_PAGE);
    clientPageInfo.setValue(null, END_CURSOR);
    clientPageInfo.setValue(null, START_CURSOR);

    if (serverPageInfo) {
      clientPageInfo.copyFieldsFrom(serverPageInfo);
    }

    connection.setLinkedRecord(clientPageInfo, PAGE_INFO);
  } else {
    if (clientConnectionField == null) {
      // If the handleKey field was unset but the client connection record
      // existed, update the field to point to the record
      record.setLinkedRecord(clientConnection, payload.handleKey);
    }

    var _connection = clientConnection; // Subsequent fetches:
    // - updated fields on the connection
    // - merge prev/next edges, de-duplicating by node id
    // - synthesize page info fields

    var _serverEdges = serverConnection.getLinkedRecords(EDGES);

    if (_serverEdges) {
      _serverEdges = _serverEdges.map(function (edge) {
        return buildConnectionEdge(store, _connection, edge);
      });
    }

    var prevEdges = _connection.getLinkedRecords(EDGES);

    var prevPageInfo = _connection.getLinkedRecord(PAGE_INFO);

    _connection.copyFieldsFrom(serverConnection); // Reset EDGES and PAGE_INFO fields


    if (prevEdges) {
      _connection.setLinkedRecords(prevEdges, EDGES);
    }

    if (prevPageInfo) {
      _connection.setLinkedRecord(prevPageInfo, PAGE_INFO);
    }

    var nextEdges = [];
    var args = payload.args;

    if (prevEdges && _serverEdges) {
      // $FlowFixMe[prop-missing]
      if (args.after != null) {
        // Forward pagination from the end of the connection: append edges
        if (clientPageInfo && // $FlowFixMe[prop-missing]
        args.after === clientPageInfo.getValue(END_CURSOR)) {
          var nodeIDs = new Set();
          mergeEdges(prevEdges, nextEdges, nodeIDs);
          mergeEdges(_serverEdges, nextEdges, nodeIDs);
        } else {
           false ? 0 : void 0;
          return;
        } // $FlowFixMe[prop-missing]

      } else if (args.before != null) {
        // Backward pagination from the start of the connection: prepend edges
        if (clientPageInfo && // $FlowFixMe[prop-missing]
        args.before === clientPageInfo.getValue(START_CURSOR)) {
          var _nodeIDs = new Set();

          mergeEdges(_serverEdges, nextEdges, _nodeIDs);
          mergeEdges(prevEdges, nextEdges, _nodeIDs);
        } else {
           false ? 0 : void 0;
          return;
        }
      } else {
        // The connection was refetched from the beginning/end: replace edges
        nextEdges = _serverEdges;
      }
    } else if (_serverEdges) {
      nextEdges = _serverEdges;
    } else {
      nextEdges = prevEdges;
    } // Update edges only if they were updated, the null check is
    // for Flow (prevEdges could be null).


    if (nextEdges != null && nextEdges !== prevEdges) {
      _connection.setLinkedRecords(nextEdges, EDGES);
    } // Page info should be updated even if no new edge were returned.


    if (clientPageInfo && serverPageInfo) {
      // $FlowFixMe[prop-missing]
      if (args.after == null && args.before == null) {
        // The connection was refetched from the beginning/end: replace
        // page_info
        clientPageInfo.copyFieldsFrom(serverPageInfo); // $FlowFixMe[prop-missing]
      } else if (args.before != null || args.after == null && args.last) {
        clientPageInfo.setValue(!!serverPageInfo.getValue(HAS_PREV_PAGE), HAS_PREV_PAGE);
        var startCursor = serverPageInfo.getValue(START_CURSOR);

        if (typeof startCursor === 'string') {
          clientPageInfo.setValue(startCursor, START_CURSOR);
        } // $FlowFixMe[prop-missing]

      } else if (args.after != null || args.before == null && args.first) {
        clientPageInfo.setValue(!!serverPageInfo.getValue(HAS_NEXT_PAGE), HAS_NEXT_PAGE);
        var endCursor = serverPageInfo.getValue(END_CURSOR);

        if (typeof endCursor === 'string') {
          clientPageInfo.setValue(endCursor, END_CURSOR);
        }
      }
    }
  }
}
/**
 * @public
 *
 * Given a record and the name of the schema field for which a connection was
 * fetched, returns the linked connection record.
 *
 * Example:
 *
 * Given that data has already been fetched on some user `<id>` on the `friends`
 * field:
 *
 * ```
 * fragment FriendsFragment on User {
 *   friends(first: 10) @connection(key: "FriendsFragment_friends") {
 *    edges {
 *      node {
 *        id
 *        }
 *      }
 *   }
 * }
 * ```
 *
 * The `friends` connection record can be accessed with:
 *
 * ```
 * store => {
 *   const user = store.get('<id>');
 *   const friends = ConnectionHandler.getConnection(user, 'FriendsFragment_friends');
 *   // Access fields on the connection:
 *   const edges = friends.getLinkedRecords('edges');
 * }
 * ```
 *
 * TODO: t15733312
 * Currently we haven't run into this case yet, but we need to add a `getConnections`
 * that returns an array of the connections under the same `key` regardless of the variables.
 */


function getConnection(record, key, filters) {
  var handleKey = getRelayHandleKey(CONNECTION, key, null);
  return record.getLinkedRecord(handleKey, filters);
}
/**
 * @public
 *
 * Given a record ID, the key of a connection field, and optional filters used
 * to identify the connection, returns the connection ID.
 *
 * Example:
 *
 * Given that data has already been fetched on some user `<user-id>` on the `friends`
 * field:
 *
 * ```
 * fragment FriendsFragment on User {
 *   friends(first: 10) @connection(key: "FriendsFragment_friends") {
 *     edges {
 *       node {
 *         id
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * The ID of the `friends` connection record can be accessed with:
 *
 * ```
 * store => {
 *   const connectionID = ConnectionHandler.getConnectionID('<user-id>', 'FriendsFragment_friends');
 * }
 * ```
 */


function getConnectionID(recordID, key, filters) {
  var handleKey = getRelayHandleKey(CONNECTION, key, null);
  var storageKey = getStableStorageKey(handleKey, filters);
  return generateClientID(recordID, storageKey);
}
/**
 * @public
 *
 * Inserts an edge after the given cursor, or at the end of the list if no
 * cursor is provided.
 *
 * Example:
 *
 * Given that data has already been fetched on some user `<id>` on the `friends`
 * field:
 *
 * ```
 * fragment FriendsFragment on User {
 *   friends(first: 10) @connection(key: "FriendsFragment_friends") {
 *    edges {
 *      node {
 *        id
 *        }
 *      }
 *   }
 * }
 * ```
 *
 * An edge can be appended with:
 *
 * ```
 * store => {
 *   const user = store.get('<id>');
 *   const friends = ConnectionHandler.getConnection(user, 'FriendsFragment_friends');
 *   const edge = store.create('<edge-id>', 'FriendsEdge');
 *   ConnectionHandler.insertEdgeAfter(friends, edge);
 * }
 * ```
 */


function insertEdgeAfter(record, newEdge, cursor) {
  var _ConnectionInterface$2 = ConnectionInterface.get(),
      CURSOR = _ConnectionInterface$2.CURSOR,
      EDGES = _ConnectionInterface$2.EDGES;

  var edges = record.getLinkedRecords(EDGES);

  if (!edges) {
    record.setLinkedRecords([newEdge], EDGES);
    return;
  }

  var nextEdges;

  if (cursor == null) {
    nextEdges = edges.concat(newEdge);
  } else {
    nextEdges = [];
    var foundCursor = false;

    for (var ii = 0; ii < edges.length; ii++) {
      var edge = edges[ii];
      nextEdges.push(edge);

      if (edge == null) {
        continue;
      }

      var edgeCursor = edge.getValue(CURSOR);

      if (cursor === edgeCursor) {
        nextEdges.push(newEdge);
        foundCursor = true;
      }
    }

    if (!foundCursor) {
      nextEdges.push(newEdge);
    }
  }

  record.setLinkedRecords(nextEdges, EDGES);
}
/**
 * @public
 *
 * Creates an edge for a connection record, given a node and edge type.
 */


function createEdge(store, record, node, edgeType) {
  var _ConnectionInterface$3 = ConnectionInterface.get(),
      NODE = _ConnectionInterface$3.NODE; // An index-based client ID could easily conflict (unless it was
  // auto-incrementing, but there is nowhere to the store the id)
  // Instead, construct a client ID based on the connection ID and node ID,
  // which will only conflict if the same node is added to the same connection
  // twice. This is acceptable since the `insertEdge*` functions ignore
  // duplicates.


  var edgeID = generateClientID(record.getDataID(), node.getDataID());
  var edge = store.get(edgeID);

  if (!edge) {
    edge = store.create(edgeID, edgeType);
  }

  edge.setLinkedRecord(node, NODE);

  if (edge.getValue('cursor') == null) {
    // Always use null instead of undefined value for cursor
    // to avoid considering it as missing data
    edge.setValue(null, 'cursor');
  }

  return edge;
}
/**
 * @public
 *
 * Inserts an edge before the given cursor, or at the beginning of the list if
 * no cursor is provided.
 *
 * Example:
 *
 * Given that data has already been fetched on some user `<id>` on the `friends`
 * field:
 *
 * ```
 * fragment FriendsFragment on User {
 *   friends(first: 10) @connection(key: "FriendsFragment_friends") {
 *    edges {
 *      node {
 *        id
 *        }
 *      }
 *   }
 * }
 * ```
 *
 * An edge can be prepended with:
 *
 * ```
 * store => {
 *   const user = store.get('<id>');
 *   const friends = ConnectionHandler.getConnection(user, 'FriendsFragment_friends');
 *   const edge = store.create('<edge-id>', 'FriendsEdge');
 *   ConnectionHandler.insertEdgeBefore(friends, edge);
 * }
 * ```
 */


function insertEdgeBefore(record, newEdge, cursor) {
  var _ConnectionInterface$4 = ConnectionInterface.get(),
      CURSOR = _ConnectionInterface$4.CURSOR,
      EDGES = _ConnectionInterface$4.EDGES;

  var edges = record.getLinkedRecords(EDGES);

  if (!edges) {
    record.setLinkedRecords([newEdge], EDGES);
    return;
  }

  var nextEdges;

  if (cursor == null) {
    nextEdges = [newEdge].concat(edges);
  } else {
    nextEdges = [];
    var foundCursor = false;

    for (var ii = 0; ii < edges.length; ii++) {
      var edge = edges[ii];

      if (edge != null) {
        var edgeCursor = edge.getValue(CURSOR);

        if (cursor === edgeCursor) {
          nextEdges.push(newEdge);
          foundCursor = true;
        }
      }

      nextEdges.push(edge);
    }

    if (!foundCursor) {
      nextEdges.unshift(newEdge);
    }
  }

  record.setLinkedRecords(nextEdges, EDGES);
}
/**
 * @public
 *
 * Remove any edges whose `node.id` matches the given id.
 */


function deleteNode(record, nodeID) {
  var _ConnectionInterface$5 = ConnectionInterface.get(),
      EDGES = _ConnectionInterface$5.EDGES,
      NODE = _ConnectionInterface$5.NODE;

  var edges = record.getLinkedRecords(EDGES);

  if (!edges) {
    return;
  }

  var nextEdges;

  for (var ii = 0; ii < edges.length; ii++) {
    var edge = edges[ii];
    var node = edge && edge.getLinkedRecord(NODE);

    if (node != null && node.getDataID() === nodeID) {
      if (nextEdges === undefined) {
        nextEdges = edges.slice(0, ii);
      }
    } else if (nextEdges !== undefined) {
      nextEdges.push(edge);
    }
  }

  if (nextEdges !== undefined) {
    record.setLinkedRecords(nextEdges, EDGES);
  }
}
/**
 * @internal
 *
 * Creates a copy of an edge with a unique ID based on per-connection-instance
 * incrementing edge index. This is necessary to avoid collisions between edges,
 * which can occur because (edge) client IDs are assigned deterministically
 * based on the path from the nearest node with an id.
 *
 * Example: if the first N edges of the same connection are refetched, the edges
 * from the second fetch will be assigned the same IDs as the first fetch, even
 * though the nodes they point to may be different (or the same and in different
 * order).
 */


function buildConnectionEdge(store, connection, edge) {
  if (edge == null) {
    return edge;
  }

  var _ConnectionInterface$6 = ConnectionInterface.get(),
      EDGES = _ConnectionInterface$6.EDGES;

  var edgeIndex = connection.getValue(NEXT_EDGE_INDEX);
  !(typeof edgeIndex === 'number') ?  false ? 0 : invariant(false) : void 0;
  var edgeID = generateClientID(connection.getDataID(), EDGES, edgeIndex);
  var connectionEdge = store.create(edgeID, edge.getType());
  connectionEdge.copyFieldsFrom(edge);

  if (connectionEdge.getValue('cursor') == null) {
    // Always use null instead of undefined value for cursor
    // to avoid considering it as missing data
    connectionEdge.setValue(null, 'cursor');
  }

  connection.setValue(edgeIndex + 1, NEXT_EDGE_INDEX);
  return connectionEdge;
}
/**
 * @internal
 *
 * Adds the source edges to the target edges, skipping edges with
 * duplicate node ids.
 */


function mergeEdges(sourceEdges, targetEdges, nodeIDs) {
  var _ConnectionInterface$7 = ConnectionInterface.get(),
      NODE = _ConnectionInterface$7.NODE;

  for (var ii = 0; ii < sourceEdges.length; ii++) {
    var edge = sourceEdges[ii];

    if (!edge) {
      continue;
    }

    var node = edge.getLinkedRecord(NODE);
    var nodeID = node && node.getDataID();

    if (nodeID) {
      if (nodeIDs.has(nodeID)) {
        continue;
      }

      nodeIDs.add(nodeID);
    }

    targetEdges.push(edge);
  }
}

module.exports = {
  buildConnectionEdge: buildConnectionEdge,
  createEdge: createEdge,
  deleteNode: deleteNode,
  getConnection: getConnection,
  getConnectionID: getConnectionID,
  insertEdgeAfter: insertEdgeAfter,
  insertEdgeBefore: insertEdgeBefore,
  update: update
};

/***/ }),

/***/ 176:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var CONNECTION_CALLS = {
  after: true,
  before: true,
  find: true,
  first: true,
  last: true,
  surrounds: true
};
var config = {
  CLIENT_MUTATION_ID: 'clientMutationId',
  CURSOR: 'cursor',
  EDGES: 'edges',
  END_CURSOR: 'endCursor',
  HAS_NEXT_PAGE: 'hasNextPage',
  HAS_PREV_PAGE: 'hasPreviousPage',
  NODE: 'node',
  PAGE_INFO_TYPE: 'PageInfo',
  PAGE_INFO: 'pageInfo',
  START_CURSOR: 'startCursor'
};
/**
 * @internal
 *
 * Defines logic relevant to the informal "Connection" GraphQL interface.
 */

var ConnectionInterface = {
  inject: function inject(newConfig) {
    config = newConfig;
  },
  get: function get() {
    return config;
  },

  /**
   * Checks whether a call exists strictly to encode which parts of a connection
   * to fetch. Fields that only differ by connection call values should have the
   * same identity.
   */
  isConnectionCall: function isConnectionCall(call) {
    return CONNECTION_CALLS.hasOwnProperty(call.name);
  }
};
module.exports = ConnectionInterface;

/***/ }),

/***/ 8608:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _createForOfIteratorHelper2 = _interopRequireDefault(__webpack_require__(8629));

var ConnectionHandler = __webpack_require__(6732);

var ConnectionInterface = __webpack_require__(176);

var invariant = __webpack_require__(4990);

var warning = __webpack_require__(480);

var DeleteRecordHandler = {
  update: function update(store, payload) {
    var record = store.get(payload.dataID);

    if (record != null) {
      var idOrIds = record.getValue(payload.fieldKey);

      if (typeof idOrIds === 'string') {
        store["delete"](idOrIds);
      } else if (Array.isArray(idOrIds)) {
        idOrIds.forEach(function (id) {
          if (typeof id === 'string') {
            store["delete"](id);
          }
        });
      }
    }
  }
};
var DeleteEdgeHandler = {
  update: function update(store, payload) {
    var record = store.get(payload.dataID);

    if (record == null) {
      return;
    } // $FlowFixMe[prop-missing]


    var connections = payload.handleArgs.connections;
    !(connections != null) ?  false ? 0 : invariant(false) : void 0;
    var idOrIds = record.getValue(payload.fieldKey);
    var idList = Array.isArray(idOrIds) ? idOrIds : [idOrIds];
    idList.forEach(function (id) {
      if (typeof id === 'string') {
        var _iterator = (0, _createForOfIteratorHelper2["default"])(connections),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var connectionID = _step.value;
            var connection = store.get(connectionID);

            if (connection == null) {
               false ? 0 : void 0;
              continue;
            }

            ConnectionHandler.deleteNode(connection, id);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
    });
  }
};
var AppendEdgeHandler = {
  update: edgeUpdater(ConnectionHandler.insertEdgeAfter)
};
var PrependEdgeHandler = {
  update: edgeUpdater(ConnectionHandler.insertEdgeBefore)
};
var AppendNodeHandler = {
  update: nodeUpdater(ConnectionHandler.insertEdgeAfter)
};
var PrependNodeHandler = {
  update: nodeUpdater(ConnectionHandler.insertEdgeBefore)
};

function edgeUpdater(insertFn) {
  return function (store, payload) {
    var _serverEdges;

    var record = store.get(payload.dataID);

    if (record == null) {
      return;
    } // $FlowFixMe[prop-missing]


    var connections = payload.handleArgs.connections;
    !(connections != null) ?  false ? 0 : invariant(false) : void 0;
    var singleServerEdge, serverEdges;

    try {
      singleServerEdge = record.getLinkedRecord(payload.fieldKey, payload.args);
    } catch (_unused) {}

    if (!singleServerEdge) {
      try {
        serverEdges = record.getLinkedRecords(payload.fieldKey, payload.args);
      } catch (_unused2) {}
    }

    if (singleServerEdge == null && serverEdges == null) {
       false ? 0 : void 0;
      return;
    }

    var _ConnectionInterface$ = ConnectionInterface.get(),
        NODE = _ConnectionInterface$.NODE,
        EDGES = _ConnectionInterface$.EDGES;

    var serverEdgeList = (_serverEdges = serverEdges) !== null && _serverEdges !== void 0 ? _serverEdges : [singleServerEdge];

    var _iterator2 = (0, _createForOfIteratorHelper2["default"])(serverEdgeList),
        _step2;

    try {
      var _loop = function _loop() {
        var serverEdge = _step2.value;

        if (serverEdge == null) {
          return "continue";
        }

        var serverNode = serverEdge.getLinkedRecord('node');

        if (!serverNode) {
          return "continue";
        }

        var serverNodeId = serverNode.getDataID();

        var _iterator3 = (0, _createForOfIteratorHelper2["default"])(connections),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var connectionID = _step3.value;
            var connection = store.get(connectionID);

            if (connection == null) {
               false ? 0 : void 0;
              continue;
            }

            var nodeAlreadyExistsInConnection = (_connection$getLinked = connection.getLinkedRecords(EDGES)) === null || _connection$getLinked === void 0 ? void 0 : _connection$getLinked.some(function (edge) {
              var _edge$getLinkedRecord;

              return (edge === null || edge === void 0 ? void 0 : (_edge$getLinkedRecord = edge.getLinkedRecord(NODE)) === null || _edge$getLinkedRecord === void 0 ? void 0 : _edge$getLinkedRecord.getDataID()) === serverNodeId;
            });

            if (nodeAlreadyExistsInConnection) {
              continue;
            }

            var clientEdge = ConnectionHandler.buildConnectionEdge(store, connection, serverEdge);
            !(clientEdge != null) ?  false ? 0 : invariant(false) : void 0;
            insertFn(connection, clientEdge);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      };

      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _connection$getLinked;

        var _ret = _loop();

        if (_ret === "continue") continue;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  };
}

function nodeUpdater(insertFn) {
  return function (store, payload) {
    var _serverNodes;

    var record = store.get(payload.dataID);

    if (record == null) {
      return;
    } // $FlowFixMe[prop-missing]


    var _payload$handleArgs = payload.handleArgs,
        connections = _payload$handleArgs.connections,
        edgeTypeName = _payload$handleArgs.edgeTypeName;
    !(connections != null) ?  false ? 0 : invariant(false) : void 0;
    !(edgeTypeName != null) ?  false ? 0 : invariant(false) : void 0;
    var singleServerNode;
    var serverNodes;

    try {
      singleServerNode = record.getLinkedRecord(payload.fieldKey, payload.args);
    } catch (_unused3) {}

    if (!singleServerNode) {
      try {
        serverNodes = record.getLinkedRecords(payload.fieldKey, payload.args);
      } catch (_unused4) {}
    }

    if (singleServerNode == null && serverNodes == null) {
       false ? 0 : void 0;
      return;
    }

    var _ConnectionInterface$2 = ConnectionInterface.get(),
        NODE = _ConnectionInterface$2.NODE,
        EDGES = _ConnectionInterface$2.EDGES;

    var serverNodeList = (_serverNodes = serverNodes) !== null && _serverNodes !== void 0 ? _serverNodes : [singleServerNode];

    var _iterator4 = (0, _createForOfIteratorHelper2["default"])(serverNodeList),
        _step4;

    try {
      var _loop2 = function _loop2() {
        var serverNode = _step4.value;

        if (serverNode == null) {
          return "continue";
        }

        var serverNodeId = serverNode.getDataID();

        var _iterator5 = (0, _createForOfIteratorHelper2["default"])(connections),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var connectionID = _step5.value;
            var connection = store.get(connectionID);

            if (connection == null) {
               false ? 0 : void 0;
              continue;
            }

            var nodeAlreadyExistsInConnection = (_connection$getLinked2 = connection.getLinkedRecords(EDGES)) === null || _connection$getLinked2 === void 0 ? void 0 : _connection$getLinked2.some(function (edge) {
              var _edge$getLinkedRecord2;

              return (edge === null || edge === void 0 ? void 0 : (_edge$getLinkedRecord2 = edge.getLinkedRecord(NODE)) === null || _edge$getLinkedRecord2 === void 0 ? void 0 : _edge$getLinkedRecord2.getDataID()) === serverNodeId;
            });

            if (nodeAlreadyExistsInConnection) {
              continue;
            }

            var clientEdge = ConnectionHandler.createEdge(store, connection, serverNode, edgeTypeName);
            !(clientEdge != null) ?  false ? 0 : invariant(false) : void 0;
            insertFn(connection, clientEdge);
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      };

      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _connection$getLinked2;

        var _ret2 = _loop2();

        if (_ret2 === "continue") continue;
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  };
}

module.exports = {
  AppendEdgeHandler: AppendEdgeHandler,
  DeleteRecordHandler: DeleteRecordHandler,
  PrependEdgeHandler: PrependEdgeHandler,
  AppendNodeHandler: AppendNodeHandler,
  PrependNodeHandler: PrependNodeHandler,
  DeleteEdgeHandler: DeleteEdgeHandler
};

/***/ }),

/***/ 6663:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var ConnectionHandler = __webpack_require__(6732);

var ConnectionInterface = __webpack_require__(176);

var GraphQLTag = __webpack_require__(7834);

var MutationHandlers = __webpack_require__(8608);

var PreloadableQueryRegistry = __webpack_require__(1181);

var RelayConcreteNode = __webpack_require__(5742);

var RelayConcreteVariables = __webpack_require__(477);

var RelayDeclarativeMutationConfig = __webpack_require__(4697);

var RelayDefaultHandleKey = __webpack_require__(4083);

var RelayDefaultHandlerProvider = __webpack_require__(3655);

var RelayError = __webpack_require__(6030);

var RelayFeatureFlags = __webpack_require__(1054);

var RelayModernEnvironment = __webpack_require__(647);

var RelayModernOperationDescriptor = __webpack_require__(5989);

var RelayModernRecord = __webpack_require__(2944);

var RelayModernSelector = __webpack_require__(9797);

var RelayModernStore = __webpack_require__(3127);

var RelayNetwork = __webpack_require__(7805);

var RelayObservable = __webpack_require__(7429);

var RelayOperationTracker = __webpack_require__(9458);

var RelayProfiler = __webpack_require__(4678);

var RelayQueryResponseCache = __webpack_require__(9449);

var RelayRecordSource = __webpack_require__(2642);

var RelayReplaySubject = __webpack_require__(1808);

var RelayStoreUtils = __webpack_require__(880);

var ViewerPattern = __webpack_require__(2967);

var applyOptimisticMutation = __webpack_require__(8628);

var commitLocalUpdate = __webpack_require__(6886);

var commitMutation = __webpack_require__(3380);

var createFragmentSpecResolver = __webpack_require__(2961);

var createPayloadFor3DField = __webpack_require__(6177);

var createRelayContext = __webpack_require__(5088);

var deepFreeze = __webpack_require__(5274);

var fetchQuery = __webpack_require__(1800);

var fetchQueryInternal = __webpack_require__(8708);

var fetchQuery_DEPRECATED = __webpack_require__(7585);

var getFragmentIdentifier = __webpack_require__(4092);

var getRelayHandleKey = __webpack_require__(9845);

var getRequestIdentifier = __webpack_require__(3928);

var isPromise = __webpack_require__(1496);

var isRelayModernEnvironment = __webpack_require__(642);

var isScalarAndEqual = __webpack_require__(2485);

var readInlineData = __webpack_require__(9905);

var recycleNodesInto = __webpack_require__(9278);

var reportMissingRequiredFields = __webpack_require__(2111);

var requestSubscription = __webpack_require__(4508);

var stableCopy = __webpack_require__(4701);

var _require = __webpack_require__(5057),
    generateClientID = _require.generateClientID,
    generateUniqueClientID = _require.generateUniqueClientID,
    isClientID = _require.isClientID; // As early as possible, check for the existence of the JavaScript globals which
// Relay Runtime relies upon, and produce a clear message if they do not exist.


if (false) { var objStr, promiseStr, setStr, mapStr; }
/**
 * The public interface to Relay Runtime.
 */


module.exports = {
  // Core API
  Environment: RelayModernEnvironment,
  Network: RelayNetwork,
  Observable: RelayObservable,
  QueryResponseCache: RelayQueryResponseCache,
  RecordSource: RelayRecordSource,
  Record: RelayModernRecord,
  ReplaySubject: RelayReplaySubject,
  Store: RelayModernStore,
  areEqualSelectors: RelayModernSelector.areEqualSelectors,
  createFragmentSpecResolver: createFragmentSpecResolver,
  createNormalizationSelector: RelayModernSelector.createNormalizationSelector,
  createOperationDescriptor: RelayModernOperationDescriptor.createOperationDescriptor,
  createReaderSelector: RelayModernSelector.createReaderSelector,
  createRequestDescriptor: RelayModernOperationDescriptor.createRequestDescriptor,
  getDataIDsFromFragment: RelayModernSelector.getDataIDsFromFragment,
  getDataIDsFromObject: RelayModernSelector.getDataIDsFromObject,
  getNode: GraphQLTag.getNode,
  getFragment: GraphQLTag.getFragment,
  getInlineDataFragment: GraphQLTag.getInlineDataFragment,
  getModuleComponentKey: RelayStoreUtils.getModuleComponentKey,
  getModuleOperationKey: RelayStoreUtils.getModuleOperationKey,
  getPaginationFragment: GraphQLTag.getPaginationFragment,
  getPluralSelector: RelayModernSelector.getPluralSelector,
  getRefetchableFragment: GraphQLTag.getRefetchableFragment,
  getRequest: GraphQLTag.getRequest,
  getRequestIdentifier: getRequestIdentifier,
  getSelector: RelayModernSelector.getSelector,
  getSelectorsFromObject: RelayModernSelector.getSelectorsFromObject,
  getSingularSelector: RelayModernSelector.getSingularSelector,
  getStorageKey: RelayStoreUtils.getStorageKey,
  getVariablesFromFragment: RelayModernSelector.getVariablesFromFragment,
  getVariablesFromObject: RelayModernSelector.getVariablesFromObject,
  getVariablesFromPluralFragment: RelayModernSelector.getVariablesFromPluralFragment,
  getVariablesFromSingularFragment: RelayModernSelector.getVariablesFromSingularFragment,
  reportMissingRequiredFields: reportMissingRequiredFields,
  graphql: GraphQLTag.graphql,
  isFragment: GraphQLTag.isFragment,
  isInlineDataFragment: GraphQLTag.isInlineDataFragment,
  isRequest: GraphQLTag.isRequest,
  readInlineData: readInlineData,
  // Declarative mutation API
  MutationTypes: RelayDeclarativeMutationConfig.MutationTypes,
  RangeOperations: RelayDeclarativeMutationConfig.RangeOperations,
  // Extensions
  DefaultHandlerProvider: RelayDefaultHandlerProvider,
  ConnectionHandler: ConnectionHandler,
  MutationHandlers: MutationHandlers,
  VIEWER_ID: ViewerPattern.VIEWER_ID,
  VIEWER_TYPE: ViewerPattern.VIEWER_TYPE,
  // Helpers (can be implemented via the above API)
  applyOptimisticMutation: applyOptimisticMutation,
  commitLocalUpdate: commitLocalUpdate,
  commitMutation: commitMutation,
  fetchQuery: fetchQuery,
  fetchQuery_DEPRECATED: fetchQuery_DEPRECATED,
  isRelayModernEnvironment: isRelayModernEnvironment,
  requestSubscription: requestSubscription,
  // Configuration interface for legacy or special uses
  ConnectionInterface: ConnectionInterface,
  // Utilities
  PreloadableQueryRegistry: PreloadableQueryRegistry,
  RelayProfiler: RelayProfiler,
  createPayloadFor3DField: createPayloadFor3DField,
  // INTERNAL-ONLY: These exports might be removed at any point.
  RelayConcreteNode: RelayConcreteNode,
  RelayError: RelayError,
  RelayFeatureFlags: RelayFeatureFlags,
  DEFAULT_HANDLE_KEY: RelayDefaultHandleKey.DEFAULT_HANDLE_KEY,
  FRAGMENTS_KEY: RelayStoreUtils.FRAGMENTS_KEY,
  FRAGMENT_OWNER_KEY: RelayStoreUtils.FRAGMENT_OWNER_KEY,
  ID_KEY: RelayStoreUtils.ID_KEY,
  REF_KEY: RelayStoreUtils.REF_KEY,
  REFS_KEY: RelayStoreUtils.REFS_KEY,
  ROOT_ID: RelayStoreUtils.ROOT_ID,
  ROOT_TYPE: RelayStoreUtils.ROOT_TYPE,
  TYPENAME_KEY: RelayStoreUtils.TYPENAME_KEY,
  deepFreeze: deepFreeze,
  generateClientID: generateClientID,
  generateUniqueClientID: generateUniqueClientID,
  getRelayHandleKey: getRelayHandleKey,
  isClientID: isClientID,
  isPromise: isPromise,
  isScalarAndEqual: isScalarAndEqual,
  recycleNodesInto: recycleNodesInto,
  stableCopy: stableCopy,
  getFragmentIdentifier: getFragmentIdentifier,
  __internal: {
    OperationTracker: RelayOperationTracker,
    createRelayContext: createRelayContext,
    getOperationVariables: RelayConcreteVariables.getOperationVariables,
    fetchQuery: fetchQueryInternal.fetchQuery,
    fetchQueryDeduped: fetchQueryInternal.fetchQueryDeduped,
    getPromiseForActiveRequest: fetchQueryInternal.getPromiseForActiveRequest,
    getObservableForActiveRequest: fetchQueryInternal.getObservableForActiveRequest
  }
};

/***/ }),

/***/ 4697:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _typeof = __webpack_require__(3634);

var _interopRequireDefault = __webpack_require__(249);

var _createForOfIteratorHelper2 = _interopRequireDefault(__webpack_require__(8629));

var ConnectionHandler = __webpack_require__(6732);

var warning = __webpack_require__(480);

var MutationTypes = Object.freeze({
  RANGE_ADD: 'RANGE_ADD',
  RANGE_DELETE: 'RANGE_DELETE',
  NODE_DELETE: 'NODE_DELETE'
});
var RangeOperations = Object.freeze({
  APPEND: 'append',
  PREPEND: 'prepend'
});

function convert(configs, request, optimisticUpdater, updater) {
  var configOptimisticUpdates = optimisticUpdater ? [optimisticUpdater] : [];
  var configUpdates = updater ? [updater] : [];
  configs.forEach(function (config) {
    switch (config.type) {
      case 'NODE_DELETE':
        var nodeDeleteResult = nodeDelete(config, request);

        if (nodeDeleteResult) {
          configOptimisticUpdates.push(nodeDeleteResult);
          configUpdates.push(nodeDeleteResult);
        }

        break;

      case 'RANGE_ADD':
        var rangeAddResult = rangeAdd(config, request);

        if (rangeAddResult) {
          configOptimisticUpdates.push(rangeAddResult);
          configUpdates.push(rangeAddResult);
        }

        break;

      case 'RANGE_DELETE':
        var rangeDeleteResult = rangeDelete(config, request);

        if (rangeDeleteResult) {
          configOptimisticUpdates.push(rangeDeleteResult);
          configUpdates.push(rangeDeleteResult);
        }

        break;
    }
  });
  return {
    optimisticUpdater: function optimisticUpdater(store, data) {
      configOptimisticUpdates.forEach(function (eachOptimisticUpdater) {
        eachOptimisticUpdater(store, data);
      });
    },
    updater: function updater(store, data) {
      configUpdates.forEach(function (eachUpdater) {
        eachUpdater(store, data);
      });
    }
  };
}

function nodeDelete(config, request) {
  var deletedIDFieldName = config.deletedIDFieldName;
  var rootField = getRootField(request);

  if (!rootField) {
    return null;
  }

  return function (store, data) {
    var payload = store.getRootField(rootField);

    if (!payload) {
      return;
    }

    var deleteID = payload.getValue(deletedIDFieldName);
    var deleteIDs = Array.isArray(deleteID) ? deleteID : [deleteID];
    deleteIDs.forEach(function (id) {
      if (id && typeof id === 'string') {
        store["delete"](id);
      }
    });
  };
}

function rangeAdd(config, request) {
  var parentID = config.parentID,
      connectionInfo = config.connectionInfo,
      edgeName = config.edgeName;

  if (!parentID) {
     false ? 0 : void 0;
    return null;
  }

  var rootField = getRootField(request);

  if (!connectionInfo || !rootField) {
    return null;
  }

  return function (store, data) {
    var parent = store.get(parentID);

    if (!parent) {
      return;
    }

    var payload = store.getRootField(rootField);

    if (!payload) {
      return;
    }

    var serverEdge = payload.getLinkedRecord(edgeName);

    var _iterator = (0, _createForOfIteratorHelper2["default"])(connectionInfo),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var info = _step.value;

        if (!serverEdge) {
          continue;
        }

        var connection = ConnectionHandler.getConnection(parent, info.key, info.filters);

        if (!connection) {
          continue;
        }

        var clientEdge = ConnectionHandler.buildConnectionEdge(store, connection, serverEdge);

        if (!clientEdge) {
          continue;
        }

        switch (info.rangeBehavior) {
          case 'append':
            ConnectionHandler.insertEdgeAfter(connection, clientEdge);
            break;

          case 'prepend':
            ConnectionHandler.insertEdgeBefore(connection, clientEdge);
            break;

          default:
             false ? 0 : void 0;
            break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };
}

function rangeDelete(config, request) {
  var parentID = config.parentID,
      connectionKeys = config.connectionKeys,
      pathToConnection = config.pathToConnection,
      deletedIDFieldName = config.deletedIDFieldName;

  if (!parentID) {
     false ? 0 : void 0;
    return null;
  }

  var rootField = getRootField(request);

  if (!rootField) {
    return null;
  }

  return function (store, data) {
    if (!data) {
      return;
    }

    var deleteIDs = [];
    var deletedIDField = data[rootField];

    if (deletedIDField && Array.isArray(deletedIDFieldName)) {
      var _iterator2 = (0, _createForOfIteratorHelper2["default"])(deletedIDFieldName),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var eachField = _step2.value;

          if (deletedIDField && _typeof(deletedIDField) === 'object') {
            deletedIDField = deletedIDField[eachField];
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if (Array.isArray(deletedIDField)) {
        deletedIDField.forEach(function (idObject) {
          if (idObject && idObject.id && _typeof(idObject) === 'object' && typeof idObject.id === 'string') {
            deleteIDs.push(idObject.id);
          }
        });
      } else if (deletedIDField && deletedIDField.id && typeof deletedIDField.id === 'string') {
        deleteIDs.push(deletedIDField.id);
      }
    } else if (deletedIDField && typeof deletedIDFieldName === 'string' && _typeof(deletedIDField) === 'object') {
      deletedIDField = deletedIDField[deletedIDFieldName];

      if (typeof deletedIDField === 'string') {
        deleteIDs.push(deletedIDField);
      } else if (Array.isArray(deletedIDField)) {
        deletedIDField.forEach(function (id) {
          if (typeof id === 'string') {
            deleteIDs.push(id);
          }
        });
      }
    }

    deleteNode(parentID, connectionKeys, pathToConnection, store, deleteIDs);
  };
}

function deleteNode(parentID, connectionKeys, pathToConnection, store, deleteIDs) {
   false ? 0 : void 0;
  var parent = store.get(parentID);

  if (!parent) {
    return;
  }

  if (pathToConnection.length < 2) {
     false ? 0 : void 0;
    return;
  }

  var recordProxy = parent;

  for (var i = 1; i < pathToConnection.length - 1; i++) {
    if (recordProxy) {
      recordProxy = recordProxy.getLinkedRecord(pathToConnection[i]);
    }
  } // Should never enter loop except edge cases


  if (!connectionKeys || !recordProxy) {
     false ? 0 : void 0;
    return;
  }

  var _iterator3 = (0, _createForOfIteratorHelper2["default"])(connectionKeys),
      _step3;

  try {
    var _loop = function _loop() {
      var key = _step3.value;
      var connection = ConnectionHandler.getConnection(recordProxy, key.key, key.filters);

      if (connection) {
        deleteIDs.forEach(function (deleteID) {
          ConnectionHandler.deleteNode(connection, deleteID);
        });
      }
    };

    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      _loop();
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
}

function getRootField(request) {
  if (request.fragment.selections && request.fragment.selections.length > 0 && request.fragment.selections[0].kind === 'LinkedField') {
    return request.fragment.selections[0].name;
  }

  return null;
}

module.exports = {
  MutationTypes: MutationTypes,
  RangeOperations: RangeOperations,
  convert: convert
};

/***/ }),

/***/ 5510:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _typeof = __webpack_require__(3634);

var invariant = __webpack_require__(4990);

var _require = __webpack_require__(5057),
    generateClientID = _require.generateClientID;

var _require2 = __webpack_require__(880),
    getStableStorageKey = _require2.getStableStorageKey;
/**
 * @internal
 *
 * A helper class for manipulating a given record from a record source via an
 * imperative/OO-style API.
 */


var RelayRecordProxy = /*#__PURE__*/function () {
  function RelayRecordProxy(source, mutator, dataID) {
    this._dataID = dataID;
    this._mutator = mutator;
    this._source = source;
  }

  var _proto = RelayRecordProxy.prototype;

  _proto.copyFieldsFrom = function copyFieldsFrom(source) {
    this._mutator.copyFields(source.getDataID(), this._dataID);
  };

  _proto.getDataID = function getDataID() {
    return this._dataID;
  };

  _proto.getType = function getType() {
    var type = this._mutator.getType(this._dataID);

    !(type != null) ?  false ? 0 : invariant(false) : void 0;
    return type;
  };

  _proto.getValue = function getValue(name, args) {
    var storageKey = getStableStorageKey(name, args);
    return this._mutator.getValue(this._dataID, storageKey);
  };

  _proto.setValue = function setValue(value, name, args) {
    !isValidLeafValue(value) ?  false ? 0 : invariant(false) : void 0;
    var storageKey = getStableStorageKey(name, args);

    this._mutator.setValue(this._dataID, storageKey, value);

    return this;
  };

  _proto.getLinkedRecord = function getLinkedRecord(name, args) {
    var storageKey = getStableStorageKey(name, args);

    var linkedID = this._mutator.getLinkedRecordID(this._dataID, storageKey);

    return linkedID != null ? this._source.get(linkedID) : linkedID;
  };

  _proto.setLinkedRecord = function setLinkedRecord(record, name, args) {
    !(record instanceof RelayRecordProxy) ?  false ? 0 : invariant(false) : void 0;
    var storageKey = getStableStorageKey(name, args);
    var linkedID = record.getDataID();

    this._mutator.setLinkedRecordID(this._dataID, storageKey, linkedID);

    return this;
  };

  _proto.getOrCreateLinkedRecord = function getOrCreateLinkedRecord(name, typeName, args) {
    var linkedRecord = this.getLinkedRecord(name, args);

    if (!linkedRecord) {
      var _this$_source$get;

      var storageKey = getStableStorageKey(name, args);
      var clientID = generateClientID(this.getDataID(), storageKey); // NOTE: it's possible that a client record for this field exists
      // but the field itself was unset.

      linkedRecord = (_this$_source$get = this._source.get(clientID)) !== null && _this$_source$get !== void 0 ? _this$_source$get : this._source.create(clientID, typeName);
      this.setLinkedRecord(linkedRecord, name, args);
    }

    return linkedRecord;
  };

  _proto.getLinkedRecords = function getLinkedRecords(name, args) {
    var _this = this;

    var storageKey = getStableStorageKey(name, args);

    var linkedIDs = this._mutator.getLinkedRecordIDs(this._dataID, storageKey);

    if (linkedIDs == null) {
      return linkedIDs;
    }

    return linkedIDs.map(function (linkedID) {
      return linkedID != null ? _this._source.get(linkedID) : linkedID;
    });
  };

  _proto.setLinkedRecords = function setLinkedRecords(records, name, args) {
    !Array.isArray(records) ?  false ? 0 : invariant(false) : void 0;
    var storageKey = getStableStorageKey(name, args);
    var linkedIDs = records.map(function (record) {
      return record && record.getDataID();
    });

    this._mutator.setLinkedRecordIDs(this._dataID, storageKey, linkedIDs);

    return this;
  };

  _proto.invalidateRecord = function invalidateRecord() {
    this._source.markIDForInvalidation(this._dataID);
  };

  return RelayRecordProxy;
}();

function isValidLeafValue(value) {
  return value == null || _typeof(value) !== 'object' || Array.isArray(value) && value.every(isValidLeafValue);
}

module.exports = RelayRecordProxy;

/***/ }),

/***/ 6569:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var RelayModernRecord = __webpack_require__(2944);

var invariant = __webpack_require__(4990);

var _require = __webpack_require__(5113),
    EXISTENT = _require.EXISTENT;
/**
 * @internal
 *
 * Wrapper API that is an amalgam of the `RelayModernRecord` API and
 * `MutableRecordSource` interface, implementing copy-on-write semantics for records
 * in a record source.
 *
 * Modifications are applied to fresh copies of records:
 * - Records in `base` are never modified.
 * - Modifications cause a fresh version of a record to be created in `sink`.
 *   These sink records contain only modified fields.
 */


var RelayRecordSourceMutator = /*#__PURE__*/function () {
  function RelayRecordSourceMutator(base, sink) {
    this.__sources = [sink, base];
    this._base = base;
    this._sink = sink;
  }
  /**
   * **UNSTABLE**
   * This method is likely to be removed in an upcoming release
   * and should not be relied upon.
   * TODO T41593196: Remove unstable_getRawRecordWithChanges
   */


  var _proto = RelayRecordSourceMutator.prototype;

  _proto.unstable_getRawRecordWithChanges = function unstable_getRawRecordWithChanges(dataID) {
    var baseRecord = this._base.get(dataID);

    var sinkRecord = this._sink.get(dataID);

    if (sinkRecord === undefined) {
      if (baseRecord == null) {
        return baseRecord;
      }

      var nextRecord = RelayModernRecord.clone(baseRecord);

      if (false) {}

      return nextRecord;
    } else if (sinkRecord === null) {
      return null;
    } else if (baseRecord != null) {
      var _nextRecord = RelayModernRecord.update(baseRecord, sinkRecord);

      if (false) {}

      return _nextRecord;
    } else {
      var _nextRecord2 = RelayModernRecord.clone(sinkRecord);

      if (false) {}

      return _nextRecord2;
    }
  };

  _proto._getSinkRecord = function _getSinkRecord(dataID) {
    var sinkRecord = this._sink.get(dataID);

    if (!sinkRecord) {
      var baseRecord = this._base.get(dataID);

      !baseRecord ?  false ? 0 : invariant(false) : void 0;
      sinkRecord = RelayModernRecord.create(dataID, RelayModernRecord.getType(baseRecord));

      this._sink.set(dataID, sinkRecord);
    }

    return sinkRecord;
  };

  _proto.copyFields = function copyFields(sourceID, sinkID) {
    var sinkSource = this._sink.get(sourceID);

    var baseSource = this._base.get(sourceID);

    !(sinkSource || baseSource) ?  false ? 0 : invariant(false) : void 0;

    var sink = this._getSinkRecord(sinkID);

    if (baseSource) {
      RelayModernRecord.copyFields(baseSource, sink);
    }

    if (sinkSource) {
      RelayModernRecord.copyFields(sinkSource, sink);
    }
  };

  _proto.copyFieldsFromRecord = function copyFieldsFromRecord(record, sinkID) {
    var sink = this._getSinkRecord(sinkID);

    RelayModernRecord.copyFields(record, sink);
  };

  _proto.create = function create(dataID, typeName) {
    !(this._base.getStatus(dataID) !== EXISTENT && this._sink.getStatus(dataID) !== EXISTENT) ?  false ? 0 : invariant(false) : void 0;
    var record = RelayModernRecord.create(dataID, typeName);

    this._sink.set(dataID, record);
  };

  _proto["delete"] = function _delete(dataID) {
    this._sink["delete"](dataID);
  };

  _proto.getStatus = function getStatus(dataID) {
    return this._sink.has(dataID) ? this._sink.getStatus(dataID) : this._base.getStatus(dataID);
  };

  _proto.getType = function getType(dataID) {
    for (var ii = 0; ii < this.__sources.length; ii++) {
      var record = this.__sources[ii].get(dataID);

      if (record) {
        return RelayModernRecord.getType(record);
      } else if (record === null) {
        return null;
      }
    }
  };

  _proto.getValue = function getValue(dataID, storageKey) {
    for (var ii = 0; ii < this.__sources.length; ii++) {
      var record = this.__sources[ii].get(dataID);

      if (record) {
        var value = RelayModernRecord.getValue(record, storageKey);

        if (value !== undefined) {
          return value;
        }
      } else if (record === null) {
        return null;
      }
    }
  };

  _proto.setValue = function setValue(dataID, storageKey, value) {
    var sinkRecord = this._getSinkRecord(dataID);

    RelayModernRecord.setValue(sinkRecord, storageKey, value);
  };

  _proto.getLinkedRecordID = function getLinkedRecordID(dataID, storageKey) {
    for (var ii = 0; ii < this.__sources.length; ii++) {
      var record = this.__sources[ii].get(dataID);

      if (record) {
        var linkedID = RelayModernRecord.getLinkedRecordID(record, storageKey);

        if (linkedID !== undefined) {
          return linkedID;
        }
      } else if (record === null) {
        return null;
      }
    }
  };

  _proto.setLinkedRecordID = function setLinkedRecordID(dataID, storageKey, linkedID) {
    var sinkRecord = this._getSinkRecord(dataID);

    RelayModernRecord.setLinkedRecordID(sinkRecord, storageKey, linkedID);
  };

  _proto.getLinkedRecordIDs = function getLinkedRecordIDs(dataID, storageKey) {
    for (var ii = 0; ii < this.__sources.length; ii++) {
      var record = this.__sources[ii].get(dataID);

      if (record) {
        var linkedIDs = RelayModernRecord.getLinkedRecordIDs(record, storageKey);

        if (linkedIDs !== undefined) {
          return linkedIDs;
        }
      } else if (record === null) {
        return null;
      }
    }
  };

  _proto.setLinkedRecordIDs = function setLinkedRecordIDs(dataID, storageKey, linkedIDs) {
    var sinkRecord = this._getSinkRecord(dataID);

    RelayModernRecord.setLinkedRecordIDs(sinkRecord, storageKey, linkedIDs);
  };

  return RelayRecordSourceMutator;
}();

module.exports = RelayRecordSourceMutator;

/***/ }),

/***/ 7397:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var RelayModernRecord = __webpack_require__(2944);

var RelayRecordProxy = __webpack_require__(5510);

var invariant = __webpack_require__(4990);

var _require = __webpack_require__(5113),
    EXISTENT = _require.EXISTENT,
    NONEXISTENT = _require.NONEXISTENT;

var _require2 = __webpack_require__(880),
    ROOT_ID = _require2.ROOT_ID,
    ROOT_TYPE = _require2.ROOT_TYPE;
/**
 * @internal
 *
 * A helper for manipulating a `RecordSource` via an imperative/OO-style API.
 */


var RelayRecordSourceProxy = /*#__PURE__*/function () {
  function RelayRecordSourceProxy(mutator, getDataID, handlerProvider) {
    this.__mutator = mutator;
    this._handlerProvider = handlerProvider || null;
    this._proxies = {};
    this._getDataID = getDataID;
    this._invalidatedStore = false;
    this._idsMarkedForInvalidation = new Set();
  }

  var _proto = RelayRecordSourceProxy.prototype;

  _proto.publishSource = function publishSource(source, fieldPayloads) {
    var _this = this;

    var dataIDs = source.getRecordIDs();
    dataIDs.forEach(function (dataID) {
      var status = source.getStatus(dataID);

      if (status === EXISTENT) {
        var sourceRecord = source.get(dataID);

        if (sourceRecord) {
          if (_this.__mutator.getStatus(dataID) !== EXISTENT) {
            _this.create(dataID, RelayModernRecord.getType(sourceRecord));
          }

          _this.__mutator.copyFieldsFromRecord(sourceRecord, dataID);
        }
      } else if (status === NONEXISTENT) {
        _this["delete"](dataID);
      }
    });

    if (fieldPayloads && fieldPayloads.length) {
      fieldPayloads.forEach(function (fieldPayload) {
        var handler = _this._handlerProvider && _this._handlerProvider(fieldPayload.handle);

        !handler ?  false ? 0 : invariant(false) : void 0;
        handler.update(_this, fieldPayload);
      });
    }
  };

  _proto.create = function create(dataID, typeName) {
    this.__mutator.create(dataID, typeName);

    delete this._proxies[dataID];
    var record = this.get(dataID); // For flow

    !record ?  false ? 0 : invariant(false) : void 0;
    return record;
  };

  _proto["delete"] = function _delete(dataID) {
    !(dataID !== ROOT_ID) ?  false ? 0 : invariant(false) : void 0;
    delete this._proxies[dataID];

    this.__mutator["delete"](dataID);
  };

  _proto.get = function get(dataID) {
    if (!this._proxies.hasOwnProperty(dataID)) {
      var status = this.__mutator.getStatus(dataID);

      if (status === EXISTENT) {
        this._proxies[dataID] = new RelayRecordProxy(this, this.__mutator, dataID);
      } else {
        this._proxies[dataID] = status === NONEXISTENT ? null : undefined;
      }
    }

    return this._proxies[dataID];
  };

  _proto.getRoot = function getRoot() {
    var root = this.get(ROOT_ID);

    if (!root) {
      root = this.create(ROOT_ID, ROOT_TYPE);
    }

    !(root && root.getType() === ROOT_TYPE) ?  false ? 0 : invariant(false) : void 0;
    return root;
  };

  _proto.invalidateStore = function invalidateStore() {
    this._invalidatedStore = true;
  };

  _proto.isStoreMarkedForInvalidation = function isStoreMarkedForInvalidation() {
    return this._invalidatedStore;
  };

  _proto.markIDForInvalidation = function markIDForInvalidation(dataID) {
    this._idsMarkedForInvalidation.add(dataID);
  };

  _proto.getIDsMarkedForInvalidation = function getIDsMarkedForInvalidation() {
    return this._idsMarkedForInvalidation;
  };

  return RelayRecordSourceProxy;
}();

module.exports = RelayRecordSourceProxy;

/***/ }),

/***/ 5120:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var invariant = __webpack_require__(4990);

var _require = __webpack_require__(880),
    getStorageKey = _require.getStorageKey,
    ROOT_TYPE = _require.ROOT_TYPE;
/**
 * @internal
 *
 * A subclass of RecordSourceProxy that provides convenience methods for
 * accessing the root fields of a given query/mutation. These fields accept
 * complex arguments and it can be tedious to re-construct the correct sets of
 * arguments to pass to e.g. `getRoot().getLinkedRecord()`.
 */


var RelayRecordSourceSelectorProxy = /*#__PURE__*/function () {
  function RelayRecordSourceSelectorProxy(mutator, recordSource, readSelector) {
    this.__mutator = mutator;
    this.__recordSource = recordSource;
    this._readSelector = readSelector;
  }

  var _proto = RelayRecordSourceSelectorProxy.prototype;

  _proto.create = function create(dataID, typeName) {
    return this.__recordSource.create(dataID, typeName);
  };

  _proto["delete"] = function _delete(dataID) {
    this.__recordSource["delete"](dataID);
  };

  _proto.get = function get(dataID) {
    return this.__recordSource.get(dataID);
  };

  _proto.getRoot = function getRoot() {
    return this.__recordSource.getRoot();
  };

  _proto.getOperationRoot = function getOperationRoot() {
    var root = this.__recordSource.get(this._readSelector.dataID);

    if (!root) {
      root = this.__recordSource.create(this._readSelector.dataID, ROOT_TYPE);
    }

    return root;
  };

  _proto._getRootField = function _getRootField(selector, fieldName, plural) {
    var field = selector.node.selections.find(function (selection) {
      return selection.kind === 'LinkedField' && selection.name === fieldName;
    });
    !(field && field.kind === 'LinkedField') ?  false ? 0 : invariant(false) : void 0;
    !(field.plural === plural) ?  false ? 0 : invariant(false) : void 0;
    return field;
  };

  _proto.getRootField = function getRootField(fieldName) {
    var field = this._getRootField(this._readSelector, fieldName, false);

    var storageKey = getStorageKey(field, this._readSelector.variables);
    return this.getOperationRoot().getLinkedRecord(storageKey);
  };

  _proto.getPluralRootField = function getPluralRootField(fieldName) {
    var field = this._getRootField(this._readSelector, fieldName, true);

    var storageKey = getStorageKey(field, this._readSelector.variables);
    return this.getOperationRoot().getLinkedRecords(storageKey);
  };

  _proto.invalidateStore = function invalidateStore() {
    this.__recordSource.invalidateStore();
  };

  return RelayRecordSourceSelectorProxy;
}();

module.exports = RelayRecordSourceSelectorProxy;

/***/ }),

/***/ 8628:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var RelayDeclarativeMutationConfig = __webpack_require__(4697);

var invariant = __webpack_require__(4990);

var isRelayModernEnvironment = __webpack_require__(642);

var _require = __webpack_require__(7834),
    getRequest = _require.getRequest;

var _require2 = __webpack_require__(5989),
    createOperationDescriptor = _require2.createOperationDescriptor;
/**
 * Higher-level helper function to execute a mutation against a specific
 * environment.
 */


function applyOptimisticMutation(environment, config) {
  !isRelayModernEnvironment(environment) ?  false ? 0 : invariant(false) : void 0;
  var mutation = getRequest(config.mutation);

  if (mutation.params.operationKind !== 'mutation') {
    throw new Error('commitMutation: Expected mutation operation');
  }

  var optimisticUpdater = config.optimisticUpdater;
  var configs = config.configs,
      optimisticResponse = config.optimisticResponse,
      variables = config.variables;
  var operation = createOperationDescriptor(mutation, variables);

  if (configs) {
    var _RelayDeclarativeMuta = RelayDeclarativeMutationConfig.convert(configs, mutation, optimisticUpdater);

    optimisticUpdater = _RelayDeclarativeMuta.optimisticUpdater;
  }

  return environment.applyMutation({
    operation: operation,
    response: optimisticResponse,
    updater: optimisticUpdater
  });
}

module.exports = applyOptimisticMutation;

/***/ }),

/***/ 6886:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


function commitLocalUpdate(environment, updater) {
  environment.commitUpdate(updater);
}

module.exports = commitLocalUpdate;

/***/ }),

/***/ 3380:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(3749));

var RelayDeclarativeMutationConfig = __webpack_require__(4697);

var invariant = __webpack_require__(4990);

var isRelayModernEnvironment = __webpack_require__(642);

var validateMutation = __webpack_require__(2823);

var warning = __webpack_require__(480);

var _require = __webpack_require__(7834),
    getRequest = _require.getRequest;

var _require2 = __webpack_require__(5057),
    generateUniqueClientID = _require2.generateUniqueClientID;

var _require3 = __webpack_require__(5989),
    createOperationDescriptor = _require3.createOperationDescriptor;
/**
 * Higher-level helper function to execute a mutation against a specific
 * environment.
 */


function commitMutation(environment, config) {
  !isRelayModernEnvironment(environment) ?  false ? 0 : invariant(false) : void 0;
  var mutation = getRequest(config.mutation);

  if (mutation.params.operationKind !== 'mutation') {
    throw new Error('commitMutation: Expected mutation operation');
  }

  if (mutation.kind !== 'Request') {
    throw new Error('commitMutation: Expected mutation to be of type request');
  }

  var optimisticResponse = config.optimisticResponse,
      optimisticUpdater = config.optimisticUpdater,
      updater = config.updater;
  var configs = config.configs,
      cacheConfig = config.cacheConfig,
      onError = config.onError,
      onUnsubscribe = config.onUnsubscribe,
      variables = config.variables,
      uploadables = config.uploadables;
  var operation = createOperationDescriptor(mutation, variables, cacheConfig, generateUniqueClientID()); // TODO: remove this check after we fix flow.

  if (typeof optimisticResponse === 'function') {
    optimisticResponse = optimisticResponse();
     false ? 0 : void 0;
  }

  if (false) {}

  if (configs) {
    var _RelayDeclarativeMuta = RelayDeclarativeMutationConfig.convert(configs, mutation, optimisticUpdater, updater);

    optimisticUpdater = _RelayDeclarativeMuta.optimisticUpdater;
    updater = _RelayDeclarativeMuta.updater;
  }

  var errors = [];
  var subscription = environment.executeMutation({
    operation: operation,
    optimisticResponse: optimisticResponse,
    optimisticUpdater: optimisticUpdater,
    updater: updater,
    uploadables: uploadables
  }).subscribe({
    next: function next(payload) {
      if (Array.isArray(payload)) {
        payload.forEach(function (item) {
          if (item.errors) {
            errors.push.apply(errors, (0, _toConsumableArray2["default"])(item.errors));
          }
        });
      } else {
        if (payload.errors) {
          errors.push.apply(errors, (0, _toConsumableArray2["default"])(payload.errors));
        }
      }
    },
    complete: function complete() {
      var onCompleted = config.onCompleted;

      if (onCompleted) {
        var snapshot = environment.lookup(operation.fragment);
        onCompleted(snapshot.data, errors.length !== 0 ? errors : null);
      }
    },
    error: onError,
    unsubscribe: onUnsubscribe
  });
  return {
    dispose: subscription.unsubscribe
  };
}

module.exports = commitMutation;

/***/ }),

/***/ 2823:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _objectSpread2 = _interopRequireDefault(__webpack_require__(4638));

var warning = __webpack_require__(480);

var hasOwnProperty = Object.prototype.hasOwnProperty;

var _require = __webpack_require__(5742),
    CONDITION = _require.CONDITION,
    CLIENT_COMPONENT = _require.CLIENT_COMPONENT,
    CLIENT_EXTENSION = _require.CLIENT_EXTENSION,
    DEFER = _require.DEFER,
    FLIGHT_FIELD = _require.FLIGHT_FIELD,
    FRAGMENT_SPREAD = _require.FRAGMENT_SPREAD,
    INLINE_FRAGMENT = _require.INLINE_FRAGMENT,
    LINKED_FIELD = _require.LINKED_FIELD,
    LINKED_HANDLE = _require.LINKED_HANDLE,
    MODULE_IMPORT = _require.MODULE_IMPORT,
    SCALAR_FIELD = _require.SCALAR_FIELD,
    SCALAR_HANDLE = _require.SCALAR_HANDLE,
    STREAM = _require.STREAM,
    TYPE_DISCRIMINATOR = _require.TYPE_DISCRIMINATOR;

var validateMutation = function validateMutation() {};

if (false) { var validateOptimisticResponse, validateField, validateModuleImport, validateSelection, validateSelections, addFieldToDiff; }

module.exports = validateMutation;

/***/ }),

/***/ 6001:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var RelayObservable = __webpack_require__(7429);
/**
 * Converts a FetchFunction into an ExecuteFunction for use by RelayNetwork.
 */


function convertFetch(fn) {
  return function fetch(request, variables, cacheConfig, uploadables, logRequestInfo) {
    var result = fn(request, variables, cacheConfig, uploadables, logRequestInfo); // Note: We allow FetchFunction to directly return Error to indicate
    // a failure to fetch. To avoid handling this special case throughout the
    // Relay codebase, it is explicitly handled here.

    if (result instanceof Error) {
      return RelayObservable.create(function (sink) {
        return sink.error(result);
      });
    }

    return RelayObservable.from(result);
  };
}

module.exports = {
  convertFetch: convertFetch
};

/***/ }),

/***/ 7805:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var invariant = __webpack_require__(4990);

var _require = __webpack_require__(6001),
    convertFetch = _require.convertFetch;
/**
 * Creates an implementation of the `Network` interface defined in
 * `RelayNetworkTypes` given `fetch` and `subscribe` functions.
 */


function create(fetchFn, subscribe) {
  // Convert to functions that returns RelayObservable.
  var observeFetch = convertFetch(fetchFn);

  function execute(request, variables, cacheConfig, uploadables, logRequestInfo) {
    if (request.operationKind === 'subscription') {
      !subscribe ?  false ? 0 : invariant(false) : void 0;
      !!uploadables ?  false ? 0 : invariant(false) : void 0;
      return subscribe(request, variables, cacheConfig);
    }

    var pollInterval = cacheConfig.poll;

    if (pollInterval != null) {
      !!uploadables ?  false ? 0 : invariant(false) : void 0;
      return observeFetch(request, variables, {
        force: true
      }).poll(pollInterval);
    }

    return observeFetch(request, variables, cacheConfig, uploadables, logRequestInfo);
  }

  return {
    execute: execute
  };
}

module.exports = {
  create: create
};

/***/ }),

/***/ 7429:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _typeof = __webpack_require__(3634);

var isPromise = __webpack_require__(1496);
/**
 * A Subscription object is returned from .subscribe(), which can be
 * unsubscribed or checked to see if the resulting subscription has closed.
 */


var hostReportError = swallowError;
/**
 * Limited implementation of ESObservable, providing the limited set of behavior
 * Relay networking requires.
 *
 * Observables retain the benefit of callbacks which can be called
 * synchronously, avoiding any UI jitter, while providing a compositional API,
 * which simplifies logic and prevents mishandling of errors compared to
 * the direct use of callback functions.
 *
 * ESObservable: https://github.com/tc39/proposal-observable
 */

var RelayObservable = /*#__PURE__*/function () {
  RelayObservable.create = function create(source) {
    return new RelayObservable(source);
  } // Use RelayObservable.create()
  ;

  function RelayObservable(source) {
    if (false) {}

    this._source = source;
  }
  /**
   * When an emitted error event is not handled by an Observer, it is reported
   * to the host environment (what the ESObservable spec refers to as
   * "HostReportErrors()").
   *
   * The default implementation in development rethrows thrown errors, and
   * logs emitted error events to the console, while in production does nothing
   * (swallowing unhandled errors).
   *
   * Called during application initialization, this method allows
   * application-specific handling of unhandled errors. Allowing, for example,
   * integration with error logging or developer tools.
   *
   * A second parameter `isUncaughtThrownError` is true when the unhandled error
   * was thrown within an Observer handler, and false when the unhandled error
   * was an unhandled emitted event.
   *
   *  - Uncaught thrown errors typically represent avoidable errors thrown from
   *    application code, which should be handled with a try/catch block, and
   *    usually have useful stack traces.
   *
   *  - Unhandled emitted event errors typically represent unavoidable events in
   *    application flow such as network failure, and may not have useful
   *    stack traces.
   */


  RelayObservable.onUnhandledError = function onUnhandledError(callback) {
    hostReportError = callback;
  }
  /**
   * Accepts various kinds of data sources, and always returns a RelayObservable
   * useful for accepting the result of a user-provided FetchFunction.
   */
  ;

  RelayObservable.from = function from(obj) {
    return isObservable(obj) ? fromObservable(obj) : isPromise(obj) ? fromPromise(obj) : fromValue(obj);
  }
  /**
   * Similar to promise.catch(), observable.catch() handles error events, and
   * provides an alternative observable to use in it's place.
   *
   * If the catch handler throws a new error, it will appear as an error event
   * on the resulting Observable.
   */
  ;

  var _proto = RelayObservable.prototype;

  _proto["catch"] = function _catch(fn) {
    var _this = this;

    return RelayObservable.create(function (sink) {
      var subscription;

      _this.subscribe({
        start: function start(sub) {
          subscription = sub;
        },
        next: sink.next,
        complete: sink.complete,
        error: function error(_error2) {
          try {
            fn(_error2).subscribe({
              start: function start(sub) {
                subscription = sub;
              },
              next: sink.next,
              complete: sink.complete,
              error: sink.error
            });
          } catch (error2) {
            sink.error(error2, true
            /* isUncaughtThrownError */
            );
          }
        }
      });

      return function () {
        return subscription.unsubscribe();
      };
    });
  }
  /**
   * Returns a new Observable which first yields values from this Observable,
   * then yields values from the next Observable. This is useful for chaining
   * together Observables of finite length.
   */
  ;

  _proto.concat = function concat(next) {
    var _this2 = this;

    return RelayObservable.create(function (sink) {
      var current;

      _this2.subscribe({
        start: function start(subscription) {
          current = subscription;
        },
        next: sink.next,
        error: sink.error,
        complete: function complete() {
          current = next.subscribe(sink);
        }
      });

      return function () {
        current && current.unsubscribe();
      };
    });
  }
  /**
   * Returns a new Observable which returns the same values as this one, but
   * modified so that the provided Observer is called to perform a side-effects
   * for all events emitted by the source.
   *
   * Any errors that are thrown in the side-effect Observer are unhandled, and
   * do not affect the source Observable or its Observer.
   *
   * This is useful for when debugging your Observables or performing other
   * side-effects such as logging or performance monitoring.
   */
  ;

  _proto["do"] = function _do(observer) {
    var _this3 = this;

    return RelayObservable.create(function (sink) {
      var both = function both(action) {
        return function () {
          try {
            observer[action] && observer[action].apply(observer, arguments);
          } catch (error) {
            hostReportError(error, true
            /* isUncaughtThrownError */
            );
          }

          sink[action] && sink[action].apply(sink, arguments);
        };
      };

      return _this3.subscribe({
        start: both('start'),
        next: both('next'),
        error: both('error'),
        complete: both('complete'),
        unsubscribe: both('unsubscribe')
      });
    });
  }
  /**
   * Returns a new Observable which returns the same values as this one, but
   * modified so that the finally callback is performed after completion,
   * whether normal or due to error or unsubscription.
   *
   * This is useful for cleanup such as resource finalization.
   */
  ;

  _proto["finally"] = function _finally(fn) {
    var _this4 = this;

    return RelayObservable.create(function (sink) {
      var subscription = _this4.subscribe(sink);

      return function () {
        subscription.unsubscribe();
        fn();
      };
    });
  }
  /**
   * Returns a new Observable which is identical to this one, unless this
   * Observable completes before yielding any values, in which case the new
   * Observable will yield the values from the alternate Observable.
   *
   * If this Observable does yield values, the alternate is never subscribed to.
   *
   * This is useful for scenarios where values may come from multiple sources
   * which should be tried in order, i.e. from a cache before a network.
   */
  ;

  _proto.ifEmpty = function ifEmpty(alternate) {
    var _this5 = this;

    return RelayObservable.create(function (sink) {
      var hasValue = false;

      var current = _this5.subscribe({
        next: function next(value) {
          hasValue = true;
          sink.next(value);
        },
        error: sink.error,
        complete: function complete() {
          if (hasValue) {
            sink.complete();
          } else {
            current = alternate.subscribe(sink);
          }
        }
      });

      return function () {
        current.unsubscribe();
      };
    });
  }
  /**
   * Observable's primary API: returns an unsubscribable Subscription to the
   * source of this Observable.
   *
   * Note: A sink may be passed directly to .subscribe() as its observer,
   * allowing for easily composing Observables.
   */
  ;

  _proto.subscribe = function subscribe(observer) {
    if (false) {}

    return _subscribe(this._source, observer);
  }
  /**
   * Returns a new Observerable where each value has been transformed by
   * the mapping function.
   */
  ;

  _proto.map = function map(fn) {
    var _this6 = this;

    return RelayObservable.create(function (sink) {
      var subscription = _this6.subscribe({
        complete: sink.complete,
        error: sink.error,
        next: function next(value) {
          try {
            var mapValue = fn(value);
            sink.next(mapValue);
          } catch (error) {
            sink.error(error, true
            /* isUncaughtThrownError */
            );
          }
        }
      });

      return function () {
        subscription.unsubscribe();
      };
    });
  }
  /**
   * Returns a new Observable where each value is replaced with a new Observable
   * by the mapping function, the results of which returned as a single
   * merged Observable.
   */
  ;

  _proto.mergeMap = function mergeMap(fn) {
    var _this7 = this;

    return RelayObservable.create(function (sink) {
      var subscriptions = [];

      function start(subscription) {
        this._sub = subscription;
        subscriptions.push(subscription);
      }

      function complete() {
        subscriptions.splice(subscriptions.indexOf(this._sub), 1);

        if (subscriptions.length === 0) {
          sink.complete();
        }
      }

      _this7.subscribe({
        start: start,
        next: function next(value) {
          try {
            if (!sink.closed) {
              RelayObservable.from(fn(value)).subscribe({
                start: start,
                next: sink.next,
                error: sink.error,
                complete: complete
              });
            }
          } catch (error) {
            sink.error(error, true
            /* isUncaughtThrownError */
            );
          }
        },
        error: sink.error,
        complete: complete
      });

      return function () {
        subscriptions.forEach(function (sub) {
          return sub.unsubscribe();
        });
        subscriptions.length = 0;
      };
    });
  }
  /**
   * Returns a new Observable which first mirrors this Observable, then when it
   * completes, waits for `pollInterval` milliseconds before re-subscribing to
   * this Observable again, looping in this manner until unsubscribed.
   *
   * The returned Observable never completes.
   */
  ;

  _proto.poll = function poll(pollInterval) {
    var _this8 = this;

    if (false) {}

    return RelayObservable.create(function (sink) {
      var subscription;
      var timeout;

      var poll = function poll() {
        subscription = _this8.subscribe({
          next: sink.next,
          error: sink.error,
          complete: function complete() {
            timeout = setTimeout(poll, pollInterval);
          }
        });
      };

      poll();
      return function () {
        clearTimeout(timeout);
        subscription.unsubscribe();
      };
    });
  }
  /**
   * Returns a Promise which resolves when this Observable yields a first value
   * or when it completes with no value.
   *
   * NOTE: The source Observable is *NOT* canceled when the returned Promise
   * resolves. The Observable is always run to completion.
   */
  ;

  _proto.toPromise = function toPromise() {
    var _this9 = this;

    return new Promise(function (resolve, reject) {
      var resolved = false;

      _this9.subscribe({
        next: function next(val) {
          if (!resolved) {
            resolved = true;
            resolve(val);
          }
        },
        error: reject,
        complete: resolve
      });
    });
  };

  return RelayObservable;
}(); // Use declarations to teach Flow how to check isObservable.


function isObservable(obj) {
  return _typeof(obj) === 'object' && obj !== null && typeof obj.subscribe === 'function';
}

function fromObservable(obj) {
  return obj instanceof RelayObservable ? obj : RelayObservable.create(function (sink) {
    return obj.subscribe(sink);
  });
}

function fromPromise(promise) {
  return RelayObservable.create(function (sink) {
    // Since sink methods do not throw, the resulting Promise can be ignored.
    promise.then(function (value) {
      sink.next(value);
      sink.complete();
    }, sink.error);
  });
}

function fromValue(value) {
  return RelayObservable.create(function (sink) {
    sink.next(value);
    sink.complete();
  });
}

function _subscribe(source, observer) {
  var closed = false;
  var cleanup; // Ideally we would simply describe a `get closed()` method on the Sink and
  // Subscription objects below, however not all flow environments we expect
  // Relay to be used within will support property getters, and many minifier
  // tools still do not support ES5 syntax. Instead, we can use defineProperty.

  var withClosed = function withClosed(obj) {
    return Object.defineProperty(obj, 'closed', {
      get: function get() {
        return closed;
      }
    });
  };

  function doCleanup() {
    if (cleanup) {
      if (cleanup.unsubscribe) {
        cleanup.unsubscribe();
      } else {
        try {
          cleanup();
        } catch (error) {
          hostReportError(error, true
          /* isUncaughtThrownError */
          );
        }
      }

      cleanup = undefined;
    }
  } // Create a Subscription.


  var subscription = withClosed({
    unsubscribe: function unsubscribe() {
      if (!closed) {
        closed = true; // Tell Observer that unsubscribe was called.

        try {
          observer.unsubscribe && observer.unsubscribe(subscription);
        } catch (error) {
          hostReportError(error, true
          /* isUncaughtThrownError */
          );
        } finally {
          doCleanup();
        }
      }
    }
  }); // Tell Observer that observation is about to begin.

  try {
    observer.start && observer.start(subscription);
  } catch (error) {
    hostReportError(error, true
    /* isUncaughtThrownError */
    );
  } // If closed already, don't bother creating a Sink.


  if (closed) {
    return subscription;
  } // Create a Sink respecting subscription state and cleanup.


  var sink = withClosed({
    next: function next(value) {
      if (!closed && observer.next) {
        try {
          observer.next(value);
        } catch (error) {
          hostReportError(error, true
          /* isUncaughtThrownError */
          );
        }
      }
    },
    error: function error(_error3, isUncaughtThrownError) {
      if (closed || !observer.error) {
        closed = true;
        hostReportError(_error3, isUncaughtThrownError || false);
        doCleanup();
      } else {
        closed = true;

        try {
          observer.error(_error3);
        } catch (error2) {
          hostReportError(error2, true
          /* isUncaughtThrownError */
          );
        } finally {
          doCleanup();
        }
      }
    },
    complete: function complete() {
      if (!closed) {
        closed = true;

        try {
          observer.complete && observer.complete();
        } catch (error) {
          hostReportError(error, true
          /* isUncaughtThrownError */
          );
        } finally {
          doCleanup();
        }
      }
    }
  }); // If anything goes wrong during observing the source, handle the error.

  try {
    cleanup = source(sink);
  } catch (error) {
    sink.error(error, true
    /* isUncaughtThrownError */
    );
  }

  if (false) {} // If closed before the source function existed, cleanup now.


  if (closed) {
    doCleanup();
  }

  return subscription;
}

function swallowError(_error, _isUncaughtThrownError) {// do nothing.
}

if (false) {}

module.exports = RelayObservable;

/***/ }),

/***/ 9449:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _objectSpread2 = _interopRequireDefault(__webpack_require__(4638));

var invariant = __webpack_require__(4990);

var stableCopy = __webpack_require__(4701);
/**
 * A cache for storing query responses, featuring:
 * - `get` with TTL
 * - cache size limiting, with least-recently *updated* entries purged first
 */


var RelayQueryResponseCache = /*#__PURE__*/function () {
  function RelayQueryResponseCache(_ref) {
    var size = _ref.size,
        ttl = _ref.ttl;
    !(size > 0) ?  false ? 0 : invariant(false) : void 0;
    !(ttl > 0) ?  false ? 0 : invariant(false) : void 0;
    this._responses = new Map();
    this._size = size;
    this._ttl = ttl;
  }

  var _proto = RelayQueryResponseCache.prototype;

  _proto.clear = function clear() {
    this._responses.clear();
  };

  _proto.get = function get(queryID, variables) {
    var _this = this;

    var cacheKey = getCacheKey(queryID, variables);

    this._responses.forEach(function (response, key) {
      if (!isCurrent(response.fetchTime, _this._ttl)) {
        _this._responses["delete"](key);
      }
    });

    var response = this._responses.get(cacheKey);

    return response != null ? // $FlowFixMe[speculation-ambiguous]
    (0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, response.payload), {}, {
      extensions: (0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, response.payload.extensions), {}, {
        cacheTimestamp: response.fetchTime
      })
    }) : null;
  };

  _proto.set = function set(queryID, variables, payload) {
    var fetchTime = Date.now();
    var cacheKey = getCacheKey(queryID, variables);

    this._responses["delete"](cacheKey); // deletion resets key ordering


    this._responses.set(cacheKey, {
      fetchTime: fetchTime,
      payload: payload
    }); // Purge least-recently updated key when max size reached


    if (this._responses.size > this._size) {
      var firstKey = this._responses.keys().next();

      if (!firstKey.done) {
        this._responses["delete"](firstKey.value);
      }
    }
  };

  return RelayQueryResponseCache;
}();

function getCacheKey(queryID, variables) {
  return JSON.stringify(stableCopy({
    queryID: queryID,
    variables: variables
  }));
}
/**
 * Determine whether a response fetched at `fetchTime` is still valid given
 * some `ttl`.
 */


function isCurrent(fetchTime, ttl) {
  return fetchTime + ttl >= Date.now();
}

module.exports = RelayQueryResponseCache;

/***/ }),

/***/ 7834:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _typeof = __webpack_require__(3634);

var RelayConcreteNode = __webpack_require__(5742);

var invariant = __webpack_require__(4990);

var warning = __webpack_require__(480);
/**
 * Runtime function to correspond to the `graphql` tagged template function.
 * All calls to this function should be transformed by the plugin.
 */


function graphql(strings) {
   true ?  false ? 0 : invariant(false) : 0;
}

function getNode(taggedNode) {
  var node = taggedNode;

  if (typeof node === 'function') {
    node = node();
     false ? 0 : void 0;
  } else if (node["default"]) {
    // Support for languages that work (best) with ES6 modules, such as TypeScript.
    node = node["default"];
  }

  return node;
}

function isFragment(node) {
  var fragment = getNode(node);
  return _typeof(fragment) === 'object' && fragment !== null && fragment.kind === RelayConcreteNode.FRAGMENT;
}

function isRequest(node) {
  var request = getNode(node);
  return _typeof(request) === 'object' && request !== null && request.kind === RelayConcreteNode.REQUEST;
}

function isInlineDataFragment(node) {
  var fragment = getNode(node);
  return _typeof(fragment) === 'object' && fragment !== null && fragment.kind === RelayConcreteNode.INLINE_DATA_FRAGMENT;
}

function getFragment(taggedNode) {
  var fragment = getNode(taggedNode);
  !isFragment(fragment) ?  false ? 0 : invariant(false) : void 0;
  return fragment;
}

function getPaginationFragment(taggedNode) {
  var _fragment$metadata;

  var fragment = getFragment(taggedNode);
  var refetch = (_fragment$metadata = fragment.metadata) === null || _fragment$metadata === void 0 ? void 0 : _fragment$metadata.refetch;
  var connection = refetch === null || refetch === void 0 ? void 0 : refetch.connection;

  if (refetch === null || _typeof(refetch) !== 'object' || connection === null || _typeof(connection) !== 'object') {
    return null;
  }

  return fragment;
}

function getRefetchableFragment(taggedNode) {
  var _fragment$metadata2;

  var fragment = getFragment(taggedNode);
  var refetch = (_fragment$metadata2 = fragment.metadata) === null || _fragment$metadata2 === void 0 ? void 0 : _fragment$metadata2.refetch;

  if (refetch === null || _typeof(refetch) !== 'object') {
    return null;
  }

  return fragment;
}

function getRequest(taggedNode) {
  var request = getNode(taggedNode);
  !isRequest(request) ?  false ? 0 : invariant(false) : void 0;
  return request;
}

function getInlineDataFragment(taggedNode) {
  var fragment = getNode(taggedNode);
  !isInlineDataFragment(fragment) ?  false ? 0 : invariant(false) : void 0;
  return fragment;
}

module.exports = {
  getFragment: getFragment,
  getNode: getNode,
  getPaginationFragment: getPaginationFragment,
  getRefetchableFragment: getRefetchableFragment,
  getRequest: getRequest,
  getInlineDataFragment: getInlineDataFragment,
  graphql: graphql,
  isFragment: isFragment,
  isRequest: isRequest,
  isInlineDataFragment: isInlineDataFragment
};

/***/ }),

/***/ 1181:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */


var PreloadableQueryRegistry = /*#__PURE__*/function () {
  function PreloadableQueryRegistry() {
    this._preloadableQueries = new Map();
    this._callbacks = new Map();
  }

  var _proto = PreloadableQueryRegistry.prototype;

  _proto.set = function set(key, value) {
    this._preloadableQueries.set(key, value);

    var callbacks = this._callbacks.get(key);

    if (callbacks != null) {
      callbacks.forEach(function (cb) {
        try {
          cb(value);
        } catch (e) {
          // We do *not* want to throw in this tick, as this callback is executed
          // while a query is required for the very first time.
          setTimeout(function () {
            throw e;
          }, 0);
        }
      });
    }
  };

  _proto.get = function get(key) {
    return this._preloadableQueries.get(key);
  };

  _proto.onLoad = function onLoad(key, callback) {
    var _this$_callbacks$get;

    var callbacks = (_this$_callbacks$get = this._callbacks.get(key)) !== null && _this$_callbacks$get !== void 0 ? _this$_callbacks$get : new Set();
    callbacks.add(callback);

    var dispose = function dispose() {
      callbacks["delete"](callback);
    };

    this._callbacks.set(key, callbacks);

    return {
      dispose: dispose
    };
  };

  _proto.clear = function clear() {
    this._preloadableQueries.clear();
  };

  return PreloadableQueryRegistry;
}();

var preloadableQueryRegistry = new PreloadableQueryRegistry();
module.exports = preloadableQueryRegistry;

/***/ }),

/***/ 1800:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _objectSpread2 = _interopRequireDefault(__webpack_require__(4638));

var RelayObservable = __webpack_require__(7429);

var fetchQueryInternal = __webpack_require__(8708);

var invariant = __webpack_require__(4990);

var reportMissingRequiredFields = __webpack_require__(2111);

var _require = __webpack_require__(5989),
    createOperationDescriptor = _require.createOperationDescriptor;

var _require2 = __webpack_require__(7834),
    getRequest = _require2.getRequest;
/**
 * Fetches the given query and variables on the provided environment,
 * and de-dupes identical in-flight requests.
 *
 * Observing a request:
 * ====================
 * fetchQuery returns an Observable which you can call .subscribe()
 * on. Subscribe optionally takes an Observer, which you can provide to
 * observe network events:
 *
 * ```
 * fetchQuery(environment, query, variables).subscribe({
 *   // Called when network requests starts
 *   start: (subsctiption) => {},
 *
 *   // Called after a payload is received and written to the local store
 *   next: (payload) => {},
 *
 *   // Called when network requests errors
 *   error: (error) => {},
 *
 *   // Called when network requests fully completes
 *   complete: () => {},
 *
 *   // Called when network request is unsubscribed
 *   unsubscribe: (subscription) => {},
 * });
 * ```
 *
 * Request Promise:
 * ================
 * The obervable can be converted to a Promise with .toPromise(), which will
 * resolve to a snapshot of the query data when the first response is received
 * from the server.
 *
 * ```
 * fetchQuery(environment, query, variables).toPromise().then((data) => {
 *   // ...
 * });
 * ```
 *
 * In-flight request de-duping:
 * ============================
 * By default, calling fetchQuery multiple times with the same
 * environment, query and variables will not initiate a new request if a request
 * for those same parameters is already in flight.
 *
 * A request is marked in-flight from the moment it starts until the moment it
 * fully completes, regardless of error or successful completion.
 *
 * NOTE: If the request completes _synchronously_, calling fetchQuery
 * a second time with the same arguments in the same tick will _NOT_ de-dupe
 * the request given that it will no longer be in-flight.
 *
 *
 * Data Retention:
 * ===============
 * This function will NOT retain query data, meaning that it is not guaranteed
 * that the fetched data will remain in the Relay store after the request has
 * completed.
 * If you need to retain the query data outside of the network request,
 * you need to use `environment.retain()`.
 *
 *
 * Cancelling requests:
 * ====================
 * If the disposable returned by subscribe is called while the
 * request is in-flight, the request will be cancelled.
 *
 * ```
 * const disposable = fetchQuery(...).subscribe(...);
 *
 * // This will cancel the request if it is in-flight.
 * disposable.dispose();
 * ```
 * NOTE: When using .toPromise(), the request cannot be cancelled.
 */


function fetchQuery(environment, query, variables, options) {
  var _options$fetchPolicy;

  var queryNode = getRequest(query);
  !(queryNode.params.operationKind === 'query') ?  false ? 0 : invariant(false) : void 0;
  var networkCacheConfig = (0, _objectSpread2["default"])({
    force: true
  }, options === null || options === void 0 ? void 0 : options.networkCacheConfig);
  var operation = createOperationDescriptor(queryNode, variables, networkCacheConfig);
  var fetchPolicy = (_options$fetchPolicy = options === null || options === void 0 ? void 0 : options.fetchPolicy) !== null && _options$fetchPolicy !== void 0 ? _options$fetchPolicy : 'network-only';

  function readData(snapshot) {
    if (snapshot.missingRequiredFields != null) {
      reportMissingRequiredFields(environment, snapshot.missingRequiredFields);
    }

    return snapshot.data;
  }

  switch (fetchPolicy) {
    case 'network-only':
      {
        return getNetworkObservable(environment, operation).map(readData);
      }

    case 'store-or-network':
      {
        if (environment.check(operation).status === 'available') {
          return RelayObservable.from(environment.lookup(operation.fragment)).map(readData);
        }

        return getNetworkObservable(environment, operation).map(readData);
      }

    default:
      fetchPolicy;
      throw new Error('fetchQuery: Invalid fetchPolicy ' + fetchPolicy);
  }
}

function getNetworkObservable(environment, operation) {
  return fetchQueryInternal.fetchQuery(environment, operation).map(function () {
    return environment.lookup(operation.fragment);
  });
}

module.exports = fetchQuery;

/***/ }),

/***/ 8708:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var Observable = __webpack_require__(7429);

var RelayReplaySubject = __webpack_require__(1808);

var invariant = __webpack_require__(4990);

var WEAKMAP_SUPPORTED = typeof WeakMap === 'function';
var requestCachesByEnvironment = WEAKMAP_SUPPORTED ? new WeakMap() : new Map();
/**
 * Fetches the given query and variables on the provided environment,
 * and de-dupes identical in-flight requests.
 *
 * Observing a request:
 * ====================
 * fetchQuery returns an Observable which you can call .subscribe()
 * on. subscribe() takes an Observer, which you can provide to
 * observe network events:
 *
 * ```
 * fetchQuery(environment, query, variables).subscribe({
 *   // Called when network requests starts
 *   start: (subscription) => {},
 *
 *   // Called after a payload is received and written to the local store
 *   next: (payload) => {},
 *
 *   // Called when network requests errors
 *   error: (error) => {},
 *
 *   // Called when network requests fully completes
 *   complete: () => {},
 *
 *   // Called when network request is unsubscribed
 *   unsubscribe: (subscription) => {},
 * });
 * ```
 *
 * In-flight request de-duping:
 * ============================
 * By default, calling fetchQuery multiple times with the same
 * environment, query and variables will not initiate a new request if a request
 * for those same parameters is already in flight.
 *
 * A request is marked in-flight from the moment it starts until the moment it
 * fully completes, regardless of error or successful completion.
 *
 * NOTE: If the request completes _synchronously_, calling fetchQuery
 * a second time with the same arguments in the same tick will _NOT_ de-dupe
 * the request given that it will no longer be in-flight.
 *
 *
 * Data Retention:
 * ===============
 * This function will not retain any query data outside the scope of the
 * request, which means it is not guaranteed that it won't be garbage
 * collected after the request completes.
 * If you need to retain data, you can do so manually with environment.retain().
 *
 * Cancelling requests:
 * ====================
 * If the subscription returned by subscribe is called while the
 * request is in-flight, the request will be cancelled.
 *
 * ```
 * const subscription = fetchQuery(...).subscribe(...);
 *
 * // This will cancel the request if it is in-flight.
 * subscription.unsubscribe();
 * ```
 */

function fetchQuery(environment, operation) {
  return fetchQueryDeduped(environment, operation.request.identifier, function () {
    return environment.execute({
      operation: operation
    });
  });
}
/**
 * Low-level implementation details of `fetchQuery`.
 *
 * `fetchQueryDeduped` can also be used to share a single cache for
 * requests that aren't using `fetchQuery` directly (e.g. because they don't
 * have an `OperationDescriptor` when they are called).
 */


function fetchQueryDeduped(environment, identifier, fetchFn) {
  return Observable.create(function (sink) {
    var requestCache = getRequestCache(environment);
    var cachedRequest = requestCache.get(identifier);

    if (!cachedRequest) {
      fetchFn()["finally"](function () {
        return requestCache["delete"](identifier);
      }).subscribe({
        start: function start(subscription) {
          cachedRequest = {
            identifier: identifier,
            subject: new RelayReplaySubject(),
            subjectForInFlightStatus: new RelayReplaySubject(),
            subscription: subscription
          };
          requestCache.set(identifier, cachedRequest);
        },
        next: function next(response) {
          var cachedReq = getCachedRequest(requestCache, identifier);
          cachedReq.subject.next(response);
          cachedReq.subjectForInFlightStatus.next(response);
        },
        error: function error(_error) {
          var cachedReq = getCachedRequest(requestCache, identifier);
          cachedReq.subject.error(_error);
          cachedReq.subjectForInFlightStatus.error(_error);
        },
        complete: function complete() {
          var cachedReq = getCachedRequest(requestCache, identifier);
          cachedReq.subject.complete();
          cachedReq.subjectForInFlightStatus.complete();
        },
        unsubscribe: function unsubscribe(subscription) {
          var cachedReq = getCachedRequest(requestCache, identifier);
          cachedReq.subject.unsubscribe();
          cachedReq.subjectForInFlightStatus.unsubscribe();
        }
      });
    }

    !(cachedRequest != null) ?  false ? 0 : invariant(false) : void 0;
    return getObservableForCachedRequest(requestCache, cachedRequest).subscribe(sink);
  });
}
/**
 * @private
 */


function getObservableForCachedRequest(requestCache, cachedRequest) {
  return Observable.create(function (sink) {
    var subscription = cachedRequest.subject.subscribe(sink);
    return function () {
      subscription.unsubscribe();
      var cachedRequestInstance = requestCache.get(cachedRequest.identifier);

      if (cachedRequestInstance) {
        var requestSubscription = cachedRequestInstance.subscription;

        if (requestSubscription != null && cachedRequestInstance.subject.getObserverCount() === 0) {
          requestSubscription.unsubscribe();
          requestCache["delete"](cachedRequest.identifier);
        }
      }
    };
  });
}
/**
 * @private
 */


function getActiveStatusObservableForCachedRequest(environment, requestCache, cachedRequest) {
  return Observable.create(function (sink) {
    var subscription = cachedRequest.subjectForInFlightStatus.subscribe({
      error: sink.error,
      next: function next(response) {
        if (!environment.isRequestActive(cachedRequest.identifier)) {
          sink.complete();
          return;
        }

        sink.next();
      },
      complete: sink.complete,
      unsubscribe: sink.complete
    });
    return function () {
      subscription.unsubscribe();
    };
  });
}
/**
 * If a request is active for the given query, variables and environment,
 * this function will return a Promise that will resolve when that request
 * stops being active (receives a final payload), and the data has been saved
 * to the store.
 * If no request is active, null will be returned
 */


function getPromiseForActiveRequest(environment, request) {
  var requestCache = getRequestCache(environment);
  var cachedRequest = requestCache.get(request.identifier);

  if (!cachedRequest) {
    return null;
  }

  if (!environment.isRequestActive(cachedRequest.identifier)) {
    return null;
  }

  return new Promise(function (resolve, reject) {
    var resolveOnNext = false;
    getActiveStatusObservableForCachedRequest(environment, requestCache, cachedRequest).subscribe({
      complete: resolve,
      error: reject,
      next: function next(response) {
        /*
         * The underlying `RelayReplaySubject` will synchronously replay events
         * as soon as we subscribe, but since we want the *next* asynchronous
         * one, we'll ignore them until the replay finishes.
         */
        if (resolveOnNext) {
          resolve(response);
        }
      }
    });
    resolveOnNext = true;
  });
}
/**
 * If there is a pending request for the given query, returns an Observable of
 * *all* its responses. Existing responses are published synchronously and
 * subsequent responses are published asynchronously. Returns null if there is
 * no pending request. This is similar to fetchQuery() except that it will not
 * issue a fetch if there isn't already one pending.
 */


function getObservableForActiveRequest(environment, request) {
  var requestCache = getRequestCache(environment);
  var cachedRequest = requestCache.get(request.identifier);

  if (!cachedRequest) {
    return null;
  }

  if (!environment.isRequestActive(cachedRequest.identifier)) {
    return null;
  }

  return getActiveStatusObservableForCachedRequest(environment, requestCache, cachedRequest);
}
/**
 * @private
 */


function getRequestCache(environment) {
  var cached = requestCachesByEnvironment.get(environment);

  if (cached != null) {
    return cached;
  }

  var requestCache = new Map();
  requestCachesByEnvironment.set(environment, requestCache);
  return requestCache;
}
/**
 * @private
 */


function getCachedRequest(requestCache, identifier) {
  var cached = requestCache.get(identifier);
  !(cached != null) ?  false ? 0 : invariant(false) : void 0;
  return cached;
}

module.exports = {
  fetchQuery: fetchQuery,
  fetchQueryDeduped: fetchQueryDeduped,
  getPromiseForActiveRequest: getPromiseForActiveRequest,
  getObservableForActiveRequest: getObservableForActiveRequest
};

/***/ }),

/***/ 7585:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _require = __webpack_require__(5989),
    createOperationDescriptor = _require.createOperationDescriptor;

var _require2 = __webpack_require__(7834),
    getRequest = _require2.getRequest;
/**
 * A helper function to fetch the results of a query. Note that results for
 * fragment spreads are masked: fields must be explicitly listed in the query in
 * order to be accessible in the result object.
 */


function fetchQuery_DEPRECATED(environment, taggedNode, variables, cacheConfig) {
  var query = getRequest(taggedNode);

  if (query.params.operationKind !== 'query') {
    throw new Error('fetchQuery: Expected query operation');
  }

  var operation = createOperationDescriptor(query, variables, cacheConfig);
  return environment.execute({
    operation: operation
  }).map(function () {
    return environment.lookup(operation.fragment).data;
  }).toPromise();
}

module.exports = fetchQuery_DEPRECATED;

/***/ }),

/***/ 5057:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var PREFIX = 'client:';

function generateClientID(id, storageKey, index) {
  var key = id + ':' + storageKey;

  if (index != null) {
    key += ':' + index;
  }

  if (key.indexOf(PREFIX) !== 0) {
    key = PREFIX + key;
  }

  return key;
}

function isClientID(id) {
  return id.indexOf(PREFIX) === 0;
}

var localID = 0;

function generateUniqueClientID() {
  return "".concat(PREFIX, "local:").concat(localID++);
}

module.exports = {
  generateClientID: generateClientID,
  generateUniqueClientID: generateUniqueClientID,
  isClientID: isClientID
};

/***/ }),

/***/ 625:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 * @emails oncall+relay
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _createForOfIteratorHelper2 = _interopRequireDefault(__webpack_require__(8629));

var RelayConcreteNode = __webpack_require__(5742);

var RelayFeatureFlags = __webpack_require__(1054);

var RelayModernRecord = __webpack_require__(2944);

var RelayRecordSourceMutator = __webpack_require__(6569);

var RelayRecordSourceProxy = __webpack_require__(7397);

var RelayStoreReactFlightUtils = __webpack_require__(4108);

var RelayStoreUtils = __webpack_require__(880);

var cloneRelayHandleSourceField = __webpack_require__(5829);

var cloneRelayScalarHandleSourceField = __webpack_require__(2737);

var getOperation = __webpack_require__(4858);

var invariant = __webpack_require__(4990);

var _require = __webpack_require__(5057),
    isClientID = _require.isClientID;

var _require2 = __webpack_require__(5113),
    EXISTENT = _require2.EXISTENT,
    UNKNOWN = _require2.UNKNOWN;

var _require3 = __webpack_require__(6442),
    generateTypeID = _require3.generateTypeID;

var CONDITION = RelayConcreteNode.CONDITION,
    CLIENT_COMPONENT = RelayConcreteNode.CLIENT_COMPONENT,
    CLIENT_EXTENSION = RelayConcreteNode.CLIENT_EXTENSION,
    DEFER = RelayConcreteNode.DEFER,
    FLIGHT_FIELD = RelayConcreteNode.FLIGHT_FIELD,
    FRAGMENT_SPREAD = RelayConcreteNode.FRAGMENT_SPREAD,
    INLINE_FRAGMENT = RelayConcreteNode.INLINE_FRAGMENT,
    LINKED_FIELD = RelayConcreteNode.LINKED_FIELD,
    LINKED_HANDLE = RelayConcreteNode.LINKED_HANDLE,
    MODULE_IMPORT = RelayConcreteNode.MODULE_IMPORT,
    SCALAR_FIELD = RelayConcreteNode.SCALAR_FIELD,
    SCALAR_HANDLE = RelayConcreteNode.SCALAR_HANDLE,
    STREAM = RelayConcreteNode.STREAM,
    TYPE_DISCRIMINATOR = RelayConcreteNode.TYPE_DISCRIMINATOR;
var ROOT_ID = RelayStoreUtils.ROOT_ID,
    getModuleOperationKey = RelayStoreUtils.getModuleOperationKey,
    getStorageKey = RelayStoreUtils.getStorageKey,
    getArgumentValues = RelayStoreUtils.getArgumentValues;
/**
 * Synchronously check whether the records required to fulfill the given
 * `selector` are present in `source`.
 *
 * If a field is missing, it uses the provided handlers to attempt to substitute
 * data. The `target` will store all records that are modified because of a
 * successful substitution.
 *
 * If all records are present, returns `true`, otherwise `false`.
 */

function check(source, target, selector, handlers, operationLoader, getDataID, shouldProcessClientComponents) {
  var dataID = selector.dataID,
      node = selector.node,
      variables = selector.variables;
  var checker = new DataChecker(source, target, variables, handlers, operationLoader, getDataID, shouldProcessClientComponents);
  return checker.check(node, dataID);
}
/**
 * @private
 */


var DataChecker = /*#__PURE__*/function () {
  function DataChecker(source, target, variables, handlers, operationLoader, getDataID, shouldProcessClientComponents) {
    var mutator = new RelayRecordSourceMutator(source, target);
    this._mostRecentlyInvalidatedAt = null;
    this._handlers = handlers;
    this._mutator = mutator;
    this._operationLoader = operationLoader !== null && operationLoader !== void 0 ? operationLoader : null;
    this._recordSourceProxy = new RelayRecordSourceProxy(mutator, getDataID);
    this._recordWasMissing = false;
    this._source = source;
    this._variables = variables;
    this._shouldProcessClientComponents = shouldProcessClientComponents;
  }

  var _proto = DataChecker.prototype;

  _proto.check = function check(node, dataID) {
    this._traverse(node, dataID);

    return this._recordWasMissing === true ? {
      status: 'missing',
      mostRecentlyInvalidatedAt: this._mostRecentlyInvalidatedAt
    } : {
      status: 'available',
      mostRecentlyInvalidatedAt: this._mostRecentlyInvalidatedAt
    };
  };

  _proto._getVariableValue = function _getVariableValue(name) {
    !this._variables.hasOwnProperty(name) ?  false ? 0 : invariant(false) : void 0; // $FlowFixMe[cannot-write]

    return this._variables[name];
  };

  _proto._handleMissing = function _handleMissing() {
    this._recordWasMissing = true;
  };

  _proto._getDataForHandlers = function _getDataForHandlers(field, dataID) {
    return {
      args: field.args ? getArgumentValues(field.args, this._variables) : {},
      // Getting a snapshot of the record state is potentially expensive since
      // we will need to merge the sink and source records. Since we do not create
      // any new records in this process, it is probably reasonable to provide
      // handlers with a copy of the source record.
      // The only thing that the provided record will not contain is fields
      // added by previous handlers.
      record: this._source.get(dataID)
    };
  };

  _proto._handleMissingScalarField = function _handleMissingScalarField(field, dataID) {
    if (field.name === 'id' && field.alias == null && isClientID(dataID)) {
      return undefined;
    }

    var _this$_getDataForHand = this._getDataForHandlers(field, dataID),
        args = _this$_getDataForHand.args,
        record = _this$_getDataForHand.record;

    var _iterator = (0, _createForOfIteratorHelper2["default"])(this._handlers),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var handler = _step.value;

        if (handler.kind === 'scalar') {
          var newValue = handler.handle(field, record, args, this._recordSourceProxy);

          if (newValue !== undefined) {
            return newValue;
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    this._handleMissing();
  };

  _proto._handleMissingLinkField = function _handleMissingLinkField(field, dataID) {
    var _this$_getDataForHand2 = this._getDataForHandlers(field, dataID),
        args = _this$_getDataForHand2.args,
        record = _this$_getDataForHand2.record;

    var _iterator2 = (0, _createForOfIteratorHelper2["default"])(this._handlers),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var handler = _step2.value;

        if (handler.kind === 'linked') {
          var newValue = handler.handle(field, record, args, this._recordSourceProxy);

          if (newValue !== undefined && (newValue === null || this._mutator.getStatus(newValue) === EXISTENT)) {
            return newValue;
          }
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    this._handleMissing();
  };

  _proto._handleMissingPluralLinkField = function _handleMissingPluralLinkField(field, dataID) {
    var _this = this;

    var _this$_getDataForHand3 = this._getDataForHandlers(field, dataID),
        args = _this$_getDataForHand3.args,
        record = _this$_getDataForHand3.record;

    var _iterator3 = (0, _createForOfIteratorHelper2["default"])(this._handlers),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var handler = _step3.value;

        if (handler.kind === 'pluralLinked') {
          var newValue = handler.handle(field, record, args, this._recordSourceProxy);

          if (newValue != null) {
            var allItemsKnown = newValue.every(function (linkedID) {
              return linkedID != null && _this._mutator.getStatus(linkedID) === EXISTENT;
            });

            if (allItemsKnown) {
              return newValue;
            }
          } else if (newValue === null) {
            return null;
          }
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    this._handleMissing();
  };

  _proto._traverse = function _traverse(node, dataID) {
    var status = this._mutator.getStatus(dataID);

    if (status === UNKNOWN) {
      this._handleMissing();
    }

    if (status === EXISTENT) {
      var record = this._source.get(dataID);

      var invalidatedAt = RelayModernRecord.getInvalidationEpoch(record);

      if (invalidatedAt != null) {
        this._mostRecentlyInvalidatedAt = this._mostRecentlyInvalidatedAt != null ? Math.max(this._mostRecentlyInvalidatedAt, invalidatedAt) : invalidatedAt;
      }

      this._traverseSelections(node.selections, dataID);
    }
  };

  _proto._traverseSelections = function _traverseSelections(selections, dataID) {
    var _this2 = this;

    selections.forEach(function (selection) {
      switch (selection.kind) {
        case SCALAR_FIELD:
          _this2._checkScalar(selection, dataID);

          break;

        case LINKED_FIELD:
          if (selection.plural) {
            _this2._checkPluralLink(selection, dataID);
          } else {
            _this2._checkLink(selection, dataID);
          }

          break;

        case CONDITION:
          var conditionValue = _this2._getVariableValue(selection.condition);

          if (conditionValue === selection.passingValue) {
            _this2._traverseSelections(selection.selections, dataID);
          }

          break;

        case INLINE_FRAGMENT:
          {
            var abstractKey = selection.abstractKey;

            if (abstractKey == null) {
              // concrete type refinement: only check data if the type exactly matches
              var typeName = _this2._mutator.getType(dataID);

              if (typeName === selection.type) {
                _this2._traverseSelections(selection.selections, dataID);
              }
            } else if (RelayFeatureFlags.ENABLE_PRECISE_TYPE_REFINEMENT) {
              // Abstract refinement: check data depending on whether the type
              // conforms to the interface/union or not:
              // - Type known to _not_ implement the interface: don't check the selections.
              // - Type is known _to_ implement the interface: check selections.
              // - Unknown whether the type implements the interface: don't check the selections
              //   and treat the data as missing; we do this because the Relay Compiler
              //   guarantees that the type discriminator will always be fetched.
              var recordType = _this2._mutator.getType(dataID);

              !(recordType != null) ?  false ? 0 : invariant(false) : void 0;
              var typeID = generateTypeID(recordType);

              var implementsInterface = _this2._mutator.getValue(typeID, abstractKey);

              if (implementsInterface === true) {
                _this2._traverseSelections(selection.selections, dataID);
              } else if (implementsInterface == null) {
                // unsure if the type implements the interface: data is
                // missing so don't bother reading the fragment
                _this2._handleMissing();
              } // else false: known to not implement the interface

            } else {
              // legacy behavior for abstract refinements: always check even
              // if the type doesn't conform
              _this2._traverseSelections(selection.selections, dataID);
            }

            break;
          }

        case LINKED_HANDLE:
          {
            // Handles have no selections themselves; traverse the original field
            // where the handle was set-up instead.
            var handleField = cloneRelayHandleSourceField(selection, selections, _this2._variables);

            if (handleField.plural) {
              _this2._checkPluralLink(handleField, dataID);
            } else {
              _this2._checkLink(handleField, dataID);
            }

            break;
          }

        case SCALAR_HANDLE:
          {
            var _handleField = cloneRelayScalarHandleSourceField(selection, selections, _this2._variables);

            _this2._checkScalar(_handleField, dataID);

            break;
          }

        case MODULE_IMPORT:
          _this2._checkModuleImport(selection, dataID);

          break;

        case DEFER:
        case STREAM:
          _this2._traverseSelections(selection.selections, dataID);

          break;
        // $FlowFixMe[incompatible-type]

        case FRAGMENT_SPREAD:
          _this2._traverseSelections(selection.fragment.selections, dataID);

          break;

        case CLIENT_EXTENSION:
          var recordWasMissing = _this2._recordWasMissing;

          _this2._traverseSelections(selection.selections, dataID);

          _this2._recordWasMissing = recordWasMissing;
          break;

        case TYPE_DISCRIMINATOR:
          if (RelayFeatureFlags.ENABLE_PRECISE_TYPE_REFINEMENT) {
            var _abstractKey = selection.abstractKey;

            var _recordType = _this2._mutator.getType(dataID);

            !(_recordType != null) ?  false ? 0 : invariant(false) : void 0;

            var _typeID = generateTypeID(_recordType);

            var _implementsInterface = _this2._mutator.getValue(_typeID, _abstractKey);

            if (_implementsInterface == null) {
              // unsure if the type implements the interface: data is
              // missing
              _this2._handleMissing();
            } // else: if it does or doesn't implement, we don't need to check or skip anything else

          }

          break;

        case FLIGHT_FIELD:
          if (RelayFeatureFlags.ENABLE_REACT_FLIGHT_COMPONENT_FIELD) {
            _this2._checkFlightField(selection, dataID);
          } else {
            throw new Error('Flight fields are not yet supported.');
          }

          break;

        case CLIENT_COMPONENT:
          if (_this2._shouldProcessClientComponents === false) {
            break;
          }

          _this2._traverseSelections(selection.fragment.selections, dataID);

          break;

        default:
          selection;
           true ?  false ? 0 : invariant(false) : 0;
      }
    });
  };

  _proto._checkModuleImport = function _checkModuleImport(moduleImport, dataID) {
    var operationLoader = this._operationLoader;
    !(operationLoader !== null) ?  false ? 0 : invariant(false) : void 0;
    var operationKey = getModuleOperationKey(moduleImport.documentName);

    var operationReference = this._mutator.getValue(dataID, operationKey);

    if (operationReference == null) {
      if (operationReference === undefined) {
        this._handleMissing();
      }

      return;
    }

    var normalizationRootNode = operationLoader.get(operationReference);

    if (normalizationRootNode != null) {
      var operation = getOperation(normalizationRootNode);

      this._traverse(operation, dataID);
    } else {
      // If the fragment is not available, we assume that the data cannot have been
      // processed yet and must therefore be missing.
      this._handleMissing();
    }
  };

  _proto._checkScalar = function _checkScalar(field, dataID) {
    var storageKey = getStorageKey(field, this._variables);

    var fieldValue = this._mutator.getValue(dataID, storageKey);

    if (fieldValue === undefined) {
      fieldValue = this._handleMissingScalarField(field, dataID);

      if (fieldValue !== undefined) {
        this._mutator.setValue(dataID, storageKey, fieldValue);
      }
    }
  };

  _proto._checkLink = function _checkLink(field, dataID) {
    var storageKey = getStorageKey(field, this._variables);

    var linkedID = this._mutator.getLinkedRecordID(dataID, storageKey);

    if (linkedID === undefined) {
      linkedID = this._handleMissingLinkField(field, dataID);

      if (linkedID != null) {
        this._mutator.setLinkedRecordID(dataID, storageKey, linkedID);
      } else if (linkedID === null) {
        this._mutator.setValue(dataID, storageKey, null);
      }
    }

    if (linkedID != null) {
      this._traverse(field, linkedID);
    }
  };

  _proto._checkPluralLink = function _checkPluralLink(field, dataID) {
    var _this3 = this;

    var storageKey = getStorageKey(field, this._variables);

    var linkedIDs = this._mutator.getLinkedRecordIDs(dataID, storageKey);

    if (linkedIDs === undefined) {
      linkedIDs = this._handleMissingPluralLinkField(field, dataID);

      if (linkedIDs != null) {
        this._mutator.setLinkedRecordIDs(dataID, storageKey, linkedIDs);
      } else if (linkedIDs === null) {
        this._mutator.setValue(dataID, storageKey, null);
      }
    }

    if (linkedIDs) {
      linkedIDs.forEach(function (linkedID) {
        if (linkedID != null) {
          _this3._traverse(field, linkedID);
        }
      });
    }
  };

  _proto._checkFlightField = function _checkFlightField(field, dataID) {
    var storageKey = getStorageKey(field, this._variables);

    var linkedID = this._mutator.getLinkedRecordID(dataID, storageKey);

    if (linkedID == null) {
      if (linkedID === undefined) {
        this._handleMissing();

        return;
      }

      return;
    }

    var tree = this._mutator.getValue(linkedID, RelayStoreReactFlightUtils.REACT_FLIGHT_TREE_STORAGE_KEY);

    var reachableExecutableDefinitions = this._mutator.getValue(linkedID, RelayStoreReactFlightUtils.REACT_FLIGHT_EXECUTABLE_DEFINITIONS_STORAGE_KEY);

    if (tree == null || !Array.isArray(reachableExecutableDefinitions)) {
      this._handleMissing();

      return;
    }

    var operationLoader = this._operationLoader;
    !(operationLoader !== null) ?  false ? 0 : invariant(false) : void 0; // In Flight, the variables that are in scope for reachable executable
    // definitions aren't the same as what's in scope for the outer query.

    var prevVariables = this._variables; // $FlowFixMe[incompatible-cast]

    var _iterator4 = (0, _createForOfIteratorHelper2["default"])(reachableExecutableDefinitions),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var definition = _step4.value;
        this._variables = definition.variables;
        var normalizationRootNode = operationLoader.get(definition.module);

        if (normalizationRootNode != null) {
          var operation = getOperation(normalizationRootNode);

          this._traverseSelections(operation.selections, ROOT_ID);
        } else {
          // If the fragment is not available, we assume that the data cannot have
          // been processed yet and must therefore be missing.
          this._handleMissing();
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    this._variables = prevVariables;
  };

  return DataChecker;
}();

module.exports = {
  check: check
};

/***/ }),

/***/ 6689:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 * @emails oncall+relay
 */
// flowlint ambiguous-object-type:error


var _typeof = __webpack_require__(3634);

var _interopRequireDefault = __webpack_require__(249);

var _objectSpread2 = _interopRequireDefault(__webpack_require__(4638));

var _createForOfIteratorHelper2 = _interopRequireDefault(__webpack_require__(8629));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(3749));

var RelayError = __webpack_require__(6030);

var RelayFeatureFlags = __webpack_require__(1054);

var RelayModernRecord = __webpack_require__(2944);

var RelayObservable = __webpack_require__(7429);

var RelayRecordSource = __webpack_require__(2642);

var RelayResponseNormalizer = __webpack_require__(894);

var getOperation = __webpack_require__(4858);

var invariant = __webpack_require__(4990);

var stableCopy = __webpack_require__(4701);

var warning = __webpack_require__(480);

var _require = __webpack_require__(5057),
    generateClientID = _require.generateClientID,
    generateUniqueClientID = _require.generateUniqueClientID;

var _require2 = __webpack_require__(9797),
    createNormalizationSelector = _require2.createNormalizationSelector,
    createReaderSelector = _require2.createReaderSelector;

var _require3 = __webpack_require__(880),
    ROOT_TYPE = _require3.ROOT_TYPE,
    TYPENAME_KEY = _require3.TYPENAME_KEY,
    getStorageKey = _require3.getStorageKey;

function execute(config) {
  return new Executor(config);
}
/**
 * Coordinates the execution of a query, handling network callbacks
 * including optimistic payloads, standard payloads, resolution of match
 * dependencies, etc.
 */


var Executor = /*#__PURE__*/function () {
  function Executor(_ref) {
    var _this = this;

    var operation = _ref.operation,
        operationExecutions = _ref.operationExecutions,
        operationLoader = _ref.operationLoader,
        optimisticConfig = _ref.optimisticConfig,
        publishQueue = _ref.publishQueue,
        scheduler = _ref.scheduler,
        sink = _ref.sink,
        source = _ref.source,
        store = _ref.store,
        updater = _ref.updater,
        operationTracker = _ref.operationTracker,
        treatMissingFieldsAsNull = _ref.treatMissingFieldsAsNull,
        getDataID = _ref.getDataID,
        isClientPayload = _ref.isClientPayload,
        reactFlightPayloadDeserializer = _ref.reactFlightPayloadDeserializer,
        reactFlightServerErrorHandler = _ref.reactFlightServerErrorHandler,
        shouldProcessClientComponents = _ref.shouldProcessClientComponents;
    this._getDataID = getDataID;
    this._treatMissingFieldsAsNull = treatMissingFieldsAsNull;
    this._incrementalPayloadsPending = false;
    this._incrementalResults = new Map();
    this._nextSubscriptionId = 0;
    this._operation = operation;
    this._operationExecutions = operationExecutions;
    this._operationLoader = operationLoader;
    this._operationTracker = operationTracker;
    this._operationUpdateEpochs = new Map();
    this._optimisticUpdates = null;
    this._pendingModulePayloadsCount = 0;
    this._publishQueue = publishQueue;
    this._scheduler = scheduler;
    this._sink = sink;
    this._source = new Map();
    this._state = 'started';
    this._store = store;
    this._subscriptions = new Map();
    this._updater = updater;
    this._isClientPayload = isClientPayload === true;
    this._reactFlightPayloadDeserializer = reactFlightPayloadDeserializer;
    this._reactFlightServerErrorHandler = reactFlightServerErrorHandler;
    this._isSubscriptionOperation = this._operation.request.node.params.operationKind === 'subscription';
    this._shouldProcessClientComponents = shouldProcessClientComponents;
    var id = this._nextSubscriptionId++;
    source.subscribe({
      complete: function complete() {
        return _this._complete(id);
      },
      error: function error(_error2) {
        return _this._error(_error2);
      },
      next: function next(response) {
        try {
          _this._next(id, response);
        } catch (error) {
          sink.error(error);
        }
      },
      start: function start(subscription) {
        return _this._start(id, subscription);
      }
    });

    if (optimisticConfig != null) {
      this._processOptimisticResponse(optimisticConfig.response != null ? {
        data: optimisticConfig.response
      } : null, optimisticConfig.updater, false);
    }
  } // Cancel any pending execution tasks and mark the executor as completed.


  var _proto = Executor.prototype;

  _proto.cancel = function cancel() {
    var _this2 = this;

    if (this._state === 'completed') {
      return;
    }

    this._state = 'completed';

    this._operationExecutions["delete"](this._operation.request.identifier);

    if (this._subscriptions.size !== 0) {
      this._subscriptions.forEach(function (sub) {
        return sub.unsubscribe();
      });

      this._subscriptions.clear();
    }

    var optimisticUpdates = this._optimisticUpdates;

    if (optimisticUpdates !== null) {
      this._optimisticUpdates = null;
      optimisticUpdates.forEach(function (update) {
        return _this2._publishQueue.revertUpdate(update);
      }); // OK: run revert on cancel

      this._publishQueue.run();
    }

    this._incrementalResults.clear();

    this._completeOperationTracker();

    if (this._retainDisposable) {
      this._retainDisposable.dispose();

      this._retainDisposable = null;
    }
  };

  _proto._updateActiveState = function _updateActiveState() {
    var activeState;

    switch (this._state) {
      case 'started':
        {
          activeState = 'active';
          break;
        }

      case 'loading_incremental':
        {
          activeState = 'active';
          break;
        }

      case 'completed':
        {
          activeState = 'inactive';
          break;
        }

      case 'loading_final':
        {
          activeState = this._pendingModulePayloadsCount > 0 ? 'active' : 'inactive';
          break;
        }

      default:
        this._state;
         true ?  false ? 0 : invariant(false) : 0;
    }

    this._operationExecutions.set(this._operation.request.identifier, activeState);
  };

  _proto._schedule = function _schedule(task) {
    var _this3 = this;

    var scheduler = this._scheduler;

    if (scheduler != null) {
      var _id2 = this._nextSubscriptionId++;

      RelayObservable.create(function (sink) {
        var cancellationToken = scheduler.schedule(function () {
          try {
            task();
            sink.complete();
          } catch (error) {
            sink.error(error);
          }
        });
        return function () {
          return scheduler.cancel(cancellationToken);
        };
      }).subscribe({
        complete: function complete() {
          return _this3._complete(_id2);
        },
        error: function error(_error3) {
          return _this3._error(_error3);
        },
        start: function start(subscription) {
          return _this3._start(_id2, subscription);
        }
      });
    } else {
      task();
    }
  };

  _proto._complete = function _complete(id) {
    this._subscriptions["delete"](id);

    if (this._subscriptions.size === 0) {
      this.cancel();

      this._sink.complete();
    }
  };

  _proto._error = function _error(error) {
    this.cancel();

    this._sink.error(error);
  };

  _proto._start = function _start(id, subscription) {
    this._subscriptions.set(id, subscription);

    this._updateActiveState();
  } // Handle a raw GraphQL response.
  ;

  _proto._next = function _next(_id, response) {
    var _this4 = this;

    this._schedule(function () {
      _this4._handleNext(response);

      _this4._maybeCompleteSubscriptionOperationTracking();
    });
  };

  _proto._handleErrorResponse = function _handleErrorResponse(responses) {
    var _this5 = this;

    var results = [];
    responses.forEach(function (response) {
      if (response.data === null && response.extensions != null && !response.hasOwnProperty('errors')) {
        // Skip extensions-only payloads
        return;
      } else if (response.data == null) {
        // Error if any other payload in the batch is missing data, regardless of whether
        // it had `errors` or not.
        var errors = response.hasOwnProperty('errors') && response.errors != null ? response.errors : null;
        var messages = errors ? errors.map(function (_ref2) {
          var message = _ref2.message;
          return message;
        }).join('\n') : '(No errors)';
        var error = RelayError.create('RelayNetwork', 'No data returned for operation `' + _this5._operation.request.node.params.name + '`, got error(s):\n' + messages + '\n\nSee the error `source` property for more information.');
        error.source = {
          errors: errors,
          operation: _this5._operation.request.node,
          variables: _this5._operation.request.variables
        }; // In V8, Error objects keep the closure scope chain alive until the
        // err.stack property is accessed.

        error.stack;
        throw error;
      } else {
        var responseWithData = response;
        results.push(responseWithData);
      }
    });
    return results;
  }
  /**
   * This method return boolean to indicate if the optimistic
   * response has been handled
   */
  ;

  _proto._handleOptimisticResponses = function _handleOptimisticResponses(responses) {
    var _response$extensions;

    if (responses.length > 1) {
      if (responses.some(function (responsePart) {
        var _responsePart$extensi;

        return ((_responsePart$extensi = responsePart.extensions) === null || _responsePart$extensi === void 0 ? void 0 : _responsePart$extensi.isOptimistic) === true;
      })) {
         true ?  false ? 0 : invariant(false) : 0;
      }

      return false;
    }

    var response = responses[0];
    var isOptimistic = ((_response$extensions = response.extensions) === null || _response$extensions === void 0 ? void 0 : _response$extensions.isOptimistic) === true;

    if (isOptimistic && this._state !== 'started') {
       true ?  false ? 0 : invariant(false) : 0;
    }

    if (isOptimistic) {
      this._processOptimisticResponse(response, null, this._treatMissingFieldsAsNull);

      this._sink.next(response);

      return true;
    }

    return false;
  };

  _proto._handleNext = function _handleNext(response) {
    if (this._state === 'completed') {
      return;
    }

    var responses = Array.isArray(response) ? response : [response];

    var responsesWithData = this._handleErrorResponse(responses);

    if (responsesWithData.length === 0) {
      // no results with data, nothing to process
      // this can occur with extensions-only payloads
      var isFinal = responses.some(function (x) {
        var _x$extensions;

        return ((_x$extensions = x.extensions) === null || _x$extensions === void 0 ? void 0 : _x$extensions.is_final) === true;
      });

      if (isFinal) {
        this._state = 'loading_final';

        this._updateActiveState();

        this._incrementalPayloadsPending = false;
      }

      this._sink.next(response);

      return;
    } // Next, handle optimistic responses


    var isOptimistic = this._handleOptimisticResponses(responsesWithData);

    if (isOptimistic) {
      return;
    }

    var _partitionGraphQLResp = partitionGraphQLResponses(responsesWithData),
        nonIncrementalResponses = _partitionGraphQLResp[0],
        incrementalResponses = _partitionGraphQLResp[1];

    var hasNonIncrementalResponses = nonIncrementalResponses.length > 0; // In theory this doesn't preserve the ordering of the batch.
    // The idea is that a batch is always:
    //  * at most one non-incremental payload
    //  * followed by zero or more incremental payloads
    // The non-incremental payload can appear if the server sends a batch
    // with the initial payload followed by some early-to-resolve incremental
    // payloads (although, can that even happen?)

    if (hasNonIncrementalResponses) {
      var payloadFollowups = this._processResponses(nonIncrementalResponses);

      if (!RelayFeatureFlags.ENABLE_BATCHED_STORE_UPDATES) {
        var updatedOwners = this._publishQueue.run(this._operation);

        this._updateOperationTracker(updatedOwners);
      }

      this._processPayloadFollowups(payloadFollowups);

      if (!RelayFeatureFlags.ENABLE_BATCHED_STORE_UPDATES) {
        if (this._incrementalPayloadsPending && !this._retainDisposable) {
          this._retainDisposable = this._store.retain(this._operation);
        }
      }
    }

    if (incrementalResponses.length > 0) {
      var _payloadFollowups = this._processIncrementalResponses(incrementalResponses);

      if (!RelayFeatureFlags.ENABLE_BATCHED_STORE_UPDATES) {
        // For the incremental case, we're only handling follow-up responses
        // for already initiated operation (and we're not passing it to
        // the run(...) call)
        var _updatedOwners = this._publishQueue.run();

        this._updateOperationTracker(_updatedOwners);
      }

      this._processPayloadFollowups(_payloadFollowups);
    }

    if (this._isSubscriptionOperation && RelayFeatureFlags.ENABLE_UNIQUE_SUBSCRIPTION_ROOT) {
      // We attach the id to allow the `requestSubscription` to read from the store using
      // the current id in its `onNext` callback
      if (responsesWithData[0].extensions == null) {
        // $FlowFixMe[cannot-write]
        responsesWithData[0].extensions = {
          __relay_subscription_root_id: this._operation.fragment.dataID
        };
      } else {
        responsesWithData[0].extensions.__relay_subscription_root_id = this._operation.fragment.dataID;
      }
    }

    if (RelayFeatureFlags.ENABLE_BATCHED_STORE_UPDATES) {
      // OK: run once after each new payload
      // If we have non-incremental responses, we passing `this._operation` to
      // the publish queue here, which will later be passed to the store (via
      // notify) to indicate that this operation caused the store to update
      var _updatedOwners2 = this._publishQueue.run(hasNonIncrementalResponses ? this._operation : undefined);

      if (hasNonIncrementalResponses) {
        if (this._incrementalPayloadsPending && !this._retainDisposable) {
          this._retainDisposable = this._store.retain(this._operation);
        }
      }

      this._updateOperationTracker(_updatedOwners2);
    }

    this._sink.next(response);
  };

  _proto._processOptimisticResponse = function _processOptimisticResponse(response, updater, treatMissingFieldsAsNull) {
    var _this6 = this;

    !(this._optimisticUpdates === null) ?  false ? 0 : invariant(false) : void 0;

    if (response == null && updater == null) {
      return;
    }

    var optimisticUpdates = [];

    if (response) {
      var payload = normalizeResponse(response, this._operation.root, ROOT_TYPE, {
        getDataID: this._getDataID,
        path: [],
        reactFlightPayloadDeserializer: this._reactFlightPayloadDeserializer,
        reactFlightServerErrorHandler: this._reactFlightServerErrorHandler,
        shouldProcessClientComponents: this._shouldProcessClientComponents,
        treatMissingFieldsAsNull: treatMissingFieldsAsNull
      });
      validateOptimisticResponsePayload(payload);
      optimisticUpdates.push({
        operation: this._operation,
        payload: payload,
        updater: updater
      });

      this._processOptimisticFollowups(payload, optimisticUpdates);
    } else if (updater) {
      optimisticUpdates.push({
        operation: this._operation,
        payload: {
          errors: null,
          fieldPayloads: null,
          incrementalPlaceholders: null,
          moduleImportPayloads: null,
          source: RelayRecordSource.create(),
          isFinal: false
        },
        updater: updater
      });
    }

    this._optimisticUpdates = optimisticUpdates;
    optimisticUpdates.forEach(function (update) {
      return _this6._publishQueue.applyUpdate(update);
    }); // OK: only called on construction and when receiving an optimistic payload from network,
    // which doesn't fall-through to the regular next() handling

    this._publishQueue.run();
  };

  _proto._processOptimisticFollowups = function _processOptimisticFollowups(payload, optimisticUpdates) {
    if (payload.moduleImportPayloads && payload.moduleImportPayloads.length) {
      var moduleImportPayloads = payload.moduleImportPayloads;
      var operationLoader = this._operationLoader;
      !operationLoader ?  false ? 0 : invariant(false) : void 0;

      var _iterator = (0, _createForOfIteratorHelper2["default"])(moduleImportPayloads),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var moduleImportPayload = _step.value;
          var operation = operationLoader.get(moduleImportPayload.operationReference);

          if (operation == null) {
            this._processAsyncOptimisticModuleImport(operationLoader, moduleImportPayload);
          } else {
            var moduleImportOptimisticUpdates = this._processOptimisticModuleImport(operation, moduleImportPayload);

            optimisticUpdates.push.apply(optimisticUpdates, (0, _toConsumableArray2["default"])(moduleImportOptimisticUpdates));
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  };

  _proto._normalizeModuleImport = function _normalizeModuleImport(moduleImportPayload, operation) {
    var selector = createNormalizationSelector(operation, moduleImportPayload.dataID, moduleImportPayload.variables);
    return normalizeResponse({
      data: moduleImportPayload.data
    }, selector, moduleImportPayload.typeName, {
      getDataID: this._getDataID,
      path: moduleImportPayload.path,
      reactFlightPayloadDeserializer: this._reactFlightPayloadDeserializer,
      reactFlightServerErrorHandler: this._reactFlightServerErrorHandler,
      treatMissingFieldsAsNull: this._treatMissingFieldsAsNull,
      shouldProcessClientComponents: this._shouldProcessClientComponents
    });
  };

  _proto._processOptimisticModuleImport = function _processOptimisticModuleImport(normalizationRootNode, moduleImportPayload) {
    var operation = getOperation(normalizationRootNode);
    var optimisticUpdates = [];

    var modulePayload = this._normalizeModuleImport(moduleImportPayload, operation);

    validateOptimisticResponsePayload(modulePayload);
    optimisticUpdates.push({
      operation: this._operation,
      payload: modulePayload,
      updater: null
    });

    this._processOptimisticFollowups(modulePayload, optimisticUpdates);

    return optimisticUpdates;
  };

  _proto._processAsyncOptimisticModuleImport = function _processAsyncOptimisticModuleImport(operationLoader, moduleImportPayload) {
    var _this7 = this;

    operationLoader.load(moduleImportPayload.operationReference).then(function (operation) {
      if (operation == null || _this7._state !== 'started') {
        return;
      }

      var moduleImportOptimisticUpdates = _this7._processOptimisticModuleImport(operation, moduleImportPayload);

      moduleImportOptimisticUpdates.forEach(function (update) {
        return _this7._publishQueue.applyUpdate(update);
      });

      if (_this7._optimisticUpdates == null) {
         false ? 0 : void 0;
      } else {
        var _this$_optimisticUpda;

        (_this$_optimisticUpda = _this7._optimisticUpdates).push.apply(_this$_optimisticUpda, (0, _toConsumableArray2["default"])(moduleImportOptimisticUpdates)); // OK: always have to run() after an module import resolves async


        _this7._publishQueue.run();
      }
    });
  };

  _proto._processResponses = function _processResponses(responses) {
    var _this8 = this;

    if (this._optimisticUpdates !== null) {
      this._optimisticUpdates.forEach(function (update) {
        return _this8._publishQueue.revertUpdate(update);
      });

      this._optimisticUpdates = null;
    }

    this._incrementalPayloadsPending = false;

    this._incrementalResults.clear();

    this._source.clear();

    return responses.map(function (payloadPart) {
      var relayPayload = normalizeResponse(payloadPart, _this8._operation.root, ROOT_TYPE, {
        getDataID: _this8._getDataID,
        path: [],
        reactFlightPayloadDeserializer: _this8._reactFlightPayloadDeserializer,
        reactFlightServerErrorHandler: _this8._reactFlightServerErrorHandler,
        treatMissingFieldsAsNull: _this8._treatMissingFieldsAsNull,
        shouldProcessClientComponents: _this8._shouldProcessClientComponents
      });

      _this8._publishQueue.commitPayload(_this8._operation, relayPayload, _this8._updater);

      return relayPayload;
    });
  }
  /**
   * Handles any follow-up actions for a Relay payload for @match, @defer,
   * and @stream directives.
   */
  ;

  _proto._processPayloadFollowups = function _processPayloadFollowups(payloads) {
    var _this9 = this;

    if (this._state === 'completed') {
      return;
    }

    payloads.forEach(function (payload) {
      var incrementalPlaceholders = payload.incrementalPlaceholders,
          moduleImportPayloads = payload.moduleImportPayloads,
          isFinal = payload.isFinal;
      _this9._state = isFinal ? 'loading_final' : 'loading_incremental';

      _this9._updateActiveState();

      if (isFinal) {
        _this9._incrementalPayloadsPending = false;
      }

      if (moduleImportPayloads && moduleImportPayloads.length !== 0) {
        var operationLoader = _this9._operationLoader;
        !operationLoader ?  false ? 0 : invariant(false) : void 0;
        moduleImportPayloads.forEach(function (moduleImportPayload) {
          _this9._processModuleImportPayload(moduleImportPayload, operationLoader);
        });
      }

      if (incrementalPlaceholders && incrementalPlaceholders.length !== 0) {
        _this9._incrementalPayloadsPending = _this9._state !== 'loading_final';
        incrementalPlaceholders.forEach(function (incrementalPlaceholder) {
          _this9._processIncrementalPlaceholder(payload, incrementalPlaceholder);
        });

        if (_this9._isClientPayload || _this9._state === 'loading_final') {
          // The query has defer/stream selections that are enabled, but either
          // the server indicated that this is a "final" payload: no incremental
          // payloads will be delivered, then warn that the query was (likely)
          // executed on the server in non-streaming mode, with incremental
          // delivery disabled; or this is a client payload, and there will be
          // no incremental payload.
           false ? 0 : void 0; // But eagerly process any deferred payloads

          var relayPayloads = [];
          incrementalPlaceholders.forEach(function (placeholder) {
            if (placeholder.kind === 'defer') {
              relayPayloads.push(_this9._processDeferResponse(placeholder.label, placeholder.path, placeholder, {
                data: placeholder.data
              }));
            }
          });

          if (relayPayloads.length > 0) {
            if (!RelayFeatureFlags.ENABLE_BATCHED_STORE_UPDATES) {
              var updatedOwners = _this9._publishQueue.run();

              _this9._updateOperationTracker(updatedOwners);
            }

            _this9._processPayloadFollowups(relayPayloads);
          }
        }
      }
    });
  };

  _proto._maybeCompleteSubscriptionOperationTracking = function _maybeCompleteSubscriptionOperationTracking() {
    if (!this._isSubscriptionOperation) {
      return;
    }

    if (this._pendingModulePayloadsCount === 0 && this._incrementalPayloadsPending === false) {
      this._completeOperationTracker();
    }

    if (RelayFeatureFlags.ENABLE_UNIQUE_SUBSCRIPTION_ROOT) {
      var nextID = generateUniqueClientID();
      this._operation = {
        request: this._operation.request,
        fragment: createReaderSelector(this._operation.fragment.node, nextID, this._operation.fragment.variables, this._operation.fragment.owner),
        root: createNormalizationSelector(this._operation.root.node, nextID, this._operation.root.variables)
      };
    }
  }
  /**
   * Processes a ModuleImportPayload, asynchronously resolving the normalization
   * AST and using it to normalize the field data into a RelayResponsePayload.
   * The resulting payload may contain other incremental payloads (match,
   * defer, stream, etc); these are handled by calling
   * `_processPayloadFollowups()`.
   */
  ;

  _proto._processModuleImportPayload = function _processModuleImportPayload(moduleImportPayload, operationLoader) {
    var _this10 = this;

    var node = operationLoader.get(moduleImportPayload.operationReference);

    if (node != null) {
      var operation = getOperation(node); // If the operation module is available synchronously, normalize the
      // data synchronously.

      this._handleModuleImportPayload(moduleImportPayload, operation);

      this._maybeCompleteSubscriptionOperationTracking();
    } else {
      // Otherwise load the operation module and schedule a task to normalize
      // the data when the module is available.
      var _id3 = this._nextSubscriptionId++;

      this._pendingModulePayloadsCount++;

      var decrementPendingCount = function decrementPendingCount() {
        _this10._pendingModulePayloadsCount--;

        _this10._maybeCompleteSubscriptionOperationTracking();
      }; // Observable.from(operationLoader.load()) wouldn't catch synchronous
      // errors thrown by the load function, which is user-defined. Guard
      // against that with Observable.from(new Promise(<work>)).


      RelayObservable.from(new Promise(function (resolve, reject) {
        operationLoader.load(moduleImportPayload.operationReference).then(resolve, reject);
      })).map(function (operation) {
        if (operation != null) {
          _this10._schedule(function () {
            _this10._handleModuleImportPayload(moduleImportPayload, getOperation(operation)); // OK: always have to run after an async module import resolves


            var updatedOwners = _this10._publishQueue.run();

            _this10._updateOperationTracker(updatedOwners);
          });
        }
      }).subscribe({
        complete: function complete() {
          _this10._complete(_id3);

          decrementPendingCount();
        },
        error: function error(_error4) {
          _this10._error(_error4);

          decrementPendingCount();
        },
        start: function start(subscription) {
          return _this10._start(_id3, subscription);
        }
      });
    }
  };

  _proto._handleModuleImportPayload = function _handleModuleImportPayload(moduleImportPayload, operation) {
    var relayPayload = this._normalizeModuleImport(moduleImportPayload, operation);

    this._publishQueue.commitPayload(this._operation, relayPayload);

    if (!RelayFeatureFlags.ENABLE_BATCHED_STORE_UPDATES) {
      var updatedOwners = this._publishQueue.run();

      this._updateOperationTracker(updatedOwners);
    }

    this._processPayloadFollowups([relayPayload]);
  }
  /**
   * The executor now knows that GraphQL responses are expected for a given
   * label/path:
   * - Store the placeholder in order to process any future responses that may
   *   arrive.
   * - Then process any responses that had already arrived.
   *
   * The placeholder contains the normalization selector, path (for nested
   * defer/stream), and other metadata used to normalize the incremental
   * response(s).
   */
  ;

  _proto._processIncrementalPlaceholder = function _processIncrementalPlaceholder(relayPayload, placeholder) {
    var _relayPayload$fieldPa; // Update the label => path => placeholder map


    var label = placeholder.label,
        path = placeholder.path;
    var pathKey = path.map(String).join('.');

    var resultForLabel = this._incrementalResults.get(label);

    if (resultForLabel == null) {
      resultForLabel = new Map();

      this._incrementalResults.set(label, resultForLabel);
    }

    var resultForPath = resultForLabel.get(pathKey);
    var pendingResponses = resultForPath != null && resultForPath.kind === 'response' ? resultForPath.responses : null;
    resultForLabel.set(pathKey, {
      kind: 'placeholder',
      placeholder: placeholder
    }); // Store references to the parent node to allow detecting concurrent
    // modifications to the parent before items arrive and to replay
    // handle field payloads to account for new information on source records.

    var parentID;

    if (placeholder.kind === 'stream') {
      parentID = placeholder.parentID;
    } else if (placeholder.kind === 'defer') {
      parentID = placeholder.selector.dataID;
    } else {
      placeholder;
       true ?  false ? 0 : invariant(false) : 0;
    }

    var parentRecord = relayPayload.source.get(parentID);
    var parentPayloads = ((_relayPayload$fieldPa = relayPayload.fieldPayloads) !== null && _relayPayload$fieldPa !== void 0 ? _relayPayload$fieldPa : []).filter(function (fieldPayload) {
      var fieldID = generateClientID(fieldPayload.dataID, fieldPayload.fieldKey);
      return (// handlers applied to the streamed field itself
        fieldPayload.dataID === parentID || // handlers applied to a field on an ancestor object, where
        // ancestor.field links to the parent record (example: connections)
        fieldID === parentID
      );
    }); // If an incremental payload exists for some id that record should also
    // exist.

    !(parentRecord != null) ?  false ? 0 : invariant(false) : void 0;
    var nextParentRecord;
    var nextParentPayloads;

    var previousParentEntry = this._source.get(parentID);

    if (previousParentEntry != null) {
      // If a previous entry exists, merge the previous/next records and
      // payloads together.
      nextParentRecord = RelayModernRecord.update(previousParentEntry.record, parentRecord);
      var handlePayloads = new Map();

      var dedupePayload = function dedupePayload(payload) {
        var key = stableStringify(payload);
        handlePayloads.set(key, payload);
      };

      previousParentEntry.fieldPayloads.forEach(dedupePayload);
      parentPayloads.forEach(dedupePayload);
      nextParentPayloads = Array.from(handlePayloads.values());
    } else {
      nextParentRecord = parentRecord;
      nextParentPayloads = parentPayloads;
    }

    this._source.set(parentID, {
      record: nextParentRecord,
      fieldPayloads: nextParentPayloads
    }); // If there were any queued responses, process them now that placeholders
    // are in place


    if (pendingResponses != null) {
      var payloadFollowups = this._processIncrementalResponses(pendingResponses);

      if (!RelayFeatureFlags.ENABLE_BATCHED_STORE_UPDATES) {
        var updatedOwners = this._publishQueue.run();

        this._updateOperationTracker(updatedOwners);
      }

      this._processPayloadFollowups(payloadFollowups);
    }
  }
  /**
   * Lookup the placeholder the describes how to process an incremental
   * response, normalize/publish it, and process any nested defer/match/stream
   * metadata.
   */
  ;

  _proto._processIncrementalResponses = function _processIncrementalResponses(incrementalResponses) {
    var _this11 = this;

    var relayPayloads = [];
    incrementalResponses.forEach(function (incrementalResponse) {
      var label = incrementalResponse.label,
          path = incrementalResponse.path,
          response = incrementalResponse.response;

      var resultForLabel = _this11._incrementalResults.get(label);

      if (resultForLabel == null) {
        resultForLabel = new Map();

        _this11._incrementalResults.set(label, resultForLabel);
      }

      if (label.indexOf('$defer$') !== -1) {
        var pathKey = path.map(String).join('.');
        var resultForPath = resultForLabel.get(pathKey);

        if (resultForPath == null) {
          resultForPath = {
            kind: 'response',
            responses: [incrementalResponse]
          };
          resultForLabel.set(pathKey, resultForPath);
          return;
        } else if (resultForPath.kind === 'response') {
          resultForPath.responses.push(incrementalResponse);
          return;
        }

        var placeholder = resultForPath.placeholder;
        !(placeholder.kind === 'defer') ?  false ? 0 : invariant(false) : void 0;
        relayPayloads.push(_this11._processDeferResponse(label, path, placeholder, response));
      } else {
        // @stream payload path values end in the field name and item index,
        // but Relay records paths relative to the parent of the stream node:
        // therefore we strip the last two elements just to lookup the path
        // (the item index is used later to insert the element in the list)
        var _pathKey = path.slice(0, -2).map(String).join('.');

        var _resultForPath = resultForLabel.get(_pathKey);

        if (_resultForPath == null) {
          _resultForPath = {
            kind: 'response',
            responses: [incrementalResponse]
          };
          resultForLabel.set(_pathKey, _resultForPath);
          return;
        } else if (_resultForPath.kind === 'response') {
          _resultForPath.responses.push(incrementalResponse);

          return;
        }

        var _placeholder = _resultForPath.placeholder;
        !(_placeholder.kind === 'stream') ?  false ? 0 : invariant(false) : void 0;
        relayPayloads.push(_this11._processStreamResponse(label, path, _placeholder, response));
      }
    });
    return relayPayloads;
  };

  _proto._processDeferResponse = function _processDeferResponse(label, path, placeholder, response) {
    var parentID = placeholder.selector.dataID;
    var relayPayload = normalizeResponse(response, placeholder.selector, placeholder.typeName, {
      getDataID: this._getDataID,
      path: placeholder.path,
      reactFlightPayloadDeserializer: this._reactFlightPayloadDeserializer,
      reactFlightServerErrorHandler: this._reactFlightServerErrorHandler,
      treatMissingFieldsAsNull: this._treatMissingFieldsAsNull,
      shouldProcessClientComponents: this._shouldProcessClientComponents
    });

    this._publishQueue.commitPayload(this._operation, relayPayload); // Load the version of the parent record from which this incremental data
    // was derived


    var parentEntry = this._source.get(parentID);

    !(parentEntry != null) ?  false ? 0 : invariant(false) : void 0;
    var fieldPayloads = parentEntry.fieldPayloads;

    if (fieldPayloads.length !== 0) {
      var _response$extensions2;

      var handleFieldsRelayPayload = {
        errors: null,
        fieldPayloads: fieldPayloads,
        incrementalPlaceholders: null,
        moduleImportPayloads: null,
        source: RelayRecordSource.create(),
        isFinal: ((_response$extensions2 = response.extensions) === null || _response$extensions2 === void 0 ? void 0 : _response$extensions2.is_final) === true
      };

      this._publishQueue.commitPayload(this._operation, handleFieldsRelayPayload);
    }

    return relayPayload;
  }
  /**
   * Process the data for one item in a @stream field.
   */
  ;

  _proto._processStreamResponse = function _processStreamResponse(label, path, placeholder, response) {
    var parentID = placeholder.parentID,
        node = placeholder.node,
        variables = placeholder.variables; // Find the LinkedField where @stream was applied

    var field = node.selections[0];
    !(field != null && field.kind === 'LinkedField' && field.plural === true) ?  false ? 0 : invariant(false) : void 0;

    var _this$_normalizeStrea = this._normalizeStreamItem(response, parentID, field, variables, path, placeholder.path),
        fieldPayloads = _this$_normalizeStrea.fieldPayloads,
        itemID = _this$_normalizeStrea.itemID,
        itemIndex = _this$_normalizeStrea.itemIndex,
        prevIDs = _this$_normalizeStrea.prevIDs,
        relayPayload = _this$_normalizeStrea.relayPayload,
        storageKey = _this$_normalizeStrea.storageKey; // Publish the new item and update the parent record to set
    // field[index] = item *if* the parent record hasn't been concurrently
    // modified.


    this._publishQueue.commitPayload(this._operation, relayPayload, function (store) {
      var currentParentRecord = store.get(parentID);

      if (currentParentRecord == null) {
        // parent has since been deleted, stream data is stale
        return;
      }

      var currentItems = currentParentRecord.getLinkedRecords(storageKey);

      if (currentItems == null) {
        // field has since been deleted, stream data is stale
        return;
      }

      if (currentItems.length !== prevIDs.length || currentItems.some(function (currentItem, index) {
        return prevIDs[index] !== (currentItem && currentItem.getDataID());
      })) {
        // field has been modified by something other than this query,
        // stream data is stale
        return;
      } // parent.field has not been concurrently modified:
      // update `parent.field[index] = item`


      var nextItems = (0, _toConsumableArray2["default"])(currentItems);
      nextItems[itemIndex] = store.get(itemID);
      currentParentRecord.setLinkedRecords(nextItems, storageKey);
    }); // Now that the parent record has been updated to include the new item,
    // also update any handle fields that are derived from the parent record.


    if (fieldPayloads.length !== 0) {
      var handleFieldsRelayPayload = {
        errors: null,
        fieldPayloads: fieldPayloads,
        incrementalPlaceholders: null,
        moduleImportPayloads: null,
        source: RelayRecordSource.create(),
        isFinal: false
      };

      this._publishQueue.commitPayload(this._operation, handleFieldsRelayPayload);
    }

    return relayPayload;
  };

  _proto._normalizeStreamItem = function _normalizeStreamItem(response, parentID, field, variables, path, normalizationPath) {
    var _field$alias, _field$concreteType, _this$_getDataID;

    var data = response.data;
    !(_typeof(data) === 'object') ?  false ? 0 : invariant(false) : void 0;
    var responseKey = (_field$alias = field.alias) !== null && _field$alias !== void 0 ? _field$alias : field.name;
    var storageKey = getStorageKey(field, variables); // Load the version of the parent record from which this incremental data
    // was derived

    var parentEntry = this._source.get(parentID);

    !(parentEntry != null) ?  false ? 0 : invariant(false) : void 0;
    var parentRecord = parentEntry.record,
        fieldPayloads = parentEntry.fieldPayloads; // Load the field value (items) that were created by *this* query executor
    // in order to check if there has been any concurrent modifications by some
    // other operation.

    var prevIDs = RelayModernRecord.getLinkedRecordIDs(parentRecord, storageKey);
    !(prevIDs != null) ?  false ? 0 : invariant(false) : void 0; // Determine the index in the field of the new item

    var finalPathEntry = path[path.length - 1];
    var itemIndex = parseInt(finalPathEntry, 10);
    !(itemIndex === finalPathEntry && itemIndex >= 0) ?  false ? 0 : invariant(false) : void 0;
    var typeName = (_field$concreteType = field.concreteType) !== null && _field$concreteType !== void 0 ? _field$concreteType : data[TYPENAME_KEY];
    !(typeof typeName === 'string') ?  false ? 0 : invariant(false) : void 0; // Determine the __id of the new item: this must equal the value that would
    // be assigned had the item not been streamed

    var itemID = // https://github.com/prettier/prettier/issues/6403
    // prettier-ignore
    ((_this$_getDataID = this._getDataID(data, typeName)) !== null && _this$_getDataID !== void 0 ? _this$_getDataID : prevIDs && prevIDs[itemIndex]) || // Reuse previously generated client IDs
    generateClientID(parentID, storageKey, itemIndex);
    !(typeof itemID === 'string') ?  false ? 0 : invariant(false) : void 0; // Build a selector to normalize the item data with

    var selector = createNormalizationSelector(field, itemID, variables); // Update the cached version of the parent record to reflect the new item:
    // this is used when subsequent stream payloads arrive to see if there
    // have been concurrent modifications to the list

    var nextParentRecord = RelayModernRecord.clone(parentRecord);
    var nextIDs = (0, _toConsumableArray2["default"])(prevIDs);
    nextIDs[itemIndex] = itemID;
    RelayModernRecord.setLinkedRecordIDs(nextParentRecord, storageKey, nextIDs);

    this._source.set(parentID, {
      record: nextParentRecord,
      fieldPayloads: fieldPayloads
    });

    var relayPayload = normalizeResponse(response, selector, typeName, {
      getDataID: this._getDataID,
      path: [].concat((0, _toConsumableArray2["default"])(normalizationPath), [responseKey, String(itemIndex)]),
      reactFlightPayloadDeserializer: this._reactFlightPayloadDeserializer,
      reactFlightServerErrorHandler: this._reactFlightServerErrorHandler,
      treatMissingFieldsAsNull: this._treatMissingFieldsAsNull,
      shouldProcessClientComponents: this._shouldProcessClientComponents
    });
    return {
      fieldPayloads: fieldPayloads,
      itemID: itemID,
      itemIndex: itemIndex,
      prevIDs: prevIDs,
      relayPayload: relayPayload,
      storageKey: storageKey
    };
  };

  _proto._updateOperationTracker = function _updateOperationTracker(updatedOwners) {
    if (updatedOwners != null && updatedOwners.length > 0) {
      this._operationTracker.update(this._operation.request, new Set(updatedOwners));
    }
  };

  _proto._completeOperationTracker = function _completeOperationTracker() {
    this._operationTracker.complete(this._operation.request);
  };

  return Executor;
}();

function partitionGraphQLResponses(responses) {
  var nonIncrementalResponses = [];
  var incrementalResponses = [];
  responses.forEach(function (response) {
    if (response.path != null || response.label != null) {
      var label = response.label,
          path = response.path;

      if (label == null || path == null) {
         true ?  false ? 0 : invariant(false) : 0;
      }

      incrementalResponses.push({
        label: label,
        path: path,
        response: response
      });
    } else {
      nonIncrementalResponses.push(response);
    }
  });
  return [nonIncrementalResponses, incrementalResponses];
}

function normalizeResponse(response, selector, typeName, options) {
  var _response$extensions3;

  var data = response.data,
      errors = response.errors;
  var source = RelayRecordSource.create();
  var record = RelayModernRecord.create(selector.dataID, typeName);
  source.set(selector.dataID, record);
  var relayPayload = RelayResponseNormalizer.normalize(source, selector, data, options);
  return (0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, relayPayload), {}, {
    errors: errors,
    isFinal: ((_response$extensions3 = response.extensions) === null || _response$extensions3 === void 0 ? void 0 : _response$extensions3.is_final) === true
  });
}

function stableStringify(value) {
  var _JSON$stringify;

  return (_JSON$stringify = JSON.stringify(stableCopy(value))) !== null && _JSON$stringify !== void 0 ? _JSON$stringify : ''; // null-check for flow
}

function validateOptimisticResponsePayload(payload) {
  var incrementalPlaceholders = payload.incrementalPlaceholders;

  if (incrementalPlaceholders != null && incrementalPlaceholders.length !== 0) {
     true ?  false ? 0 : invariant(false) : 0;
  }
}

module.exports = {
  execute: execute
};

/***/ }),

/***/ 477:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _objectSpread2 = _interopRequireDefault(__webpack_require__(4638));

var invariant = __webpack_require__(4990);
/**
 * Determines the variables that are in scope for a fragment given the variables
 * in scope at the root query as well as any arguments applied at the fragment
 * spread via `@arguments`.
 *
 * Note that this is analagous to determining function arguments given a function call.
 */


function getFragmentVariables(fragment, rootVariables, argumentVariables) {
  var variables;
  fragment.argumentDefinitions.forEach(function (definition) {
    if (argumentVariables.hasOwnProperty(definition.name)) {
      return;
    } // $FlowFixMe[cannot-spread-interface]


    variables = variables || (0, _objectSpread2["default"])({}, argumentVariables);

    switch (definition.kind) {
      case 'LocalArgument':
        variables[definition.name] = definition.defaultValue;
        break;

      case 'RootArgument':
        if (!rootVariables.hasOwnProperty(definition.name)) {
          /*
           * Global variables passed as values of @arguments are not required to
           * be declared unless they are used by the callee fragment or a
           * descendant. In this case, the root variable may not be defined when
           * resolving the callee's variables. The value is explicitly set to
           * undefined to conform to the check in
           * RelayStoreUtils.getStableVariableValue() that variable keys are all
           * present.
           */
          // $FlowFixMe[incompatible-use]
          variables[definition.name] = undefined;
          break;
        } // $FlowFixMe[incompatible-use]
        // $FlowFixMe[cannot-write]


        variables[definition.name] = rootVariables[definition.name];
        break;

      default:
        definition;
         true ?  false ? 0 : invariant(false) : 0;
    }
  });
  return variables || argumentVariables;
}
/**
 * Determines the variables that are in scope for a given operation given values
 * for some/all of its arguments. Extraneous input variables are filtered from
 * the output, and missing variables are set to default values (if given in the
 * operation's definition).
 */


function getOperationVariables(operation, variables) {
  var operationVariables = {};
  operation.argumentDefinitions.forEach(function (def) {
    var value = def.defaultValue; // $FlowFixMe[cannot-write]

    if (variables[def.name] != null) {
      value = variables[def.name];
    }

    operationVariables[def.name] = value;
  });
  return operationVariables;
}

module.exports = {
  getFragmentVariables: getFragmentVariables,
  getOperationVariables: getOperationVariables
};

/***/ }),

/***/ 647:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @emails oncall+relay
 * @format
 */
// flowlint ambiguous-object-type:error


var _typeof = __webpack_require__(3634);

var _interopRequireDefault = __webpack_require__(249);

var _objectSpread2 = _interopRequireDefault(__webpack_require__(4638));

var OperationExecutor = __webpack_require__(6689);

var RelayDefaultHandlerProvider = __webpack_require__(3655);

var RelayFeatureFlags = __webpack_require__(1054);

var RelayObservable = __webpack_require__(7429);

var RelayOperationTracker = __webpack_require__(9458);

var RelayPublishQueue = __webpack_require__(6222);

var RelayRecordSource = __webpack_require__(2642);

var defaultGetDataID = __webpack_require__(7146);

var defaultRequiredFieldLogger = __webpack_require__(5346);

var generateID = __webpack_require__(3845);

var invariant = __webpack_require__(4990);

var RelayModernEnvironment = /*#__PURE__*/function () {
  function RelayModernEnvironment(config) {
    var _this = this;

    var _config$log, _config$requiredField, _config$UNSTABLE_defa, _config$getDataID, _config$handlerProvid, _config$scheduler, _config$isServer, _config$operationTrac;

    this.configName = config.configName;
    this._treatMissingFieldsAsNull = config.treatMissingFieldsAsNull === true;
    var operationLoader = config.operationLoader;
    var reactFlightPayloadDeserializer = config.reactFlightPayloadDeserializer;
    var reactFlightServerErrorHandler = config.reactFlightServerErrorHandler;

    if (false) {}

    this.__log = (_config$log = config.log) !== null && _config$log !== void 0 ? _config$log : emptyFunction;
    this.requiredFieldLogger = (_config$requiredField = config.requiredFieldLogger) !== null && _config$requiredField !== void 0 ? _config$requiredField : defaultRequiredFieldLogger;
    this._defaultRenderPolicy = ((_config$UNSTABLE_defa = config.UNSTABLE_defaultRenderPolicy) !== null && _config$UNSTABLE_defa !== void 0 ? _config$UNSTABLE_defa : RelayFeatureFlags.ENABLE_PARTIAL_RENDERING_DEFAULT === true) ? 'partial' : 'full';
    this._operationLoader = operationLoader;
    this._operationExecutions = new Map();
    this._network = this.__wrapNetworkWithLogObserver(config.network);
    this._getDataID = (_config$getDataID = config.getDataID) !== null && _config$getDataID !== void 0 ? _config$getDataID : defaultGetDataID;
    this._publishQueue = new RelayPublishQueue(config.store, (_config$handlerProvid = config.handlerProvider) !== null && _config$handlerProvid !== void 0 ? _config$handlerProvid : RelayDefaultHandlerProvider, this._getDataID);
    this._scheduler = (_config$scheduler = config.scheduler) !== null && _config$scheduler !== void 0 ? _config$scheduler : null;
    this._store = config.store;
    this.options = config.options;
    this._isServer = (_config$isServer = config.isServer) !== null && _config$isServer !== void 0 ? _config$isServer : false;

    this.__setNet = function (newNet) {
      return _this._network = _this.__wrapNetworkWithLogObserver(newNet);
    };

    if (false) { var _require, inspect; } // Register this Relay Environment with Relay DevTools if it exists.
    // Note: this must always be the last step in the constructor.


    var _global = typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : typeof window !== 'undefined' ? window : undefined;

    var devToolsHook = _global && _global.__RELAY_DEVTOOLS_HOOK__;

    if (devToolsHook) {
      devToolsHook.registerEnvironment(this);
    }

    this._missingFieldHandlers = config.missingFieldHandlers;
    this._operationTracker = (_config$operationTrac = config.operationTracker) !== null && _config$operationTrac !== void 0 ? _config$operationTrac : new RelayOperationTracker();
    this._reactFlightPayloadDeserializer = reactFlightPayloadDeserializer;
    this._reactFlightServerErrorHandler = reactFlightServerErrorHandler;
    this._shouldProcessClientComponents = config.shouldProcessClientComponents;
  }

  var _proto = RelayModernEnvironment.prototype;

  _proto.getStore = function getStore() {
    return this._store;
  };

  _proto.getNetwork = function getNetwork() {
    return this._network;
  };

  _proto.getOperationTracker = function getOperationTracker() {
    return this._operationTracker;
  };

  _proto.isRequestActive = function isRequestActive(requestIdentifier) {
    var activeState = this._operationExecutions.get(requestIdentifier);

    return activeState === 'active';
  };

  _proto.UNSTABLE_getDefaultRenderPolicy = function UNSTABLE_getDefaultRenderPolicy() {
    return this._defaultRenderPolicy;
  };

  _proto.applyUpdate = function applyUpdate(optimisticUpdate) {
    var _this2 = this;

    var dispose = function dispose() {
      _this2._scheduleUpdates(function () {
        _this2._publishQueue.revertUpdate(optimisticUpdate);

        _this2._publishQueue.run();
      });
    };

    this._scheduleUpdates(function () {
      _this2._publishQueue.applyUpdate(optimisticUpdate);

      _this2._publishQueue.run();
    });

    return {
      dispose: dispose
    };
  };

  _proto.revertUpdate = function revertUpdate(update) {
    var _this3 = this;

    this._scheduleUpdates(function () {
      _this3._publishQueue.revertUpdate(update);

      _this3._publishQueue.run();
    });
  };

  _proto.replaceUpdate = function replaceUpdate(update, newUpdate) {
    var _this4 = this;

    this._scheduleUpdates(function () {
      _this4._publishQueue.revertUpdate(update);

      _this4._publishQueue.applyUpdate(newUpdate);

      _this4._publishQueue.run();
    });
  };

  _proto.applyMutation = function applyMutation(optimisticConfig) {
    var subscription = this._execute({
      createSource: function createSource() {
        return RelayObservable.create(function (_sink) {});
      },
      isClientPayload: false,
      operation: optimisticConfig.operation,
      optimisticConfig: optimisticConfig,
      updater: null
    }).subscribe({});

    return {
      dispose: function dispose() {
        return subscription.unsubscribe();
      }
    };
  };

  _proto.check = function check(operation) {
    if (this._missingFieldHandlers == null || this._missingFieldHandlers.length === 0) {
      return this._store.check(operation);
    }

    return this._checkSelectorAndHandleMissingFields(operation, this._missingFieldHandlers);
  };

  _proto.commitPayload = function commitPayload(operation, payload) {
    this._execute({
      createSource: function createSource() {
        return RelayObservable.from({
          data: payload
        });
      },
      isClientPayload: true,
      operation: operation,
      optimisticConfig: null,
      updater: null
    }).subscribe({});
  };

  _proto.commitUpdate = function commitUpdate(updater) {
    var _this5 = this;

    this._scheduleUpdates(function () {
      _this5._publishQueue.commitUpdate(updater);

      _this5._publishQueue.run();
    });
  };

  _proto.lookup = function lookup(readSelector) {
    return this._store.lookup(readSelector);
  };

  _proto.subscribe = function subscribe(snapshot, callback) {
    return this._store.subscribe(snapshot, callback);
  };

  _proto.retain = function retain(operation) {
    return this._store.retain(operation);
  };

  _proto.isServer = function isServer() {
    return this._isServer;
  };

  _proto._checkSelectorAndHandleMissingFields = function _checkSelectorAndHandleMissingFields(operation, handlers) {
    var _this6 = this;

    var target = RelayRecordSource.create();

    var result = this._store.check(operation, {
      target: target,
      handlers: handlers
    });

    if (target.size() > 0) {
      this._scheduleUpdates(function () {
        _this6._publishQueue.commitSource(target);

        _this6._publishQueue.run();
      });
    }

    return result;
  };

  _proto._scheduleUpdates = function _scheduleUpdates(task) {
    var scheduler = this._scheduler;

    if (scheduler != null) {
      scheduler.schedule(task);
    } else {
      task();
    }
  }
  /**
   * Returns an Observable of GraphQLResponse resulting from executing the
   * provided Query or Subscription operation, each result of which is then
   * normalized and committed to the publish queue.
   *
   * Note: Observables are lazy, so calling this method will do nothing until
   * the result is subscribed to: environment.execute({...}).subscribe({...}).
   */
  ;

  _proto.execute = function execute(_ref) {
    var _this7 = this;

    var operation = _ref.operation,
        updater = _ref.updater;
    return this._execute({
      createSource: function createSource() {
        return _this7._network.execute(operation.request.node.params, operation.request.variables, operation.request.cacheConfig || {}, null);
      },
      isClientPayload: false,
      operation: operation,
      optimisticConfig: null,
      updater: updater
    });
  }
  /**
   * Returns an Observable of GraphQLResponse resulting from executing the
   * provided Mutation operation, the result of which is then normalized and
   * committed to the publish queue along with an optional optimistic response
   * or updater.
   *
   * Note: Observables are lazy, so calling this method will do nothing until
   * the result is subscribed to:
   * environment.executeMutation({...}).subscribe({...}).
   */
  ;

  _proto.executeMutation = function executeMutation(_ref2) {
    var _this8 = this;

    var operation = _ref2.operation,
        optimisticResponse = _ref2.optimisticResponse,
        optimisticUpdater = _ref2.optimisticUpdater,
        updater = _ref2.updater,
        uploadables = _ref2.uploadables;
    var optimisticConfig;

    if (optimisticResponse || optimisticUpdater) {
      optimisticConfig = {
        operation: operation,
        response: optimisticResponse,
        updater: optimisticUpdater
      };
    }

    return this._execute({
      createSource: function createSource() {
        return _this8._network.execute(operation.request.node.params, operation.request.variables, (0, _objectSpread2["default"])((0, _objectSpread2["default"])({}, operation.request.cacheConfig), {}, {
          force: true
        }), uploadables);
      },
      isClientPayload: false,
      operation: operation,
      optimisticConfig: optimisticConfig,
      updater: updater
    });
  }
  /**
   * Returns an Observable of GraphQLResponse resulting from executing the
   * provided Query or Subscription operation responses, the result of which is
   * then normalized and comitted to the publish queue.
   *
   * Note: Observables are lazy, so calling this method will do nothing until
   * the result is subscribed to:
   * environment.executeWithSource({...}).subscribe({...}).
   */
  ;

  _proto.executeWithSource = function executeWithSource(_ref3) {
    var operation = _ref3.operation,
        source = _ref3.source;
    return this._execute({
      createSource: function createSource() {
        return source;
      },
      isClientPayload: false,
      operation: operation,
      optimisticConfig: null,
      updater: null
    });
  };

  _proto.toJSON = function toJSON() {
    var _this$configName;

    return "RelayModernEnvironment(".concat((_this$configName = this.configName) !== null && _this$configName !== void 0 ? _this$configName : '', ")");
  };

  _proto._execute = function _execute(_ref4) {
    var _this9 = this;

    var createSource = _ref4.createSource,
        isClientPayload = _ref4.isClientPayload,
        operation = _ref4.operation,
        optimisticConfig = _ref4.optimisticConfig,
        updater = _ref4.updater;
    return RelayObservable.create(function (sink) {
      var executor = OperationExecutor.execute({
        getDataID: _this9._getDataID,
        isClientPayload: isClientPayload,
        operation: operation,
        operationExecutions: _this9._operationExecutions,
        operationLoader: _this9._operationLoader,
        operationTracker: _this9._operationTracker,
        optimisticConfig: optimisticConfig,
        publishQueue: _this9._publishQueue,
        reactFlightPayloadDeserializer: _this9._reactFlightPayloadDeserializer,
        reactFlightServerErrorHandler: _this9._reactFlightServerErrorHandler,
        scheduler: _this9._scheduler,
        shouldProcessClientComponents: _this9._shouldProcessClientComponents,
        sink: sink,
        // NOTE: Some product tests expect `Network.execute` to be called only
        //       when the Observable is executed.
        source: createSource(),
        store: _this9._store,
        treatMissingFieldsAsNull: _this9._treatMissingFieldsAsNull,
        updater: updater
      });
      return function () {
        return executor.cancel();
      };
    });
  }
  /**
   * Wraps the network with logging to ensure that network requests are
   * always logged. Relying on each network callsite to be wrapped is
   * untenable and will eventually lead to holes in the logging.
   */
  ;

  _proto.__wrapNetworkWithLogObserver = function __wrapNetworkWithLogObserver(network) {
    var that = this;
    return {
      execute: function execute(params, variables, cacheConfig, uploadables) {
        var transactionID = generateID();
        var log = that.__log;
        var logObserver = {
          start: function start(subscription) {
            log({
              name: 'network.start',
              transactionID: transactionID,
              params: params,
              variables: variables,
              cacheConfig: cacheConfig
            });
          },
          next: function next(response) {
            log({
              name: 'network.next',
              transactionID: transactionID,
              response: response
            });
          },
          error: function error(_error) {
            log({
              name: 'network.error',
              transactionID: transactionID,
              error: _error
            });
          },
          complete: function complete() {
            log({
              name: 'network.complete',
              transactionID: transactionID
            });
          },
          unsubscribe: function unsubscribe() {
            log({
              name: 'network.unsubscribe',
              transactionID: transactionID
            });
          }
        };

        var logRequestInfo = function logRequestInfo(info) {
          log({
            name: 'network.info',
            transactionID: transactionID,
            info: info
          });
        };

        return network.execute(params, variables, cacheConfig, uploadables, logRequestInfo)["do"](logObserver);
      }
    };
  };

  return RelayModernEnvironment;
}(); // Add a sigil for detection by `isRelayModernEnvironment()` to avoid a
// realm-specific instanceof check, and to aid in module tree-shaking to
// avoid requiring all of RelayRuntime just to detect its environment.


RelayModernEnvironment.prototype['@@RelayModernEnvironment'] = true;

function emptyFunction() {}

module.exports = RelayModernEnvironment;

/***/ }),

/***/ 8005:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _objectSpread2 = _interopRequireDefault(__webpack_require__(4638));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3116));

var RelayFeatureFlags = __webpack_require__(1054);

var areEqual = __webpack_require__(9074);

var invariant = __webpack_require__(4990);

var isScalarAndEqual = __webpack_require__(2485);

var reportMissingRequiredFields = __webpack_require__(2111);

var warning = __webpack_require__(480);

var _require = __webpack_require__(8708),
    getPromiseForActiveRequest = _require.getPromiseForActiveRequest;

var _require2 = __webpack_require__(5989),
    createRequestDescriptor = _require2.createRequestDescriptor;

var _require3 = __webpack_require__(9797),
    areEqualSelectors = _require3.areEqualSelectors,
    createReaderSelector = _require3.createReaderSelector,
    getSelectorsFromObject = _require3.getSelectorsFromObject;
/**
 * A utility for resolving and subscribing to the results of a fragment spec
 * (key -> fragment mapping) given some "props" that determine the root ID
 * and variables to use when reading each fragment. When props are changed via
 * `setProps()`, the resolver will update its results and subscriptions
 * accordingly. Internally, the resolver:
 * - Converts the fragment map & props map into a map of `Selector`s.
 * - Removes any resolvers for any props that became null.
 * - Creates resolvers for any props that became non-null.
 * - Updates resolvers with the latest props.
 *
 * This utility is implemented as an imperative, stateful API for performance
 * reasons: reusing previous resolvers, callback functions, and subscriptions
 * all helps to reduce object allocation and thereby decrease GC time.
 *
 * The `resolve()` function is also lazy and memoized: changes in the store mark
 * the resolver as stale and notify the caller, and the actual results are
 * recomputed the first time `resolve()` is called.
 */


var RelayModernFragmentSpecResolver = /*#__PURE__*/function () {
  function RelayModernFragmentSpecResolver(context, fragments, props, callback, rootIsQueryRenderer) {
    var _this = this;

    (0, _defineProperty2["default"])(this, "_onChange", function () {
      _this._stale = true;

      if (typeof _this._callback === 'function') {
        _this._callback();
      }
    });
    this._callback = callback;
    this._context = context;
    this._data = {};
    this._fragments = fragments;
    this._props = {};
    this._resolvers = {};
    this._stale = false;
    this._rootIsQueryRenderer = rootIsQueryRenderer;
    this.setProps(props);
  }

  var _proto = RelayModernFragmentSpecResolver.prototype;

  _proto.dispose = function dispose() {
    for (var _key in this._resolvers) {
      if (this._resolvers.hasOwnProperty(_key)) {
        disposeCallback(this._resolvers[_key]);
      }
    }
  };

  _proto.resolve = function resolve() {
    if (this._stale) {
      // Avoid mapping the object multiple times, which could occur if data for
      // multiple keys changes in the same event loop.
      var prevData = this._data;
      var nextData;

      for (var _key2 in this._resolvers) {
        if (this._resolvers.hasOwnProperty(_key2)) {
          var resolver = this._resolvers[_key2];
          var prevItem = prevData[_key2];

          if (resolver) {
            var nextItem = resolver.resolve();

            if (nextData || nextItem !== prevItem) {
              nextData = nextData || (0, _objectSpread2["default"])({}, prevData);
              nextData[_key2] = nextItem;
            }
          } else {
            var prop = this._props[_key2];

            var _nextItem = prop !== undefined ? prop : null;

            if (nextData || !isScalarAndEqual(_nextItem, prevItem)) {
              nextData = nextData || (0, _objectSpread2["default"])({}, prevData);
              nextData[_key2] = _nextItem;
            }
          }
        }
      }

      this._data = nextData || prevData;
      this._stale = false;
    }

    return this._data;
  };

  _proto.setCallback = function setCallback(callback) {
    this._callback = callback;
  };

  _proto.setProps = function setProps(props) {
    var ownedSelectors = getSelectorsFromObject(this._fragments, props);
    this._props = {};

    for (var _key3 in ownedSelectors) {
      if (ownedSelectors.hasOwnProperty(_key3)) {
        var ownedSelector = ownedSelectors[_key3];
        var resolver = this._resolvers[_key3];

        if (ownedSelector == null) {
          if (resolver != null) {
            resolver.dispose();
          }

          resolver = null;
        } else if (ownedSelector.kind === 'PluralReaderSelector') {
          if (resolver == null) {
            resolver = new SelectorListResolver(this._context.environment, this._rootIsQueryRenderer, ownedSelector, this._onChange);
          } else {
            !(resolver instanceof SelectorListResolver) ?  false ? 0 : invariant(false) : void 0;
            resolver.setSelector(ownedSelector);
          }
        } else {
          if (resolver == null) {
            resolver = new SelectorResolver(this._context.environment, this._rootIsQueryRenderer, ownedSelector, this._onChange);
          } else {
            !(resolver instanceof SelectorResolver) ?  false ? 0 : invariant(false) : void 0;
            resolver.setSelector(ownedSelector);
          }
        }

        this._props[_key3] = props[_key3];
        this._resolvers[_key3] = resolver;
      }
    }

    this._stale = true;
  };

  _proto.setVariables = function setVariables(variables, request) {
    for (var _key4 in this._resolvers) {
      if (this._resolvers.hasOwnProperty(_key4)) {
        var resolver = this._resolvers[_key4];

        if (resolver) {
          resolver.setVariables(variables, request);
        }
      }
    }

    this._stale = true;
  };

  return RelayModernFragmentSpecResolver;
}();
/**
 * A resolver for a single Selector.
 */


var SelectorResolver = /*#__PURE__*/function () {
  function SelectorResolver(environment, rootIsQueryRenderer, selector, callback) {
    var _this2 = this;

    (0, _defineProperty2["default"])(this, "_onChange", function (snapshot) {
      _this2._data = snapshot.data;
      _this2._isMissingData = snapshot.isMissingData;
      _this2._missingRequiredFields = snapshot.missingRequiredFields;

      _this2._callback();
    });

    var _snapshot = environment.lookup(selector);

    this._callback = callback;
    this._data = _snapshot.data;
    this._isMissingData = _snapshot.isMissingData;
    this._missingRequiredFields = _snapshot.missingRequiredFields;
    this._environment = environment;
    this._rootIsQueryRenderer = rootIsQueryRenderer;
    this._selector = selector;
    this._subscription = environment.subscribe(_snapshot, this._onChange);
  }

  var _proto2 = SelectorResolver.prototype;

  _proto2.dispose = function dispose() {
    if (this._subscription) {
      this._subscription.dispose();

      this._subscription = null;
    }
  };

  _proto2.resolve = function resolve() {
    if (RelayFeatureFlags.ENABLE_RELAY_CONTAINERS_SUSPENSE === true && this._isMissingData === true) {
      var _getPromiseForActiveR; // NOTE: This branch exists to handle the case in which:
      // - A RelayModern container is rendered as a descendant of a Relay Hook
      //   root using a "partial" renderPolicy (this means that eargerly
      //   reading any cached data that is available instead of blocking
      //   at the root until the whole query is fetched).
      // - A parent Relay Hook didnt' suspend earlier on data being fetched,
      //   either because the fragment data for the parent was available, or
      //   the parent fragment didn't have any data dependencies.
      // Even though our Flow types reflect the possiblity of null data, there
      // might still be cases where it's not handled at runtime becuase the
      // Flow types are being ignored, or simply not being used (for example,
      // the case reported here: https://fburl.com/srnbucf8, was due to
      // misuse of Flow types here: https://fburl.com/g3m0mqqh).
      // Additionally, even though the null data might be handled without a
      // runtime error, we might not suspend when we intended to if a parent
      // Relay Hook (e.g. that is using @defer) decided not to suspend becuase
      // it's immediate data was already available (even if it was deferred),
      // or it didn't actually need any data (was just spreading other fragments).
      // This should eventually go away with something like @optional, where we only
      // suspend at specific boundaries depending on whether the boundary
      // can be fulfilled or not.


      var promise = (_getPromiseForActiveR = getPromiseForActiveRequest(this._environment, this._selector.owner)) !== null && _getPromiseForActiveR !== void 0 ? _getPromiseForActiveR : this._environment.getOperationTracker().getPromiseForPendingOperationsAffectingOwner(this._selector.owner);

      if (promise != null) {
        if (this._rootIsQueryRenderer) {
           false ? 0 : void 0;
        } else {
           false ? 0 : void 0;
          throw promise;
        }
      }
    }

    if (this._missingRequiredFields != null) {
      reportMissingRequiredFields(this._environment, this._missingRequiredFields);
    }

    return this._data;
  };

  _proto2.setSelector = function setSelector(selector) {
    if (this._subscription != null && areEqualSelectors(selector, this._selector)) {
      return;
    }

    this.dispose();

    var snapshot = this._environment.lookup(selector);

    this._data = snapshot.data;
    this._isMissingData = snapshot.isMissingData;
    this._missingRequiredFields = snapshot.missingRequiredFields;
    this._selector = selector;
    this._subscription = this._environment.subscribe(snapshot, this._onChange);
  };

  _proto2.setVariables = function setVariables(variables, request) {
    if (areEqual(variables, this._selector.variables)) {
      // If we're not actually setting new variables, we don't actually want
      // to create a new fragment owner, since areEqualSelectors relies on
      // owner identity.
      // In fact, we don't even need to try to attempt to set a new selector.
      // When fragment ownership is not enabled, setSelector will also bail
      // out since the selector doesn't really change, so we're doing it here
      // earlier.
      return;
    } // NOTE: We manually create the request descriptor here instead of
    // calling createOperationDescriptor() because we want to set a
    // descriptor with *unaltered* variables as the fragment owner.
    // This is a hack that allows us to preserve existing (broken)
    // behavior of RelayModern containers while using fragment ownership
    // to propagate variables instead of Context.
    // For more details, see the summary of D13999308


    var requestDescriptor = createRequestDescriptor(request, variables);
    var selector = createReaderSelector(this._selector.node, this._selector.dataID, variables, requestDescriptor);
    this.setSelector(selector);
  };

  return SelectorResolver;
}();
/**
 * A resolver for an array of Selectors.
 */


var SelectorListResolver = /*#__PURE__*/function () {
  function SelectorListResolver(environment, rootIsQueryRenderer, selector, callback) {
    var _this3 = this;

    (0, _defineProperty2["default"])(this, "_onChange", function (data) {
      _this3._stale = true;

      _this3._callback();
    });
    this._callback = callback;
    this._data = [];
    this._environment = environment;
    this._resolvers = [];
    this._stale = true;
    this._rootIsQueryRenderer = rootIsQueryRenderer;
    this.setSelector(selector);
  }

  var _proto3 = SelectorListResolver.prototype;

  _proto3.dispose = function dispose() {
    this._resolvers.forEach(disposeCallback);
  };

  _proto3.resolve = function resolve() {
    if (this._stale) {
      // Avoid mapping the array multiple times, which could occur if data for
      // multiple indices changes in the same event loop.
      var prevData = this._data;
      var nextData;

      for (var ii = 0; ii < this._resolvers.length; ii++) {
        var prevItem = prevData[ii];

        var nextItem = this._resolvers[ii].resolve();

        if (nextData || nextItem !== prevItem) {
          nextData = nextData || prevData.slice(0, ii);
          nextData.push(nextItem);
        }
      }

      if (!nextData && this._resolvers.length !== prevData.length) {
        nextData = prevData.slice(0, this._resolvers.length);
      }

      this._data = nextData || prevData;
      this._stale = false;
    }

    return this._data;
  };

  _proto3.setSelector = function setSelector(selector) {
    var selectors = selector.selectors;

    while (this._resolvers.length > selectors.length) {
      var resolver = this._resolvers.pop();

      resolver.dispose();
    }

    for (var ii = 0; ii < selectors.length; ii++) {
      if (ii < this._resolvers.length) {
        this._resolvers[ii].setSelector(selectors[ii]);
      } else {
        this._resolvers[ii] = new SelectorResolver(this._environment, this._rootIsQueryRenderer, selectors[ii], this._onChange);
      }
    }

    this._stale = true;
  };

  _proto3.setVariables = function setVariables(variables, request) {
    this._resolvers.forEach(function (resolver) {
      return resolver.setVariables(variables, request);
    });

    this._stale = true;
  };

  return SelectorListResolver;
}();

function disposeCallback(disposable) {
  disposable && disposable.dispose();
}

module.exports = RelayModernFragmentSpecResolver;

/***/ }),

/***/ 5989:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var deepFreeze = __webpack_require__(5274);

var getRequestIdentifier = __webpack_require__(3928);

var _require = __webpack_require__(477),
    getOperationVariables = _require.getOperationVariables;

var _require2 = __webpack_require__(9797),
    createNormalizationSelector = _require2.createNormalizationSelector,
    createReaderSelector = _require2.createReaderSelector;

var _require3 = __webpack_require__(880),
    ROOT_ID = _require3.ROOT_ID;
/**
 * Creates an instance of the `OperationDescriptor` type defined in
 * `RelayStoreTypes` given an operation and some variables. The input variables
 * are filtered to exclude variables that do not match defined arguments on the
 * operation, and default values are populated for null values.
 */


function createOperationDescriptor(request, variables, cacheConfig) {
  var dataID = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ROOT_ID;
  var operation = request.operation;
  var operationVariables = getOperationVariables(operation, variables);
  var requestDescriptor = createRequestDescriptor(request, operationVariables, cacheConfig);
  var operationDescriptor = {
    fragment: createReaderSelector(request.fragment, dataID, operationVariables, requestDescriptor),
    request: requestDescriptor,
    root: createNormalizationSelector(operation, dataID, operationVariables)
  };

  if (false) {}

  return operationDescriptor;
}

function createRequestDescriptor(request, variables, cacheConfig) {
  var requestDescriptor = {
    identifier: getRequestIdentifier(request.params, variables),
    node: request,
    variables: variables,
    cacheConfig: cacheConfig
  };

  if (false) {}

  return requestDescriptor;
}

module.exports = {
  createOperationDescriptor: createOperationDescriptor,
  createRequestDescriptor: createRequestDescriptor
};

/***/ }),

/***/ 2944:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _typeof = __webpack_require__(3634);

var _interopRequireDefault = __webpack_require__(249);

var _objectSpread2 = _interopRequireDefault(__webpack_require__(4638));

var areEqual = __webpack_require__(9074);

var deepFreeze = __webpack_require__(5274);

var invariant = __webpack_require__(4990);

var warning = __webpack_require__(480);

var _require = __webpack_require__(5057),
    isClientID = _require.isClientID;

var _require2 = __webpack_require__(880),
    ID_KEY = _require2.ID_KEY,
    REF_KEY = _require2.REF_KEY,
    REFS_KEY = _require2.REFS_KEY,
    TYPENAME_KEY = _require2.TYPENAME_KEY,
    INVALIDATED_AT_KEY = _require2.INVALIDATED_AT_KEY,
    ROOT_ID = _require2.ROOT_ID;
/**
 * @public
 *
 * Low-level record manipulation methods.
 *
 * A note about perf: we use long-hand property access rather than computed
 * properties in this file for speed ie.
 *
 *    const object = {};
 *    object[KEY] = value;
 *    record[storageKey] = object;
 *
 * instead of:
 *
 *    record[storageKey] = {
 *      [KEY]: value,
 *    };
 *
 * The latter gets transformed by Babel into something like:
 *
 *    function _defineProperty(obj, key, value) {
 *      if (key in obj) {
 *        Object.defineProperty(obj, key, {
 *          value: value,
 *          enumerable: true,
 *          configurable: true,
 *          writable: true,
 *        });
 *      } else {
 *        obj[key] = value;
 *      }
 *      return obj;
 *    }
 *
 *    record[storageKey] = _defineProperty({}, KEY, value);
 *
 * A quick benchmark shows that computed property access is an order of
 * magnitude slower (times in seconds for 100,000 iterations):
 *
 *               best     avg     sd
 *    computed 0.02175 0.02292 0.00113
 *      manual 0.00110 0.00123 0.00008
 */

/**
 * @public
 *
 * Clone a record.
 */


function clone(record) {
  return (0, _objectSpread2["default"])({}, record);
}
/**
 * @public
 *
 * Copies all fields from `source` to `sink`, excluding `__id` and `__typename`.
 *
 * NOTE: This function does not treat `id` specially. To preserve the id,
 * manually reset it after calling this function. Also note that values are
 * copied by reference and not value; callers should ensure that values are
 * copied on write.
 */


function copyFields(source, sink) {
  for (var key in source) {
    if (source.hasOwnProperty(key)) {
      if (key !== ID_KEY && key !== TYPENAME_KEY) {
        sink[key] = source[key];
      }
    }
  }
}
/**
 * @public
 *
 * Create a new record.
 */


function create(dataID, typeName) {
  // See perf note above for why we aren't using computed property access.
  var record = {};
  record[ID_KEY] = dataID;
  record[TYPENAME_KEY] = typeName;
  return record;
}
/**
 * @public
 *
 * Get the record's `id` if available or the client-generated identifier.
 */


function getDataID(record) {
  return record[ID_KEY];
}
/**
 * @public
 *
 * Get the concrete type of the record.
 */


function getType(record) {
  return record[TYPENAME_KEY];
}
/**
 * @public
 *
 * Get a scalar (non-link) field value.
 */


function getValue(record, storageKey) {
  var value = record[storageKey];

  if (value && _typeof(value) === 'object') {
    !(!value.hasOwnProperty(REF_KEY) && !value.hasOwnProperty(REFS_KEY)) ?  false ? 0 : invariant(false) : void 0;
  }

  return value;
}
/**
 * @public
 *
 * Get the value of a field as a reference to another record. Throws if the
 * field has a different type.
 */


function getLinkedRecordID(record, storageKey) {
  var link = record[storageKey];

  if (link == null) {
    return link;
  }

  !(_typeof(link) === 'object' && link && typeof link[REF_KEY] === 'string') ?  false ? 0 : invariant(false) : void 0;
  return link[REF_KEY];
}
/**
 * @public
 *
 * Get the value of a field as a list of references to other records. Throws if
 * the field has a different type.
 */


function getLinkedRecordIDs(record, storageKey) {
  var links = record[storageKey];

  if (links == null) {
    return links;
  }

  !(_typeof(links) === 'object' && Array.isArray(links[REFS_KEY])) ?  false ? 0 : invariant(false) : void 0; // assume items of the array are ids

  return links[REFS_KEY];
}
/**
 * @public
 *
 * Returns the epoch at which the record was invalidated, if it
 * ever was; otherwise returns null;
 */


function getInvalidationEpoch(record) {
  if (record == null) {
    return null;
  }

  var invalidatedAt = record[INVALIDATED_AT_KEY];

  if (typeof invalidatedAt !== 'number') {
    // If the record has never been invalidated, it isn't stale.
    return null;
  }

  return invalidatedAt;
}
/**
 * @public
 *
 * Compares the fields of a previous and new record, returning either the
 * previous record if all fields are equal or a new record (with merged fields)
 * if any fields have changed.
 */


function update(prevRecord, nextRecord) {
  if (false) { var nextType, prevType, nextID, prevID, _getType, _getType2; }

  var updated = null;
  var keys = Object.keys(nextRecord);

  for (var ii = 0; ii < keys.length; ii++) {
    var key = keys[ii];

    if (updated || !areEqual(prevRecord[key], nextRecord[key])) {
      updated = updated !== null ? updated : (0, _objectSpread2["default"])({}, prevRecord);
      updated[key] = nextRecord[key];
    }
  }

  return updated !== null ? updated : prevRecord;
}
/**
 * @public
 *
 * Returns a new record with the contents of the given records. Fields in the
 * second record will overwrite identical fields in the first record.
 */


function merge(record1, record2) {
  if (false) { var nextType, prevType, nextID, prevID, _getType3, _getType4; }

  return Object.assign({}, record1, record2);
}
/**
 * @public
 *
 * Prevent modifications to the record. Attempts to call `set*` functions on a
 * frozen record will fatal at runtime.
 */


function freeze(record) {
  deepFreeze(record);
}
/**
 * @public
 *
 * Set the value of a storageKey to a scalar.
 */


function setValue(record, storageKey, value) {
  if (false) { var nextType, prevType, _getType5, prevID; }

  record[storageKey] = value;
}
/**
 * @public
 *
 * Set the value of a field to a reference to another record.
 */


function setLinkedRecordID(record, storageKey, linkedID) {
  // See perf note above for why we aren't using computed property access.
  var link = {};
  link[REF_KEY] = linkedID;
  record[storageKey] = link;
}
/**
 * @public
 *
 * Set the value of a field to a list of references other records.
 */


function setLinkedRecordIDs(record, storageKey, linkedIDs) {
  // See perf note above for why we aren't using computed property access.
  var links = {};
  links[REFS_KEY] = linkedIDs;
  record[storageKey] = links;
}

module.exports = {
  clone: clone,
  copyFields: copyFields,
  create: create,
  freeze: freeze,
  getDataID: getDataID,
  getInvalidationEpoch: getInvalidationEpoch,
  getLinkedRecordID: getLinkedRecordID,
  getLinkedRecordIDs: getLinkedRecordIDs,
  getType: getType,
  getValue: getValue,
  merge: merge,
  setValue: setValue,
  setLinkedRecordID: setLinkedRecordID,
  setLinkedRecordIDs: setLinkedRecordIDs,
  update: update
};

/***/ }),

/***/ 9797:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _typeof = __webpack_require__(3634);

var areEqual = __webpack_require__(9074);

var invariant = __webpack_require__(4990);

var warning = __webpack_require__(480);

var _require = __webpack_require__(477),
    getFragmentVariables = _require.getFragmentVariables;

var _require2 = __webpack_require__(880),
    FRAGMENT_OWNER_KEY = _require2.FRAGMENT_OWNER_KEY,
    FRAGMENTS_KEY = _require2.FRAGMENTS_KEY,
    ID_KEY = _require2.ID_KEY,
    IS_WITHIN_UNMATCHED_TYPE_REFINEMENT = _require2.IS_WITHIN_UNMATCHED_TYPE_REFINEMENT;
/**
 * @public
 *
 * Given the result `item` from a parent that fetched `fragment`, creates a
 * selector that can be used to read the results of that fragment for that item.
 *
 * Example:
 *
 * Given two fragments as follows:
 *
 * ```
 * fragment Parent on User {
 *   id
 *   ...Child
 * }
 * fragment Child on User {
 *   name
 * }
 * ```
 *
 * And given some object `parent` that is the results of `Parent` for id "4",
 * the results of `Child` can be accessed by first getting a selector and then
 * using that selector to `lookup()` the results against the environment:
 *
 * ```
 * const childSelector = getSingularSelector(queryVariables, Child, parent);
 * const childData = environment.lookup(childSelector).data;
 * ```
 */


function getSingularSelector(fragment, item) {
  !(_typeof(item) === 'object' && item !== null && !Array.isArray(item)) ?  false ? 0 : invariant(false) : void 0;
  var dataID = item[ID_KEY];
  var fragments = item[FRAGMENTS_KEY];
  var mixedOwner = item[FRAGMENT_OWNER_KEY];
  var isWithinUnmatchedTypeRefinement = item[IS_WITHIN_UNMATCHED_TYPE_REFINEMENT] === true;

  if (typeof dataID === 'string' && _typeof(fragments) === 'object' && fragments !== null && _typeof(fragments[fragment.name]) === 'object' && fragments[fragment.name] !== null && _typeof(mixedOwner) === 'object' && mixedOwner !== null) {
    var owner = mixedOwner;
    var argumentVariables = fragments[fragment.name];
    var fragmentVariables = getFragmentVariables(fragment, owner.variables, argumentVariables);
    return createReaderSelector(fragment, dataID, fragmentVariables, owner, isWithinUnmatchedTypeRefinement);
  }

  if (false) { var stringifiedItem; }

  return null;
}
/**
 * @public
 *
 * Given the result `items` from a parent that fetched `fragment`, creates a
 * selector that can be used to read the results of that fragment on those
 * items. This is similar to `getSingularSelector` but for "plural" fragments that
 * expect an array of results and therefore return an array of selectors.
 */


function getPluralSelector(fragment, items) {
  var selectors = null;
  items.forEach(function (item, ii) {
    var selector = item != null ? getSingularSelector(fragment, item) : null;

    if (selector != null) {
      selectors = selectors || [];
      selectors.push(selector);
    }
  });

  if (selectors == null) {
    return null;
  } else {
    return {
      kind: 'PluralReaderSelector',
      selectors: selectors
    };
  }
}

function getSelector(fragment, item) {
  if (item == null) {
    return item;
  } else if (fragment.metadata && fragment.metadata.plural === true) {
    !Array.isArray(item) ?  false ? 0 : invariant(false) : void 0;
    return getPluralSelector(fragment, item);
  } else {
    !!Array.isArray(item) ?  false ? 0 : invariant(false) : void 0;
    return getSingularSelector(fragment, item);
  }
}
/**
 * @public
 *
 * Given a mapping of keys -> results and a mapping of keys -> fragments,
 * extracts the selectors for those fragments from the results.
 *
 * The canonical use-case for this function is ReactRelayFragmentContainer, which
 * uses this function to convert (props, fragments) into selectors so that it
 * can read the results to pass to the inner component.
 */


function getSelectorsFromObject(fragments, object) {
  var selectors = {};

  for (var _key in fragments) {
    if (fragments.hasOwnProperty(_key)) {
      var fragment = fragments[_key];
      var item = object[_key];
      selectors[_key] = getSelector(fragment, item);
    }
  }

  return selectors;
}
/**
 * @public
 *
 * Given a mapping of keys -> results and a mapping of keys -> fragments,
 * extracts a mapping of keys -> id(s) of the results.
 *
 * Similar to `getSelectorsFromObject()`, this function can be useful in
 * determining the "identity" of the props passed to a component.
 */


function getDataIDsFromObject(fragments, object) {
  var ids = {};

  for (var _key2 in fragments) {
    if (fragments.hasOwnProperty(_key2)) {
      var fragment = fragments[_key2];
      var item = object[_key2];
      ids[_key2] = getDataIDsFromFragment(fragment, item);
    }
  }

  return ids;
}

function getDataIDsFromFragment(fragment, item) {
  if (item == null) {
    return item;
  } else if (fragment.metadata && fragment.metadata.plural === true) {
    !Array.isArray(item) ?  false ? 0 : invariant(false) : void 0;
    return getDataIDs(fragment, item);
  } else {
    !!Array.isArray(item) ?  false ? 0 : invariant(false) : void 0;
    return getDataID(fragment, item);
  }
}
/**
 * @internal
 */


function getDataIDs(fragment, items) {
  var ids = null;
  items.forEach(function (item) {
    var id = item != null ? getDataID(fragment, item) : null;

    if (id != null) {
      ids = ids || [];
      ids.push(id);
    }
  });
  return ids;
}
/**
 * @internal
 */


function getDataID(fragment, item) {
  !(_typeof(item) === 'object' && item !== null && !Array.isArray(item)) ?  false ? 0 : invariant(false) : void 0;
  var dataID = item[ID_KEY];

  if (typeof dataID === 'string') {
    return dataID;
  }

   false ? 0 : void 0;
  return null;
}
/**
 * @public
 *
 * Given a mapping of keys -> results and a mapping of keys -> fragments,
 * extracts the merged variables that would be in scope for those
 * fragments/results.
 *
 * This can be useful in determing what varaibles were used to fetch the data
 * for a Relay container, for example.
 */


function getVariablesFromObject(fragments, object) {
  var variables = {};

  for (var _key3 in fragments) {
    if (fragments.hasOwnProperty(_key3)) {
      var fragment = fragments[_key3];
      var item = object[_key3];
      var itemVariables = getVariablesFromFragment(fragment, item);
      Object.assign(variables, itemVariables);
    }
  }

  return variables;
}

function getVariablesFromFragment(fragment, item) {
  var _fragment$metadata;

  if (item == null) {
    return {};
  } else if (((_fragment$metadata = fragment.metadata) === null || _fragment$metadata === void 0 ? void 0 : _fragment$metadata.plural) === true) {
    !Array.isArray(item) ?  false ? 0 : invariant(false) : void 0;
    return getVariablesFromPluralFragment(fragment, item);
  } else {
    !!Array.isArray(item) ?  false ? 0 : invariant(false) : void 0;
    return getVariablesFromSingularFragment(fragment, item) || {};
  }
}

function getVariablesFromSingularFragment(fragment, item) {
  var selector = getSingularSelector(fragment, item);

  if (!selector) {
    return null;
  }

  return selector.variables;
}

function getVariablesFromPluralFragment(fragment, items) {
  var variables = {};
  items.forEach(function (value, ii) {
    if (value != null) {
      var itemVariables = getVariablesFromSingularFragment(fragment, value);

      if (itemVariables != null) {
        Object.assign(variables, itemVariables);
      }
    }
  });
  return variables;
}
/**
 * @public
 *
 * Determine if two selectors are equal (represent the same selection). Note
 * that this function returns `false` when the two queries/fragments are
 * different objects, even if they select the same fields.
 */


function areEqualSelectors(thisSelector, thatSelector) {
  return thisSelector.owner === thatSelector.owner && thisSelector.dataID === thatSelector.dataID && thisSelector.node === thatSelector.node && areEqual(thisSelector.variables, thatSelector.variables);
}

function createReaderSelector(fragment, dataID, variables, request) {
  var isWithinUnmatchedTypeRefinement = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  return {
    kind: 'SingularReaderSelector',
    dataID: dataID,
    isWithinUnmatchedTypeRefinement: isWithinUnmatchedTypeRefinement,
    node: fragment,
    variables: variables,
    owner: request
  };
}

function createNormalizationSelector(node, dataID, variables) {
  return {
    dataID: dataID,
    node: node,
    variables: variables
  };
}

module.exports = {
  areEqualSelectors: areEqualSelectors,
  createReaderSelector: createReaderSelector,
  createNormalizationSelector: createNormalizationSelector,
  getDataIDsFromFragment: getDataIDsFromFragment,
  getDataIDsFromObject: getDataIDsFromObject,
  getSingularSelector: getSingularSelector,
  getPluralSelector: getPluralSelector,
  getSelector: getSelector,
  getSelectorsFromObject: getSelectorsFromObject,
  getVariablesFromSingularFragment: getVariablesFromSingularFragment,
  getVariablesFromPluralFragment: getVariablesFromPluralFragment,
  getVariablesFromFragment: getVariablesFromFragment,
  getVariablesFromObject: getVariablesFromObject
};

/***/ }),

/***/ 3127:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _regeneratorRuntime = __webpack_require__(5776);

var _interopRequireDefault = __webpack_require__(249);

var _createForOfIteratorHelper2 = _interopRequireDefault(__webpack_require__(8629));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3116));

var DataChecker = __webpack_require__(625);

var RelayFeatureFlags = __webpack_require__(1054);

var RelayModernRecord = __webpack_require__(2944);

var RelayOptimisticRecordSource = __webpack_require__(2486);

var RelayReader = __webpack_require__(2988);

var RelayReferenceMarker = __webpack_require__(1735);

var RelayStoreReactFlightUtils = __webpack_require__(4108);

var RelayStoreSubscriptions = __webpack_require__(3540);

var RelayStoreSubscriptionsUsingMapByID = __webpack_require__(7570);

var RelayStoreUtils = __webpack_require__(880);

var deepFreeze = __webpack_require__(5274);

var defaultGetDataID = __webpack_require__(7146);

var invariant = __webpack_require__(4990);

var resolveImmediate = __webpack_require__(3182);

var _require = __webpack_require__(880),
    ROOT_ID = _require.ROOT_ID,
    ROOT_TYPE = _require.ROOT_TYPE;

var DEFAULT_RELEASE_BUFFER_SIZE = 10;
/**
 * @public
 *
 * An implementation of the `Store` interface defined in `RelayStoreTypes`.
 *
 * Note that a Store takes ownership of all records provided to it: other
 * objects may continue to hold a reference to such records but may not mutate
 * them. The static Relay core is architected to avoid mutating records that may have been
 * passed to a store: operations that mutate records will either create fresh
 * records or clone existing records and modify the clones. Record immutability
 * is also enforced in development mode by freezing all records passed to a store.
 */

var RelayModernStore = /*#__PURE__*/function () {
  function RelayModernStore(source, options) {
    var _this = this;

    var _options$gcReleaseBuf, _options$gcScheduler, _options$getDataID, _options$log, _options$operationLoa;

    (0, _defineProperty2["default"])(this, "_gcStep", function () {
      if (_this._gcRun) {
        if (_this._gcRun.next().done) {
          _this._gcRun = null;
        } else {
          _this._gcScheduler(_this._gcStep);
        }
      }
    }); // Prevent mutation of a record from outside the store.

    if (false) { var record, ii, storeIDs; }

    this._currentWriteEpoch = 0;
    this._gcHoldCounter = 0;
    this._gcReleaseBufferSize = (_options$gcReleaseBuf = options === null || options === void 0 ? void 0 : options.gcReleaseBufferSize) !== null && _options$gcReleaseBuf !== void 0 ? _options$gcReleaseBuf : DEFAULT_RELEASE_BUFFER_SIZE;
    this._gcRun = null;
    this._gcScheduler = (_options$gcScheduler = options === null || options === void 0 ? void 0 : options.gcScheduler) !== null && _options$gcScheduler !== void 0 ? _options$gcScheduler : resolveImmediate;
    this._getDataID = (_options$getDataID = options === null || options === void 0 ? void 0 : options.getDataID) !== null && _options$getDataID !== void 0 ? _options$getDataID : defaultGetDataID;
    this._globalInvalidationEpoch = null;
    this._invalidationSubscriptions = new Set();
    this._invalidatedRecordIDs = new Set();
    this.__log = (_options$log = options === null || options === void 0 ? void 0 : options.log) !== null && _options$log !== void 0 ? _options$log : null;
    this._queryCacheExpirationTime = options === null || options === void 0 ? void 0 : options.queryCacheExpirationTime;
    this._operationLoader = (_options$operationLoa = options === null || options === void 0 ? void 0 : options.operationLoader) !== null && _options$operationLoa !== void 0 ? _options$operationLoa : null;
    this._optimisticSource = null;
    this._recordSource = source;
    this._releaseBuffer = [];
    this._roots = new Map();
    this._shouldScheduleGC = false;
    this._storeSubscriptions = RelayFeatureFlags.ENABLE_STORE_SUBSCRIPTIONS_REFACTOR === true ? new RelayStoreSubscriptionsUsingMapByID(options === null || options === void 0 ? void 0 : options.log) : new RelayStoreSubscriptions(options === null || options === void 0 ? void 0 : options.log);
    this._updatedRecordIDs = new Set();
    this._shouldProcessClientComponents = options === null || options === void 0 ? void 0 : options.shouldProcessClientComponents;
    initializeRecordSource(this._recordSource);
  }

  var _proto = RelayModernStore.prototype;

  _proto.getSource = function getSource() {
    var _this$_optimisticSour;

    return (_this$_optimisticSour = this._optimisticSource) !== null && _this$_optimisticSour !== void 0 ? _this$_optimisticSour : this._recordSource;
  };

  _proto.check = function check(operation, options) {
    var _this$_optimisticSour2, _options$target, _options$handlers;

    var selector = operation.root;
    var source = (_this$_optimisticSour2 = this._optimisticSource) !== null && _this$_optimisticSour2 !== void 0 ? _this$_optimisticSour2 : this._recordSource;
    var globalInvalidationEpoch = this._globalInvalidationEpoch;

    var rootEntry = this._roots.get(operation.request.identifier);

    var operationLastWrittenAt = rootEntry != null ? rootEntry.epoch : null; // Check if store has been globally invalidated

    if (globalInvalidationEpoch != null) {
      // If so, check if the operation we're checking was last written
      // before or after invalidation occured.
      if (operationLastWrittenAt == null || operationLastWrittenAt <= globalInvalidationEpoch) {
        // If the operation was written /before/ global invalidation occurred,
        // or if this operation has never been written to the store before,
        // we will consider the data for this operation to be stale
        // (i.e. not resolvable from the store).
        return {
          status: 'stale'
        };
      }
    }

    var target = (_options$target = options === null || options === void 0 ? void 0 : options.target) !== null && _options$target !== void 0 ? _options$target : source;
    var handlers = (_options$handlers = options === null || options === void 0 ? void 0 : options.handlers) !== null && _options$handlers !== void 0 ? _options$handlers : [];
    var operationAvailability = DataChecker.check(source, target, selector, handlers, this._operationLoader, this._getDataID, this._shouldProcessClientComponents);
    return getAvailabilityStatus(operationAvailability, operationLastWrittenAt, rootEntry === null || rootEntry === void 0 ? void 0 : rootEntry.fetchTime, this._queryCacheExpirationTime);
  };

  _proto.retain = function retain(operation) {
    var _this2 = this;

    var id = operation.request.identifier;
    var disposed = false;

    var dispose = function dispose() {
      // Ensure each retain can only dispose once
      if (disposed) {
        return;
      }

      disposed = true; // For Flow: guard against the entry somehow not existing

      var rootEntry = _this2._roots.get(id);

      if (rootEntry == null) {
        return;
      } // Decrement the ref count: if it becomes zero it is eligible
      // for release.


      rootEntry.refCount--;

      if (rootEntry.refCount === 0) {
        var _queryCacheExpirationTime = _this2._queryCacheExpirationTime;

        var rootEntryIsStale = rootEntry.fetchTime != null && _queryCacheExpirationTime != null && rootEntry.fetchTime <= Date.now() - _queryCacheExpirationTime;

        if (rootEntryIsStale) {
          _this2._roots["delete"](id);

          _this2.scheduleGC();
        } else {
          _this2._releaseBuffer.push(id); // If the release buffer is now over-full, remove the least-recently
          // added entry and schedule a GC. Note that all items in the release
          // buffer have a refCount of 0.


          if (_this2._releaseBuffer.length > _this2._gcReleaseBufferSize) {
            var _id = _this2._releaseBuffer.shift();

            _this2._roots["delete"](_id);

            _this2.scheduleGC();
          }
        }
      }
    };

    var rootEntry = this._roots.get(id);

    if (rootEntry != null) {
      if (rootEntry.refCount === 0) {
        // This entry should be in the release buffer, but it no longer belongs
        // there since it's retained. Remove it to maintain the invariant that
        // all release buffer entries have a refCount of 0.
        this._releaseBuffer = this._releaseBuffer.filter(function (_id) {
          return _id !== id;
        });
      } // If we've previously retained this operation, increment the refCount


      rootEntry.refCount += 1;
    } else {
      // Otherwise create a new entry for the operation
      this._roots.set(id, {
        operation: operation,
        refCount: 1,
        epoch: null,
        fetchTime: null
      });
    }

    return {
      dispose: dispose
    };
  };

  _proto.lookup = function lookup(selector) {
    var source = this.getSource();
    var snapshot = RelayReader.read(source, selector);

    if (false) {}

    return snapshot;
  } // This method will return a list of updated owners from the subscriptions
  ;

  _proto.notify = function notify(sourceOperation, invalidateStore) {
    var _this3 = this;

    var log = this.__log;

    if (log != null) {
      log({
        name: 'store.notify.start',
        sourceOperation: sourceOperation
      });
    } // Increment the current write when notifying after executing
    // a set of changes to the store.


    this._currentWriteEpoch++;

    if (invalidateStore === true) {
      this._globalInvalidationEpoch = this._currentWriteEpoch;
    }

    var source = this.getSource();
    var updatedOwners = [];

    this._storeSubscriptions.updateSubscriptions(source, this._updatedRecordIDs, updatedOwners, sourceOperation);

    this._invalidationSubscriptions.forEach(function (subscription) {
      _this3._updateInvalidationSubscription(subscription, invalidateStore === true);
    });

    if (log != null) {
      log({
        name: 'store.notify.complete',
        sourceOperation: sourceOperation,
        updatedRecordIDs: this._updatedRecordIDs,
        invalidatedRecordIDs: this._invalidatedRecordIDs
      });
    }

    this._updatedRecordIDs.clear();

    this._invalidatedRecordIDs.clear(); // If a source operation was provided (indicating the operation
    // that produced this update to the store), record the current epoch
    // at which this operation was written.


    if (sourceOperation != null) {
      // We only track the epoch at which the operation was written if
      // it was previously retained, to keep the size of our operation
      // epoch map bounded. If a query wasn't retained, we assume it can
      // may be deleted at any moment and thus is not relevant for us to track
      // for the purposes of invalidation.
      var id = sourceOperation.request.identifier;

      var rootEntry = this._roots.get(id);

      if (rootEntry != null) {
        rootEntry.epoch = this._currentWriteEpoch;
        rootEntry.fetchTime = Date.now();
      } else if (sourceOperation.request.node.params.operationKind === 'query' && this._gcReleaseBufferSize > 0 && this._releaseBuffer.length < this._gcReleaseBufferSize) {
        // The operation isn't retained but there is space in the release buffer:
        // temporarily track this operation in case the data can be reused soon.
        var temporaryRootEntry = {
          operation: sourceOperation,
          refCount: 0,
          epoch: this._currentWriteEpoch,
          fetchTime: Date.now()
        };

        this._releaseBuffer.push(id);

        this._roots.set(id, temporaryRootEntry);
      }
    }

    return updatedOwners;
  };

  _proto.publish = function publish(source, idsMarkedForInvalidation) {
    var _this$_optimisticSour3;

    var target = (_this$_optimisticSour3 = this._optimisticSource) !== null && _this$_optimisticSour3 !== void 0 ? _this$_optimisticSour3 : this._recordSource;
    updateTargetFromSource(target, source, // We increment the current epoch at the end of the set of updates,
    // in notify(). Here, we pass what will be the incremented value of
    // the epoch to use to write to invalidated records.
    this._currentWriteEpoch + 1, idsMarkedForInvalidation, this._updatedRecordIDs, this._invalidatedRecordIDs); // NOTE: log *after* processing the source so that even if a bad log function
    // mutates the source, it doesn't affect Relay processing of it.

    var log = this.__log;

    if (log != null) {
      log({
        name: 'store.publish',
        source: source,
        optimistic: target === this._optimisticSource
      });
    }
  };

  _proto.subscribe = function subscribe(snapshot, callback) {
    return this._storeSubscriptions.subscribe(snapshot, callback);
  };

  _proto.holdGC = function holdGC() {
    var _this4 = this;

    if (this._gcRun) {
      this._gcRun = null;
      this._shouldScheduleGC = true;
    }

    this._gcHoldCounter++;

    var dispose = function dispose() {
      if (_this4._gcHoldCounter > 0) {
        _this4._gcHoldCounter--;

        if (_this4._gcHoldCounter === 0 && _this4._shouldScheduleGC) {
          _this4.scheduleGC();

          _this4._shouldScheduleGC = false;
        }
      }
    };

    return {
      dispose: dispose
    };
  };

  _proto.toJSON = function toJSON() {
    return 'RelayModernStore()';
  } // Internal API
  ;

  _proto.__getUpdatedRecordIDs = function __getUpdatedRecordIDs() {
    return this._updatedRecordIDs;
  };

  _proto.lookupInvalidationState = function lookupInvalidationState(dataIDs) {
    var _this5 = this;

    var invalidations = new Map();
    dataIDs.forEach(function (dataID) {
      var _RelayModernRecord$ge;

      var record = _this5.getSource().get(dataID);

      invalidations.set(dataID, (_RelayModernRecord$ge = RelayModernRecord.getInvalidationEpoch(record)) !== null && _RelayModernRecord$ge !== void 0 ? _RelayModernRecord$ge : null);
    });
    invalidations.set('global', this._globalInvalidationEpoch);
    return {
      dataIDs: dataIDs,
      invalidations: invalidations
    };
  };

  _proto.checkInvalidationState = function checkInvalidationState(prevInvalidationState) {
    var latestInvalidationState = this.lookupInvalidationState(prevInvalidationState.dataIDs);
    var currentInvalidations = latestInvalidationState.invalidations;
    var prevInvalidations = prevInvalidationState.invalidations; // Check if global invalidation has changed

    if (currentInvalidations.get('global') !== prevInvalidations.get('global')) {
      return true;
    } // Check if the invalidation state for any of the ids has changed.


    var _iterator = (0, _createForOfIteratorHelper2["default"])(prevInvalidationState.dataIDs),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var dataID = _step.value;

        if (currentInvalidations.get(dataID) !== prevInvalidations.get(dataID)) {
          return true;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return false;
  };

  _proto.subscribeToInvalidationState = function subscribeToInvalidationState(invalidationState, callback) {
    var _this6 = this;

    var subscription = {
      callback: callback,
      invalidationState: invalidationState
    };

    var dispose = function dispose() {
      _this6._invalidationSubscriptions["delete"](subscription);
    };

    this._invalidationSubscriptions.add(subscription);

    return {
      dispose: dispose
    };
  };

  _proto._updateInvalidationSubscription = function _updateInvalidationSubscription(subscription, invalidatedStore) {
    var _this7 = this;

    var callback = subscription.callback,
        invalidationState = subscription.invalidationState;
    var dataIDs = invalidationState.dataIDs;
    var isSubscribedToInvalidatedIDs = invalidatedStore || dataIDs.some(function (dataID) {
      return _this7._invalidatedRecordIDs.has(dataID);
    });

    if (!isSubscribedToInvalidatedIDs) {
      return;
    }

    callback();
  };

  _proto.snapshot = function snapshot() {
    !(this._optimisticSource == null) ?  false ? 0 : invariant(false) : void 0;
    var log = this.__log;

    if (log != null) {
      log({
        name: 'store.snapshot'
      });
    }

    this._storeSubscriptions.snapshotSubscriptions(this.getSource());

    if (this._gcRun) {
      this._gcRun = null;
      this._shouldScheduleGC = true;
    }

    this._optimisticSource = RelayOptimisticRecordSource.create(this.getSource());
  };

  _proto.restore = function restore() {
    !(this._optimisticSource != null) ?  false ? 0 : invariant(false) : void 0;
    var log = this.__log;

    if (log != null) {
      log({
        name: 'store.restore'
      });
    }

    this._optimisticSource = null;

    if (this._shouldScheduleGC) {
      this.scheduleGC();
    }

    this._storeSubscriptions.restoreSubscriptions();
  };

  _proto.scheduleGC = function scheduleGC() {
    if (this._gcHoldCounter > 0) {
      this._shouldScheduleGC = true;
      return;
    }

    if (this._gcRun) {
      return;
    }

    this._gcRun = this._collect();

    this._gcScheduler(this._gcStep);
  }
  /**
   * Run a full GC synchronously.
   */
  ;

  _proto.__gc = function __gc() {
    // Don't run GC while there are optimistic updates applied
    if (this._optimisticSource != null) {
      return;
    }

    var gcRun = this._collect();

    while (!gcRun.next().done) {}
  };

  _proto._collect = /*#__PURE__*/_regeneratorRuntime.mark(function _collect() {
    var startEpoch, references, _iterator2, _step2, operation, selector, log, storeIDs, ii, dataID;

    return _regeneratorRuntime.wrap(function _collect$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (false) {}

            startEpoch = this._currentWriteEpoch;
            references = new Set(); // Mark all records that are traversable from a root

            _iterator2 = (0, _createForOfIteratorHelper2["default"])(this._roots.values());
            _context.prev = 4;

            _iterator2.s();

          case 6:
            if ((_step2 = _iterator2.n()).done) {
              _context.next = 16;
              break;
            }

            operation = _step2.value.operation;
            selector = operation.root;
            RelayReferenceMarker.mark(this._recordSource, selector, references, this._operationLoader, this._shouldProcessClientComponents); // Yield for other work after each operation

            _context.next = 12;
            return;

          case 12:
            if (!(startEpoch !== this._currentWriteEpoch)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("continue", 0);

          case 14:
            _context.next = 6;
            break;

          case 16:
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](4);

            _iterator2.e(_context.t0);

          case 21:
            _context.prev = 21;

            _iterator2.f();

            return _context.finish(21);

          case 24:
            log = this.__log;

            if (log != null) {
              log({
                name: 'store.gc',
                references: references
              });
            } // Sweep records without references


            if (references.size === 0) {
              // Short-circuit if *nothing* is referenced
              this._recordSource.clear();
            } else {
              // Evict any unreferenced nodes
              storeIDs = this._recordSource.getRecordIDs();

              for (ii = 0; ii < storeIDs.length; ii++) {
                dataID = storeIDs[ii];

                if (!references.has(dataID)) {
                  this._recordSource.remove(dataID);
                }
              }
            }

            return _context.abrupt("return");

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _collect, this, [[4, 18, 21, 24]]);
  });
  return RelayModernStore;
}();

function initializeRecordSource(target) {
  if (!target.has(ROOT_ID)) {
    var rootRecord = RelayModernRecord.create(ROOT_ID, ROOT_TYPE);
    target.set(ROOT_ID, rootRecord);
  }
}
/**
 * Updates the target with information from source, also updating a mapping of
 * which records in the target were changed as a result.
 * Additionally, will mark records as invalidated at the current write epoch
 * given the set of record ids marked as stale in this update.
 */


function updateTargetFromSource(target, source, currentWriteEpoch, idsMarkedForInvalidation, updatedRecordIDs, invalidatedRecordIDs) {
  // First, update any records that were marked for invalidation.
  // For each provided dataID that was invalidated, we write the
  // INVALIDATED_AT_KEY on the record, indicating
  // the epoch at which the record was invalidated.
  if (idsMarkedForInvalidation) {
    idsMarkedForInvalidation.forEach(function (dataID) {
      var targetRecord = target.get(dataID);
      var sourceRecord = source.get(dataID); // If record was deleted during the update (and also invalidated),
      // we don't need to count it as an invalidated id

      if (sourceRecord === null) {
        return;
      }

      var nextRecord;

      if (targetRecord != null) {
        // If the target record exists, use it to set the epoch
        // at which it was invalidated. This record will be updated with
        // any changes from source in the section below
        // where we update the target records based on the source.
        nextRecord = RelayModernRecord.clone(targetRecord);
      } else {
        // If the target record doesn't exist, it means that a new record
        // in the source was created (and also invalidated), so we use that
        // record to set the epoch at which it was invalidated. This record
        // will be updated with any changes from source in the section below
        // where we update the target records based on the source.
        nextRecord = sourceRecord != null ? RelayModernRecord.clone(sourceRecord) : null;
      }

      if (!nextRecord) {
        return;
      }

      RelayModernRecord.setValue(nextRecord, RelayStoreUtils.INVALIDATED_AT_KEY, currentWriteEpoch);
      invalidatedRecordIDs.add(dataID); // $FlowFixMe[incompatible-call]

      target.set(dataID, nextRecord);
    });
  } // Update the target based on the changes present in source


  var dataIDs = source.getRecordIDs();

  for (var ii = 0; ii < dataIDs.length; ii++) {
    var dataID = dataIDs[ii];
    var sourceRecord = source.get(dataID);
    var targetRecord = target.get(dataID); // Prevent mutation of a record from outside the store.

    if (false) {}

    if (sourceRecord && targetRecord) {
      // ReactFlightClientResponses are lazy and only materialize when readRoot
      // is called when we read the field, so if the record is a Flight field
      // we always use the new record's data regardless of whether
      // it actually changed. Let React take care of reconciliation instead.
      var nextRecord = RelayModernRecord.getType(targetRecord) === RelayStoreReactFlightUtils.REACT_FLIGHT_TYPE_NAME ? sourceRecord : RelayModernRecord.update(targetRecord, sourceRecord);

      if (nextRecord !== targetRecord) {
        // Prevent mutation of a record from outside the store.
        if (false) {}

        updatedRecordIDs.add(dataID);
        target.set(dataID, nextRecord);
      }
    } else if (sourceRecord === null) {
      target["delete"](dataID);

      if (targetRecord !== null) {
        updatedRecordIDs.add(dataID);
      }
    } else if (sourceRecord) {
      target.set(dataID, sourceRecord);
      updatedRecordIDs.add(dataID);
    } // don't add explicit undefined

  }
}
/**
 * Returns an OperationAvailability given the Availability returned
 * by checking an operation, and when that operation was last written to the store.
 * Specifically, the provided Availability of an operation will contain the
 * value of when a record referenced by the operation was most recently
 * invalidated; given that value, and given when this operation was last
 * written to the store, this function will return the overall
 * OperationAvailability for the operation.
 */


function getAvailabilityStatus(operationAvailability, operationLastWrittenAt, operationFetchTime, queryCacheExpirationTime) {
  var mostRecentlyInvalidatedAt = operationAvailability.mostRecentlyInvalidatedAt,
      status = operationAvailability.status;

  if (typeof mostRecentlyInvalidatedAt === 'number') {
    // If some record referenced by this operation is stale, then the operation itself is stale
    // if either the operation itself was never written *or* the operation was last written
    // before the most recent invalidation of its reachable records.
    if (operationLastWrittenAt == null || mostRecentlyInvalidatedAt > operationLastWrittenAt) {
      return {
        status: 'stale'
      };
    }
  }

  if (status === 'missing') {
    return {
      status: 'missing'
    };
  }

  if (operationFetchTime != null && queryCacheExpirationTime != null) {
    var isStale = operationFetchTime <= Date.now() - queryCacheExpirationTime;

    if (isStale) {
      return {
        status: 'stale'
      };
    }
  } // There were no invalidations of any reachable records *or* the operation is known to have
  // been fetched after the most recent record invalidation.


  return {
    status: 'available',
    fetchTime: operationFetchTime !== null && operationFetchTime !== void 0 ? operationFetchTime : null
  };
}

module.exports = RelayModernStore;

/***/ }),

/***/ 9458:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _createForOfIteratorHelper2 = _interopRequireDefault(__webpack_require__(8629));

var invariant = __webpack_require__(4990);

var RelayOperationTracker = /*#__PURE__*/function () {
  function RelayOperationTracker() {
    this._ownersToPendingOperationsIdentifier = new Map();
    this._pendingOperationsToOwnersIdentifier = new Map();
    this._ownersIdentifierToPromise = new Map();
  }
  /**
   * Update the map of current processing operations with the set of
   * affected owners and notify subscribers
   */


  var _proto = RelayOperationTracker.prototype;

  _proto.update = function update(pendingOperation, affectedOwners) {
    if (affectedOwners.size === 0) {
      return;
    }

    var pendingOperationIdentifier = pendingOperation.identifier;
    var newlyAffectedOwnersIdentifier = new Set();

    var _iterator = (0, _createForOfIteratorHelper2["default"])(affectedOwners),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var owner = _step.value;
        var ownerIdentifier = owner.identifier;

        var pendingOperationsAffectingOwner = this._ownersToPendingOperationsIdentifier.get(ownerIdentifier);

        if (pendingOperationsAffectingOwner != null) {
          // In this case the `ownerIdentifier` already affected by some operations
          // We just need to detect, is it the same operation that we already
          // have in the list, or it's a new operation
          if (!pendingOperationsAffectingOwner.has(pendingOperationIdentifier)) {
            pendingOperationsAffectingOwner.add(pendingOperationIdentifier);
            newlyAffectedOwnersIdentifier.add(ownerIdentifier);
          }
        } else {
          // This is a new `ownerIdentifier` that is affected by the operation
          this._ownersToPendingOperationsIdentifier.set(ownerIdentifier, new Set([pendingOperationIdentifier]));

          newlyAffectedOwnersIdentifier.add(ownerIdentifier);
        }
      } // No new owners were affected by this operation, we may stop here

    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    if (newlyAffectedOwnersIdentifier.size === 0) {
      return;
    } // But, if some owners were affected we need to add them to
    // the `_pendingOperationsToOwnersIdentifier` set


    var ownersAffectedByOperationIdentifier = this._pendingOperationsToOwnersIdentifier.get(pendingOperationIdentifier) || new Set();

    var _iterator2 = (0, _createForOfIteratorHelper2["default"])(newlyAffectedOwnersIdentifier),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _ownerIdentifier = _step2.value;

        this._resolveOwnerResolvers(_ownerIdentifier);

        ownersAffectedByOperationIdentifier.add(_ownerIdentifier);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    this._pendingOperationsToOwnersIdentifier.set(pendingOperationIdentifier, ownersAffectedByOperationIdentifier);
  }
  /**
   * Once pending operation is completed we need to remove it
   * from all tracking maps
   */
  ;

  _proto.complete = function complete(pendingOperation) {
    var pendingOperationIdentifier = pendingOperation.identifier;

    var affectedOwnersIdentifier = this._pendingOperationsToOwnersIdentifier.get(pendingOperationIdentifier);

    if (affectedOwnersIdentifier == null) {
      return;
    } // These were the owners affected only by `pendingOperationIdentifier`


    var completedOwnersIdentifier = new Set(); // These were the owners affected by `pendingOperationIdentifier`
    // and some other operations

    var updatedOwnersIdentifier = new Set();

    var _iterator3 = (0, _createForOfIteratorHelper2["default"])(affectedOwnersIdentifier),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var ownerIdentifier = _step3.value;

        var pendingOperationsAffectingOwner = this._ownersToPendingOperationsIdentifier.get(ownerIdentifier);

        if (!pendingOperationsAffectingOwner) {
          continue;
        }

        pendingOperationsAffectingOwner["delete"](pendingOperationIdentifier);

        if (pendingOperationsAffectingOwner.size > 0) {
          updatedOwnersIdentifier.add(ownerIdentifier);
        } else {
          completedOwnersIdentifier.add(ownerIdentifier);
        }
      } // Complete subscriptions for all owners, affected by `pendingOperationIdentifier`

    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    var _iterator4 = (0, _createForOfIteratorHelper2["default"])(completedOwnersIdentifier),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _ownerIdentifier2 = _step4.value;

        this._resolveOwnerResolvers(_ownerIdentifier2);

        this._ownersToPendingOperationsIdentifier["delete"](_ownerIdentifier2);
      } // Update all ownerIdentifier that were updated by `pendingOperationIdentifier` but still
      // are affected by other operations

    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }

    var _iterator5 = (0, _createForOfIteratorHelper2["default"])(updatedOwnersIdentifier),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _ownerIdentifier3 = _step5.value;

        this._resolveOwnerResolvers(_ownerIdentifier3);
      } // Finally, remove pending operation identifier

    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }

    this._pendingOperationsToOwnersIdentifier["delete"](pendingOperationIdentifier);
  };

  _proto._resolveOwnerResolvers = function _resolveOwnerResolvers(ownerIdentifier) {
    var promiseEntry = this._ownersIdentifierToPromise.get(ownerIdentifier);

    if (promiseEntry != null) {
      promiseEntry.resolve();
    }

    this._ownersIdentifierToPromise["delete"](ownerIdentifier);
  };

  _proto.getPromiseForPendingOperationsAffectingOwner = function getPromiseForPendingOperationsAffectingOwner(owner) {
    var ownerIdentifier = owner.identifier;

    if (!this._ownersToPendingOperationsIdentifier.has(ownerIdentifier)) {
      return null;
    }

    var cachedPromiseEntry = this._ownersIdentifierToPromise.get(ownerIdentifier);

    if (cachedPromiseEntry != null) {
      return cachedPromiseEntry.promise;
    }

    var resolve;
    var promise = new Promise(function (r) {
      resolve = r;
    });
    !(resolve != null) ?  false ? 0 : invariant(false) : void 0;

    this._ownersIdentifierToPromise.set(ownerIdentifier, {
      promise: promise,
      resolve: resolve
    });

    return promise;
  };

  return RelayOperationTracker;
}();

module.exports = RelayOperationTracker;

/***/ }),

/***/ 2486:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _objectSpread2 = _interopRequireDefault(__webpack_require__(4638));

var RelayRecordSource = __webpack_require__(2642);

var UNPUBLISH_RECORD_SENTINEL = Object.freeze({
  __UNPUBLISH_RECORD_SENTINEL: true
});
/**
 * An implementation of MutableRecordSource that represents a base RecordSource
 * with optimistic updates stacked on top: records with optimistic updates
 * shadow the base version of the record rather than updating/replacing them.
 */

var RelayOptimisticRecordSource = /*#__PURE__*/function () {
  function RelayOptimisticRecordSource(base) {
    this._base = base;
    this._sink = RelayRecordSource.create();
  }

  var _proto = RelayOptimisticRecordSource.prototype;

  _proto.has = function has(dataID) {
    if (this._sink.has(dataID)) {
      var sinkRecord = this._sink.get(dataID);

      return sinkRecord !== UNPUBLISH_RECORD_SENTINEL;
    } else {
      return this._base.has(dataID);
    }
  };

  _proto.get = function get(dataID) {
    if (this._sink.has(dataID)) {
      var sinkRecord = this._sink.get(dataID);

      if (sinkRecord === UNPUBLISH_RECORD_SENTINEL) {
        return undefined;
      } else {
        return sinkRecord;
      }
    } else {
      return this._base.get(dataID);
    }
  };

  _proto.getStatus = function getStatus(dataID) {
    var record = this.get(dataID);

    if (record === undefined) {
      return 'UNKNOWN';
    } else if (record === null) {
      return 'NONEXISTENT';
    } else {
      return 'EXISTENT';
    }
  };

  _proto.clear = function clear() {
    this._base = RelayRecordSource.create();

    this._sink.clear();
  };

  _proto["delete"] = function _delete(dataID) {
    this._sink["delete"](dataID);
  };

  _proto.remove = function remove(dataID) {
    this._sink.set(dataID, UNPUBLISH_RECORD_SENTINEL);
  };

  _proto.set = function set(dataID, record) {
    this._sink.set(dataID, record);
  };

  _proto.getRecordIDs = function getRecordIDs() {
    return Object.keys(this.toJSON());
  };

  _proto.size = function size() {
    return Object.keys(this.toJSON()).length;
  };

  _proto.toJSON = function toJSON() {
    var _this = this;

    var merged = (0, _objectSpread2["default"])({}, this._base.toJSON());

    this._sink.getRecordIDs().forEach(function (dataID) {
      var record = _this.get(dataID);

      if (record === undefined) {
        delete merged[dataID];
      } else {
        merged[dataID] = record;
      }
    });

    return merged;
  };

  return RelayOptimisticRecordSource;
}();

function create(base) {
  return new RelayOptimisticRecordSource(base);
}

module.exports = {
  create: create
};

/***/ }),

/***/ 6222:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _global$ErrorUtils$ap, _global$ErrorUtils;

var RelayReader = __webpack_require__(2988);

var RelayRecordSource = __webpack_require__(2642);

var RelayRecordSourceMutator = __webpack_require__(6569);

var RelayRecordSourceProxy = __webpack_require__(7397);

var RelayRecordSourceSelectorProxy = __webpack_require__(5120);

var invariant = __webpack_require__(4990);

var warning = __webpack_require__(480);

var applyWithGuard = (_global$ErrorUtils$ap = (_global$ErrorUtils = __webpack_require__.g.ErrorUtils) === null || _global$ErrorUtils === void 0 ? void 0 : _global$ErrorUtils.applyWithGuard) !== null && _global$ErrorUtils$ap !== void 0 ? _global$ErrorUtils$ap : function (callback, context, args, onError, name) {
  return callback.apply(context, args);
};
/**
 * Coordinates the concurrent modification of a `Store` due to optimistic and
 * non-revertable client updates and server payloads:
 * - Applies optimistic updates.
 * - Reverts optimistic updates, rebasing any subsequent updates.
 * - Commits client updates (typically for client schema extensions).
 * - Commits server updates:
 *   - Normalizes query/mutation/subscription responses.
 *   - Executes handlers for "handle" fields.
 *   - Reverts and reapplies pending optimistic updates.
 */

var RelayPublishQueue = /*#__PURE__*/function () {
  // True if the next `run()` should apply the backup and rerun all optimistic
  // updates performing a rebase.
  // Payloads to apply or Sources to publish to the store with the next `run()`.
  // Optimistic updaters to add with the next `run()`.
  // Optimistic updaters that are already added and might be rerun in order to
  // rebase them.
  // Garbage collection hold, should rerun gc on dispose
  function RelayPublishQueue(store, handlerProvider, getDataID) {
    this._hasStoreSnapshot = false;
    this._handlerProvider = handlerProvider || null;
    this._pendingBackupRebase = false;
    this._pendingData = new Set();
    this._pendingOptimisticUpdates = new Set();
    this._store = store;
    this._appliedOptimisticUpdates = new Set();
    this._gcHold = null;
    this._getDataID = getDataID;
  }
  /**
   * Schedule applying an optimistic updates on the next `run()`.
   */


  var _proto = RelayPublishQueue.prototype;

  _proto.applyUpdate = function applyUpdate(updater) {
    !(!this._appliedOptimisticUpdates.has(updater) && !this._pendingOptimisticUpdates.has(updater)) ?  false ? 0 : invariant(false) : void 0;

    this._pendingOptimisticUpdates.add(updater);
  }
  /**
   * Schedule reverting an optimistic updates on the next `run()`.
   */
  ;

  _proto.revertUpdate = function revertUpdate(updater) {
    if (this._pendingOptimisticUpdates.has(updater)) {
      // Reverted before it was applied
      this._pendingOptimisticUpdates["delete"](updater);
    } else if (this._appliedOptimisticUpdates.has(updater)) {
      this._pendingBackupRebase = true;

      this._appliedOptimisticUpdates["delete"](updater);
    }
  }
  /**
   * Schedule a revert of all optimistic updates on the next `run()`.
   */
  ;

  _proto.revertAll = function revertAll() {
    this._pendingBackupRebase = true;

    this._pendingOptimisticUpdates.clear();

    this._appliedOptimisticUpdates.clear();
  }
  /**
   * Schedule applying a payload to the store on the next `run()`.
   */
  ;

  _proto.commitPayload = function commitPayload(operation, payload, updater) {
    this._pendingBackupRebase = true;

    this._pendingData.add({
      kind: 'payload',
      operation: operation,
      payload: payload,
      updater: updater
    });
  }
  /**
   * Schedule an updater to mutate the store on the next `run()` typically to
   * update client schema fields.
   */
  ;

  _proto.commitUpdate = function commitUpdate(updater) {
    this._pendingBackupRebase = true;

    this._pendingData.add({
      kind: 'updater',
      updater: updater
    });
  }
  /**
   * Schedule a publish to the store from the provided source on the next
   * `run()`. As an example, to update the store with substituted fields that
   * are missing in the store.
   */
  ;

  _proto.commitSource = function commitSource(source) {
    this._pendingBackupRebase = true;

    this._pendingData.add({
      kind: 'source',
      source: source
    });
  }
  /**
   * Execute all queued up operations from the other public methods.
   */
  ;

  _proto.run = function run(sourceOperation) {
    if (false) {}

    if (this._pendingBackupRebase) {
      if (this._hasStoreSnapshot) {
        this._store.restore();

        this._hasStoreSnapshot = false;
      }
    }

    var invalidatedStore = this._commitData();

    if (this._pendingOptimisticUpdates.size || this._pendingBackupRebase && this._appliedOptimisticUpdates.size) {
      if (!this._hasStoreSnapshot) {
        this._store.snapshot();

        this._hasStoreSnapshot = true;
      }

      this._applyUpdates();
    }

    this._pendingBackupRebase = false;

    if (this._appliedOptimisticUpdates.size > 0) {
      if (!this._gcHold) {
        this._gcHold = this._store.holdGC();
      }
    } else {
      if (this._gcHold) {
        this._gcHold.dispose();

        this._gcHold = null;
      }
    }

    if (false) {}

    return this._store.notify(sourceOperation, invalidatedStore);
  }
  /**
   * _publishSourceFromPayload will return a boolean indicating if the
   * publish caused the store to be globally invalidated.
   */
  ;

  _proto._publishSourceFromPayload = function _publishSourceFromPayload(pendingPayload) {
    var _this = this;

    var payload = pendingPayload.payload,
        operation = pendingPayload.operation,
        updater = pendingPayload.updater;
    var source = payload.source,
        fieldPayloads = payload.fieldPayloads;
    var mutator = new RelayRecordSourceMutator(this._store.getSource(), source);
    var recordSourceProxy = new RelayRecordSourceProxy(mutator, this._getDataID);

    if (fieldPayloads && fieldPayloads.length) {
      fieldPayloads.forEach(function (fieldPayload) {
        var handler = _this._handlerProvider && _this._handlerProvider(fieldPayload.handle);

        !handler ?  false ? 0 : invariant(false) : void 0;
        handler.update(recordSourceProxy, fieldPayload);
      });
    }

    if (updater) {
      var selector = operation.fragment;
      !(selector != null) ?  false ? 0 : invariant(false) : void 0;
      var recordSourceSelectorProxy = new RelayRecordSourceSelectorProxy(mutator, recordSourceProxy, selector);
      var selectorData = lookupSelector(source, selector);
      updater(recordSourceSelectorProxy, selectorData);
    }

    var idsMarkedForInvalidation = recordSourceProxy.getIDsMarkedForInvalidation();

    this._store.publish(source, idsMarkedForInvalidation);

    return recordSourceProxy.isStoreMarkedForInvalidation();
  }
  /**
   * _commitData will return a boolean indicating if any of
   * the pending commits caused the store to be globally invalidated.
   */
  ;

  _proto._commitData = function _commitData() {
    var _this2 = this;

    if (!this._pendingData.size) {
      return false;
    }

    var invalidatedStore = false;

    this._pendingData.forEach(function (data) {
      if (data.kind === 'payload') {
        var payloadInvalidatedStore = _this2._publishSourceFromPayload(data);

        invalidatedStore = invalidatedStore || payloadInvalidatedStore;
      } else if (data.kind === 'source') {
        var source = data.source;

        _this2._store.publish(source);
      } else {
        var updater = data.updater;
        var sink = RelayRecordSource.create();
        var mutator = new RelayRecordSourceMutator(_this2._store.getSource(), sink);
        var recordSourceProxy = new RelayRecordSourceProxy(mutator, _this2._getDataID);
        applyWithGuard(updater, null, [recordSourceProxy], null, 'RelayPublishQueue:commitData');
        invalidatedStore = invalidatedStore || recordSourceProxy.isStoreMarkedForInvalidation();
        var idsMarkedForInvalidation = recordSourceProxy.getIDsMarkedForInvalidation();

        _this2._store.publish(sink, idsMarkedForInvalidation);
      }
    });

    this._pendingData.clear();

    return invalidatedStore;
  }
  /**
   * Note that unlike _commitData, _applyUpdates will NOT return a boolean
   * indicating if the store was globally invalidated, since invalidating the
   * store during an optimistic update is a no-op.
   */
  ;

  _proto._applyUpdates = function _applyUpdates() {
    var _this3 = this;

    var sink = RelayRecordSource.create();
    var mutator = new RelayRecordSourceMutator(this._store.getSource(), sink);
    var recordSourceProxy = new RelayRecordSourceProxy(mutator, this._getDataID, this._handlerProvider);

    var processUpdate = function processUpdate(optimisticUpdate) {
      if (optimisticUpdate.storeUpdater) {
        var storeUpdater = optimisticUpdate.storeUpdater;
        applyWithGuard(storeUpdater, null, [recordSourceProxy], null, 'RelayPublishQueue:applyUpdates');
      } else {
        var operation = optimisticUpdate.operation,
            payload = optimisticUpdate.payload,
            updater = optimisticUpdate.updater;
        var source = payload.source,
            fieldPayloads = payload.fieldPayloads;
        var recordSourceSelectorProxy = new RelayRecordSourceSelectorProxy(mutator, recordSourceProxy, operation.fragment);
        var selectorData;

        if (source) {
          recordSourceProxy.publishSource(source, fieldPayloads);
          selectorData = lookupSelector(source, operation.fragment);
        }

        if (updater) {
          applyWithGuard(updater, null, [recordSourceSelectorProxy, selectorData], null, 'RelayPublishQueue:applyUpdates');
        }
      }
    }; // rerun all updaters in case we are running a rebase


    if (this._pendingBackupRebase && this._appliedOptimisticUpdates.size) {
      this._appliedOptimisticUpdates.forEach(processUpdate);
    } // apply any new updaters


    if (this._pendingOptimisticUpdates.size) {
      this._pendingOptimisticUpdates.forEach(function (optimisticUpdate) {
        processUpdate(optimisticUpdate);

        _this3._appliedOptimisticUpdates.add(optimisticUpdate);
      });

      this._pendingOptimisticUpdates.clear();
    }

    this._store.publish(sink);
  };

  return RelayPublishQueue;
}();

function lookupSelector(source, selector) {
  var selectorData = RelayReader.read(source, selector).data;

  if (false) { var deepFreeze; }

  return selectorData;
}

module.exports = RelayPublishQueue;

/***/ }),

/***/ 2988:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _typeof = __webpack_require__(3634);

var _interopRequireDefault = __webpack_require__(249);

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3116));

var RelayFeatureFlags = __webpack_require__(1054);

var RelayModernRecord = __webpack_require__(2944);

var invariant = __webpack_require__(4990);

var _require = __webpack_require__(5742),
    CLIENT_EXTENSION = _require.CLIENT_EXTENSION,
    CONDITION = _require.CONDITION,
    DEFER = _require.DEFER,
    FLIGHT_FIELD = _require.FLIGHT_FIELD,
    FRAGMENT_SPREAD = _require.FRAGMENT_SPREAD,
    INLINE_DATA_FRAGMENT_SPREAD = _require.INLINE_DATA_FRAGMENT_SPREAD,
    INLINE_FRAGMENT = _require.INLINE_FRAGMENT,
    LINKED_FIELD = _require.LINKED_FIELD,
    MODULE_IMPORT = _require.MODULE_IMPORT,
    REQUIRED_FIELD = _require.REQUIRED_FIELD,
    RELAY_RESOLVER = _require.RELAY_RESOLVER,
    SCALAR_FIELD = _require.SCALAR_FIELD,
    STREAM = _require.STREAM;

var _require2 = __webpack_require__(4108),
    getReactFlightClientResponse = _require2.getReactFlightClientResponse;

var _require3 = __webpack_require__(880),
    FRAGMENTS_KEY = _require3.FRAGMENTS_KEY,
    FRAGMENT_OWNER_KEY = _require3.FRAGMENT_OWNER_KEY,
    FRAGMENT_PROP_NAME_KEY = _require3.FRAGMENT_PROP_NAME_KEY,
    ID_KEY = _require3.ID_KEY,
    IS_WITHIN_UNMATCHED_TYPE_REFINEMENT = _require3.IS_WITHIN_UNMATCHED_TYPE_REFINEMENT,
    MODULE_COMPONENT_KEY = _require3.MODULE_COMPONENT_KEY,
    ROOT_ID = _require3.ROOT_ID,
    getArgumentValues = _require3.getArgumentValues,
    getStorageKey = _require3.getStorageKey,
    getModuleComponentKey = _require3.getModuleComponentKey;

var _require4 = __webpack_require__(653),
    withResolverContext = _require4.withResolverContext;

var _require5 = __webpack_require__(6442),
    generateTypeID = _require5.generateTypeID;

function read(recordSource, selector) {
  var reader = new RelayReader(recordSource, selector);
  return reader.read();
}
/**
 * @private
 */


var RelayReader = /*#__PURE__*/function () {
  function RelayReader(recordSource, selector) {
    this._isMissingData = false;
    this._isWithinUnmatchedTypeRefinement = false;
    this._missingRequiredFields = null;
    this._owner = selector.owner;
    this._recordSource = recordSource;
    this._seenRecords = new Set();
    this._selector = selector;
    this._variables = selector.variables;
  }

  var _proto = RelayReader.prototype;

  _proto.read = function read() {
    var _this$_selector = this._selector,
        node = _this$_selector.node,
        dataID = _this$_selector.dataID,
        isWithinUnmatchedTypeRefinement = _this$_selector.isWithinUnmatchedTypeRefinement;
    var abstractKey = node.abstractKey;

    var record = this._recordSource.get(dataID); // Relay historically allowed child fragments to be read even if the root object
    // did not match the type of the fragment: either the root object has a different
    // concrete type than the fragment (for concrete fragments) or the root object does
    // not conform to the interface/union for abstract fragments.
    // For suspense purposes, however, we want to accurately compute whether any data
    // is missing: but if the fragment type doesn't match (or a parent type didn't
    // match), then no data is expected to be present.
    // By default data is expected to be present unless this selector was read out
    // from within a non-matching type refinement in a parent fragment:


    var isDataExpectedToBePresent = !isWithinUnmatchedTypeRefinement; // If this is a concrete fragment and the concrete type of the record does not
    // match, then no data is expected to be present.

    if (isDataExpectedToBePresent && abstractKey == null && record != null) {
      var recordType = RelayModernRecord.getType(record);

      if (recordType !== node.type && dataID !== ROOT_ID) {
        isDataExpectedToBePresent = false;
      }
    } // If this is an abstract fragment (and the precise refinement GK is enabled)
    // then data is only expected to be present if the record type is known to
    // implement the interface. If we aren't sure whether the record implements
    // the interface, that itself constitutes "expected" data being missing.


    if (isDataExpectedToBePresent && abstractKey != null && record != null && RelayFeatureFlags.ENABLE_PRECISE_TYPE_REFINEMENT) {
      var _recordType = RelayModernRecord.getType(record);

      var typeID = generateTypeID(_recordType);

      var typeRecord = this._recordSource.get(typeID);

      var implementsInterface = typeRecord != null ? RelayModernRecord.getValue(typeRecord, abstractKey) : null;

      if (implementsInterface === false) {
        // Type known to not implement the interface
        isDataExpectedToBePresent = false;
      } else if (implementsInterface == null) {
        // Don't know if the type implements the interface or not
        this._isMissingData = true;
      }
    }

    this._isWithinUnmatchedTypeRefinement = !isDataExpectedToBePresent;

    var data = this._traverse(node, dataID, null);

    return {
      data: data,
      isMissingData: this._isMissingData && isDataExpectedToBePresent,
      seenRecords: this._seenRecords,
      selector: this._selector,
      missingRequiredFields: this._missingRequiredFields
    };
  };

  _proto._traverse = function _traverse(node, dataID, prevData) {
    var record = this._recordSource.get(dataID);

    this._seenRecords.add(dataID);

    if (record == null) {
      if (record === undefined) {
        this._isMissingData = true;
      }

      return record;
    }

    var data = prevData || {};

    var hadRequiredData = this._traverseSelections(node.selections, record, data);

    return hadRequiredData ? data : null;
  };

  _proto._getVariableValue = function _getVariableValue(name) {
    !this._variables.hasOwnProperty(name) ?  false ? 0 : invariant(false) : void 0; // $FlowFixMe[cannot-write]

    return this._variables[name];
  };

  _proto._maybeReportUnexpectedNull = function _maybeReportUnexpectedNull(fieldPath, action, record) {
    var _this$_missingRequire;

    if (((_this$_missingRequire = this._missingRequiredFields) === null || _this$_missingRequire === void 0 ? void 0 : _this$_missingRequire.action) === 'THROW') {
      // Chained @required directives may cause a parent `@required(action:
      // THROW)` field to become null, so the first missing field we
      // encounter is likely to be the root cause of the error.
      return;
    }

    var owner = this._selector.node.name;

    switch (action) {
      case 'THROW':
        this._missingRequiredFields = {
          action: action,
          field: {
            path: fieldPath,
            owner: owner
          }
        };
        return;

      case 'LOG':
        if (this._missingRequiredFields == null) {
          this._missingRequiredFields = {
            action: action,
            fields: []
          };
        }

        this._missingRequiredFields.fields.push({
          path: fieldPath,
          owner: owner
        });

        return;

      default:
        action;
    }
  };

  _proto._traverseSelections = function _traverseSelections(selections, record, data)
  /* had all expected data */
  {
    for (var i = 0; i < selections.length; i++) {
      var selection = selections[i];

      switch (selection.kind) {
        case REQUIRED_FIELD:
          !RelayFeatureFlags.ENABLE_REQUIRED_DIRECTIVES ?  false ? 0 : invariant(false) : void 0;

          var fieldValue = this._readRequiredField(selection, record, data);

          if (fieldValue == null) {
            var action = selection.action;

            if (action !== 'NONE') {
              this._maybeReportUnexpectedNull(selection.path, action, record);
            } // We are going to throw, or our parent is going to get nulled out.
            // Either way, sibling values are going to be ignored, so we can
            // bail early here as an optimization.


            return false;
          }

          break;

        case SCALAR_FIELD:
          this._readScalar(selection, record, data);

          break;

        case LINKED_FIELD:
          if (selection.plural) {
            this._readPluralLink(selection, record, data);
          } else {
            this._readLink(selection, record, data);
          }

          break;

        case CONDITION:
          var conditionValue = this._getVariableValue(selection.condition);

          if (conditionValue === selection.passingValue) {
            var hasExpectedData = this._traverseSelections(selection.selections, record, data);

            if (!hasExpectedData) {
              return false;
            }
          }

          break;

        case INLINE_FRAGMENT:
          {
            var abstractKey = selection.abstractKey;

            if (abstractKey == null) {
              // concrete type refinement: only read data if the type exactly matches
              var typeName = RelayModernRecord.getType(record);

              if (typeName != null && typeName === selection.type) {
                var _hasExpectedData = this._traverseSelections(selection.selections, record, data);

                if (!_hasExpectedData) {
                  return false;
                }
              }
            } else if (RelayFeatureFlags.ENABLE_PRECISE_TYPE_REFINEMENT) {
              // Similar to the logic in read(): data is only expected to be present
              // if the record is known to conform to the interface. If we don't know
              // whether the type conforms or not, that constitutes missing data.
              // store flags to reset after reading
              var parentIsMissingData = this._isMissingData;
              var parentIsWithinUnmatchedTypeRefinement = this._isWithinUnmatchedTypeRefinement;

              var _typeName = RelayModernRecord.getType(record);

              var typeID = generateTypeID(_typeName);

              var typeRecord = this._recordSource.get(typeID);

              var implementsInterface = typeRecord != null ? RelayModernRecord.getValue(typeRecord, abstractKey) : null;
              this._isWithinUnmatchedTypeRefinement = parentIsWithinUnmatchedTypeRefinement || implementsInterface === false;

              this._traverseSelections(selection.selections, record, data);

              this._isWithinUnmatchedTypeRefinement = parentIsWithinUnmatchedTypeRefinement;

              if (implementsInterface === false) {
                // Type known to not implement the interface, no data expected
                this._isMissingData = parentIsMissingData;
              } else if (implementsInterface == null) {
                // Don't know if the type implements the interface or not
                this._isMissingData = true;
              }
            } else {
              // legacy behavior for abstract refinements: always read even
              // if the type doesn't conform and don't reset isMissingData
              this._traverseSelections(selection.selections, record, data);
            }

            break;
          }

        case RELAY_RESOLVER:
          {
            if (!RelayFeatureFlags.ENABLE_RELAY_RESOLVERS) {
              throw new Error('Relay Resolver fields are not yet supported.');
            }

            this._readResolverField(selection, record, data);

            break;
          }

        case FRAGMENT_SPREAD:
          this._createFragmentPointer(selection, record, data);

          break;

        case MODULE_IMPORT:
          this._readModuleImport(selection, record, data);

          break;

        case INLINE_DATA_FRAGMENT_SPREAD:
          this._createInlineDataOrResolverFragmentPointer(selection, record, data);

          break;

        case DEFER:
        case CLIENT_EXTENSION:
          {
            var isMissingData = this._isMissingData;

            var _hasExpectedData2 = this._traverseSelections(selection.selections, record, data);

            this._isMissingData = isMissingData;

            if (!_hasExpectedData2) {
              return false;
            }

            break;
          }

        case STREAM:
          {
            var _hasExpectedData3 = this._traverseSelections(selection.selections, record, data);

            if (!_hasExpectedData3) {
              return false;
            }

            break;
          }

        case FLIGHT_FIELD:
          if (RelayFeatureFlags.ENABLE_REACT_FLIGHT_COMPONENT_FIELD) {
            this._readFlightField(selection, record, data);
          } else {
            throw new Error('Flight fields are not yet supported.');
          }

          break;

        default:
          selection;
           true ?  false ? 0 : invariant(false) : 0;
      }
    }

    return true;
  };

  _proto._readRequiredField = function _readRequiredField(selection, record, data) {
    switch (selection.field.kind) {
      case SCALAR_FIELD:
        return this._readScalar(selection.field, record, data);

      case LINKED_FIELD:
        if (selection.field.plural) {
          return this._readPluralLink(selection.field, record, data);
        } else {
          return this._readLink(selection.field, record, data);
        }

      default:
        selection.field.kind;
         true ?  false ? 0 : invariant(false) : 0;
    }
  };

  _proto._readResolverField = function _readResolverField(selection, record, data) {
    var _this = this;

    var name = selection.name,
        alias = selection.alias,
        resolverModule = selection.resolverModule,
        fragment = selection.fragment;
    var key = {
      __id: RelayModernRecord.getDataID(record),
      __fragmentOwner: this._owner,
      __fragments: (0, _defineProperty2["default"])({}, fragment.name, {})
    };
    var resolverContext = {
      getDataForResolverFragment: function getDataForResolverFragment(singularReaderSelector) {
        var _resolverFragmentData;

        var resolverFragmentData = {};

        _this._createInlineDataOrResolverFragmentPointer(singularReaderSelector.node, record, resolverFragmentData);

        var answer = (_resolverFragmentData = resolverFragmentData[FRAGMENTS_KEY]) === null || _resolverFragmentData === void 0 ? void 0 : _resolverFragmentData[fragment.name];
        !(_typeof(answer) === 'object' && answer !== null) ?  false ? 0 : invariant(false) : void 0;
        return answer;
      }
    };
    var resolverResult = withResolverContext(resolverContext, function () {
      return (// $FlowFixMe[prop-missing] - resolver module's type signature is a lie
        resolverModule(key)
      );
    });
    data[alias !== null && alias !== void 0 ? alias : name] = resolverResult;
    return resolverResult;
  };

  _proto._readFlightField = function _readFlightField(field, record, data) {
    var _field$alias;

    var applicationName = (_field$alias = field.alias) !== null && _field$alias !== void 0 ? _field$alias : field.name;
    var storageKey = getStorageKey(field, this._variables);
    var reactFlightClientResponseRecordID = RelayModernRecord.getLinkedRecordID(record, storageKey);

    if (reactFlightClientResponseRecordID == null) {
      data[applicationName] = reactFlightClientResponseRecordID;

      if (reactFlightClientResponseRecordID === undefined) {
        this._isMissingData = true;
      }

      return reactFlightClientResponseRecordID;
    }

    var reactFlightClientResponseRecord = this._recordSource.get(reactFlightClientResponseRecordID);

    this._seenRecords.add(reactFlightClientResponseRecordID);

    if (reactFlightClientResponseRecord == null) {
      data[applicationName] = reactFlightClientResponseRecord;

      if (reactFlightClientResponseRecord === undefined) {
        this._isMissingData = true;
      }

      return reactFlightClientResponseRecord;
    }

    var clientResponse = getReactFlightClientResponse(reactFlightClientResponseRecord);
    data[applicationName] = clientResponse;
    return clientResponse;
  };

  _proto._readScalar = function _readScalar(field, record, data) {
    var _field$alias2;

    var applicationName = (_field$alias2 = field.alias) !== null && _field$alias2 !== void 0 ? _field$alias2 : field.name;
    var storageKey = getStorageKey(field, this._variables);
    var value = RelayModernRecord.getValue(record, storageKey);

    if (value === undefined) {
      this._isMissingData = true;
    }

    data[applicationName] = value;
    return value;
  };

  _proto._readLink = function _readLink(field, record, data) {
    var _field$alias3;

    var applicationName = (_field$alias3 = field.alias) !== null && _field$alias3 !== void 0 ? _field$alias3 : field.name;
    var storageKey = getStorageKey(field, this._variables);
    var linkedID = RelayModernRecord.getLinkedRecordID(record, storageKey);

    if (linkedID == null) {
      data[applicationName] = linkedID;

      if (linkedID === undefined) {
        this._isMissingData = true;
      }

      return linkedID;
    }

    var prevData = data[applicationName];
    !(prevData == null || _typeof(prevData) === 'object') ?  false ? 0 : invariant(false) : void 0; // $FlowFixMe[incompatible-variance]

    var value = this._traverse(field, linkedID, prevData);

    data[applicationName] = value;
    return value;
  };

  _proto._readPluralLink = function _readPluralLink(field, record, data) {
    var _this2 = this;

    var _field$alias4;

    var applicationName = (_field$alias4 = field.alias) !== null && _field$alias4 !== void 0 ? _field$alias4 : field.name;
    var storageKey = getStorageKey(field, this._variables);
    var linkedIDs = RelayModernRecord.getLinkedRecordIDs(record, storageKey);

    if (linkedIDs == null) {
      data[applicationName] = linkedIDs;

      if (linkedIDs === undefined) {
        this._isMissingData = true;
      }

      return linkedIDs;
    }

    var prevData = data[applicationName];
    !(prevData == null || Array.isArray(prevData)) ?  false ? 0 : invariant(false) : void 0;
    var linkedArray = prevData || [];
    linkedIDs.forEach(function (linkedID, nextIndex) {
      if (linkedID == null) {
        if (linkedID === undefined) {
          _this2._isMissingData = true;
        } // $FlowFixMe[cannot-write]


        linkedArray[nextIndex] = linkedID;
        return;
      }

      var prevItem = linkedArray[nextIndex];
      !(prevItem == null || _typeof(prevItem) === 'object') ?  false ? 0 : invariant(false) : void 0; // $FlowFixMe[cannot-write]
      // $FlowFixMe[incompatible-variance]

      linkedArray[nextIndex] = _this2._traverse(field, linkedID, prevItem);
    });
    data[applicationName] = linkedArray;
    return linkedArray;
  }
  /**
   * Reads a ReaderModuleImport, which was generated from using the @module
   * directive.
   */
  ;

  _proto._readModuleImport = function _readModuleImport(moduleImport, record, data) {
    // Determine the component module from the store: if the field is missing
    // it means we don't know what component to render the match with.
    var componentKey = getModuleComponentKey(moduleImport.documentName);
    var component = RelayModernRecord.getValue(record, componentKey);

    if (component == null) {
      if (component === undefined) {
        this._isMissingData = true;
      }

      return;
    } // Otherwise, read the fragment and module associated to the concrete
    // type, and put that data with the result:
    // - For the matched fragment, create the relevant fragment pointer and add
    //   the expected fragmentPropName
    // - For the matched module, create a reference to the module


    this._createFragmentPointer({
      kind: 'FragmentSpread',
      name: moduleImport.fragmentName,
      args: null
    }, record, data);

    data[FRAGMENT_PROP_NAME_KEY] = moduleImport.fragmentPropName;
    data[MODULE_COMPONENT_KEY] = component;
  };

  _proto._createFragmentPointer = function _createFragmentPointer(fragmentSpread, record, data) {
    var fragmentPointers = data[FRAGMENTS_KEY];

    if (fragmentPointers == null) {
      fragmentPointers = data[FRAGMENTS_KEY] = {};
    }

    !(_typeof(fragmentPointers) === 'object' && fragmentPointers != null) ?  false ? 0 : invariant(false) : void 0;

    if (data[ID_KEY] == null) {
      data[ID_KEY] = RelayModernRecord.getDataID(record);
    } // $FlowFixMe[cannot-write] - writing into read-only field


    fragmentPointers[fragmentSpread.name] = fragmentSpread.args ? getArgumentValues(fragmentSpread.args, this._variables) : {};
    data[FRAGMENT_OWNER_KEY] = this._owner;

    if (RelayFeatureFlags.ENABLE_PRECISE_TYPE_REFINEMENT) {
      data[IS_WITHIN_UNMATCHED_TYPE_REFINEMENT] = this._isWithinUnmatchedTypeRefinement;
    }
  };

  _proto._createInlineDataOrResolverFragmentPointer = function _createInlineDataOrResolverFragmentPointer(fragmentSpreadOrFragment, record, data) {
    var fragmentPointers = data[FRAGMENTS_KEY];

    if (fragmentPointers == null) {
      fragmentPointers = data[FRAGMENTS_KEY] = {};
    }

    !(_typeof(fragmentPointers) === 'object' && fragmentPointers != null) ?  false ? 0 : invariant(false) : void 0;

    if (data[ID_KEY] == null) {
      data[ID_KEY] = RelayModernRecord.getDataID(record);
    }

    var inlineData = {};

    this._traverseSelections(fragmentSpreadOrFragment.selections, record, inlineData); // $FlowFixMe[cannot-write] - writing into read-only field


    fragmentPointers[fragmentSpreadOrFragment.name] = inlineData;
  };

  return RelayReader;
}();

module.exports = {
  read: read
};

/***/ }),

/***/ 2642:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var RelayRecordSourceMapImpl = __webpack_require__(9115);

var RelayRecordSource = /*#__PURE__*/function () {
  function RelayRecordSource(records) {
    return RelayRecordSource.create(records);
  }

  RelayRecordSource.create = function create(records) {
    return new RelayRecordSourceMapImpl(records);
  };

  return RelayRecordSource;
}();

module.exports = RelayRecordSource;

/***/ }),

/***/ 9115:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _createForOfIteratorHelper2 = _interopRequireDefault(__webpack_require__(8629));

var RelayRecordState = __webpack_require__(5113);

var EXISTENT = RelayRecordState.EXISTENT,
    NONEXISTENT = RelayRecordState.NONEXISTENT,
    UNKNOWN = RelayRecordState.UNKNOWN;
/**
 * An implementation of the `MutableRecordSource` interface (defined in
 * `RelayStoreTypes`) that holds all records in memory (JS Map).
 */

var RelayMapRecordSourceMapImpl = /*#__PURE__*/function () {
  function RelayMapRecordSourceMapImpl(records) {
    var _this = this;

    this._records = new Map();

    if (records != null) {
      Object.keys(records).forEach(function (key) {
        _this._records.set(key, records[key]);
      });
    }
  }

  var _proto = RelayMapRecordSourceMapImpl.prototype;

  _proto.clear = function clear() {
    this._records = new Map();
  };

  _proto["delete"] = function _delete(dataID) {
    this._records.set(dataID, null);
  };

  _proto.get = function get(dataID) {
    return this._records.get(dataID);
  };

  _proto.getRecordIDs = function getRecordIDs() {
    return Array.from(this._records.keys());
  };

  _proto.getStatus = function getStatus(dataID) {
    if (!this._records.has(dataID)) {
      return UNKNOWN;
    }

    return this._records.get(dataID) == null ? NONEXISTENT : EXISTENT;
  };

  _proto.has = function has(dataID) {
    return this._records.has(dataID);
  };

  _proto.remove = function remove(dataID) {
    this._records["delete"](dataID);
  };

  _proto.set = function set(dataID, record) {
    this._records.set(dataID, record);
  };

  _proto.size = function size() {
    return this._records.size;
  };

  _proto.toJSON = function toJSON() {
    var obj = {};

    var _iterator = (0, _createForOfIteratorHelper2["default"])(this._records),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _step.value,
            key = _step$value[0],
            value = _step$value[1];
        obj[key] = value;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return obj;
  };

  return RelayMapRecordSourceMapImpl;
}();

module.exports = RelayMapRecordSourceMapImpl;

/***/ }),

/***/ 5113:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var RelayRecordState = {
  /**
   * Record exists (either fetched from the server or produced by a local,
   * optimistic update).
   */
  EXISTENT: 'EXISTENT',

  /**
   * Record is known not to exist (either as the result of a mutation, or
   * because the server returned `null` when queried for the record).
   */
  NONEXISTENT: 'NONEXISTENT',

  /**
   * Record State is unknown because it has not yet been fetched from the
   * server.
   */
  UNKNOWN: 'UNKNOWN'
};
module.exports = RelayRecordState;

/***/ }),

/***/ 1735:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _createForOfIteratorHelper2 = _interopRequireDefault(__webpack_require__(8629));

var RelayConcreteNode = __webpack_require__(5742);

var RelayFeatureFlags = __webpack_require__(1054);

var RelayModernRecord = __webpack_require__(2944);

var RelayStoreReactFlightUtils = __webpack_require__(4108);

var RelayStoreUtils = __webpack_require__(880);

var cloneRelayHandleSourceField = __webpack_require__(5829);

var getOperation = __webpack_require__(4858);

var invariant = __webpack_require__(4990);

var _require = __webpack_require__(6442),
    generateTypeID = _require.generateTypeID;

var CONDITION = RelayConcreteNode.CONDITION,
    CLIENT_COMPONENT = RelayConcreteNode.CLIENT_COMPONENT,
    CLIENT_EXTENSION = RelayConcreteNode.CLIENT_EXTENSION,
    DEFER = RelayConcreteNode.DEFER,
    FLIGHT_FIELD = RelayConcreteNode.FLIGHT_FIELD,
    FRAGMENT_SPREAD = RelayConcreteNode.FRAGMENT_SPREAD,
    INLINE_FRAGMENT = RelayConcreteNode.INLINE_FRAGMENT,
    LINKED_FIELD = RelayConcreteNode.LINKED_FIELD,
    MODULE_IMPORT = RelayConcreteNode.MODULE_IMPORT,
    LINKED_HANDLE = RelayConcreteNode.LINKED_HANDLE,
    SCALAR_FIELD = RelayConcreteNode.SCALAR_FIELD,
    SCALAR_HANDLE = RelayConcreteNode.SCALAR_HANDLE,
    STREAM = RelayConcreteNode.STREAM,
    TYPE_DISCRIMINATOR = RelayConcreteNode.TYPE_DISCRIMINATOR;
var ROOT_ID = RelayStoreUtils.ROOT_ID,
    getStorageKey = RelayStoreUtils.getStorageKey,
    getModuleOperationKey = RelayStoreUtils.getModuleOperationKey;

function mark(recordSource, selector, references, operationLoader, shouldProcessClientComponents) {
  var dataID = selector.dataID,
      node = selector.node,
      variables = selector.variables;
  var marker = new RelayReferenceMarker(recordSource, variables, references, operationLoader, shouldProcessClientComponents);
  marker.mark(node, dataID);
}
/**
 * @private
 */


var RelayReferenceMarker = /*#__PURE__*/function () {
  function RelayReferenceMarker(recordSource, variables, references, operationLoader, shouldProcessClientComponents) {
    this._operationLoader = operationLoader !== null && operationLoader !== void 0 ? operationLoader : null;
    this._operationName = null;
    this._recordSource = recordSource;
    this._references = references;
    this._variables = variables;
    this._shouldProcessClientComponents = shouldProcessClientComponents;
  }

  var _proto = RelayReferenceMarker.prototype;

  _proto.mark = function mark(node, dataID) {
    if (node.kind === 'Operation' || node.kind === 'SplitOperation') {
      this._operationName = node.name;
    }

    this._traverse(node, dataID);
  };

  _proto._traverse = function _traverse(node, dataID) {
    this._references.add(dataID);

    var record = this._recordSource.get(dataID);

    if (record == null) {
      return;
    }

    this._traverseSelections(node.selections, record);
  };

  _proto._getVariableValue = function _getVariableValue(name) {
    !this._variables.hasOwnProperty(name) ?  false ? 0 : invariant(false) : void 0; // $FlowFixMe[cannot-write]

    return this._variables[name];
  };

  _proto._traverseSelections = function _traverseSelections(selections, record) {
    var _this = this;

    selections.forEach(function (selection) {
      /* eslint-disable no-fallthrough */
      switch (selection.kind) {
        case LINKED_FIELD:
          if (selection.plural) {
            _this._traversePluralLink(selection, record);
          } else {
            _this._traverseLink(selection, record);
          }

          break;

        case CONDITION:
          var conditionValue = _this._getVariableValue(selection.condition);

          if (conditionValue === selection.passingValue) {
            _this._traverseSelections(selection.selections, record);
          }

          break;

        case INLINE_FRAGMENT:
          if (selection.abstractKey == null) {
            var typeName = RelayModernRecord.getType(record);

            if (typeName != null && typeName === selection.type) {
              _this._traverseSelections(selection.selections, record);
            }
          } else if (RelayFeatureFlags.ENABLE_PRECISE_TYPE_REFINEMENT) {
            var _typeName = RelayModernRecord.getType(record);

            var typeID = generateTypeID(_typeName);

            _this._references.add(typeID);

            _this._traverseSelections(selection.selections, record);
          } else {
            _this._traverseSelections(selection.selections, record);
          }

          break;
        // $FlowFixMe[incompatible-type]

        case FRAGMENT_SPREAD:
          _this._traverseSelections(selection.fragment.selections, record);

          break;

        case LINKED_HANDLE:
          // The selections for a "handle" field are the same as those of the
          // original linked field where the handle was applied. Reference marking
          // therefore requires traversing the original field selections against
          // the synthesized client field.
          //
          // TODO: Instead of finding the source field in `selections`, change
          // the concrete structure to allow shared subtrees, and have the linked
          // handle directly refer to the same selections as the LinkedField that
          // it was split from.
          var handleField = cloneRelayHandleSourceField(selection, selections, _this._variables);

          if (handleField.plural) {
            _this._traversePluralLink(handleField, record);
          } else {
            _this._traverseLink(handleField, record);
          }

          break;

        case DEFER:
        case STREAM:
          _this._traverseSelections(selection.selections, record);

          break;

        case SCALAR_FIELD:
        case SCALAR_HANDLE:
          break;

        case TYPE_DISCRIMINATOR:
          {
            if (RelayFeatureFlags.ENABLE_PRECISE_TYPE_REFINEMENT) {
              var _typeName2 = RelayModernRecord.getType(record);

              var _typeID = generateTypeID(_typeName2);

              _this._references.add(_typeID);
            }

            break;
          }

        case MODULE_IMPORT:
          _this._traverseModuleImport(selection, record);

          break;

        case CLIENT_EXTENSION:
          _this._traverseSelections(selection.selections, record);

          break;

        case FLIGHT_FIELD:
          if (RelayFeatureFlags.ENABLE_REACT_FLIGHT_COMPONENT_FIELD) {
            _this._traverseFlightField(selection, record);
          } else {
            throw new Error('Flight fields are not yet supported.');
          }

          break;

        case CLIENT_COMPONENT:
          if (_this._shouldProcessClientComponents === false) {
            break;
          }

          _this._traverseSelections(selection.fragment.selections, record);

          break;

        default:
          selection;
           true ?  false ? 0 : invariant(false) : 0;
      }
    });
  };

  _proto._traverseModuleImport = function _traverseModuleImport(moduleImport, record) {
    var _this$_operationName;

    var operationLoader = this._operationLoader;
    !(operationLoader !== null) ?  false ? 0 : invariant(false) : void 0;
    var operationKey = getModuleOperationKey(moduleImport.documentName);
    var operationReference = RelayModernRecord.getValue(record, operationKey);

    if (operationReference == null) {
      return;
    }

    var normalizationRootNode = operationLoader.get(operationReference);

    if (normalizationRootNode != null) {
      var selections = getOperation(normalizationRootNode).selections;

      this._traverseSelections(selections, record);
    } // Otherwise, if the operation is not available, we assume that the data
    // cannot have been processed yet and therefore isn't in the store to
    // begin with.

  };

  _proto._traverseLink = function _traverseLink(field, record) {
    var storageKey = getStorageKey(field, this._variables);
    var linkedID = RelayModernRecord.getLinkedRecordID(record, storageKey);

    if (linkedID == null) {
      return;
    }

    this._traverse(field, linkedID);
  };

  _proto._traversePluralLink = function _traversePluralLink(field, record) {
    var _this2 = this;

    var storageKey = getStorageKey(field, this._variables);
    var linkedIDs = RelayModernRecord.getLinkedRecordIDs(record, storageKey);

    if (linkedIDs == null) {
      return;
    }

    linkedIDs.forEach(function (linkedID) {
      if (linkedID != null) {
        _this2._traverse(field, linkedID);
      }
    });
  };

  _proto._traverseFlightField = function _traverseFlightField(field, record) {
    var storageKey = getStorageKey(field, this._variables);
    var linkedID = RelayModernRecord.getLinkedRecordID(record, storageKey);

    if (linkedID == null) {
      return;
    }

    this._references.add(linkedID);

    var reactFlightClientResponseRecord = this._recordSource.get(linkedID);

    if (reactFlightClientResponseRecord == null) {
      return;
    }

    var reachableExecutableDefinitions = RelayModernRecord.getValue(reactFlightClientResponseRecord, RelayStoreReactFlightUtils.REACT_FLIGHT_EXECUTABLE_DEFINITIONS_STORAGE_KEY);

    if (!Array.isArray(reachableExecutableDefinitions)) {
      return;
    }

    var operationLoader = this._operationLoader;
    !(operationLoader !== null) ?  false ? 0 : invariant(false) : void 0; // In Flight, the variables that are in scope for reachable executable
    // definitions aren't the same as what's in scope for the outer query.

    var prevVariables = this._variables; // $FlowFixMe[incompatible-cast]

    var _iterator = (0, _createForOfIteratorHelper2["default"])(reachableExecutableDefinitions),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var definition = _step.value;
        this._variables = definition.variables;
        var operationReference = definition.module;
        var normalizationRootNode = operationLoader.get(operationReference);

        if (normalizationRootNode != null) {
          var operation = getOperation(normalizationRootNode);

          this._traverse(operation, ROOT_ID);
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    this._variables = prevVariables;
  };

  return RelayReferenceMarker;
}();

module.exports = {
  mark: mark
};

/***/ }),

/***/ 894:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _typeof = __webpack_require__(3634);

var _interopRequireDefault = __webpack_require__(249);

var _createForOfIteratorHelper2 = _interopRequireDefault(__webpack_require__(8629));

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(3749));

var RelayFeatureFlags = __webpack_require__(1054);

var RelayModernRecord = __webpack_require__(2944);

var areEqual = __webpack_require__(9074);

var invariant = __webpack_require__(4990);

var warning = __webpack_require__(480);

var _require = __webpack_require__(5742),
    CONDITION = _require.CONDITION,
    CLIENT_COMPONENT = _require.CLIENT_COMPONENT,
    CLIENT_EXTENSION = _require.CLIENT_EXTENSION,
    DEFER = _require.DEFER,
    FLIGHT_FIELD = _require.FLIGHT_FIELD,
    FRAGMENT_SPREAD = _require.FRAGMENT_SPREAD,
    INLINE_FRAGMENT = _require.INLINE_FRAGMENT,
    LINKED_FIELD = _require.LINKED_FIELD,
    LINKED_HANDLE = _require.LINKED_HANDLE,
    MODULE_IMPORT = _require.MODULE_IMPORT,
    SCALAR_FIELD = _require.SCALAR_FIELD,
    SCALAR_HANDLE = _require.SCALAR_HANDLE,
    STREAM = _require.STREAM,
    TYPE_DISCRIMINATOR = _require.TYPE_DISCRIMINATOR;

var _require2 = __webpack_require__(5057),
    generateClientID = _require2.generateClientID,
    isClientID = _require2.isClientID;

var _require3 = __webpack_require__(9797),
    createNormalizationSelector = _require3.createNormalizationSelector;

var _require4 = __webpack_require__(4108),
    refineToReactFlightPayloadData = _require4.refineToReactFlightPayloadData,
    REACT_FLIGHT_EXECUTABLE_DEFINITIONS_STORAGE_KEY = _require4.REACT_FLIGHT_EXECUTABLE_DEFINITIONS_STORAGE_KEY,
    REACT_FLIGHT_TREE_STORAGE_KEY = _require4.REACT_FLIGHT_TREE_STORAGE_KEY,
    REACT_FLIGHT_TYPE_NAME = _require4.REACT_FLIGHT_TYPE_NAME;

var _require5 = __webpack_require__(880),
    getArgumentValues = _require5.getArgumentValues,
    getHandleStorageKey = _require5.getHandleStorageKey,
    getModuleComponentKey = _require5.getModuleComponentKey,
    getModuleOperationKey = _require5.getModuleOperationKey,
    getStorageKey = _require5.getStorageKey,
    TYPENAME_KEY = _require5.TYPENAME_KEY,
    ROOT_ID = _require5.ROOT_ID,
    ROOT_TYPE = _require5.ROOT_TYPE;

var _require6 = __webpack_require__(6442),
    generateTypeID = _require6.generateTypeID,
    TYPE_SCHEMA_TYPE = _require6.TYPE_SCHEMA_TYPE;
/**
 * Normalizes the results of a query and standard GraphQL response, writing the
 * normalized records/fields into the given MutableRecordSource.
 */


function normalize(recordSource, selector, response, options) {
  var dataID = selector.dataID,
      node = selector.node,
      variables = selector.variables;
  var normalizer = new RelayResponseNormalizer(recordSource, variables, options);
  return normalizer.normalizeResponse(node, dataID, response);
}
/**
 * @private
 *
 * Helper for handling payloads.
 */


var RelayResponseNormalizer = /*#__PURE__*/function () {
  function RelayResponseNormalizer(recordSource, variables, options) {
    this._getDataId = options.getDataID;
    this._handleFieldPayloads = [];
    this._treatMissingFieldsAsNull = options.treatMissingFieldsAsNull;
    this._incrementalPlaceholders = [];
    this._isClientExtension = false;
    this._isUnmatchedAbstractType = false;
    this._moduleImportPayloads = [];
    this._path = options.path ? (0, _toConsumableArray2["default"])(options.path) : [];
    this._recordSource = recordSource;
    this._variables = variables;
    this._reactFlightPayloadDeserializer = options.reactFlightPayloadDeserializer;
    this._reactFlightServerErrorHandler = options.reactFlightServerErrorHandler;
    this._shouldProcessClientComponents = options.shouldProcessClientComponents;
  }

  var _proto = RelayResponseNormalizer.prototype;

  _proto.normalizeResponse = function normalizeResponse(node, dataID, data) {
    var record = this._recordSource.get(dataID);

    !record ?  false ? 0 : invariant(false) : void 0;

    this._traverseSelections(node, record, data);

    return {
      errors: null,
      fieldPayloads: this._handleFieldPayloads,
      incrementalPlaceholders: this._incrementalPlaceholders,
      moduleImportPayloads: this._moduleImportPayloads,
      source: this._recordSource,
      isFinal: false
    };
  };

  _proto._getVariableValue = function _getVariableValue(name) {
    !this._variables.hasOwnProperty(name) ?  false ? 0 : invariant(false) : void 0; // $FlowFixMe[cannot-write]

    return this._variables[name];
  };

  _proto._getRecordType = function _getRecordType(data) {
    var typeName = data[TYPENAME_KEY];
    !(typeName != null) ?  false ? 0 : invariant(false) : void 0;
    return typeName;
  };

  _proto._traverseSelections = function _traverseSelections(node, record, data) {
    for (var i = 0; i < node.selections.length; i++) {
      var selection = node.selections[i];

      switch (selection.kind) {
        case SCALAR_FIELD:
        case LINKED_FIELD:
          this._normalizeField(node, selection, record, data);

          break;

        case CONDITION:
          var conditionValue = this._getVariableValue(selection.condition);

          if (conditionValue === selection.passingValue) {
            this._traverseSelections(selection, record, data);
          }

          break;

        case FRAGMENT_SPREAD:
          {
            this._traverseSelections(selection.fragment, record, data);

            break;
          }

        case INLINE_FRAGMENT:
          {
            var abstractKey = selection.abstractKey;

            if (abstractKey == null) {
              var _typeName = RelayModernRecord.getType(record);

              if (_typeName === selection.type) {
                this._traverseSelections(selection, record, data);
              }
            } else if (RelayFeatureFlags.ENABLE_PRECISE_TYPE_REFINEMENT) {
              var implementsInterface = data.hasOwnProperty(abstractKey);

              var _typeName2 = RelayModernRecord.getType(record);

              var typeID = generateTypeID(_typeName2);

              var typeRecord = this._recordSource.get(typeID);

              if (typeRecord == null) {
                typeRecord = RelayModernRecord.create(typeID, TYPE_SCHEMA_TYPE);

                this._recordSource.set(typeID, typeRecord);
              }

              RelayModernRecord.setValue(typeRecord, abstractKey, implementsInterface);

              if (implementsInterface) {
                this._traverseSelections(selection, record, data);
              }
            } else {
              // legacy behavior for abstract refinements: always normalize even
              // if the type doesn't conform, but track if the type matches or not
              // for determining whether response fields are expected to be present
              var _implementsInterface = data.hasOwnProperty(abstractKey);

              var parentIsUnmatchedAbstractType = this._isUnmatchedAbstractType;
              this._isUnmatchedAbstractType = this._isUnmatchedAbstractType || !_implementsInterface;

              this._traverseSelections(selection, record, data);

              this._isUnmatchedAbstractType = parentIsUnmatchedAbstractType;
            }

            break;
          }

        case TYPE_DISCRIMINATOR:
          {
            if (RelayFeatureFlags.ENABLE_PRECISE_TYPE_REFINEMENT) {
              var _abstractKey = selection.abstractKey;

              var _implementsInterface2 = data.hasOwnProperty(_abstractKey);

              var _typeName3 = RelayModernRecord.getType(record);

              var _typeID = generateTypeID(_typeName3);

              var _typeRecord = this._recordSource.get(_typeID);

              if (_typeRecord == null) {
                _typeRecord = RelayModernRecord.create(_typeID, TYPE_SCHEMA_TYPE);

                this._recordSource.set(_typeID, _typeRecord);
              }

              RelayModernRecord.setValue(_typeRecord, _abstractKey, _implementsInterface2);
            }

            break;
          }

        case LINKED_HANDLE:
        case SCALAR_HANDLE:
          var args = selection.args ? getArgumentValues(selection.args, this._variables) : {};
          var fieldKey = getStorageKey(selection, this._variables);
          var handleKey = getHandleStorageKey(selection, this._variables);

          this._handleFieldPayloads.push({
            args: args,
            dataID: RelayModernRecord.getDataID(record),
            fieldKey: fieldKey,
            handle: selection.handle,
            handleKey: handleKey,
            handleArgs: selection.handleArgs ? getArgumentValues(selection.handleArgs, this._variables) : {}
          });

          break;

        case MODULE_IMPORT:
          this._normalizeModuleImport(node, selection, record, data);

          break;

        case DEFER:
          this._normalizeDefer(selection, record, data);

          break;

        case STREAM:
          this._normalizeStream(selection, record, data);

          break;

        case CLIENT_EXTENSION:
          var isClientExtension = this._isClientExtension;
          this._isClientExtension = true;

          this._traverseSelections(selection, record, data);

          this._isClientExtension = isClientExtension;
          break;

        case CLIENT_COMPONENT:
          if (this._shouldProcessClientComponents === false) {
            break;
          }

          this._traverseSelections(selection.fragment, record, data);

          break;

        case FLIGHT_FIELD:
          if (RelayFeatureFlags.ENABLE_REACT_FLIGHT_COMPONENT_FIELD) {
            this._normalizeFlightField(node, selection, record, data);
          } else {
            throw new Error('Flight fields are not yet supported.');
          }

          break;

        default:
          selection;
           true ?  false ? 0 : invariant(false) : 0;
      }
    }
  };

  _proto._normalizeDefer = function _normalizeDefer(defer, record, data) {
    var isDeferred = defer["if"] === null || this._getVariableValue(defer["if"]);

    if (false) {}

    if (isDeferred === false) {
      // If defer is disabled there will be no additional response chunk:
      // normalize the data already present.
      this._traverseSelections(defer, record, data);
    } else {
      // Otherwise data *for this selection* should not be present: enqueue
      // metadata to process the subsequent response chunk.
      this._incrementalPlaceholders.push({
        kind: 'defer',
        data: data,
        label: defer.label,
        path: (0, _toConsumableArray2["default"])(this._path),
        selector: createNormalizationSelector(defer, RelayModernRecord.getDataID(record), this._variables),
        typeName: RelayModernRecord.getType(record)
      });
    }
  };

  _proto._normalizeStream = function _normalizeStream(stream, record, data) {
    // Always normalize regardless of whether streaming is enabled or not,
    // this populates the initial array value (including any items when
    // initial_count > 0).
    this._traverseSelections(stream, record, data);

    var isStreamed = stream["if"] === null || this._getVariableValue(stream["if"]);

    if (false) {}

    if (isStreamed === true) {
      // If streaming is enabled, *also* emit metadata to process any
      // response chunks that may be delivered.
      this._incrementalPlaceholders.push({
        kind: 'stream',
        label: stream.label,
        path: (0, _toConsumableArray2["default"])(this._path),
        parentID: RelayModernRecord.getDataID(record),
        node: stream,
        variables: this._variables
      });
    }
  };

  _proto._normalizeModuleImport = function _normalizeModuleImport(parent, moduleImport, record, data) {
    !(_typeof(data) === 'object' && data) ?  false ? 0 : invariant(false) : void 0;
    var typeName = RelayModernRecord.getType(record);
    var componentKey = getModuleComponentKey(moduleImport.documentName);
    var componentReference = data[componentKey];
    RelayModernRecord.setValue(record, componentKey, componentReference !== null && componentReference !== void 0 ? componentReference : null);
    var operationKey = getModuleOperationKey(moduleImport.documentName);
    var operationReference = data[operationKey];
    RelayModernRecord.setValue(record, operationKey, operationReference !== null && operationReference !== void 0 ? operationReference : null);

    if (operationReference != null) {
      this._moduleImportPayloads.push({
        data: data,
        dataID: RelayModernRecord.getDataID(record),
        operationReference: operationReference,
        path: (0, _toConsumableArray2["default"])(this._path),
        typeName: typeName,
        variables: this._variables
      });
    }
  };

  _proto._normalizeField = function _normalizeField(parent, selection, record, data) {
    !(_typeof(data) === 'object' && data) ?  false ? 0 : invariant(false) : void 0;
    var responseKey = selection.alias || selection.name;
    var storageKey = getStorageKey(selection, this._variables);
    var fieldValue = data[responseKey];

    if (fieldValue == null) {
      if (fieldValue === undefined) {
        // Fields may be missing in the response in two main cases:
        // - Inside a client extension: the server will not generally return
        //   values for these fields, but a local update may provide them.
        // - Inside an abstract type refinement where the concrete type does
        //   not conform to the interface/union.
        // However an otherwise-required field may also be missing if the server
        // is configured to skip fields with `null` values, in which case the
        // client is assumed to be correctly configured with
        // treatMissingFieldsAsNull=true.
        var isOptionalField = this._isClientExtension || this._isUnmatchedAbstractType;

        if (isOptionalField) {
          // Field not expected to exist regardless of whether the server is pruning null
          // fields or not.
          return;
        } else if (!this._treatMissingFieldsAsNull) {
          // Not optional and the server is not pruning null fields: field is expected
          // to be present
          if (false) {}

          return;
        }
      }

      if (false) {}

      RelayModernRecord.setValue(record, storageKey, null);
      return;
    }

    if (selection.kind === SCALAR_FIELD) {
      if (false) {}

      RelayModernRecord.setValue(record, storageKey, fieldValue);
    } else if (selection.kind === LINKED_FIELD) {
      this._path.push(responseKey);

      if (selection.plural) {
        this._normalizePluralLink(selection, record, storageKey, fieldValue);
      } else {
        this._normalizeLink(selection, record, storageKey, fieldValue);
      }

      this._path.pop();
    } else {
      selection;
       true ?  false ? 0 : invariant(false) : 0;
    }
  };

  _proto._normalizeFlightField = function _normalizeFlightField(parent, selection, record, data) {
    var responseKey = selection.alias || selection.name;
    var storageKey = getStorageKey(selection, this._variables);
    var fieldValue = data[responseKey];

    if (fieldValue == null) {
      if (fieldValue === undefined) {
        // Flight field may be missing in the response if:
        // - It is inside an abstract type refinement where the concrete type does
        //   not conform to the interface/union.
        // However an otherwise-required field may also be missing if the server
        // is configured to skip fields with `null` values, in which case the
        // client is assumed to be correctly configured with
        // treatMissingFieldsAsNull=true.
        if (this._isUnmatchedAbstractType) {
          // Field not expected to exist regardless of whether the server is pruning null
          // fields or not.
          return;
        } else if (!this._treatMissingFieldsAsNull) {
          // Not optional and the server is not pruning null fields: field is expected
          // to be present
          if (false) {}

          return;
        }
      }

      RelayModernRecord.setValue(record, storageKey, null);
      return;
    }

    var reactFlightPayload = refineToReactFlightPayloadData(fieldValue);
    var reactFlightPayloadDeserializer = this._reactFlightPayloadDeserializer;
    !(reactFlightPayload != null) ?  false ? 0 : invariant(false) : void 0;
    !(typeof reactFlightPayloadDeserializer === 'function') ?  false ? 0 : invariant(false) : void 0;

    if (reactFlightPayload.errors.length > 0) {
      if (typeof this._reactFlightServerErrorHandler === 'function') {
        this._reactFlightServerErrorHandler(reactFlightPayload.status, reactFlightPayload.errors);
      } else {
         false ? 0 : void 0;
      }
    }

    var reactFlightID = generateClientID(RelayModernRecord.getDataID(record), getStorageKey(selection, this._variables));

    var reactFlightClientResponseRecord = this._recordSource.get(reactFlightID);

    if (reactFlightClientResponseRecord == null) {
      reactFlightClientResponseRecord = RelayModernRecord.create(reactFlightID, REACT_FLIGHT_TYPE_NAME);

      this._recordSource.set(reactFlightID, reactFlightClientResponseRecord);
    }

    if (reactFlightPayload.tree == null) {
      // This typically indicates that a fatal server error prevented rows from
      // being written. When this occurs, we should not continue normalization of
      // the Flight field because the row response is malformed.
      //
      // Receiving empty rows is OK because it can indicate the start of a stream.
       false ? 0 : void 0; // We create the flight record with a null value for the tree
      // and empty reachable definitions

      RelayModernRecord.setValue(reactFlightClientResponseRecord, REACT_FLIGHT_TREE_STORAGE_KEY, null);
      RelayModernRecord.setValue(reactFlightClientResponseRecord, REACT_FLIGHT_EXECUTABLE_DEFINITIONS_STORAGE_KEY, []);
      RelayModernRecord.setLinkedRecordID(record, storageKey, reactFlightID);
      return;
    } // We store the deserialized reactFlightClientResponse in a separate
    // record and link it to the parent record. This is so we can GC the Flight
    // tree later even if the parent record is still reachable.


    var reactFlightClientResponse = reactFlightPayloadDeserializer(reactFlightPayload.tree);
    RelayModernRecord.setValue(reactFlightClientResponseRecord, REACT_FLIGHT_TREE_STORAGE_KEY, reactFlightClientResponse);
    var reachableExecutableDefinitions = [];

    var _iterator = (0, _createForOfIteratorHelper2["default"])(reactFlightPayload.queries),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var query = _step.value;

        if (query.response.data != null) {
          this._moduleImportPayloads.push({
            data: query.response.data,
            dataID: ROOT_ID,
            operationReference: query.module,
            path: [],
            typeName: ROOT_TYPE,
            variables: query.variables
          });
        }

        reachableExecutableDefinitions.push({
          module: query.module,
          variables: query.variables
        });
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var _iterator2 = (0, _createForOfIteratorHelper2["default"])(reactFlightPayload.fragments),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var fragment = _step2.value;

        if (fragment.response.data != null) {
          this._moduleImportPayloads.push({
            data: fragment.response.data,
            dataID: fragment.__id,
            operationReference: fragment.module,
            path: [],
            typeName: fragment.__typename,
            variables: fragment.variables
          });
        }

        reachableExecutableDefinitions.push({
          module: fragment.module,
          variables: fragment.variables
        });
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    RelayModernRecord.setValue(reactFlightClientResponseRecord, REACT_FLIGHT_EXECUTABLE_DEFINITIONS_STORAGE_KEY, reachableExecutableDefinitions);
    RelayModernRecord.setLinkedRecordID(record, storageKey, reactFlightID);
  };

  _proto._normalizeLink = function _normalizeLink(field, record, storageKey, fieldValue) {
    var _field$concreteType;

    !(_typeof(fieldValue) === 'object' && fieldValue) ?  false ? 0 : invariant(false) : void 0;
    var nextID = this._getDataId( // $FlowFixMe[incompatible-variance]
    fieldValue, // $FlowFixMe[incompatible-variance]
    (_field$concreteType = field.concreteType) !== null && _field$concreteType !== void 0 ? _field$concreteType : this._getRecordType(fieldValue)) || // Reuse previously generated client IDs
    RelayModernRecord.getLinkedRecordID(record, storageKey) || generateClientID(RelayModernRecord.getDataID(record), storageKey);
    !(typeof nextID === 'string') ?  false ? 0 : invariant(false) : void 0;

    if (false) {}

    RelayModernRecord.setLinkedRecordID(record, storageKey, nextID);

    var nextRecord = this._recordSource.get(nextID);

    if (!nextRecord) {
      // $FlowFixMe[incompatible-variance]
      var _typeName4 = field.concreteType || this._getRecordType(fieldValue);

      nextRecord = RelayModernRecord.create(nextID, _typeName4);

      this._recordSource.set(nextID, nextRecord);
    } else if (false) {} // $FlowFixMe[incompatible-variance]


    this._traverseSelections(field, nextRecord, fieldValue);
  };

  _proto._normalizePluralLink = function _normalizePluralLink(field, record, storageKey, fieldValue) {
    var _this = this;

    !Array.isArray(fieldValue) ?  false ? 0 : invariant(false) : void 0;
    var prevIDs = RelayModernRecord.getLinkedRecordIDs(record, storageKey);
    var nextIDs = [];
    fieldValue.forEach(function (item, nextIndex) {
      var _field$concreteType2; // validate response data


      if (item == null) {
        nextIDs.push(item);
        return;
      }

      _this._path.push(String(nextIndex));

      !(_typeof(item) === 'object') ?  false ? 0 : invariant(false) : void 0;
      var nextID = _this._getDataId( // $FlowFixMe[incompatible-variance]
      item, // $FlowFixMe[incompatible-variance]
      (_field$concreteType2 = field.concreteType) !== null && _field$concreteType2 !== void 0 ? _field$concreteType2 : _this._getRecordType(item)) || prevIDs && prevIDs[nextIndex] || // Reuse previously generated client IDs:
      generateClientID(RelayModernRecord.getDataID(record), storageKey, nextIndex);
      !(typeof nextID === 'string') ?  false ? 0 : invariant(false) : void 0;
      nextIDs.push(nextID);

      var nextRecord = _this._recordSource.get(nextID);

      if (!nextRecord) {
        // $FlowFixMe[incompatible-variance]
        var _typeName5 = field.concreteType || _this._getRecordType(item);

        nextRecord = RelayModernRecord.create(nextID, _typeName5);

        _this._recordSource.set(nextID, nextRecord);
      } else if (false) {} // NOTE: the check to strip __DEV__ code only works for simple
      // `if (__DEV__)`


      if (false) {} // $FlowFixMe[incompatible-variance]


      _this._traverseSelections(field, nextRecord, item);

      _this._path.pop();
    });
    RelayModernRecord.setLinkedRecordIDs(record, storageKey, nextIDs);
  }
  /**
   * Warns if the type of the record does not match the type of the field/payload.
   */
  ;

  _proto._validateRecordType = function _validateRecordType(record, field, payload) {
    var _field$concreteType3;

    var typeName = (_field$concreteType3 = field.concreteType) !== null && _field$concreteType3 !== void 0 ? _field$concreteType3 : this._getRecordType(payload);
    var dataID = RelayModernRecord.getDataID(record);
     false ? 0 : void 0;
  }
  /**
   * Warns if a single response contains conflicting fields with the same id
   */
  ;

  _proto._validateConflictingFieldsWithIdenticalId = function _validateConflictingFieldsWithIdenticalId(record, storageKey, fieldValue) {
    // NOTE: Only call this function in DEV
    if (false) { var previousValue, dataID; }
  }
  /**
   * Warns if a single response contains conflicting fields with the same id
   */
  ;

  _proto._validateConflictingLinkedFieldsWithIdenticalId = function _validateConflictingLinkedFieldsWithIdenticalId(record, prevID, nextID, storageKey) {
    // NOTE: Only call this function in DEV
    if (false) {}
  };

  return RelayResponseNormalizer;
}();

module.exports = {
  normalize: normalize
};

/***/ }),

/***/ 4108:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _typeof = __webpack_require__(3634);

var invariant = __webpack_require__(4990);

var _require = __webpack_require__(2944),
    getType = _require.getType; // Reachable (client) executable definitions encountered while server component
// rendering


var REACT_FLIGHT_EXECUTABLE_DEFINITIONS_STORAGE_KEY = 'executableDefinitions';
var REACT_FLIGHT_TREE_STORAGE_KEY = 'tree';
var REACT_FLIGHT_TYPE_NAME = 'ReactFlightComponent';

function refineToReactFlightPayloadData(payload) {
  if (payload == null || _typeof(payload) !== 'object' || typeof payload.status !== 'string' || !Array.isArray(payload.tree) && payload.tree !== null || !Array.isArray(payload.queries) || !Array.isArray(payload.fragments) || !Array.isArray(payload.errors)) {
    return null;
  }

  return payload;
}

function getReactFlightClientResponse(record) {
  !(getType(record) === REACT_FLIGHT_TYPE_NAME) ?  false ? 0 : invariant(false) : void 0;
  var response = record[REACT_FLIGHT_TREE_STORAGE_KEY];

  if (response != null) {
    return response;
  }

  return null;
}

module.exports = {
  REACT_FLIGHT_EXECUTABLE_DEFINITIONS_STORAGE_KEY: REACT_FLIGHT_EXECUTABLE_DEFINITIONS_STORAGE_KEY,
  REACT_FLIGHT_TREE_STORAGE_KEY: REACT_FLIGHT_TREE_STORAGE_KEY,
  REACT_FLIGHT_TYPE_NAME: REACT_FLIGHT_TYPE_NAME,
  getReactFlightClientResponse: getReactFlightClientResponse,
  refineToReactFlightPayloadData: refineToReactFlightPayloadData
};

/***/ }),

/***/ 3540:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var RelayFeatureFlags = __webpack_require__(1054);

var RelayReader = __webpack_require__(2988);

var deepFreeze = __webpack_require__(5274);

var hasOverlappingIDs = __webpack_require__(9912);

var recycleNodesInto = __webpack_require__(9278);

var RelayStoreSubscriptions = /*#__PURE__*/function () {
  function RelayStoreSubscriptions(log) {
    this._subscriptions = new Set();
    this.__log = log;
  }

  var _proto = RelayStoreSubscriptions.prototype;

  _proto.subscribe = function subscribe(snapshot, callback) {
    var _this = this;

    var subscription = {
      backup: null,
      callback: callback,
      snapshot: snapshot,
      stale: false
    };

    var dispose = function dispose() {
      _this._subscriptions["delete"](subscription);
    };

    this._subscriptions.add(subscription);

    return {
      dispose: dispose
    };
  };

  _proto.snapshotSubscriptions = function snapshotSubscriptions(source) {
    this._subscriptions.forEach(function (subscription) {
      // Backup occurs after writing a new "final" payload(s) and before (re)applying
      // optimistic changes. Each subscription's `snapshot` represents what was *last
      // published to the subscriber*, which notably may include previous optimistic
      // updates. Therefore a subscription can be in any of the following states:
      // - stale=true: This subscription was restored to a different value than
      //   `snapshot`. That means this subscription has changes relative to its base,
      //   but its base has changed (we just applied a final payload): recompute
      //   a backup so that we can later restore to the state the subscription
      //   should be in.
      // - stale=false: This subscription was restored to the same value as
      //   `snapshot`. That means this subscription does *not* have changes relative
      //   to its base, so the current `snapshot` is valid to use as a backup.
      if (!subscription.stale) {
        subscription.backup = subscription.snapshot;
        return;
      }

      var snapshot = subscription.snapshot;
      var backup = RelayReader.read(source, snapshot.selector);
      var nextData = recycleNodesInto(snapshot.data, backup.data);
      backup.data = nextData; // backup owns the snapshot and can safely mutate

      subscription.backup = backup;
    });
  };

  _proto.restoreSubscriptions = function restoreSubscriptions() {
    this._subscriptions.forEach(function (subscription) {
      var backup = subscription.backup;
      subscription.backup = null;

      if (backup) {
        if (backup.data !== subscription.snapshot.data) {
          subscription.stale = true;
        }

        subscription.snapshot = {
          data: subscription.snapshot.data,
          isMissingData: backup.isMissingData,
          seenRecords: backup.seenRecords,
          selector: backup.selector,
          missingRequiredFields: backup.missingRequiredFields
        };
      } else {
        subscription.stale = true;
      }
    });
  };

  _proto.updateSubscriptions = function updateSubscriptions(source, updatedRecordIDs, updatedOwners, sourceOperation) {
    var _this2 = this;

    var hasUpdatedRecords = updatedRecordIDs.size !== 0;

    this._subscriptions.forEach(function (subscription) {
      var owner = _this2._updateSubscription(source, subscription, updatedRecordIDs, hasUpdatedRecords, sourceOperation);

      if (owner != null) {
        updatedOwners.push(owner);
      }
    });
  }
  /**
   * Notifies the callback for the subscription if the data for the associated
   * snapshot has changed.
   * Additionally, updates the subscription snapshot with the latest snapshot,
   * and marks it as not stale.
   * Returns the owner (RequestDescriptor) if the subscription was affected by the
   * latest update, or null if it was not affected.
   */
  ;

  _proto._updateSubscription = function _updateSubscription(source, subscription, updatedRecordIDs, hasUpdatedRecords, sourceOperation) {
    var backup = subscription.backup,
        callback = subscription.callback,
        snapshot = subscription.snapshot,
        stale = subscription.stale;
    var hasOverlappingUpdates = hasUpdatedRecords && hasOverlappingIDs(snapshot.seenRecords, updatedRecordIDs);

    if (!stale && !hasOverlappingUpdates) {
      return;
    }

    var nextSnapshot = hasOverlappingUpdates || !backup ? RelayReader.read(source, snapshot.selector) : backup;
    var nextData = recycleNodesInto(snapshot.data, nextSnapshot.data);
    nextSnapshot = {
      data: nextData,
      isMissingData: nextSnapshot.isMissingData,
      seenRecords: nextSnapshot.seenRecords,
      selector: nextSnapshot.selector,
      missingRequiredFields: nextSnapshot.missingRequiredFields
    };

    if (false) {}

    subscription.snapshot = nextSnapshot;
    subscription.stale = false;

    if (nextSnapshot.data !== snapshot.data) {
      if (this.__log && RelayFeatureFlags.ENABLE_NOTIFY_SUBSCRIPTION) {
        this.__log({
          name: 'store.notify.subscription',
          sourceOperation: sourceOperation,
          snapshot: snapshot,
          nextSnapshot: nextSnapshot
        });
      }

      callback(nextSnapshot);
      return snapshot.selector.owner;
    }
  };

  return RelayStoreSubscriptions;
}();

module.exports = RelayStoreSubscriptions;

/***/ }),

/***/ 7570:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _createForOfIteratorHelper2 = _interopRequireDefault(__webpack_require__(8629));

var RelayFeatureFlags = __webpack_require__(1054);

var RelayReader = __webpack_require__(2988);

var deepFreeze = __webpack_require__(5274);

var recycleNodesInto = __webpack_require__(9278);

var RelayStoreSubscriptionsUsingMapByID = /*#__PURE__*/function () {
  function RelayStoreSubscriptionsUsingMapByID(log) {
    this._notifiedRevision = 0;
    this._snapshotRevision = 0;
    this._subscriptionsByDataId = new Map();
    this._staleSubscriptions = new Set();
    this.__log = log;
  }

  var _proto = RelayStoreSubscriptionsUsingMapByID.prototype;

  _proto.subscribe = function subscribe(snapshot, callback) {
    var _this = this;

    var subscription = {
      backup: null,
      callback: callback,
      notifiedRevision: this._notifiedRevision,
      snapshotRevision: this._snapshotRevision,
      snapshot: snapshot
    };

    var dispose = function dispose() {
      var _iterator = (0, _createForOfIteratorHelper2["default"])(snapshot.seenRecords),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var dataId = _step.value;

          var subscriptionsForDataId = _this._subscriptionsByDataId.get(dataId);

          if (subscriptionsForDataId != null) {
            subscriptionsForDataId["delete"](subscription);

            if (subscriptionsForDataId.size === 0) {
              _this._subscriptionsByDataId["delete"](dataId);
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    };

    var _iterator2 = (0, _createForOfIteratorHelper2["default"])(snapshot.seenRecords),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var dataId = _step2.value;

        var subscriptionsForDataId = this._subscriptionsByDataId.get(dataId);

        if (subscriptionsForDataId != null) {
          subscriptionsForDataId.add(subscription);
        } else {
          this._subscriptionsByDataId.set(dataId, new Set([subscription]));
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    return {
      dispose: dispose
    };
  };

  _proto.snapshotSubscriptions = function snapshotSubscriptions(source) {
    var _this2 = this;

    this._snapshotRevision++;

    this._subscriptionsByDataId.forEach(function (subscriptions) {
      subscriptions.forEach(function (subscription) {
        if (subscription.snapshotRevision === _this2._snapshotRevision) {
          return;
        }

        subscription.snapshotRevision = _this2._snapshotRevision; // Backup occurs after writing a new "final" payload(s) and before (re)applying
        // optimistic changes. Each subscription's `snapshot` represents what was *last
        // published to the subscriber*, which notably may include previous optimistic
        // updates. Therefore a subscription can be in any of the following states:
        // - stale=true: This subscription was restored to a different value than
        //   `snapshot`. That means this subscription has changes relative to its base,
        //   but its base has changed (we just applied a final payload): recompute
        //   a backup so that we can later restore to the state the subscription
        //   should be in.
        // - stale=false: This subscription was restored to the same value than
        //   `snapshot`. That means this subscription does *not* have changes relative
        //   to its base, so the current `snapshot` is valid to use as a backup.

        if (!_this2._staleSubscriptions.has(subscription)) {
          subscription.backup = subscription.snapshot;
          return;
        }

        var snapshot = subscription.snapshot;
        var backup = RelayReader.read(source, snapshot.selector);
        var nextData = recycleNodesInto(snapshot.data, backup.data);
        backup.data = nextData; // backup owns the snapshot and can safely mutate

        subscription.backup = backup;
      });
    });
  };

  _proto.restoreSubscriptions = function restoreSubscriptions() {
    var _this3 = this;

    this._snapshotRevision++;

    this._subscriptionsByDataId.forEach(function (subscriptions) {
      subscriptions.forEach(function (subscription) {
        if (subscription.snapshotRevision === _this3._snapshotRevision) {
          return;
        }

        subscription.snapshotRevision = _this3._snapshotRevision;
        var backup = subscription.backup;
        subscription.backup = null;

        if (backup) {
          if (backup.data !== subscription.snapshot.data) {
            _this3._staleSubscriptions.add(subscription);
          }

          var prevSeenRecords = subscription.snapshot.seenRecords;
          subscription.snapshot = {
            data: subscription.snapshot.data,
            isMissingData: backup.isMissingData,
            seenRecords: backup.seenRecords,
            selector: backup.selector,
            missingRequiredFields: backup.missingRequiredFields
          };

          _this3._updateSubscriptionsMap(subscription, prevSeenRecords);
        } else {
          _this3._staleSubscriptions.add(subscription);
        }
      });
    });
  };

  _proto.updateSubscriptions = function updateSubscriptions(source, updatedRecordIDs, updatedOwners, sourceOperation) {
    var _this4 = this;

    this._notifiedRevision++;
    updatedRecordIDs.forEach(function (updatedRecordId) {
      var subcriptionsForDataId = _this4._subscriptionsByDataId.get(updatedRecordId);

      if (subcriptionsForDataId == null) {
        return;
      }

      subcriptionsForDataId.forEach(function (subscription) {
        if (subscription.notifiedRevision === _this4._notifiedRevision) {
          return;
        }

        var owner = _this4._updateSubscription(source, subscription, false, sourceOperation);

        if (owner != null) {
          updatedOwners.push(owner);
        }
      });
    });

    this._staleSubscriptions.forEach(function (subscription) {
      if (subscription.notifiedRevision === _this4._notifiedRevision) {
        return;
      }

      var owner = _this4._updateSubscription(source, subscription, true, sourceOperation);

      if (owner != null) {
        updatedOwners.push(owner);
      }
    });

    this._staleSubscriptions.clear();
  }
  /**
   * Notifies the callback for the subscription if the data for the associated
   * snapshot has changed.
   * Additionally, updates the subscription snapshot with the latest snapshot,
   * amarks it as not stale, and updates the subscription tracking for any
   * any new ids observed in the latest data snapshot.
   * Returns the owner (RequestDescriptor) if the subscription was affected by the
   * latest update, or null if it was not affected.
   */
  ;

  _proto._updateSubscription = function _updateSubscription(source, subscription, stale, sourceOperation) {
    var backup = subscription.backup,
        callback = subscription.callback,
        snapshot = subscription.snapshot;
    var nextSnapshot = stale && backup != null ? backup : RelayReader.read(source, snapshot.selector);
    var nextData = recycleNodesInto(snapshot.data, nextSnapshot.data);
    nextSnapshot = {
      data: nextData,
      isMissingData: nextSnapshot.isMissingData,
      seenRecords: nextSnapshot.seenRecords,
      selector: nextSnapshot.selector,
      missingRequiredFields: nextSnapshot.missingRequiredFields
    };

    if (false) {}

    var prevSeenRecords = subscription.snapshot.seenRecords;
    subscription.snapshot = nextSnapshot;
    subscription.notifiedRevision = this._notifiedRevision;

    this._updateSubscriptionsMap(subscription, prevSeenRecords);

    if (nextSnapshot.data !== snapshot.data) {
      if (this.__log && RelayFeatureFlags.ENABLE_NOTIFY_SUBSCRIPTION) {
        this.__log({
          name: 'store.notify.subscription',
          sourceOperation: sourceOperation,
          snapshot: snapshot,
          nextSnapshot: nextSnapshot
        });
      }

      callback(nextSnapshot);
      return snapshot.selector.owner;
    }
  }
  /**
   * Updates the Map that tracks subscriptions by id.
   * Given an updated subscription and the records that where seen
   * on the previous subscription snapshot, updates our tracking
   * to track the subscription for the newly and no longer seen ids.
   */
  ;

  _proto._updateSubscriptionsMap = function _updateSubscriptionsMap(subscription, prevSeenRecords) {
    var _iterator3 = (0, _createForOfIteratorHelper2["default"])(prevSeenRecords),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var dataId = _step3.value;

        var subscriptionsForDataId = this._subscriptionsByDataId.get(dataId);

        if (subscriptionsForDataId != null) {
          subscriptionsForDataId["delete"](subscription);

          if (subscriptionsForDataId.size === 0) {
            this._subscriptionsByDataId["delete"](dataId);
          }
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    var _iterator4 = (0, _createForOfIteratorHelper2["default"])(subscription.snapshot.seenRecords),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _dataId = _step4.value;

        var _subscriptionsForDataId = this._subscriptionsByDataId.get(_dataId);

        if (_subscriptionsForDataId != null) {
          _subscriptionsForDataId.add(subscription);
        } else {
          this._subscriptionsByDataId.set(_dataId, new Set([subscription]));
        }
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  };

  return RelayStoreSubscriptionsUsingMapByID;
}();

module.exports = RelayStoreSubscriptionsUsingMapByID;

/***/ }),

/***/ 880:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(3749));

var RelayConcreteNode = __webpack_require__(5742);

var getRelayHandleKey = __webpack_require__(9845);

var invariant = __webpack_require__(4990);

var stableCopy = __webpack_require__(4701);

var VARIABLE = RelayConcreteNode.VARIABLE,
    LITERAL = RelayConcreteNode.LITERAL,
    OBJECT_VALUE = RelayConcreteNode.OBJECT_VALUE,
    LIST_VALUE = RelayConcreteNode.LIST_VALUE;
var MODULE_COMPONENT_KEY_PREFIX = '__module_component_';
var MODULE_OPERATION_KEY_PREFIX = '__module_operation_';

function getArgumentValue(arg, variables) {
  if (arg.kind === VARIABLE) {
    // Variables are provided at runtime and are not guaranteed to be stable.
    return getStableVariableValue(arg.variableName, variables);
  } else if (arg.kind === LITERAL) {
    // The Relay compiler generates stable ConcreteArgument values.
    return arg.value;
  } else if (arg.kind === OBJECT_VALUE) {
    var value = {};
    arg.fields.forEach(function (field) {
      value[field.name] = getArgumentValue(field, variables);
    });
    return value;
  } else if (arg.kind === LIST_VALUE) {
    var _value = [];
    arg.items.forEach(function (item) {
      item != null ? _value.push(getArgumentValue(item, variables)) : null;
    });
    return _value;
  }
}
/**
 * Returns the values of field/fragment arguments as an object keyed by argument
 * names. Guaranteed to return a result with stable ordered nested values.
 */


function getArgumentValues(args, variables) {
  var values = {};
  args.forEach(function (arg) {
    values[arg.name] = getArgumentValue(arg, variables);
  });
  return values;
}
/**
 * Given a handle field and variable values, returns a key that can be used to
 * uniquely identify the combination of the handle name and argument values.
 *
 * Note: the word "storage" here refers to the fact this key is primarily used
 * when writing the results of a key in a normalized graph or "store". This
 * name was used in previous implementations of Relay internals and is also
 * used here for consistency.
 */


function getHandleStorageKey(handleField, variables) {
  var dynamicKey = handleField.dynamicKey,
      handle = handleField.handle,
      key = handleField.key,
      name = handleField.name,
      args = handleField.args,
      filters = handleField.filters;
  var handleName = getRelayHandleKey(handle, key, name);
  var filterArgs = null;

  if (args && filters && args.length !== 0 && filters.length !== 0) {
    filterArgs = args.filter(function (arg) {
      return filters.indexOf(arg.name) > -1;
    });
  }

  if (dynamicKey) {
    // "Sort" the arguments by argument name: this is done by the compiler for
    // user-supplied arguments but the dynamic argument must also be in sorted
    // order.  Note that dynamic key argument name is double-underscore-
    // -prefixed, and a double-underscore prefix is disallowed for user-supplied
    // argument names, so there's no need to actually sort.
    filterArgs = filterArgs != null ? [dynamicKey].concat((0, _toConsumableArray2["default"])(filterArgs)) : [dynamicKey];
  }

  if (filterArgs === null) {
    return handleName;
  } else {
    return formatStorageKey(handleName, getArgumentValues(filterArgs, variables));
  }
}
/**
 * Given a field and variable values, returns a key that can be used to
 * uniquely identify the combination of the field name and argument values.
 *
 * Note: the word "storage" here refers to the fact this key is primarily used
 * when writing the results of a key in a normalized graph or "store". This
 * name was used in previous implementations of Relay internals and is also
 * used here for consistency.
 */


function getStorageKey(field, variables) {
  if (field.storageKey) {
    // TODO T23663664: Handle nodes do not yet define a static storageKey.
    return field.storageKey;
  }

  var args = field.args,
      name = field.name;
  return args && args.length !== 0 ? formatStorageKey(name, getArgumentValues(args, variables)) : name;
}
/**
 * Given a `name` (eg. "foo") and an object representing argument values
 * (eg. `{orberBy: "name", first: 10}`) returns a unique storage key
 * (ie. `foo{"first":10,"orderBy":"name"}`).
 *
 * This differs from getStorageKey which requires a ConcreteNode where arguments
 * are assumed to already be sorted into a stable order.
 */


function getStableStorageKey(name, args) {
  return formatStorageKey(name, stableCopy(args));
}
/**
 * Given a name and argument values, format a storage key.
 *
 * Arguments and the values within them are expected to be ordered in a stable
 * alphabetical ordering.
 */


function formatStorageKey(name, argValues) {
  if (!argValues) {
    return name;
  }

  var values = [];

  for (var argName in argValues) {
    if (argValues.hasOwnProperty(argName)) {
      var value = argValues[argName];

      if (value != null) {
        var _JSON$stringify;

        values.push(argName + ':' + ((_JSON$stringify = JSON.stringify(value)) !== null && _JSON$stringify !== void 0 ? _JSON$stringify : 'undefined'));
      }
    }
  }

  return values.length === 0 ? name : name + "(".concat(values.join(','), ")");
}
/**
 * Given Variables and a variable name, return a variable value with
 * all values in a stable order.
 */


function getStableVariableValue(name, variables) {
  !variables.hasOwnProperty(name) ?  false ? 0 : invariant(false) : void 0; // $FlowFixMe[cannot-write]

  return stableCopy(variables[name]);
}

function getModuleComponentKey(documentName) {
  return "".concat(MODULE_COMPONENT_KEY_PREFIX).concat(documentName);
}

function getModuleOperationKey(documentName) {
  return "".concat(MODULE_OPERATION_KEY_PREFIX).concat(documentName);
}
/**
 * Constants shared by all implementations of RecordSource/MutableRecordSource/etc.
 */


var RelayStoreUtils = {
  FRAGMENTS_KEY: '__fragments',
  FRAGMENT_OWNER_KEY: '__fragmentOwner',
  FRAGMENT_PROP_NAME_KEY: '__fragmentPropName',
  MODULE_COMPONENT_KEY: '__module_component',
  // alias returned by Reader
  ID_KEY: '__id',
  REF_KEY: '__ref',
  REFS_KEY: '__refs',
  ROOT_ID: 'client:root',
  ROOT_TYPE: '__Root',
  TYPENAME_KEY: '__typename',
  INVALIDATED_AT_KEY: '__invalidated_at',
  IS_WITHIN_UNMATCHED_TYPE_REFINEMENT: '__isWithinUnmatchedTypeRefinement',
  formatStorageKey: formatStorageKey,
  getArgumentValue: getArgumentValue,
  getArgumentValues: getArgumentValues,
  getHandleStorageKey: getHandleStorageKey,
  getStorageKey: getStorageKey,
  getStableStorageKey: getStableStorageKey,
  getModuleComponentKey: getModuleComponentKey,
  getModuleOperationKey: getModuleOperationKey
};
module.exports = RelayStoreUtils;

/***/ }),

/***/ 653:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var invariant = __webpack_require__(4990);

var _require = __webpack_require__(7834),
    getFragment = _require.getFragment;

var _require2 = __webpack_require__(9797),
    getSelector = _require2.getSelector;

var contextStack = [];

function withResolverContext(context, cb) {
  contextStack.push(context);

  try {
    return cb();
  } finally {
    contextStack.pop();
  }
} // NOTE: these declarations are copied from 'useFragment'; it would be good
// to figure out how to share the same type signature between the two functions.
// The declarations ensure that the type of the returned data is:
//   - non-nullable if the provided ref type is non-nullable
//   - nullable if the provided ref type is nullable
//   - array of non-nullable if the privoided ref type is an array of
//     non-nullable refs
//   - array of nullable if the privoided ref type is an array of nullable refs


function readFragment(fragmentInput, fragmentRef) {
  if (!contextStack.length) {
    throw new Error('readFragment should be called only from within a Relay Resolver function.');
  }

  var context = contextStack[contextStack.length - 1];
  var fragmentNode = getFragment(fragmentInput);
  var fragmentSelector = getSelector(fragmentNode, fragmentRef);
  !(fragmentSelector != null) ?  false ? 0 : invariant(false) : void 0;
  !(fragmentSelector.kind === 'SingularReaderSelector') ?  false ? 0 : invariant(false) : void 0;
  return context.getDataForResolverFragment(fragmentSelector);
}

module.exports = {
  readFragment: readFragment,
  withResolverContext: withResolverContext
};

/***/ }),

/***/ 6442:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var PREFIX = 'client:__type:';
var TYPE_SCHEMA_TYPE = '__TypeSchema';

function generateTypeID(typeName) {
  return PREFIX + typeName;
}

function isTypeID(id) {
  return id.indexOf(PREFIX) === 0;
}

module.exports = {
  generateTypeID: generateTypeID,
  isTypeID: isTypeID,
  TYPE_SCHEMA_TYPE: TYPE_SCHEMA_TYPE
};

/***/ }),

/***/ 2967:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _require = __webpack_require__(5057),
    generateClientID = _require.generateClientID;

var _require2 = __webpack_require__(880),
    ROOT_ID = _require2.ROOT_ID;

var VIEWER_ID = generateClientID(ROOT_ID, 'viewer');
var VIEWER_TYPE = 'Viewer';
module.exports = {
  VIEWER_ID: VIEWER_ID,
  VIEWER_TYPE: VIEWER_TYPE
};

/***/ }),

/***/ 5829:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var areEqual = __webpack_require__(9074);

var invariant = __webpack_require__(4990);

var _require = __webpack_require__(5742),
    LINKED_FIELD = _require.LINKED_FIELD;

var _require2 = __webpack_require__(880),
    getHandleStorageKey = _require2.getHandleStorageKey;
/**
 * @private
 *
 * Creates a clone of the supplied `handleField` by finding the original linked
 * field (on which the handle was declared) among the sibling `selections`, and
 * copying its selections into the clone.
 */


function cloneRelayHandleSourceField(handleField, selections, variables) {
  var sourceField = selections.find(function (source) {
    return source.kind === LINKED_FIELD && source.name === handleField.name && source.alias === handleField.alias && areEqual(source.args, handleField.args);
  });
  !(sourceField && sourceField.kind === LINKED_FIELD) ?  false ? 0 : invariant(false) : void 0;
  var handleKey = getHandleStorageKey(handleField, variables);
  return {
    kind: 'LinkedField',
    alias: sourceField.alias,
    name: handleKey,
    storageKey: handleKey,
    args: null,
    concreteType: sourceField.concreteType,
    plural: sourceField.plural,
    selections: sourceField.selections
  };
}

module.exports = cloneRelayHandleSourceField;

/***/ }),

/***/ 2737:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var areEqual = __webpack_require__(9074);

var invariant = __webpack_require__(4990);

var _require = __webpack_require__(5742),
    SCALAR_FIELD = _require.SCALAR_FIELD;

var _require2 = __webpack_require__(880),
    getHandleStorageKey = _require2.getHandleStorageKey;
/**
 * @private
 *
 * Creates a clone of the supplied `handleField` by finding the original scalar
 * field (on which the handle was declared) among the sibling `selections`.
 */


function cloneRelayScalarHandleSourceField(handleField, selections, variables) {
  var sourceField = selections.find(function (source) {
    return source.kind === SCALAR_FIELD && source.name === handleField.name && source.alias === handleField.alias && areEqual(source.args, handleField.args);
  });
  !(sourceField && sourceField.kind === SCALAR_FIELD) ?  false ? 0 : invariant(false) : void 0;
  var handleKey = getHandleStorageKey(handleField, variables);
  return {
    kind: 'ScalarField',
    alias: sourceField.alias,
    name: handleKey,
    storageKey: handleKey,
    args: null
  };
}

module.exports = cloneRelayScalarHandleSourceField;

/***/ }),

/***/ 2961:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var RelayModernFragmentSpecResolver = __webpack_require__(8005);

var warning = __webpack_require__(480);

function createFragmentSpecResolver(context, containerName, fragments, props, rootIsQueryRenderer, callback) {
  if (false) { var fragmentNames; }

  return new RelayModernFragmentSpecResolver(context, fragments, props, callback, rootIsQueryRenderer);
}

module.exports = createFragmentSpecResolver;

/***/ }),

/***/ 5088:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var invariant = __webpack_require__(4990);

var relayContext;
var firstReact;

function createRelayContext(react) {
  if (!relayContext) {
    relayContext = react.createContext(null);

    if (false) {}

    firstReact = react;
  }

  !(react === firstReact) ?  false ? 0 : invariant(false) : void 0;
  return relayContext;
}

module.exports = createRelayContext;

/***/ }),

/***/ 7146:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _require = __webpack_require__(2967),
    VIEWER_ID = _require.VIEWER_ID,
    VIEWER_TYPE = _require.VIEWER_TYPE;

function defaultGetDataID(fieldValue, typeName) {
  if (typeName === VIEWER_TYPE) {
    // $FlowFixMe[prop-missing]
    return fieldValue.id == null ? VIEWER_ID : fieldValue.id;
  } // $FlowFixMe[prop-missing]


  return fieldValue.id;
}

module.exports = defaultGetDataID;

/***/ }),

/***/ 5346:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */


var defaultRequiredFieldLogger = function defaultRequiredFieldLogger(event) {
  if (false) {}
};

module.exports = defaultRequiredFieldLogger;

/***/ }),

/***/ 9912:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var ITERATOR_KEY = Symbol.iterator;

function hasOverlappingIDs(seenRecords, updatedRecordIDs) {
  // $FlowFixMe: Set is an iterable type, accessing its iterator is allowed.
  var iterator = seenRecords[ITERATOR_KEY]();
  var next = iterator.next();

  while (!next.done) {
    var key = next.value;

    if (updatedRecordIDs.has(key)) {
      return true;
    }

    next = iterator.next();
  }

  return false;
}

module.exports = hasOverlappingIDs;

/***/ }),

/***/ 642:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error

/**
 * Determine if a given value is an object that implements the `Environment`
 * interface defined in `RelayStoreTypes`.
 *
 * Use a sigil for detection to avoid a realm-specific instanceof check, and to
 * aid in module tree-shaking to avoid requiring all of RelayRuntime just to
 * detect its environment.
 */

function isRelayModernEnvironment(environment) {
  return Boolean(environment && environment['@@RelayModernEnvironment']);
}

module.exports = isRelayModernEnvironment;

/***/ }),

/***/ 9905:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _typeof = __webpack_require__(3634);

var invariant = __webpack_require__(4990);

var _require = __webpack_require__(7834),
    getInlineDataFragment = _require.getInlineDataFragment;

var _require2 = __webpack_require__(880),
    FRAGMENTS_KEY = _require2.FRAGMENTS_KEY;

function readInlineData(fragment, fragmentRef) {
  var _fragmentRef$FRAGMENT;

  var inlineDataFragment = getInlineDataFragment(fragment);

  if (fragmentRef == null) {
    return fragmentRef;
  }

  !(_typeof(fragmentRef) === 'object') ?  false ? 0 : invariant(false) : void 0; // $FlowFixMe[incompatible-use]

  var inlineData = (_fragmentRef$FRAGMENT = fragmentRef[FRAGMENTS_KEY]) === null || _fragmentRef$FRAGMENT === void 0 ? void 0 : _fragmentRef$FRAGMENT[inlineDataFragment.name];
  !(inlineData != null) ?  false ? 0 : invariant(false) : void 0;
  return inlineData;
}

module.exports = readInlineData;

/***/ }),

/***/ 4508:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var RelayDeclarativeMutationConfig = __webpack_require__(4697);

var RelayFeatureFlags = __webpack_require__(1054);

var warning = __webpack_require__(480);

var _require = __webpack_require__(7834),
    getRequest = _require.getRequest;

var _require2 = __webpack_require__(5057),
    generateUniqueClientID = _require2.generateUniqueClientID;

var _require3 = __webpack_require__(5989),
    createOperationDescriptor = _require3.createOperationDescriptor;

var _require4 = __webpack_require__(9797),
    createReaderSelector = _require4.createReaderSelector;

function requestSubscription(environment, config) {
  var subscription = getRequest(config.subscription);

  if (subscription.params.operationKind !== 'subscription') {
    throw new Error('requestSubscription: Must use Subscription operation');
  }

  var configs = config.configs,
      onCompleted = config.onCompleted,
      onError = config.onError,
      onNext = config.onNext,
      variables = config.variables,
      cacheConfig = config.cacheConfig;
  var operation = createOperationDescriptor(subscription, variables, cacheConfig, RelayFeatureFlags.ENABLE_UNIQUE_SUBSCRIPTION_ROOT ? generateUniqueClientID() : undefined);
   false ? 0 : void 0;

  var _ref = configs ? RelayDeclarativeMutationConfig.convert(configs, subscription, null
  /* optimisticUpdater */
  , config.updater) : config,
      updater = _ref.updater;

  var sub = environment.execute({
    operation: operation,
    updater: updater
  }).map(function (responses) {
    var selector = operation.fragment;

    if (RelayFeatureFlags.ENABLE_UNIQUE_SUBSCRIPTION_ROOT) {
      var nextID;

      if (Array.isArray(responses)) {
        var _responses$, _responses$$extension;

        nextID = (_responses$ = responses[0]) === null || _responses$ === void 0 ? void 0 : (_responses$$extension = _responses$.extensions) === null || _responses$$extension === void 0 ? void 0 : _responses$$extension.__relay_subscription_root_id;
      } else {
        var _responses$extensions;

        nextID = (_responses$extensions = responses.extensions) === null || _responses$extensions === void 0 ? void 0 : _responses$extensions.__relay_subscription_root_id;
      }

      if (typeof nextID === 'string') {
        selector = createReaderSelector(selector.node, nextID, selector.variables, selector.owner);
      }
    }

    var data = environment.lookup(selector).data; // $FlowFixMe[incompatible-cast]

    return data;
  }).subscribe({
    next: onNext,
    error: onError,
    complete: onCompleted
  });
  return {
    dispose: sub.unsubscribe
  };
}

module.exports = requestSubscription;

/***/ }),

/***/ 5742:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error

/**
 * Represents a common GraphQL request that can be executed, an `operation`
 * containing information to normalize the results, and a `fragment` derived
 * from that operation to read the response data (masking data from child
 * fragments).
 */

/**
 * Contains the parameters required for executing a GraphQL request.
 * The operation can either be provided as a persisted `id` or `text`. If given
 * in `text` format, a `cacheID` as a hash of the text should be set to be used
 * for local caching.
 */

var RelayConcreteNode = {
  CONDITION: 'Condition',
  CLIENT_COMPONENT: 'ClientComponent',
  CLIENT_EXTENSION: 'ClientExtension',
  DEFER: 'Defer',
  CONNECTION: 'Connection',
  FLIGHT_FIELD: 'FlightField',
  FRAGMENT: 'Fragment',
  FRAGMENT_SPREAD: 'FragmentSpread',
  INLINE_DATA_FRAGMENT_SPREAD: 'InlineDataFragmentSpread',
  INLINE_DATA_FRAGMENT: 'InlineDataFragment',
  INLINE_FRAGMENT: 'InlineFragment',
  LINKED_FIELD: 'LinkedField',
  LINKED_HANDLE: 'LinkedHandle',
  LITERAL: 'Literal',
  LIST_VALUE: 'ListValue',
  LOCAL_ARGUMENT: 'LocalArgument',
  MODULE_IMPORT: 'ModuleImport',
  RELAY_RESOLVER: 'RelayResolver',
  REQUIRED_FIELD: 'RequiredField',
  OBJECT_VALUE: 'ObjectValue',
  OPERATION: 'Operation',
  REQUEST: 'Request',
  ROOT_ARGUMENT: 'RootArgument',
  SCALAR_FIELD: 'ScalarField',
  SCALAR_HANDLE: 'ScalarHandle',
  SPLIT_OPERATION: 'SplitOperation',
  STREAM: 'Stream',
  TYPE_DISCRIMINATOR: 'TypeDiscriminator',
  VARIABLE: 'Variable'
};
module.exports = RelayConcreteNode;

/***/ }),

/***/ 4083:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


module.exports = {
  DEFAULT_HANDLE_KEY: ''
};

/***/ }),

/***/ 6030:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error

/**
 * @private
 */

function createError(type, name, messageFormat) {
  for (var _len = arguments.length, messageParams = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    messageParams[_key - 3] = arguments[_key];
  }

  var index = 0;
  var message = messageFormat.replace(/%s/g, function () {
    return String(messageParams[index++]);
  });
  var err = new Error(message);
  var error = Object.assign(err, {
    name: name,
    messageFormat: messageFormat,
    messageParams: messageParams,
    type: type,
    taalOpcodes: [2, 2] // skip frame (code=2) twice

  }); // In V8, Error objects keep the closure scope chain alive until the
  // err.stack property is accessed.

  if (error.stack === undefined) {
    // IE sets the stack only if error is thrown
    try {
      throw error;
    } catch (_unused) {}
  }

  return error;
}

module.exports = {
  create: function create(name, messageFormat) {
    for (var _len2 = arguments.length, messageParams = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      messageParams[_key2 - 2] = arguments[_key2];
    }

    return createError.apply(void 0, ['error', name, messageFormat].concat(messageParams));
  },
  createWarning: function createWarning(name, messageFormat) {
    for (var _len3 = arguments.length, messageParams = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
      messageParams[_key3 - 2] = arguments[_key3];
    }

    return createError.apply(void 0, ['warn', name, messageFormat].concat(messageParams));
  }
};

/***/ }),

/***/ 1054:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var RelayFeatureFlags = {
  ENABLE_VARIABLE_CONNECTION_KEY: false,
  ENABLE_PARTIAL_RENDERING_DEFAULT: true,
  ENABLE_RELAY_CONTAINERS_SUSPENSE: true,
  ENABLE_PRECISE_TYPE_REFINEMENT: false,
  ENABLE_REACT_FLIGHT_COMPONENT_FIELD: false,
  ENABLE_REQUIRED_DIRECTIVES: false,
  ENABLE_RELAY_RESOLVERS: false,
  ENABLE_GETFRAGMENTIDENTIFIER_OPTIMIZATION: false,
  ENABLE_FRIENDLY_QUERY_NAME_GQL_URL: false,
  ENABLE_STORE_SUBSCRIPTIONS_REFACTOR: false,
  ENABLE_LOAD_QUERY_REQUEST_DEDUPING: true,
  ENABLE_DO_NOT_WRAP_LIVE_QUERY: false,
  ENABLE_NOTIFY_SUBSCRIPTION: false,
  ENABLE_UNIQUE_SUBSCRIPTION_ROOT: false,
  ENABLE_BATCHED_STORE_UPDATES: false
};
module.exports = RelayFeatureFlags;

/***/ }),

/***/ 4678:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var profileHandlersByName = {};
var defaultProfiler = {
  stop: function stop() {}
};
/**
 * @public
 *
 * Instruments methods to allow profiling various parts of Relay. Profiling code
 * in Relay consists of three steps:
 *
 *  - Instrument the function to be profiled.
 *  - Attach handlers to the instrumented function.
 *  - Run the code which triggers the handlers.
 *
 * Handlers attached to instrumented methods are called with an instrumentation
 * name and a callback that must be synchronously executed:
 *
 *   instrumentedMethod.attachHandler(function(name, callback) {
 *     const start = performance.now();
 *     callback();
 *     console.log('Duration', performance.now() - start);
 *   });
 *
 * Handlers for profiles are callbacks that return a stop method:
 *
 *   RelayProfiler.attachProfileHandler('profileName', (name, state) => {
 *     const start = performance.now();
 *     return function stop(name, state) {
 *       console.log(`Duration (${name})`, performance.now() - start);
 *     }
 *   });
 */

var RelayProfiler = {
  /**
   * Instruments profiling for arbitrarily asynchronous code by a name.
   *
   *   const timerProfiler = RelayProfiler.profile('timeout');
   *   setTimeout(function() {
   *     timerProfiler.stop();
   *   }, 1000);
   *
   *   RelayProfiler.attachProfileHandler('timeout', ...);
   *
   * Arbitrary state can also be passed into `profile` as a second argument. The
   * attached profile handlers will receive this as the second argument.
   */
  profile: function profile(name, state) {
    var handlers = profileHandlersByName[name];

    if (handlers && handlers.length > 0) {
      var stopHandlers = [];

      for (var ii = handlers.length - 1; ii >= 0; ii--) {
        var stopHandler = handlers[ii](name, state);
        stopHandlers.unshift(stopHandler);
      }

      return {
        stop: function stop(error) {
          stopHandlers.forEach(function (stopHandler) {
            return stopHandler(error);
          });
        }
      };
    }

    return defaultProfiler;
  },

  /**
   * Attaches a handler to profiles with the supplied name.
   */
  attachProfileHandler: function attachProfileHandler(name, handler) {
    if (!profileHandlersByName.hasOwnProperty(name)) {
      profileHandlersByName[name] = [];
    }

    profileHandlersByName[name].push(handler);
  },

  /**
   * Detaches a handler attached via `attachProfileHandler`.
   */
  detachProfileHandler: function detachProfileHandler(name, handler) {
    if (profileHandlersByName.hasOwnProperty(name)) {
      removeFromArray(profileHandlersByName[name], handler);
    }
  }
};

function removeFromArray(array, element) {
  var index = array.indexOf(element);

  if (index !== -1) {
    array.splice(index, 1);
  }
}

module.exports = RelayProfiler;

/***/ }),

/***/ 1808:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _defineProperty2 = _interopRequireDefault(__webpack_require__(3116));

var RelayObservable = __webpack_require__(7429);

var invariant = __webpack_require__(4990);
/**
 * An implementation of a `ReplaySubject` for Relay Observables.
 *
 * Records events provided and synchronously plays them back to new subscribers,
 * as well as forwarding new asynchronous events.
 */


var RelayReplaySubject = /*#__PURE__*/function () {
  function RelayReplaySubject() {
    var _this = this;

    (0, _defineProperty2["default"])(this, "_complete", false);
    (0, _defineProperty2["default"])(this, "_events", []);
    (0, _defineProperty2["default"])(this, "_sinks", new Set());
    (0, _defineProperty2["default"])(this, "_subscription", null);
    this._observable = RelayObservable.create(function (sink) {
      _this._sinks.add(sink);

      var events = _this._events;

      for (var i = 0; i < events.length; i++) {
        if (sink.closed) {
          // Bail if an event made the observer unsubscribe.
          break;
        }

        var event = events[i];

        switch (event.kind) {
          case 'complete':
            sink.complete();
            break;

          case 'error':
            sink.error(event.error);
            break;

          case 'next':
            sink.next(event.data);
            break;

          default:
            event.kind;
             true ?  false ? 0 : invariant(false) : 0;
        }
      }

      return function () {
        _this._sinks["delete"](sink);
      };
    });
  }

  var _proto = RelayReplaySubject.prototype;

  _proto.complete = function complete() {
    if (this._complete === true) {
      return;
    }

    this._complete = true;

    this._events.push({
      kind: 'complete'
    });

    this._sinks.forEach(function (sink) {
      return sink.complete();
    });
  };

  _proto.error = function error(_error) {
    if (this._complete === true) {
      return;
    }

    this._complete = true;

    this._events.push({
      kind: 'error',
      error: _error
    });

    this._sinks.forEach(function (sink) {
      return sink.error(_error);
    });
  };

  _proto.next = function next(data) {
    if (this._complete === true) {
      return;
    }

    this._events.push({
      kind: 'next',
      data: data
    });

    this._sinks.forEach(function (sink) {
      return sink.next(data);
    });
  };

  _proto.subscribe = function subscribe(observer) {
    this._subscription = this._observable.subscribe(observer);
    return this._subscription;
  };

  _proto.unsubscribe = function unsubscribe() {
    if (this._subscription) {
      this._subscription.unsubscribe();

      this._subscription = null;
    }
  };

  _proto.getObserverCount = function getObserverCount() {
    return this._sinks.size;
  };

  return RelayReplaySubject;
}();

module.exports = RelayReplaySubject;

/***/ }),

/***/ 6177:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+relay
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _interopRequireDefault = __webpack_require__(249);

var _objectSpread2 = _interopRequireDefault(__webpack_require__(4638));

var _require = __webpack_require__(880),
    getModuleComponentKey = _require.getModuleComponentKey,
    getModuleOperationKey = _require.getModuleOperationKey;

function createPayloadFor3DField(name, operation, component, response) {
  var data = (0, _objectSpread2["default"])({}, response);
  data[getModuleComponentKey(name)] = component;
  data[getModuleOperationKey(name)] = operation;
  return data;
}

module.exports = createPayloadFor3DField;

/***/ }),

/***/ 5274:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error

/**
 * Recursively "deep" freezes the supplied object.
 *
 * For convenience, and for consistency with the behavior of `Object.freeze`,
 * returns the now-frozen original object.
 */

var _typeof = __webpack_require__(3634);

function deepFreeze(object) {
  Object.freeze(object);
  Object.getOwnPropertyNames(object).forEach(function (name) {
    // $FlowFixMe[prop-missing]
    var property = object[name];

    if (property && _typeof(property) === 'object' && !Object.isFrozen(property)) {
      deepFreeze(property);
    }
  });
  return object;
}

module.exports = deepFreeze;

/***/ }),

/***/ 3845:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var id = 100000;

function generateID() {
  return id++;
}

module.exports = generateID;

/***/ }),

/***/ 4092:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 * @emails oncall+relay
 */
// flowlint ambiguous-object-type:error


var RelayFeatureFlags = __webpack_require__(1054);

var isEmptyObject = __webpack_require__(9382);

var stableCopy = __webpack_require__(4701);

var _require = __webpack_require__(9797),
    getDataIDsFromFragment = _require.getDataIDsFromFragment,
    getVariablesFromFragment = _require.getVariablesFromFragment,
    getSelector = _require.getSelector;

function getFragmentIdentifier(fragmentNode, fragmentRef) {
  var selector = getSelector(fragmentNode, fragmentRef);
  var fragmentOwnerIdentifier = selector == null ? 'null' : selector.kind === 'SingularReaderSelector' ? selector.owner.identifier : '[' + selector.selectors.map(function (sel) {
    return sel.owner.identifier;
  }).join(',') + ']';
  var fragmentVariables = getVariablesFromFragment(fragmentNode, fragmentRef);
  var dataIDs = getDataIDsFromFragment(fragmentNode, fragmentRef);

  if (RelayFeatureFlags.ENABLE_GETFRAGMENTIDENTIFIER_OPTIMIZATION) {
    return fragmentOwnerIdentifier + '/' + fragmentNode.name + '/' + (fragmentVariables == null || isEmptyObject(fragmentVariables) ? '{}' : JSON.stringify(stableCopy(fragmentVariables))) + '/' + (typeof dataIDs === 'undefined' ? 'missing' : dataIDs == null ? 'null' : Array.isArray(dataIDs) ? '[' + dataIDs.join(',') + ']' : dataIDs);
  } else {
    var _JSON$stringify;

    return fragmentOwnerIdentifier + '/' + fragmentNode.name + '/' + JSON.stringify(stableCopy(fragmentVariables)) + '/' + ((_JSON$stringify = JSON.stringify(dataIDs)) !== null && _JSON$stringify !== void 0 ? _JSON$stringify : 'missing');
  }
}

module.exports = getFragmentIdentifier;

/***/ }),

/***/ 4858:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 * @emails oncall+relay
 */
// flowlint ambiguous-object-type:error


var _require = __webpack_require__(5742),
    REQUEST = _require.REQUEST,
    SPLIT_OPERATION = _require.SPLIT_OPERATION;
/**
 * OperationLoaders can return either a NormalizationSplitOperation or
 * ConcreteRequest.
 */


function getOperation(node) {
  switch (node.kind) {
    case REQUEST:
      return node.operation;

    case SPLIT_OPERATION:
    default:
      return node;
  }
}

module.exports = getOperation;

/***/ }),

/***/ 9845:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var invariant = __webpack_require__(4990);

var _require = __webpack_require__(4083),
    DEFAULT_HANDLE_KEY = _require.DEFAULT_HANDLE_KEY;
/**
 * @internal
 *
 * Helper to create a unique name for a handle field based on the handle name, handle key and
 * source field.
 */


function getRelayHandleKey(handleName, key, fieldName) {
  if (key && key !== DEFAULT_HANDLE_KEY) {
    return "__".concat(key, "_").concat(handleName);
  }

  !(fieldName != null) ?  false ? 0 : invariant(false) : void 0;
  return "__".concat(fieldName, "_").concat(handleName);
}

module.exports = getRelayHandleKey;

/***/ }),

/***/ 3928:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var invariant = __webpack_require__(4990);

var stableCopy = __webpack_require__(4701);
/**
 * Returns a stable identifier for the given pair of `RequestParameters` +
 * variables.
 */


function getRequestIdentifier(parameters, variables) {
  var requestID = parameters.cacheID != null ? parameters.cacheID : parameters.id;
  !(requestID != null) ?  false ? 0 : invariant(false) : void 0;
  return requestID + JSON.stringify(stableCopy(variables));
}

module.exports = getRequestIdentifier;

/***/ }),

/***/ 9382:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 * @emails oncall+relay
 */


var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmptyObject(obj) {
  for (var _key in obj) {
    if (hasOwnProperty.call(obj, _key)) {
      return false;
    }
  }

  return true;
}

module.exports = isEmptyObject;

/***/ }),

/***/ 1496:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


function isPromise(p) {
  return !!p && typeof p.then === 'function';
}

module.exports = isPromise;

/***/ }),

/***/ 2485:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error

/**
 * A fast test to determine if two values are equal scalars:
 * - compares scalars such as booleans, strings, numbers by value
 * - compares functions by identity
 * - returns false for complex values, since these cannot be cheaply tested for
 *   equality (use `areEquals` instead)
 */

var _typeof = __webpack_require__(3634);

function isScalarAndEqual(valueA, valueB) {
  return valueA === valueB && (valueA === null || _typeof(valueA) !== 'object');
}

module.exports = isScalarAndEqual;

/***/ }),

/***/ 9278:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var _typeof = __webpack_require__(3634);

var hasWeakSetDefined = typeof WeakSet !== 'undefined';
var hasWeakMapDefined = typeof WeakMap !== 'undefined';
/**
 * Recycles subtrees from `prevData` by replacing equal subtrees in `nextData`.
 */

function recycleNodesInto(prevData, nextData) {
  if (prevData === nextData || _typeof(prevData) !== 'object' || prevData instanceof Set || prevData instanceof Map || hasWeakSetDefined && prevData instanceof WeakSet || hasWeakMapDefined && prevData instanceof WeakMap || !prevData || _typeof(nextData) !== 'object' || nextData instanceof Set || nextData instanceof Map || hasWeakSetDefined && nextData instanceof WeakSet || hasWeakMapDefined && nextData instanceof WeakMap || !nextData) {
    return nextData;
  }

  var canRecycle = false; // Assign local variables to preserve Flow type refinement.

  var prevArray = Array.isArray(prevData) ? prevData : null;
  var nextArray = Array.isArray(nextData) ? nextData : null;

  if (prevArray && nextArray) {
    canRecycle = nextArray.reduce(function (wasEqual, nextItem, ii) {
      var prevValue = prevArray[ii];
      var nextValue = recycleNodesInto(prevValue, nextItem);

      if (nextValue !== nextArray[ii]) {
        if (false) {} else {
          nextArray[ii] = nextValue;
        }
      }

      return wasEqual && nextValue === prevArray[ii];
    }, true) && prevArray.length === nextArray.length;
  } else if (!prevArray && !nextArray) {
    // Assign local variables to preserve Flow type refinement.
    var prevObject = prevData;
    var nextObject = nextData;
    var prevKeys = Object.keys(prevObject);
    var nextKeys = Object.keys(nextObject);
    canRecycle = nextKeys.reduce(function (wasEqual, key) {
      var prevValue = prevObject[key];
      var nextValue = recycleNodesInto(prevValue, nextObject[key]);

      if (nextValue !== nextObject[key]) {
        if (false) {} else {
          // $FlowFixMe[cannot-write]
          nextObject[key] = nextValue;
        }
      }

      return wasEqual && nextValue === prevObject[key];
    }, true) && prevKeys.length === nextKeys.length;
  }

  return canRecycle ? prevData : nextData;
}

module.exports = recycleNodesInto;

/***/ }),

/***/ 2111:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @emails oncall+relay
 * @format
 */


function reportMissingRequiredFields(environment, missingRequiredFields) {
  switch (missingRequiredFields.action) {
    case 'THROW':
      {
        var _missingRequiredField = missingRequiredFields.field,
            path = _missingRequiredField.path,
            owner = _missingRequiredField.owner; // This gives the consumer the chance to throw their own error if they so wish.

        environment.requiredFieldLogger({
          kind: 'missing_field.throw',
          owner: owner,
          fieldPath: path
        });
        throw new Error("Relay: Missing @required value at path '".concat(path, "' in '").concat(owner, "'."));
      }

    case 'LOG':
      missingRequiredFields.fields.forEach(function (_ref) {
        var path = _ref.path,
            owner = _ref.owner;
        environment.requiredFieldLogger({
          kind: 'missing_field.log',
          owner: owner,
          fieldPath: path
        });
      });
      break;

    default:
      {
        missingRequiredFields.action;
      }
  }
}

module.exports = reportMissingRequiredFields;

/***/ }),

/***/ 3182:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error


var resolvedPromise = Promise.resolve();
/**
 * An alternative to setImmediate based on Promise.
 */

function resolveImmediate(callback) {
  resolvedPromise.then(callback)["catch"](throwNext);
}

function throwNext(error) {
  setTimeout(function () {
    throw error;
  }, 0);
}

module.exports = resolveImmediate;

/***/ }),

/***/ 4701:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
// flowlint ambiguous-object-type:error

/**
 * Creates a copy of the provided value, ensuring any nested objects have their
 * keys sorted such that equivalent values would have identical JSON.stringify
 * results.
 */

var _typeof = __webpack_require__(3634);

function stableCopy(value) {
  if (!value || _typeof(value) !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(stableCopy);
  }

  var keys = Object.keys(value).sort();
  var stable = {};

  for (var i = 0; i < keys.length; i++) {
    stable[keys[i]] = stableCopy(value[keys[i]]);
  }

  return stable;
}

module.exports = stableCopy;

/***/ }),

/***/ 5530:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* tslint:disable */

/* eslint-disable */
// @ts-nocheck

/*
query accountSettingsQuery {
  me {
    id
    email
    name
  }
}
*/
var node = function () {
  var v0 = [{
    "alias": null,
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "me",
    "plural": false,
    "selections": [{
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }, {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "email",
      "storageKey": null
    }, {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }],
    "storageKey": null
  }];
  return {
    "fragment": {
      "argumentDefinitions": [],
      "kind": "Fragment",
      "metadata": null,
      "name": "accountSettingsQuery",
      "selections": v0
      /*: any*/
      ,
      "type": "Root",
      "abstractKey": null
    },
    "kind": "Request",
    "operation": {
      "argumentDefinitions": [],
      "kind": "Operation",
      "name": "accountSettingsQuery",
      "selections": v0
      /*: any*/

    },
    "params": {
      "cacheID": "19fa40167cdff4b3b5bf10bbddd7df6f",
      "id": null,
      "metadata": {},
      "name": "accountSettingsQuery",
      "operationKind": "query",
      "text": "query accountSettingsQuery {\n  me {\n    id\n    email\n    name\n  }\n}\n"
    }
  };
}();

node.hash = '6fe8891a11bf2429aa255fc4739d1cfd';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (node);

/***/ }),

/***/ 1101:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* tslint:disable */

/* eslint-disable */
// @ts-nocheck

/*
query homeQuery {
  me {
    ...CurrentUser_me
    id
    name
    email
  }
}

fragment CurrentUser_me on User {
  id
  email
  name
  picture {
    url
  }
}
*/
var node = function () {
  var v0 = {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  },
      v1 = {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
      v2 = {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "email",
    "storageKey": null
  };
  return {
    "fragment": {
      "argumentDefinitions": [],
      "kind": "Fragment",
      "metadata": null,
      "name": "homeQuery",
      "selections": [{
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [v0
        /*: any*/
        , v1
        /*: any*/
        , v2
        /*: any*/
        , {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CurrentUser_me"
        }],
        "storageKey": null
      }],
      "type": "Root",
      "abstractKey": null
    },
    "kind": "Request",
    "operation": {
      "argumentDefinitions": [],
      "kind": "Operation",
      "name": "homeQuery",
      "selections": [{
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [v0
        /*: any*/
        , v2
        /*: any*/
        , v1
        /*: any*/
        , {
          "alias": null,
          "args": null,
          "concreteType": "Picture",
          "kind": "LinkedField",
          "name": "picture",
          "plural": false,
          "selections": [{
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "url",
            "storageKey": null
          }],
          "storageKey": null
        }],
        "storageKey": null
      }]
    },
    "params": {
      "cacheID": "c2ba8e376258be03fc0181dfe336cb07",
      "id": null,
      "metadata": {},
      "name": "homeQuery",
      "operationKind": "query",
      "text": "query homeQuery {\n  me {\n    ...CurrentUser_me\n    id\n    name\n    email\n  }\n}\n\nfragment CurrentUser_me on User {\n  id\n  email\n  name\n  picture {\n    url\n  }\n}\n"
    }
  };
}();

node.hash = 'b1deae71bd069034e5cb3f0fc415723c';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (node);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./.yarn/cache/@babel-runtime-npm-7.14.0-fba2a32266-ab6653f2f8.zip/node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
;// CONCATENATED MODULE: ./.yarn/cache/@babel-runtime-npm-7.14.0-fba2a32266-ab6653f2f8.zip/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}
// EXTERNAL MODULE: ./.yarn/cache/@babel-runtime-npm-7.14.0-fba2a32266-ab6653f2f8.zip/node_modules/@babel/runtime/regenerator/index.js
var regenerator = __webpack_require__(5776);
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator);
// EXTERNAL MODULE: ./.yarn/cache/@cloudflare-kv-asset-handler-npm-0.1.2-d56ac1d901-1a1bb7af15.zip/node_modules/@cloudflare/kv-asset-handler/dist/index.js
var dist = __webpack_require__(4074);
;// CONCATENATED MODULE: ./config.ts


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */

/* SPDX-License-Identifier: MIT */

/**
 * Client-side application settings for the local development environment.
 */
var local = {
  // Core application settings
  app: {
    name: "React App",
    origin: "http://localhost:3000",
    env: "local"
  },
  // GraphQL API and OAuth endpoint(s)
  // https://github.com/kriasoft/node-starter-kit
  api: {
    origin: "https://us-central1-kriasoft.cloudfunctions.net",
    prefix: "/reactstarter",
    // Cloud Function URL pathname
    path: "/api"
  },
  // Firebase / Firestore (optional)
  // https://firebase.google.com/docs/firestore
  firebase: {
    authKey: "xxxxx",
    authDomain: "https://example.firebaseapp.com",
    projectId: "example"
  }
};
/**
 * Client-side application settings for the test / QA environment.
 */

var test = {
  app: _objectSpread(_objectSpread({}, local.app), {}, {
    origin: "https://test.example.com",
    env: "test"
  }),
  api: _objectSpread(_objectSpread({}, local.api), {}, {
    origin: "https://us-central1.example-test.cloudfunctions.net"
  }),
  firebase: {
    authKey: "xxxxx",
    authDomain: "https://example-test.firebaseapp.com",
    projectId: "example-test"
  }
};
/**
 * Client-side application settings for the production environment.
 */

var prod = {
  app: _objectSpread(_objectSpread({}, local.app), {}, {
    origin: "https://example.com",
    env: "prod"
  }),
  api: _objectSpread(_objectSpread({}, local.api), {}, {
    origin: "https://us-central1.example.cloudfunctions.net"
  }),
  firebase: {
    authKey: "xxxxx",
    authDomain: "https://example.firebaseapp.com",
    projectId: "example"
  }
};
/* harmony default export */ const config = ({
  local: local,
  test: test,
  prod: prod
});
// EXTERNAL MODULE: ./.yarn/cache/relay-runtime-npm-11.0.2-c3b3a84bb1-64f767da52.zip/node_modules/relay-runtime/index.js
var relay_runtime = __webpack_require__(3271);
;// CONCATENATED MODULE: ./core/config.ts
/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */

/* SPDX-License-Identifier: MIT */
 // Get the name of the current environment from `<body data-env="...">`,
// which is being injected by the Cloudflare Worker script.

var envName = document.body.dataset.env || "local";
var config_config = config[envName];
if (!config_config) throw new Error();

;// CONCATENATED MODULE: ./core/relay.ts


function relay_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function relay_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { relay_ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { relay_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */

/* SPDX-License-Identifier: MIT */



/* eslint-disable @typescript-eslint/no-explicit-any */
function createRelay() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var recordSource = new relay_runtime.RecordSource(config.records);
  var store = new relay_runtime.Store(recordSource);
  var baseUrl = config.baseUrl || "";
  var network = relay_runtime.Network.create(function (operation, variables) {
    var _config$request;

    var cookie = (_config$request = config.request) === null || _config$request === void 0 ? void 0 : _config$request.headers.get("cookie");
    return fetch("".concat(baseUrl).concat(config_config.api.path), relay_objectSpread({
      method: "POST",
      headers: relay_objectSpread(relay_objectSpread({}, cookie && {
        cookie: cookie
      }), {}, {
        "content-Type": "application/json"
      }),
      body: JSON.stringify({
        query: operation.text,
        variables: variables
      })
    }, !config.request && {
      credentials: "include"
    })).then(function (res) {
      return res.json();
    });
  });
  return new relay_runtime.Environment({
    store: store,
    network: network,
    handlerProvider: null
  });
}
;// CONCATENATED MODULE: ./.yarn/cache/@babel-runtime-npm-7.14.0-fba2a32266-ab6653f2f8.zip/node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
;// CONCATENATED MODULE: ./.yarn/cache/@babel-runtime-npm-7.14.0-fba2a32266-ab6653f2f8.zip/node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
;// CONCATENATED MODULE: ./.yarn/cache/@babel-runtime-npm-7.14.0-fba2a32266-ab6653f2f8.zip/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
;// CONCATENATED MODULE: ./.yarn/cache/@babel-runtime-npm-7.14.0-fba2a32266-ab6653f2f8.zip/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
;// CONCATENATED MODULE: ./.yarn/cache/@babel-runtime-npm-7.14.0-fba2a32266-ab6653f2f8.zip/node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
;// CONCATENATED MODULE: ./.yarn/cache/@babel-runtime-npm-7.14.0-fba2a32266-ab6653f2f8.zip/node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
;// CONCATENATED MODULE: ./.yarn/cache/path-to-regexp-npm-6.2.0-efbac3c1ff-4116de71f5.zip/node_modules/path-to-regexp/dist.es2015/index.js


/**
 * Tokenize input string.
 */
function lexer(str) {
  var tokens = [];
  var i = 0;

  while (i < str.length) {
    var char = str[i];

    if (char === "*" || char === "+" || char === "?") {
      tokens.push({
        type: "MODIFIER",
        index: i,
        value: str[i++]
      });
      continue;
    }

    if (char === "\\") {
      tokens.push({
        type: "ESCAPED_CHAR",
        index: i++,
        value: str[i++]
      });
      continue;
    }

    if (char === "{") {
      tokens.push({
        type: "OPEN",
        index: i,
        value: str[i++]
      });
      continue;
    }

    if (char === "}") {
      tokens.push({
        type: "CLOSE",
        index: i,
        value: str[i++]
      });
      continue;
    }

    if (char === ":") {
      var name = "";
      var j = i + 1;

      while (j < str.length) {
        var code = str.charCodeAt(j);

        if ( // `0-9`
        code >= 48 && code <= 57 || // `A-Z`
        code >= 65 && code <= 90 || // `a-z`
        code >= 97 && code <= 122 || // `_`
        code === 95) {
          name += str[j++];
          continue;
        }

        break;
      }

      if (!name) throw new TypeError("Missing parameter name at " + i);
      tokens.push({
        type: "NAME",
        index: i,
        value: name
      });
      i = j;
      continue;
    }

    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;

      if (str[j] === "?") {
        throw new TypeError("Pattern cannot start with \"?\" at " + j);
      }

      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }

        if (str[j] === ")") {
          count--;

          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;

          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at " + j);
          }
        }

        pattern += str[j++];
      }

      if (count) throw new TypeError("Unbalanced pattern at " + i);
      if (!pattern) throw new TypeError("Missing pattern at " + i);
      tokens.push({
        type: "PATTERN",
        index: i,
        value: pattern
      });
      i = j;
      continue;
    }

    tokens.push({
      type: "CHAR",
      index: i,
      value: str[i++]
    });
  }

  tokens.push({
    type: "END",
    index: i,
    value: ""
  });
  return tokens;
}
/**
 * Parse a string for the raw tokens.
 */


function parse(str, options) {
  if (options === void 0) {
    options = {};
  }

  var tokens = lexer(str);
  var _a = options.prefixes,
      prefixes = _a === void 0 ? "./" : _a;
  var defaultPattern = "[^" + escapeString(options.delimiter || "/#?") + "]+?";
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";

  var tryConsume = function tryConsume(type) {
    if (i < tokens.length && tokens[i].type === type) return tokens[i++].value;
  };

  var mustConsume = function mustConsume(type) {
    var value = tryConsume(type);
    if (value !== undefined) return value;
    var _a = tokens[i],
        nextType = _a.type,
        index = _a.index;
    throw new TypeError("Unexpected " + nextType + " at " + index + ", expected " + type);
  };

  var consumeText = function consumeText() {
    var result = "";
    var value; // tslint:disable-next-line

    while (value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result += value;
    }

    return result;
  };

  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");

    if (name || pattern) {
      var prefix = char || "";

      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }

      if (path) {
        result.push(path);
        path = "";
      }

      result.push({
        name: name || key++,
        prefix: prefix,
        suffix: "",
        pattern: pattern || defaultPattern,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }

    var value = char || tryConsume("ESCAPED_CHAR");

    if (value) {
      path += value;
      continue;
    }

    if (path) {
      result.push(path);
      path = "";
    }

    var open = tryConsume("OPEN");

    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
        prefix: prefix,
        suffix: suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }

    mustConsume("END");
  }

  return result;
}
/**
 * Compile a string to a template function for the path.
 */

function compile(str, options) {
  return tokensToFunction(parse(str, options), options);
}
/**
 * Expose a method for transforming tokens into the path function.
 */

function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }

  var reFlags = flags(options);
  var _a = options.encode,
      encode = _a === void 0 ? function (x) {
    return x;
  } : _a,
      _b = options.validate,
      validate = _b === void 0 ? true : _b; // Compile all the tokens into regexps.

  var matches = tokens.map(function (token) {
    if (_typeof(token) === "object") {
      return new RegExp("^(?:" + token.pattern + ")$", reFlags);
    }
  });
  return function (data) {
    var path = "";

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === "string") {
        path += token;
        continue;
      }

      var value = data ? data[token.name] : undefined;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";

      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError("Expected \"" + token.name + "\" to not repeat, but got an array");
        }

        if (value.length === 0) {
          if (optional) continue;
          throw new TypeError("Expected \"" + token.name + "\" to not be empty");
        }

        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);

          if (validate && !matches[i].test(segment)) {
            throw new TypeError("Expected all \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
          }

          path += token.prefix + segment + token.suffix;
        }

        continue;
      }

      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);

        if (validate && !matches[i].test(segment)) {
          throw new TypeError("Expected \"" + token.name + "\" to match \"" + token.pattern + "\", but got \"" + segment + "\"");
        }

        path += token.prefix + segment + token.suffix;
        continue;
      }

      if (optional) continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError("Expected \"" + token.name + "\" to be " + typeOfMessage);
    }

    return path;
  };
}
/**
 * Create path match function from `path-to-regexp` spec.
 */

function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
/**
 * Create a path match function from `path-to-regexp` output.
 */

function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }

  var _a = options.decode,
      decode = _a === void 0 ? function (x) {
    return x;
  } : _a;
  return function (pathname) {
    var m = re.exec(pathname);
    if (!m) return false;
    var path = m[0],
        index = m.index;
    var params = Object.create(null);

    var _loop_1 = function _loop_1(i) {
      // tslint:disable-next-line
      if (m[i] === undefined) return "continue";
      var key = keys[i - 1];

      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i].split(key.prefix + key.suffix).map(function (value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i], key);
      }
    };

    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }

    return {
      path: path,
      index: index,
      params: params
    };
  };
}
/**
 * Escape a regular expression string.
 */

function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */


function flags(options) {
  return options && options.sensitive ? "" : "i";
}
/**
 * Pull out keys from a regexp.
 */


function regexpToRegexp(path, keys) {
  if (!keys) return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);

  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }

  return path;
}
/**
 * Transform an array into a regexp.
 */


function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function (path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:" + parts.join("|") + ")", flags(options));
}
/**
 * Create a path regexp from string input.
 */


function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
/**
 * Expose a function for taking tokens and returning a RegExp.
 */


function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }

  var _a = options.strict,
      strict = _a === void 0 ? false : _a,
      _b = options.start,
      start = _b === void 0 ? true : _b,
      _c = options.end,
      end = _c === void 0 ? true : _c,
      _d = options.encode,
      encode = _d === void 0 ? function (x) {
    return x;
  } : _d;
  var endsWith = "[" + escapeString(options.endsWith || "") + "]|$";
  var delimiter = "[" + escapeString(options.delimiter || "/#?") + "]";
  var route = start ? "^" : ""; // Iterate over the tokens and create our regexp string.

  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];

    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));

      if (token.pattern) {
        if (keys) keys.push(token);

        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:" + prefix + "((?:" + token.pattern + ")(?:" + suffix + prefix + "(?:" + token.pattern + "))*)" + suffix + ")" + mod;
          } else {
            route += "(?:" + prefix + "(" + token.pattern + ")" + suffix + ")" + token.modifier;
          }
        } else {
          route += "(" + token.pattern + ")" + token.modifier;
        }
      } else {
        route += "(?:" + prefix + suffix + ")" + token.modifier;
      }
    }
  }

  if (end) {
    if (!strict) route += delimiter + "?";
    route += !options.endsWith ? "$" : "(?=" + endsWith + ")";
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiter.indexOf(endToken[endToken.length - 1]) > -1 : // tslint:disable-next-line
    endToken === undefined;

    if (!strict) {
      route += "(?:" + delimiter + "(?=" + endsWith + "))?";
    }

    if (!isEndDelimited) {
      route += "(?=" + delimiter + "|" + endsWith + ")";
    }
  }

  return new RegExp(route, flags(options));
}
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 */

function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp) return regexpToRegexp(path, keys);
  if (Array.isArray(path)) return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
// EXTERNAL MODULE: ./.yarn/$$virtual/react-relay-virtual-d11ef56862/0/cache/react-relay-npm-11.0.2-b643d9cfd2-eeb6024266.zip/node_modules/react-relay/index.js
var react_relay = __webpack_require__(5828);
;// CONCATENATED MODULE: ./.yarn/cache/@babel-runtime-npm-7.14.0-fba2a32266-ab6653f2f8.zip/node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
;// CONCATENATED MODULE: ./.yarn/cache/@babel-runtime-npm-7.14.0-fba2a32266-ab6653f2f8.zip/node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
;// CONCATENATED MODULE: ./.yarn/cache/@babel-runtime-npm-7.14.0-fba2a32266-ab6653f2f8.zip/node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
;// CONCATENATED MODULE: ./.yarn/cache/@babel-runtime-npm-7.14.0-fba2a32266-ab6653f2f8.zip/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
;// CONCATENATED MODULE: ./routes/account/index.ts
var _accountSettingsQuery;

/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */

/* SPDX-License-Identifier: MIT */


/**
 * User account settings route.
 */
/* harmony default export */ const account = ({
  path: "/settings",
  query: _accountSettingsQuery !== void 0 ? _accountSettingsQuery : _accountSettingsQuery = __webpack_require__(5530),
  component: function component() {
    return Promise.resolve({});
  },
  response: function response(data) {
    return {
      title: "Account Settings",
      props: data
    };
  }
});
;// CONCATENATED MODULE: ./routes/home/index.ts
var _homeQuery;

/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */

/* SPDX-License-Identifier: MIT */


/**
 * Homepage route.
 */
/* harmony default export */ const home = ({
  path: "/",
  query: _homeQuery !== void 0 ? _homeQuery : _homeQuery = __webpack_require__(1101),
  component: function component() {
    return Promise.resolve({});
  },
  response: function response(data) {
    return {
      title: "Boilerplate • Online scaffolding tool for software projects",
      description: "Web application built with React and Relay",
      props: data
    };
  }
});
;// CONCATENATED MODULE: ./routes/legal/index.ts
/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */

/* SPDX-License-Identifier: MIT */
/* harmony default export */ const legal = ([{
  path: "/privacy",
  component: function component() {
    return Promise.resolve({});
  },
  response: function response() {
    return {
      title: "Privacy Policy"
    };
  }
}, {
  path: "/terms",
  component: function component() {
    return Promise.resolve({});
  },
  response: function response() {
    return {
      title: "Privacy Policy"
    };
  }
}]);
;// CONCATENATED MODULE: ./routes/index.ts


/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */

/* SPDX-License-Identifier: MIT */



/**
 * The list of application routes (pages).
 */

/* harmony default export */ const routes = ([home, account].concat(_toConsumableArray(legal)));
;// CONCATENATED MODULE: ./.yarn/cache/@babel-runtime-npm-7.14.0-fba2a32266-ab6653f2f8.zip/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
;// CONCATENATED MODULE: ./.yarn/cache/@babel-runtime-npm-7.14.0-fba2a32266-ab6653f2f8.zip/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
;// CONCATENATED MODULE: ./.yarn/cache/@babel-runtime-npm-7.14.0-fba2a32266-ab6653f2f8.zip/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
;// CONCATENATED MODULE: ./.yarn/cache/@babel-runtime-npm-7.14.0-fba2a32266-ab6653f2f8.zip/node_modules/@babel/runtime/helpers/esm/inherits.js

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
;// CONCATENATED MODULE: ./.yarn/cache/@babel-runtime-npm-7.14.0-fba2a32266-ab6653f2f8.zip/node_modules/@babel/runtime/helpers/esm/typeof.js
function typeof_typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    typeof_typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    typeof_typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return typeof_typeof(obj);
}
;// CONCATENATED MODULE: ./.yarn/cache/@babel-runtime-npm-7.14.0-fba2a32266-ab6653f2f8.zip/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js


function _possibleConstructorReturn(self, call) {
  if (call && (typeof_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}
;// CONCATENATED MODULE: ./.yarn/cache/@babel-runtime-npm-7.14.0-fba2a32266-ab6653f2f8.zip/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
;// CONCATENATED MODULE: ./.yarn/cache/@babel-runtime-npm-7.14.0-fba2a32266-ab6653f2f8.zip/node_modules/@babel/runtime/helpers/esm/isNativeFunction.js
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
;// CONCATENATED MODULE: ./.yarn/cache/@babel-runtime-npm-7.14.0-fba2a32266-ab6653f2f8.zip/node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
;// CONCATENATED MODULE: ./.yarn/cache/@babel-runtime-npm-7.14.0-fba2a32266-ab6653f2f8.zip/node_modules/@babel/runtime/helpers/esm/construct.js


function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}
;// CONCATENATED MODULE: ./.yarn/cache/@babel-runtime-npm-7.14.0-fba2a32266-ab6653f2f8.zip/node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js




function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}
;// CONCATENATED MODULE: ./core/errors.ts








function _createSuper(Derived) { var hasNativeReflectConstruct = errors_isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function errors_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */

/* SPDX-License-Identifier: MIT */
var NotFoundError = /*#__PURE__*/function (_Error) {
  _inherits(NotFoundError, _Error);

  var _super = _createSuper(NotFoundError);

  function NotFoundError() {
    var _this;

    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Page not found";

    _classCallCheck(this, NotFoundError);

    _this = _super.call(this, message);

    _defineProperty(_assertThisInitialized(_this), "status", 404);

    Object.setPrototypeOf(_assertThisInitialized(_this), NotFoundError.prototype);
    return _this;
  }

  return NotFoundError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
;// CONCATENATED MODULE: ./core/router.ts





function router_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function router_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { router_ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { router_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */

/* SPDX-License-Identifier: MIT */





/**
 * Converts the URL path string to a RegExp matching function.
 *
 * @see https://github.com/pillarjs/path-to-regexp
 */
var matchUrlPath = function () {
  var cache = new Map();
  return function matchUrlPath(pattern, path) {
    var key = Array.isArray(pattern) ? pattern.join("::") : pattern;
    var fn = cache.get(key);
    if (fn) return fn(path);
    fn = match(pattern, {
      decode: decodeURIComponent
    });
    cache.set(key, fn);
    return fn(path);
  };
}();

function resolveRoute(_x) {
  return _resolveRoute.apply(this, arguments);
}

function _resolveRoute() {
  _resolveRoute = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(ctx) {
    var i, route, _route$component, _route, match, variables, _yield$Promise$all, _yield$Promise$all2, component, data, response;

    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            i = 0;

          case 2:
            if (!(i < routes.length, route = routes[i])) {
              _context.next = 20;
              break;
            }

            match = matchUrlPath(route.path, ctx.path);

            if (match) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("continue", 17);

          case 6:
            ctx.params = match.params; // Prepare GraphQL query variables

            variables = typeof route.variables === "function" ? route.variables(ctx) : route.variables ? route.variables : Object.keys(match.params).length === 0 ? undefined : match.params; // Fetch GraphQL query response and load React component in parallel

            _context.next = 10;
            return Promise.all([(_route$component = (_route = route).component) === null || _route$component === void 0 ? void 0 : _route$component.call(_route).then(function (x) {
              return x.default;
            }), route.query && (0,react_relay.fetchQuery)(ctx.relay, route.query, variables, {
              fetchPolicy: "store-or-network"
            }).toPromise()]);

          case 10:
            _yield$Promise$all = _context.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
            component = _yield$Promise$all2[0];
            data = _yield$Promise$all2[1];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            response = route.response(data, ctx);

            if (!response) {
              _context.next = 17;
              break;
            }

            return _context.abrupt("return", router_objectSpread({
              component: component
            }, response));

          case 17:
            i++;
            _context.next = 2;
            break;

          case 20:
            throw new NotFoundError();

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", {
              title: _context.t0 instanceof NotFoundError ? "Page not found" : "Application error",
              error: _context.t0
            });

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 23]]);
  }));
  return _resolveRoute.apply(this, arguments);
}
;// CONCATENATED MODULE: ./workers/transform.ts
/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */

/* SPDX-License-Identifier: MIT */

/**
 * Injects HTML page metadata (title, description, etc.) as well as
 * the serialized Relay store.
 */
function transform(res, route, relay, env) {
  return new HTMLRewriter().on("body:first-of-type", {
    // <body data-env="...">
    element: function element(el) {
      el.setAttribute("data-env", env);
    }
  }).on("title:first-of-type", {
    // <title>...</title>
    element: function element(el) {
      if (route.title) {
        el.setInnerContent(route.title);
      }
    }
  }).on('meta[name="description"]:first-of-type', {
    // <meta name="description" content="..." />
    element: function element(el) {
      if (route.description) {
        el.setAttribute("content", route.description);
      }
    }
  }).on("script#data", {
    element: function element(el) {
      // <script id="data" type="application/json"></script>
      // https://developer.mozilla.org/docs/Web/HTML/Element/script#embedding_data_in_html
      var data = relay.getStore().getSource().toJSON();
      var json = JSON.stringify(data).replace(/<\/script/g, "</\\u0073cript");
      el.setInnerContent(json, {
        html: true
      });
    }
  }).transform(res);
}
;// CONCATENATED MODULE: ./workers/proxy.ts




function proxy_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function proxy_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { proxy_ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { proxy_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/* SPDX-FileCopyrightText: 2014-present Kriasoft <hello@kriasoft.com> */

/* SPDX-License-Identifier: MIT */

/**
 * Cloudflare Worker script acting as a reverse proxy.
 *
 * @see https://developers.cloudflare.com/workers/
 */






function handleEvent(_x) {
  return _handleEvent.apply(this, arguments);
}

function _handleEvent() {
  _handleEvent = _asyncToGenerator( /*#__PURE__*/regenerator_default().mark(function _callee(event) {
    var _route$error2;

    var request, url, path, config, apiUrl, resPromise, apiBaseUrl, relay, route, res;
    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            request = event.request;
            url = new URL(event.request.url);
            path = url.pathname;
            config = prod.app.origin === url.origin ? prod : test;
            apiUrl = new URL("".concat(config.api.origin).concat(config.api.prefix || "")); // Serve static assets from KV storage
            // https://github.com/cloudflare/kv-asset-handler

            if (!(path.startsWith("/static/") || path.startsWith("/favicon.") || path.startsWith("/logo") || path.startsWith("/manifest.") || path.startsWith("/robots."))) {
              _context.next = 13;
              break;
            }

            _context.prev = 6;
            return _context.abrupt("return", (0,dist.getAssetFromKV)(event, {
              cacheControl: {
                bypassCache: config.app.env !== "prod"
              }
            }));

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](6);
            console.error(_context.t0);

          case 13:
            if (!(path === "/api" || path.startsWith("/api/") || path.startsWith("/auth/"))) {
              _context.next = 17;
              break;
            }

            url.hostname = apiUrl.hostname;
            url.pathname = "".concat(apiUrl.pathname).concat(path);
            return _context.abrupt("return", fetch(new Request(url.toString(), request)));

          case 17:
            if (!path.startsWith("/img/")) {
              _context.next = 21;
              break;
            }

            url.hostname = apiUrl.hostname;
            url.pathname = "/img".concat(path.substring(4));
            return _context.abrupt("return", fetch(new Request(url.toString(), request)));

          case 21:
            // Fetch index.html page from KV storage
            url.pathname = "/index.html";
            resPromise = (0,dist.getAssetFromKV)(proxy_objectSpread(proxy_objectSpread({}, event), {}, {
              request: new Request(url.toString(), request)
            }), {
              cacheControl: {
                bypassCache: config.app.env !== "prod"
              }
            }); // Find application route matching the URL pathname

            apiBaseUrl = "".concat(apiUrl.origin).concat(apiUrl.pathname);
            relay = createRelay({
              baseUrl: apiBaseUrl,
              request: request
            });
            _context.next = 27;
            return resolveRoute({
              path: path,
              relay: relay
            });

          case 27:
            route = _context.sent;

            if (!route.redirect) {
              _context.next = 30;
              break;
            }

            return _context.abrupt("return", Response.redirect(route.redirect, route.status));

          case 30:
            if (route.error) {
              relay.commitUpdate(function (store) {
                var _route$error;

                var root = store.getRoot();
                root.setValue((_route$error = route.error) === null || _route$error === void 0 ? void 0 : _route$error.stack, "error");
              });
            } // Inject page metadata such as <title>, <meta name="description" contents="..." />, etc.
            // and serialized API response <script id="data" type="application/json">...</script>
            // https://developer.mozilla.org/docs/Web/HTML/Element/script#embedding_data_in_html


            _context.t1 = transform;
            _context.next = 34;
            return resPromise;

          case 34:
            _context.t2 = _context.sent;
            _context.t3 = route;
            _context.t4 = relay;
            _context.t5 = config.app.env;
            res = (0, _context.t1)(_context.t2, _context.t3, _context.t4, _context.t5);
            return _context.abrupt("return", new Response(res.body, {
              status: ((_route$error2 = route.error) === null || _route$error2 === void 0 ? void 0 : _route$error2.status) || 200,
              headers: res.headers
            }));

          case 40:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 10]]);
  }));
  return _handleEvent.apply(this, arguments);
}

addEventListener("fetch", function (event) {
  event.respondWith(handleEvent(event));
});
})();

/******/ })()
;