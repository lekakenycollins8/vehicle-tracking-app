#!/bin/bash

# Exit on any error
set -e

# Variables (Update these with your desired values)
DB_USER="lekakenycollins8"
DB_PASSWORD="2869Leky*#*"
DB_NAME="vehicle_tracking"
DB_HOST="localhost"
DB_PORT="5432"


echo "Starting MySQL setup..."

# Step 1: Update and Install MySQL
echo "Updating system and installing MySQL..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y mysql-server

# # Step 2: Secure MySQL Installation
# echo "Securing MySQL installation..."
# sudo mysql_secure_installation <<EOF

# y
# $DB_ROOT_PASSWORD
# $DB_ROOT_PASSWORD
# y
# y
# y
# y
# EOF

# Step 3: Start MySQL Service
echo "Starting MySQL service..."
sudo service mysql start

# Step 4: Create User, Database, and Grant Permissions
echo "Setting up MySQL database and user..."
sudo mysql -u root -p$DB_ROOT_PASSWORD <<EOF
-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS $DB_NAME;

-- Create user if it doesn't exist
CREATE USER IF NOT EXISTS '$DB_USER'@'$DB_HOST' IDENTIFIED BY '$DB_PASSWORD';

-- Grant all privileges on the database to the user
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'$DB_HOST';

-- Apply changes
FLUSH PRIVILEGES;
EOF

# Step 5: Configure MySQL for Remote Connections
echo "Configuring MySQL for remote connections..."
sudo sed -i "s/^bind-address.*/bind-address = 0.0.0.0/" /etc/mysql/mysql.conf.d/mysqld.cnf

# Restart MySQL to apply changes
echo "Restarting MySQL service..."
sudo service mysql restart

# Step 6: Output Connection Details
echo "MySQL setup is complete!"
echo "Connection details:"
echo "  Host: $DB_HOST"
echo "  Database: $DB_NAME"
echo "  User: $DB_USER"
echo "  Password: $DB_PASSWORD"