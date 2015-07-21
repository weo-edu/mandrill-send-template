/**
 * Imports
 */
var asArray = require('as-array')
var request = require('superagent')

module.exports = function(apiKey) {
  return function(opts, cb) {
    sendTemplate({
      key: apiKey,
      template_name: opts.template,
      template_content: [],
      async: false,
      message: {
        to: translateTo(to),
        merge_language: 'handlebars' || opts.merge_language,
        global_merge_vars: translateParams(opts.params),
        merge_vars: translateUserParams(opts.userParams),
        attachments: opts.attachments,
        images: opts.images
      }
    }, cb)
  }
}


var sendTemplateUrl = 'https://mandrillapp.com/api/1.0/messages/send-template.json'

function sendTemplate(params, cb) {
  params.key = config.mandrillApiKey
  request
    .post(sendTemplateUrl)
    .send(params)
    .end(function(err, res) {
      err ? cb(err) : cb(null, res.body)
    })
}

function translateTo(to) {
  return asArray(to).map(function(recipient) {
    return 'string' === typeof recipient
      ? {email: recipient}
      : recipient
  })
}

function translateParams(params) {
  return Object.keys(params).map(function(key) {
    return {
      name: key,
      content: params[key]
    }
  })
}

function translateUserParams(userParams) {
  return Object.keys(userParams).map(function(key) {
    return {
      rcpt: key,
      vars: translateParams(userParams[key])
    }
  })
}