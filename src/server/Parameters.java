package server;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

public class Parameters {
    private static final Logger logger = Logger.getLogger("Parameters");

    public static Map<String, String> parse(String queryString) {
        Map<String, String> params = new HashMap<>();

        if (queryString == null || queryString.isEmpty()) {
            return params;
        }

        for (String pair : queryString.split("&")) {
            try {
                String[] keyValue = pair.split("=", 2);
                String key = URLDecoder.decode(keyValue[0], StandardCharsets.UTF_8);
                if (keyValue.length > 1) {
                    String value = URLDecoder.decode(keyValue[1], StandardCharsets.UTF_8);
                    params.put(key, value);
                } else {
                    params.put(key, "");
                }
            } catch (IllegalArgumentException e) {
                logger.warning("Ошибка декодированния параметров " + pair + " - " + e.getMessage());
            }
        }

        return params;
    }
}
