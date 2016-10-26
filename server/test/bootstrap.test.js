var sails = require('sails');

before(function (done) {
    process.env.NODE_ENV = 'test';
    process.env.PORT = 9999;

    sails.lift({
        models: {
            connection: 'mongodbServer',
            migrate: 'drop'
        }
    }, function (err, server) {
        sails = server;
        if (err) return done(err);

        sails.log.info('***** Starting tests... *****');
        console.log('\n');

        done(null, sails);
    });
});

after(function (done) {
    sails.lower(done);
});