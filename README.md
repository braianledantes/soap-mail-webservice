# SOAP Mail Webservice

Este proyecto corresponde a un trabajo para la materia **Frameworks e Interoperabilidad** de la Tecnicatura Universitaria en Desarrollo Web de la Universidad Nacional del Comahue.

Aquí se presenta una API SOAP para ejecutar en local, junto con un cliente SOAP de ejemplo para consumirla. El proyecto implementa un servicio web SOAP que permite enviar correos electrónicos utilizando el protocolo SMTP.

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución de JavaScript
- **SOAP**: Protocolo de comunicación para servicios web
- **Biblioteca soap**: Implementación de SOAP para Node.js
- **Biblioteca Nodemailer**: Cliente SMTP para envío de correos electrónicos

## Requisitos previos

- Node.js instalado en tu sistema
- npm (incluido con Node.js)
- Cuenta de correo electrónico con acceso SMTP (por ejemplo, Gmail)

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/braianledantes/soap-mail-webservice.git
   cd soap-mail-webservice
   ```

2. Instala las dependencias utilizando npm:
   ```bash
   npm install
   ```

## Configuración

Antes de ejecutar el proyecto, necesitas configurar las variables de entorno para la conexión SMTP:

1. Copia el archivo de ejemplo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edita el archivo `.env` con tus credenciales SMTP:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_SECURE=false
   SMTP_USER=tu-correo@gmail.com
   SMTP_PASS="tu-contraseña-de-aplicación"
   SMTP_FROM="tu-correo@gmail.com"
   PORT=8000
   ```

   **Nota para usuarios de Gmail**: Es recomendable usar una contraseña de aplicación en lugar de tu contraseña principal. Puedes generar una en la configuración de seguridad de tu cuenta de Google.

## Cómo probar el proyecto

### 1. Ejecutar el servidor SOAP

Para iniciar el servidor SOAP, ejecuta:
```bash
npm run server
```

El servidor se iniciará en `http://localhost:8000/wsdl` (o en el puerto configurado en `.env`).

### 2. Ejecutar el cliente SOAP

En otra terminal, ejecuta el cliente de ejemplo:
```bash
npm run client
```

El cliente enviará un correo electrónico de prueba utilizando el servicio SOAP.

## Estructura del proyecto

```
soap-mail-webservice/
├── server.js          # Servidor SOAP que expone el servicio de envío de emails
├── client.js          # Cliente SOAP de ejemplo para consumir el servicio
├── service.wsdl       # Definición WSDL del servicio SOAP
├── package.json       # Dependencias y scripts del proyecto
├── .env.example       # Plantilla de variables de entorno
└── README.md          # Este archivo
```

## Endpoints disponibles

### SendEmail

**Descripción**: Envía un correo electrónico a través del protocolo SMTP.

**URL del servicio**: `http://localhost:8000/wsdl?wsdl`

**Operación SOAP**: `SendEmail`

**Parámetros de entrada**:
- `to` (string): Dirección de correo electrónico del destinatario
- `subject` (string): Asunto del correo electrónico
- `text` (string): Contenido del correo en texto plano
- `html` (string): Contenido del correo en formato HTML

**Respuesta**:
- `confirmation` (string): Mensaje de confirmación con el ID del mensaje enviado

## Ejemplo de uso del cliente

El archivo `client.js` incluye un ejemplo completo de cómo consumir el servicio SOAP:

```javascript
const soap = require('soap');

const url = 'http://localhost:8000/wsdl?wsdl';

soap.createClient(url, function (err, client) {
  if (err) {
    console.error('Error creating SOAP client:', err);
    return;
  }

  const args = {
    to: 'destinatario@ejemplo.com',
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
```

## Ejemplo de request SOAP

```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="http://example.com/mailservice/">
  <soap:Body>
    <tns:SendEmailRequest>
      <tns:to>destinatario@ejemplo.com</tns:to>
      <tns:subject>Test Email from SOAP Client</tns:subject>
      <tns:text>This is a test email sent via SOAP web service.</tns:text>
      <tns:html>&lt;h1&gt;This is a test email sent via SOAP web service.&lt;/h1&gt;</tns:html>
    </tns:SendEmailRequest>
  </soap:Body>
</soap:Envelope>
```

## Ejemplo de response SOAP

```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:tns="http://example.com/mailservice/">
  <soap:Body>
    <tns:SendEmailResponse>
      <tns:confirmation>Email sent to destinatario@ejemplo.com with Message ID: &lt;abc123@example.com&gt;</tns:confirmation>
    </tns:SendEmailResponse>
  </soap:Body>
</soap:Envelope>
```

## Probando con otras herramientas

También puedes probar el servicio SOAP utilizando herramientas como:

- **Postman**: Importa el WSDL desde `http://localhost:8000/wsdl?wsdl`
- **SoapUI**: Crea un nuevo proyecto SOAP e importa el WSDL
- **cURL**: Envía requests SOAP directamente desde la línea de comandos

### Ejemplo con cURL:

```bash
curl -X POST http://localhost:8000/wsdl \
  -H "Content-Type: text/xml" \
  -d '<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://example.com/mailservice/">
  <soap:Body>
    <tns:SendEmailRequest>
      <tns:to>destinatario@ejemplo.com</tns:to>
      <tns:subject>Test from cURL</tns:subject>
      <tns:text>This is a test email.</tns:text>
      <tns:html>&lt;p&gt;This is a test email.&lt;/p&gt;</tns:html>
    </tns:SendEmailRequest>
  </soap:Body>
</soap:Envelope>'
```

## Solución de problemas

### El servidor no inicia
- Verifica que el puerto 8000 no esté siendo utilizado por otra aplicación
- Asegúrate de que las dependencias estén instaladas correctamente (`npm install`)

### Error al enviar correos
- Verifica que las credenciales SMTP en el archivo `.env` sean correctas
- Si usas Gmail, asegúrate de tener habilitado el acceso de aplicaciones menos seguras o usa una contraseña de aplicación
- Verifica que tu firewall no esté bloqueando las conexiones SMTP

### El cliente no puede conectarse al servidor
- Asegúrate de que el servidor esté ejecutándose antes de iniciar el cliente
- Verifica que la URL en `client.js` coincida con la configuración del servidor

## Licencia

ISC

## Autor

Proyecto desarrollado como parte de la Tecnicatura Universitaria en Desarrollo Web - Universidad Nacional del Comahue.
