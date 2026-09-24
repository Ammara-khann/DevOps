Bloom to-do App

Group Members
1.Ammara Khan (Project Manager)
2.Eshal Siraj (Project Tester)
3.Kashaf Ahmad (Developer)
4.Laiba Saeed (UI/UX Designer)
5.Fatima Zahra (Document Manager)

#Docker setup

### 1. Build Docker Image 
The Docker Image was built using the Dockerfile:
docker images

#Build Container and Run Container
RUN rm -rf /usr/share/nginx/html/
docker run -d -p 8080:80 --name todo-container todo-app

#Running container
docker ps
![alt text](dockerps.png)

![alt text](localhost.png)