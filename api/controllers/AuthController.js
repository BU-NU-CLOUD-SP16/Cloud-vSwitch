var bcrypt = require('bcrypt');
var helper = require('../../lib/helper.js');


module.exports = {
  login: function(req, res) {
    // Validate request paramaters
    if (!req.body.email || !req.body.password) {
      return res.json(400, {
        err: {
          status: 'danger',
          message: res.i18n('auth.login.badRequest')
        }
      });
    }

    User.findOneByEmail(req.body.email, function(err, user) {
      if (err) {
        res.json(500, {
          err: err
        });
      }

      if (!user) {
        return res.json(401, {
          err: {
            status: 'warn',
            message: res.i18n('auth.login.noUserFound')
          }
        });
      }

      user.isPasswordValid(req.body.password, function(err, bool) {
        if (err) return res.serverError(err);
        if (bool) {
          return res.json({
            user: user,
            token: TokenAuth.issueToken({
              sub: user.id
            })
          });
        }
        else {
          return res.json(401, {
            err: {
              status: 'danger',
              message: res.i18n('auth.login.invalidPassword')
            }
          });
        }
      });
    });

  },

  signup: function(req, res) {
    console.log(req)
      // Validate request paramaters
    if (!req.body.email || !req.body.password || !req.body.confirmPassword) {
      return res.json(400, {
        err: {
          status: 'danger',
          message: res.i18n('auth.signup.badRequest')
        }
      });
    }

    //TODO: Do some validation on the input
    if (req.body.password !== req.body.confirmPassword) {
      return res.json(400, {
        err: {
          status: 'danger',
          message: res.i18n('auth.signup.passwordsNoMatch')
        }
      });
    }

    var newUser = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      lastname: req.body.lastname
    };

    // Encrypt password before saving to database
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt, function(err, hash) {
        if (err) {
          return res.json(500, {
            err: err
          });
        }

        newUser.password = hash;

        User.create(newUser).exec(function(err, user) {
          if (err) {
            if (err.ValidationError) {
              return helper.convertWaterlineError(err, res);
            }

            return res.json(err.status, {
              err: err
            });
          }
  
   var sendgrid = require('sendgrid')('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');
   var email = new sendgrid.Email(); 
         email.addTo(user.email);
        email.setFrom("admin@vswitch.com");
        email.setSubject("Welcome to MyCoud");
        email.setHtml('<html> <head>    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Simples-Minimalistic Responsive Template</title><style type="text/css"> /* Client-specific Styles */ #outlook a {padding:0;} /* Force Outlook to provide a "view in browser" menu link. */ body{width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0;} /* Prevent Webkit and Windows Mobile platforms from changing default font sizes, while not breaking desktop design. */ .ExternalClass {width:100%;} /* Force Hotmail to display emails at full width */ .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;} /* Force Hotmail to display normal line spacing.*/ #backgroundTable {margin:0; padding:0; width:100% !important; line-height: 100% !important;} img {outline:none; text-decoration:none;border:none; -ms-interpolation-mode: bicubic;} a img {border:none;} .image_fix {display:block;} p {margin: 0px 0px !important;} table td {border-collapse: collapse;} table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; } a {color: #0a8cce;text-decoration: none;text-decoration:none!important;} /*STYLES*/ table[class=full] { width: 100%; clear: both; } /*IPAD STYLES*/ @media only screen and (max-width: 640px) { a[href^="tel"], a[href^="sms"] { text-decoration: none; color: #0a8cce; /* or whatever your want */ pointer-events: none; cursor: default; } .mobile_link a[href^="tel"], .mobile_link a[href^="sms"] { text-decoration: default; color: #0a8cce !important; pointer-events: auto; cursor: default; } table[class=devicewidth] {width: 440px!important;text-align:center!important;} table[class=devicewidthinner] {width: 420px!important;text-align:center!important;} img[class=banner] {width: 440px!important;height:220px!important;} img[class=colimg2] {width: 440px!important;height:220px!important;} } /*IPHONE STYLES*/ @media only screen and (max-width: 480px) { a[href^="tel"], a[href^="sms"] { text-decoration: none; color: #0a8cce; /* or whatever your want */ pointer-events: none; cursor: default; } .mobile_link a[href^="tel"], .mobile_link a[href^="sms"] { text-decoration: default; color: #0a8cce !important; pointer-events: auto; cursor: default; } table[class=devicewidth] {width: 280px!important;text-align:center!important;} table[class=devicewidthinner] {width: 260px!important;text-align:center!important;} img[class=banner] {width: 280px!important;height:140px!important;} img[class=colimg2] {width: 280px!important;height:140px!important;} } </style> </head><body><table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0"> <tbody> <tr> <td> <div class="innerbg"> </div> <table width="600" align="center" cellspacing="0" cellpadding="0" border="0" class="devicewidth"> <tbody> <tr> <td align="center" height="30" style="font-size:1px; line-height:1px;"> </td> </tr> <tr> <td width="550" align="center" height="1" bgcolor="#d1d1d1" style="font-size:1px; line-height:1px;"> </td> </tr> <tr> <td align="center" height="30" style="font-size:1px; line-height:1px;"> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0"> <tbody> <tr> <td> <div class="innerbg"> </div> <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth"> <tbody> <tr> <td width="100%"> <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth"> <tbody> <!-- Spacing --> <tr> <td height="20" style="font-size:1px; line-height:1px; mso-line-height-rule: exactly;"> </td> </tr> <!-- Spacing --> <tr> <td> <table width="560" align="center" cellpadding="0" cellspacing="0" border="0" class="devicewidthinner"> <tbody> <!-- Title --> <tr> <td style="font-family: Helvetica, arial, sans-serif; font-size: 30px; color: #333333; text-align:center; line-height: 30px;"> <p> <span style="font-size: 36pt;">Cloud vSwitch</span> </p> </td> </tr> <!-- End of Title --> <!-- spacing --> <tr> <td width="100%" height="20" style="font-size:1px; line-height:1px; mso-line-height-rule: exactly;"> </td> </tr> <!-- End of spacing --> <!-- content --> <tr> <td style="font-family: Helvetica, arial, sans-serif; font-size: 16px; color: #666666; text-align:center; line-height: 30px;"> <p> </p> <p> Welcome to vSwitch </p> <p> <strong>'+user.name+'</strong> </p> <p> </p> <p> </p> <p> Go to <a href="http://cloudvswitch-jas911.c9users.io:8080/#/invite">http://cloudvswitch-jas911.c9users.io:8080/</a> </p> </td> </tr> <!-- End of content --> </tbody> </table> </td> </tr> <!-- Spacing --> <tr> <td height="20" style="font-size:1px; line-height:1px; mso-line-height-rule: exactly;"> </td> </tr> <!-- Spacing --> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0"> <tbody> <tr> <td> <div class="innerbg"> </div> <table width="600" align="center" cellspacing="0" cellpadding="0" border="0" class="devicewidth"> <tbody> <tr> <td align="center" height="30" style="font-size:1px; line-height:1px;"> </td> </tr> <tr> <td width="550" align="center" height="1" bgcolor="#d1d1d1" style="font-size:1px; line-height:1px;"> </td> </tr> <tr> <td align="center" height="30" style="font-size:1px; line-height:1px;"> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <table width="100%" bgcolor="#ffffff" cellpadding="0" cellspacing="0" border="0"> <tbody> <tr> <td> <div class="innerbg"> </div> <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth"> <tbody> <tr> <td width="100%"> <table width="600" cellpadding="0" cellspacing="0" border="0" align="center" class="devicewidth"> <tbody> <tr> <td align="center" valign="middle" style="font-family: Helvetica, arial, sans-serif; font-size: 14px;color: #666666"> <p> Cloud vSwitch team </p> </td> </tr> <!-- Spacing --> <tr> <td width="100%" height="20"> </td> </tr> <!-- Spacing --> </tbody> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table></body> </html>');
        sendgrid.send(email, function(err, json) { 
            if (err) {
                console.error(err);
            }
            console.log(json);
        });


          if (user.active) {
            return res.json({
              user: user,
              token: TokenAuth.issueToken({
                sub: user.id
              })
            });
          }

          return sails.config.jwt.sendAccountActivationEmail(res, user, helper.createActivationLink(user));
        });
      });
    });
  },

  activate: function(req, res) {
    var token = req.param('token');
    TokenAuth.verifyToken(token, function(err, decodedToken) {
      if (err) {
        return res.json(401, {
          err: {
            status: 'danger',
            message: res.i18n('auth.policy.invalidToken'),
            detail: err
          }
        });
      }

      User.findOneById(decodedToken.sub)
        .exec(function(err, user) {
          if (err) {
            sails.log.debug('AuthController:: Error - finding user to activate');
            sails.log.debug('AuthController:: Error - Decoded token: ', decodedToken);
            sails.log.debug('AuthController:: Error - Object: ', err);
            return res.json(500, err);
          }

          if (!user) {
            sails.log.warn('AuthController:: Warn - No user found with this token payload');
            sails.log.warn('AuthController:: Warn - Decoded token: ', decodedToken);
            return res.json(404, {
              err: {
                status: 'warn',
                message: res.i18n('auth.activate.noUserFound')
              }
            });
          }

          user.active = true;
          user.save(function(err, savedUser) {
            if (err) {
              sails.log.debug('AuthController:: Error - Updating user');
              sails.log.debug('AuthController:: Error - Object: ', err);
              return res.json(500, err);
            }

            return res.json(200, {
              message: 'Account updated successfully!'
            });

          });

        });
    });
  }
};
