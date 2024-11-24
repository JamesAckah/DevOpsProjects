# Serverless Contact Form with Terraform and GitHub Actions

This project automates the deployment of a serverless contact form using **AWS Lambda**, **API Gateway**, **SES**, and **Terraform**. **GitHub Actions** are used to trigger deployments whenever changes are made to the repository.

---

## Features
- **Terraform** for infrastructure as code.
- **GitHub Actions** for continuous deployment.
- **Serverless Contact Form** integrated with **AWS SES** for email notifications.

---

## Prerequisites
1. **AWS Account** with credentials for provisioning resources.
2. **Terraform** installed:
   - [Install Terraform](https://www.terraform.io/downloads).
3. **Node.js** installed (v16 or higher):
   - [Download Node.js](https://nodejs.org/).
4. **Serverless Framework**:
   ```bash
   npm install -g serverless

---



# Folder Structure


serverless-contact-form/
│
├── terraform/                # Terraform resources for SES, IAM, and other AWS infrastructure
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│
├── serverless/               # Application logic for Lambda and API Gateway
│   ├── handler.js
│   ├── serverless.yml
│   ├── package.json
│
├── .github/                  # GitHub Actions workflows
│   └── workflows/
│       └── deploy.yml
│
└── README.md


# Step 1: Create the Infrastructure with Terraform

**Initialize the Project:**

bash
```

   mkdir serverless-contact-form
   cd serverless-contact-form
   mkdir terraform && cd terraform
   touch main.tf variables.tf outputs.tf

```

**Define Resources in main.tf:**


         provider "aws" {
         region = "us-east-1"
         }

         resource "aws_ses_email_identity" "sender_email" {
         email = "your-sender-email@example.com"
         }

         resource "aws_ses_email_identity" "receiver_email" {
         email = "your-receiver-email@example.com"
         }

         resource "aws_iam_role" "lambda_execution_role" {
         name               = "lambda_execution_role"
         assume_role_policy = jsonencode({
            Version = "2012-10-17"
            Statement = [{
               Effect = "Allow"
               Principal = {
               Service = "lambda.amazonaws.com"
               }
               Action = "sts:AssumeRole"
            }]
         })
         }

         resource "aws_iam_role_policy_attachment" "lambda_policy" {
         role       = aws_iam_role.lambda_execution_role.name
         policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
         }


**Define Variables in variables.tf:**

         variable "sender_email" {
         description = "The email address that sends messages."
         type        = string
         }

         variable "receiver_email" {
         description = "The email address that receives messages."
         type        = string
         }

**Output Resources in outputs.tf:**

         output "sender_email_verification" {
         value = aws_ses_email_identity.sender_email.verification_status
         }

         output "receiver_email_verification" {
         value = aws_ses_email_identity.receiver_email.verification_status
         }

**Initialize Terraform:**

         terraform init


**Apply the Terraform Plan:**

         terraform apply -var="sender_email=your-sender@example.com" -var="receiver_email=your-receiver@example.com"

# GITHUB ACTIONS REPO
# Step 2: Add the Lambda Function and API Gateway

**Initialize Serverless Framework:**

         mkdir ../serverless && cd ../serverless
         serverless create --template aws-nodejs
         npm init -y
         npm install


**Define handler.js:**

            const AWS = require("aws-sdk");
            AWS.config.update({ region: "us-east-1" });

            const ses = new AWS.SES();

            module.exports.sendEmail = async (event) => {
            const { name, email, message } = JSON.parse(event.body);

            const params = {
               Source: "your-sender-email@example.com",
               Destination: {
                  ToAddresses: ["your-receiver-email@example.com"],
               },
               Message: {
                  Subject: {
                  Data: `New Contact Form Submission from ${name}`,
                  },
                  Body: {
                  Text: {
                     Data: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
                  },
                  },
               },
            };

            try {
               await ses.sendEmail(params).promise();
               return {
                  statusCode: 200,
                  body: JSON.stringify({ message: "Email sent successfully!" }),
               };
            } catch (error) {
               return {
                  statusCode: 500,
                  body: JSON.stringify({ error: error.message }),
               };
            }
            };


**Update serverless.yml:**

         service: contact-form

         provider:
         name: aws
         runtime: nodejs16.x
         region: us-east-1
         iamRoleStatements:
            - Effect: Allow
               Action:
               - "ses:SendEmail"
               - "ses:SendRawEmail"
               Resource: "*"

         functions:
         sendEmail:
            handler: handler.sendEmail
            events:
               - http:
                  path: contactform
                  method: post


# Step 3: Configure GitHub Actions for Deployment

**Create .github/workflows/deploy.yml:**

            name: Deploy Contact Form to AWS

            on:
            push:
               paths:
                  - serverless/**

            jobs:
            deploy:
               runs-on: ubuntu-latest

               steps:
                  - name: Checkout code
                  uses: actions/checkout@v3

                  - name: Set up Node.js
                  uses: actions/setup-node@v3
                  with:
                     node-version: '16'

                  - name: Install Serverless Framework
                  run: npm install -g serverless

                  - name: Configure AWS credentials
                  uses: aws-actions/configure-aws-credentials@v3
                  with:
                     aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
                     aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
                     aws-region: us-east-1

                  - name: Deploy with Serverless
                  run: serverless deploy

**Add GitHub Secrets:**

         Go to your GitHub repository's Settings > Secrets and Variables > Actions.
         Add:
         AWS_ACCESS_KEY_ID
         AWS_SECRET_ACCESS_KEY


# Step 4: Test and Verify

         Push changes to the repository:

         git add .
         git commit -m "Setup Terraform and GitHub Actions"
         git push origin main

   Go to the Actions tab in GitHub to verify the workflow execution.

   Test the contact form by accessing the API Gateway URL from the serverless deploy output.

# Step 5: Clean Up Resources
 
**Remove Serverless resources:**

      serverless remove

**Destroy Terraform infrastructure:**

      cd ../terraform
      terraform destroy

# Conclusion
This setup uses Terraform to provision AWS resources and GitHub Actions to deploy the Lambda function and API Gateway. Any changes pushed to the repository automatically update the serverless contact form.





# METHOD 2 


**step-by-step guide for creating a serverless contact form using AWS.**

# Step 1: Log in to AWS

1. Open a web browser and go to the AWS Management Console.
   Enter your Username and Password. 
   Once logged in, select the US East (N. Virginia) region from the top-right dropdown.

# Step 2: Create Email Identities

   Go to Services at the top and search for Simple Email Service (SES).
   On the left menu, click Identities.
   Click Create Identity.
   Choose Email Address as the identity type.
   Enter your Sender Email Address (this is the email you will send messages from).
   Click Create Identity.

   **NB: Repeat these steps to add the Receiver Email Address (the email that will receive messages).**

# Step 3: Verify Email Addresses

   Check your email inbox for messages from Amazon SES.
   Open the email and click the verification link inside.
   Do the same for both the Sender and Receiver email addresses.
   Go back to SES and refresh the page. The status should show Active.

# Step 4: Create a Lambda Function
   Go to Services and search for Lambda.
   Click Create Function.
   Choose Author from scratch.
   Enter a name for your function (e.g., ContactFormFunction).
   Choose Node.js 16.x as the runtime.
   Click Create Function.

# Step 5: Upload the Lambda Code
   Download the project files using this link.
   Extract the ZIP file on your computer. You’ll find:
   A node.js file (code for sending emails).
   An HTML file (the contact form).
   In the AWS Lambda console, scroll down to Code Source.
   Delete the existing code and replace it with the node.js file's content.
   
   **Node.js code:**

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


   Update the code:
   Change the Sender and Receiver Email Addresses in lines 4 and 5.
   Click Deploy to save your changes.

# Step 6: Create an API Gateway
      Go to Services and search for API Gateway.
      Click Build under REST API.
      Choose New API and name it (e.g., ContactFormAPI).
      Leave other settings as default and click Create API.

# Step 7: Create a Resource
         In your API, click Actions > Create Resource.
         Enter a name for the resource (e.g., contactform).
         Enable CORS (Cross-Origin Resource Sharing).
         Click Create Resource.

# Step 8: Add a Method to the Resource
      Select the resource you just created.
      Click Actions > Create Method.
      Choose POST from the dropdown.
      Select Lambda Function as the integration type.
      Enable Lambda Proxy Integration.
      Enter your Lambda function name (ContactFormFunction) and click Save.

# Step 9: Deploy the API
      Click Actions > Deploy API.
      Select New Stage and name it (e.g., Testing).
      Click Deploy.
      Copy the Invoke URL (e.g., https://your-api-id.execute-api.us-east-1.amazonaws.com/Testing/contactform).

# Step 10: Update and Test the Contact Form
      Open the contactform.html file from the extracted ZIP in a text editor (like Notepad).
      Replace the placeholder URL in line 60 with the Invoke URL you copied.
      Save the file and open it in a browser.
      Fill in the form fields and click Send Message.
      Check the Receiver Email Inbox to see if the message was delivered successfully.

# Step 11: Clean Up
      When you're done, delete the resources to avoid extra charges:
      Terminate the EC2 instance.
      Delete the Lambda function, API Gateway, and SES identities.
      Remove the S3 bucket if created.
      Log out of the AWS Console.

Congratulations! You’ve successfully created a serverless contact form with AWS. If you have any questions, feel free to ask.