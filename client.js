const soap = require('soap');

const url = 'http://localhost:8000/wsdl?wsdl';

soap.createClient(url, function (err, client) {
  if (err) {
    console.error('Error creating SOAP client:', err);
    return;
  }

  const args = {
    to: 'luciana.romano@est.fi.uncoma.edu.ar',
    subject: 'Test Email from SOAP Client',
    text: 'This is a test email sent via SOAP web service.',
    html: '<h1>This is a test email sent via SOAP web service.</h1>'
  };

  client.SendEmail(args, function (err, result) {
    if (err) {
      console.error('Error sending email:', err);
      return;
    }
    console.log('Email sent successfully:', result.confirmation);
  });
});