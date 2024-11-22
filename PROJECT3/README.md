# Automated Password Expiration and Notification System

## Overview
This script automates the management of user password expiration on a Linux-based system. It checks user passwords to see if they have exceeded a specified age (e.g., 90 days) and expires them accordingly. This helps maintain system security by enforcing periodic password changes. The script is designed to run automatically as a cron job.

## Features
- **Password Expiration Check**: Identifies user accounts with passwords older than a specified period.
- **Automatic Expiration**: Automatically expires passwords for users who haven't changed their passwords in the configured period.
- **Detailed Logging**: Tracks actions taken and logs success or failure to a log file for monitoring and auditing.
- **Root Privileges Check**: Ensures the script runs with the required root privileges.
- **Cron Job Automation**: The script can be scheduled to run periodically with cron.

## Requirements
1. **Linux-based System**: The script is designed for use on Linux-based systems (e.g., Ubuntu).
2. **Root Privileges**: The script requires root privileges to modify user password expiration settings.
3. **Cron**: Used to automate the script execution.

## Configuration
1. **Password Expiration Age**: Set the `MAX_PASSWORD_AGE` variable in the script to define the maximum password age (in days). The default value is `90`.
2. **Log File**: The script logs its actions to `/var/log/password_expiration.log`. Ensure that the user running the script has write access to this file.

## Usage

### 1. Clone or Download the Script
Save the script to your server, e.g., `/home/ubuntu/password_expiration.sh`.

### 2. Set Execution Permissions
Make the script executable:
```bash
chmod +x /home/ubuntu/password_expiration.sh

sudo /home/ubuntu/password_expiration.sh
```

# 3. Set a cronjob to automate the process

```bash

sudo crontab -e
0 0 */90 * * /home/ubuntu/password_expiration.sh >> /var/log/cron.log 2>&1

```


# Check Logs

Log entries are stored in /var/log/password_expiration.log. You can check the log for details on the script's execution and any errors that may have occurred.

``` bash 

Logging

The script logs its operations to:

cat /var/log/password_expiration.log
```

# Troubleshooting

Permissions: Ensure the script is run as root to avoid permission errors.

Log Files: Check the log file /var/log/password_expiration.log for details if the script fails.

# Contributions

Feel free to fork the repository, submit issues, or make contributions to improve the script. Pull requests are welcome.


## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Author
**James Ackah-Blay**  
- [LinkedIn Profile](https://linkedin.com/in/jamesackahblay)
