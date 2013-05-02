/*!
 * Test
   This is where Module pattern take place .
 */

define(function() {
    'use strict';
    var Mediator = function () {
        // Holds all instances managed by the mediator
        var instances = [];
        // Holds all channels managed by the mediator
        var channels = [];
        /**
         * getInstancesByLookup
         * Helper method to get all instances based on the passed lookup
         * The lookup could be a class '.someClass', an id '#someId', or name reference 'someName'
         * @private
         * @param {string} The class, id or name lookup
         * @returns {array/false} Array of found instances or false
         */
        var getInstancesByLookup = function (instanceLookup) {
            // Check if there is a passed instance lookup
            if (_.isUndefined(instanceLookup)) {
                throw new Error('You must pass an instance lookup');
            }
            // Check if the passed instance lookup is a string
            if (!_.isString(instanceLookup)) {
                throw new Error('Instance lookup must be a string');
            }
            // Remove any trailing whitespace
            instanceLookup = $.trim(instanceLookup);
            // Check for prefix to determine if it's an id, class or name
            var prefix = instanceLookup.substr(0,1);
            var foundInstances;
            // Is this lookup an id?
            if (prefix == '#') {
                instanceLookup = instanceLookup.substr(1); // remove # prefix
                foundInstances = _.filter(instances, function(i) {
                    if (i.instance.id) {
                        return i.instance.id == instanceLookup;
                    }
                    else {
                        return false;
                    }
                });
            }
            // Is this lookup a class?
            else if (prefix == '.') {
                instanceLookup = instanceLookup.substr(1); // remove . prefix
                foundInstances = _.filter(instances, function(i) {
                    if (i.instance.$el) {
                        return i.instance.$el.hasClass(instanceLookup);
                    }
                    else {
                        return false;
                    }
                });
            }
            // Lookup must be a name
            else {
                foundInstances = _.filter(instances, function(i) {
                    if (i.name || i.instance.name) {
                        return i.name == instanceLookup || i.instance.name == instanceLookup;
                    }
                    else {
                        return false;
                    }
                });
            }
            // No instances were found!
            if (!foundInstances) {
                return false;
            }
            // Instances were found with matching lookup, so return them
            else {
                return _.pluck(foundInstances, 'instance');
            }
        };
        /**
         * getInstance
         * Helper method to return the actual instance out of the mediator store
         * @private
         * @param {object} The instance to get from store
         * @returns The instance, or false if not found
         */
        var getInstance = function (instance) {
            // Check if there is a passed instance
            if (_.isUndefined(instance)) {
                throw new Error('You must pass an instance');
            }
            // Check if the passed instance class is an object
            if (!_.isObject(instance)) {
                throw new Error('You have to pass an object to get');
            }
            // Find instance by instance
            var foundInstance = _.find(instances, function(i) { return i.instance === instance; });
            if (!foundInstance) {
                return false;
            }
            else {
                return foundInstance;
            }
        };
        /**
         * getInstances
         * This returns the mediator's internal stored instances. Useful for testing purposes.
         * @public
         */
        var getInstances = function () {
            return instances;
        };
        /**
         * get
         * Get an instance(s) based on a lookup (name, class or id)
         * Lookup only, because if you have access to the instance where you are, you don't need to get it!
         * @public
         * @param {string} Name lookup of the instance you want to find
         * @returns False if no instance(s) was found with that lookup, or the instance if successful
         */
        var get = function (instanceLookup) {
            if (!instanceLookup) {
                throw new Error('Must pass a lookup to get an instance');
            }
            if (!_.isString(instanceLookup)) {
                throw new Error('Instance lookup must be a string');
            }
            return getInstancesByLookup(instanceLookup);
        };
        /**
         * getChannels
         * This returns the mediator's internal stored channels. Useful for testing purposes.
         * @public
         */
        var getChannels = function () {
            return channels;
        };
        /**
         * add
         * Add a single instance to the mediator
         * @public
         * @param {object} The instance, not the constructor
         * @param {string} Optional. The reference name for the instance
         */
        var add = function (instance, name) {
            if (!_.isObject) {
                throw new Error('Instance must be an object when adding to the mediator');
            }
            if (name && !_.isString(name)) {
                throw new Error('Instance name must be a string');
            }
            // Attempt to find the instance (reuse getInstnace function - DRY)
            var foundInstance = getInstance(instance);
            // If instance already exists, then do nothing
            if (foundInstance) {
                return foundInstance; // returning instance as other methods require it
            }
            // Instance doesn't exist, so add it to the mediator's instance store
            else {
                var newInstance = {
                    active: true, // Make it automatically active
                    instance: instance
                };
                if (name) {
                    // _.extend(newInstance, { name: name });
                    // Avoid above function call (performs better)
                    newInstance.name = name;
                }
                instances.push(newInstance);
                return newInstance; // returning instance as other methods require it
            }
        };
        /**
         * remove
         * Removes a single instance from the mediator
         * @public
         * @param {object/string} Instance object itself, instance name, DOM ID, DOM class, instance Backbone cid
         */
        var removeInstance = function (instanceOrLookup) {
            var passedInstance;
            if (_.isUndefined(instanceOrLookup)) {
                throw new Error('Must pass an instance or lookup');
            }
            if (_.isString(instanceOrLookup)) {
                passedInstance = get(instanceOrLookup);
            }
            else if (_.isObject(instanceOrLookup)) {
                passedInstance = instanceOrLookup;
            }
            // Find the instance in the mediator's instance store
            if (passedInstance) {
                // var findInstance = _.find(instances, function(i) { return i.instance === passedInstance; });
                var findInstance = getInstance(passedInstance);
                // If one is not found
                if (!findInstance) {
                    // Fail silently
                    return false;
                }
                // If one is found, remove it from the mediator's instance store
                else {
                    instances = _.without(instances, findInstance);
                    // Update channels so they don't have any of the passed instances in them
                    // Effectively removing any channels with them instances
                    channels = _.filter(channels, function(c) { return c.instance != passedInstance; });
                    // Remove the instance's dom if it has any
                    // Firstly, see if there is a user set remove function, if not, remove element directly
                    if (_.isFunction(findInstance.instance.remove)) {
                        findInstance.instance.remove();
                    }
                    else {
                        // Definitely check it has an $el element, only would if it was a Backbone view
                        if (findInstance.instance.$el) {
                            findInstance.instance.$el.remove();
                        }
                    }
                    return true;
                }
            }
            else {
                return false;
            }
        };
        /**
         * removeAll
         * Remove all instances in the entire mediator instance store
         * @public
         */
        var removeAll = function () {
            _.each(instances, function (instance) {
                removeInstance(instance.instance);
            });
        };
        /**
         * remove
         * Remove instances, by passed instance or look (class, id, name)
         * @public
         * @param {object/string} Instance itself or a string look up for class, id or name
         */
        var remove = function (instanceOrLookup) {
            if (!instanceOrLookup) {
                throw new Error('Must pass an instance or lookup to remove');
            }
            if (!_.isObject(instanceOrLookup) && !_.isString(instanceOrLookup)) {
                throw new Error('Must pass an object or string to remove');
            }
            // Passed is an instance
            if (_.isObject(instanceOrLookup)) {
                removeInstance(instanceOrLookup);
            }
            // Must be a lookup
            else {
                // Remove trailing white spacing
                var instanceLookup = $.trim(instanceOrLookup);
                _.each(getInstancesByLookup(instanceLookup), function (instance) {
                    removeInstance(instance);
                });
            }
        };
        /**
         * subscribe
         * Instance will listen to event and when event is fired the callback is called
         * @public
         * @param {object/string} Instance or instance lookup (name, ID, class or cid)
         * @param {string} Channel/event name
         * @param {function} Function callback that will be called when event is fired
         * @param {object} Optional. Context for the function callback
         */
        var subscribe = function (instanceOrLookup, channel, callback, context) {
            var passedInstance;
            if (_.isString(instanceOrLookup)) {
                passedInstance = get(instanceOrLookup);
            }
            else if (_.isObject(instanceOrLookup)) {
                passedInstance = instanceOrLookup;
            }
            // Check if a channel was passed
            if (_.isUndefined(channel)) {
                throw new Error('When subscribing, you must pass a channel');
            }
            // Check if the channel/event name is a string
            if (!_.isString(channel)) {
                throw new Error('When subscribing, channel must be a string');
            }
            // Check if there is a callback
            if (_.isUndefined(callback)) {
                throw new Error('When subscribing, you must pass a callback');
            }
            // Check if callback is a function
            if (!_.isFunction(callback)) {
                throw new Error('When subscribing, callback must be a function');
            }
            // Remove any trailing whitespace for channel
            channel = $.trim(channel);
            // Check if instance has been added to mediator
            if (passedInstance) {
                // var foundInstance = _.find(instances, function(i) { return i.instance == passedInstance; });
                var foundInstance = getInstance(passedInstance);
                if (!foundInstance) {
                    foundInstance = add(passedInstance);
                }
                var newChannel = {
                    channel: channel,
                    instance: foundInstance.instance,
                    callback: callback,
                    context: context
                };
                channels.push(newChannel);

                // Debug
                var consoleChannels = '';
                _.each(channels, function (channel) {
                    consoleChannels += channel.channel + ' (' + channel.instance.className + '), ';
                });
                return newChannel; // returning instance as other methods require it
            }
            else {
                return false;
            }
        };
        /**
         * unsubscribe
         * Instance will have channel/event removed from the mediator, events will no longer fire
         * @public
         * @param {object/string} Instance or instance lookup (name, ID, class or cid)
         * @param {string} Channel/event name
         */
        var unsubscribe = function (instanceOrLookup, channel) {
            var passedInstance;
            if (_.isString(instanceOrLookup)) {
                passedInstance = get(instanceOrLookup);
            }
            else if (_.isObject(instanceOrLookup)) {
                passedInstance = instanceOrLookup;
            }
            // Check if channel/event was passed
            if (_.isUndefined(channel)) {
                throw new Error('When broadcasting, you must pass a channel');
            }
            // Check if the channel/event name is a string
            if (!_.isString(channel)) {
                throw new Error('When subscribing, channel must be a string');
            }
            // Remove any trailing whitespace for channel
            channel = $.trim(channel);
            // Check if instance has been added to mediator, error if not
            if (passedInstance) {
                // var findInstance = _.find(instances, function(i) { return i.instance == passedInstance; });
                var findInstance = getInstance(passedInstance);
                if (findInstance) {
                    channels = _.without(channels, findInstance);
                    return true;
                }
            }
            else {
                return false;
            }
        };
        /**
         * broadcast
         * Will broadcast the event to any of the mediator's instances that subscribed to it
         * and that are active. Only active instances will respond.
         * @public
         * @param {string} Channel/event name
         * @param {arg1, arg2, arg3...} All other arguments to be passed
         * @return {boolean} True if it found something to broadcast to, false if there was nothing to broadcast to
         */
        var broadcast = function (channel) {
            // Check if channel/event was passed
            if (_.isUndefined(channel)) {
                throw new Error('When broadcasting, you must pass a channel');
            }
            // Check if the channel/event name is a string
            if (!_.isString(channel)) {
                throw new Error('When broadcasting, channel must be a string');
            }
            // Remove any trailing whitespace for channel
            channel = $.trim(channel);
            // Store the broadcast arguments passed
            var broadcastArguments = _.rest(arguments, 1);
            // Get all matching channels in the channel store
            var foundChannels = _.filter(channels, function(c) { return c.channel == channel; });
            // Track the amount of active instances to broadcast too
            var activeSubscribedChannels = 0;
            // Loop through found channels and fire callbacks if instances are active
            _.each(foundChannels, function (foundChannel) {
                // Find found channel's instance in the mediators instances store
                // var foundInstance = _.find(instances, function(i) { return i.instance == foundChannel.instance; });
                var foundInstance = getInstance(foundChannel.instance);
                // Check if it's active, if so, then fire the callback!
                if (foundInstance && foundInstance.active) {
                    activeSubscribedChannels++;
                    foundChannel.callback.apply(foundChannel.context, broadcastArguments);
                }
            });
            if (activeSubscribedChannels === 0) {
                return false;
            }
            else {
                return true;
            }
        };
        /**
         * start
         * Will make an instance active and render to DOM (if available)
         * When active, events and other things can happen
         * @public
         * @param {object/string} Instance or instance lookup (name, ID, class or cid)
         * @return {boolean} True if it found started instance, errors if not
         */
        var start = function (instanceOrLookup) {
            var passedInstances;
            if (_.isString(instanceOrLookup)) {
                passedInstances = get(instanceOrLookup);
            }
            else if (_.isObject(instanceOrLookup)) {
                passedInstances = [];
                passedInstances.push(instanceOrLookup);
            }
            if (passedInstances) {
                var foundInstance;
                _.each(passedInstances, function (passedInstance) {
                    // Find instance in the mediator's instance store
                    // foundInstance = _.find(instances, function(i) { return i.instance == passedInstance; });
                    foundInstance = getInstance(passedInstance);
                    // If found then set it to active and render (if available)
                    if (!foundInstance) {
                        return false;
                    }
                    else {
                        var foundInstanceIndex = _.indexOf(instances, foundInstance);
                        instances[foundInstanceIndex].active = true;
                        // TODO: above 2 lines can be (cause getInstance uses _.find which passes by reference): foundInstance.active = true;

                        //if (_.isFunction(instances[foundInstanceIndex].instance.render)) {
                        //    instances[foundInstanceIndex].instance.render();
                        //}
                        return true;
                    }
                });
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * startAll
         * This will activate all instances in the mediator.
         * @public
         */
        var startAll = function () {
            _.each(instances, function (instance) {
                instance.active = true;
            });
        };
        /**
         * stop
         * Will stop and deactivate an instance. No set events will be fired on
         * deactivated instances. It will attempt to remove from DOM also.
         * @public
         * @param {object/string} Instance or instance lookup (name, ID, class or cid)
         */
        var stop = function (instanceOrLookup) {
            var passedInstance;
            if (_.isString(instanceOrLookup)) {
                passedInstance = get(instanceOrLookup);
            }
            else if (_.isObject(instanceOrLookup)) {
                passedInstance = instanceOrLookup;
            }
            if (passedInstance) {
                // Find instance in the mediator's instance store
                // var foundInstance = _.find(instances, function(i) { return i.instance == passedInstance; });
                var foundInstance = getInstance(passedInstance);
                // If found then set it to active and render (if available)
                if (!foundInstance) {
                    throw new Error('Could not start instance, does not exist in the mediator');
                }
                else {
                    var foundInstanceIndex = _.indexOf(instances, foundInstance);
                    instances[foundInstanceIndex].active = false;
                    // TODO: above 2 lines can be (cause getInstance uses _.find which passes by reference): foundInstance.active = false;
                    
                    //if (_.isFunction(instances[foundInstanceIndex].instance.remove)) {
                    //    instances[foundInstanceIndex].instance.remove();
                    //}
                    return true;
                }
            }
        };
        /**
         * stopAll
         * This will deactivate all instances in the mediator.
         * @public
         */
        var stopAll = function () {
            _.each(instances, function (instance) {
                instance.active = false;
            });
        };
        // Public facing module API
        return {
            add: add,
            get: get,
            remove: remove,
            removeAll: removeAll,
            subscribe: subscribe,
            unsubscribe: unsubscribe,
            broadcast: broadcast,
            activate: start,
            activateAll: startAll,
            deactivate: stop,
            deactivateAll: stopAll,
            getInstances: getInstances,
            getChannels: getChannels
        };
    };
    return new Mediator();
});
