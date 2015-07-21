# mandrill-send-template

Simple wrapper around mandrill's send-template.json API call.  Makes the interface a bit nicer.

## Usage

```javascript
var sendTemplate = require('mandrill-send-template')

sendTemplate({
  to: ['user@test.com'],
  template: 'reset-password',
  params: {
    name: 'Test User',
    link: 'http://www.test.com/password-reset?key=PasswordResetKey'
  }
}, function(err, res) {

})
```

We automatically translate arrays of email addresses into mandrill's format for you.  We also translate `params` into `global_merge_vars` array format.  Similarly for user-specific merge-vars, you may do this:

```javascript
sendTemplate({
  userParams: {
    'test@user.com': {
      name: 'Other name'
    }
  }
})
```

And it will override the global `params`.  Also supported are `attachments` and `images` in the standard way.  Right now the supported fields are a whitelist and they are tuned to the fields I happen to care about for my purposes.  If you want others, feel free to send a pull request.