'use strict';

var _ = require('underscore'),
    expect = require('expect.js'),
    Plugin = require('../index.js'),
    EXAMPLE_TEMPLATE, EXPECTED_TEMPLATE, PUBLIC_ACCESS_CONFIG;

PUBLIC_ACCESS_CONFIG = {
   BlockPublicAcls: true,
   BlockPublicPolicy: true,
   IgnorePublicAcls: true,
   RestrictPublicBuckets: true,
};

EXAMPLE_TEMPLATE = {
   Resources: [
      // simulate a bucket with no props ... no name or anything
      {
         Type: 'AWS::S3::Bucket',
      },
      // some other resource
      {
         Type: 'AWS::CloudFront::Distribution',
         Properties: { SomethingRandom: 'abc' },
      },
      // and now a bucket with just a name:
      {
         Type: 'AWS::S3::Bucket',
         Properties: {
            BucketName: 'test-bucket-2',
         },
      },
      // and finally a bucket with some PublicAccessBlockConfiguration props already:
      {
         Type: 'AWS::S3::Bucket',
         Properties: {
            BucketName: 'test-bucket-3',
            PublicAccessBlockConfiguration: {
               BlockPublicAcls: false,
               RestrictPublicBuckets: true,
            },
         },
      },
   ],
};

// Now show the changes we expect on a cloned copy of the template:
EXPECTED_TEMPLATE = JSON.parse(JSON.stringify(EXAMPLE_TEMPLATE));
EXPECTED_TEMPLATE.Resources[0].Properties = {
   PublicAccessBlockConfiguration: PUBLIC_ACCESS_CONFIG,
};
EXPECTED_TEMPLATE.Resources[2].Properties.PublicAccessBlockConfiguration = PUBLIC_ACCESS_CONFIG;
EXPECTED_TEMPLATE.Resources[3].Properties.PublicAccessBlockConfiguration = {
   BlockPublicAcls: false,
   RestrictPublicBuckets: true,
   BlockPublicPolicy: true,
   IgnorePublicAcls: true,
};


function stubServerless() {
   return {
      getProvider: function() {
         return {};
      },
      cli: {
         log: _.noop,
         consoleLog: _.noop,
         printDot: _.noop,
      },
   };
}

describe('serverless-plugin-harden-s3-buckets', function() {
   var plugin;

   describe('_modifyTemplate', function() {

      it('modifies the template as expected', function() {
         var serverlessStub;

         serverlessStub = stubServerless();
         serverlessStub.service = {
            provider: {
               compiledCloudFormationTemplate: EXAMPLE_TEMPLATE,
            },
         };

         plugin = new Plugin(serverlessStub, {});

         plugin._modifyTemplate();
         expect(serverlessStub.service.provider.compiledCloudFormationTemplate).to.eql(EXPECTED_TEMPLATE);
      });

   });

});
