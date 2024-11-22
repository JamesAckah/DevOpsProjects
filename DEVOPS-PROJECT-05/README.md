![image](https://github.com/user-attachments/assets/1961a225-b92d-445a-8783-bcfe5c4e88a1)

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

**STEP 1: LOG IN TO THE AWS MANAGEMENT CONSOLE**
1. Open AWS Console: Go to the AWS Management Console.
2. Sign In: Use your credentials to log in.

  	![image](https://github.com/user-attachments/assets/187b96e1-2882-46b8-8360-6197deb4206c)

    It is always advisable to Sign in with an IAM credential rather than as a root user. Using the IAM Credential 
    instead of the root user enhances security by limiting access, enabling better control and monitoring, and reducing 
    the risk of accidental or malicious actions in your AWS account.

3. Select Region: Once logged in, the default region is **US East (N. Virginia)**, which is represented by **US-east-1**. 
   You can set your preferred region in the top right corner of the console as shown by the arrow in the diagram.


	![image](https://github.com/user-attachments/assets/8752d7bb-ef1a-4ea8-84bd-23b7cfb16952)

**STEP 2: CREATE AN IAM ROLE**

1.	Go to the AWS Management Console. 
2.	In the top-left menu go to Services, > Security, Identity & Compliance, and Select IAM. 

	![image](https://github.com/user-attachments/assets/62c71dc8-7863-4482-b00e-718761f301ff)

3.	In the IAM dashboard on the left menu click on roles. 
4.	Click on Create Roles in the right top corner. 

	![image](https://github.com/user-attachments/assets/786dcd14-1d80-40e9-86c3-48ea346da173)

5.	In the trusted entity type select AWS Service.

	![image](https://github.com/user-attachments/assets/1e42bbfe-741a-4d8b-b56c-e872e24f7fa5)

6.	In the use case select Lambda and click on next.

	![image](https://github.com/user-attachments/assets/10053c4b-c2e2-42d3-aba7-e67bf08f3568)
   
7.	In the add permission page select AWSLambdaRole policy by typing it in the search bar and click next.

	![image](https://github.com/user-attachments/assets/ba67af85-2af3-464e-b721-f007825ec2a0)

8.	In the Name, Review and Create page type the name of the role and click on Create Role.

	![image](https://github.com/user-attachments/assets/6566c977-4d7c-471d-8c65-20fdc40c1dbb)
	![image](https://github.com/user-attachments/assets/ba2c728a-08cb-4cab-8086-6b2efa42ee22)

9.	You have successfully created the Lambda Role. Make sure to copy the ARN of the role created and save it in a 
        notepad or any text editor.

10.	![image](https://github.com/user-attachments/assets/449eac10-b972-4e05-b534-88083f7acbb0)

**11.	TASK 3: CREATE AN ENVIRONMENT IN CLOUD SHELL**

In this task, we are going to set up the CloudShell environment in the specified AWS region (us-east-2). CloudShell provides a browser-based shell environment for users to interact with AWS resources and perform tasks using the AWS Command Line Interface (CLI). AWS CloudShell is a browser-based, pre-authenticated shell that you can launch directly from the AWS Management Console. You can navigate to CloudShell from the AWS Management Console in a few different ways. For more information, see How to Get Started with AWS CloudShell.

1.	In the AWS Management Console, locate the CloudShell icon in the top navigation bar. It looks like a 
        terminal/console icon.
2.	Click on the CloudShell icon to launch the CloudShell environment. 

	![image](https://github.com/user-attachments/assets/b94244be-08aa-4a65-beb5-478e43f55e94)

3.	A new tab in your browser opens, and you will see a welcome message to the cloud shell, click on the Close button 
        in that message.

	![image](https://github.com/user-attachments/assets/bb389843-8bc0-4061-a830-2c6fa8caaa68)

4.	You will see a creating environment message on the screen. Wait for a few minutes to complete the environment 
        creation. Once the environment is created. You are ready to use the terminal.
        **NB:** With AWS CloudShell, you can use up to 1 GB of persistent storage in each AWS Region at no additional cost. 
        Persistent storage is located in your home directory ($HOME) and is private to you. Unlike ephemeral environment 
        resources that are recycled after each shell session ends, data in your home directory persists between sessions.

	![image](https://github.com/user-attachments/assets/6d1764dc-1806-43e3-ac52-81e7d987def9)

**TASK 4: CREATING A LAMBDA FUNCTION IN CLI:**

In this task, we are going to create a new Lambda function using the AWS CLI which will be responsible for creating an S3 bucket and uploading a file to that bucket.

1.	We’ll now write a Python script that interacts with an S3 bucket. The function will create a bucket and upload a 
        file. Below is the Python script. 

import boto3
from botocore.exceptions import ClientError, NoCredentialsError, ParamValidationError
def handler(event, context):
    s3 = boto3.resource('s3', region_name='us-east-2')
    bucket_name = 'lambdabucket990'
    try:
        # Create the S3 bucket
        s3.create_bucket(Bucket=lambdabucket990)
        print(f"Bucket '{lambdabucket990}' created successfully.")
        # Upload the file to the bucket
        content = "File uploaded by version 1"
        s3.Object(lambdabucket990, 'version1.txt').put(Body=content)
        print("File uploaded successfully.")
        return {
            "statusCode": 200,
            "body": "File uploaded and bucket created successfully!"
        }

    except ClientError as e:
        # Catch errors from AWS service responses
        print(f"ClientError: {e}")
        return {
            "statusCode": 500,
            "body": f"ClientError: {e.response['Error']['Message']}"
        }
    except NoCredentialsError as e:
        # Catch missing AWS credentials error
        print(f"NoCredentialsError: {e}")
        return {
            "statusCode": 403,
            "body": "Error: No AWS credentials found."
        }
    except ParamValidationError as e:
        # Catch parameter validation errors (like invalid bucket name)
        print(f"ParamValidationError: {e}")
        return {
            "statusCode": 400,
            "body": f"ParamValidationError: {e}"
        }
    except Exception as e:
        # Catch any other exception
        print(f"Unexpected error: {e}")
        return {
            "statusCode": 500,
            "body": f"Unexpected error: {e}"
        }





2.	Navigate to the cloudshell and create a file named s3bucket.py using the below command.
         nano s3bucket.py. 

	![image](https://github.com/user-attachments/assets/86b0481d-e476-4746-ae99-d8c10894a7c7)

3.	Copy the Python script above and paste it into the editor and save it using Ctrl + O and hint enter, and Ctrl + X 
        to exit from the editor. You can use your preferred editor for writing the python script.

   	![image](https://github.com/user-attachments/assets/89648f94-7f90-4ce3-92f8-d822fe83064d)

4.	Create a Zip file of the s3bucket.py file, which is used to create lambda function in CLI using below command. 
         zip s3bucket.zip s3bucket.py
  	
5.	Create a lambda function from CLI using the following command. 
        aws lambda create-function --function-name lambdaclidemo --runtime python3.12 --zip-file fileb://s3bucket.zip -- 
         handler s3bucket.handler --role arn:aws:iam::533267168161:role/LambdaRoleVersion

	![image](https://github.com/user-attachments/assets/82acfa54-5257-40fb-a0f3-66905fa4a85e)

6.	The lambda function has been created successfully as shown below.

	![image](https://github.com/user-attachments/assets/b5b8dd6b-7a9b-4bfc-bca9-00f887e3223c)

**TASK 5: UPDATING AND INVOKING THE LAMBDA FUNCTION:**
	
In this task, we are going to update the previously created Lambda function's configuration to increase the timeout period and then invoke the function using the CLI.
 
1. By default, the lambda function created will have a timeout period of 3 seconds, you can update your Lambda function   
   using the below command. 
   aws lambda update-function-configuration --function-name lambdaclidemo --timeout 30

   ![image](https://github.com/user-attachments/assets/35a419b1-d10c-43bf-b703-d3ab5b679849)

2. To invoke the lambda function in the command line you can run the below command. You can see that it will create the 
      lambda with $LATEST version as shown in the diagram below.
      aws lambda invoke --function-name lambdaclidemo --invocation-type RequestResponse outputfile.txt

      ![image](https://github.com/user-attachments/assets/d916ad24-69e3-491b-a1f2-8bbc915b3636)

**STEP 6: PUBLISH YOUR LAMBDA FUNCTION AS A VERSION**
  
  1. After creating your Lambda function, it's time to publish a version. Every time you make changes to the Lambda 
     function, you'll want to publish a new version. Here’s the command to publish a version of your Lambda function:
     aws lambda publish-version --function-name lambdaclidemo

    This command freezes the current state of the function and assigns it a version number.

   ![image](https://github.com/user-attachments/assets/a0411fe0-be0f-48b0-8d68-90969d004252)

2. Now navigate to the Lambda dashboard in the AWS console to view the current versions of the function, choose a function, -->Versions tab and the Versions panel will display the list of versions for the selected function.

   ![image](https://github.com/user-attachments/assets/c720fbbc-715d-46fd-b270-2803bc880a45)

3. Let us change the content of the file and the name of the file and upload it to s3.
   
4. First, navigate to CloudShell and open the file using the nano editor using the below command. 
     Nano s3bucket.py
  	
5. Change the content to File uploaded by version 2 and file name as version2.txt as shown below.

	![image](https://github.com/user-attachments/assets/ac3b59cf-c486-453c-9ca0-0a14eff1231e)

**NOTE:** Change the Version number if your latest version is different. 
  After inserting the changes, save the changes by pressing Ctrl+O and hint enter and Ctrl+X to exit from the editor.

6. Now remove the existing zip file s3bucket.zip and create a new zip file with updated codes using the below commands. 
    rm -f s3bucket.zip         
    zip s3bucket.zip s3bucket.py

7. Let’s update the new code for the lambda function using the below command.
     aws lambda update-function-code --function-name lambdaclidemo --zip-file fileb://s3bucket.zip

8. Now invoke the $LATEST function with the updated codes using the command below.
    aws lambda invoke --function-name lambdaclidemo --invocation-type RequestResponse outputfile.txt

**TASK 7: PUBLISHING LAMBDA VERSION 2 IN CLI**

1. After creating the Lambda function, it's time to publish the new version. Every time you make changes to the Lambda 
    function, you'll want to publish a new version. To publish the version run the below command
	   aws lambda publish-version --function-name lambdaclidemo

   ![image](https://github.com/user-attachments/assets/46a45057-0fcf-48a7-80f5-ed9b07c337d2)

2. Now navigate to the Lambda dashboard in the AWS console to view the current versions of the function, choose a 
    function, -->Versions tab. You can find that version 1 with the filename version1.txt and the latest version with 
     version2.txt as shown below

   ![image](https://github.com/user-attachments/assets/0c5965b1-011c-42dd-adf5-49e18368b860)

**TASK 8: CREATING AN ALIAS**
   
An alias is a pointer to a specific version of a Lambda function. This is useful when you have multiple environments (like Dev or Prod) and want to easily switch between them.

1. To create an Alias for the Lambda function run the below command, here we are creating Alias for the lambdaclidemo 
    version 1 in the name of Dev.
  	**NOTE:** Update the version number if you have a different version number. 
     aws lambda create-alias --function-name lambdaclidemo --description "sample alias for lambda" --function-version 1 -- 
      name DEV

   ![image](https://github.com/user-attachments/assets/e37f291c-170b-4e5a-a128-6bb73dd3c705)

2. To check the Alias created, Navigate to the Lambda dashboard and choose a function -->Alias and you can see the alias 
    created for version 1.

   ![image](https://github.com/user-attachments/assets/db84dfee-065e-4f22-988a-76632759e849)

3. You can create another alias for the PROD team using the command above by changing the version to 2 and the name 
   to PROD. 
    aws lambda create-alias --function-name lambdaclidemo --description "sample alias for lambda" --function-version --name 
     PROD
        	![image](https://github.com/user-attachments/assets/3f2ac033-07e2-4781-8d2f-aade588588be)

**TASK 8: MANAGING AND DELETING FUNCTIONS AND ALIASES**

If you ever need to delete an alias or function, here are the commands:

1. To delete an alias:
    aws lambda delete-alias --function-name lambdaclidemo --name DEV –name PROD
    This will delete the two aliases created. 
2. To delete a Lambda function:
    aws lambda delete-function --function-name lambdaclidemo

**WRAPPING UP**

By following these steps, you've successfully created a Lambda function, managed its versions, and used aliases to simplify deployment. AWS Lambda versioning and aliasing are crucial for maintaining serverless applications efficiently, and using the CLI makes it easy to automate. If you're just starting with AWS Lambda, don’t be afraid to experiment. Check out the official AWS documentation for more in-depth details https://docs.aws.amazon.com/lambda/latest/dg/configuration-versions.html. 























6.	






9.	
    



