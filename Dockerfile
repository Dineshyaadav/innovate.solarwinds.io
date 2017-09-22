FROM jekyll/jekyll
ADD . /app/
WORKDIR /app/
RUN jekyll build
ENTRYPOINT jekyll serve