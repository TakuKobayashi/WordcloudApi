FROM amazonlinux

RUN yum update -y
RUN yum upgrade -y
RUN yum clean all
RUN yum install -y yum-utils gcc gcc-c++ git patch epel-release make curl xz file which tar openssl-devel openssl perl-core

WORKDIR /opt
RUN curl -L "https://drive.google.com/uc?export=download&id=0B4y35FiV1wh7cENtOXlicTFaRUE" -o mecab-0.996.tar.gz
RUN tar zxvf mecab-0.996.tar.gz
WORKDIR /opt/mecab-0.996
RUN ./configure --with-charset=utf8 --enable-utf8-only
RUN make
RUN make install

WORKDIR /opt
RUN curl -L "https://drive.google.com/uc?export=download&id=0B4y35FiV1wh7MWVlSDBCSXZMTXM" -o mecab-ipadic-2.7.0-20070801.tar.gz
RUN tar zxvf mecab-ipadic-2.7.0-20070801.tar.gz
WORKDIR /opt/mecab-ipadic-2.7.0-20070801
RUN ./configure --with-charset=utf8
RUN make
RUN make install

WORKDIR /opt
RUN git clone --depth 1 https://github.com/neologd/mecab-ipadic-neologd.git
WORKDIR /opt/mecab-ipadic-neologd
RUN ./bin/install-mecab-ipadic-neologd -n -y --eliminate-redundant-entry

#CMD /bin/bash