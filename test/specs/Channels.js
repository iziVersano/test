/*!
 * Datapine
 * Mediator test specification
 * Copyright(c) 2012
 */

 define(
    ['widgets/DashboardChannels/collection/Channels'], 

    function (channelsCollection) {
        describe('channels collection', function () {
          var r, fetchDone;
          it('fetchFilter', function () {
            runs(function () {
              this.channels = new channelsCollection();
              this.channels.fetch()
              .done(function() {
                fetchDone = true;
              });
            });

            waitsFor(function() {return fetchDone;}, 5000); 
            runs(function () {
              expect(this.channels.length).toEqual(29);
            });
          });
        });
    });


