package server;

import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.logging.Logger;

public class JsonSender {
    private static final String RESPONSE_TEMPLATE = "Content-Type: application/json\n" +
            "Content-Length: %d\n\n%s";

    private static final Logger log = Logger.getLogger(JsonSender.class.getName());

    public static void sendJson(long startTime, String jsonDump) {
        long currentTime = System.currentTimeMillis();
        long elapsedTime = currentTime - startTime;
        String currentTimeStr = new SimpleDateFormat("HH:mm:ss.SSS").format(new Date(currentTime));

        String responseJson = String.format("{\"response\": %s, \"currentTime\": \"%s\", \"elapsedTime\": %d}",
                jsonDump, currentTimeStr, elapsedTime);

        log.info("in send func");
        log.info(String.format(RESPONSE_TEMPLATE, responseJson.getBytes(StandardCharsets.UTF_8).length, responseJson));
        System.out.println(String.format(RESPONSE_TEMPLATE, responseJson.getBytes(StandardCharsets.UTF_8).length, responseJson));
    }
}
