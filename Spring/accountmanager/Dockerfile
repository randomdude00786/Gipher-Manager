From java:8-jre
WORKDIR usr/src

EXPOSE 8089

ADD ./target/accountmanager-1.0.jar /usr/src/accountmanager-1.0.jar
ENTRYPOINT ["java", "-Xms200m","-jar","/usr/src/accountmanager-1.0.jar"]
