**How to Host Two Websites on One EC2 Instance**

# Prerequisites

Before we get started, make sure you have the following:
    1. AWS Account: Sign in to your AWS Management Console.
    2. EC2 Instance: Launch an EC2 instance with an Amazon Linux 2 or Ubuntu AMI.
    3. Domain Names: Two domain names or subdomains (e.g., example1.com and example2.com).
    4. Basic Knowledge: Familiarity with SSH, the command line, and basic web server concepts.
    
  **STEP 1: Launch and Configure Your EC2 Instance**
   # 1. Launch EC2 Instance:
        ◦ Go to the AWS Management Console and navigate to EC2.
        ◦ Click "Launch Instance" and select an Amazon Linux 2 AMI or Ubuntu AMI.
        ◦ Choose an instance type (e.g., t2.micro for basic setups).
        ◦ Configure instance details, add storage and configure security groups (make sure HTTP (port 80) and 					
        HTTPS (port 443) are open).
        ◦ Launch the instance and download the key pair.

  #  2. Connect to Your Instance:
        ◦ Use an SSH client to connect. For example:
          ssh -i "your-key.pem" ec2-user@your-instance-public-dns
          
**STEP 2: Installing Apache web server**

	To install the Apache package on Ubuntu, use run the following command:
	sudo apt-get update
	sudo apt install apache2
	When prompted to confirm the installation, type y and press Enter. Wait until the installation 	
	completes.

**STEP 3: Start and enable Apache**
	Run the following commands to start the apache2 server. 
	
	sudo systemctl start apache2
	sudo systemctl enable apache2
	

**STEP 4: Setting up website file/directory structure**

We will need to construct a directory structure to host the data for our website. Apache has a default directory structure, 
“/var/www” where it looks for websites. We will need to create sub-directories in this path for our domains so that the Apache server can look for them.

To do this, run the following commands in your terminal:

sudo mkdir -p /var/www/redpot.com
sudo mkdir -p /var/www/ecgapp.com

**STEP 5: Changing directory ownership**

We need to change the ownership of the directories created above. The root user owns the directories created above, so we need to change their ownership to allow the currently logged user 
to modify the files. The web server has the appropriate permissions to access the website directories. To do that, run the following command in the terminal:

sudo chown -R www-data:www-data /var/www/repot.com
sudo chown -R www-data:www-data /var/www/ecgapp.com 

 

**STEP 6: Giving read access**
The two directories that we previously created must be given read access. This will make the web pages accessible publicly, ensuring that our two websites are correctly served when 
a browser requests them.

sudo chmod -R 755 /var/www

**STEP 7: Create a simple web page for both domains**

We have now set up our files and directory structure properly. Using any file editor like Vim or Nano, create a simple index.html file for each website.

sudo nano /var/www/redpot/index.html
Add the following text in the editor:

<h1> Hi this is the index page for redpot website <h1>

The same will be done for our second website.

sudo nano /var/www/ecgapp/index.html

Add the following text in the editor:

<h1> Hi this is the index page for ecgapp website <h1>

Remember to save and close each file by CTRL+X and Y, then press enter.

**STEP 8: Create Virtual Host Files**
	``` bash
	# 1st website 
       Create a file for redpot:
       
       sudo nano /etc/apache2/sites-available/redpot.com.conf
       
       Add the following configuration:
      
       <VirtualHost *:80>
           ServerAdmin webmaster@site1.example.com
           ServerName redpot.com
           DocumentRoot /var/www/redpot.com/
           ServerAlias www.redpot.com
           ErrorLog ${APACHE_LOG_DIR}/site1.example.com_error.log
           CustomLog ${APACHE_LOG_DIR}/site1.example.com_access.log combined
       </VirtualHost>


	# 2nd website 
       Create a file for ecgapp:
       
       sudo nano /etc/apache2/sites-available/ecgapp.com.conf
       
       Add the following configuration:
      
       <VirtualHost *:80>
           ServerAdmin webmaster@site1.example.com
           ServerName ecgapp.com
           DocumentRoot /var/www/ecgapp.com/
           ServerAlias www.ecgapp.com
           ErrorLog ${APACHE_LOG_DIR}/site1.example.com_error.log
           CustomLog ${APACHE_LOG_DIR}/site1.example.com_access.log combined
       </VirtualHost>
```
# Explanation of the above code: 

ServerAdmin: Specify the email address of the website administrator.
DocumentRoot: Define the directory where the website files are stored.
ServerName: Specify the domain name of your website.
ServerAlias: Add any additional domain names (if applicable) that should point to this website.
ErrorLog and CustomLog: Configure the log file paths for error logging and access logging.

**STEP 9 : Enable Sites and Restart Apache:**
      
       sudo a2ensite redpot.com.conf
       sudo a2ensite ecgapp.com.conf
       
       sudo systemctl restart apache2
       
       
 **STEP 10: Update DNS Records**
 
To point your domain names to your EC2 instance, update your DNS records:
    1. Log in to your domain registrar’s website (e.g. GoDaddy, Namecheap).
    2. Navigate to DNS management.
    3. Create A Records:
        ◦ For redpot.com, point it to your EC2 instance’s public IP.
        ◦ For ecgapp.example.com, also point it to your EC2 instance’s public IP.

 **STEP 11: Verify in Browser:**

        ◦ Open your browser and navigate to http://redpot.com and http://ecgapp.com to ensure both sites are 	
        loading correctly.

An inexpensive and efficient solution to handle several online properties is to host multiple websites on a single Amazon EC2 server. With the right setup—which includes configuring the web server, establishing virtual hosts, and putting robust security measures in place—you can create a fast and scalable hosting environment. The methods outlined in this article might help you get your Amazon EC2 instance ready to host multiple websites. Ensuring a seamless and secure online presence for your different web apps is guaranteed.
