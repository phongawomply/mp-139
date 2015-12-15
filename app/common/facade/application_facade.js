angular.module('womply')
/**
 * Facade that exposes the internal API's of gmd-nav
 */
  .factory('ApplicationFacade', [
    'ContextService', 'SideBarNavigationAPI', 'CONTEXT_EVENTS',
    function(ContextService, SideBarNavigationAPI, CONTEXT_EVENTS) {
      var eventMap = {};

      _.each(CONTEXT_EVENTS, function(event) {
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
      eventMap[CONTEXT_EVENTS.onPathChange].isModelChanged = function(oldPath, newPath) {
        return oldPath !== newPath;
      };

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
          callback(data);
        });
      };

      var subscribeToIndividualEvent = function(event, callback) {
        if (!_.has(CONTEXT_EVENTS, event)) {
          throw new Error('event:' + event + ' is not a valid event');
        }

        if (!_.isFunction(callback)) {
          throw new Error('callback should be a function');
        }
        eventMap[event].callbacks.push(callback);
        if (eventMap[event].data) {
          callback(eventMap[event].data);
        }
        var length = eventMap[event].callbacks.length;
        var deRegister = function deRegister() {
          eventMap[event].callbacks.splice(length - 1, 1);
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

      ContextService.initialized(function(context) {
        notifyOnModelObjectChange(context.activeLocation(), CONTEXT_EVENTS.onActiveMerchantLocationChange);
        notifyOnModelObjectChange(context.activeProduct(), CONTEXT_EVENTS.onActiveProductChange);
        notifyOnModelObjectChange(context.partner(), CONTEXT_EVENTS.onActivePartnerChange);
        notifyOnModelObjectChange(context.products(), CONTEXT_EVENTS.onProductsChange);
        notifyOnModelObjectChange(context.locations(), CONTEXT_EVENTS.onMerchantLocationsChange);
        notifyOnModelObjectChange(context.user(), CONTEXT_EVENTS.onUserChange);
        notifyOnModelObjectChange(context.activePath(), CONTEXT_EVENTS.onPathChange);
      });

      return {
        /**
         * Can subscribe to various app events. Looks at the CONTEXT_EVENTS for exhaustive
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
  ]).constant('CONTEXT_EVENTS', {
    onActiveMerchantLocationChange: 'onActiveMerchantLocationChange',
    onActiveProductChange: 'onActiveProductChange',
    onActivePartnerChange: 'onActivePartnerChange',
    onProductsChange: 'onProductsChange',
    onMerchantLocationsChange: 'onMerchantLocationsChange',
    onUserChange: 'onUserChange',
    onPathChange: 'onPathChange'
  });