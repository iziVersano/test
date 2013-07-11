/*!
 * Datapine
 * Mediator test specification
 * Copyright(c) 2012
 */

 define(
    ['widgets/DashboardChannels/collection/Channels',
    'widgets/DashboardChannels/collection/Todos',
    'widgets/DashboardChannels/models/Todo'], 

    function (channelsCollection,
              Todos,
              Todo) {
        // describe('channels collection', function () {
        //   var r, fetchDone;
        //   it('fetchFilter', function () {
        //     runs(function () {
        //       this.channels = new channelsCollection();
        //       this.channels.fetch()
        //       .done(function() {
        //         fetchDone = true;
        //       });
        //     });

        //     waitsFor(function() {return fetchDone;}, 5000); 
        //     runs(function () {
        //       expect(this.channels.length).toEqual(29);
        //     });
        //   });
        // });


        describe('channels collection', function () {
        var Todo = Backbone.Model.extend({
          defaults: {
            'priority': 3,
            'done': false
          },
          validate: function(attrs) {
            if (!attrs.title) {
              return "cannot have an empty title";
            }
          }
        });

        // var Todos = Backbone.Collection.extend({
          
        //   url: '/todos',
        //   model: Todo,
          
        //   parse: function(response) {
        //     var todos = response.response.todos;
        //     return _(todos).map(function(todo) {
        //       return _.extend(todo, {
        //         list: response.response.list
        //       });
        //     });
        //   },
          
        //   comparator: function(todo) {
        //     return todo.get("priority");
        //   },
          
        //   findByPriority: function(priority) {
        //     return this.filter(function(todo) {
        //       return todo.get('priority') == priority;
        //     });
        //   }
        // });

        beforeEach(function() {

          this.fixtures = _.extend(this.fixtures || {}, {
          
            Todos: {
              
              valid: {
                "status": "OK",
                "version": "1.0",
                "response": {
                  "list": "Death Star",
                  "todos": [
                    {
                      "id": 1,
                      "title": "Destroy Alderaan",
                      "priority": 1,
                      "done": true
                    },
                    {
                      "id": 2,
                      "title": "Find Princess Leia",
                      "priority": 1,
                      "done": true
                    },
                    {
                      "id": 3,
                      "title": "Groceries",
                      "priority": 2,
                      "done": false
                    },
                    {
                      "id": 4,
                      "title": "Close exhaust port",
                      "priority": 3,
                      "done": false
                    }
                  ]
                } 
              }
            
            }

          });
        });

        beforeEach(function() {
          
          // this.todo1 = new Backbone.Model({
          //   id: 1,
          //   title: 'Todo 1',
          //   priority: 3
          // });
          // this.todo2 = new Backbone.Model({
          //   id: 2,
          //   title: 'Todo 2',
          //   priority: 2
          // });
          // this.todo3 = new Backbone.Model({
          //   id: 3,
          //   title: 'Todo 3',
          //   priority: 1
          // });
          // this.todo4 = new Backbone.Model({
          //   id: 4,
          //   title: 'Todo 4',
          //   priority: 2
          // });
          
          this.todos = new Todos();
          this.todoStub = sinon.stub(window, 'Todo');
        });
        
        afterEach(function() {
          this.todoStub.restore();
        });

        beforeEach(function() {
            this.validResponse = function(responseText) {
                debugger;
              return [
                200,
                {"Content-Type": "application/json"},
                JSON.stringify(responseText)
              ];
            };  

           this.fixture = this.fixtures.Todos.valid;
           this.fixtureTodos = this.fixture.response.todos;
          this.server = sinon.fakeServer.create();
          this.server.respondWith(
            "GET",
            "/todos",
            this.validResponse(this.fixture)
          );
        });
        
        afterEach(function() {
          this.server.restore();
        });
        
        it("should make the correct request", function() {
          this.todos.fetch();
          expect(this.server.requests.length).toEqual(1);
          expect(this.server.requests[0].method).toEqual("GET");
          expect(this.server.requests[0].url).toEqual("/todos");
        });

        it("should make the correct request", function() {
         this.todos.fetch();
                 this.server.respond();
                 expect(this.todos.length).toEqual(this.fixture.response.todos.length);
                 expect(this.todos.get(1).get('title')).toEqual(this.fixture.response.todos[0].title)
         });
         });
    });


