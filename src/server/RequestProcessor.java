package server;

import java.util.logging.Logger;

public class RequestProcessor {
    private static final Logger log = Logger.getLogger(RequestProcessor.class.getName());

    public static String processHit(RequestData data) {
        log.info("Processing request data: " + data);

        if (Checker.checkCoords(data.getX(), data.getY(), data.getR())) {
            boolean hit = Checker.isInArea(data.getX(), data.getY(), data.getR());
            return String.format("{\"hit\": %b}", hit);
        } else {
            return "{\"error\": \"Invalid data\"}";
        }
    }
}
