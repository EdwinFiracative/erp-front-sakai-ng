# To execute in PowerShell, save this script as dockerdeploy.ps1 and run it in the terminal. with the command ./dockerdeploy.ps1
# Stop and remove the existing container if it exists.
docker rm -f angular-container 2>$null | Out-Null

# Remove the previous image if it exists.
docker rmi angular-app:latest 2>$null | Out-Null

# Build the new image from the current Dockerfile.
docker build -t angular-app:latest .

# Run the container in detached mode and restart it automatically unless stopped manually.
docker run -d --name angular-container --restart unless-stopped -p 9080:80 angular-app:latest
