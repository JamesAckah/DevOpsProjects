var aws = require("aws-sdk");
var ses = new aws.SES({ region: "us-east-1" });

var RECEIVER = "<ENTER_RECEIVER_MAIL_ID_HERE";
var SENDER = "<ENTER_SENDER_MAIL_ID_HERE>";

exports.handler = async function (event) {
    console.log('Received event:', JSON.stringify(event, null, 2));

    let body;
    try {
        body = JSON.parse(event.body);
    } catch (e) {
        console.error('Error parsing event body:', e);
        return {
            statusCode: 400,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ result: "Error", message: "Invalid request body" })
        };
    }

    var params = {
        Destination: {
            ToAddresses: [RECEIVER]
        },
        Message: {
            Body: {
                Text: {
                    Data: 'Full Name: ' + body.name + '\nEmail: ' + body.email + '\nMessage: ' + body.message,
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'Website Query Form: ' + body.name,
                Charset: 'UTF-8'
            }
        },
        Source: SENDER,
    };

    try {
        await ses.sendEmail(params).promise();
        console.log('Email sent successfully');
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ result: "Success" })
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ result: "Error", message: error.message })
        };
    }
};
