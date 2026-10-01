FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/
COPY . /usr/share/nginx/html
EXPOSE 81
CMD ["nginx", "-g", "daemon off;"]