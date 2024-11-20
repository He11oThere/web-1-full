package server;

import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.logging.Logger;
import com.fastcgi.FCGIInterface;

public class App {
    private static final Logger log = Logger.getLogger(App.class.getName());

    public static void main(String[] args) {
        log.info("in main function!");
        while (new FCGIInterface().FCGIaccept() >= 0) {
            log.info("in while loop");
            long startTime = System.currentTimeMillis();
            try {
                log.info("reading request body...");

                String contentLengthStr = FCGIInterface.request.params.getProperty("CONTENT_LENGTH");
                int contentLength = (contentLengthStr != null) ? Integer.parseInt(contentLengthStr) : 0;

                if (contentLength > 0) {
                    byte[] buffer = new byte[contentLength];
                    InputStream in = System.in;
                    int bytesRead = in.read(buffer, 0, contentLength);

                    if (bytesRead == -1) {
                        log.info("No data in POST request body.");
                        JsonSender.sendJson(startTime, "{\"error\": \"No data received\"}");
                        continue;
                    }

                    String requestBody = new String(buffer, StandardCharsets.UTF_8);
                    log.info("Received body: " + requestBody);

                    HashMap<String, String> params = JsonParser.parse(requestBody);
                    log.info("Parsed params: " + params);

                    int x = Integer.parseInt(params.get("x"));
                    float y = Float.parseFloat(params.get("y"));
                    int r = Integer.parseInt(params.get("r"));
                    log.info("Parsed x: " + x + ", y: " + y + ", r: " + r);

                    String responseJson;
                    if (Checker.checkCoords(x, y, r)) {
                        log.info("Valid x y r, sending...");
                        boolean hit = Checker.isInArea(x, y, r);
                        responseJson = String.format("{\"hit\": %b}", hit);
                        log.info("Result sent");
                    } else {
                        log.info("Invalid x y r, sending error");
                        responseJson = "{\"error\": \"Invalid data\"}";
                        log.info("Error sent");
                    }

                    JsonSender.sendJson(startTime, responseJson);
                } else {
                    log.info("No content length specified, or no data.");
                    JsonSender.sendJson(startTime, "{\"error\": \"No data received\"}");
                }
            } catch (Exception e) {
                log.info("Error in exception: " + e.toString());
                JsonSender.sendJson(startTime, String.format("{\"error\": \"%s\"}", e.toString()));
            }
        }
    }
}
