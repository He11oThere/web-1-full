package server;

import java.nio.charset.StandardCharsets;
import java.util.logging.Logger;

public class JsonSender {
    private static final Logger logger = Logger.getLogger("JsonSender");
    private static final String RESPONSE_TEMPLATE = "Content-Type: application/json\nContent-Length: %d\n\n%s";

    static void sendJson(String jsonDump) {
        logger.info("Отправка JSON запроса: " + jsonDump);
        System.out.printf((RESPONSE_TEMPLATE) + "%n", jsonDump.getBytes(StandardCharsets.UTF_8).length, jsonDump);
    }
}
