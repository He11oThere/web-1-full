package server;

import java.util.HashMap;

public class RequestParser {
    public static RequestData parse(String requestBody) {
        HashMap<String, String> params = JsonParser.parse(requestBody);

        int x = Integer.parseInt(params.get("x"));
        float y = Float.parseFloat(params.get("y"));
        int r = Integer.parseInt(params.get("r"));

        return new RequestData(x, y, r);
    }
}
