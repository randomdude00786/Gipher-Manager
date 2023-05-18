From java:8-jre
WORKDIR usr/src

EXPOSE 8088

ADD ./target/giphermanager-1.0.jar /usr/src/giphermanager-1.0.jar
ENTRYPOINT ["java", "-Xms200m","-jar","/usr/src/giphermanager-1.0.jar"]
