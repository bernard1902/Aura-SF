const functions = require("firebase-functions")
const sgMail = require("@sendgrid/mail")

const axios = require("axios")

sgMail.setApiKey(
  "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"
)

exports.klaviyoHandle = functions.https.onRequest((req, res) => {
  res.set("Access-Control-Allow-Origin", "*")
  axios
    .post(
      "https://a.klaviyo.com/api/v2/list/WyGayz/members?api_key=pk_396bad171558124a82d92d7ae1db0d0aa8",
      {
        profiles: [
          {
            email: req.query.emailAddress,
          },
        ],
      }
    )
    .then(response => res.status(200).send(response))
    .catch(err => res.status(500).send(err))
})

exports.contactHandle = functions.firestore
  .document("/contact/{id}")
  .onCreate((snapshot, context) => {
    const data = snapshot.data()
    const response = data.response
    const responseKeys = Object.keys(response)
    const responseParsed = responseKeys.map(
      (resp, i) => "<p>" + resp + ": " + response[resp] + "</p>"
    )
    const distributor = data.distributor
    const id = context.params.id

    const msg = {
      to: "hello@aura-sf.com",
      from: "hello@aura-sf.com", // Use the email address or domain you verified above
      subject: distributor
        ? "[Contact Form - Distributor] " + data.response.emailAddress
        : "[Contact Form] " + data.response.emailAddress,
      text: "[Contact Form] Order: " + data.response.emailAddress,
      html: "<body>" + responseParsed.join() + "</body>",
    }

    console.log(data)
    console.log(context.params.id)

    sgMail.send(msg).then(
      resp => {},
      error => {
        console.error(error)

        if (error.response) {
          console.error(error.response.body)
        }
      }
    )
  })

exports.orderHandle = functions.firestore
  .document("/orders/{id}")
  .onCreate((snapshot, context) => {
    const data = snapshot.data()
    const id = context.params.id

    const msg = {
      to: "hello@aura-sf.com",
      from: "hello@aura-sf.com", // Use the email address or domain you verified above
      subject: "[Aura SF] Order: " + id,
      text: "[Aura SF] Order: " + id,
      html: html(data, id),
    }

    console.log(data)
    console.log(context.params.id)

    sgMail.send(msg).then(
      resp => {},
      error => {
        console.error(error)

        if (error.response) {
          console.error(error.response.body)
        }
      }
    )
  })

const html = (data, id) => {
  return (
    '<!doctype html>\
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">\
<head>\
  <title>\
  </title>\
  <!--[if !mso]><!-->\
  <meta http-equiv="X-UA-Compatible" content="IE=edge">\
  <!--<![endif]-->\
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\
  <meta name="viewport" content="width=device-width, initial-scale=1">\
  <style type="text/css">\
    #outlook a {\
      padding: 0;\
    }\
    body {\
      margin: 0;\
      padding: 0;\
      -webkit-text-size-adjust: 100%;\
      -ms-text-size-adjust: 100%;\
    }\
    table,\
    td {\
      border-collapse: collapse;\
      mso-table-lspace: 0pt;\
      mso-table-rspace: 0pt;\
    }\
    img {\
      border: 0;\
      height: auto;\
      line-height: 100%;\
      outline: none;\
      text-decoration: none;\
      -ms-interpolation-mode: bicubic;\
    }\
    p {\
      display: block;\
      margin: 13px 0;\
    }\
  </style>\
  <!--[if mso]>\
        <noscript>\
        <xml>\
        <o:OfficeDocumentSettings>\
          <o:AllowPNG/>\
          <o:PixelsPerInch>96</o:PixelsPerInch>\
        </o:OfficeDocumentSettings>\
        </xml>\
        </noscript>\
        <![endif]-->\
  <!--[if lte mso 11]>\
        <style type="text/css">\
          .mj-outlook-group-fix { width:100% !important; }\
        </style>\
        <![endif]-->\
  <!--[if !mso]><!-->\
  <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">\
  <style type="text/css">\
    @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);\
  </style>\
  <!--<![endif]-->\
  <style type="text/css">\
    @media only screen and (min-width:480px) {\
      .mj-column-per-100 {\
        width: 100% !important;\
        max-width: 100%;\
      }\
      .mj-column-per-20 {\
        width: 20% !important;\
        max-width: 20%;\
      }\
      .mj-column-per-50 {\
        width: 50% !important;\
        max-width: 50%;\
      }\
      .mj-column-per-30 {\
        width: 30% !important;\
        max-width: 30%;\
      }\
      .mj-column-per-25 {\
        width: 25% !important;\
        max-width: 25%;\
      }\
    }\
  </style>\
  <style media="screen and (min-width:480px)">\
    .moz-text-html .mj-column-per-100 {\
      width: 100% !important;\
      max-width: 100%;\
    }\
    .moz-text-html .mj-column-per-20 {\
      width: 20% !important;\
      max-width: 20%;\
    }\
    .moz-text-html .mj-column-per-50 {\
      width: 50% !important;\
      max-width: 50%;\
    }\
    .moz-text-html .mj-column-per-30 {\
      width: 30% !important;\
      max-width: 30%;\
    }\
    .moz-text-html .mj-column-per-25 {\
      width: 25% !important;\
      max-width: 25%;\
    }\
  </style>\
  <style type="text/css">\
    @media only screen and (max-width:480px) {\
      table.mj-full-width-mobile {\
        width: 100% !important;\
      }\
      td.mj-full-width-mobile {\
        width: auto !important;\
      }\
    }\
  </style>\
</head>\
<body style="word-spacing:normal;">\
  <div style="">\
    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->\
    <div style="margin:0px auto;max-width:600px;">\
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">\
        <tbody>\
          <tr>\
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">\
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->\
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\
                  <tbody>\
                    <tr>\
                      <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">\
                          <tbody>\
                            <tr>\
                              <td style="width:124px;">\
                                <img height="auto" src="https://aurasfmaster.gatsbyjs.io/aura_logo_type.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="124" />\
                              </td>\
                            </tr>\
                          </tbody>\
                        </table>\
                      </td>\
                    </tr>\
                  </tbody>\
                </table>\
              </div>\
              <!--[if mso | IE]></td></tr></table><![endif]-->\
            </td>\
          </tr>\
        </tbody>\
      </table>\
    </div>\
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->\
    <div style="margin:0px auto;max-width:600px;">\
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">\
        <tbody>\
          <tr>\
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">\
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->\
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\
                  <tbody>\
                    <tr>\
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
                        <div style="font-family:helvetica;font-size:12px;line-height:1;text-align:left;color:#000000;">Order number: ' +
    id +
    '</div>\
                      </td>\
                    </tr>\
                    <tr>\
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
                        <div style="font-family:helvetica;font-size:12px;line-height:1;text-align:left;color:#000000;">Thank you for your order, ' +
    data.firstName +
    '.</div>\
                      </td>\
                    </tr>\
                    <tr>\
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
                        <div style="font-family:helvetica;font-size:12px;line-height:1;text-align:left;color:#000000;">Delivery details:</div>\
                      </td>\
                    </tr>\
                    <tr>\
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
                        <div style="font-family:helvetica;font-size:12px;line-height:1;text-align:left;color:#000000;">' +
    data.firstName +
    " " +
    data.lastName +
    '</div>\
                      </td>\
                    </tr>\
                    <tr>\
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
                        <div style="font-family:helvetica;font-size:12px;line-height:1;text-align:left;color:#000000;">' +
    data.address +
    '</div>\
                      </td>\
                    </tr>\
                    <tr>\
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
                        <div style="font-family:helvetica;font-size:12px;line-height:1;text-align:left;color:#000000;">*Phone number*</div>\
                      </td>\
                    </tr>\
                    <tr>\
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
                        <div style="font-family:helvetica;font-size:12px;line-height:1;text-align:left;color:#000000;">Delivery date: ' +
    data.collectionDate.value +
    '</div>\
                      </td>\
                    </tr>\
                    <tr>\
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
                        <div style="font-family:helvetica;font-size:12px;line-height:1;text-align:left;color:#000000;">Delivery time slot: ' +
    data.timeslot.value +
    '</div>\
                      </td>\
                    </tr>\
                    <tr>\
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
                        <div style="font-family:helvetica;font-size:12px;font-weight:bold;line-height:1;text-align:left;color:#000000;">Please have payment and ID ready to receive the order. Orders will only be delivered to an adult recipient of 21yrs or older.”</div>\
                      </td>\
                    </tr>\
                  </tbody>\
                </table>\
              </div>\
              <!--[if mso | IE]></td></tr></table><![endif]-->\
            </td>\
          </tr>\
        </tbody>\
      </table>\
    </div>\
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->\
    <div style="margin:0px auto;max-width:600px;">\
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">\
        <tbody>\
          <tr>\
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">\
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->\
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\
                  <tbody>\
                    <tr>\
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:24px;line-height:1;text-align:left;color:#000000;">Order Details</div>\
                      </td>\
                    </tr>\
                  </tbody>\
                </table>\
              </div>' +
    orderItem(data) +
    '\
              <!--[if mso | IE]></td></tr></table><![endif]-->\
            </td>\
          </tr>\
        </tbody>\
      </table>\
    </div>\
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->\
    <div style="margin:0px auto;max-width:600px;">\
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">\
        <tbody>\
          <tr>\
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">\
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:300px;" ><![endif]-->\
              <div class="mj-column-per-50 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\
                  <tbody>\
                  </tbody>\
                </table>\
              </div>\
              <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:150px;" ><![endif]-->\
              <div class="mj-column-per-25 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\
                  <tbody>\
                    <tr>\
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:14px;line-height:1;text-align:left;color:#000000;">Discount</div>\
                      </td>\
                    </tr>\
                  </tbody>\
                </table>\
              </div>\
              <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:150px;" ><![endif]-->\
              <div class="mj-column-per-25 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\
                  <tbody>\
                    <tr>\
                      <td align="right" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:14px;font-weight:500;line-height:1;text-align:right;color:#000000;">-$' +
    data.discount +
    '</div>\
                      </td>\
                    </tr>\
                  </tbody>\
                </table>\
              </div>\
              <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:300px;" ><![endif]-->\
              <div class="mj-column-per-50 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\
                  <tbody>\
                  </tbody>\
                </table>\
              </div>\
              <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:150px;" ><![endif]-->\
              <div class="mj-column-per-25 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\
                  <tbody>\
                    <tr>\
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:14px;line-height:1;text-align:left;color:#000000;">Estimated excise tax</div>\
                      </td>\
                    </tr>\
                  </tbody>\
                </table>\
              </div>\
              <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:150px;" ><![endif]-->\
              <div class="mj-column-per-25 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\
                  <tbody>\
                    <tr>\
                      <td align="right" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:14px;font-weight:500;line-height:1;text-align:right;color:#000000;">$' +
    parseFloat(data.exciseTax).toFixed(2) +
    '</div>\
                      </td>\
                    </tr>\
                  </tbody>\
                </table>\
              </div>\
              <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:300px;" ><![endif]-->\
              <div class="mj-column-per-50 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\
                  <tbody>\
                  </tbody>\
                </table>\
              </div>\
              <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:150px;" ><![endif]-->\
              <div class="mj-column-per-25 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\
                  <tbody>\
                    <tr>\
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:14px;line-height:1;text-align:left;color:#000000;">Sales tax</div>\
                      </td>\
                    </tr>\
                  </tbody>\
                </table>\
              </div>\
              <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:150px;" ><![endif]-->\
              <div class="mj-column-per-25 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\
                  <tbody>\
                    <tr>\
                      <td align="right" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:14px;font-weight:500;line-height:1;text-align:right;color:#000000;">$' +
    parseFloat(data.cityRate).toFixed(2) +
    '</div>\
                      </td>\
                    </tr>\
                  </tbody>\
                </table>\
              </div>\
              <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:300px;" ><![endif]-->\
              <div class="mj-column-per-50 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\
                  <tbody>\
                  </tbody>\
                </table>\
              </div>\
              <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:150px;" ><![endif]-->\
              <div class="mj-column-per-20 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\
                  <tbody>\
                    <tr>\
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:14px;line-height:1;text-align:left;color:#000000;">Total</div>\
                      </td>\
                    </tr>\
                  </tbody>\
                </table>\
              </div>\
              <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:150px;" ><![endif]-->\
              <div class="mj-column-per-30 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\
                  <tbody>\
                    <tr>\
                      <td align="right" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
                        <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:28px;font-weight:500;line-height:1;text-align:right;color:#000000;">$' +
    parseFloat(data.total).toFixed(2) +
    '</div>\
                      </td>\
                    </tr>\
                  </tbody>\
                </table>\
              </div>\
              <!--[if mso | IE]></td></tr></table><![endif]-->\
            </td>\
          </tr>\
        </tbody>\
      </table>\
    </div>\
    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->\
    <div style="margin:0px auto;max-width:600px;">\
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">\
        <tbody>\
          <tr>\
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">\
              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->\
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\
                  <tbody>\
                    <tr>\
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
                        <div style="font-family:helvetica;font-size:12px;line-height:1;text-align:left;color:#000000;">Our delivery agent will contact you by text on your registered mobile number to give you the exact total amount and confirm the delivery.</div>\
                      </td>\
                    </tr>\
                    <tr>\
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
                        <div style="font-family:helvetica;font-size:12px;line-height:1;text-align:left;color:#000000;">The cannabis excise taxes are included in the total amount of this invoice.</div>\
                      </td>\
                    </tr>\
                  </tbody>\
                </table>\
              </div>\
              <!--[if mso | IE]></td></tr></table><![endif]-->\
            </td>\
          </tr>\
        </tbody>\
      </table>\
    </div>\
    <!--[if mso | IE]></td></tr></table><![endif]-->\
  </div>\
</body>\
</html>'
  )
}

const orderItem = data => {
  return data.cart.map(
    (item, i) =>
      '<!--[if mso | IE]></td><td class="" style="vertical-align:top;width:120px;" ><![endif]-->\
  <div class="mj-column-per-20 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\
      <tbody>\
        <tr>\
          <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">\
              <tbody>\
                <tr>\
                  <td style="width:70px;">\
                    <img height="auto" src="' +
      item.product.mainImage[1].asset.gatsbyImageData.images.fallback.src +
      '" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="70" />\
                  </td>\
                </tr>\
              </tbody>\
            </table>\
          </td>\
        </tr>\
      </tbody>\
    </table>\
  </div>\
  <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:300px;" ><![endif]-->\
  <div class="mj-column-per-50 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\
      <tbody>\
        <tr>\
          <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
            <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:left;color:#000000;">' +
      item.product.title +
      " x " +
      item.quantity +
      '</div>\
          </td>\
        </tr>\
        <tr>\
          <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
            <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">' +
      item.product.strain.effects +
      '</div>\
          </td>\
        </tr>\
      </tbody>\
    </table>\
  </div>\
  <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:180px;" ><![endif]-->\
  <div class="mj-column-per-30 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\
      <tbody>\
        <tr>\
          <td align="right" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
            <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1;text-align:right;color:#000000;">$' +
      parseFloat(item.product.price * item.quantity).toFixed(2) +
      '</div>\
          </td>\
        </tr>\
      </tbody>\
    </table>\
  </div>\
  <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:600px;" ><![endif]-->\
  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">\
    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">\
      <tbody>\
        <tr>\
          <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">\
            <p style="border-top:solid 4px #e0e0e0;font-size:1px;margin:0px auto;width:100%;">\
            </p>\
            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 4px #e0e0e0;font-size:1px;margin:0px auto;width:550px;" role="presentation" width="550px" ><tr><td style="height:0;line-height:0;"> &nbsp;\
</td></tr></table><![endif]-->\
          </td>\
        </tr>\
      </tbody>\
    </table>\
  </div> '
  )
}
