# Automated Backup and S3 Upload Script

This project is a Bash script designed to automate the process of creating backups, uploading them to an Amazon S3 bucket, and sending email notifications to keep administrators informed about the status of the backup process.

## Features

- **Automated Backup:** Creates a compressed archive of the specified directory.
- **S3 Integration:** Uploads the backup file to a designated Amazon S3 bucket.
- **Email Notifications:** Sends email alerts for each stage of the process (start, success, or failure).
- **File Cleanup:** Deletes local backup files after successful upload to S3.

## Prerequisites

Before using the script, ensure the following requirements are met:

1. **AWS CLI:** Installed and configured with appropriate credentials.
2. **Email Client:** `mutt` installed and configured to send emails.
3. **Bash Shell:** Running on a Linux/Unix system with Bash.
4. **Directories:**
   - Source directory to be backed up: `/home/ubuntu/System_Data`
   - Backup destination: `/home/ubuntu/system_backup/`

## Usage

1. **Clone or Create the Script:**
   Save the provided Bash script as `backup.sh` on your system.

2. **Modify Configuration:**
   Update the script variables as needed:
   - `BACKUP_SOURCE`: Path to the directory to be backed up.
   - `BACKUP_DEST`: Path where the backup file will be stored temporarily.
   - `S3_BUCKET`: S3 bucket where the backup will be uploaded.
   - `ADMIN_EMAIL`: Email address to receive notifications.

3. **Set Execute Permissions:**
   Make the script executable:
   ```bash
   chmod +x backup.sh
   ```

4. **Run the Script:**
   Execute the script manually or schedule it as a cron job:
   ```bash
   ./backup.sh
   ```

5. **Set Up Cron Job (Optional):**
   Automate the backup by adding a cron job:
   ```bash
   crontab -e
   ```
   Add the following line to run the script daily at midnight:
   ```bash
   0 0 * * * /path/to/backup.sh
   ```

## Script Workflow

1. Sends an email notification that the backup process has started.
2. Creates a compressed archive (`.tar.gz`) of the specified directory.
3. Checks if the backup creation was successful:
   - If successful, sends a success email.
   - If failed, sends a failure email and terminates the script.
4. Uploads the backup file to the specified S3 bucket.
5. Checks if the upload was successful:
   - If successful, sends a success email and deletes the local backup file.
   - If failed, sends a failure email and terminates the script.

## Example Configuration

```bash
BACKUP_SOURCE="/home/ubuntu/System_Data"
BACKUP_DEST="/home/ubuntu/system_backup/"
BACKUP_FILE="backup_$(date +%Y%m%d).tar.gz"
S3_BUCKET="s3://linuxacademy-awscli-backup"
ADMIN_EMAIL="jamesblay80@gmail.com"
```

## Dependencies

- `tar`: Used to compress the backup files.
- `aws-cli`: Used to upload files to S3.
- `mutt`: Used to send email notifications.

## Error Handling

- The script uses `$?` to check the success of each operation.
- If any operation fails, the script sends a failure notification and exits with a non-zero status.

## Notes

- Ensure the AWS CLI is configured with credentials that have appropriate permissions to upload to the specified S3 bucket.
- Email notifications require `mutt` to be properly configured on the server.

## Contact

For questions or assistance, please contact **James Ackah-Blay** at [jamesblay80@gmail.com](mailto:jamesblay80@gmail.com).
