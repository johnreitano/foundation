FROM amazonlinux:2

# Install python 3.10
RUN yum update -y
RUN yum -y groupinstall "Development Tools"
RUN yum -y install wget gcc devel libffi-devel openssl11 openssl11-devel
RUN wget https://www.python.org/ftp/python/3.10.7/Python-3.10.7.tgz && \
    tar zxvf Python-3.10.7.tgz
RUN cd Python-3.10.7/ && \
    ./configure --enable-optimizations && \
    make && \
    make install && \
    python3.10 --version

# Set up PIP and Venv
RUN python3.10 -m pip install --upgrade pip && \
    python3.10 -m pip install virtualenv
RUN python3.10 -m venv base
RUN source base/bin/activate

# Install dependencies
COPY ./requirements.txt .
RUN pip install -r requirements.txt -t ./python

# Zip it up for deployment.
RUN zip -r layer.zip ./python/
ENTRYPOINT ["/bin/bash", "-l"]
