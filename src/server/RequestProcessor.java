package server;

import java.io.InputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.logging.Logger;
import java.util.Map;
import java.util.HashMap;

public class RequestProcessor {
    private static final Logger logger = Logger.getLogger("RequestProcessor");

    public void processRequest(InputStream inputStream) {
        logger.info("Начинаем обработку запроса.");

        try {
            String jsonBody = readRequestBody(inputStream);

            logger.info("Получено тело запроса: " + jsonBody);

            Map<String, String> params = parseJson(jsonBody);

            int x = Integer.parseInt(params.getOrDefault("x", "0"));
            double y = Double.parseDouble(params.getOrDefault("y", "0.0"));
            int r = Integer.parseInt(params.getOrDefault("r", "0"));

            logger.info("Полученные параметры: x=" + x + ", y=" + y + ", r=" + r);

            String response = "{\"status\": \"OK\"}";
            ResponseSender.sendResponse(response);
        } catch (Exception e) {
            logger.warning("Ошибка при обработке данных запроса: " + e.getMessage());
            ResponseSender.sendErrorResponse("Ошибка при обработке данных");
        }
    }

    public String readRequestBody(InputStream inputStream) {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            return sb.toString();
        } catch (Exception e) {
            logger.warning("Ошибка при чтении тела запроса: " + e.getMessage());
            return "";
        }
    }

    private Map<String, String> parseJson(String json) {
        Map<String, String> params = new HashMap<>();

        json = json.trim().substring(1, json.length() - 1);

        String[] keyValuePairs = json.split(",");

        for (String pair : keyValuePairs) {
            String[] keyValue = pair.split(":");
            if (keyValue.length == 2) {
                String key = keyValue[0].trim().replace("\"", "");
                String value = keyValue[1].trim().replace("\"", "");
                params.put(key, value);
            }
        }

        return params;
    }
}
