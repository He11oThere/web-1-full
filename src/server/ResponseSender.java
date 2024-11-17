package server;

import com.fastcgi.FCGIInterface;

import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.util.logging.Logger;

public class ResponseSender {
    private static final Logger logger = Logger.getLogger("ResponseSender");

    public static void sendResponse(String responseJson) {
        try {
            OutputStream outputStream = FCGIInterface.request.outStream;

            String response = String.format("Content-Type: application/json\nContent-Length: %d\n\n%s", responseJson.length(), responseJson);
            outputStream.write(response.getBytes(StandardCharsets.UTF_8));
            outputStream.flush();
        } catch (Exception e) {
            logger.warning("Ошибка отправки ответа: " + e.getMessage());
        }
    }

    public static void sendErrorResponse(String errorMessage) {
        String response = "{\"error\": \"" + errorMessage + "\"}";
        sendResponse(response);
    }
}
