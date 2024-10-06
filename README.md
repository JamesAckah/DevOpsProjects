![image](https://github.com/user-attachments/assets/e1b8e25e-b69f-4cf5-b717-c848567a7277)# Developer-Associate-Projects
AWS Developer Associate Projects. Over 100 plus projects






![image](https://github.com/user-attachments/assets/63794144-2097-4c86-bcfc-bfedd52813ae)
















**INTRODUCTION**

If you’re curious about cloud computing and want to get hands-on, AWS is a great starting point, and Amazon EC2 is one of its most popular services. It lets you run virtual machines in the cloud, and you’ll quickly see how powerful it can be. But don’t worry about where to begin—I’ve got you covered!

In this blog post, I'm going to walk you through a hands-on lab that will show you how to launch an EC2 instance using the AWS console and also use the AWS Command Line Interface (CLI) to create a key pair, security group and spin up an EC2 instance. We will end it by terminating our instances using the AWS CLI. So, whether you're studying for a certification or just looking to broaden your skill set in AWS technology. This practical lab series is a way to gain confidence, with AWS.

**Lab Outline:**

1.  Log in to AWS Management Console.
2.  Create an Instance Role
3.  Launch an EC2 Instance.
4.  Connecting to the Instance via SSH.
5.  Executing AWS CLI Commands.
6.  Check and validate the EC2 Instance.
7.  Terminate the EC2 Instance.

**STEP 1: LOG IN TO THE AWS MANAGEMENT CONSOLE**

1.  Open AWS Console: Go to the  AWS Management Console.
2.  Sign In: Use your credentials to log in.

 ![image](https://github.com/user-attachments/assets/b9e4f7f8-930f-4186-a6c2-22a4c7f6f152)
 

It is always advisable to Sign in with an IAM credential rather than as a root user. Using the IAM Credential instead of the root user enhances security by limiting access, enabling better control and monitoring, and reducing the risk of accidental or malicious actions in your AWS account.

3.  Select Region: Once logged  in, ensure your default region  is  US East (N. Virginia), which is represented by us-east-1. You can change your region in the top right corner of the console.

![image](https://github.com/user-attachments/assets/c8ff182a-f15e-4ca4-8c34-42eb3e53bfec)


**STEP 2: CREATE AN IAM ROLE**

1.  Go to the AWS Management Console.
2.  In the top-left menu go to Services, > Security, Identity & Compliance, and Select IAM.

 ![image](https://github.com/user-attachments/assets/625020ef-c8fc-42b5-9d7f-00ba95bce0fd)

3.  In the IAM dashboard on the left menu click on roles.
4.  Click on Create Roles in the right top corner.

![image](https://github.com/user-attachments/assets/f693dbfd-4d2b-4bc9-92b4-98d45b729096)

5.  In the trusted entity type select AWS Service.

![image](https://github.com/user-attachments/assets/96cf75f9-ffd1-481a-a4ad-50442f5231df)

6.  In the server or use case select EC2 and click on next

![image](https://github.com/user-attachments/assets/ff55d3fd-a6a2-4a87-b9c1-0277066339c7)

7.  In the add permission page select EC2FullAccess by typing it in the search bar and click next.

![image](https://github.com/user-attachments/assets/4e6658ee-fa87-467e-a1a4-40b7ea7d3597)

8.  In the name and review page type the name of the role and click on create role.

   ![image](https://github.com/user-attachments/assets/ba9af271-9a5b-4383-ba1c-bab75e1f16b3)


**STEP 3: LAUNCH AN EC2 INSTANCE**

1.  In  the AWS  Management  Console,  from  the  top-left  menu,  go  to  Services, Computer and EC2.

![image](https://github.com/user-attachments/assets/5a78f971-b139-4461-9fb2-9de697573304)

2.  Click Launch Instances.

![image](https://github.com/user-attachments/assets/7242f9d1-38b3-45c8-a53d-bfb7a944811f)


3.  Name your instance something like MyEC2Server.

NB: In the real work environment make sure your naming convention is meaningful and matches the intended purpose.

4.  Select Amazon Machine Image (AMI): With this lab, we are using Amazon Linux.


![image](https://github.com/user-attachments/assets/f532803f-aa36-4049-9528-c9d8746f46d8)


5.  Select Amazon Machine Image (AMI): Under Quick Start, find and select Amazon Linux 2 AMI.


![image](https://github.com/user-attachments/assets/1454120a-7311-4194-98b1-dd0bd8e096a1)


6.  Choose Instance Type: Select t2.micro for the free tier.

![image](https://github.com/user-attachments/assets/3a04ec65-71ef-4064-8c78-fb684707f021)

7.  Create a New Key Pair: For Key pair, click on Create new key pair.

![image](https://github.com/user-attachments/assets/8ee2c5c0-5f90-4eb9-a80d-def3278c0351)

![image](https://github.com/user-attachments/assets/7d1ac5af-5031-41d3-ba8a-28f8cd05a06b)


8.  Name  it  1stServer-Key,  choose  RSA as  the  key  pair  type,  and  .pem(Linux) and .ppk(Windows) as the private key file format. Let's break down the terms RSA, .pem, and .ppk as they relate to key pairs and secure connections, particularly in the context of AWS EC2 instances.

i.  RSA stand for Rivest-Shamir-Adleman, which are the surnames of the three individuals who created this encryption algorithm. It is one of the first public-key cryptosystems and is widely used for secure data transmission.
ii. A .pem file is a type of file format that contains the private key in a Base64 encoded format,  often  wrapped  in  header  and  footer  lines.  PEM  stands for  "Privacy- Enhanced Mail," although the format is now used for many types of cryptographic data.
iii. A .ppk file is a private key file used by PuTTY, a popular SSH client for Windows.
The .ppk format is specific to PuTTY and is not compatible with standard SSH
implementations directly.

In  summary,  RSA  is  the  encryption  algorithm  used  to  create  the  key  pair while .pem is the format of the private key file used on Linux and macOS systems for SSH authentication and .ppk is the format of the private key file used by PuTTY on Windows systems.

9.  Download the key to your computer.
10. Network Settings:

![image](https://github.com/user-attachments/assets/71c942a3-cdf8-498a-b64c-9d2c4cb69dd4)

11. Auto-assign public IP: Enable this.
12. Under Security Group, choose Create a new security group.
13. Name it MyEC2-SG. In the Description field, write something like "Security group to allow SSH to the EC2".
14. Advanced Details: In this section select the IAM instance profile role you created from step 1.

![image](https://github.com/user-attachments/assets/c54b5559-428c-46c8-93a2-02ec2340721d)

15. Leave the remaining settings as default. Review the summary of details and
16. Launch the Instance by clicking on Launch Instance.

![image](https://github.com/user-attachments/assets/eea98b77-390a-4f95-ab01-341b9fba93ff)

17. View the instance created.

![image](https://github.com/user-attachments/assets/c8cc2e6c-63ff-48a3-b3ee-f4bab205962e)

**STEP 4: CONNECT TO YOUR EC2 INSTANCE VIA SSH.**

1.  To connect to your instance using the SSH client, click on the connect tab.

![image](https://github.com/user-attachments/assets/dd33e343-f556-4e84-bdf7-8edbc3fc6b52)


2.  In the connect to instance page click on the SSH Client.

![image](https://github.com/user-attachments/assets/3f0e8129-c322-4865-b8c6-0157c2e13217)

In this lab, I am using the git bash terminal to perform the SSH connection. You can follow the steps in this documentation ![image](https://github.com/user-attachments/assets/2c00dcaa-4bea-4472-be8c-1a663913e005)
to learn other ways/methods you can connect to your instance.
3.  Open your terminal and cd into your “Downloads” directory where the key pair was saved. If your default download directory is not “Downloads” cd into that
directory.


![image](https://github.com/user-attachments/assets/a662aeca-b61e-41af-97c9-03acf7792fa7)

4.  Execute these commands found on the connect to instance page to connect to your instance.

Explanation of commands:

i.   cd Downloads: cd means Change directory; this will change your current directory to the downloads directory.
ii.  chmod 400 “1stServer.pem”: chmod stands for "change mode." It's a command- line utility that allows users to change the file permissions of a file or directory. chmod 400 will only set read permission for the owner of the file and no such permission for the group and others. The 1stServer.pem is the key pair file name.
iii.  ssh -i "1stServer.pem"  ec2-user@ec2-3-87-159-53.compute-1.amazonaws.com:


•  ssh: is the command to establish a secure connection to your instance.

•  -i:  This  option  specifies  the  identity  file  (private  key)  to  be  used  for authentication.
•  "1stServer.pem": This is the name of the private key file that corresponds to the public key that was associated with the EC2 instance when it was launched.
•  ec2-user is the default username for your EC2 instance (it might be different depending on the OS you choose when spinning up the EC2 instance).
•  ec2-3-87-159-53.compute-1.amazonaws.com is the Public DNS address of your EC2 instance.

After running the commands, you are now connected to the instance as shown below.


![image](https://github.com/user-attachments/assets/0abf63e5-77ab-4d14-a14b-352b7b94f0f0)


**STEP 5: CREATE A KEY PAIR USING AWS CLI**

1.  To create a key pair using the AWS CLI, first ensure you’re inside the EC2 instance (or set up AWS CLI on your local machine with the right credentials). Run the following AWS CLI command to create a new key pair:

a.  aws ec2 create-key-pair --key-name MyCLIKeyPair --query 'KeyMaterial' --region us-east-1

__Breakdown:__

•  aws ec2 create-key-pair is the command to create a new key pair in AWS EC2.
•  --key-name MyCLIKeyPair specifies the name of the key pair to be created.
•  --query 'KeyMaterial' retrieves the key material (the actual private key) from the response.
•  --region us-east-1 specifies the region where the key pair will be created (in this case, US East (N. Virginia)).

![image](https://github.com/user-attachments/assets/e1761cf8-57b5-4b46-8c05-1a93e8a0354b)


**STEP 6: CREATE A SECURITY GROUP VIA AWS CLI**

1.  aws ec2 create-security-group --group-name AWSCLIEC2-SG --description "My security group" --region us-east-1

![image](https://github.com/user-attachments/assets/454ce899-a3eb-4a29-a222-ffaec2687b9e)

This command will create a security group called AWSCLIEC2-SG in the US East(N. Virginia) region. You’ll get an output with the group’s ID, which you’ll need later.


**STEP 7: LAUNCH AN EC2 INSTANCE VIA AWS CLI**

![image](https://github.com/user-attachments/assets/82efd347-ca6c-4106-a684-28ae8b30be89)

1.  To launch an EC2 instance in the CLI we will need an image ID, the instance type, key pair, security group and region. Run these commands to launch the instance. You can get the image id from the EC2 dashboard when you click on the launch instance after selecting AMI.

2.  aws ec2 run-instances --image-id  ami-062f7200baf2fa504 --count 1 --instance- type t2.micro --key-name MyCLIKeyPair --security-groups AWSCLIEC2-SG -- region us-east-1

![image](https://github.com/user-attachments/assets/e049781f-f0e2-406b-9800-0c3c91fb42b4)

Make sure to note down the instance id after launching the EC2 instance because that is what we are going to use when terminating the instance.

**STEP 8: VIEW THE EC2 INSTANCE**

1.  Head back to the AWS Management Console.

2.  Navigate to EC2 > Instances.

3.  In the search bar, enter the Instance ID from the previous step, and you’ll see your new EC2 instance.

![image](https://github.com/user-attachments/assets/9602a904-8641-407a-bc84-acf2e78ab968)


**STEP 9: TERMINATE THE EC2 INSTANCE VIA AWS CLI**

1.  After launching your instance, we need to do a clean-up in other not to incur unnecessary bills. In the AWS CLI, we will use this command to perform the termination of the instance.
2.  aws ec2 terminate-instances --instance-ids i-060c0b030b91e0e5a --region us- east-1.


![image](https://github.com/user-attachments/assets/2bf29977-c7f2-4618-856e-4eb9238dd7b9)


**STEP 10: CONCLUSION:**

You’ve now successfully created and launched an EC2 instance, connected to it via SSH, created resources using AWS CLI, and terminated the instance to avoid charges. This lab gives you a great starting point for understanding how to use EC2 and AWS CLI effectively.
