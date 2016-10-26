/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  // save flow locally
  'POST /flows/save': 'FlowController.save',

  // create flow to external service
  'POST /flows/:flowID/publish': 'FlowController.publish',

  // get all flows created by the user
  'GET /flows': 'FlowController.get',

  // get a flow
  'GET /flows/:flowID': 'FlowController.retrieve',

  // update a flow
  'PUT /flows/:flowID': 'FlowController.update',

  // delete a flow
  'DELETE /flows/:flowID': 'FlowController.delete',

  // enable a flow
  'PUT /flows/:flowID/enable': 'FlowController.enable',

  // disable a flow
  'PUT /flows/:flowID/disable': 'FlowController.disable'

};
