# Purpose: two images from one file — the product (site/ served as plain static files, no charset sent) and the test runner (Playwright with its browsers, dependencies installed at build time).
FROM mcr.microsoft.com/playwright:v1.49.1-noble AS product
COPY site /srv/site
WORKDIR /srv/site
EXPOSE 8080
HEALTHCHECK --interval=2s --retries=60 CMD python3 -c "import urllib.request;urllib.request.urlopen('http://127.0.0.1:8080/index.html')"
CMD ["python3", "-m", "http.server", "8080", "--bind", "0.0.0.0"]

FROM mcr.microsoft.com/playwright:v1.49.1-noble AS tests
WORKDIR /deps
RUN npm init -y >/dev/null && npm install --no-audit --no-fund @playwright/test@1.49.1
ENV NODE_PATH=/deps/node_modules
WORKDIR /app
