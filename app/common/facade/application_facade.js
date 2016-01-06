angular.module('womply')
/**
 * Facade that exposes the internal API's of gmd-nav
 */
  .factory('ApplicationFacade', [
    '$timeout', 'ContextService', 'SideBarNavigationAPI', 'APPLICATION_EVENTS',
    function($timeout, ContextService, SideBarNavigationAPI, APPLICATION_EVENTS) {
      var eventMap = {};

      var isPrimitiveChanged = function(oldValue, newValue) {
        return oldValue !== newValue;
      };

      _.each(APPLICATION_EVENTS, function(event) {
        var map = {
          callbacks: [],
          data: null,
          isModelChanged: function(newValue, oldValue) {
            if (!oldValue && !newValue) {
              return false;
            }
            return !(newValue.equals(oldValue));
          }
        };
        eventMap[event] = map;
      });
      eventMap[APPLICATION_EVENTS.onPathChange].isModelChanged = isPrimitiveChanged;
      eventMap[APPLICATION_EVENTS.onMixPanelTokenChange].isModelChanged = isPrimitiveChanged;

      var notifyOnModelObjectChange = function(newModelObject, event) {
        var map = eventMap[event];
        var isModelChanged = map.isModelChanged;
        var oldModelObject = map.data;
        if (isModelChanged(newModelObject, oldModelObject)) {
          map.data = newModelObject;
          notify(event, newModelObject);
        }
      };

      var notify = function(event, data) {
        var callbacks = eventMap[event].callbacks;
        _.each(callbacks, function(callback) {
          if (_.isFunction(callback)) {
            callback(data);
          }
        });
      };

      var subscribeToIndividualEvent = function(event, callback) {
        if (!_.has(APPLICATION_EVENTS, event)) {
          throw new Error('event:' + event + ' is not a valid event');
        }

        if (!_.isFunction(callback)) {
          throw new Error('callback should be a function');
        }
        eventMap[event].callbacks.push(callback);
        if (eventMap[event].data) {
          // Need a timeout so that the deregister can return before
          // callback is executed.
          $timeout(function() {
            callback(eventMap[event].data);
          });
        }
        var length = eventMap[event].callbacks.length;
        var deRegister = function deRegister() {
          eventMap[event].callbacks[length -1] = null;
        };
        return deRegister;
      };

      var subscribe = function subscribe(event, callback) {
        var deRegister;
        if (_.isArray(event) && _.isArray(callback)) {
          if (event.length !== callback.length) {
            throw new Error('No of events and callbacks does not match');
          }
          var individualDeRegister = [];
          for (var i = 0, len = event.length; i < len; i++) {
            individualDeRegister.push(subscribeToIndividualEvent(event[i], callback[i]));
          }
          deRegister = function() {
            _.each(individualDeRegister, function(deReg) {
              deReg();
            });
          }
        } else {
          deRegister = subscribeToIndividualEvent(event, callback);
        }
        return deRegister;
      };

      ContextService.initializing(function() {
        notify(APPLICATION_EVENTS.onInitialized, null);
      });

      ContextService.initialized(function(context) {
        notify(APPLICATION_EVENTS.onInitialized, true);
        notifyOnModelObjectChange(context.activeLocation(), APPLICATION_EVENTS.onActiveMerchantLocationChange);
        notifyOnModelObjectChange(context.activeProduct(), APPLICATION_EVENTS.onActiveProductChange);
        notifyOnModelObjectChange(context.partner(), APPLICATION_EVENTS.onActivePartnerChange);
        notifyOnModelObjectChange(context.products(), APPLICATION_EVENTS.onProductsChange);
        notifyOnModelObjectChange(context.locations(), APPLICATION_EVENTS.onMerchantLocationsChange);
        notifyOnModelObjectChange(context.user(), APPLICATION_EVENTS.onUserChange);
        notifyOnModelObjectChange(context.activePath(), APPLICATION_EVENTS.onPathChange);
        notifyOnModelObjectChange(context.mixpanelToken(), APPLICATION_EVENTS.onMixPanelTokenChange);
      });

      return {
        /**
         * Can subscribe to various app events. Looks at the APPLICATION_EVENTS for exhaustive
         * list of events.
         *
         * Subscription takes individual events and callbacks or array of events and callbacks.
         * A deRegister function is returned that deRegisters all the subscription made.
         *
         * Sample Usage:
         *
         * Individual Events and callback -
         *    ApplicationFacade.subscribe('event', callback);
         *
         * Array of Events and callback
         *    ApplicationFacade.subscribe(['event1', 'event2'], [callback1, callback2]);
         */
        subscribe: subscribe,

        /**
         * Exposes the config to set the side bar navigation items.
         *
         * Sample Usage:
         *
         *  sideBarNavigationConfig
         *
         *  .create()
         *  .id('1')
         *  .route('highlights')
         *  .type('primary-nav')
         *  .class('customClass')
         *  .add()
         *
         *  .create()
         *  .id('2')
         *  .route('highlights')
         *  .type('sub-nav')
         *  .class('class')
         *  .add()
         *
         *  .save()
         *
         *  Note that save() has to be called at the end so that all the callbacks will be fired.
         */
        sideBarNavigationConfig: SideBarNavigationAPI.appNavigationConfig
      }
    }
  ]).constant('APPLICATION_EVENTS', {
    onActiveMerchantLocationChange: 'onActiveMerchantLocationChange',
    onActiveProductChange: 'onActiveProductChange',
    onActivePartnerChange: 'onActivePartnerChange',
    onProductsChange: 'onProductsChange',
    onMerchantLocationsChange: 'onMerchantLocationsChange',
    onUserChange: 'onUserChange',
    onPathChange: 'onPathChange',
    onMixPanelTokenChange: 'onMixPanelTokenChange',
    onInitialized: 'onInitialized'
  });
