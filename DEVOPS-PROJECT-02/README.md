
# Automated Log Archival and Cloud Backup System

## Overview
This project automates the process of scanning a specified directory for files that haven't been accessed in a configurable period (default: 90 days). These files are moved to an archival folder and uploaded to an AWS S3 bucket for long-term storage. A cron job is set up to run the script periodically, ensuring consistent archival and backup.

---

## Features
- **Automated File Scanning**: Detects and moves files not accessed for a specified period to an archive directory.
- **AWS S3 Integration**: Syncs archived files to a designated S3 bucket for reliable cloud storage.
- **Configurable Retention Period**: Allows customization of the unused file retention period.
- **Logging**: Maintains a log file for monitoring and troubleshooting the archival process.
- **Error Handling**: Ensures robust operation with proper error handling and notifications.

---

## Requirements
1. **AWS CLI**: Installed and configured with appropriate IAM credentials for S3 access.
   - [AWS CLI Installation Guide](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html)
2. **Bash Shell**: The script is designed to run in a Unix/Linux environment.
3. **Cron**: For scheduling automated execution of the script.
4. **Sudo/Root Privileges**: Necessary for file management in system directories.

---

## Usage

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/automated-log-archival.git
cd automated-log-archival
```

### 2. Update Configuration
Edit the script (`archive_and_backup.sh`) to customize the following variables:
- `SCAN_DIR`: The directory to scan for unused files.
- `RETENTION_DAYS`: The period (in days) after which files are considered unused.
- `ARCHIVES_DIR`: The directory where files will be archived locally.
- `S3_BUCKET`: The AWS S3 bucket name for cloud backup.

### 3. Grant Execution Permissions
```bash
chmod +x archive_and_backup.sh
```

### 4. Test the Script
Run the script manually to ensure it works as expected:
```bash
sudo ./archive_and_backup.sh
```

### 5. Automate with Cron
Schedule the script using a cron job:
```bash
sudo crontab -e
```
Add the following line to run the script daily at midnight:
```bash
0 0 * * * /path/to/archive_and_backup.sh
```

---

## Logging
The script logs its operations to:
```
/var/log/archive_cleanup.log
```
Check this file for information on completed tasks or troubleshooting errors.

---

## Contributions
Contributions, issues, and feature requests are welcome! Feel free to submit a pull request or open an issue.

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Author
**James Ackah-Blay**  
- [LinkedIn Profile](https://linkedin.com/in/jamesackahblay)
