FROM ubuntu:jammy

ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

RUN apt-get update && apt-get install -y \
    software-properties-common \
    curl

RUN add-apt-repository ppa:deadsnakes/ppa

RUN apt-get update && apt-get install -y python3.10

RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.10 1
RUN update-alternatives --config python3

RUN curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py && \
    python3.10 get-pip.py && \
    rm get-pip.py

# Can't uninstall Blinker package since it's from dist-utils - do manually
RUN rm -rf /usr/local/lib/python3.10/dist-packages/blinker*
RUN rm -rf /usr/lib/python3/dist-packages/blinker*
RUN rm -rf /usr/lib/python3.10/dist-packages/blinker*

RUN pip install "anndata>=0.10.4" cellxgene

ENTRYPOINT ["cellxgene"]
