#FROM eclipse-temurin:21-jre
#WORKDIR /app
#
#RUN apt-get update -qq && apt-get install -y -qq curl && \
#    curl -L -o graphhopper.jar \
#    https://repo1.maven.org/maven2/com/graphhopper/graphhopper-web/9.1/graphhopper-web-9.1.jar && \
#    apt-get clean && rm -rf /var/lib/apt/lists/*
#
#EXPOSE 8989
#ENTRYPOINT ["java", "-Xmx4g", "-Xms4g", "-jar", "/app/graphhopper.jar"]

FROM eclipse-temurin:21-jre
WORKDIR /app

COPY graphhopper-web-9.1.jar graphhopper.jar

EXPOSE 8989
ENTRYPOINT ["java", "-Xmx4g", "-Xms4g", "-jar", "/app/graphhopper.jar"]