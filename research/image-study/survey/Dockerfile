FROM python:3.12-slim
WORKDIR /app
COPY server.py researcher-image-map.json ./
COPY public ./public
ENV BIND=0.0.0.0 PORT=4184 SURVEY_DB=/data/responses.sqlite3
RUN useradd --uid 10001 app && mkdir /data && chown app:app /data
USER app
EXPOSE 4184
CMD ["python3", "server.py"]
