# To execute in PowerShell, save this script as dockerdeploy.ps1 and run it in the terminal. with the command ./dockerdeploy.ps1

# Set in a variable the Docker context to the remote Linux server where the container will be deployed.
$ctx = "linux-mds-server"

# Stop and remove the existing container if it exists.
docker --context $ctx rm -f angular-container 2>$null | Out-Null

# Remove the previous image if it exists.
docker --context $ctx rmi angular-app:latest 2>$null | Out-Null

# Build the new image from the current Dockerfile.
docker --context $ctx build -t angular-app:latest .

# Run the container in detached mode and restart it automatically unless stopped manually.
docker --context $ctx run -d --name angular-container --restart unless-stopped -p 9080:80 angular-app:latest
