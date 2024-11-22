# Deploying a WordPress Application Using AWS CodeDeploy

## Introduction

### What is AWS CodeDeploy?
AWS CodeDeploy is a fully managed deployment service that automates the release of applications across various computing services, such as Amazon EC2, AWS Lambda, AWS Fargate, and on-premises servers. It supports:
- Application code
- AWS Lambda functions
- Web and configuration files
- Executable packages
- Scripts and multimedia files

CodeDeploy integrates seamlessly with CI/CD pipelines, simplifies complex deployments, and minimizes downtime.

---

## Task Outline
1. **Sign in to the AWS Management Console.**
2. **Create an IAM Role for the EC2 instance.**
3. **Launch an EC2 instance.**
4. **Clone the WordPress files.**
5. **Configure WordPress for Deployment.**
6. **Upload your WordPress application to S3.**
7. **Set up CodeDeploy and install the agent on EC2.**
8. **Create a Deployment Group and Deploy.**
9. **Set up the WordPress site.**
10. **Test the application.**
11. **Clean up resources.**

---

## Step-by-Step Instructions

### 1. Sign in to the AWS Management Console
- Go to the [AWS Console](https://aws.amazon.com/console/).
- Use your credentials to log in and set the preferred region (e.g., **US East - N. Virginia**).

![Sign-in region selection](#)

---

### 2. Create an IAM Role
1. Navigate to **Services > Security, Identity & Compliance > IAM**.
2. Click on **Roles > Create Role**.
3. Select **AWS Service** as the trusted entity type and choose **EC2**.
4. Attach the policy **AmazonEC2RoleforAWSCodeDeploy**.
5. Name the role (e.g., `EC2RoleforCodeDeploy`) and create it.

![IAM Role creation](#)

---

### 3. Launch an EC2 Instance
1. Go to **Services > Compute > EC2**.
2. Click **Launch Instance** and configure:
   - Name: `WordPressServer`.
   - AMI: Amazon Linux 2.
   - Instance Type: `t2.micro` (free tier).
   - Key Pair: Create a new key pair in `.pem` format.
   - Network Settings:
     - Enable **Auto-assign public IP**.
     - Create a new security group (`CodeDeploy-SG`).
     - Add rules for SSH (specific IP) and HTTP (anywhere).
   - IAM Instance Profile: `EC2RoleforCodeDeploy`.
3. Launch the instance.

![Launch EC2 instance](#)

---

### 4. Clone the WordPress Files
1. Open **CloudShell** in the AWS Console.
2. Run the following commands:
   ```bash
   wget https://github.com/WordPress/WordPress/archive/master.zip
   unzip master.zip -d /tmp/WordPress_Temp
   mkdir -p /tmp/WordPress
   cp -paf /tmp/WordPress_Temp/WordPress-master/* /tmp/WordPress
   rm -rf /tmp/WordPress_Temp master.zip
