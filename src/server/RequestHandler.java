package server;

import java.util.Map;
import java.util.logging.Logger;

public class RequestHandler {
    private static final Logger logger = Logger.getLogger("RequestHandler");

    public void handleRequest(String queryString, long startTime) {
        if (queryString == null || queryString.trim().isEmpty()) {
            logger.warning("QUERY_STRING пуста.");
            JsonSender.sendJson("{\"ошибка\": \"не хватает параметров\"}");
            return;
        }

        Map<String, String> params = Parameters.parse(queryString);
        logger.info("Спарсированны параметры: " + params);

        if (params.get("x") == null || params.get("y") == null || params.get("r") == null) {
            logger.warning("Потерян(ы) параметр(ы): x, y, или R");
            JsonSender.sendJson("{\"ошибка\": \"потерян обязательный параметр(ы)\"}");
            return;
        }

        try {
            int x = Integer.parseInt(params.get("x"));
            float y = Float.parseFloat(params.get("y"));
            float r = Float.parseFloat(params.get("r"));

            logger.info(String.format("Значения - x: %d, y: %.2f, r: %f", x, y, r));

            if (!Validator.validateCoords(x, y, r)) {
                logger.warning("Невалидные данные обнаружены во время валидации.");
                JsonSender.sendJson("{\"ошибка\": \"невалидные данные\"}");
                return;
            }

            boolean isInside = Validator.isInArea(x, y, r);
            logger.info("Результат проверки: " + isInside);

            long endTime = System.currentTimeMillis();
            String executionTime = (endTime - startTime) + "ms";

            String jsonResponse = String.format(
                    "{\"result\": %b, \"currentTime\": \"%s\", \"executionTime\": \"%s\"}",
                    isInside, java.time.LocalTime.now().toString().substring(0, 8), executionTime
            );
            JsonSender.sendJson(jsonResponse);

        } catch (NumberFormatException e) {
            logger.warning("NumberFormatException: " + e.getMessage());
            JsonSender.sendJson("{\"ошибка\": \"не верный тип параметра\"}");

        } catch (NullPointerException e) {
            logger.warning("NullPointerException: " + e.getMessage());
            JsonSender.sendJson("{\"ошибка\": \"потерян обязательный параметр\"}");

        } catch (Exception e) {
            logger.severe("Неизвестная ошибка: " + e);
            JsonSender.sendJson(String.format("{\"ошибка\": \"%s\"}", e));
        }
    }
}
