
# Deploying a WordPress Application Using AWS CodeDeploy

![image](https://github.com/user-attachments/assets/131aadc6-0a58-4580-ae34-608d004f1ae1)

**Architecture Diagram**

![image](https://github.com/user-attachments/assets/340ba146-1f8f-4f3e-98fe-a6edd32d5844)

## Introduction

### What is AWS CodeDeploy?
AWS CodeDeploy is a fully managed deployment service that automates the release of applications across various computing services, such as Amazon EC2, AWS Lambda, AWS Fargate, and on-premises servers. It supports:
- Application code
- AWS Lambda functions
- Web and configuration files
- Executable packages
- Scripts and multimedia files

The application source code can be stored in an Amazon S3 bucket, AWS CodeCommit, or other Git-based repositories like GitHub or Bitbucket. AWS CodeDeploy facilitates faster feature releases, and AWS Lambda function version updates, and helps minimize downtime during deployments. It also simplifies the management of complex applications that might otherwise involve error-prone manual deployment processes. 

**Integration with other services:**
AWS CodeDeploy seamlessly integrates with configuration management systems, source control solutions, and continuous integration/continuous delivery (CI/CD) pipelines, allowing for smoother deployment processes.

**Types of Deployments Supported by CodeDeploy**
AWS CodeDeploy supports several deployment scenarios, including:
1.	Server-based deployments for applications running on services like Amazon EC2 or on-premises servers.  
2.	Serverless deployments for applications using AWS Lambda.  
3.	Containerized applications deployed on Amazon ECS.

**Deployment Strategies Supported by AWS CodeDeploy:**

*1.	In-Place Deployment:** 
This method involves stopping the application on each instance, deploying the updated version, restarting the application, and performing validation.  
Note: AWS Lambda and Amazon ECS do not support in-place deployments.

**2.	Blue-Green Deployment:*
   The deployment strategy varies based on the compute platform:
   - Amazon EC2 or on-premises environments
   - AWS Lambda
   - Amazon ECS

**TASK OUTLINE**
1.	Sign in to the AWS Management Console.
2.	Create an IAM Role for the EC2 instance.
3.	Launch an EC2 instance.
4.	Clone the WordPress files 
5.	SSH into the EC2 instance.
6.	Configure WordPress for Deployment
7.	Upload your WordPress application to S3
8.	Setup CodeDeploy and Install Agent on EC2
9.	Create a Deployment Group and Deploy
10.	Setup WordPress Site
11.	Test the application using the EC2 instance’s public IPv4 DNS.
12.	Cleanup Resources.
 

---

## Step-by-Step Instructions

### 1. Sign in to the AWS Management Console
- Go to the [AWS Console](https://aws.amazon.com/console/).
- Use your credentials to log in and set the preferred region (e.g., **US East - N. Virginia**).

   ![image](https://github.com/user-attachments/assets/9f6b4a44-3dbc-4b86-bcb5-5c56f88b407b)

   ![image](https://github.com/user-attachments/assets/d514199e-073d-4afb-9c59-609d9eb4e87a)


---

### 2. Create an IAM Role
1. Navigate to **Services > Security, Identity & Compliance > IAM**.

   ![image](https://github.com/user-attachments/assets/a2dc63d5-0504-4cf8-8029-45f558ada22b)

2. Click on **Roles > Create Role**.

   ![image](https://github.com/user-attachments/assets/a30e56b9-4d22-4948-8444-037f14e7d712)

3. Select **AWS Service** as the trusted entity type and choose **EC2**.

   ![image](https://github.com/user-attachments/assets/a4f1020c-231e-4d95-8ba0-77a16a783bd3)

4. Attach the policy **AmazonEC2RoleforAWSCodeDeploy**.

   ![image](https://github.com/user-attachments/assets/1901f023-2937-49ab-9b02-b1d2b940521e)

5. Name the role (e.g., `EC2RoleforCodeDeploy`) and create it.

   ![image](https://github.com/user-attachments/assets/ccd45fbe-117e-4060-bb14-32b43f277d50)


---

### 3. Launch an EC2 Instance
1. Go to **Services > Compute > EC2**.

   ![image](https://github.com/user-attachments/assets/1c29899f-93ce-4ec8-9c85-9a5e9e074219)

2. Click **Launch Instance** and configure:

   ![image](https://github.com/user-attachments/assets/d4e86d64-f185-4e0f-a48b-82aed2b6bff3)

   - Name: `WordPressServer`.

     ![image](https://github.com/user-attachments/assets/8f0ce650-d88a-4bef-a2dd-5d382d5fc292)

   - AMI: Amazon Linux 2.

     ![image](https://github.com/user-attachments/assets/eff439ce-92e2-4e26-b630-5cb80a4b72ad)
     
   - Instance Type: `t2.micro` (free tier).

     ![image](https://github.com/user-attachments/assets/78fb4a56-75e4-4965-aea4-3b888bbcfae8)

   - Key Pair: Create a new key pair in `.pem` format.

     ![image](https://github.com/user-attachments/assets/b6966064-7c34-4649-aec7-a26694aac391)

   - Network Settings:
     - Enable **Auto-assign public IP**.
     - Create a new security group (`CodeDeploy-SG`).
     - Add rules for SSH (specific IP) and HTTP (anywhere).
     
     ![image](https://github.com/user-attachments/assets/bedbe682-1b0c-4f12-a63a-e0535449a19a)

**Note:**
Creating a VPC and subnet is essential when deploying an application on an EC2 instance because it ensures network isolation, best security practices, Mult-AZ deployment, separation of resources, and control over traffic. In the real working environment never use the default VPCs and Subnets when deploying your application.  

 
3.	Click on Advanced details:
   IAM Instance profile: Select the instance profile created early (EC2RoleforCodeDeploy) 

![image](https://github.com/user-attachments/assets/079eed94-65a6-4067-b4d1-5ad71aba3af1)

4.	Keep the remaining Default settings and Click the Launch Instance Button.
---

### 4. Clone the WordPress Files
1. Open **CloudShell** in the AWS Console.

   ![image](https://github.com/user-attachments/assets/abe6fdfa-52d5-4fdf-a51e-5adb9fd4535b)

2. Run the following commands:
   ```bash
   wget https://github.com/WordPress/WordPress/archive/master.zip

   ![image](https://github.com/user-attachments/assets/aca6ac9f-546a-47e4-bd3e-e472b774c9ff)

3.	Unzip the package using this command: 
   unzip master.zip -d /tmp/WordPress_Temp

   The command extracts files from a ZIP archive and uses the unzip command. Specify the ZIP file (master.zip) and the 
   destination directory (-d /tmp/WordPress_Temp) where files will be extracted.

4.	Create a folder '/tmp/WordPress' and move the contents to the new folder using the commands below. 
	mkdir -p /tmp/WordPress
	cp -paf /tmp/WordPress_Temp/WordPress-master/* /tmp/WordPress

   **The "cp" command is used for copying files and directories. The options "-paf" help preserve file attributes, copy in 
    archive mode recursively, and force overwrite. Specifying the source as "/tmp/WordPress_Temp/WordPress-master/*" with a 
   wildcard copies all content to the destination directory "/tmp/WordPress".*

5.	Remove the contents from WordPress_temp and the zip file master.zip. 
	 rm -rf /tmp/WordPress_Temp
	 rm -f master.zip

   ```
### TASK 5: CONNECT TO YOUR EC2 INSTANCE VIA SSH:
1.	To connect to your instance using the SSH client, click on this link https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/connect-linux-inst-ssh.html

### TASK 6: CONFIGURE WORDPRESS FOR DEPLOYMENT:

1. Create Scripts Directory:
To set up and deploy your application revision on the target Amazon EC2 instance using CodeDeploy, create a folder and scripts in the directory ‘/tmp/WordPress’. First, create a ‘scripts’ directory inside ‘/tmp/WordPress’ for deployment tasks by following these commands: 
	mkdir -p /tmp/WordPress/scripts #create a directory script.
  	ls /tmp/WordPress #to see if the scripts directory was successfully created

2.	Install Dependencies:
Create a file named ‘install_dependencies.sh’ in the directory ‘/tmp/WordPress/scripts’. This script will install Apache, MySQL, and PHP, and it will also enable MySQL support in PHP. These tools are essential for interacting with AWS services, managing code, and facilitating automated deployments. To install the required software, run the following commands:

	nano /tmp/WordPress/scripts/install_dependencies.sh 

		Add this bash script code.
   
#!/bin/bash
sudo amazon-linux-extras install php7.2
sudo yum install -y httpd mariadb-server PHP

   ![image](https://github.com/user-attachments/assets/da5d05e9-ff16-4162-9ab7-6c88382bb3dd)

3.	**Manage Server Start and Stop:**
   Create a start_server.sh file. This script starts Apache and MySQL.
	
	nano /tmp/WordPress/scripts/start_server.sh

	Add this code. 

      #!/bin/bash
      systemctl start mariadb.service
      systemctl start httpd.service
      systemctl start php-fpm.service

   ![image](https://github.com/user-attachments/assets/879246fb-78a3-4a8e-8e25-8dd26a0b1738)


4. **Create stop_server.sh file. This script stops Apache and MySQL.**
	
	nano /tmp/WordPress/scripts/stop_server.sh

      #!/bin/bash
      isExistApp=pgrep httpd
      if [[ -n $isExistApp ]]; then
      systemctl stop httpd.service
      fi
      isExistApp=pgrep mysqld
      if [[ -n $isExistApp ]]; then
      systemctl stop mariadb.service
      fi
      isExistApp=pgrep php-fpm
      if [[ -n $isExistApp ]]; then
      systemctl stop php-fpm.service
      
      	fi


      ![image](https://github.com/user-attachments/assets/58dbc50c-8a36-49d4-80a2-f2b859717935)

5.	Setup Database:

    Create create_test_db.sh to set up a test WordPress database. 
	   nano /tmp/WordPress/scripts/create_test_db.sh

      #!/bin/bash
      mysql -uroot <<CREATE_TEST_DB
      CREATE DATABASE IF NOT EXISTS test;
      CREATE_TEST_DB

      ![image](https://github.com/user-attachments/assets/783ba239-6b40-4620-8050-c1fe3ef2410a)

6.	Adjust Permissions:

   Write change_permissions.sh to modify permissions in Apache.
	
   nano /tmp/WordPress/scripts/change_permissions.sh

      #!/bin/bash
      chmod -R 777 /var/www/html/WordPress

      ![image](https://github.com/user-attachments/assets/dc23614e-fe4d-469c-8be9-bba678307c80)

7. Give executable permissions to all scripts
      chmod +x /tmp/WordPress/scripts/*
      ll -rt /tmp/WordPress/scripts/*

      ![image](https://github.com/user-attachments/assets/8b0d1e5f-2b3f-4c37-93b4-0311188d94fa)

8. AppSpec File Configuration:
Create appspec.yml to map source files to the EC2 instance and run the necessary deployment scripts. The appspec.yml file does the following: 
- Map the source files in your application revision to their destinations on the target Amazon EC2 instance
- Specify custom permissions for deployed files
- Specify scripts to be run on the target Amazon EC2 instance during the deployment

   nano /tmp/WordPress/appspec.yml

      version: 0.0
      os: linux
      files:
        - source: /
          destination: /var/www/html/WordPress
      hooks:
        BeforeInstall:
          - location: scripts/install_dependencies.sh
            timeout: 300
            runas: root
        AfterInstall:
          - location: scripts/change_permissions.sh
            timeout: 300
            runas: root
        ApplicationStart:
          - location: scripts/start_server.sh
          - location: scripts/create_test_db.sh
            timeout: 300
            runas: root
        ApplicationStop:
          - location: scripts/stop_server.sh
            timeout: 300
            runas: root

      ![image](https://github.com/user-attachments/assets/081a95da-12da-4bb4-a8d0-03d8539697eb)

TASK 7: UPLOAD YOUR WORDPRESS APPLICATION TO S3:
1.	Create S3 Bucket:
   Use CloudShell to create an S3 bucket and upload your WordPress package.

   aws s3 mb s3://codedeploybucket-james --region us-east-1

2.	Prepare the application files to be uploaded. It should have the below structure 
/tmp/
  |--WordPress/
      |-- appspec.yml  
      |-- scripts/
      |    |-- change_permissions.sh
      |    |-- create_test_db.sh
      |    |-- install_dependencies.sh
      |    |-- start_server.sh
      |    |-- stop_server.sh
      |-- wp-admin/
      |    |-- (various files...)
      |-- wp-content/
      |    |-- (various files...)
      |-- wp-includes/
      |    |-- (various files...)
      |-- index.php
      |-- license.txt
      |-- readme.html
      |-- (various files ending with .php...)

3.	Run the following commands to install the required software: 
   This script is used to set up the AWS CodeDeploy agent on an EC2 instance:
4.	Call the create-application command to register a new application named WordPress_App: Run aws configure first before       calling the command below.

   ![image](https://github.com/user-attachments/assets/7e565045-6e71-4fc8-8690-765f19a86c65)

      cd /tmp/WordPress
      aws deploy create-application --application-name WordPress_App

      ![image](https://github.com/user-attachments/assets/de3a3878-88dd-4eac-8ac5-fe140acb56c7)

5.	Call the CodeDeploy push command to bundle the files together, upload the revisions to Amazon S3, and register          
    information with CodeDeploy about the uploaded revision, all in one action.

      aws deploy push \
        --application-name WordPress_App \
        --s3-location s3:// codedeploybucket-james /WordPressApp.zip \
        --ignore-hidden-files
      
      or use the code below. 
      
      aws deploy create-application --application-name WordPress_App --region us-east-1

TASK 8: CREATE A SERVICE ROLE FOR CODEDEPLOY 
1.	Create a service role for Code Deploy so that CodeDeploy can call other AWS services on your behalf.  Role name:    
   CodeDeployServiceRole. Link


TASK 9: CREATE DEPLOYMENT GROUP, DEPLOYMENTS

1.	Call the create-deployment-group command to create a deployment group named WordPress_DepGroup, associated with the 
   an application named WordPress_App, using the Amazon EC2 tag named WordPressServer and deployment configuration named, 
   CodeDeployDefault.OneAtATime:

      aws deploy create-deployment-group \
        --application-name WordPress_App \
        --deployment-group-name WordPress_DepGroup \
        --deployment-config-name CodeDeployDefault.OneAtATime \
        --ec2-tag-filters Key=Name,Value=WordPressServer,Type=KEY_AND_VALUE \
        --service-role-arn arn:aws:iam::533267168161:role/CodeDeployServiceRole

   
      ![image](https://github.com/user-attachments/assets/3e8cff7f-039a-470a-9c64-c2f604c0c8fe)

2.	Now call the create deploy command from Cloudshell. 
      
      aws deploy create-deployment \
        --application-name WordPress_App \
        --deployment-config-name CodeDeployDefault.OneAtATime \
        --deployment-group-name WordPress_DepGroup \
      --s3-location bucket=codedeploybucket-james,bundleType=zip,key=WordPressApp.zip

      ![image](https://github.com/user-attachments/assets/1002a937-105d-42bb-9c11-af674876c489)

TASK 10: SETUP WORDPRESS SITE

1.	copy the public DNS of your EC2 and paste it into the browser address bar
   ex: http://ec2-34-239-115-14.compute-1.amazonaws.com/WordPress

   Click on 'Let's go!.'

2.	Set up WordPress. Enter the below in the form. 
      Database Name: test;  
      User Name: root; 
      Password: Leave blank.
      Database Host: localhost; 
      Table Prefix: wp_
      Choose Submit to set up the database. Run the installation

3.	On the Welcome page, fill in any values you want, and choose Install WordPress. When the installation is complete, you      can sign in to your dashboard.

**TASK 10: CLEAN UP**

After you are done with the lab, you may delete the EC2 and the application in CodeDeploy. You can follow these commands to delete the resources:

1.	Terminate the EC2 instance:

   aws ec2 terminate-instances --instance-ids <Instance-ID>
   ex. aws ec2 terminate-instances --instance-ids i-0c41ff9658055e4b8

2.	Delete CodeDeploy Application:
   aws deploy delete-application --application-name WordPress_App

3.	Delete Deployment Group:
   aws deploy delete-deployment-group --application-name WordPress_App --deployment-group-name WordPress_DepGroup

4.	Delete S3 Bucket:
   aws s3 rb s3://codedeploybucket-james --force

5.	Delete IAM Role:
   Detach the policy and delete the role created for CodeDeploy and EC2.
   
      aws iam detach-role-policy --role-name EC2RoleforCodeDeploy --policy-arn arn:aws:iam::aws:policy/service- 
      role/AmazonEC2RoleforAWSCodeDeploy
      
      aws iam delete-role --role-name EC2RoleforCodeDeploy
      
      aws iam detach-role-policy --role-name CodeDeployServiceRole --policy-   arn arn:aws:iam::aws:policy/service- 
      role/AWSCodeDeployRole
      
      aws iam delete-role --role-name CodeDeployServiceRole


   ## Author
   Prepared by **James Ackah-Blay**.


      ![image](https://github.com/user-attachments/assets/0152f805-2a86-4f14-979e-a02c15935246)



---
