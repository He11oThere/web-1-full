package server;

import com.fastcgi.FCGIInterface;

import java.util.logging.Logger;

public class Server {
    private static final Logger log = Logger.getLogger(Server.class.getName());

    public void start() {
        log.info("Server started. Waiting for requests...");
        while (new FCGIInterface().FCGIaccept() >= 0) {
            processRequest();
        }
    }

    private void processRequest() {
        long startTime = System.currentTimeMillis();
        try {
            String requestBody = RequestReader.read();

            RequestData requestData = RequestParser.parse(requestBody);

            String responseJson = RequestProcessor.processHit(requestData);

            JsonSender.sendJson(startTime, responseJson);
        } catch (Exception e) {
            log.severe("Error processing request: " + e.getMessage());
            JsonSender.sendJson(startTime, String.format("{\"error\": \"%s\"}", e.getMessage()));
        }
    }
}
