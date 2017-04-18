FROM mflo999/pi-run

# install the app
COPY dist.tar.gz /tmp/dist.tar.gz
RUN mkdir /pi-led
RUN tar -zxf /tmp/dist.tar.gz -C /pi-led

# start the app
WORKDIR /pi-led
ENTRYPOINT ["/bin/bash", "./server.sh"]
