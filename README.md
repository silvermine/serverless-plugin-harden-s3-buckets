# Serverless Plugin: Harden S3 Buckets

[![Build Status](https://travis-ci.org/silvermine/serverless-plugin-harden-s3-buckets.svg?branch=master)](https://travis-ci.org/silvermine/serverless-plugin-harden-s3-buckets)
[![Coverage Status](https://coveralls.io/repos/github/silvermine/serverless-plugin-harden-s3-buckets/badge.svg?branch=master)](https://coveralls.io/github/silvermine/serverless-plugin-harden-s3-buckets?branch=master)
[![Dependency Status](https://david-dm.org/silvermine/serverless-plugin-harden-s3-buckets.svg)](https://david-dm.org/silvermine/serverless-plugin-harden-s3-buckets)
[![Dev Dependency Status](https://david-dm.org/silvermine/serverless-plugin-harden-s3-buckets/dev-status.svg)](https://david-dm.org/silvermine/serverless-plugin-harden-s3-buckets#info=devDependencies&view=table)


## What is it?

This is a plugin for the Serverless framework that automatically adds some hardening
features to S3 buckets in your stack. This removes copy and paste overhead and reduces the
opportunity for developers to forget crucial security settings for a bucket.

## How do I use it?

There are two steps:

### Install the Plugin as a Development Dependency

```bash
npm install --save-dev --save-exact @silvermine/serverless-plugin-harden-s3-buckets
```

### Telling Serverless to Use the Plugin

Simply add this plugin to the list of plugins in your `serverless.yml` file:

```yml
plugins:
   - '@silvermine/serverless-plugin-harden-s3-buckets'
```

### What Will the Plugin Do?

At this time, all it does is add the following block to every one of the S3 buckets in
your stack:

```yml
PublicAccessBlockConfiguration:
   BlockPublicAcls: true
   BlockPublicPolicy: true
   IgnorePublicAcls: true
   RestrictPublicBuckets: true
```

### What if I Want Some of Those Settings `false`?

This plugin will only add the ones that are missing, so go ahead and define them in your
bucket's resource properties as you normally would.


## How do I contribute?

We genuinely appreciate external contributions. See [our extensive
documentation][contributing] on how to contribute.


## License

This software is released under the MIT license. See [the license file](LICENSE) for more
details.


[contributing]: https://github.com/silvermine/silvermine-info#contributing
