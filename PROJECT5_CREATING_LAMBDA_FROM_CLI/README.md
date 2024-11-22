**Introduction**
In today’s cloud-driven world, automation is crucial, and AWS Lambda simplifies serverless computing. One key feature to manage deployments and updates is Lambda versioning and aliases. In this article, I will walk through how to create Lambda versions, publish them, and manage aliases using the AWS Command Line Interface (CLI). This hands-on walks you through the creation of lambda function and creating versions and aliases for your lambda function in CLI from EC2 instance.

**<u>What is Lambda?</u>**

AWS Lambda allows you to execute code without the need to set up or handle specific servers. In simpler terms, Lambda is also known as Serverless Computing. With lambda, you only pay for the time your code runs, and no charges apply during inactive periods. AWS Lambda functions make it possible to execute code for various applications without the need for any administration. Simply upload your code to Lambda, and it will handle all the necessary tasks for running and scaling your code with optimal availability. You can establish events that will trigger your lambda function to run or be activated. Lambda offers support for multiple languages like Java, Python, Node.js, and c for writing lambda functions.

**Why Versioning and Aliases?**
**Versioning** helps track different stages of your Lambda function’s lifecycle. Every time you modify your function, you can create a version to capture that specific state.  Lambda allows us to change the function code and settings only on the unpublished version of a function. Each version of your Lambda function has its own ARN. Once the function is published, the code and most of the settings are locked to ensure a consistent experience for users of that version, and you cannot edit or modify the code of that version. 

**Aliases** allow you to manage which version of the Lambda function is live in production (or in development environments). A Lambda alias acts as a pointer to a specific Lambda function version. AWS allows us to create one or more aliases for a particular lambda function. Each Alias has its own unique ARN like version and points to a specific version and can't point one alias to others. You can update an alias to point to a new version of the function that is pointing to some other function.    



<u>**Architecture Diagram**</u>

![image](https://github.com/user-attachments/assets/519c3ae2-0333-4bb9-8ae5-e07dacd17943)


**LAB OUTLINE**

1. Sign in to the AWS Management Console
2. Creating an IAM Role
3. Create an Environment in CloudShell.
4. Creating a Lambda function in CLI
5. Updating and Invoking the lambda function
6. Publishing Lambda version in CLI
7. Publishing Lambda version 2 in CLI
8. Creation and Deletion of Lambda Alias
9. Validation of the Lab
10. Deleting Lambda Function

STEP 1: LOG IN TO THE AWS MANAGEMENT CONSOLE
1.	Open AWS Console: Go to the AWS Management Console.
2.	Sign In: Use your credentials to log in.

  	![image](https://github.com/user-attachments/assets/187b96e1-2882-46b8-8360-6197deb4206c)


It is always advisable to Sign in with an IAM credential rather than as a root user. Using the IAM Credential instead of the root user enhances security by limiting access, enabling better control and monitoring, and reducing the risk of accidental or malicious actions in your AWS account.


3.	Select Region: Once logged in, the default region is **US East (N. Virginia)**, which is represented by **US-east-1**. You can set your preferred region in the top right corner of the console as shown by the arrow in the diagram.


![image](https://github.com/user-attachments/assets/8752d7bb-ef1a-4ea8-84bd-23b7cfb16952)

**STEP 2: CREATE AN IAM ROLE**

1.	Go to the AWS Management Console. 
2.	In the top-left menu go to Services, > Security, Identity & Compliance, and Select IAM. 
