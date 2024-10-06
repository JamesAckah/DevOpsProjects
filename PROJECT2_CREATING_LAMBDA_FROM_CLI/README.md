**Introduction**

This hands-on walks you through the creation of lambda function and creating versions and alias for your lambda function in CLI from EC2 instance.

<u>**What is Lambda?**</u>
AWS Lambda service allows you to run code without provisioning or managing dedicated servers. In other words, Lambda will be called Serverless Computing.

The interesting feature about lambda is you only need to pay for the compute time you consume, and no need to pay when your code is not running.

You can run code for virtually any type of application with zero administration with the help of AWS Lambda functions.

Just upload your code to Lambda, and it will take care of everything required to run and scale your code with high availability

We can set triggering events for our lambda function when to run or when to get triggered.

Lambda currently supports various languages such as java, python, Node.js, c, etc. using which you can write your lambda function.

Lambda Version and Alias
It is possible to use lambda versions to manage the deployment of your AWS Lambda functions

The Lambda function creates a new version each time you publish the function.

The new version created is a copy of the unpublished version of the function.

Lambda allows us to change the function code and settings only on the unpublished version of a function.

Each version of your Lambda function has its own ARN.

Once the function published, the code and most of the settings are locked to ensure a consistent experience for users of that version, and you cannot edit or modify the code of that version.

A Lambda alias acts as a pointer to a specific Lambda function version.

AWS allows us to create one or more aliases for the particular lambda function.

Each Alias has its own unique ARN like versions and pointing to a specific version and can't point one alias to others.

You can update an alias to point to a new version of the function that is pointing to some other function.    


<u>**Architecture Diagram**</u>

![task_10081 - Page 2_46_07](https://github.com/user-attachments/assets/ce06d9c1-99fc-4fec-8243-815fe1ea42a5)


**Task Details**

1. Sign in to AWS Management Console
2. Creating an IAM Role
3. Create an Environment in CloudShell.
4. Creating a Lambda function in CLI
5. Updating and Invoking the lambda function
6. Publishing Lambda version in CLI
7. Publishing Lambda version 2 in CLI
8. Creation and Deletion of Lambda Alias
9. Validation of the Lab
10. Deleting Lambda Function
