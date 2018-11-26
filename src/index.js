'use strict';

var _ = require('underscore'),
    Class = require('class.extend');

module.exports = Class.extend({

   init: function(serverless, opts) {
      this._serverless = serverless;
      this._provider = serverless ? serverless.getProvider('aws') : null;
      this._opts = opts;

      if (!this._provider) {
         throw new Error('This plugin must be used with AWS');
      }

      this.hooks = {
         'aws:package:finalize:mergeCustomProviderResources': this._modifyTemplate.bind(this),
      };
   },

   _modifyTemplate: function() {
      var template = this._serverless.service.provider.compiledCloudFormationTemplate;

      _.chain(template.Resources)
         .filter({ Type: 'AWS::S3::Bucket' })
         .each(function(resource) {
            this._modifyBucketTemplate(resource);
         }.bind(this));
   },

   _modifyBucketTemplate: function(resource) {
      resource.Properties = resource.Properties || {};
      resource.Properties.PublicAccessBlockConfiguration = resource.Properties.PublicAccessBlockConfiguration || {};

      _.defaults(resource.Properties.PublicAccessBlockConfiguration, {
         BlockPublicAcls: true,
         BlockPublicPolicy: true,
         IgnorePublicAcls: true,
         RestrictPublicBuckets: true,
      });
   },

});
