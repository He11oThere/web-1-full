package server;

import java.util.HashMap;
import java.util.Map;

public class JsonParser {

    public static Map<String, Object> parse(String json) {
        json = json.trim().substring(1, json.length() - 1);

        String[] parts = json.split(",");

        Map<String, Object> result = new HashMap<>();

        for (String part : parts) {
            String[] keyValue = part.split(":");
            String key = keyValue[0].trim().replace("\"", "");
            String value = keyValue[1].trim();

            switch (key) {
                case "x" -> result.put(key, Integer.parseInt(value));
                case "y" -> result.put(key, Double.parseDouble(value));
                case "r" -> result.put(key, Integer.parseInt(value));
                default -> throw new IllegalArgumentException("Неизвестный ключ: " + key);
            }
        }

        return result;
    }

}
